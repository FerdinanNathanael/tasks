import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTeams = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('team_members')
      .select('role, teams(name)')
      .eq('user_id', user.id)

    if (!error && data) setTeams(data)
    setLoading(false)
  }


  useEffect(() => {
    fetchTeams()
  }, [])

  const handleCreateTeam = async () => {
    const teamName = prompt("Enter new team name:")
    if (!teamName) return

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      alert("You must be logged in to create a team.")
      return
    }

    const { data, error } = await supabase
      .from('team_members')
      .select('teams(id, name), role') 
      .eq('user_id', user.id)


    if (error) {
      alert("Error creating team: " + error.message)
      return
    }

    await supabase.from('team_members').insert({
      user_id: user.id,
      team_id: data.id,
      role: 'leader'
    })

    await fetchTeams()
    alert("Team created successfully!")
  }

  return (
    <>
      <Head>
        <title>Dashboard - TaskMaster</title>
      </Head>
      <Script src="/scripts/script.js" strategy="lazyOnload" />

      <nav className="navbar">
        <div className="logo-group">
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
          <h3>Ferdinan Nathanael</h3>
          <p>Scrum Master<br />Taskmasters development team</p>
        </div>

        <div className="card">
          <h3>you have 1 ongoing tasks</h3>
          <p>make figma for app</p>
        </div>

        <div className="card">
          <h3>Teams</h3>
          {loading ? (
            <p>Loading...</p>
          ) : teams.length === 0 ? (
            <p>No teams yet</p>
          ) : (
            teams.map((team, i) => (
              <p key={i}>
                <a
                  href={`/team?id=${team.teams?.id}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  {team.teams?.name} ({team.role})
                </a>
              </p>
            ))
          )}
          <button onClick={handleCreateTeam} style={{ marginTop: '10px' }}>
            ➕ Create Team
          </button>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="card">
          <h3>inbox</h3>
          <p>team A : pls go fast<br />team B : no U</p>
        </div>
      </div>
    </>
  )
}
