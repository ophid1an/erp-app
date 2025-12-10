import { createRouter, createWebHistory } from 'vue-router'
import MenuDemo from './views/MenuDemo.vue'
import Login from './views/Login.vue'
import ResetPassword from './views/ResetPassword.vue'
import EmployeesList from './views/EmployeesList.vue'
import Dashboard from './views/Dashboard.vue'
import TransactionsList from './views/TransactionsList.vue'
import ClientsList from './views/ClientsList.vue'
import InvoicesList from './views/InvoicesList.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuDemo,
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransactionsList,
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: InvoicesList,
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientsList,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/reset',
    name: 'reset',
    component: ResetPassword,
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeesList,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
