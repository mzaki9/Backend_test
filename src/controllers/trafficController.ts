import { Request, Response } from "express";
import { db } from "../db";
import { traffic } from "../db/schema";
import { eq, and } from "drizzle-orm";
import {
  PEAK_PERIODS,
  CAPACITY,
  CYCLE_TIME,
  GREEN_TIME,
  MAX_CAPACIY,
} from "../utils/constants";
import { calculateVehicleTotal } from "../utils/vehicleHelpers";
import { trafficQuerySchema } from "../schemas/trafficSchema";

export const getIntersectionAnalysis = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = trafficQuerySchema.safeParse(req.query);
  if (!parsed.success || !parsed.data.date) {
    res.status(400).json({ error: "Invalid date parameter" });
    return;
  }
  try {
    let whereConditions = eq(
      traffic.created_at,
      parsed.data.date.toISOString().split("T")[0]
    );
    if (parsed.data.id_simpang) {
      whereConditions = and(
        whereConditions,
        eq(traffic.id_simpang, parsed.data.id_simpang)
      )!;
    }

    const rows = await db.select().from(traffic).where(whereConditions);

    const results = PEAK_PERIODS.flatMap((period) => {
      const dataPerPeriod = rows.filter(
        (r) => r.waktu >= period.start && r.waktu <= period.end
      );

      console.log(`${period.label}: ${dataPerPeriod.length} records`);

      const grouped: Record<string, number> = {};
      dataPerPeriod.forEach((r) => {
        const total = calculateVehicleTotal(r);
        const groupKey = parsed.data.id_simpang
          ? `${r.id_simpang}-${r.dari_arah}`
          : r.dari_arah;
        grouped[groupKey] = (grouped[groupKey] || 0) + total;
      });

      return Object.entries(grouped).map(([key, total]) => ({
        waktu_puncak: period.label,
        arm: parsed.data.id_simpang ? key.split("-")[1] : key,
        ...(parsed.data.id_simpang && {
          id_simpang: parseInt(key.split("-")[0]),
        }),
        total_kendaraan: total,
        flow_ratio: +(total / MAX_CAPACIY).toFixed(2),
        cycle_time: CYCLE_TIME,
        green_time: GREEN_TIME,
        capacity: CAPACITY,
      }));
    });
    console.log(results);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsed = trafficQuerySchema.safeParse(req.query);
  if (!parsed.success || !parsed.data.date) {
    res.status(400).json({ error: "Invalid date parameter" });
    return;
  }
  try {
    let whereConditions = eq(
      traffic.created_at,
      parsed.data.date.toISOString().split("T")[0]
    );
    if (parsed.data.id_simpang) {
      whereConditions = and(
        whereConditions,
        eq(traffic.id_simpang, parsed.data.id_simpang)
      )!;
    }

    const rows = await db.select().from(traffic).where(whereConditions);

    // Hitung total kendaraan per jam
    const totalsPerHour: Record<string, number> = {};
    rows.forEach((r) => {
      const hour = r.waktu.slice(0, 2);
      const total = calculateVehicleTotal(r);
      totalsPerHour[hour] = (totalsPerHour[hour] || 0) + total;
    });

    // Ambil jam puncak
    let peakHour = "";
    let maxVehicles = 0;
    for (const [hour, total] of Object.entries(totalsPerHour)) {
      if (total > maxVehicles) {
        maxVehicles = total;
        peakHour = `${hour}:00-${String(Number(hour) + 1).padStart(2, "0")}:00`;
      }
    }
    const totalVehicles = rows.reduce(
      (sum, r) => sum + calculateVehicleTotal(r),
      0
    );

    const vehiclesInPeakPeriods = rows
      .filter((r) =>
        PEAK_PERIODS.some((p) => r.waktu >= p.start && r.waktu <= p.end)
      )
      .reduce((sum, r) => sum + calculateVehicleTotal(r), 0);

    res.json({
      peakTrafficTime: peakHour || "N/A",
      coPollution: +(totalVehicles * 0.02).toFixed(2),
      lostEstimation: totalVehicles * 250,
      vehiclesQueued: vehiclesInPeakPeriods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
