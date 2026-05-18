import express from 'express';
import ErrorMiddleware from './src/middleware/error_middleware.js';
import authRouter from './src/routes/auth.route.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
   console.log(req.method, req.url);
   next();
});

console.log('before routes');
app.use('/', authRouter);
console.log('after routes');

app.use(ErrorMiddleware.all);

export default app;