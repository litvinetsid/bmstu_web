import db from '../db';
import { Issue } from '../models/issue.model';
import { IssueType, isValidIssueType } from '../enum/issueTypes.enum';

/**
 * Получить список всех блюд
 */
export const getAllIssues = async (): Promise<Issue[]> => {
  return await db('issues')
    .select('*')
    .then((issues) => issues);
};

/**
 * Создать новое блюдо
 */
export const createIssueService = async (issueData: Partial<Issue>): Promise<Issue | null> => {
  

  const [newIssue] = await db('issues').insert(issueData).returning('*');
  return newIssue || null;
};

/**
 * Обновить блюдо
 */
export const updateIssueService = async (issueId: string, updates: Partial<Issue>): Promise<Issue | null> => {

  const [updatedIssue] = await db('issues').where({ id: issueId }).update(updates).returning('*');
  return updatedIssue || null;
};

/**
 * Удалить блюдо
 */
export const deleteIssueService = async (issueId: string): Promise<boolean> => {
  const deleted = await db('issues').where({ id: issueId }).del();
  return deleted > 0;
};


/**
 * Добавить блюдо в меню
 */
export const addIssueToRefuellerService = async (refuellerId: string, issueId: string): Promise<Issue | null> => {
  const refueller = await db('refuellers').where({ id: refuellerId }).first();
  const issue = await db('issues').where({ id: issueId }).first();

  if (!refueller || !issue) {
    throw new Error('Refueller or issue not found.');
  }

  // const existingIssueOfType = await db('refuellers_issues')
  //   .join('issues', 'refuellers_issues.issues_id', 'issues.id')
  //   .where({ refuellers_id: refuellerId, fuel: issue.fuel })
  //   .first();

  // if (existingIssueOfType) {
  //   throw new Error(`A issue of type "${issue.type}" already exists in the refueller.`);
  // }

  const issueExists = await db('refuellers_issues')
    .where({ refuellers_id: refuellerId, issues_id: issueId })
    .first();

  if (issueExists) {
    throw new Error('Issue is already added to this refueller.');
  }

  await db('refuellers_issues').insert({ refuellers_id: refuellerId, issues_id: issueId });
  return issue;
};


/**
 * Удалить блюдо из меню
 */
export const removeIssueFromRefuellerService = async (refuellerId: string, issueId: string): Promise<boolean> => {
  const deleted = await db('refuellers_issues').where({ refuellers_id: refuellerId, issues_id: issueId }).del();
  return deleted > 0;
};

/**
 * Переместить блюдо между меню
 */
export const moveIssueBetweenRefuellersService = async (
  fromRefuellerId: string,
  toRefuellerId: string,
  issueId: string
): Promise<boolean> => {
  const removed = await removeIssueFromRefuellerService(fromRefuellerId, issueId);
  if (!removed) {
    return false;
  }

  try {
    await addIssueToRefuellerService(toRefuellerId, issueId);
  } catch {
    await addIssueToRefuellerService(fromRefuellerId, issueId);
    return false;
  }

  return true;
};


