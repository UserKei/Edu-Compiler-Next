import { create } from 'zustand'
import { apiClient } from '../lib/api'

interface CommonState {
  loading: boolean
  error: string | null
  apiConnected: boolean | null
}

interface CommonActions {
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  testConnection: () => Promise<boolean>
}

type CommonStore = CommonState & CommonActions

export const useCommonStore = create<CommonStore>((set) => ({
  // State
  loading: false,
  error: null,
  apiConnected: null,

  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  testConnection: async () => {
    try {
      set({ loading: true, error: null })
      
      const response = await apiClient.testConnection()
      
      if (response.code === 0) {
        set({ apiConnected: true })
        return true
      } else {
        set({ apiConnected: false, error: response.message })
        return false
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '连接失败'
      set({ apiConnected: false, error: message })
      return false
    } finally {
      set({ loading: false })
    }
  },
}))
