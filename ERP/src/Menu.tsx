import React, { useMemo } from 'react'

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

const classNames = (...values: Array<string | undefined | false>) =>
  values.filter(Boolean).join(' ')

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

const Menu = ({
  featureVersion = 'Advanced',
  currentRoute,
  userRoles,
  environment = 'prod',
  resolveRoute = (route) => (route ? route : '#'),
}: MenuProps) => {
  const menu = useMemo(() => buildMenu(featureVersion, environment), [featureVersion, environment])

  const canSeeItem = (role: string) => userRoles.includes(role)
  const isActive = (item: MenuItem) => (currentRoute ? item.active.includes(currentRoute) : false)
  const linkHref = (item: MenuItem) => item.externalLink || resolveRoute(item.route ?? '#')

  return (
    <nav aria-label="Main navigation">
      <ul className="navbar-nav mr-auto">
        {menu.filter((section) => canSeeItem(section.role)).map((section) => {
          const sectionId = section.id || section.name.replace(/\s+/g, '-').toLowerCase()

          if (section.items?.length) {
            return (
              <li
                key={sectionId}
                className={classNames('nav-item dropdown', isActive(section) && 'active')}
              >
                <a
                  id={`menu-${sectionId}`}
                  className={classNames('nav-link dropdown-toggle', ...(section.attribute ?? []))}
                  href="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {section.name}
                </a>

                <div className="dropdown-menu" aria-labelledby={`menu-${sectionId}`}>
                  {section.items
                    .filter((child) => canSeeItem(child.role))
                    .map((child) => (
                      <a
                        key={child.name}
                        className={classNames('dropdown-item', ...(child.attribute ?? []))}
                        target={child.target || undefined}
                        rel={child.target === '_blank' ? 'noreferrer' : undefined}
                        href={linkHref(child)}
                      >
                        {child.name}
                      </a>
                    ))}
                </div>
              </li>
            )
          }

          return (
            <li
              key={sectionId}
              className={classNames('nav-item', isActive(section) && 'active')}
            >
              <a
                className={classNames('nav-link', ...(section.attribute ?? []))}
                href={linkHref(section)}
                target={section.target || undefined}
                rel={section.target === '_blank' ? 'noreferrer' : undefined}
              >
                {section.name}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Menu
