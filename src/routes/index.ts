import { Express } from "express";
import rootRouter from './root';
import userRouter from './user';
import postRouter from './post';
import postTypeRouter from './postType';

const useRoutes = (server: Express) => {
    server.use(rootRouter);
    server.use(postRouter);
    server.use(userRouter);
    server.use(postTypeRouter);
};

export default useRoutes;