import { NON_VEHICLE_KEY } from "./constants";

export const calculateVehicleTotal = (record: any): number => {
  return Object.keys(record)
    .filter(key => !NON_VEHICLE_KEY.includes(key))
    .reduce((total, key) => total + (record[key] ?? 0), 0);
};

