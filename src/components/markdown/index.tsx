import Markdown from 'react-markdown'
import markdownProps from './config'

interface IProps {
  content: string
}
const MarkdownComponent = ({ content }: IProps) => {
  return (
    <Markdown
      {...markdownProps}
      children={content}
    />
  )
}

export default MarkdownComponent
