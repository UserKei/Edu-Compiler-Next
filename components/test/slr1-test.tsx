'use client'

import { useState } from 'react'
import { useSLR1Store } from '../../stores/slr1-store'

export default function SLR1Test() {
  const { 
    inputProductions, 
    inputString,
    result, 
    inputStringResult,
    isLoading, 
    error, 
    addProduction,
    removeProduction,
    setInputString,
    analyze,
    analyzeInputString, 
    reset 
  } = useSLR1Store()

  const [newProduction, setNewProduction] = useState('')

  const handleAddProduction = () => {
    if (newProduction.trim()) {
      addProduction(newProduction.trim())
      setNewProduction('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddProduction()
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-black">⚡ SLR1 (SLR1语法分析)</h3>
      
      <div className="space-y-4">
        {/* 产生式输入 */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            产生式:
          </label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newProduction}
              onChange={(e) => setNewProduction(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="例如: S->E"
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              onClick={handleAddProduction}
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              添加
            </button>
          </div>
          
          {/* 已添加的产生式列表 */}
          {inputProductions.length > 0 && (
            <div className="border rounded p-2 bg-gray-50 max-h-32 overflow-y-auto">
              {inputProductions.map((production, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span className="text-sm font-mono text-black">{production}</span>
                  <button
                    onClick={() => removeProduction(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 输入串 */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            输入串 (可选):
          </label>
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            placeholder="例如: id+id*id"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={analyze}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '⏳ 分析中...' : '语法分析'}
          </button>
          
          <button
            onClick={analyzeInputString}
            disabled={isLoading || !inputString.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '⏳ 分析中...' : '分析输入串'}
          </button>
          
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置
          </button>
        </div>

        {/* 状态显示 */}
        <div className="flex items-center space-x-2 text-black">
          <span>状态:</span>
          {isLoading && <span className="text-yellow-500">⏳ 分析中</span>}
          {error && <span className="text-red-500">❌ 错误</span>}
          {result && !isLoading && !error && <span className="text-green-500">✅ 成功</span>}
          {!isLoading && !error && !result && <span className="text-black">待分析</span>}
        </div>

        {error && (
          <div className="text-red-500 p-2 bg-red-50 rounded">
            错误: {error}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h4 className="font-bold mb-2 text-black">语法分析结果:</h4>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-64 text-black">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {inputStringResult && (
          <div className="mt-4">
            <h4 className="font-bold mb-2 text-black">输入串分析结果:</h4>
            <pre className="bg-blue-50 p-4 rounded overflow-auto text-sm max-h-64 text-black">
              {JSON.stringify(inputStringResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
