'use client'

import { FACanvas } from './canvas/FACanvas'

export default function FAPage() {
  return (
    <div className="min-h-screen bg-ctp-base">
      <div className="container mx-auto p-6">
        {/* 页面头部 */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-ctp-text mb-2">
            🔄 有限自动机画布
          </h1>
          <p className="text-ctp-subtext1">
            使用Milanote风格节点绘制有限自动机状态图
          </p>
        </header>

        {/* 画布容器 */}
        <div className="bg-ctp-surface0 rounded-lg border border-ctp-surface1 overflow-hidden">
          <FACanvas />
        </div>
      </div>
    </div>
  )
}
