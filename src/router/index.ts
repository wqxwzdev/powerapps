import { createRouter, createWebHistory } from 'vue-router'
import CarList from '@/views/CarList.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
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

router.afterEach((to) => {
  document.title = to.meta.title ?? document.title
})

export default router
