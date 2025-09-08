// SLR1分析结果类型 (基于旧前端但简化)
export interface SLR1AnalysisResult {
  S: string
  Vn: string[]
  Vt: string[]
  formulas_list: string[]
  dot_items: string[]
  all_dfa: SLR1DFAState[]
  actions: Record<string, string>
  gotos: Record<string, string>
  isSLR1: boolean
  SLR1_dot_str: string
  first: Record<string, string[]>
  follow: Record<string, string[]>
}

// SLR1 DFA状态类型
export interface SLR1DFAState {
  id: number
  next_ids: Record<string, number>
  pros: string[]
}

// SLR1输入串分析结果
export interface SLR1AnalysisStepInfo {
  info_res: string
  info_step: number[]
  info_msg: string[]
  info_state_stack: string[]
  info_str: string[]
  info_symbol_stack: string[]
  info_action?: string[]
}
