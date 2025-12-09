import { Tournament } from '../types';

export class TournamentBackup {
  static exportToJSON(tournament: Tournament): string {
    return JSON.stringify(tournament, null, 2);
  }

  static exportAsFile(tournament: Tournament): void {
    const dataStr = this.exportToJSON(tournament);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tournament.name.replace(/\s+/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static importFromFile(): Promise<Tournament> {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (!file) {
          reject(new Error('No file selected'));
          return;
        }

        const reader = new FileReader();
        reader.onload = (event: any) => {
          try {
            const tournament = JSON.parse(event.target.result) as Tournament;
            // Validate tournament object structure
            if (!tournament.id || !tournament.name || !tournament.teams) {
              reject(new Error('Invalid tournament file format'));
              return;
            }
            resolve(tournament);
          } catch (error) {
            reject(new Error('Failed to parse JSON file'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      };

      input.click();
    });
  }

  static validateTournament(data: unknown): data is Tournament {
    const obj = data as any;
    return (
      typeof obj === 'object' &&
      typeof obj.id === 'string' &&
      typeof obj.name === 'string' &&
      Array.isArray(obj.teams) &&
      Array.isArray(obj.matches) &&
      typeof obj.createdAt === 'number' &&
      typeof obj.status === 'string'
    );
  }
}
