import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

const isConfigured =
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'placeholder-key'

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface StartupApplication {
  id?: string
  founder_name: string
  startup_name: string
  email: string
  phone: string
  sector: string
  funding_stage: string
  funding_required: string
  pitch_deck_url?: string
  created_at?: string
  status?: string
}

export interface ContactMessage {
  id?: string
  name: string
  email: string
  company?: string
  message: string
  created_at?: string
  read?: boolean
}



export async function submitStartupApplication(data: Omit<StartupApplication, 'id' | 'created_at'>) {
  if (!supabase) return { result: null, error: null }
  try {
    const { data: result, error } = await supabase.from('startup_applications').insert([data])
    return { result, error }
  } catch { return { result: null, error: null } }
}

export async function getStartupApplications() {
  if (!supabase) return { data: [], error: null }
  try {
    const { data, error } = await supabase.from('startup_applications').select('*').order('created_at', { ascending: false })
    return { data: data || [], error }
  } catch { return { data: [], error: null } }
}

export async function submitContactMessage(data: Omit<ContactMessage, 'id' | 'created_at'>) {
  if (!supabase) return { result: null, error: null }
  try {
    const { data: result, error } = await supabase.from('contact_messages').insert([data])
    return { result, error }
  } catch { return { result: null, error: null } }
}

export async function getContactMessages() {
  if (!supabase) return { data: [], error: null }
  try {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    return { data: data || [], error }
  } catch { return { data: [], error: null } }
}



export async function uploadPitchDeck(file: File, applicationId: string) {
  if (!supabase) return { url: null, error: null }
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${applicationId}-${Date.now()}.${fileExt}`
    const { error } = await supabase.storage.from('pitch-decks').upload(fileName, file)
    if (error) return { url: null, error }
    const { data: urlData } = supabase.storage.from('pitch-decks').getPublicUrl(fileName)
    return { url: urlData.publicUrl, error: null }
  } catch { return { url: null, error: null } }
}

export async function signIn(email: string, password: string) {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured. Add credentials to .env.local' } as any }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  } catch { return { data: null, error: { message: 'Auth error' } as any } }
}

export async function signOut() {
  if (!supabase) return { error: null }
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch { return { error: null } }
}

export async function getSession() {
  if (!supabase) return null
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch { return null }
}
