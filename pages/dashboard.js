import { useEffect, useState } from 'react'

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

  return (
    <div className="card">
      <h3>Teams</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {teams.map((team, index) => (
            <span key={index}>
              {team.teams.name} ({team.role})<br />
            </span>
          ))}
        </p>
      )}
      <button onClick={handleCreateTeam} style={{ marginTop: '10px' }}>
        ➕ Create Team
      </button>
    </div>
  );
}
