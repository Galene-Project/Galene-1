import { createClient } from '@supabase/supabase-js'

// O Next.js vai buscar essas chaves lá na Vercel (onde você as cadastrou)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
