import { Home, Search, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/notebooks', label: 'Search', Icon: Search },
  { to: '/dashboard', label: 'Home', Icon: Home },
  { to: '/ai', label: 'AI', Icon: Sparkles },
];

function AppPrimaryNav() {
  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex md:w-20 lg:w-56 shrink-0 border-r border-zinc-800 bg-zinc-950">
        <nav className="w-full p-3 lg:p-4 space-y-2">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-center lg:justify-start gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                }`
              }
            >
              <Icon size={20} />
              <span className="hidden lg:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-3">
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-zinc-100' : 'text-zinc-500'
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

export default AppPrimaryNav;
