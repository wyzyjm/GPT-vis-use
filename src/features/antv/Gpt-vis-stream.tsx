import { Bubble, type BubbleProps } from '@ant-design/x'
import { ChartType, Column, GPTVis, withChartCode } from '@antv/gpt-vis'
import React, { useEffect, useRef, useState } from 'react'

// ### 引用
// 引用一段文字，引用一段代码，引用一段链接。

// > 这是一段引用。

// 引用一段代码：

// \`\`\`python
// def add(a, b):
//   return a + b
// \`\`\`

// 引用一段链接：

// [百度](https://www.baidu.com)

// ### 列表
// 有序列表：
//  1. 第一产业
//  2. 第二产业
//  3. 第三产业
//  4. 第四产业

// 无序列表：
//  - 第一产业
//  - 第二产业

// ## 基本信息
// ### 三级标题
// #### 四级标题
// ##### 五级标题
// ###### 六级标题
// { type: 'sql', content:{}}

// markdown : 基础语法
// # H1
// ##  H2
// ###  H3

// > 这是一段引用。

// 引用一段代码：

// \`\`\`python
// def add(a, b):
//   return a + b
// \`\`\`

// 引用一段链接：

const markdownContent = `
当然了，以下是为你绘制的一个柱状图
<hr/>

## 问题理解
用户要求查询品牌级次表中的所有信息。

## 画了个柱状图



\`\`\`vis-chart
{
  "type": "column",
  "data": [
    { "category": "第一产业", "value": 7200.0 },
    { "category": "第二产业", "value": 36600.0 },
    { "category": "第三产业" ,"value": 41000.0 },
    { "category": "第四产业" ,"value": 41500.0 }
  ]
}
\`\`\`

\`\`\`my-ui
 自定义渲染组件
\`\`\`

## 分析结论
查询结果包含以下信息：大区名称、末级品类、品牌id、品牌级次、品牌名称、品牌档位、城市级次、细分品类、业态和主品类。共有10个字段，50条记录。大区名称主要集中在东区和北区，品牌级次主要为C、B、S、A，品牌档位主要为C1、C3、C4、B1、B4、A4，城市级次主要为1/2线和3线及以下，业态主要为服装服饰、生活精品、餐饮美食、体验业态、儿童业态。
`

// {type:sql | brand | } content: 对应组件
const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8
}

// 自定义代码块渲染组件，NOTE: withChartCode 不要直接放入函数内部，避免重复渲染抖动问题！！！
const CodeComponent = withChartCode({
  components: { [ChartType.Column]: Column },
  loadingTimeout: 3000
})

const RenderMarkdown: BubbleProps['messageRender'] = (content) => (
  <GPTVis components={{ code: CodeComponent }}>{content}</GPTVis>
)

const useStreamText = () => {
  const [text, setText] = useState('')
  const nowTextRef = useRef('')
  const timerRef = useRef<any>(null)

  /** 模拟流式输出markdownContent */
  const streamOutput = () => {
    timerRef.current = setInterval(() => {
      const step = parseInt((Math.random() * 10).toString(), 10)
      const nowText =
        nowTextRef.current + markdownContent.substring(nowTextRef.current.length, nowTextRef.current.length + step)
      nowTextRef.current = nowText
      setText(nowText)
      if (text.length === markdownContent.length - 1) {
        clearTimeout(timerRef.current)
      }
    }, 200)
  }

  const restart = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    nowTextRef.current = ''
    setText('')
    streamOutput()
  }

  return [text, restart] as const
}

const GptVisStream = () => {
  const [text, restart] = useStreamText()

  useEffect(() => {
    restart()
  }, [])

  return (
    <div style={bgStyle}>
      <button
        onClick={restart}
        type='button'
      >
        重新演示
      </button>

      <Bubble
        placement='end'
        content='帮我可视化一下我的数据'
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*2Q5LRJ3LFPUAAAAAAAAAAAAADmJ7AQ/fmt.webp'
        }}
        styles={{ content: { background: '#ebebeb' } }}
      />
      <Bubble
        content={text}
        messageRender={RenderMarkdown}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original'
        }}
        variant='shadow'
        styles={{ content: { width: 500 } }}
      />
      {/* <Bubble
        content={'生成超时的演示\n' + text.substring(0, text.length - 10)}
        messageRender={RenderMarkdown}
        avatar={{
          src: 'https://mdn.alipayobjects.com/huamei_je4oko/afts/img/A*6LRBT7rjOkQAAAAAAAAAAAAADsZ-AQ/original'
        }}
        variant='shadow'
        styles={{ content: { background: '#fff' } }}
      /> */}
    </div>
  )
}

export default GptVisStream
