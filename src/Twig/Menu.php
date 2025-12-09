<?php

namespace App\Twig;

use App\Service\Settings;
use Symfony\Component\HttpKernel\KernelInterface;

class Menu
{

    public function __construct(
        private Settings $settings,
        private KernelInterface $kernel
    ) {
    }

    public function items()
    {
        $menu = $this->settings->get('feature_version') === 'Basic' ? $this->getBasicMenu() : $this->getAdvancedMenu();

        foreach ($menu as &$item) {
            $column = array_column($item['items'], 'active');
            $item['active'] = array_merge(array_merge(...$column), $item['active']);
        }

        return $menu;
    }

    private function unsetAdvancedItems(array $items)
    {
        $idsToUnset = [
            'My stuff', 'Worklog', 'Worklog issues', 'Assets', 'Asset requests', 'Trips',
            'Expense sheets', 'Memos', 'Offices', 'Decisions',
            'Reports & Exports', 'Employees', 'Accounts',
            'Payroll', 'Expense approvals', 'Money accounts', 'Deals', 'Contracts',
            'Client contacts', 'Client feedback', 'Speedex settings', 'API documentation',
            'Year overview', 'Tax', 'Loans', 'Static Files', 'Commands',
        ];
        foreach ($items as $key => $item) {
            $items[$key]['attribute'] = ['p-3'];

            if (in_array($item['name'], $idsToUnset)) {
                unset($items[$key]);
            } elseif (array_key_exists('items', $items[$key])) {
                $items[$key]['items'] = $this->unsetAdvancedItems($items[$key]['items']);
            }
        }

        return $items;
    }

    private function getBasicMenu()
    {
        return $this->unsetAdvancedItems($this->getAdvancedMenu());
    }

