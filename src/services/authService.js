import { supabase } from '../lib/supabaseClient'

export function subscribeToAuthChanges(callback) {
  return supabase.auth.onAuthStateChange(callback)
}

export function signUpWithEmail(email, password) {
  return supabase.auth.signUp({ email, password })
}

export function signInWithEmail(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export function signOutUser() {
  return supabase.auth.signOut()
}
