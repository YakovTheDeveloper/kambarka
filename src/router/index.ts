import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view/HomeView.vue'
import GamesView from '@/views/games-view/GamesView.vue'
import SightsView from '@/views/sights-view/SightsView.vue'
import AnimalView from '@/views/animal-view/AnimalView.vue'
import TrashGameView from '@/views/games-view/trash-game-view/TrashGameView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView,
    },
    {
      path: '/games/trash',
      name: 'games/trash',
      component: TrashGameView,
    },
    {
      path: '/sights',
      name: 'sights',
      component: SightsView,
    },
    {
      path: '/animal',
      name: 'animal',
      component: AnimalView,
    },
  ],
})

export default router
