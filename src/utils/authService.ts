import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  AuthError
} from 'firebase/auth';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export class AuthService {
  // Register new user
  static async registerUser(email: string, password: string, displayName: string): Promise<AuthUser> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, {
        displayName
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(this.getErrorMessage(authError.code));
    }
  }

  // Login user
  static async loginUser(email: string, password: string): Promise<AuthUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(this.getErrorMessage(authError.code));
    }
  }

  // Logout user
  static async logoutUser(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(this.getErrorMessage(authError.code));
    }
  }

  // Get current user
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        callback(null);
      }
    });
  }

  // Get user-friendly error messages
  private static getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      'auth/email-already-in-use': 'Email is already registered',
      'auth/invalid-email': 'Invalid email address',
      'auth/weak-password': 'Password must be at least 6 characters',
      'auth/user-not-found': 'User not found. Please register first',
      'auth/wrong-password': 'Incorrect password',
      'auth/too-many-requests': 'Too many login attempts. Try again later',
      'auth/operation-not-allowed': 'Operation not allowed',
      'auth/invalid-credential': 'Invalid email or password'
    };
    return messages[code] || 'An error occurred. Please try again.';
  }
}
