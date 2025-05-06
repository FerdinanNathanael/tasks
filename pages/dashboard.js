import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('team_members')
        .select('teams(name), role')
        .eq('user_id', user.id);

      if (!error && data) {
        setTeams(data);
      }
      setLoading(false);
    };

    fetchTeams();
  }, []);

  const handleCreateTeam = async () => {
    const teamName = prompt("Enter new team name:");
    if (!teamName) return;

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("User not logged in!");
      return;
    }

    const { data, error } = await supabase
      .from('teams')
      .insert({ name: teamName, created_by: user.id })
      .select()
      .single();

    if (error) {
      alert("Error creating team: " + error.message);
    } else {
      await supabase.from('team_members').insert({
        user_id: user.id,
        team_id: data.id,
        role: 'leader'
      });
      alert("Team created!");
      window.location.reload();
    }
  };

  return (
    <div className="card">
      <h3>Teams</h3>
      {loading ? (
        <p>Loading...</p>
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
  );
}
