import APITester from '../components/test/api-tester'
import FATest from '../components/test/fa-test'
import LL1Test from '../components/test/ll1-test'
import LR0Test from '../components/test/lr0-test'
import SLR1Test from '../components/test/slr1-test'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black mb-2">
            🚀 Neko - 数据连接测试平台
          </h1>
          <p className="text-black">
            Next.js + Zustand + SWR 数据流验证
          </p>
        </header>

        {/* API连接测试 */}
        <div className="mb-6">
          <APITester />
        </div>

        {/* 算法模块测试 - 网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FATest />
          <LL1Test />
          <LR0Test />
          <SLR1Test />
        </div>

        <footer className="mt-8 text-center text-black text-sm">
          <p>测试环境 | 验证四个算法模块的数据连接</p>
        </footer>
      </div>
    </div>
  )
}
