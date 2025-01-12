import db from '../db';
import { Menu } from '../models/menu.model';
import { DishTypeOrder } from '../enum/dishTypes.enum';

/**
 * Получить список всех меню
 */
export const getAllMenus = async (): Promise<Menu[]> => {
  const menus = await db('menus').select('*').orderBy('created_at', 'asc');

  const menusWithDishes = await Promise.all(
    menus.map(async (menu) => {
      const dishes = await db('menu_dishes')
        .join('dishes', 'menu_dishes.dish_id', 'dishes.id')
        .where('menu_dishes.menu_id', menu.id)
        .select('dishes.id', 'dishes.name', 'dishes.type', 'menu_dishes.created_at')
        .orderByRaw(
          `CASE 
             ${DishTypeOrder.map((type, index) => `WHEN dishes.type = '${type}' THEN ${index}`).join(' ')}
           END`
        );

      return {
        ...menu,
        dishes,
      };
    })
  );

  return menusWithDishes;
};


/**
 * Получить меню по ID
 */
export const getMenuByIdService = async (id: string): Promise<Menu | null> => {
  const menu = await db('menus').where({ id }).first();

  if (!menu) {
    return null;
  }

  const dishes = await db('menu_dishes')
    .join('dishes', 'menu_dishes.dish_id', 'dishes.id')
    .where('menu_dishes.menu_id', menu.id)
    .select('dishes.id', 'dishes.name', 'dishes.type', 'menu_dishes.created_at')
    .orderBy('menu_dishes.created_at');

  return { ...menu, dishes };
};

/**
 * Создать новое меню
 */
export const createMenuService = async (menuData: Partial<Menu>): Promise<Menu> => {
  const [newMenu] = await db('menus').insert(menuData).returning('*');
  newMenu.dishes = [];
  return newMenu;
};

/**
 * Обновить существующее меню
 */
export const updateMenuService = async (id: string, updates: Partial<Menu>): Promise<Menu | null> => {
  const [updatedMenu] = await db('menus').where({ id }).update(updates).returning('*');
  return updatedMenu || null;
};

/**
 * Удалить меню по ID
 */
export const deleteMenuService = async (id: string): Promise<boolean> => {
  const deleted = await db('menus').where({ id }).del();
  return deleted > 0;
};
