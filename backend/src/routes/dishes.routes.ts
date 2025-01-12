import { Router } from 'express';
import {
  getDishes,
  createDish,
  addDishToMenu,
  removeDishFromMenu,
  moveDishBetweenMenus,
  checkDishConstraints,
} from '../controllers/dishes.controller';

const router = Router();

/**
 * GET /api/v1/dishes
 * Получить список всех блюд
 */
router.get('/', getDishes);

/**
 * POST /api/v1/dishes
 * Создать новое блюдо
 */
router.post('/', createDish);

/**
 * POST /api/v1/menus/:menuId/dishes
 * Добавить блюдо в меню
 */
router.post('/menus/:menuId/dishes', addDishToMenu);

/**
 * DELETE /api/v1/menus/:menuId/dishes/:dishId
 * Удалить блюдо из меню
 */
router.delete('/menus/:menuId/dishes/:dishId', removeDishFromMenu);

/**
 * POST /api/v1/menus/:fromMenuId/dishes/:dishId/move
 * Переместить блюдо между меню
 */
router.post('/menus/:fromMenuId/dishes/:dishId/move', moveDishBetweenMenus);

/**
 * POST /api/v1/menus/:menuId/dishes/check
 * Проверить ограничения на добавление блюда
 */
router.post('/menus/:menuId/dishes/check', checkDishConstraints);

export default router;
