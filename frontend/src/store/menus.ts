import { defineStore } from 'pinia';
import { fetchMenus, createMenu, updateMenuById, deleteMenuById } from '../services/menuService';
import { addDishToMenu, removeDishFromMenu } from '../services/dishService';

export const useMenuStore = defineStore('menus', {
  state: () => ({
    menus: [] as Array<{ id: string; day: string; variant: string; dishes: any[] }>,
  }),
  actions: {
    async loadMenus() {
      const response = await fetchMenus();
      if (response.success) {
        this.menus = response.data;
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
      const response = await addDishToMenu(menuId, dishId);
      if (response.success) {
        const menu = this.menus.find((menu) => menu.id === menuId);
        if (menu) {
          menu.dishes.push(response.data);
        }
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
      // Удалить блюдо из исходного меню
      const removeResponse = await removeDishFromMenu(fromMenuId, dishId);
      if (!removeResponse.success) {
        console.error('Failed to remove dish from the source menu');
        return false;
      }
    
      // Добавить блюдо в целевое меню
      const addResponse = await addDishToMenu(toMenuId, dishId);
      if (!addResponse.success) {
        console.error('Failed to add dish to the target menu');
        await addDishToMenu(fromMenuId, dishId);
        return false;
      }
    
      // Обновить локальное состояние
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
    }    
    
  },
});
