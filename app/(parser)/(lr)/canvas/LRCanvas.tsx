'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import cytoscape from 'cytoscape'
// @ts-expect-error - 没有类型定义
import edgehandles from 'cytoscape-edgehandles'
import { lrCytoscapeOptions } from './lrConfig'

// 注册扩展
cytoscape.use(edgehandles)

interface LRCanvasProps {
  className?: string
}

interface LRNode {
  id: string
  label: string
  type: 'state' | 'item'
  isStart?: boolean
  isAccept?: boolean
  position: { x: number; y: number }
}

interface LREdge {
  id: string
  source: string
  target: string
  label: string
  type: 'shift' | 'reduce' | 'goto'
}

export function LRCanvas({ className = '' }: LRCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)
  const [nodes, setNodes] = useState<LRNode[]>([])
  const [edges, setEdges] = useState<LREdge[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [nodeType, setNodeType] = useState<'state' | 'item'>('state')

  // 添加节点
  const addNode = useCallback((x: number, y: number) => {
    const newNode: LRNode = {
      id: `node_${Date.now()}`,
      label: nodeType === 'state' ? `I${nodes.filter(n => n.type === 'state').length}` : `Item ${nodes.filter(n => n.type === 'item').length}`,
      type: nodeType,
      isStart: nodeType === 'state' && nodes.filter(n => n.type === 'state').length === 0,
      isAccept: false,
      position: { x, y }
    }
    setNodes(prev => [...prev, newNode])
  }, [nodes, nodeType])

  // 删除节点
  const removeNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId))
    setEdges(prev => prev.filter(e => e.source !== nodeId && e.target !== nodeId))
    setSelectedElement(prev => prev === nodeId ? null : prev)
  }, [])

  // 删除边
  const removeEdge = useCallback((edgeId: string) => {
    setEdges(prev => prev.filter(e => e.id !== edgeId))
    setSelectedElement(prev => prev === edgeId ? null : prev)
  }, [])

  // 切换起始状态
  const toggleStartState = useCallback((nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, isStart: !node.isStart }
        : node
    ))
  }, [])

  // 切换接受状态
  const toggleAcceptState = useCallback((nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, isAccept: !node.isAccept }
        : node
    ))
  }, [])

  // 更新标签
  const updateLabel = useCallback((elementId: string, newLabel: string) => {
    setNodes(prev => prev.map(n => 
      n.id === elementId ? { ...n, label: newLabel } : n
    ))
    setEdges(prev => prev.map(e => 
      e.id === elementId ? { ...e, label: newLabel } : e
    ))
  }, [])

  // 更新边类型
  const updateEdgeType = useCallback((edgeId: string, newType: 'shift' | 'reduce' | 'goto') => {
    setEdges(prev => prev.map(e => 
      e.id === edgeId ? { ...e, type: newType } : e
    ))
  }, [])

  // 初始化 Cytoscape
  useEffect(() => {
    if (!containerRef.current) return

    const cy = cytoscape({
      container: containerRef.current,
      ...lrCytoscapeOptions,
      elements: []
    })

    // 启用 edgehandles 扩展
    // @ts-expect-error - edgehandles 扩展类型
    cy.edgehandles({
      canConnect: (sourceNode: any, targetNode: any) => {
        return !sourceNode.same(targetNode)
      },
      edgeParams: () => {
        return {
          data: {
            label: 'symbol',
            type: 'shift' // 默认为移进边
          }
        }
      },
      hoverDelay: 150,
      snap: true,
      snapThreshold: 50,
      snapFrequency: 15,
      noEdgeEventsInDraw: true,
      disableBrowserGestures: true
    })

    // 事件监听
    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        // 点击空白处 - 添加新节点
        const pos = evt.position
        addNode(pos.x, pos.y)
        setSelectedElement(null)
      }
    })

    cy.on('tap', 'node', (evt) => {
      const node = evt.target
      setSelectedElement(node.id())
      evt.stopPropagation()
    })

    cy.on('tap', 'edge', (evt) => {
      const edge = evt.target
      setSelectedElement(edge.id())
      evt.stopPropagation()
    })

    // 右键菜单
    cy.on('cxttap', 'node', (evt) => {
      const node = evt.target
      const nodeData = node.data()
      
      // 切换起始状态
      if (evt.originalEvent.shiftKey) {
        toggleStartState(nodeData.id)
      } 
      // 切换接受状态
      else if (evt.originalEvent.ctrlKey || evt.originalEvent.metaKey) {
        toggleAcceptState(nodeData.id)
      }
      // 删除节点
      else {
        removeNode(nodeData.id)
      }
      evt.stopPropagation()
    })

    cy.on('cxttap', 'edge', (evt) => {
      const edge = evt.target
      removeEdge(edge.id())
      evt.stopPropagation()
    })

    // 当通过 edgehandles 创建新边时
    cy.on('ehcomplete', (event: any, sourceNode: any, targetNode: any, addedEle: any) => {
      const newEdge: LREdge = {
        id: addedEle.id(),
        source: sourceNode.id(),
        target: targetNode.id(),
        label: 'symbol',
        type: 'shift'
      }
      setEdges(prev => [...prev, newEdge])
    })

    cyRef.current = cy

    return () => {
      cy.destroy()
    }
  }, [addNode, removeNode, removeEdge, toggleStartState, toggleAcceptState])

  // 更新 Cytoscape 数据
  useEffect(() => {
    if (!cyRef.current) return

    const elements = [
      ...nodes.map(node => ({
        data: { 
          id: node.id, 
          label: node.label,
          type: node.type,
          isStart: node.isStart,
          isAccept: node.isAccept
        },
        position: node.position
      })),
      ...edges.map(edge => ({
        data: { 
          id: edge.id, 
          source: edge.source, 
          target: edge.target, 
          label: edge.label,
          type: edge.type
        }
      }))
    ]

    cyRef.current.elements().remove()
    cyRef.current.add(elements)
    cyRef.current.layout({ name: 'preset' }).run()
  }, [nodes, edges])

  return (
    <div className={`lr-canvas relative ${className}`}>
      <div 
        ref={containerRef} 
        className="w-full h-full bg-ctp-base"
        style={{ minHeight: '500px' }}
      />
      
      {/* 节点类型选择器 */}
      <div className="absolute top-4 left-4 bg-ctp-surface0 border border-ctp-surface2 rounded p-3">
        <h3 className="text-ctp-text font-bold mb-2">节点类型</h3>
        <div className="space-y-1">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="nodeType"
              value="state"
              checked={nodeType === 'state'}
              onChange={(e) => setNodeType(e.target.value as 'state' | 'item')}
              className="text-ctp-blue"
            />
            <span className="text-ctp-subtext1 text-sm">状态节点</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="nodeType"
              value="item"
              checked={nodeType === 'item'}
              onChange={(e) => setNodeType(e.target.value as 'state' | 'item')}
              className="text-ctp-blue"
            />
            <span className="text-ctp-subtext1 text-sm">项目节点</span>
          </label>
        </div>
      </div>
      
      {/* 属性编辑面板 */}
      {selectedElement && (
        <div className="absolute top-4 right-4 bg-ctp-surface0 border border-ctp-surface2 rounded p-3 min-w-48">
          <h3 className="text-ctp-text font-bold mb-2">属性编辑</h3>
          <div className="space-y-2">
            <div>
              <label className="text-ctp-subtext1 text-sm block mb-1">标签:</label>
              <input
                type="text"
                value={
                  nodes.find(n => n.id === selectedElement)?.label ||
                  edges.find(e => e.id === selectedElement)?.label ||
                  ''
                }
                onChange={(e) => updateLabel(selectedElement, e.target.value)}
                className="w-full px-2 py-1 bg-ctp-surface1 border border-ctp-surface2 rounded text-ctp-text text-sm"
              />
            </div>
            
            {/* 节点特有属性 */}
            {nodes.find(n => n.id === selectedElement) && (
              <>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isStart"
                    checked={nodes.find(n => n.id === selectedElement)?.isStart || false}
                    onChange={() => toggleStartState(selectedElement)}
                    className="rounded"
                  />
                  <label htmlFor="isStart" className="text-ctp-subtext1 text-sm">起始状态</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isAccept"
                    checked={nodes.find(n => n.id === selectedElement)?.isAccept || false}
                    onChange={() => toggleAcceptState(selectedElement)}
                    className="rounded"
                  />
                  <label htmlFor="isAccept" className="text-ctp-subtext1 text-sm">接受状态</label>
                </div>
              </>
            )}
            
            {/* 边特有属性 */}
            {edges.find(e => e.id === selectedElement) && (
              <div>
                <label className="text-ctp-subtext1 text-sm block mb-1">边类型:</label>
                <select
                  value={edges.find(e => e.id === selectedElement)?.type || 'shift'}
                  onChange={(e) => updateEdgeType(selectedElement, e.target.value as 'shift' | 'reduce' | 'goto')}
                  className="w-full px-2 py-1 bg-ctp-surface1 border border-ctp-surface2 rounded text-ctp-text text-sm"
                >
                  <option value="shift">移进 (Shift)</option>
                  <option value="reduce">归约 (Reduce)</option>
                  <option value="goto">转移 (Goto)</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 操作提示 */}
      <div className="absolute bottom-4 left-4 bg-ctp-surface0 border border-ctp-surface2 rounded p-3 text-ctp-subtext1 text-sm">
        <div>• 点击空白处添加节点</div>
        <div>• 拖拽节点边缘创建连线</div>
        <div>• 右键删除元素</div>
        <div>• Shift+右键切换起始状态</div>
        <div>• Ctrl/Cmd+右键切换接受状态</div>
      </div>
    </div>
  )
}
