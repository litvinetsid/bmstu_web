import { Router } from 'express';
import { getRefuellers, getRefuellerById, createRefueller, updateRefueller, deleteRefueller } from '../controllers/refuellers.controller';
import {
    moveIssueBetweenRefuellers,
  } from '../controllers/issues.controller';

const router = Router();

/**
 * GET /api/v1/refuellers
 * Получить список всех меню
 */
router.get('/', getRefuellers);

/**
 * GET /api/v1/refuellers/:id
 * Получить конкретное меню по ID
 */
router.get('/:id', getRefuellerById);

/**
 * POST /api/v1/refuellers
 * Создать новое меню
 */
router.post('/', createRefueller);

/**
 * PUT /api/v1/refuellers/:id
 * Обновить существующее меню
 */
router.put('/:id', updateRefueller);

/**
 * DELETE /api/v1/refuellers/:id
 * Удалить меню по ID
 */
router.delete('/:id', deleteRefueller);

/**
 * POST /api/v1/refuellers/:fromRefuellerId/issues/:issueId/move
 * Переместить блюдо между меню
 */
router.post('/:fromRefuellerId/issues/:issueId/move', moveIssueBetweenRefuellers);

export default router;
