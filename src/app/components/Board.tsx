'use client'

import clsx from 'clsx'

import { useState, useEffect, forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils/cn'

import { Grid } from '@/models/Grid'

import RandomizeButton from './RandomizeButton'
import PlayButton from './PlayButton'
import SizeButton from './SizeButton'

const boardVariants = cva(
 `flex flex-row w-full gap-4 justify-between`,
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
  const [isGameActive, setIsGameActive] = useState<boolean>(false)
  const [gridSize, setGridSize] = useState<number>(12)

  const handleCellClick = (coordinates: {i: number, j: number}) => {
    const { i:row, j:col, } = coordinates
    
    if (isGameActive) return

    const isCellAlive = gridArray![row][col]

    const gridArrayClone = [...gridArray!]
    gridArrayClone![row][col] = !isCellAlive

    setGridArray(gridArrayClone)

  }

  const randomize = () => {
    const shuffledGrid = [...gridArray!]
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        shuffledGrid![i][j] = Math.floor(Math.random() * 2) === 1 ? true : false;
      }
    }

    setGridArray(shuffledGrid)
  }

  const startGame = () => {
    setIsGameActive(prevState => !prevState)    
  }

  useEffect(() => {

    const nextStep = () => {
      gridArray?.forEach((row, i) => {
        row.forEach((currentCellStatus, j) => {
          const colsNumber = row.length

          const neighbours = [
            i > 0 ? gridArray[i-1][j-1] ?? null : null,   //top-left
            i > 0 ? gridArray[i-1][j] ?? null : null,     //above
            i > 0 ? gridArray[i-1][j+1] ?? null : null,   //top-right
  
            gridArray[i][j-1] ?? null,  //left
            // currentCellStatus,          // center
            gridArray[i][j+1] ?? null,  //right
  
            i < colsNumber-1 ? gridArray[i+1][j-1] ?? null : null,   //bottom-left
            i < colsNumber-1 ? gridArray[i+1][j] ?? null : null,     //below
            i < colsNumber-1 ? gridArray[i+1][j+1] ?? null : null,   //bottom-right
          ]
  
          const numberOfLiveNeighbours = neighbours.filter(isAlive => isAlive === true).length
  
          const isCellAlive = currentCellStatus
  
          const gridArrayClone = [...gridArray!]

          // Any live cell with two or three live neighbours survives.
          if (isCellAlive && (numberOfLiveNeighbours === 2 || numberOfLiveNeighbours === 3))
          gridArrayClone![i][j] = true
  
          // Any dead cell with three live neighbours becomes a live cell.
          else if (!isCellAlive && numberOfLiveNeighbours === 3)
          gridArrayClone![i][j] = true
  
          // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
          else {
            gridArrayClone![i][j] = false
          }

          setGridArray(gridArrayClone)
  
          //  // debug
          // console.log({
          //   currentCellStatus, 
          //   coord: {i, j},
          //   neighbours,
          //   numberOfLiveNeighbours
          // })
        })
      })
    }

    const running = setTimeout(() => {
      nextStep()
    }, 250)

    if (!isGameActive) return clearTimeout(running)

  }, [isGameActive, gridArray])

  useEffect(() => {
    const grid = () => (new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false)))
    setGridArray(grid())

  }, [gridSize])


  return (
    <div className={cn(boardVariants({ className }))}
    ref={ ref }
    {...props}
    >
      <div 
        className='grid justify-items-center items-center gap-2 w-full'
        style={{gridTemplateColumns: `repeat(${gridSize},1fr)`, gridTemplateRows: `repeat(${gridSize},1fr)`}}
      >
        {
          gridArray &&
          gridArray.map( (row, i) => {
            return row.map( (isAlive, j) => {
              const coordinates = {i, j}
              return (
                <div 
                  key={'Cell'+String(i)+String(j)} 
                  className={clsx(
                    [`flex justify-center items-center transition-color rounded-full`, {
                      "bg-red-700" : isAlive,
                      "bg-slate-500" : !isAlive,
                      "hover:cursor-default": isGameActive,
                      "hover:cursor-pointer hover:opacity-80" : !isGameActive,
                    }, {
                      // cell sizes based on row column quantity
                      "h-10 w-10 gap-x-2 gap-y-2": gridSize === 12,
                      "h-[1.875rem] w-[1.875rem] gap-x-1 gap-y-1": gridSize === 15,
                      "h-[1.25rem] w-[1.25rem] gap-x-1 gap-y-1": gridSize === 24,
                      "h-[0.85rem] w-[0.85rem] gap-x-1 gap-y-1": gridSize === 32,
                    }]
                  )} 
                  onClick={() => handleCellClick(coordinates) }
                >
                  {/* debug coordinates */}
                  {/* <p className='text-xs'>{`${i},${j}`}</p>  */}
                </div>
              )
            })
          })
        }
      </div>


      <div className='flex flex-col h-fit p-3 gap-4 bg-black/10 rounded-sm'>
        <RandomizeButton onClick={ randomize } disabled={ isGameActive }/>
        <PlayButton title={ isGameActive ? 'Pause' : 'Play'} onClick={ startGame } />
        
        <div className='border-b-2 border-slate-500 h-2 w-full rounded-sm' />  
        
        <SizeButton title='12x12' onClick={() => {if(!isGameActive) setGridSize(12)}} disabled={gridSize === 12} />
        <SizeButton title='15x15' onClick={() => {if(!isGameActive) setGridSize(15)}} disabled={gridSize === 15} />
        <SizeButton title='24x24' onClick={() => {if(!isGameActive) setGridSize(24)}} disabled={gridSize === 24} />
        <SizeButton title='32x32' onClick={() => {if(!isGameActive) setGridSize(32)}} disabled={gridSize === 32} />

      </div>     

    </div>
  )
})

Board.displayName = 'Board'

export {Board}