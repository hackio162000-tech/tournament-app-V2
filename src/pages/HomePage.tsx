import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTournamentStore } from '../stores/tournamentStore';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { Input, Textarea } from '../components/FormElements';
import { Plus, Calendar } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { tournaments, fetchTournaments, createTournament } = useTournamentStore();
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    totalRounds: 5
  });

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        await fetchTournaments();
      } catch (error) {
        console.error('Error loading tournaments:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTournaments();
  }, [fetchTournaments]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a tournament name');
      return;
    }

    try {
      const id = await createTournament(formData.name, formData.description, formData.totalRounds);
      navigate(`/tournament?id=${id}`);
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('Failed to create tournament');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isCreating ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Create New Tournament</h2>

              <form onSubmit={handleCreate} className="space-y-6">
                <Input
                  label="Tournament Name"
                  placeholder="e.g., Spring Championship 2024"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <Textarea
                  label="Description (Optional)"
                  placeholder="Add details about your tournament..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />

                <Input
                  label="Total Rounds"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.totalRounds}
                  onChange={(e) => setFormData({ ...formData, totalRounds: parseInt(e.target.value) })}
                />

                <div className="flex gap-4">
                  <Button type="submit" variant="success" className="flex-1">
                    Create Tournament
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">My Tournaments</h2>
              <Button
                onClick={() => setIsCreating(true)}
                variant="primary"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Tournament
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : tournaments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-6">No tournaments yet. Create one to get started!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map(tournament => (
                  <div
                    key={tournament.id}
                    onClick={() => navigate(`/tournament?id=${tournament.id}`)}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{tournament.name}</h3>
                    {tournament.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tournament.description}</p>
                    )}

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                      <div>
                        <p className="text-xs text-gray-400">Teams</p>
                        <p className="text-lg font-bold text-white">{tournament.teams.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Matches</p>
                        <p className="text-lg font-bold text-white">{tournament.matches.length}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Status</p>
                        <p className="text-lg font-bold capitalize text-yellow-400">{tournament.status}</p>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full mt-4"
                    >
                      Open Tournament
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
