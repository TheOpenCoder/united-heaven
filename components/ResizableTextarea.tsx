import React, { useEffect, useRef } from 'react'

interface ResizableTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
  onChange: (_event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const ResizableTextarea: React.FC<ResizableTextareaProps> = ({ value, onChange, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event)
    }
  }

  return <textarea ref={textareaRef} value={value} onChange={handleChange} {...rest} />
}

export default ResizableTextarea
