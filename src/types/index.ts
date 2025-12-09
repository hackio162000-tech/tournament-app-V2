export interface Player {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  players: Player[];
  wins: number;
  losses: number;
  points: number;
}

export interface Match {
  id: string;
  round: number;
  team1Id: string;
  team2Id: string;
  team1Score: number;
  team2Score: number;
  completed: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  teams: Team[];
  matches: Match[];
  status: 'draft' | 'ongoing' | 'completed';
  totalRounds: number;
  userId?: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthStore {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
}

export interface TournamentStore {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  
  // Mutations
  setCurrentTournament: (tournament: Tournament | null) => void;
  createTournament: (name: string, description?: string, totalRounds?: number) => Promise<string>;
  updateTournament: (id: string, tournament: Tournament) => Promise<void>;
  fetchTournaments: () => Promise<void>;
  fetchTournament: (id: string) => Promise<void>;
  deleteTournament: (id: string) => Promise<void>;
  
  // Team operations
  addTeam: (tournamentId: string, team: Team) => Promise<void>;
  updateTeam: (tournamentId: string, teamId: string, team: Team) => Promise<void>;
  deleteTeam: (tournamentId: string, teamId: string) => Promise<void>;
  
  // Match operations
  addMatch: (tournamentId: string, match: Match) => Promise<void>;
  updateMatch: (tournamentId: string, matchId: string, match: Match) => Promise<void>;
  deleteMatch: (tournamentId: string, matchId: string) => Promise<void>;
  
  // Scoring
  updateScore: (tournamentId: string, matchId: string, team1Score: number, team2Score: number) => Promise<void>;
}
