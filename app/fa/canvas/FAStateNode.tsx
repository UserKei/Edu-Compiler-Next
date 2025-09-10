'use client'

import { Handle, Position, NodeProps } from '@xyflow/react'

interface FAStateNodeData {
  label: string
  isInitial: boolean
  isFinal: boolean
}

export function FAStateNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as FAStateNodeData
  return (
    <div className="relative">
      {/* 主节点 - Milanote风格圆形 */}
      <div className={`
        w-16 h-16 border-2 rounded-full bg-ctp-surface0 
        flex items-center justify-center font-bold text-sm text-ctp-text
        shadow-lg cursor-move transition-all duration-200
        ${selected 
          ? 'border-ctp-blue shadow-ctp-blue/30 shadow-xl' 
          : 'border-ctp-surface2 hover:border-ctp-overlay0'
        }
      `}>
        
        {/* 中心连接点 - 既是入点也是出点 */}
        <Handle
          type="target"
          position={Position.Left}
          id="center"
          className="w-3 h-3 bg-ctp-red border-2 border-ctp-base rounded-full"
          style={{ 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        <Handle
          type="source"
          position={Position.Right}
          id="center"
          className="w-3 h-3 bg-ctp-red border-2 border-ctp-base rounded-full"
          style={{ 
            left: '50%', 
            top: '50%', 
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        {/* 节点内容 */}
        <div className="flex items-center pointer-events-none">
          {nodeData.isInitial && (
            <span className="text-ctp-green mr-1 text-lg">→</span>
          )}
          <span className="text-ctp-text">{nodeData.label}</span>
        </div>
      </div>
      
      {/* 右上角视觉出点 - 纯装饰 */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-ctp-blue border-2 border-ctp-base rounded-full pointer-events-none" />
      
      {/* 终态外圈 */}
      {nodeData.isFinal && (
        <div className="absolute -top-1 -left-1 w-[68px] h-[68px] border-2 border-ctp-surface2 rounded-full pointer-events-none" />
      )}
    </div>
  )
}
