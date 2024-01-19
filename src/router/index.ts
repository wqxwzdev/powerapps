import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MyLayout from '@/views/MyLayout.vue'
import CarList from '@/views/CarList.vue'
import { loadingBar } from '@/utils/naiveTool'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MyLayout,
    redirect: '/list',
    children: [
      {
        path: 'list',
        name: 'CarList',
        component: CarList,
        meta: {
          title: '車両検索一覧'
        }
      },
      {
        path: 'detail',
        name: 'CarDetail',
        component: () => import('@/views/CarDetail.vue'),
        meta: {
          title: '車両情報照会'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登録'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { left: 0, top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  loadingBar.start()
  if (to.path === '/login') {
    next()
  } else {
    if (sessionStorage.getItem('login')) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? (to.meta.title as string) : document.title
  loadingBar.finish()
})

export default router
