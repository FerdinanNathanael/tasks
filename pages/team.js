import Head from 'next/head'
import Script from 'next/script'
import TeamActions from '../Components/TeamActions.jsx'

export default function TeamPage() {
  return (
    <>
      <Head>
        <title>Team - TaskMaster</title>
      </Head>
      <Script src="/scripts/script.js" strategy="lazyOnload" />
      <nav className="navbar">
        <div className="logo-group">
          <img src="/assets/2.png" className="logo-img" alt="logo" />
          <div className="logo-text">TaskMaster</div>
        </div>
        <div className="nav-links">
          <a href="/dashboard">home</a>
          <a href="#">tasks</a>
          <a href="/team">team</a>
          <a href="/">logout</a>
        </div>
      </nav>w

      <div className="team-box">
        <h3>figma dev team</h3>
        <div id="memberList">
          <p><span className="user-icon">👤</span> daud (<strong>leader</strong>) <button className="change-btn">change</button></p>
          <p><span className="user-icon">👤</span> ferdinan (<strong>member</strong>) <button className="change-btn">change</button></p>
          <p><span className="user-icon">👤</span> asd (<strong>member</strong>) <button className="change-btn">change</button></p>
        </div>

        <div className="team-buttons">
          <button onClick={() => window.location.href='/dashboard'}>leave</button>
          <button>chat</button>
          <button onClick={() => openModal()}>add</button>
        </div>
      </div>

      <div id="memberModal" className="modal">
        <div className="modal-content">
          <h3>Add Team Member</h3>
          <input type="text" id="memberName" placeholder="Name" />
          <select id="memberRole">
            <option value="member">Member</option>
            <option value="leader">Leader</option>
          </select>
          <div className="modal-buttons">
            <button onClick={() => addMember()}>Add</button>
            <button onClick={() => closeModal()}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}
