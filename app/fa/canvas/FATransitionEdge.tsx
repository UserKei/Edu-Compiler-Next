'use client'

import { EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react'

interface FATransitionEdgeData {
  conditions: string[]
}

export function FATransitionEdge({
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
  const edgeData = data as unknown as FATransitionEdgeData
  
  // 计算贝塞尔曲线路径
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.3, // 控制曲线弯曲程度
  })

  const conditionsText = edgeData?.conditions?.join(', ') || 'ε'

  return (
    <>
      {/* 贝塞尔曲线路径 */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        style={{
          stroke: selected ? '#89b4fa' : '#6c7086', // ctp-blue / ctp-overlay1
          strokeWidth: selected ? 3 : 2,
          fill: 'none',
        }}
      />
      
      {/* 箭头标记 */}
      <defs>
        <marker
          id={`arrowhead-${id}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={selected ? '#89b4fa' : '#6c7086'}
          />
        </marker>
      </defs>
      
      <path
        d={edgePath}
        style={{
          stroke: 'transparent',
          strokeWidth: 2,
          fill: 'none',
          markerEnd: `url(#arrowhead-${id})`,
        }}
      />
      
      {/* 智能标签定位（在贝塞尔曲线中点） */}
      {conditionsText && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className="bg-ctp-surface0 text-ctp-text px-2 py-1 rounded-lg text-xs font-mono font-bold border border-ctp-surface1 shadow-lg pointer-events-none"
          >
            {conditionsText}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}
