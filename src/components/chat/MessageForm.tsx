'use client'
import React, { SyntheticEvent } from 'react'
import SendIcon from '@mui/icons-material/Send'

interface MessageFormProps {
  value: string
  setValue: (newValue: string) => void
  onSubmit: (e: SyntheticEvent) => void
  isConversationSelected: boolean
}

const MessageForm = ({ value, setValue, onSubmit, isConversationSelected }: MessageFormProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e)
    }
  }

  return (
    <div className="w-full">
      <form className="containerWrap flex justify-end flex-grow">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input h-16 mr-4 flex-grow text-black focus:outline-none bg-gray-100 rounded-r-none"
          style={{ whiteSpace: 'pre-wrap' }}
        />
        <button
          type="submit"
          onClick={onSubmit}
          className={`w-auto btn text-white rounded-r-lg text-sm ${isConversationSelected ? 'btn-primary' : 'bg-gray-500 cursor-not-allowed'}`}
          disabled={!isConversationSelected}
        >
          <SendIcon />
        </button>
      </form>
    </div>
  )
}

export default MessageForm
