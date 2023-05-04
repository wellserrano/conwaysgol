'use client'

import clsx from 'clsx'

import { useState, useEffect, forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils/cn'

import RandomizeButton from './RandomizeButton'
import PlayButton from './PlayButton'
import SizeButton from './SizeButton'
import ClearButton from './ClearButton'
import { CustomDialog } from './CustomDialog'

const boardVariants = cva(
 `flex flex-row w-full justify-between gap-8 items-center overflow-hidden`,
 {
  variants: {
    variant: {},
  },
  defaultVariants: {}
 }
)

interface BoardProps
extends VariantProps<typeof boardVariants>, HTMLAttributes<HTMLDivElement> {}

const Board = forwardRef<HTMLDivElement, BoardProps>(
({className, ...props}, ref) => {
  const [gridArray, setGridArray] = useState<boolean[][] | null>(null)
  const [isGameActive, setIsGameActive] = useState<boolean>(false)
  const [gridSize, setGridSize] = useState<number>(64)

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

  const clear = () => {
    const grid = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false))
    setGridArray(grid)
  }

  const startGame = () => {
    setIsGameActive(prevState => !prevState)    
  }

  useEffect(() => {

    if (!gridArray) return

    const nextStep = () => {
      
      const newGridArray = gridArray.map((row, i) =>
        row.map((currentCellStatus, j) => {
          const colsNumber = row.length

          const neighbours = [
            i > 0 ? gridArray[i - 1][j - 1] ?? null : null,     //top-left
            i > 0 ? gridArray[i - 1][j] ?? null : null,         //above
            i > 0 ? gridArray[i - 1][j + 1] ?? null : null,     //top-right
            gridArray[i][j - 1] ?? null, //left
            gridArray[i][j + 1] ?? null, //right
            i < colsNumber - 1 ? gridArray[i + 1][j - 1] ?? null : null,  //bottom-left
            i < colsNumber - 1 ? gridArray[i + 1][j] ?? null : null,      //below
            i < colsNumber - 1 ? gridArray[i + 1][j + 1] ?? null : null,  //bottom-right
          ]

          const numberOfLiveNeighbours = neighbours.filter((isAlive) => isAlive === true).length

          const isCellAlive = currentCellStatus

          // Any live cell with two or three live neighbours survives.
          if (isCellAlive && (numberOfLiveNeighbours === 2 || numberOfLiveNeighbours === 3)) return true

          // Any dead cell with three live neighbours becomes a live cell.
          else if (!isCellAlive && numberOfLiveNeighbours === 3) return true

          // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
          else return false
          
        })
      )

      setGridArray(newGridArray)

    }
  
    const running = setTimeout(() => {
      nextStep()
    }, 250)
  
    if (!isGameActive) return clearTimeout(running)

  }, [isGameActive, gridArray])
  

  useEffect(() => {
    const grid = new Array(gridSize).fill(false).map(() => new Array(gridSize).fill(false))
    setGridArray(grid)
  }, [gridSize])


  return (
    <div className={cn(boardVariants({ className }))}
    ref={ ref }
    {...props}
    >
      <div 
        className='grid justify-items-center items-center w-full gap-x-1 gap-y-1'
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
                    [`flex justify-center items-center rounded-full transition-[height] duration-500`, {
                      "bg-red-700" : isAlive,
                      "bg-slate-500" : !isAlive,
                      "hover:cursor-default": isGameActive,
                      "hover:cursor-pointer hover:opacity-80" : !isGameActive,
                    }, {
                      // cell sizes based on row column quantity
                      "h-8 w-8": gridSize === 12,
                      "h-4 w-4": gridSize === 24,
                      "h-3 w-3": gridSize === 32,
                      "h-1 w-1": gridSize === 64,
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


      <div className='flex flex-col h-full justify-center gap-4 items-end'>
        <CustomDialog />

        <div className='relative flex flex-col h-fit p-3 gap-4 bg-black/10 rounded-sm'>

          <PlayButton className={ isGameActive ? 'bg-green-300 hover:bg-red-300' : undefined } title={ isGameActive ? 'Pause' : 'Play'} onClick={ startGame } />
          <ClearButton onClick={ clear } disabled={ isGameActive }/>
          <RandomizeButton onClick={ randomize } disabled={ isGameActive }/>
          
          <div className='border-b-2 border-slate-500 h-2 w-full rounded-sm' />  
          
          <SizeButton className={isGameActive ? 'hover:cursor-default opacity-50' : ''} title='12x12' onClick={() => {if(!isGameActive) setGridSize(12)}} disabled={gridSize === 12 } />
          <SizeButton className={isGameActive ? 'hover:cursor-default opacity-50' : ''} title='24x24' onClick={() => {if(!isGameActive) setGridSize(24)}} disabled={gridSize === 24 } />
          <SizeButton className={isGameActive ? 'hover:cursor-default opacity-50' : ''} title='32x32' onClick={() => {if(!isGameActive) setGridSize(32)}} disabled={gridSize === 32 } />
          <SizeButton className={isGameActive ? 'hover:cursor-default opacity-50' : ''} title='64x64' onClick={() => {if(!isGameActive) setGridSize(64)}} disabled={gridSize === 64 } />

          {/* <div className='border-b-2 border-slate-500 h-2 w-full rounded-sm' />   */}

        </div>
      </div>     

    </div>
  )
})

Board.displayName = 'Board'

export {Board}