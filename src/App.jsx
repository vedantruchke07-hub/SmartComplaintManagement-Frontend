import { useState } from 'react'

import AdminFeedback from './pages/AdminFeedback'

import AdminSettings from './pages/AdminSettings'

import AdminLogin from './pages/AdminLogin'

import AdminRegister from './pages/AdminRegister'

import StudentRegister from './pages/StudentRegister'

import StudentLogin from './pages/StudentLogin'

import AdminComplaintDetails from './pages/AdminComplaintDetails'

import {

  BrowserRouter,

  Routes,

  Route,

  Navigate,

  NavLink,

  useNavigate,

  useLocation,

} from 'react-router-dom'

import {

  LayoutDashboard,

  ClipboardList,

  PlusCircle,

  Search,

  MessageSquare,

  Bell,

  User,

  Settings,

  ChevronLeft,

  ChevronRight,

  Menu,

  CheckCircle2,

} from 'lucide-react'

import Dashboard from './pages/Dashboard'

import AdminDashboard from './pages/AdminDashboard'

import MyComplaints from './pages/MyComplaints'

import SubmitComplaint from './pages/SubmitComplaint'

import TrackComplaints from './pages/TrackComplaints'

import Feedback from './pages/Feedback'

import Notifications from './pages/Notifications'

import AdminLayout from './layouts/AdminLayout'

import './App.css'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =================================

            STUDENT AUTHENTICATION

        ================================= */}

        <Route

          path="/student/login"

          element={<StudentLogin />}

        />

        <Route

          path="/student/register"

          element={<StudentRegister />}

        />

        {/* =================================

            STUDENT PORTAL

        ================================= */}

        <Route

          path="/"

          element={

            <Navigate

              to="/dashboard"

              replace

            />

          }

        />

        <Route

          path="/dashboard"

          element={<StudentLayout />}

        />

        <Route

          path="/complaints"

          element={<StudentLayout />}

        />

        <Route

          path="/submit"

          element={<StudentLayout />}

        />

        <Route

          path="/track"

          element={<StudentLayout />}

        />

        <Route

          path="/feedback"

          element={<StudentLayout />}

        />

        <Route

          path="/notifications"

          element={<StudentLayout />}

        />

        <Route

          path="/profile"

          element={<StudentLayout />}

        />

        <Route

          path="/settings"

          element={<StudentLayout />}

        />

        {/* =================================

            ADMIN AUTHENTICATION

        ================================= */}

        <Route

          path="/admin/login"

          element={<AdminLogin />}

        />

        <Route

          path="/admin/register"

          element={<AdminRegister />}

        />

        {/* =================================

            ADMIN PORTAL

        ================================= */}

        <Route

          path="/admin"

          element={<AdminLayout />}

        >

          {/* Admin Dashboard */}

          <Route

            index

            element={<AdminDashboard />}

          />

          {/* All Complaints */}

          <Route

            path="complaints"

            element={<AdminDashboard />}

          />

{/* Complaint Details */}

<Route

  path="complaints/:id"

  element={<AdminComplaintDetails />}

/>

          {/* Pending */}

          <Route

            path="pending"

            element={<AdminDashboard />}

          />

          {/* In Progress */}

          <Route

            path="in-progress"

            element={<AdminDashboard />}

          />

          {/* Resolved */}

          <Route

            path="resolved"

            element={<AdminDashboard />}

          />

          {/* Admin Feedback */}

          <Route

            path="feedback"

            element={<AdminFeedback />}

          />

          {/* Admin Settings */}

          <Route

            path="settings"

            element={<AdminSettings />}

          />

          {/* Admin Notifications */}

          <Route

            path="notifications"

            element={

              <AdminComingSoon

                title="Admin Notifications"

                description="Admin notifications will be added here."

              />

            }

          />

        </Route>

        {/* =================================

            UNKNOWN ROUTE

        ================================= */}

        <Route

          path="*"

          element={

            <Navigate

              to="/dashboard"

              replace

            />

          }

        />

      </Routes>

    </BrowserRouter>

  )

}

/* =========================================================

   STUDENT LAYOUT

\========================================================= */

