import 'dotenv/config';
import express from 'express';
import useRoutes from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { credentials } from './middleware/credentials';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(credentials);
app.use(cors({
    origin: process.env.CLIENT_URL as string,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
useRoutes(app);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
