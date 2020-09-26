import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();
/*
 * Como se fosse Route::group() no laravel.. Qualquer rota que tenha
 * /appointments no inicio será tratado no appointments routes
 */

routes.use('/appointments', appointmentsRouter);

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

export default routes;
