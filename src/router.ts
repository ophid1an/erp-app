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
import Worklog from './views/Worklog.vue'
import Assets from './views/Assets.vue'
import Trips from './views/Trips.vue'
import StaticFiles from './views/StaticFiles.vue'
import Commands from './views/Commands.vue'
import Settings from './views/Settings.vue'
import Contacts from './views/Contacts.vue'
import Memos from './views/Memos.vue'
import Offices from './views/Offices.vue'
import Decisions from './views/Decisions.vue'
import ExpenseApprovals from './views/ExpenseApprovals.vue'
import Accounts from './views/Accounts.vue'
import YearOverview from './views/YearOverview.vue'
import Tax from './views/Tax.vue'
import Loans from './views/Loans.vue'
import LeaveBook from './views/LeaveBook.vue'
import PTBoard from './views/PTBoard.vue'
import OfficePresence from './views/OfficePresence.vue'
import RandomPick from './views/RandomPick.vue'
import Vacancies from './views/Vacancies.vue'
import Statistics from './views/Statistics.vue'
import Metrics from './views/Metrics.vue'
import Marketplace from './views/Marketplace.vue'

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
    path: '/worklog',
    name: 'worklog',
    component: Worklog,
  },
  {
    path: '/assets',
    name: 'assets',
    component: Assets,
  },
  {
    path: '/trips',
    name: 'trips',
    component: Trips,
  },
  {
    path: '/static-files',
    name: 'static-files',
    component: StaticFiles,
  },
  {
    path: '/commands',
    name: 'commands',
    component: Commands,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
  },
  {
    path: '/memos',
    name: 'memos',
    component: Memos,
  },
  {
    path: '/offices',
    name: 'offices',
    component: Offices,
  },
  {
    path: '/decisions',
    name: 'decisions',
    component: Decisions,
  },
  {
    path: '/expense-approvals',
    name: 'expense-approvals',
    component: ExpenseApprovals,
  },
  {
    path: '/accounts',
    name: 'accounts',
    component: Accounts,
  },
  {
    path: '/year-overview',
    name: 'year-overview',
    component: YearOverview,
  },
  {
    path: '/tax',
    name: 'tax',
    component: Tax,
  },
  {
    path: '/loans',
    name: 'loans',
    component: Loans,
  },
  {
    path: '/leave-book',
    name: 'leave-book',
    component: LeaveBook,
  },
  {
    path: '/pt-board',
    name: 'pt-board',
    component: PTBoard,
  },
  {
    path: '/office',
    name: 'office',
    component: OfficePresence,
  },
  {
    path: '/random-pick',
    name: 'random-pick',
    component: RandomPick,
  },
  {
    path: '/vacancies',
    name: 'vacancies',
    component: Vacancies,
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics,
  },
  {
    path: '/metrics',
    name: 'metrics',
    component: Metrics,
  },
  {
    path: '/marketplace',
    name: 'marketplace',
    component: Marketplace,
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
