// TYPE
import type { Components as MarkdownComponents, Options } from 'react-markdown'
import { withDefaultChartCode } from '@antv/gpt-vis'
import 'katex/dist/katex.min.css'
import RemarkMath from 'remark-math'
import RemarkBreaks from 'remark-breaks'
import RehypeKatex from 'rehype-katex'
import RemarkGfm from 'remark-gfm'
import RehypeRaw from 'rehype-raw'
import CodePreview from './components/CodePreview'

const CodeBlock = withDefaultChartCode({
  // 代码块扩展
  languageRenderers: {},
  // 默认代码块渲染
  defaultRenderer({ className, children, style, ...props }) {
    const content = String(children)
    const lang = className?.replace('language-', '') || ''
    return (
      <>
        {lang ? (
          <CodePreview
            code={content}
            language={lang || 'javascript'}
          />
        ) : (
          <code
            {...props}
            style={style}
            className='p-1 mx-1 rounded bg-theme-light dark:bg-theme-dark text-sm'
          >
            {children}
          </code>
        )}
      </>
    )
  }
})

// 按需引入 图表
// const CodeBlock = withChartCode({
//   components: { [ChartType.Line]: Line }
// })

const MarkdownConfig: Options = {
  // 组件
  components: {
    code: CodeBlock,
    p: (props) => (
      <p
        className='text-sm'
        {...props}
      />
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'my-component': (props: any) => {
      return <div>{props.children}</div>
    }
  } as MarkdownComponents,
  remarkPlugins: [RemarkGfm, [RemarkMath, { singleDollarTextMath: false }], RemarkBreaks],
  rehypePlugins: [RehypeKatex, RehypeRaw],
  disallowedElements: ['script', 'iframe', 'head', 'html', 'meta', 'link', 'style', 'body']
}

export default MarkdownConfig
