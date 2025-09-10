'use client'

import { EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react'

interface LRTransitionEdgeData {
  symbol: string
  action: 'shift' | 'goto'
}

export function LRTransitionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected
}: EdgeProps) {
  const edgeData = data as unknown as LRTransitionEdgeData
  
  // 计算贝塞尔曲线路径
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.2,
  })

  const isGoto = edgeData?.action === 'goto'
  const symbolText = edgeData?.symbol || '?'

  return (
    <>
      {/* 贝塞尔曲线路径 */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          stroke: selected 
            ? '#89b4fa'  // ctp-blue 
            : isGoto 
              ? '#a6e3a1'  // ctp-green
              : '#6c7086', // ctp-overlay1
          strokeWidth: selected ? 3 : 2,
          strokeDasharray: isGoto ? '5,5' : 'none',
          fill: 'none',
        }}
      />
      
      {/* 箭头标记 */}
      <defs>
        <marker
          id={`arrowhead-lr-${id}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={selected 
              ? '#89b4fa' 
              : isGoto 
                ? '#a6e3a1' 
                : '#6c7086'
            }
          />
        </marker>
      </defs>
      
      <path
        d={edgePath}
        style={{
          stroke: 'transparent',
          strokeWidth: 2,
          fill: 'none',
          markerEnd: `url(#arrowhead-lr-${id})`,
        }}
      />
      
      {/* 符号标签 */}
      {symbolText && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className={`
              px-2 py-1 rounded-lg text-xs font-mono font-bold border shadow-lg pointer-events-none
              ${isGoto 
                ? 'bg-ctp-green/10 text-ctp-green border-ctp-green/30' 
                : 'bg-ctp-surface0 text-ctp-text border-ctp-surface1'
              }
            `}
          >
            {symbolText}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}
