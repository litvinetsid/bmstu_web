import db from '../db'; // Подключение Knex
import { Dish } from '../models/dish.model'; // Типы данных
import { DishType, isValidDishType } from '../enum/dishTypes.enum';

/**
 * Получить список всех блюд
 */
export const getAllDishes = async (): Promise<Dish[]> => {
  return await db('dishes')
    .select('*')
    .then((dishes) => dishes);
};

/**
 * Создать новое блюдо
 */
export const createDishService = async (dishData: Partial<Dish>): Promise<Dish | null> => {
  const { name, type } = dishData;

  if (!name || !type) {
    throw new Error('Invalid dish data: Name and type are required.');
  }

  if (!isValidDishType(type)) {
    throw new Error(`Invalid dish type. Allowed types: ${Object.values(DishType).join(', ')}`);
  }

  const [newDish] = await db('dishes').insert(dishData).returning('*');
  return newDish || null;
};

/**
 * Добавить блюдо в меню
 */
export const addDishToMenuService = async (menuId: string, dishId: string): Promise<boolean> => {
  // Проверяем существование меню и блюда
  const menu = await db('menus').where({ id: menuId }).first();
  const dish = await db('dishes').where({ id: dishId }).first();

  if (!menu || !dish) return false;

  // TODO: ПРОВЕРИТЬ ТИП БЛЮДА ПРИ ДОБАВЛЕНИИ!!!
  // Проверяем, что блюдо еще не добавлено в это меню
  const dishExists = await db('menu_dishes')
    .where({ menu_id: menuId, dish_id: dishId })
    .first();

  if (dishExists) return false;

  // Добавляем блюдо в меню
  await db('menu_dishes').insert({ menu_id: menuId, dish_id: dishId });
  return true;
};

/**
 * Удалить блюдо из меню
 */
export const removeDishFromMenuService = async (menuId: string, dishId: string): Promise<boolean> => {
  const deleted = await db('menu_dishes').where({ menu_id: menuId, dish_id: dishId }).del();
  return deleted > 0;
};

/**
 * Переместить блюдо между меню
 */
export const moveDishBetweenMenusService = async (
  fromMenuId: string,
  toMenuId: string,
  dishId: string
): Promise<boolean> => {
  const removed = await removeDishFromMenuService(fromMenuId, dishId);
  if (!removed) return false;

  const added = await addDishToMenuService(toMenuId, dishId);
  return added;
};

/**
 * Проверить ограничения на добавление блюда
 */
export const checkDishConstraintsService = async (menuId: string, dishId: string): Promise<boolean> => {
    const dish = await db('dishes').where({ id: dishId }).first();
    if (!dish) return false;
  
    // Получение количества блюд данного типа в меню
    const result = await db('menu_dishes')
      .join('dishes', 'menu_dishes.dish_id', 'dishes.id')
      .where({ menu_id: menuId, type: dish.type })
      .count({ count: '*' }) // Агрегатная функция count
      .first();
  
    const existingDishes = result ? Number(result.count) : 0; // Извлечение числа из результата
    const dishTypeLimit = 1; // Максимум одного блюда каждого типа
  
    return existingDishes < dishTypeLimit;
  };
  
