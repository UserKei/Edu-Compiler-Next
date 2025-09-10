import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-ctp-base flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-ctp-text mb-4">
            🌸 Yuki
          </h1>
          <p className="text-xl text-ctp-subtext1 mb-2">
            编译原理算法演示平台
          </p>
          <p className="text-ctp-subtext0">
            Compiler Theory Algorithm Demonstration Platform
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-ctp-surface0 rounded-lg p-6 border border-ctp-surface1">
            <h3 className="text-lg font-semibold text-ctp-text mb-3">
              📚 算法模块
            </h3>
            <ul className="text-left text-ctp-subtext1 space-y-2">
              <li>• LL1 语法分析</li>
              <li>• LR0 语法分析</li>
              <li>• SLR1 语法分析</li>
              <li>• 有穷自动机</li>
            </ul>
          </div>

          <div className="bg-ctp-surface0 rounded-lg p-6 border border-ctp-surface1">
            <h3 className="text-lg font-semibold text-ctp-text mb-3">
              🛠️ 技术栈
            </h3>
            <ul className="text-left text-ctp-subtext1 space-y-2">
              <li>• Next.js 15</li>
              <li>• TypeScript</li>
              <li>• Zustand</li>
              <li>• SWR</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/test" 
            className="inline-block bg-ctp-blue text-ctp-base px-8 py-3 rounded-lg font-medium hover:bg-ctp-sky transition-colors"
          >
            🧪 进入测试平台
          </Link>
          
          <p className="text-ctp-subtext0 text-sm">
            开始体验编译原理算法的交互式演示
          </p>
        </div>
      </div>
    </div>
  )
}
