import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//const Home = () => import(/* webpackChunkName: "Home" */ './components/Home.vue');
const PagedHome = () => import(/* webpackChunkName: "Home" */ './components/PagedHome.vue');
const Book = () => import(/* webpackChunkName: "Book" */ './components/Book.vue');

const router = new VueRouter({
  routes: [
        { path: '/', component: PagedHome },
        { name: 'pages_view',
        path: '/book/:page/:pageSize',
        component: PagedHome,
        props:true
     },
     {
      name: 'book_view',
      path: '/book/:id',
      component: Book,
      props: true
     }   
  ]
});

export default router;