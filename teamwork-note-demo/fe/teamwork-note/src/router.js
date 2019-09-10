import Vue from 'vue';
import VueRouter from 'vue-router';
import List from './pages/list';
import Edit from './pages/edit';
import Preview from './pages/preview';

Vue.use(VueRouter);

export default new VueRouter({
  base: '/',
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/edit'
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/edit',
      component: Edit
    }, {
      path: '/preview',
      component: Preview
    },
  ]
});