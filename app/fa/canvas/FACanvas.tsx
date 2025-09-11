'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import cytoscape from 'cytoscape'
// @ts-expect-error - 没有类型定义
import edgehandles from 'cytoscape-edgehandles'
import { faCytoscapeOptions } from './faConfig'

// 注册扩展
cytoscape.use(edgehandles)

interface FACanvasProps {
  className?: string
}

interface FANode {
  id: string
  label: string
  isInitial?: boolean
  isFinal?: boolean
  position: { x: number; y: number }
}

interface FAEdge {
  id: string
  source: string
  target: string
  label: string
}

export function FACanvas({ className = '' }: FACanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cyRef = useRef<cytoscape.Core | null>(null)
  const [nodes, setNodes] = useState<FANode[]>([])
  const [edges, setEdges] = useState<FAEdge[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)

  // 添加节点
  const addNode = useCallback((x: number, y: number) => {
    const newNode: FANode = {
      id: `node_${Date.now()}`,
      label: `q${nodes.length}`,
      isInitial: nodes.length === 0, // 第一个节点默认为初始状态
      isFinal: false,
      position: { x, y }
    }
    setNodes(prev => [...prev, newNode])
  }, [nodes.length])

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

  // 切换初始状态
  const toggleInitialState = useCallback((nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, isInitial: !node.isInitial }
        : node
    ))
  }, [])

  // 切换终止状态
  const toggleFinalState = useCallback((nodeId: string) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, isFinal: !node.isFinal }
        : node
    ))
  }, [])

  // 更新标签
  const updateLabel = useCallback((elementId: string, newLabel: string) => {
    // 检查是节点还是边
    setNodes(prev => prev.map(n => 
      n.id === elementId ? { ...n, label: newLabel } : n
    ))
    setEdges(prev => prev.map(e => 
      e.id === elementId ? { ...e, label: newLabel } : e
    ))
  }, [])

  // 初始化 Cytoscape
  useEffect(() => {
    if (!containerRef.current) return

    const cy = cytoscape({
      container: containerRef.current,
      ...faCytoscapeOptions,
      elements: []
    })

    // 启用 edgehandles 扩展
    // @ts-expect-error - edgehandles 扩展类型
    cy.edgehandles({
      canConnect: (sourceNode: any, targetNode: any) => {
        return !sourceNode.same(targetNode) // 防止自环，如果需要可以移除这个限制
      },
      edgeParams: () => {
        return {
          data: {
            label: 'ε' // 默认标签
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

    // 右键菜单（简单实现）
    cy.on('cxttap', 'node', (evt) => {
      const node = evt.target
      const nodeData = node.data()
      
      // 切换初始状态
      if (evt.originalEvent.shiftKey) {
        toggleInitialState(nodeData.id)
      } 
      // 切换终止状态
      else if (evt.originalEvent.ctrlKey || evt.originalEvent.metaKey) {
        toggleFinalState(nodeData.id)
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
      const newEdge: FAEdge = {
        id: addedEle.id(),
        source: sourceNode.id(),
        target: targetNode.id(),
        label: 'ε'
      }
      setEdges(prev => [...prev, newEdge])
    })

    cyRef.current = cy

    return () => {
      cy.destroy()
    }
  }, [addNode, removeNode, removeEdge, toggleInitialState, toggleFinalState])

  // 更新 Cytoscape 数据
  useEffect(() => {
    if (!cyRef.current) return

    const elements = [
      ...nodes.map(node => ({
        data: { 
          id: node.id, 
          label: node.label,
          isInitial: node.isInitial,
          isFinal: node.isFinal
        },
        position: node.position
      })),
      ...edges.map(edge => ({
        data: { 
          id: edge.id, 
          source: edge.source, 
          target: edge.target, 
          label: edge.label 
        }
      }))
    ]

    cyRef.current.elements().remove()
    cyRef.current.add(elements)
    cyRef.current.layout({ name: 'preset' }).run()
  }, [nodes, edges])

  return (
    <div className={`fa-canvas relative ${className}`}>
      <div 
        ref={containerRef} 
        className="w-full h-full bg-ctp-base"
        style={{ minHeight: '500px' }}
      />
      
      {/* 简单的属性编辑面板 */}
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
                    id="isInitial"
                    checked={nodes.find(n => n.id === selectedElement)?.isInitial || false}
                    onChange={() => toggleInitialState(selectedElement)}
                    className="rounded"
                  />
                  <label htmlFor="isInitial" className="text-ctp-subtext1 text-sm">初始状态</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFinal"
                    checked={nodes.find(n => n.id === selectedElement)?.isFinal || false}
                    onChange={() => toggleFinalState(selectedElement)}
                    className="rounded"
                  />
                  <label htmlFor="isFinal" className="text-ctp-subtext1 text-sm">终止状态</label>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* 操作提示 */}
      <div className="absolute bottom-4 left-4 bg-ctp-surface0 border border-ctp-surface2 rounded p-3 text-ctp-subtext1 text-sm">
        <div>• 点击空白处添加节点</div>
        <div>• 拖拽节点边缘创建连线</div>
        <div>• 右键删除元素</div>
        <div>• Shift+右键切换初始状态</div>
        <div>• Ctrl/Cmd+右键切换终止状态</div>
      </div>
    </div>
  )
}
