'use client'

import { useState } from 'react'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import ForgotPassword from '@/components/ForgotPassword'
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const [view, setView] = useState<'signin' | 'signup' | 'forgot'>('signin')

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">
        {view === 'signin' ? 'Sign In' : view === 'signup' ? 'Sign Up' : 'Forgot Password'}
      </h1>
      
      {view === 'signin' && <SignIn />}
      {view === 'signup' && <SignUp />}
      {view === 'forgot' && <ForgotPassword />}

      <div className="mt-4 text-center">
        {view === 'signin' && (
          <>
            <Button variant="link" onClick={() => setView('signup')}>
              Need an account? Sign Up
            </Button>
            <Button variant="link" onClick={() => setView('forgot')}>
              Forgot Password?
            </Button>
          </>
        )}
        {view === 'signup' && (
          <Button variant="link" onClick={() => setView('signin')}>
            Already have an account? Sign In
          </Button>
        )}
        {view === 'forgot' && (
          <Button variant="link" onClick={() => setView('signin')}>
            Remember your password? Sign In
          </Button>
        )}
      </div>
    </>
  )
}

