import type { ApiResponse, FAResult, LL1AnalysisResult, LR0AnalysisResult, SLR1AnalysisResult } from '../types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  // 测试API连接
  async testConnection(): Promise<ApiResponse> {
    return this.request('/api/test')
  }

  // FA算法：正则表达式转DFAM
  async getDFAM(regex: string): Promise<ApiResponse<FAResult>> {
    return this.request('/api/Regex_to_DFAM', {
      method: 'POST',
      body: JSON.stringify({ inpRegex: regex }),
    })
  }

  // LL1算法：语法分析
  async analyzeLL1(productions: string[]): Promise<ApiResponse<LL1AnalysisResult>> {
    return this.request('/api/LL1Analyse', {
      method: 'POST',
      body: JSON.stringify({ inpProductions: productions }),
    })
  }

  // LR0算法：语法分析
  async analyzeLR0(productions: string[]): Promise<ApiResponse<LR0AnalysisResult>> {
    return this.request('/api/LR0Analyse', {
      method: 'POST',
      body: JSON.stringify({ inpProductions: productions }),
    })
  }

  // SLR1算法：语法分析
  async analyzeSLR1(productions: string[]): Promise<ApiResponse<SLR1AnalysisResult>> {
    return this.request('/api/SLR1Analyse', {
      method: 'POST',
      body: JSON.stringify({ inpProductions: productions }),
    })
  }
}

export const apiClient = new ApiClient()
