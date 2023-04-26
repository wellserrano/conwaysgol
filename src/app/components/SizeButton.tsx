'use client'

import { FC } from 'react'
import { Button } from '@/components/Button'

interface SizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

const SizeButton: FC<SizeButtonProps> = ({title, ...props}) => {

  return (
    <Button className='disabled:bg-slate-300 disabled:text-black disabled:opacity-100' title={ title } variant='subtle' {...props} />
  )
}

export default SizeButton