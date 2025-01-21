export interface AuthError {
  message: string
}

export interface AuthState {
  email: string
  password: string
  error: AuthError | null
  loading: boolean
}

export interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  error: AuthError | null
  loading: boolean
  submitText: string
} 