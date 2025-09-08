import { create } from 'zustand'
import { apiClient } from '../lib/api'
import { SLR1AnalysisResult, SLR1AnalysisStepInfo } from '../types/slr1'

interface SLR1State {
  inputProductions: string[]
  inputString: string
  result: SLR1AnalysisResult | null
  inputStringResult: SLR1AnalysisStepInfo | null
  isLoading: boolean
  error: string | null
}

interface SLR1Actions {
  setInputProductions: (productions: string[]) => void
  addProduction: (production: string) => void
  removeProduction: (index: number) => void
  setInputString: (inputString: string) => void
  analyze: () => Promise<void>
  analyzeInputString: () => Promise<void>
  reset: () => void
}

type SLR1Store = SLR1State & SLR1Actions

export const useSLR1Store = create<SLR1Store>((set, get) => ({
  // State
  inputProductions: [],
  inputString: '',
  result: null,
  inputStringResult: null,
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

  setInputString: (inputString) => set({ inputString }),

  analyze: async () => {
    const { inputProductions } = get()
    
    if (inputProductions.length === 0) {
      set({ error: '请输入产生式' })
      return
    }

    try {
      set({ isLoading: true, error: null })
      
      const response = await apiClient.getSLR1Analysis({ inpProductions: inputProductions })
      
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

  analyzeInputString: async () => {
    const { inputProductions, inputString } = get()
    
    if (inputProductions.length === 0) {
      set({ error: '请输入产生式' })
      return
    }
    
    if (!inputString.trim()) {
      set({ error: '请输入待分析的字符串' })
      return
    }

    try {
      set({ isLoading: true, error: null })
      
      const response = await apiClient.getSLR1InputStringAnalysis({ 
        inpProductions: inputProductions, 
        inpStr: inputString.trim() 
      })
      
      if (response.code === 0) {
        set({ inputStringResult: response.data })
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
    inputString: '',
    result: null, 
    inputStringResult: null,
    isLoading: false, 
    error: null 
  }),
}))
