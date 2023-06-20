import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from "../pages/Login";
import Home from "../pages/Home";
import Introduce from '../pages/Home/Introduce'
import SearchBooks from "../pages/Home/SearchBooks";
import Reserve from "../pages/Home/Reserve";
import Remark from "../pages/Home/Remark/index.vue";




export default new VueRouter({
  routes: [{
    path: '*',
    redirect: '/Login'
  },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children:[{
        path:'/',
        component:Home
      },
        {
          path:'introduce',
          component: Introduce,
        },
        {
          path:'search',
          name:'SearchBooks',
          component:SearchBooks
        },
        {
          path:'reserve',
          name:'Reserve',
          component:Reserve
        },
        {
          path:'remark',
          component:Remark
        }
      ]
    },
  ]
})
