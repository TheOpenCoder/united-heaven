'use client'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiX } from 'react-icons/hi'
import Button from '../Button'
import { TbLocationFilled } from 'react-icons/tb'
import { BsFillCalendarWeekFill } from 'react-icons/bs'

const ParticipateModal = ({
  children,
  manualOpen,
  setManualOpen,
}: {
  children?: React.ReactNode
  manualOpen?: boolean
  setManualOpen?: (_open: boolean) => void
}) => {
  const cancelButtonRef = useRef(null)
  const [open, setOpenState] = useState<boolean>(false)

  const setOpen = (state: boolean) => {
    setOpenState(state)
    if (setManualOpen) {
      setManualOpen(state)
    }
  }

  useEffect(() => {
    if (typeof manualOpen !== 'undefined') {
      setOpenState(manualOpen)
    }
  }, [manualOpen])

  const location = 'Marina Beach, chennai, IN'
  const startDate = 'Feb 08, 2021'
  const endDate = 'Feb 10, 2021'

  return (
    <>
      {children && <div onClick={() => setOpen(true)}>{children}</div>}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-50' initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-zinc-300/90 dark:bg-zinc-950/90 transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 z-50 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl'>
                  <HiX
                    className='hidden sm:block absolute top-6 right-6 hover:text-zinc-500 dark:hover:text-zinc-400  cursor-pointer text-2xl'
                    onClick={() => setOpen(false)}
                  />
                  <div className='pb-10 pt-3 md:py-10 px-8'>
                    <Dialog.Title as='h3' className='text-2xl sm:text-3xl font-semibold leading-6 mt-4 sm:mt-0'>
                      Participate
                    </Dialog.Title>
                    <p className='text-sm text-zinc-500 dark:text-zinc-400 mt-1'>
                      Participate in
                      <span className='font-bold text-emerald-600'> Clean Marina Beach on 12 dec morning</span>
                    </p>

                    <div className='mt-10 mb-6 text-sm font-bold space-y-5'>
                      <div
                        onClick={() =>
                          window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank')
                        }
                        className='flex w-fit items-center text-zinc-500 dark:text-zinc-400 cursor-pointer hover:text-black dark:hover:text-white'
                      >
                        <TbLocationFilled className='w-4 h-4' />
                        <p className='ml-2 font-semibold text-sm'>{location}</p>
                      </div>
                      <div className='flex w-auto items-center text-zinc-500 dark:text-zinc-400 cursor-default'>
                        <BsFillCalendarWeekFill className='w-4 h-4' />
                        <p className='ml-2 font-semibold text-sm'>{`${startDate} - ${endDate}`}</p>
                      </div>
                    </div>

                    <Button className='w-full rounded-sm'>Participate</Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default ParticipateModal
