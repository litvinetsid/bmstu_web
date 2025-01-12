import { Router } from 'express';
import menusRoutes from './menus.routes';
import dishesRoutes from './dishes.routes';

const router = Router();

// Роуты для работы с меню
router.use('/menus', menusRoutes);

// Роуты для работы с блюдами
router.use('/dishes', dishesRoutes);

export default router;
