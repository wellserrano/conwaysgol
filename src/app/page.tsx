import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { GameOfLifeGrid } from './models/grid'

export default function Home() {
  const grid = new GameOfLifeGrid(10,10)
  grid.randomize()
  return (
    <main className="w-full h-screen bg-slate-900 p-12">
      <div className='w-1/2'>

        {grid.renderGrid()}
      </div>
    </main>
  )
}