function StudentLayout() {

  const [sidebarCollapsed, setSidebarCollapsed] =

    useState(false)

  const navigate = useNavigate()

  const location = useLocation()

  const studentName =

    sessionStorage.getItem('studentName') || 'Student'

  const studentInitials = studentName

    .trim()

    .split(/\s+/)

    .slice(0, 2)

    .map((part) => part[0]?.toUpperCase() || '')

    .join('')

  const navItems = [

    {

      label: 'Dashboard',

      icon: LayoutDashboard,

      path: '/dashboard',

    },

    {

      label: 'My Complaints',

      icon: ClipboardList,

      path: '/complaints',

    },

    {

      label: 'Submit Complaint',

      icon: PlusCircle,

      path: '/submit',

    },

    {

      label: 'Track Complaints',

      icon: Search,

      path: '/track',

    },

    {

      label: 'Feedback',

      icon: MessageSquare,

      path: '/feedback',

    },

    {

      label: 'Notifications',

      icon: Bell,

      path: '/notifications',

    },

    {

      label: 'Profile',

      icon: User,

      path: '/profile',

    },

    {

      label: 'Settings',

      icon: Settings,

      path: '/settings',

    },

  ]

  const getPageTitle = () => {

    const currentItem = navItems.find(

      (item) =>

        item.path === location.pathname

    )

    return (

      currentItem?.label ||

      'Dashboard'

    )

  }

  return (

    <div className="app-shell">

      {/* =================================

          STUDENT SIDEBAR

      ================================= */}

      <aside

        className={`sidebar ${

          sidebarCollapsed

            ? 'collapsed'

            : ''

        }`}

      >

        {/* Student brand */}
        <div className="brand student-brand">
          <div className="brand-icon student-brand-icon">
            <ClipboardList size={22} strokeWidth={2.4} />
          </div>
          {!sidebarCollapsed && (
            <div className="brand-text student-brand-text">
              <span>Smart</span>
              Complaint
            </div>
          )}
        </div>

        {/* Navigation */}

        <nav className="sidebar-nav">

          <div className="nav-section-title">

            {!sidebarCollapsed && 'MAIN'}

          </div>

          {navItems.map((item) => {

            const Icon = item.icon

            return (

              <NavLink

                key={item.label}

                to={item.path}

                className={({ isActive }) =>

                  `nav-item ${

                    isActive

                      ? 'active'

                      : ''

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

                  <span>

                    {item.label}

                  </span>

                )}

              </NavLink>

            )

          })}

        </nav>

        {/* Sidebar Bottom */}

        <div className="sidebar-bottom">

          {/* Collapse */}

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

          {/* Admin Portal */}

          <button

            className="collapse-button"

            onClick={() =>

              navigate('/admin/login')

            }

          >

            <Settings size={18} />

            {!sidebarCollapsed && (

              <span>

                Admin Portal

              </span>

            )}

          </button>

        </div>

      </aside>

      {/* =================================

          STUDENT MAIN AREA

      ================================= */}

      <main

        className={`main-area ${

          sidebarCollapsed

            ? 'expanded'

            : ''

        }`}

      >

        {/* College header */}
        <div className="college-brand-header student-college-header">
          <div className="college-logo">
           <img src="/armiet-logo.png.png" alt="ARMIET College Logo" />
          </div>

          <div className="college-brand-name">
            <strong>
              ALAMURI RATNAMALA INSTITUTE OF ENGINEERING &amp; TECHNOLOGY
            </strong>
            <span>Koti Vidya Charitable Trust</span>
            <h2>SMART COMPLAINT MANAGEMENT SYSTEM</h2>
          </div>

          <div className="college-system-mark">
            <div className="college-system-icon">
              <ClipboardList size={27} />
            </div>
            <div>
              <strong>SMART COMPLAINT</strong>
              <span>MANAGEMENT SYSTEM</span>
              <small>ARMIET</small>
            </div>
          </div>
        </div>

        {/* Student topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="breadcrumb">
                Workspace <span>/</span> {getPageTitle()}
              </div>
              <h1>{getPageTitle()}</h1>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={17} />
              <input type="text" placeholder="Search complaints..." />
              <span className="search-shortcut">⌘ K</span>
            </div>

            <button
              className="icon-button"
              onClick={() => navigate('/notifications')}
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="user-profile">
              <div className="avatar">{studentInitials}</div>
              <div className="user-info">
                <strong>{studentName}</strong>
                <span>Student</span>
              </div>
            </div>
          </div>
        </header>

        {/* =================================

            CURRENT STUDENT PAGE

        ================================= */}

        <StudentPage />

      </main>

    </div>

  )

}

/* =========================================================

   STUDENT PAGE ROUTER

\========================================================= */

function StudentPage() {

  const location = useLocation()

  if (location.pathname === '/dashboard') {

    return <Dashboard />

  }

  if (location.pathname === '/complaints') {

    return <MyComplaints />

  }

  if (location.pathname === '/submit') {

    return <SubmitComplaint />

  }

  if (location.pathname === '/track') {

    return <TrackComplaints />

  }

  if (location.pathname === '/feedback') {

    return <Feedback />

  }

  if (location.pathname === '/notifications') {

    return <Notifications />

  }

  if (location.pathname === '/profile') {

    return (

      <section className="dashboard-content">

        <div className="dashboard-card">

          <div className="card-header">

            <div>

              <h3>

                Profile

              </h3>

              <p>

                Profile page is coming soon.

              </p>

            </div>

          </div>

        </div>

      </section>

    )

  }

  if (location.pathname === '/settings') {

    return (

      <section className="dashboard-content">

        <div className="dashboard-card">

          <div className="card-header">

            <div>

              <h3>

                Settings

              </h3>

              <p>

                Settings page is coming soon.

              </p>

            </div>

          </div>

        </div>

      </section>

    )

  }

  return <Dashboard />

}

/* =========================================================

   ADMIN TEMPORARY PAGE

\========================================================= */

function AdminComingSoon({

  title,

  description,

}) {

  return (

    <section className="dashboard-content">

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>

              {title}

            </h3>

            <p>

              {description}

            </p>

          </div>

        </div>

      </div>

    </section>

  )

}

export default App
