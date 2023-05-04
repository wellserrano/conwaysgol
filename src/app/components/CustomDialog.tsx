import * as Dialog from '@radix-ui/react-dialog'

export function CustomDialog() {
  return (
    <Dialog.Root>
      
      <Dialog.Trigger asChild>
        <button className='flex font-semibold mx-3 text-base justify-center rounded-full transition-colors bg-slate-400/50 hover:bg-slate-300/50 hover:cursor-pointer w-6'>
          ?
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 data-[state=open]:animate-overlayShow fixed inset-0' />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed overflow-y-auto pr-8 scrollbar top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-200 p-7 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-neutral-900 m-0 text-2xl font-semibold">
            John Conway&apos;s Game of Life
          </Dialog.Title >
          <Dialog.Description className="text-neutral-800 mt-4 mb-5 text-base leading-normal">
            The Game of Life is a fascinating cellular automation game that was invented by mathematician John Conway in the 1970s. It&apos;s a computer program that simulates the behavior of simple organisms or cells that are arranged in a grid-like pattern.
            <br /><br />
            In this game, each cell has only two states: it can be either &quot;alive&quot; or &quot;dead.&quot; The rules of the game are simple
            <br /><br />
            1.  Any live cell with fewer than two live neighbors dies, as if by underpopulation.<br />
            2.  Any live cell with two or three live neighbors lives on to the next generation.<br />
            3.  Any live cell with more than three live neighbors dies, as if by overpopulation.<br />
            4.  Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.<br /><br />
            These rules dictate how the cells evolve over time. The game starts with an initial configuration of live and dead cells, and then the rules are applied repeatedly to create new generations of cells.
            <br /><br />
            The fascinating thing about the Game of Life is that even though the rules are simple, the patterns that emerge can be incredibly complex and beautiful. Some patterns oscillate back and forth, while others move across the grid like spaceships. There are even patterns that can create copies of themselves, like digital organisms.
            <br /><br />
            Overall, the Game of Life is a fun and interesting way to explore the concepts of cellular automata, and to see how simple rules can give rise to complex and unpredictable behavior.      
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>



    </Dialog.Root>
  )
}