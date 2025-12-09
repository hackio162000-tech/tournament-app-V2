import { Tournament, Team, Match } from '../types';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  writeBatch,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

const TOURNAMENTS_COLLECTION = 'tournaments';

export class TournamentService {
  // Tournament operations
  static async createTournament(tournament: Tournament): Promise<string> {
    try {
      const ref = doc(collection(db, TOURNAMENTS_COLLECTION));
      const newTournament = {
        ...tournament,
        id: ref.id
      };
      await setDoc(ref, newTournament);
      return ref.id;
    } catch (error) {
      console.error('Error creating tournament:', error);
      throw error;
    }
  }

  static async getTournament(id: string): Promise<Tournament | null> {
    try {
      const docRef = doc(db, TOURNAMENTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as Tournament) : null;
    } catch (error) {
      console.error('Error getting tournament:', error);
      throw error;
    }
  }

  static async getAllTournaments(userId: string): Promise<Tournament[]> {
    try {
      const q = query(
        collection(db, TOURNAMENTS_COLLECTION),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as Tournament);
    } catch (error) {
      console.error('Error getting tournaments:', error);
      throw error;
    }
  }

  static async updateTournament(id: string, tournament: Tournament): Promise<void> {
    try {
      const docRef = doc(db, TOURNAMENTS_COLLECTION, id);
      await updateDoc(docRef, {
        ...tournament,
        updatedAt: Date.now()
      });
    } catch (error) {
      console.error('Error updating tournament:', error);
      throw error;
    }
  }

  static async deleteTournament(id: string): Promise<void> {
    try {
      const docRef = doc(db, TOURNAMENTS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting tournament:', error);
      throw error;
    }
  }

  // Batch update for efficient updates
  static async batchUpdateTournament(
    tournamentId: string,
    teams: Team[],
    matches: Match[]
  ): Promise<void> {
    try {
      const batch = writeBatch(db);
      const docRef = doc(db, TOURNAMENTS_COLLECTION, tournamentId);
      
      batch.update(docRef, {
        teams,
        matches,
        updatedAt: Date.now()
      });

      await batch.commit();
    } catch (error) {
      console.error('Error batch updating tournament:', error);
      throw error;
    }
  }

  // Export data as JSON
  static exportTournament(tournament: Tournament): string {
    return JSON.stringify(tournament, null, 2);
  }

  // Import data from JSON
  static importTournament(jsonData: string): Tournament {
    try {
      return JSON.parse(jsonData) as Tournament;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Invalid JSON format');
    }
  }
}
