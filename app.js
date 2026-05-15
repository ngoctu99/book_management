import express from 'express';
import ErrorMiddleware from './src/middleware/error_middleware.js';
import authRouter from './src/routes/auth.route.js';

const app = express();

app.use('/', authRouter);
app.use(ErrorMiddleware.all);

export default app;