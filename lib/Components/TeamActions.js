import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TeamActions() {
  const [teamName, setTeamName] = useState('')
  const [joinTeamId, setJoinTeamId] = useState('')
  const [message, setMessage] = useState('')

  const createTeam = async (e) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return setMessage('Login first')

    // 1. Create the team
    const { data, error } = await supabase
      .from('teams')
      .insert({ name: teamName, created_by: user.id })
      .select()
      .single()

    if (error) return setMessage('Create failed: ' + error.message)

    // 2. Add user as leader
    await supabase.from('team_members').insert({
      user_id: user.id,
      team_id: data.id,
      role: 'leader',
    })

    setMessage('Team created successfully!')
  }

  const joinTeam = async (e) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return setMessage('Login first')

    const { error } = await supabase.from('team_members').insert({
      user_id: user.id,
      team_id: joinTeamId,
      role: 'member',
    })

    if (error) return setMessage('Join failed: ' + error.message)
    setMessage('Joined team successfully!')
  }

  return (
    <div>
      <h2>Create Team</h2>
      <form onSubmit={createTeam}>
        <input
          type="text"
          placeholder="Team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>

      <h2>Join Team</h2>
      <form onSubmit={joinTeam}>
        <input
          type="text"
          placeholder="Team ID"
          value={joinTeamId}
          onChange={(e) => setJoinTeamId(e.target.value)}
          required
        />
        <button type="submit">Join</button>
      </form>

      <p>{message}</p>
    </div>
  )
}
