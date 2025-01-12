import { defineStore } from 'pinia';
import { fetchDishes, createDish } from '../services/dishService';

export const useDishStore = defineStore('dishes', {
  state: () => ({
    dishes: [] as Array<{ id: string; name: string; type: string; }>,
  }),
  actions: {
    async loadDishes() {
      const response = await fetchDishes();
      if (response.success) {
        this.dishes = response.data;
      }
    },
    async addDish(dish: { name: string; type: string; }) {
      const response = await createDish(dish);
      if (response.success) {
        this.dishes.push(response.data);
      }
    },
  },
});
