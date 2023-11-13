import React, { Fragment, useState } from 'react'

import { HiCheck, HiChevronUpDown } from 'react-icons/hi2'

import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'

type Option = {
  name: string
  value: string
  avatar?: string
  icon?: any
  disabled?: boolean
}

type MultiSelectProps = {
  data: Option[]
  label?: string
  emptyText: string
  showImage?: boolean
  onSelectionChange: (_selectedItems: string[]) => void
}

const MultiSelect: React.FC<MultiSelectProps> = ({ data, label, emptyText, showImage = true, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<Option[]>([])

  const handleSelectionChange = (newSelectedItems: Option[]) => {
    setSelectedItems(newSelectedItems)
    onSelectionChange(newSelectedItems.map((item) => item.value))
  }

  return (
    <Listbox value={selectedItems} onChange={handleSelectionChange} multiple>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className='block text-sm font-medium leading-6 text-black dark:text-white'>
              {label}
            </Listbox.Label>
          )}
          <div className='relative mt-2'>
            <Listbox.Button className='input-ui'>
              {selectedItems.length === 0 && (
                <span className='flex items-center'>
                  <span className='block truncate text-zinc-500'>{emptyText}</span>
                </span>
              )}
              {selectedItems.length > 0 && (
                <span className='flex flex-wrap items-center gap-2'>
                  {selectedItems.map((item) => (
                    <Fragment key={item.value}>
                      {item.avatar && showImage && (
                        <Image
                          src={item.avatar || ''}
                          alt=''
                          className='h-6 w-6 flex-shrink-0'
                          width={24}
                          height={24}
                        />
                      )}
                      {item.icon && showImage && <item.icon className='h-6 w-6 flex-shrink-0' />}
                      {!showImage && (
                        <span className='inline-flex items-center rounded-md bg-zinc-400/10 px-2 py-1 text-xs font-medium text-zinc-500 ring-1 ring-inset ring-zinc-400/20'>
                          {item.name}
                        </span>
                      )}
                    </Fragment>
                  ))}
                </span>
              )}
              <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                <HiChevronUpDown className='h-5 w-5 text-zinc-400' aria-hidden='true' />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-30 mt-1 max-h-56 w-full overflow-auto rounded-md bg-zinc-200 dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm'>
                {data.map((item) => (
                  <Listbox.Option
                    key={item.value}
                    className={({ active }) =>
                      clsx(
                        active
                          ? 'bg-zinc-300 dark:bg-zinc-700 text-black dark:text-white'
                          : 'text-zinc-800 dark:text-zinc-200',
                        'relative select-none py-2 pl-3 pr-9',
                        item.disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'
                      )
                    }
                    value={item}
                    disabled={item.disabled}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                          {item.avatar && (
                            <Image src={item.avatar} alt='' className='flex-shrink-0 h-8 w-8' width={40} height={40} />
                          )}
                          {item.icon && <item.icon className='h-5 w-5 flex-shrink-0' />}
                          <span className={clsx(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                            {item.name}
                          </span>
                          {item.disabled && <span className='ml-2 text-xs text-zinc-500'>Not supported yet</span>}
                        </div>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
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

export default MultiSelect
