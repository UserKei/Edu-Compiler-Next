import { create } from 'zustand'
import { apiClient } from '../lib/api'
import { LL1AnalysisResult } from '../types/ll1'

interface LL1State {
  inputProductions: string[]
  result: LL1AnalysisResult | null
  isLoading: boolean
  error: string | null
}

interface LL1Actions {
  setInputProductions: (productions: string[]) => void
  addProduction: (production: string) => void
  removeProduction: (index: number) => void
  analyze: () => Promise<void>
  reset: () => void
}

type LL1Store = LL1State & LL1Actions

export const useLL1Store = create<LL1Store>((set, get) => ({
  // State
  inputProductions: [],
  result: null,
  isLoading: false,
  error: null,

  // Actions
  setInputProductions: (productions) => set({ inputProductions: productions }),
  
  addProduction: (production) => {
    const { inputProductions } = get()
    set({ inputProductions: [...inputProductions, production] })
  },
  
  removeProduction: (index) => {
    const { inputProductions } = get()
    set({ inputProductions: inputProductions.filter((_, i) => i !== index) })
  },

  analyze: async () => {
    const { inputProductions } = get()
    
    if (inputProductions.length === 0) {
      set({ error: '请输入产生式' })
      return
    }

    try {
      set({ isLoading: true, error: null })
      
      const response = await apiClient.analyzeLL1(inputProductions)
      
      if (response.code === 0) {
        set({ result: response.data })
      } else {
        set({ error: response.message })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '请求失败'
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  reset: () => set({ 
    inputProductions: [], 
    result: null, 
    isLoading: false, 
    error: null 
  }),
}))
