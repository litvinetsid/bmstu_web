import { defineStore } from 'pinia';
import { fetchMenus, createMenu, updateMenuById, deleteMenuById } from '../services/menuService';
import { addDishToMenu, removeDishFromMenu } from '../services/dishService';
import { moveDishBetweenMenus } from '../services/menuService';

export const useMenuStore = defineStore('menus', {
  state: () => ({
    menus: [] as Array<{ id: string; day: string; variant: string; dishes: any[] }>,
  }),
  actions: {
    async loadMenus() {
      const response = await fetchMenus();
      if (response.success) {
        this.menus = response.data || [];
      }
    },
    async addMenu(menu: { day: string; variant: string }) {
      const response = await createMenu(menu);
      if (response.success) {
        this.menus.push(response.data);
      }
    },
    async updateMenu(id: string, updatedMenu: { day: string; variant: string }) {
      const response = await updateMenuById(id, updatedMenu);
      if (response.success) {
        const index = this.menus.findIndex((menu) => menu.id === id);
        if (index !== -1) {
          this.menus[index] = { ...this.menus[index], ...response.data };
        }
      }
    },
    async removeMenu(id: string) {
      const response = await deleteMenuById(id);
      if (response.success) {
        this.menus = this.menus.filter((menu) => menu.id !== id);
      }
    },
    async addDishToMenu(menuId: string, dishId: string) {
      try {
        const response = await addDishToMenu(menuId, dishId);

        if (!response.success) {
          throw new Error(response.meta?.message || 'Failed to add dish to menu');
        }

        const menu = this.menus.find((menu) => menu.id === menuId);
        if (menu) {
          menu.dishes.push(response.data);
        }

      } catch (error) {
        throw error;
      }
    },

    async removeDishFromMenu(menuId: string, dishId: string) {
      const response = await removeDishFromMenu(menuId, dishId);
      if (response.success) {
        const menu = this.menus.find((menu) => menu.id === menuId);
        if (menu) {
          menu.dishes = menu.dishes.filter((dish) => dish.id !== dishId);
        }
      }
    },

    async moveDish(fromMenuId: string, toMenuId: string, dishId: string): Promise<boolean> {
      try {
        const response = await moveDishBetweenMenus(fromMenuId, dishId, toMenuId);
        if (!response.success) {
          return false;
        }

        const sourceMenu = this.menus.find((menu) => menu.id === fromMenuId);
        const targetMenu = this.menus.find((menu) => menu.id === toMenuId);

        if (sourceMenu && targetMenu) {
          const dishIndex = sourceMenu.dishes.findIndex((dish) => dish.id === dishId);
          if (dishIndex !== -1) {
            const [dish] = sourceMenu.dishes.splice(dishIndex, 1);
            targetMenu.dishes.push(dish);
          }
        }

        return true;
      } catch (error) {
        console.error('Error moving dish between menus:', error);
        return false;
      }
    },
  },
});
