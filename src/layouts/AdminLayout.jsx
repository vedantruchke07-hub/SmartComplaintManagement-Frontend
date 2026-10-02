import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  ShieldCheck,
  LogOut,
} from 'lucide-react'
import { useState } from 'react'

function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
    },
    {
      label: 'All Complaints',
      icon: ClipboardList,
      path: '/admin/complaints',
    },
    {
      label: 'Pending',
      icon: Clock3,
      path: '/admin/pending',
    },
    {
      label: 'In Progress',
      icon: LoaderCircle,
      path: '/admin/in-progress',
    },
    {
      label: 'Resolved',
      icon: CheckCircle2,
      path: '/admin/resolved',
    },
    {
      label: 'Feedback',
      icon: MessageSquare,
      path: '/admin/feedback',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ]

  const getPageTitle = () => {
    if (location.pathname === '/admin') {
      return 'Admin Dashboard'
    }

    const currentItem = navItems.find(
      (item) => location.pathname === item.path
    )

    return currentItem?.label || 'Admin Dashboard'
  }

  return (
    <div className="app-shell">
      <aside
        className={`sidebar ${
          sidebarCollapsed ? 'collapsed' : ''
        }`}
      >
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck
              size={22}
              strokeWidth={2.4}
            />
          </div>

          {!sidebarCollapsed && (
            <div className="brand-text">
              <span>Smart</span>Admin
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">
            {!sidebarCollapsed && 'ADMIN PORTAL'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `nav-item ${
                    isActive ? 'active' : ''
                  }`
                }
                title={
                  sidebarCollapsed
                    ? item.label
                    : ''
                }
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                />

                {!sidebarCollapsed && (
                  <span>{item.label}</span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="collapse-button"
            onClick={() =>
              setSidebarCollapsed(
                !sidebarCollapsed
              )
            }
          >
            {sidebarCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}

            {!sidebarCollapsed && (
              <span>
                Collapse sidebar
              </span>
            )}
          </button>

          <button
            className="collapse-button"
            onClick={() =>
              navigate('/dashboard')
            }
          >
            <LogOut size={18} />

            {!sidebarCollapsed && (
              <span>Student Portal</span>
            )}
          </button>
        </div>
      </aside>

      <main
        className={`main-area ${
          sidebarCollapsed
            ? 'expanded'
            : ''
        }`}
      >
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu">
              <Menu size={20} />
            </button>

            <div>
              <div className="breadcrumb">
                Admin Portal
                <span>/</span>
                {getPageTitle()}
              </div>

              <h1>
                {getPageTitle()}
              </h1>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search complaints..."
              />

              <span className="search-shortcut">
                ⌘ K
              </span>
            </div>

            <button
              className="icon-button"
              onClick={() =>
                navigate(
                  '/admin/notifications'
                )
              }
            >
              <Bell size={19} />

              <span className="notification-dot" />
            </button>

            <div className="user-profile">
              <div className="avatar">
                VP
              </div>

              <div className="user-info">
                <strong>
                  Vedant Patil
                </strong>

                <span>
                  Administrator
                </span>
              </div>
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout