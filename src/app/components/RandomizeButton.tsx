'use client'

import { FC } from 'react'
import { Button } from '@/components/Button'

interface RandomizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const RandomizeButton: FC<RandomizeButtonProps> = ({...props}) => {

  return (
    <Button title='Randomize' {...props} />
  )
}

export default RandomizeButton