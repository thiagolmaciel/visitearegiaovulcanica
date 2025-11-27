import { InfoIcon } from 'lucide-react'
import React from 'react'

interface InfoTagProps{
    message: string
}
const InfoTag = ({message}: InfoTagProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 text-sm p-4 rounded-lg text-gray-700 flex gap-3 items-start shadow-sm">
      <InfoIcon size="18" strokeWidth={2} className="text-blue-600 flex-shrink-0 mt-0.5" />
      <p className="flex-1">{message}</p>
    </div>
  )
}

export default InfoTag
