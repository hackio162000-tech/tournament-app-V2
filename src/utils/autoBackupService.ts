import { Tournament } from '../types';
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, Timestamp, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export interface BackupData {
  id?: string;
  userId: string;
  tournamentId: string;
  tournamentName: string;
  backupData: Tournament;
  createdAt: Timestamp | number;
  backupType: 'manual' | 'auto';
}

const BACKUPS_COLLECTION = 'backups';

export class BackupService {
  // Auto-backup tournament (called automatically)
  static async autoBackupTournament(userId: string, tournament: Tournament): Promise<string> {
    try {
      const backup: Omit<BackupData, 'id'> = {
        userId,
        tournamentId: tournament.id,
        tournamentName: tournament.name,
        backupData: tournament,
        createdAt: Timestamp.now(),
        backupType: 'auto'
      };

      const docRef = await addDoc(collection(db, BACKUPS_COLLECTION), backup);
      return docRef.id;
    } catch (error) {
      console.error('Auto-backup failed:', error);
      throw error;
    }
  }

  // Manual backup tournament
  static async manualBackupTournament(userId: string, tournament: Tournament): Promise<string> {
    try {
      const backup: Omit<BackupData, 'id'> = {
        userId,
        tournamentId: tournament.id,
        tournamentName: tournament.name,
        backupData: tournament,
        createdAt: Timestamp.now(),
        backupType: 'manual'
      };

      const docRef = await addDoc(collection(db, BACKUPS_COLLECTION), backup);
      return docRef.id;
    } catch (error) {
      console.error('Manual backup failed:', error);
      throw error;
    }
  }

  // Get all backups for a user
  static async getUserBackups(userId: string): Promise<BackupData[]> {
    try {
      const q = query(collection(db, BACKUPS_COLLECTION), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      } as BackupData));
    } catch (error) {
      console.error('Error fetching backups:', error);
      throw error;
    }
  }

  // Get backups for a specific tournament
  static async getTournamentBackups(userId: string, tournamentId: string): Promise<BackupData[]> {
    try {
      const q = query(
        collection(db, BACKUPS_COLLECTION),
        where('userId', '==', userId),
        where('tournamentId', '==', tournamentId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      } as BackupData));
    } catch (error) {
      console.error('Error fetching tournament backups:', error);
      throw error;
    }
  }

  // Delete a backup
  static async deleteBackup(backupId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, BACKUPS_COLLECTION, backupId));
    } catch (error) {
      console.error('Error deleting backup:', error);
      throw error;
    }
  }

  // Clean old auto-backups (keep only last 10)
  static async cleanOldAutoBackups(userId: string, tournamentId: string): Promise<void> {
    try {
      const q = query(
        collection(db, BACKUPS_COLLECTION),
        where('userId', '==', userId),
        where('tournamentId', '==', tournamentId),
        where('backupType', '==', 'auto')
      );
      const querySnapshot = await getDocs(q);

      // Sort by date descending and keep only latest 10
      const docs = querySnapshot.docs.sort((a: QueryDocumentSnapshot<DocumentData>, b: QueryDocumentSnapshot<DocumentData>) => {
        const timeA = (a.data().createdAt as Timestamp).toMillis?.() || 0;
        const timeB = (b.data().createdAt as Timestamp).toMillis?.() || 0;
        return timeB - timeA;
      });

      // Delete everything after the 10th backup
      for (let i = 10; i < docs.length; i++) {
        await deleteDoc(docs[i].ref);
      }
    } catch (error) {
      console.error('Error cleaning old backups:', error);
    }
  }

  // Export backup as JSON
  static exportBackupAsJSON(backup: BackupData): string {
    return JSON.stringify(backup, null, 2);
  }

  // Download backup as file
  static downloadBackupAsFile(backup: BackupData): void {
    const dataStr = this.exportBackupAsJSON(backup);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${backup.tournamentName}-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
