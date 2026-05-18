import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(userId) {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Profile fetch error:', error);
      }
      if (data) {
        console.log('Profile loaded:', data);
      } else {
        console.warn('Profile not found for user:', userId);
      }
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setProfile(null);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp({ email, password, username }) {
    const options = username ? { data: { username } } : undefined;
    const response = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (response.error?.status === 500) {
      return {
        ...response,
        error: {
          ...response.error,
          message:
            'Supabase signup failed due to a backend database issue. Check your Supabase project auth/database configuration.',
        },
      };
    }

    return response;
  }

  async function signIn({ email, password }) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function refreshProfile() {
    if (user) await fetchProfile(user.id);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
