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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
            <Link 
              href="/fa" 
              className="inline-block bg-ctp-blue text-ctp-base px-6 py-3 rounded-lg font-medium hover:bg-ctp-sky transition-colors text-center"
            >
              🔄 FA画布
            </Link>
            
            <Link 
              href="/ll1" 
              className="inline-block bg-ctp-green text-ctp-base px-6 py-3 rounded-lg font-medium hover:bg-ctp-teal transition-colors text-center"
            >
              📊 LL(1)
            </Link>

            <Link 
              href="/lr0" 
              className="inline-block bg-ctp-yellow text-ctp-base px-6 py-3 rounded-lg font-medium hover:bg-ctp-peach transition-colors text-center"
            >
              📈 LR(0)画布
            </Link>
            
            <Link 
              href="/slr1" 
              className="inline-block bg-ctp-mauve text-ctp-base px-6 py-3 rounded-lg font-medium hover:bg-ctp-purple transition-colors text-center"
            >
              🎯 SLR(1)画布
            </Link>
          </div>

          <div className="text-center mt-4">
            <Link 
              href="/test" 
              className="inline-block bg-ctp-surface1 text-ctp-text px-8 py-3 rounded-lg font-medium hover:bg-ctp-surface2 transition-colors"
            >
              🧪 测试平台
            </Link>
          </div>
          
          <p className="text-ctp-subtext0 text-sm text-center">
            体验编译原理算法的交互式演示和可视化绘图
          </p>
        </div>
      </div>
    </div>
  )
}
