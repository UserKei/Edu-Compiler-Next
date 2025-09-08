'use client'

import { useCommonStore } from '../../stores/common-store'

export default function ApiTester() {
  const { loading, error, apiConnected, testConnection } = useCommonStore()

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold mb-4">🔗 API连接测试</h3>
      
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '测试中...' : '测试连接'}
      </button>

      <div className="mt-4">
        <p className="flex items-center">
          <span>连接状态:</span>
          <span className={`ml-2 font-semibold ${
            apiConnected === null ? 'text-gray-500' :
            apiConnected ? 'text-green-500' : 'text-red-500'
          }`}>
            {apiConnected === null ? '未测试' : 
             apiConnected ? '✅ 已连接' : '❌ 连接失败'}
          </span>
        </p>
        
        {error && (
          <p className="text-red-500 mt-2 p-2 bg-red-50 rounded">
            错误: {error}
          </p>
        )}
      </div>
    </div>
  )
}
