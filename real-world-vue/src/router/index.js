import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import nProgress from 'nprogress'
import EventService from '../services/EventService';
import GStore from '../stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: route => ({ page: parseInt(route.query.page) || 1})
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      beforeEnter: to => {
        return EventService.getEvent(to.params.id)
        .then((response)=>{
            GStore.event = response.data
        })
        .catch((err)=>{
            if(err.response && err.response.status == 404){
                return {
                name: '404-resource',
                params: { resource: 'event' }
            }
            } else {
                return { name: 'network-error'}
            }
        })
      },
      children: [
        {
          path:'',
          name:'event-details',
          component: EventDetails
        },
        {
          path:'register',
          name:'event-register',
          component: EventRegister
        },
        {
          path:'edit',
          name:'event-edit',
          component: EventEdit,
          meta: { requireAuth: true }
        }
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },
    {
      path: '/about-us',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
      alias: '/about'
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  nProgress.start()

  const notAuthorized = true
  if(to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(()=>{
      GStore.flashMessage = ''
    }, 3000)
    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }

  }
})

router.afterEach(() => {
  nProgress.done()
})

export default router
