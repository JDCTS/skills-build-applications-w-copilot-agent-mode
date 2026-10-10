import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models';
import { createCrudRouter } from './createCrudRouter';

const apiRouter = Router();

apiRouter.use('/users', createCrudRouter(User));
apiRouter.use('/teams', createCrudRouter(Team));
apiRouter.use('/activities', createCrudRouter(Activity));
apiRouter.use('/leaderboard', createCrudRouter(Leaderboard, { points: -1, createdAt: 1 }));
apiRouter.use('/workouts', createCrudRouter(Workout));

export default apiRouter;