'use client'

import { useAuth } from '@/components/AuthContext'
import { useSupabase } from '@/hooks/useSupabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="mb-4">You are logged in as: {user.email}</p>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  )
}

