import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTournamentStore } from '../stores/tournamentStore';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Input } from '../components/FormElements';
import { StandingsTable } from '../components/StandingsTable';
import { MatchesList } from '../components/MatchesList';
import { TeamCard } from '../components/TeamCard';
import { generateTournamentLink, copyToClipboard } from '../utils/helpers';
import { Share2, Plus, Trash2, Download } from 'lucide-react';
import { Team, Match } from '../types';

export const TournamentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tournamentId = searchParams.get('id');

  const {
    currentTournament,
    fetchTournament,
    addTeam,
    updateTeam,
    deleteTeam,
    addMatch,
    // updateMatch, // Unused
    deleteMatch,
    updateScore,
    deleteTournament
  } = useTournamentStore();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'standings' | 'teams' | 'matches'>('standings');
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamPlayers, setNewTeamPlayers] = useState('');
  const [matchData, setMatchData] = useState({ team1: '', team2: '', round: 1 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!tournamentId) {
      navigate('/home');
      return;
    }

    const loadTournament = async () => {
      try {
        setLoading(true);
        await fetchTournament(tournamentId);
      } catch (error) {
        console.error('Error loading tournament:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTournament();
  }, [tournamentId, fetchTournament, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!currentTournament) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">Tournament not found</p>
          <Button onClick={() => navigate('/home')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const teamsMap = new Map(currentTournament.teams.map(t => [t.id, t]));

  const handleAddTeam = async () => {
    if (!newTeamName.trim()) {
      alert('Please enter team name');
      return;
    }

    const players = newTeamPlayers
      .split(',')
      .map((p, _i) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: p.trim()
      }))
      .filter(p => p.name);

    const newTeam: Team = {
      id: '',
      name: newTeamName,
      players,
      wins: 0,
      losses: 0,
      points: 0
    };

    try {
      await addTeam(currentTournament.id, newTeam);
      setNewTeamName('');
      setNewTeamPlayers('');
      setShowAddTeam(false);
    } catch (error) {
      alert('Failed to add team');
    }
  };

  const handleAddMatch = async () => {
    if (!matchData.team1 || !matchData.team2) {
      alert('Please select both teams');
      return;
    }

    const newMatch: Match = {
      id: '',
      round: matchData.round,
      team1Id: matchData.team1,
      team2Id: matchData.team2,
      team1Score: 0,
      team2Score: 0,
      completed: false
    };

    try {
      await addMatch(currentTournament.id, newMatch);
      setMatchData({ team1: '', team2: '', round: matchData.round + 1 });
      setShowAddMatch(false);
    } catch (error) {
      alert('Failed to add match');
    }
  };

  const handleShareLink = async () => {
    const link = generateTournamentLink(currentTournament.id);
    try {
      await copyToClipboard(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Failed to copy link');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(currentTournament, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentTournament.name}-backup.json`;
    link.click();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      try {
        await deleteTournament(currentTournament.id);
        navigate('/home');
      } catch (error) {
        alert('Failed to delete tournament');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tournament Header */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{currentTournament.name}</h1>
              {currentTournament.description && (
                <p className="text-gray-400">{currentTournament.description}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleShareLink}
                title={copied ? 'Copied!' : 'Copy shareable link'}
              >
                <Share2 className="w-4 h-4" />
                {copied ? 'Copied!' : 'Share'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExport}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded p-3">
              <p className="text-xs text-gray-400">Teams</p>
              <p className="text-2xl font-bold text-white">{currentTournament.teams.length}</p>
            </div>
            <div className="bg-gray-900 rounded p-3">
              <p className="text-xs text-gray-400">Matches</p>
              <p className="text-2xl font-bold text-white">{currentTournament.matches.length}</p>
            </div>
            <div className="bg-gray-900 rounded p-3">
              <p className="text-xs text-gray-400">Rounds</p>
              <p className="text-2xl font-bold text-white">{currentTournament.totalRounds}</p>
            </div>
            <div className="bg-gray-900 rounded p-3">
              <p className="text-xs text-gray-400">Status</p>
              <p className="text-2xl font-bold capitalize text-yellow-400">{currentTournament.status}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-700">
          {['standings', 'teams', 'matches'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Standings Tab */}
        {activeTab === 'standings' && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <StandingsTable teams={currentTournament.teams} matches={currentTournament.matches} />
          </div>
        )}

        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div>
            {showAddTeam ? (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Add New Team</h3>
                <div className="space-y-4">
                  <Input
                    label="Team Name"
                    placeholder="e.g., Dragon Force"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                  />
                  <Input
                    label="Players (comma-separated)"
                    placeholder="Player 1, Player 2, Player 3"
                    value={newTeamPlayers}
                    onChange={(e) => setNewTeamPlayers(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      onClick={handleAddTeam}
                      className="flex-1"
                    >
                      Add Team
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowAddTeam(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => setShowAddTeam(true)}
                className="mb-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Team
              </Button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentTournament.teams.map(team => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onUpdate={(updated) => updateTeam(currentTournament.id, team.id, updated)}
                  onDelete={() => deleteTeam(currentTournament.id, team.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div>
            {showAddMatch ? (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Add Match</h3>
                <div className="space-y-4">
                  <Input
                    label="Round"
                    type="number"
                    min="1"
                    value={matchData.round}
                    onChange={(e) => setMatchData({ ...matchData, round: parseInt(e.target.value) })}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Team 1</label>
                    <select
                      value={matchData.team1}
                      onChange={(e) => setMatchData({ ...matchData, team1: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="">Select team</option>
                      {currentTournament.teams.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Team 2</label>
                    <select
                      value={matchData.team2}
                      onChange={(e) => setMatchData({ ...matchData, team2: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="">Select team</option>
                      {currentTournament.teams.map(team => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      onClick={handleAddMatch}
                      className="flex-1"
                    >
                      Add Match
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowAddMatch(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                onClick={() => setShowAddMatch(true)}
                className="mb-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Match
              </Button>
            )}

            <MatchesList
              matches={currentTournament.matches}
              teams={teamsMap}
              onUpdateScore={(matchId, team1Score, team2Score) =>
                updateScore(currentTournament.id, matchId, team1Score, team2Score)
              }
              onDeleteMatch={(matchId) => deleteMatch(currentTournament.id, matchId)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
