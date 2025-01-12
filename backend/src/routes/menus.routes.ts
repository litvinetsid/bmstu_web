import { Router } from 'express';
import { getMenus, getMenuById, createMenu, updateMenu, deleteMenu } from '../controllers/menus.controller';
import {
    moveDishBetweenMenus,
  } from '../controllers/dishes.controller';

const router = Router();

/**
 * GET /api/v1/menus
 * Получить список всех меню
 */
router.get('/', getMenus);

/**
 * GET /api/v1/menus/:id
 * Получить конкретное меню по ID
 */
router.get('/:id', getMenuById);

/**
 * POST /api/v1/menus
 * Создать новое меню
 */
router.post('/', createMenu);

/**
 * PUT /api/v1/menus/:id
 * Обновить существующее меню
 */
router.put('/:id', updateMenu);

/**
 * DELETE /api/v1/menus/:id
 * Удалить меню по ID
 */
router.delete('/:id', deleteMenu);

/**
 * POST /api/v1/menus/:fromMenuId/dishes/:dishId/move
 * Переместить блюдо между меню
 */
router.post('/:fromMenuId/dishes/:dishId/move', moveDishBetweenMenus);

export default router;
