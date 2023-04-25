'use client'

import { FC, RefObject } from 'react'
import { Button } from '@/components/Button'
import { Grid } from '@/models/Grid'

interface RandomizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  t?: RefObject<Grid>
}

const RandomizeButton: FC<RandomizeButtonProps> = ({t, ...props}) => {

  return (
    <Button title='Randomize' {...props} />
  )
}

export default RandomizeButton