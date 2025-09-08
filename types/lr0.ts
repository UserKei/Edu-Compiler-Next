// LR0分析结果类型 (基于旧前端但简化)
export interface LR0AnalysisResult {
  S: string
  Vn: string[]
  Vt: string[]
  formulas_list: string[]
  dot_items: string[]
  all_dfa: any[]
  actions: Record<string, string>
  gotos: Record<string, string>
  isLR0: boolean
  LR0_dot_str: string
}

// LR0输入串分析结果
export interface LR0AnalysisStepInfo {
  info_res: string
  info_step: number[]
  info_msg: string[]
  info_state_stack: string[]
  info_str: string[]
  info_symbol_stack: string[]
  info_action?: string[]
}
