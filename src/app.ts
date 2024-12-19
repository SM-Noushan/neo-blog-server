import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5000', 'https://neo-blog-server.vercel.app/'],
  }),
);

// application routes
app.use('/api');

app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to Neo Blog (SERVER)!');
});

export default app;
