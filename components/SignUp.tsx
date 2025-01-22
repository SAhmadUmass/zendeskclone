'use client'

import { useState } from 'react'
import { useSupabase } from '@/hooks/useSupabase'
import { AuthForm } from '@/components/AuthForm'
import type { AuthState } from '@/types/auth'
import { Alert, AlertDescription } from "@/components/ui/alert"

const PASSWORD_REGEX = {
  minLength: 8,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*]/,
}

export default function SignUp() {
  const supabase = useSupabase()
  const [state, setState] = useState<AuthState & { success: boolean }>({
    email: '',
    password: '',
    error: null,
    loading: false,
    success: false,
  })

  const validatePassword = (password: string) => {
    if (password.length < PASSWORD_REGEX.minLength) {
      return 'Password must be at least 8 characters long'
    }
    if (!PASSWORD_REGEX.hasUpperCase.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!PASSWORD_REGEX.hasLowerCase.test(password)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!PASSWORD_REGEX.hasNumber.test(password)) {
      return 'Password must contain at least one number'
    }
    if (!PASSWORD_REGEX.hasSpecialChar.test(password)) {
      return 'Password must contain at least one special character'
    }
    return null
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setState(s => ({ ...s, loading: true, error: null, success: false }))

    const passwordError = validatePassword(state.password)
    if (passwordError) {
      setState(s => ({ 
        ...s, 
        error: { message: passwordError }, 
        loading: false 
      }))
      return
    }

    const { error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })

    if (error) {
      setState(s => ({ ...s, error, loading: false }))
      return
    }

    setState(s => ({ ...s, loading: false, success: true }))
  }

  return (
    <div className="space-y-4">
      <AuthForm
        onSubmit={handleSignUp}
        email={state.email}
        setEmail={(email) => setState(s => ({ ...s, email }))}
        password={state.password}
        setPassword={(password) => setState(s => ({ ...s, password }))}
        error={state.error}
        loading={state.loading}
        submitText="Sign Up"
      />
      {state.success && (
        <Alert>
          <AlertDescription>
            Registration successful! Please check your email to verify your account.
          </AlertDescription>
        </Alert>
      )}
      <p className="text-xs text-gray-500 mt-1">
        Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.
      </p>
    </div>
  )
}

