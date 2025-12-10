import { createRouter, createWebHistory } from 'vue-router'
import MenuDemo from './views/MenuDemo.vue'
import Login from './views/Login.vue'
import ResetPassword from './views/ResetPassword.vue'
import EmployeesList from './views/EmployeesList.vue'
import Dashboard from './views/Dashboard.vue'
import TransactionsList from './views/TransactionsList.vue'
import ClientsList from './views/ClientsList.vue'
import InvoicesList from './views/InvoicesList.vue'
import ExpensesList from './views/ExpensesList.vue'
import SuppliersList from './views/SuppliersList.vue'
import Payroll from './views/Payroll.vue'
import Reports from './views/Reports.vue'

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
    path: '/expenses',
    name: 'expenses',
    component: ExpensesList,
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: SuppliersList,
  },
  {
    path: '/payroll',
    name: 'payroll',
    component: Payroll,
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports,
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
