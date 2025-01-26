import { Router } from 'express';
import {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  addIssueToRefueller,
  removeIssueFromRefueller,
} from '../controllers/issues.controller';

const router = Router();

/**
 * GET /api/v1/issues
 * Получить список всех блюд
 */
router.get('/', getIssues);

/**
 * POST /api/v1/issues
 * Создать новое блюдо
 */
router.post('/', createIssue);

/**
 * PUT /api/v1/issues/:id
 * Обновить информацию о блюде
 */
router.put('/:id', updateIssue);

/**
 * DELETE /api/v1/issues/:id
 * Удалить блюдо
 */
router.delete('/:id', deleteIssue);

/**
 * POST /api/v1/issues/:refuellerId/issues
 * Добавить блюдо в меню
 */
router.post('/refuellers/:refuellerId/issues', addIssueToRefueller);

/**
 * DELETE /api/v1/issues/refuellers/:refuellerId/issues/:issueId
 * Удалить блюдо из меню
 */

router.delete('/refuellers/:refuellerId/issues/:issueId', removeIssueFromRefueller);



export default router;
