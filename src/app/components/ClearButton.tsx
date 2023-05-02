'use client'

import { FC } from 'react'
import { Button } from '@/components/Button'

interface ClearButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ClearButton: FC<ClearButtonProps> = ({...props}) => {

  return (
    <Button title='Clear' className='hover:bg-red-400' {...props} />
  )
}

export default ClearButton