import React from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

function Logout() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <button onClick={() => supabase.auth.signOut()}>
      Logout
    </button>
  );
}

export default Logout;
