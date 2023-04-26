'use client'

import { useState, useEffect, forwardRef, HTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils/cn'
import { Grid } from '@/models/Grid'
import RandomizeButton from './RandomizeButton'
import clsx from 'clsx'
import PlayButton from './PlayButton'



const boardVariants = cva(
 `flex flex-row w-full gap-4`,
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
  const [gridSize, setGridSize] = useState<{rows: number, cols: number}>({rows: 32, cols: 32})

  const grid = new Grid(gridSize.rows, gridSize.cols)

  const { columns, rows, matrix } = grid.getGridSpecs()


  const shuffleGrid = () => {
    const newMatrix = grid.randomize()
    setGridArray(newMatrix)
  }

  const handleCellClick = (coordinates: {i: number, j: number}) => {
    const { i:row, j:col, } = coordinates

    if (isGameActive) return

    const isCellAlive = gridArray![row][col]

    const gridArrayClone = [...gridArray!]
    gridArrayClone![row][col] = !isCellAlive

    setGridArray(gridArrayClone)

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
            // currentCellStatus,          //center
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
    setGridArray(matrix)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className={cn(boardVariants({ className }))}
    ref={ ref }
    {...props}
    >
      <div 
        className='grid justify-items-center items-center gap-2'
        style={{gridTemplateColumns: `repeat(${columns},1fr)`, gridTemplateRows: `repeat(${rows},1fr)`}}
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
                    [`flex justify-center items-center transition-all rounded-full`, {
                      "bg-red-700" : isAlive,
                      "bg-slate-500" : !isAlive,
                      "hover:cursor-default": isGameActive,
                      "hover:cursor-pointer hover:opacity-80" : !isGameActive,
                    }, {
                      // cell sizes based
                      "h-10 w-10 gap-x-2 gap-y-2": gridSize.cols === 12,
                      "h-[1.875rem] w-[1.875rem] gap-x-1 gap-y-1": gridSize.cols === 15,
                      "h-[1.25rem] w-[1.25rem] gap-x-1 gap-y-1": gridSize.cols === 24,
                      "h-[0.85rem] w-[0.85rem] gap-x-1 gap-y-1": gridSize.cols === 32,
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
        <RandomizeButton onClick={ shuffleGrid } disabled={isGameActive}/>
        <PlayButton title={isGameActive ? 'Pause' : 'Play'} onClick={ startGame } />
      </div>

    </div>
  )
})

Board.displayName = 'Board'

export {Board}