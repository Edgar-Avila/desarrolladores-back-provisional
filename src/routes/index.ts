import { Express } from "express";
import rootRouter from './root';
import userRouter from './user';
import postRouter from './post';
import postTypeRouter from './postType';
import programmingLanguageRouter from './programmingLanguage';

const useRoutes = (server: Express) => {
    server.use(rootRouter);
    server.use(postRouter);
    server.use(userRouter);
    server.use(postTypeRouter);
    server.use(programmingLanguageRouter);
};

export default useRoutes;