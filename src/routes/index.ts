import { Express } from "express";
import rootRouter from './root';

const useRoutes = (server: Express) => {
    server.use(rootRouter);
};

export default useRoutes;