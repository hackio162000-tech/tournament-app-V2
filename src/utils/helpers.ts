import { Team, Match } from '../types';

export const calculateStandings = (teams: Team[], matches: Match[]): Team[] => {
  const standings = teams.map(team => ({
    ...team,
    wins: 0,
    losses: 0,
    points: 0
  }));

  matches.forEach(match => {
    if (!match.completed) return;

    const team1 = standings.find(t => t.id === match.team1Id);
    const team2 = standings.find(t => t.id === match.team2Id);

    if (team1 && team2) {
      if (match.team1Score > match.team2Score) {
        team1.wins++;
        team1.points += 3;
        team2.losses++;
      } else if (match.team2Score > match.team1Score) {
        team2.wins++;
        team2.points += 3;
        team1.losses++;
      } else {
        // Draw
        team1.points += 1;
        team2.points += 1;
      }
    }
  });

  return standings.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.wins - a.wins;
  });
};

export const getTeamStats = (team: Team, matches: Match[]): { wins: number; losses: number; draws: number } => {
  let wins = 0;
  let losses = 0;
  let draws = 0;

  matches.forEach(match => {
    if (!match.completed) return;

    if (match.team1Id === team.id) {
      if (match.team1Score > match.team2Score) wins++;
      else if (match.team1Score < match.team2Score) losses++;
      else draws++;
    } else if (match.team2Id === team.id) {
      if (match.team2Score > match.team1Score) wins++;
      else if (match.team2Score < match.team1Score) losses++;
      else draws++;
    }
  });

  return { wins, losses, draws };
};

export const generateTournamentLink = (tournamentId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/tournament?id=${tournamentId}`;
};

export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};
