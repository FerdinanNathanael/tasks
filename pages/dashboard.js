'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [teams, setTeams] = useState([])
  const [user, setUser] = useState(null)

  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (user) setUser(user)
    }
    getUser()
  }, [])

  // Fetch teams after user is loaded
  useEffect(() => {
    if (!user) return
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('role, teams(name)')
        .eq('user_id', user.id)

      if (error) {
        console.error('Fetch teams error:', error)
      } else {
        setTeams(data)
      }
    }
    fetchTeams()
  }, [user])

  const handleCreateTeam = async () => {
    const teamName = prompt('Enter new team name:')
    if (!teamName || !user) return

    const res = await fetch('/api/createTeam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: teamName, leader_id: user.id })
    })

    const { error } = await res.json()
    if (error) {
      alert('Failed to create team: ' + error.message)
    } else {
      alert('Team created!')
      // Refetch teams after creation
      const { data, error: refetchError } = await supabase
        .from('team_members')
        .select('role, teams(name)')
        .eq('user_id', user.id)
      if (!refetchError) setTeams(data)
    }
  }

  return (
    <div className="card">
      <h3>Teams</h3>
      {teams.length === 0 ? (
        <p>No teams yet</p>
      ) : (
        teams.map((team, i) => (
          <p key={i}>
            {team.teams?.name} ({team.role})
          </p>
        ))
      )}
      <button onClick={handleCreateTeam} style={{ marginTop: '10px' }}>
        ➕ Create Team
      </button>
    </div>
  )
}
