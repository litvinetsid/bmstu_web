import { Router } from 'express';
import refuellersRoutes from './refuellers.routes';
import issuesRoutes from './issues.routes';

const router = Router();

router.use('/refuellers', refuellersRoutes);

router.use('/issues', issuesRoutes);

export default router;
