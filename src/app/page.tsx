import { Board } from '@/components/Board'

export default function Home() {

  return (
    <main className="flex flex-col items-center w-full h-screen bg-slate-900 px-12 py-4 gap-6">
      <div className='flex w-[48rem] h-[34rem] justify-center p-4 bg-slate-800 rounded-md overflow-hidden'>

        <Board />
        
      </div>
      <footer>
        <p className='text-slate-300 text-sm'>Developed by <a className='hover:text-slate-200 transition-colors font-semibold' href="https://wellserrano.netlify.app/">@WellingtonSerrano</a></p>
      </footer>
    </main>
  )
}
