import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

import Pesquisa from '../views/pesquisa/Pesquisa.vue';
import OperacaoDePulverizacao from '../views/pesquisa/OperacaoDePulverizacao.vue';

import Pulverizacao from '../views/pulverizacao/Pulverizacao.vue';

import Alvos from '../views/pulverizacao/alvos/Alvos.vue';

import Produtos from '../views/pulverizacao/produtos/Produtos.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/pesquisa',
    name: 'Pesquisa',
    component: Pesquisa
  },
  {
    path: '/operacaoDePulverizacao',
    name: 'OperacaoDePulverizacao',
    component: OperacaoDePulverizacao
  },
  {
    path: '/pulverizacao',
    name: 'Pulverizacao',
    component: Pulverizacao
  },
  {
    path: '/alvos',
    name: 'Alvos',
    component: Alvos
  },

  {
    path: '/produtos',
    name: 'Produtos',
    component: Produtos
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
