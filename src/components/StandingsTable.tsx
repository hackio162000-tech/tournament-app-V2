import React from 'react';
import { Team, Match } from '../types';
import { Trophy, Users } from 'lucide-react';

interface StandingsTableProps {
  teams: Team[];
  matches?: Match[];
  isLoading?: boolean;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({ teams, matches: _matches = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">No teams added yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 to-gray-900 border-b-2 border-gray-700">
            <th className="px-6 py-3 text-left text-sm font-bold text-yellow-400 w-12">#</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-white">Team</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white">Wins</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white">Losses</th>
            <th className="px-6 py-3 text-center text-sm font-bold text-white">Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr
              key={team.id}
              className={`
                border-b border-gray-700 hover:bg-gray-800 transition-colors
                ${index === 0 ? 'bg-gray-800/50' : index % 2 === 0 ? 'bg-gray-900/30' : ''}
              `}
            >
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  {index === 0 && <Trophy className="w-5 h-5 text-yellow-400" />}
                  {index === 0 ? null : <span className="font-bold text-white">{index + 1}</span>}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {team.logo && (
                    <img src={team.logo} alt={team.name} className="w-8 h-8 rounded-full" />
                  )}
                  <div>
                    <p className="font-semibold text-white">{team.name}</p>
                    <p className="text-xs text-gray-400">{team.players.length} players</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-bold text-green-400">{team.wins}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-bold text-red-400">{team.losses}</span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="font-bold text-blue-400 text-lg">{team.points}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
