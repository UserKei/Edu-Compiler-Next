'use client'

export default function LL1Page() {
  return (
    <div className="min-h-screen bg-ctp-base">
      <div className="container mx-auto p-6">
        {/* 页面头部 */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-ctp-text mb-2">
            📊 LL(1) 语法分析器
          </h1>
          <p className="text-ctp-subtext1">
            自顶向下的预测分析算法演示
          </p>
        </header>

        {/* 暂时显示占位内容 */}
        <div className="bg-ctp-surface0 rounded-lg border border-ctp-surface1 p-8 text-center">
          <h2 className="text-xl font-semibold text-ctp-text mb-4">
            LL1 分析器正在开发中...
          </h2>
          <p className="text-ctp-subtext1">
            这里将展示LL(1)语法分析的交互式演示和动画效果
          </p>
        </div>
      </div>
    </div>
  )
}
