import React, { useState } from 'react';
import { Match, Team } from '../types';
// import { Button } from './Button'; // Unused
import { Input } from './FormElements';
import { Trash2, Edit2, Check } from 'lucide-react';

interface MatchesListProps {
  matches: Match[];
  teams: Map<string, Team>;
  onUpdateScore: (matchId: string, team1Score: number, team2Score: number) => Promise<void>;
  onDeleteMatch: (matchId: string) => Promise<void>;
  // isLoading?: boolean; // Unused
}

export const MatchesList: React.FC<MatchesListProps> = ({
  matches,
  teams,
  onUpdateScore,
  onDeleteMatch
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, { team1: number; team2: number }>>({});

  if (matches.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No matches scheduled yet</p>
      </div>
    );
  }

  const handleEdit = (match: Match) => {
    setEditingId(match.id);
    setScores(prev => ({
      ...prev,
      [match.id]: {
        team1: match.team1Score,
        team2: match.team2Score
      }
    }));
  };

  const handleSave = async (matchId: string) => {
    const score = scores[matchId];
    if (score) {
      await onUpdateScore(matchId, score.team1, score.team2);
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-3">
      {matches.map((match, _index) => {
        const team1 = teams.get(match.team1Id);
        const team2 = teams.get(match.team2Id);
        const isEditing = editingId === match.id;
        const currentScores = scores[match.id] || { team1: match.team1Score, team2: match.team2Score };

        return (
          <div
            key={match.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-gray-400">
                Round {match.round}
              </div>
              <div className="flex gap-2">
                {!isEditing && (
                  <>
                    <button
                      onClick={() => handleEdit(match)}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDeleteMatch(match.id)}
                      className="p-1 hover:bg-gray-700 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <p className="font-semibold text-white truncate">{team1?.name || 'Unknown Team'}</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                {isEditing ? (
                  <>
                    <Input
                      type="number"
                      min="0"
                      value={currentScores.team1}
                      onChange={(e) => setScores(prev => ({
                        ...prev,
                        [match.id]: { ...prev[match.id], team1: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-16 text-center px-2 py-1"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                      type="number"
                      min="0"
                      value={currentScores.team2}
                      onChange={(e) => setScores(prev => ({
                        ...prev,
                        [match.id]: { ...prev[match.id], team2: parseInt(e.target.value) || 0 }
                      }))}
                      className="w-16 text-center px-2 py-1"
                    />
                    <button
                      onClick={() => handleSave(match.id)}
                      className="p-1 hover:bg-green-600 rounded transition-colors"
                    >
                      <Check className="w-4 h-4 text-green-400" />
                    </button>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-white">
                    {match.team1Score} - {match.team2Score}
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="font-semibold text-white truncate">{team2?.name || 'Unknown Team'}</p>
              </div>
            </div>

            {match.completed && !isEditing && (
              <div className="mt-3 text-xs text-green-400 font-semibold">
                ✓ Completed
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
