import {z} from 'zod'
export const trafficQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).transform((val) => new Date(val)),
  id_simpang: z.coerce.number().optional()
});
