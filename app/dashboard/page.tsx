'use client'

import { useAuth } from '@/components/AuthContext'
import { useSupabase } from '@/hooks/useSupabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import TicketCreationScreen from '@/components/ticket-creation-screen'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const { supabase } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return <TicketCreationScreen />
}

