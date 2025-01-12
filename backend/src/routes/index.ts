import { Router } from 'express';
import menusRoutes from './menus.routes';
import dishesRoutes from './dishes.routes';

const router = Router();

router.use('/menus', menusRoutes);

router.use('/dishes', dishesRoutes);

export default router;
