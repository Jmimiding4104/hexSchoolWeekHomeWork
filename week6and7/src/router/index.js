import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView
      },
      {
        path: 'Cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'Products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'Product/:id',
        component: () => import('../views/ProductView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'AdminCouple',
        component: () => import('../views/AdminCouple.vue')
      },
      {
        path: 'AdminProducts',
        component: () => import('../views/AdminProducts.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
