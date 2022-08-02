import 'dotenv/config';
import express from 'express';
import useRoutes from './routes';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
useRoutes(app);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
