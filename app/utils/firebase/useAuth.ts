// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/setting';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setAuthState({ user, accessToken: token });
        // リフレッシュトークンをHttpOnlyクッキーに保存するAPIを呼び出す
        await fetch('/api/auth/setRefreshToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: user.refreshToken }),
        });
      } else {
        setAuthState({ user: null, accessToken: null });
        // クッキーからリフレッシュトークンを削除するAPIを呼び出す
        await fetch('/api/auth/clearRefreshToken', { method: 'POST' });
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      setAuthState({ user: result.user, accessToken: token });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return { ...authState, signInWithGoogle };
}
