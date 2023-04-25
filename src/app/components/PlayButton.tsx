'use client'

import { FC } from 'react'
import { Button } from '@/components/Button'

interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PlayButton: FC<PlayButtonProps> = ({...props}) => {

  return (
    <Button title='Play' {...props} />
  )
}

export default PlayButton