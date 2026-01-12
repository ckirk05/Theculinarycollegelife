'use client'

import { useState, useRef } from 'react'

interface MarkdownEditorProps {
  value: string
  onChange: (content: string) => void
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setError('')

    // Validate file type
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
      setError('Please select a markdown file (.md or .markdown)')
      return
    }

    // Validate file size (1MB)
    if (file.size > 1024 * 1024) {
      setError('File must be smaller than 1MB')
      return
    }

    try {
      const text = await file.text()
      onChange(text)
    } catch (err) {
      setError('Failed to read file. Please try again.')
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Markdown textarea */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          placeholder="Write your content in markdown format, or drag and drop a .md file here..."
          rows={15}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-butter-400 focus:ring-2 focus:ring-butter-400/20 outline-none font-mono text-sm resize-y"
        />

        {/* Upload button overlay */}
        <button
          type="button"
          onClick={handleClick}
          className="absolute top-3 right-3 px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          📄 Upload .md file
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex items-start gap-2 text-xs text-gray-600">
        <div className="flex-1">
          <p className="font-medium mb-1">Markdown formatting tips:</p>
          <ul className="space-y-0.5 list-disc list-inside">
            <li># Heading 1, ## Heading 2, ### Heading 3</li>
            <li>**bold**, *italic*, [link](url)</li>
            <li>- Bullet list or 1. Numbered list</li>
            <li>&gt; Blockquote</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
