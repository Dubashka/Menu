import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './db';
import recipesRouter from './routes/recipes';

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/recipes', recipesRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`API server started on http://localhost:${PORT}`);
});