// LL1分析结果类型 (基于旧前端但简化)
export interface LL1AnalysisResult {
  S: string
  Vn: string[]
  Vt: string[]
  formulas_dict: Record<string, string[]>
  first: Record<string, string[]>
  follow: Record<string, string[]>
  table: Record<string, string>
  isLL1: boolean
}
