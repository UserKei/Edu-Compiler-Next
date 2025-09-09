'use client'

import { useCommonStore } from '../../stores/common-store'

export default function ApiTester() {
  const { loading, error, apiConnected, testConnection } = useCommonStore()

  return (
    <div className="p-4 border border-ctp-surface0 rounded-lg shadow-sm bg-ctp-surface0">
      <h3 className="text-lg font-bold mb-4 text-ctp-text">🔗 API连接测试</h3>
      
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-ctp-blue text-ctp-base rounded hover:bg-ctp-sapphire disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '测试中...' : '测试连接'}
      </button>

      <div className="mt-4">
        <p className="flex items-center text-ctp-text">
          <span>连接状态:</span>
          <span className={`ml-2 font-semibold ${
            apiConnected === null ? 'text-ctp-subtext1' :
            apiConnected ? 'text-ctp-green' : 'text-ctp-red'
          }`}>
            {apiConnected === null ? '未测试' : 
             apiConnected ? '✅ 已连接' : '❌ 连接失败'}
          </span>
        </p>
        
        {error && (
          <p className="text-ctp-red mt-2 p-2 bg-ctp-surface1 rounded">
            错误: {error}
          </p>
        )}
      </div>
    </div>
  )
}
