'use client'

import { useState, useEffect, forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils/cn'
import { Grid } from '@/models/Grid'
import RandomizeButton from './RandomizeButton'
import clsx from 'clsx'



const boardVariants = cva(
 `w-full flex flex-row`,
 {
  variants: {
    variant: {
      opt1: 'test1',
      opt2: 'test2',
    },
  },
  defaultVariants: {
    variant: 'opt1'
  }
 }
)

interface BoardProps
extends VariantProps<typeof boardVariants>, HTMLAttributes<HTMLDivElement> {}

const Board = forwardRef<HTMLDivElement, BoardProps>(
({className, ...props}, ref) => {
  const [gridArray, setGridArray] = useState<boolean[][] | null>(null)

  const grid = new Grid(10,10)
  
  const { columns, matrix } = grid.getGridSpecs()

  const shuffleGrid = () => {
    const newMatrix = grid.randomize()
    setGridArray(newMatrix)
  }

  const handleCellClick = (coordinates: {i: number, j: number}) => {
    const { i:row, j:col, } = coordinates

    const isCellAlive = gridArray![row][col]

    const gridArrayClone = [...gridArray!]
    gridArrayClone![row][col] = !isCellAlive

    setGridArray(gridArrayClone)

  }

  useEffect(() => {
    setGridArray(matrix)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className={cn(boardVariants({ className }))}
    ref={ ref }
    {...props}
    >
      <div 
        className='grid max-w-fit min-w-max justify-items-center items-center gap-2 gap-x-2'
        style={{gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`}}
      >
        {
          gridArray &&
          gridArray.map( (row, i) => {
            return row.map( (col, j) => {
              const coordinates = {i, j}
              return (
                <div 
                  key={'Cell'+String(i)+String(j)} 
                  
                  className={clsx(
                    ["w-10 h-10 hover:cursor-pointer hover:opacity-80 transition-all", {
                      "bg-red-700" : gridArray![i][j],
                      "bg-slate-500" : !gridArray![i][j]
                    }]
                  )} 
                
                  onClick={() => handleCellClick(coordinates) }
                />
                
              )
            })
          })
        }
      </div>
      <RandomizeButton className='ml-4' onClick={ shuffleGrid } title='Randomize' />
    </div>
  )
})

Board.displayName = 'Board'

export {Board}