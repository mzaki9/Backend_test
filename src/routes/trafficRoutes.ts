import { Router } from 'express';
import { getIntersectionAnalysis, getSummary } from '../controllers/trafficController';

const trafficRouter = Router();

trafficRouter.get('/intersection', getIntersectionAnalysis);
trafficRouter.get('/summary', getSummary);

export default trafficRouter;
