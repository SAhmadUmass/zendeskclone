'use client'

import { createContext, useContext, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type SupabaseClient } from '@supabase/supabase-js'

const SupabaseContext = createContext<SupabaseClient | null>(null)

export const useSupabaseContext = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error(
      'useSupabase must be used within a SupabaseProvider. ' +
      'Make sure your app is wrapped in a SupabaseProvider component.'
    )
  }
  return context
}

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => {
    const client = createClient()
    // Verify client is properly initialized
    if (!client || !client.auth) {
      throw new Error(
        'Failed to initialize Supabase client. ' +
        'Make sure your environment variables are properly set.'
      )
    }
    return client
  }, [])

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  )
} 