import { Express } from "express";
import rootRouter from './root';
import userRouter from './user';

const useRoutes = (server: Express) => {
    server.use(rootRouter);
    server.use(userRouter);
};

export default useRoutes;