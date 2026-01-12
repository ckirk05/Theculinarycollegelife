'use client'

import { useState } from 'react'

interface IngredientsInputProps {
  value: string[]
  onChange: (ingredients: string[]) => void
}

export default function IngredientsInput({ value, onChange }: IngredientsInputProps) {
  const [input, setInput] = useState('')

  const addIngredient = () => {
    const trimmed = input.trim()
    if (trimmed) {
      onChange([...value, trimmed])
      setInput('')
    }
  }

  const removeIngredient = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const updateIngredient = (index: number, newValue: string) => {
    const updated = [...value]
    updated[index] = newValue
    onChange(updated)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addIngredient()
    }
  }

  const moveUp = (index: number) => {
    if (index > 0) {
      const updated = [...value]
      const temp = updated[index]
      updated[index] = updated[index - 1]
      updated[index - 1] = temp
      onChange(updated)
    }
  }

  const moveDown = (index: number) => {
    if (index < value.length - 1) {
      const updated = [...value]
      const temp = updated[index]
      updated[index] = updated[index + 1]
      updated[index + 1] = temp
      onChange(updated)
    }
  }

  return (
    <div className="space-y-3">
      {/* Input for new ingredient */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., 2 cups all-purpose flour"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-butter-400 focus:ring-2 focus:ring-butter-400/20 outline-none"
        />
        <button
          type="button"
          onClick={addIngredient}
          className="px-4 py-2 bg-butter-400 text-gray-900 font-medium rounded-lg hover:bg-butter-500 transition-colors"
        >
          Add
        </button>
      </div>

      {/* List of ingredients */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg group"
            >
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index === value.length - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <span className="text-gray-600 text-sm w-6">{index + 1}.</span>

              <input
                type="text"
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                className="flex-1 px-3 py-1 bg-white border border-gray-200 rounded outline-none focus:border-butter-400"
              />

              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
          No ingredients added yet. Type an ingredient above and click Add.
        </p>
      )}
    </div>
  )
}
