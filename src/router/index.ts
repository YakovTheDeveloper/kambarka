import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view/HomeView.vue'
import GamesView from '@/views/games-view/GamesView.vue'
import SightsView from '@/views/sights-view/SightsView.vue'
import AnimalView from '@/views/animal-view/AnimalView.vue'
import TrashGameView from '@/views/games-view/trash-game-view/TrashGameView.vue'
import TrashGameDifficulty from '@/views/games-view/trash-game-view/TrashGameDifficulty.vue'
import FindDifferenceDifficulty from '@/views/games-view/find-difference-game-view/FindDifferenceDifficulty.vue'
import FindDifferenceGameView from '@/views/games-view/find-difference-game-view/FindDifferenceGameView.vue'
import GameFinish from '@/views/games-view/shared/GameFinish.vue'
import FindDifferenceFinish from '@/views/games-view/find-difference-game-view/FindDifferenceFinish.vue'
import MemoryGameDifficulty from '@/views/games-view/memory-game-view/MemoryGameDifficulty.vue'
import MemoryGameView from '@/views/games-view/memory-game-view/MemoryGameView.vue'
import MemoryGameFinish from '@/views/games-view/memory-game-view/MemoryGameFinish.vue'

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
      path: '/games/trash-difficulty',
      name: 'games/trash-difficulty',
      component: TrashGameDifficulty,
    },
    {
      path: '/games/trash',
      name: 'games/trash',
      component: TrashGameView,
    },
    {
      path: '/games/trash/finish',
      name: 'games/trash/finish',
      component: GameFinish,
    },
    {
      path: '/games/find-difference-difficulty',
      name: 'games/find-difference-difficulty',
      component: FindDifferenceDifficulty,
    },
    {
      path: '/games/find-difference',
      name: 'games/find-difference',
      component: FindDifferenceGameView,
    },
    {
      path: '/games/find-difference/finish',
      name: 'games/find-difference/finish',
      component: FindDifferenceFinish,
    },
    {
      path: '/games/memory-difficulty',
      name: 'games/memory-difficulty',
      component: MemoryGameDifficulty,
    },
    {
      path: '/games/memory',
      name: 'games/memory',
      component: MemoryGameView,
    },
    {
      path: '/games/memory/finish',
      name: 'games/memory/finish',
      component: MemoryGameFinish,
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
