import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TeamPage() {
  const router = useRouter()
  const { id: teamId } = router.query
  const [members, setMembers] = useState([])
  const [teamName, setTeamName] = useState('')

  useEffect(() => {
    if (teamId) {
      loadTeam()
    }
  }, [teamId])

  async function loadTeam() {
    // get team name
    const { data: teamData } = await supabase.from('teams').select('name').eq('id', teamId).single()
    setTeamName(teamData?.name || 'Team')

    // get members
    const { data: membersData } = await supabase
      .from('team_members')
      .select('user_id, role')
      .eq('team_id', teamId)

    setMembers(membersData || [])
  }

  return (
    <>
      <h3>{teamName}</h3>
      <div id="memberList">
        {members.map((m, i) => (
          <p key={i}>
            👤 {m.user_id} (<strong>{m.role}</strong>) <button className="change-btn">change</button>
          </p>
        ))}
      </div>
    </>
  )
}
