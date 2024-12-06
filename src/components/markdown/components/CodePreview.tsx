import type { CSSProperties } from 'react'
import { CopyOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import copy from 'copy-to-clipboard'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
  code: string
  language: string
  customStyle?: CSSProperties
}
const CodePreview = ({ code, language, customStyle }: Props) => {
  const handleCopy = () => {
    const success = copy(code)
    message[success ? 'success' : 'error'](success ? '复制成功' : '复制失败')
  }
  return (
    <div className='relative'>
      <Button
        className='absolute right-3 top-2 text-gray-300 hover:!text-gray-200 bg-gray-700'
        type='text'
        icon={<CopyOutlined />}
        onClick={() => handleCopy()}
      />
      <SyntaxHighlighter
        style={coldarkDark}
        customStyle={customStyle}
        language={language}
        PreTag='div'
        children={code}
      />
    </div>
  )
}

export default CodePreview
