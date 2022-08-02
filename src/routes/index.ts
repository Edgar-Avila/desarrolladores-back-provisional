import { Express } from "express";
import rootRouter from './root';
import userRouter from './user';
import postRouter from './post';

const useRoutes = (server: Express) => {
    server.use(rootRouter);
    server.use(postRouter);
    server.use(userRouter);
};

export default useRoutes;