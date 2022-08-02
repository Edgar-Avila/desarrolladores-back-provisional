import express from 'express';
import useRoutes from './routes';

const app = express();
const PORT = 8000;

app.use(express.json());
useRoutes(app);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
