import { useEffect, useRef, useState } from 'react'
import { Bubble, type BubbleProps } from '@ant-design/x'
import { ChartType, Column, GPTVis, withChartCode, withDefaultChartCode } from '@antv/gpt-vis'

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

// const markdownContent = `
// ### 决策数量:
// <vis-text type="time_desc">本月</vis-text>共产生<vis-text type="metric_name">决策数量</vis-text><vis-text type="metric_value">2,783</vis-text>个，环比<vis-text type="trend_desc">增长</vis-text><vis-text type="ratio_value_pos">15.2%</vis-text>，同比<vis-text type="trend_desc">增长</vis-text><vis-text type="ratio_value_pos">23.5%</vis-text>。其中，<vis-text type="dim_value">营销部门</vis-text>贡献最多，占比<vis-text type="proportion">38.7%</vis-text>；其次是<vis-text type="dim_value">产品部门</vis-text>，占比<vis-text type="proportion">27.3%</vis-text>。<vis-text type="dim_name">高优先级决策</vis-text>占比<vis-text type="proportion">56.2%</vis-text>，较上月<vis-text type="trend_desc">上升</vis-text><vis-text type="delta_value_pos">3.8</vis-text>个百分点。<vis-text type="metric_name">决策数量</vis-text>呈现稳定<vis-text type="trend_desc" origin="[1, 2, 6, 18, 24, 48]">上升</vis-text>趋势，预计<vis-text type="time_desc">下月</vis-text>将突破<vis-text type="metric_value">3,000</vis-text>大关。

// ### 决策准确率:
// <vis-text type="time_desc">本月</vis-text>整体<vis-text type="metric_name">决策准确率</vis-text>为<vis-text type="metric_value">87.6%</vis-text>，环比<vis-text type="trend_desc">下降</vis-text><vis-text type="delta_value_neg">1.2</vis-text>个百分点，但仍高于年度目标<vis-text type="ratio_value_pos">2.6%</vis-text>。<vis-text type="dim_value">财务部门</vis-text>表现最佳，准确率达<vis-text type="metric_value">94.3%</vis-text>；<vis-text type="dim_value">人力资源部门</vis-text>表现欠佳，准确率为<vis-text type="metric_value">76.8%</vis-text>，建议加强培训。<vis-text type="metric_name">数据驱动型决策</vis-text>的准确率（<vis-text type="metric_value">91.2%</vis-text>）显著高于<vis-text type="metric_name">经验驱动型决策</vis-text>（<vis-text type="metric_value">82.4%</vis-text>），凸显了数据分析的重要性。

// ### 决策执行率:
// <vis-text type="time_desc">本月</vis-text><vis-text type="metric_name">决策执行率</vis-text>为<vis-text type="metric_value">82.3%</vis-text>，环比<vis-text type="trend_desc">提升</vis-text><vis-text type="delta_value_pos">5.7</vis-text>个百分点，创下近6个月新高。其中，<vis-text type="dim_name">高优先级决策</vis-text>执行率达<vis-text type="metric_value">95.6%</vis-text>，<vis-text type="dim_name">低优先级决策</vis-text>执行率仅为<vis-text type="metric_value">68.7%</vis-text>。<vis-text type="dim_value">技术部门</vis-text>的执行率最高，达<vis-text type="metric_value">91.2%</vis-text>；<vis-text type="dim_value">市场部门</vis-text>最低，为<vis-text type="metric_value">74.5%</vis-text>。建议关注<vis-text type="dim_value">市场部门</vis-text>的决策执行障碍，提供必要支持。

// ### 决策收益:
// <vis-text type="time_desc">本月</vis-text><vis-text type="metric_name">决策收益</vis-text>带来的总收益为<vis-text type="metric_value">1,275</vis-text>万元，同比增长<vis-text type="ratio_value_pos">31.8%</vis-text>，超出预期<vis-text type="ratio_value_pos">18.6%</vis-text>。<vis-text type="dim_name">产品决策</vis-text>贡献最大，占总收益的<vis-text type="proportion">42.3%</vis-text>；其次是<vis-text type="dim_name">营销决策</vis-text>，占<vis-text type="proportion">27.6%</vis-text>。<vis-text type="dim_name">高风险决策</vis-text>的平均收益（<vis-text type="metric_value">87.3</vis-text>万元/个）显著高于<vis-text type="dim_name">低风险决策</vis-text>（<vis-text type="metric_value">23.1</vis-text>万元/个）。建议在风险可控的前提下，适当增加<vis-text type="dim_name">高收益潜力</vis-text>的决策比例。

// ### 数据质量:
// <vis-text type="time_desc">本月</vis-text><vis-text type="metric_name">数据质量</vis-text>评分为<vis-text type="metric_value">88.5</vis-text>分（满分100分），环比提升<vis-text type="trend_desc">提升</vis-text><vis-text type="delta_value_pos">2.3</vis-text>分。<vis-text type="metric_name">数据完整性</vis-text>（<vis-text type="metric_value">93.2</vis-text>分）和<vis-text type="metric_name">及时性</vis-text>（<vis-text type="metric_value">91.7</vis-text>分）表现优异，而<vis-text type="metric_name">准确性</vis-text>（<vis-text type="metric_value">84.6</vis-text>分）和<vis-text type="metric_name">一致性</vis-text>（<vis-text type="metric_value">82.5</vis-text>分）仍有提升空间。<vis-text type="dim_value">财务数据</vis-text>质量最高，达<vis-text type="metric_value">95.3</vis-text>分；<vis-text type="dim_value">用户行为数据</vis-text>质量最低，为<vis-text type="metric_value">81.2</vis-text>分。建议优化<vis-text type="dim_value">用户行为数据</vis-text>采集流程，提高<vis-text type="metric_name">数据准确性</vis-text>和<vis-text type="metric_name">一致性</vis-text>。

// `

const bgStyle = {
  display: 'grid',
  gridGap: '20px 0',
  background: '#f7f7f7',
  padding: 20,
  borderRadius: 8
}

// 自定义代码块渲染组件，NOTE: withChartCode 不要直接放入函数内部，避免重复渲染抖动问题！！！
const CodeComponent = withDefaultChartCode({
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
