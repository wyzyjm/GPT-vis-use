import { GPTVis, withDefaultChartCode, VisText } from '@antv/gpt-vis'

const markdownContent = `
\`\`\`my-ui
my data
\`\`\`
\`\`\`my-ui2
my data2
\`\`\`
<vis-text type="time_desc">本月</vis-text>共产生<vis-text type="metric_name">决策数量</vis-text><vis-text type="metric_value">2,783</vis-text>个，环比<vis-text type="trend_desc">增长</vis-text><vis-text type="ratio_value_pos">15.2%</vis-text>。<vis-text type="dim_name">高优先级决策</vis-text>占比<vis-text type="proportion">56.2%</vis-text>，呈现稳定<vis-text type="trend_desc" origin="[1, 2, 6, 18, 24, 48]">上升</vis-text>趋势，预计<vis-text type="time_desc">下月</vis-text>将突破<vis-text type="metric_value">3,000</vis-text>大关。
`

const customRenderers = {
  'my-ui': ({ children }: { children?: React.ReactNode }) => (
    <div
      style={{
        background: 'lightblue'
      }}
    >
      {children}
    </div>
  ),
  'my-ui2': ({ children }: { children?: React.ReactNode }) => <div>my-ui2 {children}</div>
}
const components = {
  'vis-text': VisText,
  code: withDefaultChartCode({ languageRenderers: customRenderers })
}
const GptVisExtend = () => {
  return <GPTVis components={components}>{markdownContent}</GPTVis>
}

export default GptVisExtend
