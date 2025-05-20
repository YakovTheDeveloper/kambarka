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
import PuzzleGameDifficulty from '@/views/games-view/puzzle-game-view/PuzzleGameDifficulty.vue'
import GeoInfoView from '@/views/geo-info-view/GeoInfoView.vue'
import MonumentsView from '@/views/monuments-view/MonumentsView.vue'
import OneMonumentView from '@/views/monuments-view/OneMonumentView.vue'
import PuzzleGameView from '@/views/games-view/puzzle-game-view/PuzzleGameView.vue'
import PuzzleGame2 from '@/views/games-view/puzzle-game-view/PuzzleGame2.vue'

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
      path: '/games/puzzle-difficulty',
      name: 'games/puzzle-difficulty',
      component: PuzzleGameDifficulty,
    },
    {
      path: '/games/puzzle',
      name: 'games/puzzle',
      component: PuzzleGameView,
    },
    {
      path: '/games/puzzle2',
      name: 'games/puzzle2',
      component: PuzzleGame2,
    },
    {
      path: '/games/puzzle/finish',
      name: 'games/puzzle/finish',
      component: PuzzleGameDifficulty,
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
    {
      path: '/geo-info',
      name: 'geo-info',
      component: GeoInfoView,
    },
    {
      path: '/monuments',
      name: 'monuments',
      component: MonumentsView,
    },
    {
      path: '/monuments/:id',
      name: 'monuments-one',
      component: OneMonumentView,
    },
  ],
})

export default router
