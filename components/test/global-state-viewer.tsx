'use client'

import { useCommonStore } from '../../stores/common-store'
import { useFAStore } from '../../stores/fa-store'
import { useLL1Store } from '../../stores/ll1-store'
import { useLR0Store } from '../../stores/lr0-store'
import { useSLR1Store } from '../../stores/slr1-store'

export default function GlobalStateViewer() {
  const commonStore = useCommonStore()
  const faStore = useFAStore()
  const ll1Store = useLL1Store()
  const lr0Store = useLR0Store()
  const slr1Store = useSLR1Store()

  const storeData = {
    common: {
      apiConnected: commonStore.apiConnected,
      loading: commonStore.loading,
      error: commonStore.error
    },
    fa: {
      inputRegex: faStore.inputRegex,
      hasResult: !!faStore.result,
      isLoading: faStore.isLoading,
      error: faStore.error
    },
    ll1: {
      productionsCount: ll1Store.inputProductions.length,
      hasResult: !!ll1Store.result,
      isLoading: ll1Store.isLoading,
      error: ll1Store.error
    },
    lr0: {
      productionsCount: lr0Store.inputProductions.length,
      hasResult: !!lr0Store.result,
      isLoading: lr0Store.isLoading,
      error: lr0Store.error
    },
    slr1: {
      productionsCount: slr1Store.inputProductions.length,
      hasResult: !!slr1Store.result,
      isLoading: slr1Store.isLoading,
      error: slr1Store.error
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
      <h3 className="text-lg font-bold mb-4 text-black">🔍 全局状态监控</h3>
      
      <div className="space-y-4">
        {/* Common Store */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-blue-600 mb-2">Common Store</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-black">
            <span>API连接:</span>
            <span className={
              storeData.common.apiConnected === true ? 'text-green-500' : 
              storeData.common.apiConnected === false ? 'text-red-500' : 'text-black'
            }>
              {storeData.common.apiConnected === true ? '✅ 已连接' : 
               storeData.common.apiConnected === false ? '❌ 连接失败' : '⚪ 未测试'}
            </span>
            <span>加载状态:</span>
            <span className={storeData.common.loading ? 'text-yellow-500' : 'text-black'}>
              {storeData.common.loading ? '⏳ 加载中' : '⚪ 空闲'}
            </span>
          </div>
          {storeData.common.error && (
            <div className="mt-2 text-xs text-red-500 bg-red-50 p-1 rounded">
              {storeData.common.error}
            </div>
          )}
        </div>

        {/* FA Store */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-purple-600 mb-2">FA Store</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-black">
            <span>输入正则:</span>
            <span className="font-mono text-xs">
              {storeData.fa.inputRegex || '空'}
            </span>
            <span>状态:</span>
            <span className={getStatusColor(storeData.fa)}>
              {getStatusText(storeData.fa)}
            </span>
          </div>
        </div>

        {/* LL1 Store */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-green-600 mb-2">LL1 Store</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-black">
            <span>产生式数量:</span>
            <span>{storeData.ll1.productionsCount}</span>
            <span>状态:</span>
            <span className={getStatusColor(storeData.ll1)}>
              {getStatusText(storeData.ll1)}
            </span>
          </div>
        </div>

        {/* LR0 Store */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-orange-600 mb-2">LR0 Store</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-black">
            <span>产生式数量:</span>
            <span>{storeData.lr0.productionsCount}</span>
            <span>状态:</span>
            <span className={getStatusColor(storeData.lr0)}>
              {getStatusText(storeData.lr0)}
            </span>
          </div>
        </div>

        {/* SLR1 Store */}
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold text-red-600 mb-2">SLR1 Store</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-black">
            <span>产生式数量:</span>
            <span>{storeData.slr1.productionsCount}</span>
            <span>状态:</span>
            <span className={getStatusColor(storeData.slr1)}>
              {getStatusText(storeData.slr1)}
            </span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => {
              faStore.reset()
              ll1Store.reset()
              lr0Store.reset()
              slr1Store.reset()
            }}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            重置所有
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            刷新页面
          </button>
        </div>
      </div>
    </div>
  )
}

function getStatusColor(store: { isLoading: boolean; error: string | null; hasResult: boolean }) {
  if (store.isLoading) return 'text-yellow-500'
  if (store.error) return 'text-red-500'
  if (store.hasResult) return 'text-green-500'
  return 'text-black'
}

function getStatusText(store: { isLoading: boolean; error: string | null; hasResult: boolean }) {
  if (store.isLoading) return '⏳ 加载中'
  if (store.error) return '❌ 错误'
  if (store.hasResult) return '✅ 有结果'
  return '⚪ 待执行'
}
