'use client'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { useColorMode } from '@/context/ColorModeContext'

const DarkModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Switch
      checked={isDark}
      onChange={toggleColorMode}
      className='group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1 ring-offset-zinc-100 dark:ring-offset-zinc-950 hover:ring-offset-zinc-200 dark:hover:ring-offset-zinc-900'
    >
      <span className='sr-only'>Use setting</span>
      <span aria-hidden='true' className='pointer-events-none absolute h-full w-full rounded-md' />
      <span
        aria-hidden='true'
        className={clsx(
          isDark ? 'bg-blue-600' : 'bg-gray-300',
          'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
        )}
      />
      <span
        aria-hidden='true'
        className={clsx(
          isDark ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
        )}
      />
    </Switch>
  )
}

export default DarkModeSwitch
