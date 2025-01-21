import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { AuthFormProps } from "@/types/auth"

export function AuthForm({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  error,
  loading,
  submitText
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 w-full max-w-sm">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Processing...' : submitText}
      </Button>
    </form>
  )
} 