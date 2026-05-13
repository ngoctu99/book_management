import express from 'express';
import ErrorMiddleware from './src/middleware/error_middleware.js';

const app = express();

app.use(ErrorMiddleware.all)

export default app;