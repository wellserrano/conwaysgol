import Image from 'next/image'
import { Inter } from 'next/font/google'

import { Grid } from './models/Grid'
import { Button } from './components/Button'
import RandomizeButton from './components/RandomizeButton'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const grid = new Grid(10,10)
  
  const gridArray = grid.grid
 

  function shuffleGrid() {
    console.log('cheg')
  }

  return (
    <main className="w-full h-screen bg-slate-900 p-12">
      <div className='flex w-fit justify-center p-4 bg-slate-800'>
        {grid.renderGrid()}
        <Button className='ml-4' title='Randomize' />
      </div>
    </main>
  )
}
