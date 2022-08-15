import { Express } from "express";
import rootRouter from './root';
import userRouter from './user';
import postRouter from './post';
import programmingLanguageRouter from './programmingLanguage';
import authRouter from './auth';
import likeRouter from './like';
import commentRouter from './comment';

const useRoutes = (server: Express) => {
    server.use('/', rootRouter);
    server.use('/posts', postRouter);
    server.use('/users', userRouter);
    server.use('/programming-languages', programmingLanguageRouter);
    server.use('/auth', authRouter);
    server.use('/likes', likeRouter);
    server.use('/comments', commentRouter);
};

export default useRoutes;