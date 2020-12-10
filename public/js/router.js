const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/404', component: NotFound },
      { path: '/ranking', component: Ranking },
      { path: '/orders', component: Orders },
      { path: '/login', component: Login },
      { path: '/stock', component: Stock },
      { path: '/alcoholFree', component: Stock },
      { path: '/digestive', component: Stock },
      { path: '/spirit', component: Stock },
      { path: '/wine', component: Stock },
      { path: '/beer', component: Stock },
      { path: '/user', component: User },
      { path: '*', redirect: '/404' }
    ]
  })
