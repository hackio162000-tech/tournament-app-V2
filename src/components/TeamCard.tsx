import React, { useState } from 'react';
import { Team, Player } from '../types';
import { Button } from './Button';
import { Input } from './FormElements';
import { Trash2, Edit2, Plus, X } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  onUpdate: (team: Team) => Promise<void>;
  onDelete: () => Promise<void>;
  isLoading?: boolean;
}

export const TeamCard: React.FC<TeamCardProps> = ({ team, onUpdate, onDelete, isLoading = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(team.name);
  const [logo, setLogo] = useState(team.logo || '');
  const [newPlayer, setNewPlayer] = useState('');
  const [players, setPlayers] = useState<Player[]>(team.players);

  const handleAddPlayer = () => {
    if (newPlayer.trim()) {
      const player: Player = {
        id: Math.random().toString(36).substr(2, 9),
        name: newPlayer
      };
      setPlayers([...players, player]);
      setNewPlayer('');
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
  };

  const handleSave = async () => {
    const updatedTeam: Team = {
      ...team,
      name,
      logo,
      players
    };
    await onUpdate(updatedTeam);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="space-y-4">
          <Input
            label="Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter team name"
          />

          <Input
            label="Logo URL (Optional)"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            placeholder="https://..."
            type="url"
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Players
            </label>
            <div className="space-y-2 mb-3">
              {players.map(player => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-gray-900 p-2 rounded"
                >
                  <span className="text-white text-sm">{player.name}</span>
                  <button
                    onClick={() => handleRemovePlayer(player.id)}
                    className="p-1 hover:bg-red-600 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                placeholder="Add player..."
                className="text-sm"
              />
              <Button
                size="sm"
                onClick={handleAddPlayer}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="success"
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1"
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsEditing(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          {logo && <img src={logo} alt={name} className="w-12 h-12 rounded-full object-cover" />}
          <div>
            <h3 className="font-bold text-white">{name}</h3>
            <p className="text-xs text-gray-400">{players.length} players</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            <Edit2 className="w-5 h-5 text-blue-400" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-700">
        <p className="text-xs text-gray-400 mb-2">Squad:</p>
        <div className="flex flex-wrap gap-2">
          {players.length > 0 ? (
            players.map(player => (
              <span
                key={player.id}
                className="px-2 py-1 bg-gray-900 rounded text-xs text-gray-300"
              >
                {player.name}
              </span>
            ))
          ) : (
            <p className="text-xs text-gray-500">No players added</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-400">Wins</p>
          <p className="font-bold text-green-400">{team.wins}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400">Losses</p>
          <p className="font-bold text-red-400">{team.losses}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400">Points</p>
          <p className="font-bold text-blue-400">{team.points}</p>
        </div>
      </div>
    </div>
  );
};
