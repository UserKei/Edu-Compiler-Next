'use client'

import { useState } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'

interface LRStateNodeData {
  stateId: number
  items: string[]
  isExpanded?: boolean
}

export function LRStateNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as LRStateNodeData
  const [isExpanded, setIsExpanded] = useState(nodeData.isExpanded ?? true)
  
  return (
    <div className="relative">
      {/* 主节点 - Milanote风格矩形 */}
      <div className={`
        min-w-[180px] max-w-[280px] min-h-[80px] border-2 rounded-lg bg-ctp-surface0 
        p-3 shadow-lg cursor-move transition-all duration-200
        ${selected 
          ? 'border-ctp-green shadow-ctp-green/30 shadow-xl' 
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
            left: -6,
            top: '50%', 
            transform: 'translateY(-50%)'
          }}
        />
        
        <Handle
          type="source"
          position={Position.Right}
          id="center"
          className="w-3 h-3 bg-ctp-red border-2 border-ctp-base rounded-full"
          style={{ 
            right: -6,
            top: '50%', 
            transform: 'translateY(-50%)'
          }}
        />
        
        {/* 节点头部 */}
        <div className="flex justify-between items-center border-b border-ctp-surface1 pb-2 mb-2">
          <span className="font-bold text-ctp-text text-sm">
            State {nodeData.stateId}
          </span>
          <button 
            className="w-5 h-5 bg-ctp-surface1 hover:bg-ctp-surface2 border border-ctp-overlay0 rounded text-xs flex items-center justify-center text-ctp-text transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
        
        {/* 项目集内容 */}
        {isExpanded && nodeData.items && nodeData.items.length > 0 && (
          <div className="space-y-1">
            {nodeData.items.slice(0, 4).map((item, index) => (
              <div key={index} className="text-xs font-mono text-ctp-subtext1 leading-tight">
                {item}
              </div>
            ))}
            {nodeData.items.length > 4 && (
              <div className="text-xs text-ctp-subtext0 italic">
                ...({nodeData.items.length - 4} more)
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* 右上角视觉出点 - 纯装饰 */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-ctp-blue border-2 border-ctp-base rounded-full pointer-events-none" />
    </div>
  )
}
