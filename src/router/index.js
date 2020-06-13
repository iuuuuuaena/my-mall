import Vue from 'vue'
import Router from 'vue-router'
import '@/assets/css/reset.css'
import '@/assets/css/header.css'

Vue.use(Router)

import ShopView from '@/views/ShopView'
import EachItem from '@/views/EachItem'
import CartView from '@/views/CartView'
import Checkout from '@/views/checkout'
import Payment from '@/views/payment'
import AccountView from '@/views/AccountView'
import Order from '@/views/account/order'
import Address from '@/views/account/address'
import Publish from '@/views/PublishView'
import LoginView from '@/views/LoginView'
import UserInfo from '@/views/account/UserInfo'
import MallMain from '@/views/MallMain'
import RegisterView from '@/views/RegisterView.vue'
import PayView from '@/views/PayView.vue'
import ChatView from '@/views/ChatView.vue'

import SearchView from '@/views/SearchView.vue'
import AllGoodsView from '@/views/AllGoodsView.vue'





export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/shop',
      name: 'Shop',
      component: ShopView
    },
    {
      path: '/pay',
      name: 'Pay',
      component: PayView
    },
    {
      path: '/chat',
      name: 'Chat',
      component: ChatView
    },
    {
      path: '/all',
      name: 'All',
      component: AllGoodsView
    },
    {
      path: '/',
      name: 'Main',
      component: MallMain
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchView
    },
    {
      path: '/item',
      name: 'Item',
      component: EachItem
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/account',
      component: AccountView,
      children: [
        {
          path: '/',
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: '/order',
          name: 'Account',
          component: Order
        },
        {
          path: '/address',
          name: 'Address',
          component: Address
        },
      ]
    }
  ]
})
