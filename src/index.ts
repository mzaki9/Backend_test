import express from 'express';
import trafficRouter from './routes/trafficRoutes';

const app = express();
app.use(express.json());

app.use('/api/traffic-analysis', trafficRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
