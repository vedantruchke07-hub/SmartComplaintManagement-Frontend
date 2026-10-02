import {
  Settings,
  ShieldCheck,
  Server,
  Database,
  User,
} from 'lucide-react'

function AdminSettings() {
  return (
    <section className="dashboard-content admin-page">
      <div className="page-header">
        <div className="page-header-content">
          <div className="page-header-badge">
            <Settings size={16} />
            System Settings
          </div>

          <h2>Admin Settings</h2>

          <p>
            Manage administrator and system information.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Administrator Profile</h3>
              <p>Current administrator information.</p>
            </div>
          </div>

          <div className="settings-profile">
            <div className="settings-avatar">
              VP
            </div>

            <div>
              <strong>Vedant Patil</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Application Status</h3>
              <p>Current system configuration.</p>
            </div>
          </div>

          <div className="settings-list">
            <div className="settings-row">
              <div className="settings-row-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Admin Portal</strong>
                <span>Active</span>
              </div>

              <span className="settings-status active">
                Active
              </span>
            </div>

            <div className="settings-row">
              <div className="settings-row-icon">
                <Server size={18} />
              </div>

              <div>
                <strong>Backend API</strong>
                <span>Spring Boot REST API</span>
              </div>

              <span className="settings-status active">
                Connected
              </span>
            </div>

            <div className="settings-row">
              <div className="settings-row-icon">
                <Database size={18} />
              </div>

              <div>
                <strong>Database</strong>
                <span>Application data storage</span>
              </div>

              <span className="settings-status active">
                Connected
              </span>
            </div>

            <div className="settings-row">
              <div className="settings-row-icon">
                <User size={18} />
              </div>

              <div>
                <strong>Access Level</strong>
                <span>Administrator</span>
              </div>

              <span className="settings-status active">
                Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminSettings