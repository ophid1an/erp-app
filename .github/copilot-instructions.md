# Copilot Instructions for ERP Codebase

## Architecture Overview

This is a **hybrid Symfony + React application** with a clear separation between backend API and frontend. Understanding this split is critical for navigation.

### Backend (PHP/Symfony 6.4)
- **Location**: `src/` directory (root-level)
- **Pattern**: Service-oriented architecture with Doctrine ORM
- **Key directories**:
  - `src/Controller/` – HTTP endpoints (mostly return JSON for API)
  - `src/Entity/` – Doctrine ORM entities with attribute annotations (PHP 8.4 style)
  - `src/Repository/` – Custom query logic (one per Entity)
  - `src/Service/` – Business logic; nearly 50 services handling domain operations (PayrollService, ExpenseSheetService, etc.)
  - `src/Form/` – Symfony Form types for validation/data transformation (~100+ form classes)
  - `src/Security/` – Authentication (2FA via SchebTwoFactorBundle)
  - `src/Doctrine/` – Custom Doctrine listeners/filters
  - `src/Command/` – CLI commands
  - `src/SystemEmail/` – Email templates

### Frontend (React 16 + Webpack)
- **Location**: `app/` directory (legacy webpack-based)
- **New SPA**: `ERP/` directory (React 19 + Vite + TypeScript - under development)
- **Key directories**:
  - `app/pages/` – Page-level components (Dashboard, Salary, Worklog, etc.)
  - `app/components/` – Reusable UI components
  - `app/api/` – API client functions (localforage for session storage)
  - `app/routes.js` – Frontend route definitions
- **API communication**: Uses axios for HTTP; session stored via localforage

### Database
- **Engine**: MariaDB 10.5.9 (Docker service named `db`)
- **Migrations**: Doctrine migrations in `migrations/` directory
- **Design**: Comprehensive schema with 100+ entity classes covering HR, finance, projects

---

## Critical Developer Workflows

### Starting the Application
```bash
# One-time setup
cp .env .env.local
docker compose build
docker compose up

# Visit: https://erp.dev.codeseed.gr (add to /etc/hosts)
```

### Common Commands (use `make` prefix)
```bash
# PHP/Symfony
make dmm                    # Run DB migrations
make composer c="install"   # Install dependencies
make sf c="command"         # Run Symfony console command
make sh                     # Shell into PHP container
make cache-clear / cache-warmup

# Frontend (Node service)
docker exec -it erp-node npm run build

# Code quality
make php-stan               # Static analysis (level 1)
make cs-check              # PHP-CS-Fixer formatting
```

### Database Management
```bash
# Load SQL dump (development only)
./bin/dev-db-rebuild.sh <sql_file>

# DB client connection
Host: 127.0.0.1:13306 | User: root | Pass: rootpw | DB: erp
```

