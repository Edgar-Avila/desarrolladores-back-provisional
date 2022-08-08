import { Express } from "express";
import rootRouter from './root';
import userRouter from './user';
import postRouter from './post';
import postTypeRouter from './postType';
import programmingLanguageRouter from './programmingLanguage';
import authRouter from './auth';

const useRoutes = (server: Express) => {
    server.use('/', rootRouter);
    server.use('/posts', postRouter);
    server.use('/users', userRouter);
    server.use('/post-types', postTypeRouter);
    server.use('/programming-languages', programmingLanguageRouter);
    server.use('/auth', authRouter);
};

export default useRoutes;