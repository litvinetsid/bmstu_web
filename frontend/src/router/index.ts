import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import RefuellerPage from '../pages/RefuellerPage.vue';
import IssuePage from '../pages/IssuePage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/refuellers', name: 'Refuellers', component: RefuellerPage },
  { path: '/issues', name: 'Issues', component: IssuePage },
  { path: '/issues/:id', name: 'IssueEdit', component: IssuePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
