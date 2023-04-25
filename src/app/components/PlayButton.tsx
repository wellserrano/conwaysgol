'use client'

import { FC } from 'react'
import { Button } from '@/components/Button'

interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

const PlayButton: FC<PlayButtonProps> = ({title, ...props}) => {

  return (
    <Button title={title} {...props} />
  )
}

export default PlayButton