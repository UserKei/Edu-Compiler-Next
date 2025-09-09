'use client'

import { useFAStore } from '../../stores/fa-store'

export default function FATest() {
  const { 
    inputRegex, 
    result, 
    isLoading, 
    error, 
    setInputRegex, 
    analyze, 
    reset 
  } = useFAStore()

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-black">📊 FA (有限自动机)</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            正则表达式:
          </label>
          <input
            type="text"
            value={inputRegex}
            onChange={(e) => setInputRegex(e.target.value)}
            placeholder="例如: a*b+"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={analyze}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '⏳ 分析中...' : '开始分析'}
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
            <h4 className="font-bold mb-2 text-black">分析结果:</h4>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-64">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
