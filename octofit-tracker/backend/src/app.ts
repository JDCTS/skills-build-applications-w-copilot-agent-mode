import express, { type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes';

const app = express();

app.use(express.json());
app.get('/health', (_request, response) => response.json({ status: 'ok' }));
app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: error.message });
    return;
  }

  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
    response.status(409).json({ error: 'A record with that unique value already exists' });
    return;
  }

  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export default app;