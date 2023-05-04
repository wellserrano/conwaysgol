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
        {/* <Dialog.Overlay className='bg-gray-800 data-[state=open]:animate-pulse fixed inset-0' /> */}
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-neutral-900 m-0 text-[17px] font-medium">
            John Conway&apos;s Game of Life
          </Dialog.Title >
          <Dialog.Description className="text-neutral-700 mt-[10px] mb-5 text-[15px] leading-normal">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia aperiam alias exercitationem odio porro sequi, illum dolor deleniti temporibus reprehenderit expedita obcaecati doloremque, delectus nam similique at nesciunt? Tempora, nulla!
          </Dialog.Description>
          <Dialog.Close asChild>
          <button
            className="text-yellow-400 hover:bg-yellow-700 focus:shadow-yellow-200 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            X
          </button>
        </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>



    </Dialog.Root>
  )
}