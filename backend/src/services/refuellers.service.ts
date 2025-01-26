import db from '../db';
import { Refueller } from '../models/refueller.model';
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
export const updateRefuellerService = async (id: string, updates: Partial<Refueller>): Promise<Refueller | null> => {
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
