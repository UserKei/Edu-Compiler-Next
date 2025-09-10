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

import { LRStateNode } from './LRStateNode'
import { LRTransitionEdge } from './LRTransitionEdge'

// 初始LR节点数据（用于演示）
const initialNodes: Node[] = [
  {
    id: 'state-0',
    type: 'lrState',
    position: { x: 100, y: 100 },
    data: { 
      stateId: 0, 
      items: ['E → •E+T', 'E → •T', 'T → •id'],
      isExpanded: true
    }
  },
  {
    id: 'state-1',
    type: 'lrState',
    position: { x: 400, y: 100 },
    data: { 
      stateId: 1, 
      items: ['E → E•+T'],
      isExpanded: true
    }
  },
  {
    id: 'state-2',
    type: 'lrState',
    position: { x: 250, y: 300 },
    data: { 
      stateId: 2, 
      items: ['T → id•'],
      isExpanded: true
    }
  }
]

const initialEdges: Edge[] = [
  {
    id: 'state-0-state-1',
    source: 'state-0',
    target: 'state-1',
    type: 'lrTransition',
    sourceHandle: 'center',
    targetHandle: 'center',
    data: { symbol: 'E', action: 'goto' }
  },
  {
    id: 'state-0-state-2',
    source: 'state-0',
    target: 'state-2',
    type: 'lrTransition',
    sourceHandle: 'center',
    targetHandle: 'center',
    data: { symbol: 'id', action: 'shift' }
  }
]

export function LRCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // 注册自定义节点和边类型
  const nodeTypes = useMemo(() => ({
    lrState: LRStateNode,
  }), [])

  const edgeTypes = useMemo(() => ({
    lrTransition: LRTransitionEdge,
  }), [])

  // 连接处理
  const onConnect = useCallback((params: Connection) => {
    const connection = {
      ...params,
      sourceHandle: 'center',
      targetHandle: 'center',
      type: 'lrTransition',
      data: { symbol: '?', action: 'shift' }
    }
    setEdges((eds) => addEdge(connection, eds))
  }, [setEdges])

  // 双击画布添加新LR状态节点
  const onPaneClick = useCallback((event: React.MouseEvent) => {
    const reactFlowBounds = (event.target as Element).closest('.react-flow')?.getBoundingClientRect()
    if (!reactFlowBounds) return

    const position = {
      x: event.clientX - reactFlowBounds.left - 90, // 90 = 节点宽度的一半
      y: event.clientY - reactFlowBounds.top - 50   // 50 = 节点高度的一半
    }

    const newNode: Node = {
      id: `state-${nodes.length}`,
      type: 'lrState',
      position,
      data: { 
        stateId: nodes.length,
        items: [`I${nodes.length} → •`],
        isExpanded: true
      }
    }

    setNodes((nds) => nds.concat(newNode))
  }, [nodes.length, setNodes])

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
        onPaneClick={onPaneClick}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-ctp-mantle"
      >
        <Controls className="bg-ctp-surface0 border-ctp-surface1" />
        <MiniMap 
          className="bg-ctp-surface0 border-ctp-surface1"
          nodeColor="#a6e3a1"
          maskColor="rgba(0, 0, 0, 0.2)"
        />
        <Background 
          variant={BackgroundVariant.Lines} 
          gap={20} 
          size={1}
          color="#45475a"
        />
      </ReactFlow>
    </div>
  )
}
