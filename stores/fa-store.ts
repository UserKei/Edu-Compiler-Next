import { create } from 'zustand'
import { apiClient } from '../lib/api'
import { FAResult } from '../types/fa'

interface FAState {
  inputRegex: string
  result: FAResult | null
  isLoading: boolean
  error: string | null
}

interface FAActions {
  setInputRegex: (regex: string) => void
  analyze: () => Promise<void>
  reset: () => void
}

type FAStore = FAState & FAActions

export const useFAStore = create<FAStore>((set, get) => ({
  // State
  inputRegex: '',
  result: null,
  isLoading: false,
  error: null,

  // Actions
  setInputRegex: (regex) => set({ inputRegex: regex }),

  analyze: async () => {
    const { inputRegex } = get()
    
    if (!inputRegex.trim()) {
      set({ error: '请输入正则表达式' })
      return
    }

    try {
      set({ isLoading: true, error: null })
      
      const response = await apiClient.getDFAM(inputRegex)
      
      if (response.code === 0) {
        console.group('FA (有限自动机) 分析结果')
        console.log('输入正则表达式:', inputRegex)
        console.log('分析结果:', response.data)
        console.groupEnd()
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
    inputRegex: '', 
    result: null, 
    isLoading: false, 
    error: null 
  }),
}))
