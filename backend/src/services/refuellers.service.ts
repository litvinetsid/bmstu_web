import db from '../db';
import { Refueller } from '../models/refueller.model';
import { Issue } from '../models/issue.model';
import { IssueTypeOrder } from '../enum/issueTypes.enum';

/**
 * Получить список всех заправщиков
 */
export const getAllRefuellers = async (): Promise<Refueller[]> => {
  const refuellers = await db('refuellers').select('*').orderBy('created_at', 'asc');

  const refuellersWithIssues = await Promise.all(
    refuellers.map(async (refueller) => {
      const issues = await db('refuellers_issues')
        .join('issues', 'refuellers_issues.issues_id', 'issues.id')
        .where('refuellers_issues.refuellers_id', refueller.id)
        .select('issues.id', 'issues.name', 'issues.fuel', 'issues.volume', 'issues.number', 'refuellers_issues.created_at');
      return {
        ...refueller,
        issues,
      };
    })
  );

  return refuellersWithIssues;
};


/**
 * Получить заправщика по ID
 */
export const getRefuellerByIdService = async (id: string): Promise<Refueller | null> => {
  const refueller = await db('refuellers').where({ id }).first();

  if (!refueller) {
    return null;
  }

  const issues = await db('refuellers_issues')
    .join('issues', 'refuellers_issues.issues_id', 'issues.id')
    .where('refuellers_issues.refuellers_id', refueller.id)
    .select('issues.id', 'issues.name', 'issues.fuel', 'issues.volume', 'issues.number', 'refuellers_issues.created_at')
    .orderBy('refuellers_issues.created_at');

  return { ...refueller, issues };
};

/**
 * Создать новое меню
 */
export const createRefuellerService = async (refuellerData: Partial<Refueller>): Promise<Refueller> => {
  const [newRefueller] = await db('refuellers').insert(refuellerData).returning('*');
  newRefueller.issues = [];
  return newRefueller;
};

/**
 * Обновить существующее меню
 */
const validateRefuellerIssues = async (refuellerId: string, issues: Issue[]): Promise<boolean> => {
  const refueller = await db('refuellers').where({ id: refuellerId }).first();

  if (!refueller) {
    throw new Error('Refueller not found');
  }

  // Проверка типа топлива
  const fuelTypeMismatch = issues.some(issue => issue.fuel !== refueller.fuel);
  if (fuelTypeMismatch) {
    throw new Error('Fuel type mismatch between refueller and issues');
  }

  // Суммарное количество топлива всех задач
  const totalIssuesVolume = issues.reduce((sum, issue) => sum + parseFloat(issue.value), 0);

  // Проверка, что суммарное количество топлива не превышает доступное у заправщика
  if (totalIssuesVolume > parseFloat(refueller.vol)) {
    throw new Error('Total fuel volume of issues exceeds refueller capacity');
  }

  return true;
};

/**
 * Обновить существующего заправщика
 */
export const updateRefuellerService = async (id: string, updates: Partial<Refueller>): Promise<Refueller | null> => {
  const refueller = await db('refuellers').where({ id }).first();

  if (!refueller) {
    throw new Error('Refueller not found');
  }

  // Если обновляются задачи (issues), выполняем проверку
  if (updates.issues) {
    await validateRefuellerIssues(id, updates.issues);
  }

  // Обновляем заправщика
  const [updatedRefueller] = await db('refuellers').where({ id }).update(updates).returning('*');
  return updatedRefueller || null;
};

/**
 * Удалить меню по ID
 */
export const deleteRefuellerService = async (id: string): Promise<boolean> => {
  const deleted = await db('refuellers').where({ id }).del();
  return deleted > 0;
};
