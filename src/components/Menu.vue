<script setup lang="ts">
import { computed } from 'vue'

type MenuItem = {
  id?: string
  name: string
  active: string[]
  route?: string
  externalLink?: string
  target?: string
  role: string
  items?: MenuItem[]
  attribute?: string[]
}

type MenuProps = {
  featureVersion?: 'Basic' | 'Advanced'
  currentRoute?: string
  userRoles: string[]
  environment?: string
  resolveRoute?: (route?: string) => string
}

const idsToUnset: string[] = [
  'My stuff',
  'Worklog',
  'Worklog issues',
  'Assets',
  'Asset requests',
  'Trips',
  'Expense sheets',
  'Memos',
  'Offices',
  'Decisions',
  'Reports & Exports',
  'Employees',
  'Accounts',
  'Payroll',
  'Expense approvals',
  'Money accounts',
  'Deals',
  'Contracts',
  'Client contacts',
  'Client feedback',
  'Speedex settings',
  'API documentation',
  'Year overview',
  'Tax',
  'Loans',
  'Static Files',
  'Commands',
]

const advancedMenu: MenuItem[] = [
  {
    id: 'management',
    name: 'Management',
    role: 'ROLE_HR',
    active: [],
    items: [
      {
        name: 'Worklog',
        active: ['AppWorklogIndex'],
        route: 'AppWorklogIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Worklog issues',
        active: ['AppWorklogOverview'],
        route: 'AppWorklogOverview',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Assets',
        active: ['AppAssetIndex', 'AppAssetCreateFromRequest', 'AppAssetAdd', 'AppAssetEdit'],
        route: 'AppAssetIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Asset requests',
        active: ['AppAssetRequestIndex'],
        route: 'AppAssetRequestIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_EMPLOYEE',
      },
      {
        name: 'Trips',
        active: ['AppTripIndex', 'AppTripAdd', 'AppTripEdit', 'AppTripDelete'],
        route: 'AppTripIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Expense sheets',
        active: [
          'AppExpenseSheetIndex',
          'AppExpenseSheetAdd',
          'AppExpenseSheetEdit',
          'AppExpenseSheetDelete',
          'AppExpenseSheetAttachmentDownload',
        ],
        route: 'AppExpenseSheetIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_EMPLOYEE',
      },
      {
        name: 'Contacts',
        active: ['AppContactIndex', 'AppContactAdd', 'AppContactEdit'],
        route: 'AppContactIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Memos',
        active: ['AppMemoIndex', 'AppMemoEdit', 'AppMemoAdd'],
        route: 'AppMemoIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_HR',
      },
      {
        name: 'Offices',
        active: ['AppOfficeIndex', 'AppOfficeAdd', 'AppOfficeEdit', 'AppOfficeDelete'],
        route: 'AppOfficeIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Decisions',
        active: [
          'AppDecisionIndex',
          'AppDecisionAdd',
          'AppDecisionEdit',
          'AppDecisionDelete',
          'AppDecisionToggleStatus',
        ],
        route: 'AppDecisionIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
    ],
  },
  {
    id: 'reports-and-exports',
    name: 'Reports & Exports',
    role: 'ROLE_ACCOUNTING_ASSISTANT',
    active: [],
    items: [
      {
        name: 'Performance indicators',
        active: ['AppPerformanceIndicatorsIndex'],
        route: 'AppPerformanceIndicatorsIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Work Location overview',
        active: ['AppWorkLocationOverview'],
        route: 'AppWorkLocationOverview',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Reports',
        active: ['AppWorklogReport'],
        route: 'AppWorklogReport',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Invoices export',
        active: ['AppCapitalInvoicesExport'],
        route: 'AppCapitalInvoicesExport',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Employee bonus',
        active: ['AppBonusExportRequest'],
        route: 'AppBonusExportRequest',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
    ],
  },
  {
    id: 'accounting',
    name: 'Accounting',
    role: 'ROLE_ACCOUNTING_ASSISTANT',
    active: [],
    items: [
      {
        name: 'Transactions',
        active: [
          'ApiTransactionAdd',
          'AppTransactionIndex',
          'AppTransactionAdd',
          'AppTransactionEdit',
          'AppTransactionDetailsJson',
          'AppTransactionDelete',
          'AppTransactionUploadAttachment',
          'AppTransactionDeleteAttachment',
          'AppTransactionReport',
          'AppTransactionAttachmentDownload',
        ],
        route: 'AppTransactionIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Expenses',
        active: [
          'AppExpenseIndex',
          'AppExpenseAdd',
          'AppExpenseEdit',
          'AppExpenseDelete',
          'AppAttachmentDownload',
          'AppExpenseTags',
        ],
        route: 'AppExpenseIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Invoices',
        active: ['AppInvoiceList', 'AppInvoiceAdd', 'AppInvoiceEdit'],
        route: 'AppInvoiceList',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Payroll',
        active: ['AppPayrollIndex', 'AppPayrollUpload', 'AppPayrollSend', 'AppPayrollSalaries'],
        route: 'AppPayrollIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Expense approvals',
        active: ['AppExpenseRequestIndex', 'AppExpenseRequestAdd', 'AppExpenseRequestEdit', 'AppExpenseRequestDelete'],
        route: 'AppExpenseRequestIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Accounts',
        active: ['AppMoneyAccountIndex'],
        route: 'AppMoneyAccountIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Year overview',
        active: ['AppCapitalOverview'],
        route: 'AppCapitalOverview',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Tax',
        active: ['AppCapitalTax'],
        route: 'AppCapitalTax',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Suppliers',
        active: ['AppSupplierIndex', 'AppSupplierAdd', 'AppSupplierEdit'],
        route: 'AppSupplierIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Loans',
        active: ['AppLoanIndex', 'AppLoanAdd', 'AppLoanEdit'],
        route: 'AppLoanIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
    ],
  },
  {
    id: 'employees',
    name: 'Employees',
    role: 'ROLE_HR',
    active: [],
    items: [
      {
        name: 'Employee list',
        active: ['AppPeopleList'],
        route: 'AppPeopleList',
        externalLink: '',
        target: '',
        role: 'ROLE_HR',
      },
      {
        name: 'Leave book',
        active: ['AppLeaveBook'],
        route: 'AppLeaveBook',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'PT Board',
        active: ['ProjectTeamBoard'],
        route: 'ProjectTeamBoard',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Who is at the office',
        active: ['AppLocationIndex'],
        route: 'AppWorkLocationEveryone',
        externalLink: '',
        target: '',
        role: 'ROLE_EMPLOYEE',
      },
      {
        name: 'Random Pick',
        active: ['AppPeopleRandomPick'],
        route: 'AppPeopleRandomPick',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Vacancies',
        active: ['AppVacanciesIndex'],
        route: 'AppVacanciesIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_HR',
      },
      {
        name: 'Statistics',
        active: ['AppPeopleStatistics'],
        route: 'AppPeopleStatistics',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Metrics',
        active: ['AppMetrics'],
        route: 'AppMetrics',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Asset requests',
        active: ['AppAssetRequestIndex'],
        route: 'AppAssetRequestIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_EMPLOYEE',
      },
      {
        name: 'Market place',
        active: [
          'AppMarketPlaceProductIndex',
          'AppMarketPlaceProductAdd',
          'AppMarketPlaceProductEdit',
          'AppMarketPlaceProductDelete',
        ],
        route: 'AppMarketPlaceProductIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_EMPLOYEE',
      },
    ],
  },
  {
    id: 'clients',
    name: 'Clients',
    role: 'ROLE_HR',
    active: [],
    items: [
      {
        name: 'Clients',
        active: ['AppClientsIndex', 'AppClientAdd', 'AppClientEdit'],
        route: 'AppClientsIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Contracts',
        active: ['AppContractsList', 'AppContractsAdd'],
        route: 'AppContractsList',
        externalLink: '',
        target: '',
        role: 'ROLE_ACCOUNTING_ASSISTANT',
      },
      {
        name: 'Client contacts',
        active: ['AppClientContactIndex', 'AppClientContactAdd', 'AppClientContactEdit'],
        route: 'AppClientContactIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Client feedback',
        active: ['AppClientFeedbackIndex'],
        route: 'AppClientFeedbackIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_HR',
      },
    ],
  },
  {
    id: 'settings',
    name: 'Settings',
    role: 'ROLE_MANAGER',
    active: [],
    items: [
      {
        name: 'Series',
        active: ['AppSeriesList', 'AppSeriesAddForm', 'AppSeriesEditForm'],
        route: 'AppSeriesList',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Settings',
        active: ['AppSettingsList', 'AppSettingsEdit'],
        route: 'AppSettingsList',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Static Files',
        active: [
          'AppStaticFilesIndex',
          'AppStaticFilesAdd',
          'AppStaticFilesEdit',
          'AppStaticFilesDelete',
          'AppStaticFilesView',
        ],
        route: 'AppStaticFilesIndex',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Commands',
        active: ['AppCommandList', 'AppCommandAdd', 'AppCommandEdit'],
        route: 'AppCommandList',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
      {
        name: 'Change password',
        active: ['AppChangePassword'],
        route: 'AppChangePassword',
        externalLink: '',
        target: '',
        role: 'ROLE_MANAGER',
      },
    ],
  },
]

const cloneMenu = (items: MenuItem[]): MenuItem[] =>
  items.map((item) => ({
    ...item,
    items: item.items ? cloneMenu(item.items) : undefined,
    attribute: [...(item.attribute ?? [])],
  }))

const addClassAttributes = (items: MenuItem[]): MenuItem[] =>
  items.map((item) => ({
    ...item,
    attribute: Array.from(new Set([...(item.attribute ?? []), 'p-3'])),
    items: item.items ? addClassAttributes(item.items) : undefined,
  }))

const unsetAdvancedItems = (items: MenuItem[]): MenuItem[] =>
  items
    .filter((item) => !idsToUnset.includes(item.name))
    .map((item) => ({
      ...item,
      items: item.items ? unsetAdvancedItems(item.items) : undefined,
    }))

const collectChildActive = (items?: MenuItem[]): string[] => {
  if (!items) {
    return []
  }

  return items.reduce<string[]>((routes, item) => {
    routes.push(...(item.active ?? []), ...collectChildActive(item.items))
    return routes
  }, [])
}

const mergeActiveRoutes = (items: MenuItem[]): MenuItem[] =>
  items.map((item) => {
    const nested = item.items ? mergeActiveRoutes(item.items) : undefined
    const childRoutes = collectChildActive(nested)

    return {
      ...item,
      items: nested,
      active: Array.from(new Set([...(item.active ?? []), ...childRoutes])),
    }
  })

const getAdvancedMenu = (environment: string): MenuItem[] => {
  const menu = cloneMenu(advancedMenu)

  if (environment === 'dev') {
    const settings = menu.find((section) => section.id === 'settings')

    if (settings?.items) {
      settings.items = [
        ...settings.items,
        {
          name: 'API documentation',
          active: [],
          route: '',
          externalLink: '/documentation',
          target: '_blank',
          role: 'ROLE_MANAGER',
        },
      ]
    }
  }

  return menu
}

const buildMenu = (featureVersion: 'Basic' | 'Advanced', environment: string): MenuItem[] => {
  const withAttributes = addClassAttributes(getAdvancedMenu(environment))
  const filtered = featureVersion === 'Basic' ? unsetAdvancedItems(withAttributes) : withAttributes

  return mergeActiveRoutes(filtered)
}

const cn = (...values: Array<string | undefined | false | string[]>) =>
  values.flat().filter(Boolean).join(' ')

const props = withDefaults(defineProps<MenuProps>(), {
  featureVersion: 'Advanced',
  environment: 'prod',
  resolveRoute: (route?: string) => (route ? route : '#'),
})

const menu = computed(() => buildMenu(props.featureVersion, props.environment))
const visibleSections = computed(() => menu.value.filter((section) => props.userRoles.includes(section.role)))

const isActive = (item: MenuItem) =>
  props.currentRoute ? item.active.includes(props.currentRoute) : false

const linkHref = (item: MenuItem) => item.externalLink || props.resolveRoute(item.route ?? '#')
</script>

<template>
  <div class="relative w-full">
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-sky-50"
      aria-hidden="true"
    />

    <div
      class="relative mx-auto max-w-6xl space-y-4 rounded-3xl border border-slate-100 bg-white/70 p-6 shadow-xl backdrop-blur"
    >
      <header class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Navigation</p>
          <h2 class="text-2xl font-bold text-slate-900">Menu</h2>
        </div>

        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-600"
          >
            {{ props.featureVersion }} mode
          </span>
          <span
            class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-600"
          >
            {{ props.environment }} env
          </span>
        </div>
      </header>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="section in visibleSections"
          :key="section.id || section.name"
          :class="cn(
            'group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg',
            isActive(section) && 'ring-2 ring-teal-100 bg-teal-50/60',
            section.attribute ?? [],
          )"
        >
          <div class="flex items-start justify-between px-4 py-3">
            <div class="space-y-1">
              <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                {{ section.id ?? 'Section' }}
              </p>
              <p class="text-lg font-semibold text-slate-900">{{ section.name }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-600"
              >
                {{ section.role.replace('ROLE_', '') }}
              </span>
              <svg
                v-if="section.items?.length"
                class="h-4 w-4 text-slate-500 transition group-hover:text-teal-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <div class="border-t border-slate-100" />

          <div class="p-3">
            <template v-if="section.items?.length">
              <div class="space-y-1">
                <a
                  v-for="child in section.items.filter((child) => props.userRoles.includes(child.role))"
                  :key="child.name"
                  :class="cn(
                    'group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200',
                    isActive(child)
                      ? 'bg-teal-50 text-teal-700 ring-1 ring-teal-100 shadow-sm'
                      : 'hover:bg-slate-50',
                    child.attribute ?? [],
                  )"
                  :target="child.target || undefined"
                  :rel="child.target === '_blank' ? 'noreferrer' : undefined"
                  :href="linkHref(child)"
                >
                  <span class="flex flex-col items-start">
                    <span>{{ child.name }}</span>
                    <span class="text-xs font-normal text-slate-500">
                      {{ child.externalLink ? child.externalLink : child.route }}
                    </span>
                  </span>
                  <svg
                    class="h-4 w-4 text-slate-400 group-hover:text-teal-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </template>
            <template v-else>
              <a
                :class="cn(
                  'group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200',
                  isActive(section) && 'bg-teal-50 text-teal-700 ring-1 ring-teal-100 shadow-sm',
                  section.attribute ?? [],
                )"
                :href="linkHref(section)"
                :target="section.target || undefined"
                :rel="section.target === '_blank' ? 'noreferrer' : undefined"
              >
                <span class="flex flex-col items-start">
                  <span>{{ section.name }}</span>
                  <span class="text-xs font-normal text-slate-500">
                    {{ section.externalLink ? section.externalLink : section.route }}
                  </span>
                </span>
                <svg
                  class="h-4 w-4 text-slate-400 group-hover:text-teal-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
