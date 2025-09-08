import { create } from 'zustand'
import { apiClient } from '../lib/api'
import { LR0AnalysisResult } from '../types/lr0'

interface LR0State {
  inputProductions: string[]
  result: LR0AnalysisResult | null
  isLoading: boolean
  error: string | null
}

interface LR0Actions {
  setInputProductions: (productions: string[]) => void
  addProduction: (production: string) => void
  removeProduction: (index: number) => void
  analyze: () => Promise<void>
  reset: () => void
}

type LR0Store = LR0State & LR0Actions

export const useLR0Store = create<LR0Store>((set, get) => ({
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
      
      const response = await apiClient.analyzeLR0(inputProductions)
      
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
