import { Router } from 'express';
import {
  getDishes,
  createDish,
  updateDish,
  deleteDish,
  addDishToMenu,
  removeDishFromMenu,
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
 * PUT /api/v1/dishes/:id
 * Обновить информацию о блюде
 */
router.put('/:id', updateDish);

/**
 * DELETE /api/v1/dishes/:id
 * Удалить блюдо
 */
router.delete('/:id', deleteDish);

/**
 * POST /api/v1/dishes/:menuId/dishes
 * Добавить блюдо в меню
 */
router.post('/menus/:menuId/dishes', addDishToMenu);

/**
 * DELETE /api/v1/dishes/menus/:menuId/dishes/:dishId
 * Удалить блюдо из меню
 */

router.delete('/menus/:menuId/dishes/:dishId', removeDishFromMenu);



export default router;
