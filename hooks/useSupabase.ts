import { useSupabaseContext } from '@/components/SupabaseProvider'

export function useSupabase() {
  return useSupabaseContext()
} 