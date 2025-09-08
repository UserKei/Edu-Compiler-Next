// SLR1分析结果类型 (基于旧前端但简化)
export interface SLR1AnalysisResult {
  S: string
  Vn: string[]
  Vt: string[]
  formulas_list: string[]
  dot_items: string[]
  all_dfa: any[]
  actions: Record<string, string>
  gotos: Record<string, string>
  isSLR1: boolean
  SLR1_dot_str: string
  first: Record<string, string[]>
  follow: Record<string, string[]>
}
