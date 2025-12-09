import './App.css'
import Menu from './Menu'

const roles = [
  'ROLE_MANAGER',
  'ROLE_ACCOUNTING_ASSISTANT',
  'ROLE_EMPLOYEE',
  'ROLE_HR',
]

function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            Demo
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            React Menu (powered by Menu.tsx)
          </h1>
          <p className="text-slate-600">
            Example usage with full roles; replace with your own role list, feature version,
            current route, and resolver.
          </p>
        </header>

        <Menu
          featureVersion="Advanced"
          currentRoute="AppTransactionIndex"
          userRoles={roles}
          environment="dev"
          resolveRoute={(route) => (route ? `/route/${route}` : '#')}
        />
      </div>
    </main>
  )
}

export default App
