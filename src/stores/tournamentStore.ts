import { create } from 'zustand';
import { TournamentStore, Tournament, Team, Match } from '../types';
import { TournamentService } from '../utils/tournamentService';
import { BackupService } from '../utils/autoBackupService';
import { calculateStandings } from '../utils/helpers';
import { useAuthStore } from './authStore';

// Simple UUID generation
const generateId = () => Math.random().toString(36).substr(2, 9);

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  tournaments: [],
  currentTournament: null,

  setCurrentTournament: (tournament: Tournament | null) => {
    set({ currentTournament: tournament });
  },

  createTournament: async (name: string, description?: string, totalRounds: number = 5) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    const newTournament: Tournament = {
      id: generateId(),
      name,
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      teams: [],
      matches: [],
      status: 'draft',
      totalRounds,
      userId: user.uid
    };

    try {
      const id = await TournamentService.createTournament(newTournament);
      // Auto-backup on creation
      await BackupService.autoBackupTournament(user.uid, newTournament);
      set((state: TournamentStore) => ({
        tournaments: [newTournament, ...state.tournaments]
      }));
      return id;
    } catch (error) {
      console.error('Error creating tournament:', error);
      throw error;
    }
  },

  fetchTournaments: async () => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      const tournaments = await TournamentService.getAllTournaments(user.uid);
      set({ tournaments });
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      throw error;
    }
  },

  fetchTournament: async (id: string) => {
    try {
      const tournament = await TournamentService.getTournament(id);
      if (tournament) {
        set({ currentTournament: tournament });
      }
    } catch (error) {
      console.error('Error fetching tournament:', error);
      throw error;
    }
  },

  updateTournament: async (id: string, tournament: Tournament) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      await TournamentService.updateTournament(id, tournament);
      // Auto-backup on update
      await BackupService.autoBackupTournament(user.uid, tournament);
      await BackupService.cleanOldAutoBackups(user.uid, id);
      
      set((state: TournamentStore) => ({
        currentTournament: state.currentTournament?.id === id ? tournament : state.currentTournament,
        tournaments: state.tournaments.map((t: Tournament) => (t.id === id ? tournament : t))
      }));
    } catch (error) {
      console.error('Error updating tournament:', error);
      throw error;
    }
  },

  deleteTournament: async (id: string) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      // Backup before deletion
      const current = get().currentTournament;
      if (current) {
        await BackupService.autoBackupTournament(user.uid, current);
      }
      
      await TournamentService.deleteTournament(id);
      set((state: TournamentStore) => ({
        tournaments: state.tournaments.filter((t: Tournament) => t.id !== id),
        currentTournament: state.currentTournament?.id === id ? null : state.currentTournament
      }));
    } catch (error) {
      console.error('Error deleting tournament:', error);
      throw error;
    }
  },

  addTeam: async (tournamentId: string, team: Team) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      const current = get().currentTournament;
      if (!current) return;

      const newTeam: Team = {
        ...team,
        id: generateId(),
        wins: 0,
        losses: 0,
        points: 0
      };

      const updatedTournament: Tournament = {
        ...current,
        teams: [...current.teams, newTeam]
      };

      await TournamentService.updateTournament(tournamentId, updatedTournament);
      // Auto-backup after team addition
      await BackupService.autoBackupTournament(user.uid, updatedTournament);
      await BackupService.cleanOldAutoBackups(user.uid, tournamentId);
      
      set({
        currentTournament: updatedTournament
      });
    } catch (error) {
      console.error('Error adding team:', error);
      throw error;
    }
  },

  updateTeam: async (tournamentId: string, teamId: string, team: Team) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      const current = get().currentTournament;
      if (!current) return;

      const updatedTournament: Tournament = {
        ...current,
        teams: current.teams.map((t: Team) => (t.id === teamId ? team : t))
      };

      await TournamentService.updateTournament(tournamentId, updatedTournament);
      // Auto-backup after team update
      await BackupService.autoBackupTournament(user.uid, updatedTournament);
      await BackupService.cleanOldAutoBackups(user.uid, tournamentId);
      
      set({
        currentTournament: updatedTournament
      });
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  },

  deleteTeam: async (tournamentId: string, teamId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      const current = get().currentTournament;
      if (!current) return;

      const updatedTournament: Tournament = {
        ...current,
        teams: current.teams.filter((t: Team) => t.id !== teamId),
        matches: current.matches.filter(
          (m: Match) => m.team1Id !== teamId && m.team2Id !== teamId
        )
      };

      await TournamentService.updateTournament(tournamentId, updatedTournament);
      // Auto-backup after team deletion
      await BackupService.autoBackupTournament(user.uid, updatedTournament);
      await BackupService.cleanOldAutoBackups(user.uid, tournamentId);
      
      set({
        currentTournament: updatedTournament
      });
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  },

  addMatch: async (tournamentId: string, match: Match) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      const current = get().currentTournament;
      if (!current) return;

      const newMatch: Match = {
        ...match,
        id: generateId()
      };

      const updatedTournament: Tournament = {
        ...current,
        matches: [...current.matches, newMatch]
      };

      await TournamentService.updateTournament(tournamentId, updatedTournament);
      // Auto-backup after match addition
      await BackupService.autoBackupTournament(user.uid, updatedTournament);
      await BackupService.cleanOldAutoBackups(user.uid, tournamentId);
      
      set({
        currentTournament: updatedTournament
      });
    } catch (error) {
      console.error('Error adding match:', error);
      throw error;
    }
  },

  updateMatch: async (tournamentId: string, matchId: string, match: Match) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      const current = get().currentTournament;
      if (!current) return;

      const updatedMatches = current.matches.map((m: Match) =>
        m.id === matchId ? match : m
      );

      // Recalculate standings
      const standings = calculateStandings(current.teams, updatedMatches);

      const updatedTournament: Tournament = {
        ...current,
        matches: updatedMatches,
        teams: standings
      };

      await TournamentService.updateTournament(tournamentId, updatedTournament);
      // Auto-backup after match update
      await BackupService.autoBackupTournament(user.uid, updatedTournament);
      await BackupService.cleanOldAutoBackups(user.uid, tournamentId);
      
      set({
        currentTournament: updatedTournament
      });
    } catch (error) {
      console.error('Error updating match:', error);
      throw error;
    }
  },

  deleteMatch: async (tournamentId: string, matchId: string) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      const current = get().currentTournament;
      if (!current) return;

      const updatedMatches = current.matches.filter((m: Match) => m.id !== matchId);
      const standings = calculateStandings(current.teams, updatedMatches);

      const updatedTournament: Tournament = {
        ...current,
        matches: updatedMatches,
        teams: standings
      };

      await TournamentService.updateTournament(tournamentId, updatedTournament);
      // Auto-backup after match deletion
      await BackupService.autoBackupTournament(user.uid, updatedTournament);
      await BackupService.cleanOldAutoBackups(user.uid, tournamentId);
      
      set({
        currentTournament: updatedTournament
      });
    } catch (error) {
      console.error('Error deleting match:', error);
      throw error;
    }
  },

  updateScore: async (tournamentId: string, matchId: string, team1Score: number, team2Score: number) => {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    try {
      const current = get().currentTournament;
      if (!current) return;

      const match = current.matches.find((m: Match) => m.id === matchId);
      if (!match) return;

      const updatedMatch: Match = {
        ...match,
        team1Score,
        team2Score,
        completed: true
      };

      const updatedMatches = current.matches.map((m: Match) =>
        m.id === matchId ? updatedMatch : m
      );

      // Recalculate standings
      const standings = calculateStandings(current.teams, updatedMatches);

      const updatedTournament: Tournament = {
        ...current,
        matches: updatedMatches,
        teams: standings
      };

      await TournamentService.updateTournament(tournamentId, updatedTournament);
      // Auto-backup after score update
      await BackupService.autoBackupTournament(user.uid, updatedTournament);
      await BackupService.cleanOldAutoBackups(user.uid, tournamentId);
      
      set({
        currentTournament: updatedTournament
      });
    } catch (error) {
      console.error('Error updating score:', error);
      throw error;
    }
  }
}));