### Testing
- **PHPUnit**: `tests/` directory, configured in `phpunit.xml.dist`
- **E2E**: Playwright tests in `e2e/` directory (baseURL: https://erp.dev.codeseed.gr)

### Code Style & Standards
- **PHP**: PHP 8.4 with **attributes over annotations** (Rector enforces this)
- **React**: ESLint configured; check `ERP/eslint.config.js` for new app rules
- **Rector**: Use for auto-migration to PHP 8.4 attributes; configured in `rector.php`

---

## Project-Specific Patterns

### Symfony Service Patterns
1. **Service Autowiring**: Services in `src/` are auto-registered (see `config/services.yaml`)
   - Constructor injection is the norm; use typed parameters
   - Bound parameters (e.g., `$gsisWsdl`, `$httpHost`) are injected via config

2. **Form-First Validation**: Nearly all endpoints use Form types (in `src/Form/`)
   - Forms handle transformation AND validation
   - Search forms extend `BaseSearchType` (see pattern in form naming: `*SearchType`)

3. **Repository Methods**: Custom queries live in `src/Repository/` (e.g., `PersonRepository::findByTeam()`)
   - Use Doctrine query builder; lazy load relations carefully (N+1 risk)

4. **Third-Party Integrations**: 
   - **Google Sheets/Calendar**: `GoogleApi\Client`
   - **Timetastic**: `chrisharrison/timetastic-api-php` (custom VCS repo)
   - **GSIS (Greek tax)**: SOAP via `gsis_wsdl` parameter
   - **AWS S3**: File uploads via `aws/aws-sdk-php`
   - **PaymentMethods**: Viva (VivaConnector), Speedex shipping
   - **Email**: Mailpit for local testing (port 8025 for UI)

### React Frontend Patterns
1. **API Layer** (`app/api/index.js`):
   - Centralized fetch wrapper with base URL
   - Session stored in localforage with hash/expiresAt
   - Two-factor auth flow (login → 2FA → session)

2. **Route Structure** (`app/routes.js`):
   - Define all routes as object exports (Dashboard, Salary, Worklog, etc.)
   - Helper `getRoute()` for param substitution

3. **Component Organization**:
   - Pages handle data fetching and routing
   - Components are primarily presentational
   - Sidebar/Navbar/Footer in main layout

### Data Import/Export Services
- **PayrollImportService**, **TransactionImportService**, **DataImport**: Handle bulk operations
- Look for **Export.php** and **Report** services for PDF/spreadsheet generation
- Integration with **mPDF** for PDF generation

### Security & Authentication
- **2FA enabled**: via `SchebTwoFactorBundle` with email delivery
- **Roles/Permissions**: Likely in `src/Security/` (check for authorization logic)
- **Session Hash**: Used for stateless API authentication

---

## Integration Points & External Dependencies

### Key Services to Know
- **PayrollService**: Salary calculations, payslips, deductions
- **ExpenseSheetService**: Expense workflow, approvals, compliance
- **WorklogService**: Time tracking, workday assignments
- **PersonService**: Employee management (onboarding, profile, teams)
- **ReportService**: Analytics and reporting (hours, performance, happiness)
- **SlackService**, **GmailService**: Integrations for notifications
- **VivaConnector**: Payment gateway integration

### API Patterns
- **Base URL**: `api/employee/*` for main endpoints
- **Response Format**: JSON (check `app/api/index.js` for examples)
- **Authentication**: Session hash stored in localforage, passed in requests
- **Error Handling**: Check response.result boolean for success indication

### Environment Variables (`.env.local` required)
```
APP_ENV=dev
APP_SECRET=xxx
GOOGLE_API_KEY, TRELLO_KEY, TRELLO_TOKEN
GSIS_WSDL, GSIS_USERNAME, GSIS_PASSWORD
AWS_REGION, AWS_S3_BUCKET, AWS_ACCESS_KEY, AWS_SECRET_KEY
TIMETASTIC_SECRET
HTTP_HOST (set to erp.dev.codeseed.gr)
```

---

## When Making Changes

### Adding a New Feature
1. **Define Entity** in `src/Entity/` (use attributes, follow PHP 8.4 style)
2. **Create Repository** in `src/Repository/` if custom queries needed
3. **Create Service** in `src/Service/` for business logic
4. **Create Form Type** in `src/Form/` (e.g., `PersonType.php`)
5. **Create Controller** in `src/Controller/` extending `AbstractController`
6. **Create Migration** (Doctrine Migrations Bundle auto-generates)
7. **Update Frontend** with API calls and React components

### Database Migrations Workflow
```bash
# After changing an Entity:
make dmm  # Detect schema changes and create migration
# Review migration file
make dmm  # Apply it
```

### Testing New Endpoints
- Use Playwright in `e2e/` for end-to-end tests
- E2E setup auth: `auth.setup.js` (check for 2FA flow)

### Debugging Tips
- **Symfony**: Check `var/log/dev.log` inside container
- **Frontend**: Browser DevTools; localforage stores session
- **Database**: Connect via client to `127.0.0.1:13306`
- **Email**: View sent emails at `http://localhost:8025` (Mailpit)

---

## Key Files Reference

- `package.json` (root) – Node dependencies (webpack + old React app)
- `composer.json` – PHP dependencies (Symfony 6.4 + Doctrine)
- `docker-compose.yml` – Services: www (PHP), node (frontend), db (MariaDB), mailer
- `Dockerfile.php`, `Dockerfile.node` – Container definitions
- `.env.local` – Local configuration (create from `.env` template)
- `webpack.config.js` – Old frontend build (app/ uses Webpack Encore)
- `ERP/vite.config.ts` – New SPA build config (React 19 + Vite)
- `phpstan.neon` – Static analysis config (level 1)
- `eslint.config.js` (ERP/) – React linting

