// FA分析结果类型 (与旧前端保持一致)
export interface FAResult {
  table: any
  table_to_num: any
  table_to_num_min: any
  P: any
  P_change: any
  NFA_dot_str: string
  DFA_dot_str: string
  Min_DFA_dot_str: string
}
