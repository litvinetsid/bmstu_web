import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import MenuPage from '../pages/MenuPage.vue';
import DishPage from '../pages/DishPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/menus', name: 'Menus', component: MenuPage },
  { path: '/dishes', name: 'Dishes', component: DishPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
