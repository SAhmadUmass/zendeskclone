'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/hooks/useSupabase'
import { AuthForm } from '@/components/AuthForm'
import type { AuthState } from '@/types/auth'

export default function SignIn() {
  const router = useRouter()
  const supabase = useSupabase()
  const [state, setState] = useState<AuthState>({
    email: '',
    password: '',
    error: null,
    loading: false,
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setState(s => ({ ...s, loading: true, error: null }))

    const { error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    })

    if (error) {
      setState(s => ({ ...s, error, loading: false }))
      return
    }

    router.push('/dashboard')
  }

  return (
    <AuthForm
      onSubmit={handleSignIn}
      email={state.email}
      setEmail={(email) => setState(s => ({ ...s, email }))}
      password={state.password}
      setPassword={(password) => setState(s => ({ ...s, password }))}
      error={state.error}
      loading={state.loading}
      submitText="Sign In"
    />
  )
}

