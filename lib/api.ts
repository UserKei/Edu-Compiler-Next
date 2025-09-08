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

  // LL1语法分析
  async getLL1Analysis(data: { inpProductions: string[] }): Promise<ApiResponse<LL1AnalysisResult>> {
    return this.request('/api/LL1Analyse', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // LL1分析输入串
  async getLL1InputStringAnalysis(data: { inpProductions: string[], inpStr: string }): Promise<ApiResponse<any>> {
    return this.request('/api/LL1AnalyseInp', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // LR0语法分析
  async getLR0Analysis(data: { inpProductions: string[] }): Promise<ApiResponse<LR0AnalysisResult>> {
    return this.request('/api/LR0Analyse', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // LR0分析输入串
  async getLR0InputStringAnalysis(data: { inpProductions: string[], inpStr: string }): Promise<ApiResponse<any>> {
    return this.request('/api/LR0AnalyseInp', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // SLR1语法分析
  async getSLR1Analysis(data: { inpProductions: string[] }): Promise<ApiResponse<SLR1AnalysisResult>> {
    return this.request('/api/SLR1Analyse', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // SLR1分析输入串
  async getSLR1InputStringAnalysis(data: { inpProductions: string[], inpStr: string }): Promise<ApiResponse<any>> {
    return this.request('/api/SLR1AnalyseInp', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
