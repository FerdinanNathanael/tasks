import Head from 'next/head'
import Script from 'next/script'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - TaskMaster</title>
      </Head>
      <Script src="/scripts/script.js" strategy="lazyOnload" />
      <nav className="navbar">
        <div className="logo-group">
          <img src="/assets/logo.png" className="logo-img" alt="logo" />
          <div className="logo-text">TaskMaster</div>
        </div>
        <div className="nav-links">
          <a href="/dashboard">home</a>
          <a href="#">tasks</a>
          <a href="/team">team</a>
          <a href="/">logout</a>
        </div>
      </nav>

      <div className="dashboard-row">
        <div className="card profile-card">
          <img src="/assets/logo.png" alt="Profile Picture" className="profile-img" />
          <div>
            <h3>Ferdinan Nathanael</h3>
            <p><strong id="role-display">God among men</strong><br />Taskmasters development team</p>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="card">
          <h3>you have 1 ongoing tasks</h3>
          <p>make figma for app</p>
        </div>

        <div className="card">
          <h3>Teams</h3>
          <p>Taskmasters dev team (leader)<br />YEP team (member)</p>
        </div>

        <div className="card">
          <h3>inbox</h3>
          <p>team A : pls go fast<br />team B : no U</p>
        </div>
      </div>
    </>
  )
}