'use client'

import { FC } from 'react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils/cn'

interface SizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

const SizeButton: FC<SizeButtonProps> = ({title, className, ...props}) => {

  return (
    <Button 
      className={cn(className, 'disabled:bg-slate-300 disabled:text-black disabled:opacity-100') }
      title={ title } 
      variant='subtle' {...props} 
      />
  )
}

export default SizeButton