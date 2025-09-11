'use client'

import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  Connection,
  ConnectionMode
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { FAStateNode } from './FAStateNode'
import { FATransitionEdge } from './FATransitionEdge'

// 初始节点数据（用于演示）
const initialNodes: Node[] = [
  {
    id: 'q0',
    type: 'faState',
    position: { x: 100, y: 100 },
    data: { label: 'q0', isInitial: true, isFinal: false }
  },
  {
    id: 'q1',
    type: 'faState', 
    position: { x: 300, y: 100 },
    data: { label: 'q1', isInitial: false, isFinal: true }
  }
]

const initialEdges: Edge[] = [
  {
    id: 'q0-q1',
    source: 'q0',
    target: 'q1',
    type: 'faTransition',
    sourceHandle: 'center',
    targetHandle: 'center',
    data: { conditions: ['a', 'b'] }
  }
]

export function FACanvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // 注册自定义节点和边类型
  const nodeTypes = useMemo(() => ({
    faState: FAStateNode,
  }), [])

  const edgeTypes = useMemo(() => ({
    faTransition: FATransitionEdge,
  }), [])

  // 连接处理
  const onConnect = useCallback((params: Connection) => {
    // 确保连接使用center handle
    const connection = {
      ...params,
      sourceHandle: 'center',
      targetHandle: 'center',
      type: 'faTransition',
      data: { conditions: ['ε'] } // 默认空转换
    }
    setEdges((eds) => addEdge(connection, eds))
  }, [setEdges])

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-ctp-mantle"
      >
        <Controls className="bg-ctp-surface0 border-ctp-surface1" />
        <MiniMap 
          className="bg-ctp-surface0 border-ctp-surface1"
          nodeColor="#cba6f7"
          maskColor="rgba(0, 0, 0, 0.2)"
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16} 
          size={1}
          color="#45475a"
        />
      </ReactFlow>
    </div>
  )
}
