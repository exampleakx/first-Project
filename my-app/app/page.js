export default function Home() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand dashboard-brand"><span className="brand-mark">R</span><span>Rivo</span></div>
        <nav aria-label="Primary navigation">
          <a className="nav-item active" href="#"><span>⌂</span>Overview</a>
          <a className="nav-item" href="#"><span>▦</span>Projects<span className="nav-count">8</span></a>
          <a className="nav-item" href="#"><span>✓</span>My tasks<span className="nav-count">12</span></a>
          <a className="nav-item" href="#"><span>◫</span>Calendar</a>
          <a className="nav-item" href="#"><span>◉</span>Team</a>
        </nav>
        <div className="sidebar-section">WORKSPACE</div>
        <a className="nav-item" href="#"><span>＋</span>Invite people</a>
        <a className="nav-item" href="#"><span>⚙</span>Settings</a>
        <div className="sidebar-user"><div className="user-avatar">AM</div><div><strong>Alex Morgan</strong><span>alex@rivo.co</span></div><button aria-label="User menu">•••</button></div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div><p>MONDAY, NOVEMBER 2</p><h1>Good morning, Alex <span>👋</span></h1></div>
          <div className="header-actions">
            <label className="search"><span>⌕</span><input aria-label="Search" placeholder="Search..." /><kbd>⌘ K</kbd></label>
            <button className="notification-button" aria-label="Notifications">♢<i /></button>
            <button className="add-button">＋ Add task</button>
          </div>
        </header>

        <section className="stats-grid">
          <article className="stat-card"><div><span className="stat-icon purple">✓</span><span>Tasks completed</span></div><strong>24</strong><small><b>+12%</b> from last week</small><div className="mini-bars purple-bars"><i/><i/><i/><i/><i/><i/><i/></div></article>
          <article className="stat-card"><div><span className="stat-icon blue">▦</span><span>Active projects</span></div><strong>8</strong><small><b>2</b> due this week</small><div className="mini-bars blue-bars"><i/><i/><i/><i/><i/><i/><i/></div></article>
          <article className="stat-card"><div><span className="stat-icon orange">◷</span><span>Hours tracked</span></div><strong>32.5</strong><small><b>+4.5h</b> from last week</small><div className="mini-bars orange-bars"><i/><i/><i/><i/><i/><i/><i/></div></article>
          <article className="stat-card"><div><span className="stat-icon green">↗</span><span>Team progress</span></div><strong>86%</strong><small><b>On track</b> this month</small><div className="progress-ring">86%</div></article>
        </section>

        <div className="dashboard-grid">
          <section className="panel projects-panel">
            <div className="panel-heading"><div><h2>Projects</h2><p>Track your team&apos;s active work</p></div><button>View all →</button></div>
            <div className="project-row"><div className="project-icon purple-icon">N</div><div className="project-name"><strong>Northstar website</strong><span>Website redesign</span></div><div className="project-progress"><div><span><b>68%</b></span><div><i style={{width:"68%"}} /></div></div><span>17 of 25 tasks</span></div><div className="avatars"><i>AM</i><i>JS</i><i>+3</i></div><span className="due-date urgent">Due Nov 5</span></div>
            <div className="project-row"><div className="project-icon blue-icon">M</div><div className="project-name"><strong>Mobile app v2.0</strong><span>Product development</span></div><div className="project-progress"><div><span><b>42%</b></span><div><i style={{width:"42%"}} /></div></div><span>8 of 19 tasks</span></div><div className="avatars"><i>KL</i><i>AM</i><i>+2</i></div><span className="due-date">Due Nov 12</span></div>
            <div className="project-row"><div className="project-icon green-icon">B</div><div className="project-name"><strong>Brand guidelines</strong><span>Design system</span></div><div className="project-progress"><div><span><b>91%</b></span><div><i style={{width:"91%"}} /></div></div><span>21 of 23 tasks</span></div><div className="avatars"><i>JS</i><i>+1</i></div><span className="due-date">Due Nov 18</span></div>
          </section>

          <section className="panel activity-panel">
            <div className="panel-heading"><div><h2>Activity</h2><p>Recent team updates</p></div></div>
            <div className="activity-item"><div className="activity-avatar pink">JS</div><p><strong>Jamie S.</strong> completed <b>Homepage wireframes</b><span>12 minutes ago</span></p></div>
            <div className="activity-item"><div className="activity-avatar blue-avatar">KL</div><p><strong>Kai L.</strong> commented on <b>Mobile navigation</b><span>38 minutes ago</span></p></div>
            <div className="activity-item"><div className="activity-avatar green-avatar">MR</div><p><strong>Morgan R.</strong> uploaded 3 files to <b>Brand assets</b><span>1 hour ago</span></p></div>
          </section>
        </div>

        <section className="panel tasks-panel">
          <div className="panel-heading"><div><h2>My tasks</h2><p>Your priorities for today</p></div><button>View all →</button></div>
          <div className="task-row"><button aria-label="Complete task">✓</button><div><strong>Review homepage final designs</strong><span>Northstar website</span></div><span className="priority high">High</span><span className="task-date">Today</span></div>
          <div className="task-row"><button aria-label="Complete task" /><div><strong>Prepare sprint planning notes</strong><span>Mobile app v2.0</span></div><span className="priority medium">Medium</span><span className="task-date">Today</span></div>
          <div className="task-row"><button aria-label="Complete task" /><div><strong>Send stakeholder update</strong><span>Brand guidelines</span></div><span className="priority low">Low</span><span className="task-date">Tomorrow</span></div>
        </section>
      </main>
    </div>
  );
}