    private function getAdvancedMenu()
    {
        $menu = [
            [
                'id' => 'management',
                'name' => 'Management',
                'role' => 'ROLE_HR',
                'active' => [],
                'items' => [
                    [
                        'name' => 'Worklog',
                        'active' => ['AppWorklogIndex'],
                        'route' => 'AppWorklogIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Worklog issues',
                        'active' => ['AppWorklogOverview'],
                        'route' => 'AppWorklogOverview',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Assets',
                        'active' => ['AppAssetIndex', 'AppAssetCreateFromRequest', 'AppAssetAdd', 'AppAssetEdit'],
                        'route' => 'AppAssetIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Asset requests',
                        'active' => ['AppAssetRequestIndex'],
                        'route' => 'AppAssetRequestIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_EMPLOYEE',
                    ],
                    [
                        'name' => 'Trips',
                        'active' => [
                            'AppTripIndex', 'AppTripAdd', 'AppTripEdit', 'AppTripDelete',
                        ],
                        'route' => 'AppTripIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Expense sheets',
                        'active' => [
                            'AppExpenseSheetIndex', 'AppExpenseSheetAdd', 'AppExpenseSheetEdit', 'AppExpenseSheetDelete',
                            'AppExpenseSheetAttachmentDownload',
                        ],
                        'route' => 'AppExpenseSheetIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_EMPLOYEE',
                    ],
                    [
                        'name' => 'Contacts',
                        'active' => ['AppContactIndex', 'AppContactAdd', 'AppContactEdit'],
                        'route' => 'AppContactIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Memos',
                        'active' => ['AppMemoIndex', 'AppMemoEdit', 'AppMemoAdd'],
                        'route' => 'AppMemoIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_HR',
                    ],
                    [
                        'name' => 'Offices',
                        'active' => ['AppOfficeIndex', 'AppOfficeAdd', 'AppOfficeEdit', "AppOfficeDelete"],
                        'route' => 'AppOfficeIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Decisions',
                        'active' => ['AppDecisionIndex', 'AppDecisionAdd', 'AppDecisionEdit', 'AppDecisionDelete', 'AppDecisionToggleStatus'],
                        'route' => 'AppDecisionIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                ]
            ],
            [
                'id' => 'reports-and-exports',
                'name' => 'Reports & Exports',
                'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                'active' => [],
                'items' => [
                    [
                        'name' => 'Performance indicators',
                        'active' => ['AppPerformanceIndicatorsIndex'],
                        'route' => 'AppPerformanceIndicatorsIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Work Location overview',
                        'active' => ['AppWorkLocationOverview'],
                        'route' => 'AppWorkLocationOverview',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Reports',
                        'active' => ['AppWorklogReport'],
                        'route' => 'AppWorklogReport',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    
                    [
                        'name' => 'Invoices export',
                        'active' => ['AppCapitalInvoicesExport'],
                        'route' => 'AppCapitalInvoicesExport',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    
                    
                    
                    [
                        'name' => 'Employee bonus',
                        'active' => ['AppBonusExportRequest'],
                        'route' => 'AppBonusExportRequest',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                ],
            ],
            [
                'id' => 'accounting',
                'name' => 'Accounting',
                'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                'active' => [],
                'items' => [
                    [
                        'name' => 'Transactions',
                        'active' => [
                            'ApiTransactionAdd', 'AppTransactionIndex', 'AppTransactionAdd',
                            'AppTransactionEdit', 'AppTransactionDetailsJson', 'AppTransactionDelete',
                            'AppTransactionUploadAttachment', 'AppTransactionDeleteAttachment', 'AppTransactionReport',
                            'AppTransactionAttachmentDownload',
                        ],
                        'route' => 'AppTransactionIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Expenses',
                        'active' => [
                            'AppExpenseIndex', 'AppExpenseAdd', 'AppExpenseEdit', 'AppExpenseDelete',
                            'AppAttachmentDownload', 'AppExpenseTags',
                        ],
                        'route' => 'AppExpenseIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Invoices',
                        'active' => ['AppInvoiceList', 'AppInvoiceAdd', 'AppInvoiceEdit'],
                        'route' => 'AppInvoiceList',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Payroll',
                        'active' => ['AppPayrollIndex', 'AppPayrollUpload', 'AppPayrollSend', 'AppPayrollSalaries'],
                        'route' => 'AppPayrollIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Expense approvals',
                        'active' => [
                            'AppExpenseRequestIndex', 'AppExpenseRequestAdd', 'AppExpenseRequestEdit', 'AppExpenseRequestDelete',
                        ],
                        'route' => 'AppExpenseRequestIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Accounts',
                        'active' => ['AppMoneyAccountIndex'],
                        'route' => 'AppMoneyAccountIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Year overview',
                        'active' => ['AppCapitalOverview'],
                        'route' => 'AppCapitalOverview',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Tax',
                        'active' => ['AppCapitalTax'],
                        'route' => 'AppCapitalTax',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Suppliers',
                        'active' => ['AppSupplierIndex', 'AppSupplierAdd', 'AppSupplierEdit'],
                        'route' => 'AppSupplierIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Loans',
                        'active' => ['AppLoanIndex', 'AppLoanAdd', 'AppLoanEdit'],
                        'route' => 'AppLoanIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                ],
            ],
            [
                'id' => 'employees',
                'name' => 'Employees',
                'role' => 'ROLE_HR',
                'active' => [],
                'items' => [
                    [
                        'name' => 'Employee list',
                        'active' => ['AppPeopleList'],
                        'route' => 'AppPeopleList',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_HR',
                    ],
                    [
                        'name' => 'Leave book',
                        'active' => ['AppLeaveBook'],
                        'route' => 'AppLeaveBook',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'PT Board',
                        'active' => ['ProjectTeamBoard'],
                        'route' => 'ProjectTeamBoard',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Who is at the office',
                        'active' => ['AppLocationIndex'],
                        'route' => 'AppWorkLocationEveryone',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_EMPLOYEE',
                    ],
                    [
                        'name' => 'Random Pick',
                        'active' => ['AppPeopleRandomPick'],
                        'route' => 'AppPeopleRandomPick',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Vacancies',
                        'active' => ['AppVacanciesIndex'],
                        'route' => 'AppVacanciesIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_HR',
                    ],
                    [
                        'name' => 'Statistics',
                        'active' => ['AppPeopleStatistics'],
                        'route' => 'AppPeopleStatistics',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Metrics',
                        'active' => ['AppMetrics'],
                        'route' => 'AppMetrics',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Asset requests',
                        'active' => ['AppAssetRequestIndex'],
                        'route' => 'AppAssetRequestIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_EMPLOYEE',
                    ],
                    [
                        'name' => 'Market place',
                        'active' => ['AppMarketPlaceProductIndex', 'AppMarketPlaceProductAdd', 'AppMarketPlaceProductEdit', 'AppMarketPlaceProductDelete'],
                        'route' => 'AppMarketPlaceProductIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_EMPLOYEE',
                    ],
                ]
            ],
            [
                'id' => 'clients',
                'name' => 'Clients',
                'role' => 'ROLE_HR',
                'active' => [],
                'items' => [
                    [
                        'name' => 'Clients',
                        'active' => ['AppClientsIndex', 'AppClientAdd', 'AppClientEdit'],
                        'route' => 'AppClientsIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Contracts',
                        'active' => ['AppContractsList', 'AppContractsAdd'],
                        'route' => 'AppContractsList',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_ACCOUNTING_ASSISTANT',
                    ],
                    [
                        'name' => 'Client contacts',
                        'active' => ['AppClientContactIndex', 'AppClientContactAdd', 'AppClientContactEdit'],
                        'route' => 'AppClientContactIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Client feedback',
                        'active' => ['AppClientFeedbackIndex'],
                        'route' => 'AppClientFeedbackIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_HR',
                    ],
                ],
            ],
            [
                'id' => 'settings',
                'name' => 'Settings',
                'role' => 'ROLE_MANAGER',
                'active' => [],
                'items' => [
                    [
                        'name' => 'Series',
                        'active' => ['AppSeriesList', 'AppSeriesAddForm', 'AppSeriesEditForm'],
                        'route' => 'AppSeriesList',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Settings',
                        'active' => ['AppSettingsList', 'AppSettingsEdit'],
                        'route' => 'AppSettingsList',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Static Files',
                        'active' => ['AppStaticFilesIndex', 'AppStaticFilesAdd', 'AppStaticFilesEdit', 'AppStaticFilesDelete', 'AppStaticFilesView'],
                        'route' => 'AppStaticFilesIndex',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Commands',
                        'active' => ['AppCommandList', 'AppCommandAdd', 'AppCommandEdit'],
                        'route' => 'AppCommandList',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                    [
                        'name' => 'Change password',
                        'active' => ['AppChangePassword'],
                        'route' => 'AppChangePassword',
                        'externalLink' => '',
                        'target' => '',
                        'role' => 'ROLE_MANAGER',
                    ],
                ],
            ],
        ];

        if ($this->kernel->getEnvironment() === 'dev') {
            foreach ($menu as &$section) {
                if ($section['id'] === 'settings') {
                    $section['items'][] = [
                        'name' => 'API documentation',
                        'active' => [],
                        'route' => '',
                        'externalLink' => '/documentation',
                        'target' => '_blank',
                        'role' => 'ROLE_MANAGER',
                    ];

                    break;
                }
            }
        }

        return $menu;
    }
}
