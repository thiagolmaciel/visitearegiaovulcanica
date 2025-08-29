import { InfoIcon } from 'lucide-react'
import React from 'react'

interface InfoTagProps{
    message: string
}
const InfoTag = ({message}: InfoTagProps) => {
  return (
    <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
    <InfoIcon size="16" strokeWidth={2} />
    {message}
  </div>
  )
}

export default InfoTag
