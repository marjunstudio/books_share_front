// components/GoogleAuthButton.tsx
"use client";

import React from 'react';
import { useAuth } from '../../utils/firebase/useAuth';

const GoogleAuthButton: React.FC = () => {
  const { user, accessToken, signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  React.useEffect(() => {
    if (user) {
      console.log("ログイン済み");
      console.log(user.displayName, user.email, user.photoURL, user.emailVerified, user.uid);
    } else {
      console.log("未ログイン");
    }
  }, [user]);

  return (
    <div>
      <button onClick={handleSignIn} className='self-center px-8 py-3 rounded'>
        Googleログイン
      </button>
      {user && <p>ようこそ、{user.displayName}さん</p>}
    </div>
  );
};

export default GoogleAuthButton;
