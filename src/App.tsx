// import Gpt from '@/components/antv/Gpt-vis'
// import GptVisExtend from '@/components/antv/Gpt-vis-extend'
// import GptVisCode from '@/components/antv/Gpt-vis-code'
// import GptVisStream from '@/components/antv/Gpt-vis-stream'
// import Upload from '@/components/antd/upload'

import Markdown from '@/components/markdown'
import { markdownContent } from '@/mock/markdown'
function App() {
  return (
    <div>
      {/* 默认 */}
      {/* <Gpt /> */}

      {/* 扩展 */}
      {/* <GptVisExtend /> */}

      {/* 自定义 代码code */}
      {/* <GptVisCode /> */}

      {/* 流式输出 */}
      {/* <GptVisStream /> */}

      {/* <Upload /> */}

      <Markdown content={markdownContent} />
    </div>
  )
}

export default App
