'use client'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { HiCheck, HiChevronUpDown } from 'react-icons/hi2'

export type MenuOption = {
  name: string
  value: string
}

export type MenuProps = {
  options: MenuOption[]
  value: MenuOption['value']
  setValue: React.Dispatch<React.SetStateAction<MenuOption['value']>>
  disabled?: boolean
}

const Menu = ({ options, disabled, value, setValue }: MenuProps) => {
  return (
    <Listbox disabled={disabled} value={value} onChange={setValue}>
      {({ open }) => (
        <>
          <div className='relative mt-2'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-1.5 pl-3 pr-10 text-left  shadow-sm focus-visible-ring ring-offset-2 sm:text-sm sm:leading-6'>
              <span className='block truncate'>{options.find((option) => option.value === value)?.name}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <HiChevronUpDown className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mb-1 max-h-80 bottom-full right-0 w-full min-w-[300px] overflow-auto rounded-md bg-zinc-100 dark:bg-zinc-950 py-1 text-base shadow-lg sm:text-sm'>
                {options.map((option) => (
                  <Listbox.Option
                    key={option.name}
                    className={({ active }) =>
                      clsx(
                        active
                          ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white'
                          : 'text-zinc-900 dark:text-zinc-100',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={option.value}
                  >
                    {({ selected }) => (
                      <>
                        <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {option.name}
                        </span>

                        {selected ? (
                          <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-900 dark:text-zinc-100'>
                            <HiCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default Menu
