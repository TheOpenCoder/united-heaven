import Link from 'next/link'
import { FaDiscord, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Prime', href: '/prime' },
    { name: 'Insight', href: '/insight' },
    { name: 'Donate Us', href: 'https://www.buymeacoffee.com/unitedheaven', external: true },
  ],
  social: [
    {
      name: 'Instagram',
      href: '#',
      icon: FaInstagram,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: FaTwitter,
    },
    {
      name: 'YouTube',
      href: '#',
      icon: FaYoutube,
    },
    {
      name: 'Discord',
      href: '#',
      icon: FaDiscord,
    },
  ],
}

const Footer = () => {
  return (
    <footer className='bg-zinc-100 dark:bg-zinc-900'>
      <div className='mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8'>
        <nav className='-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12' aria-label='Footer'>
          {navigation.main.map((item) => (
            <div key={item.name} className='pb-6'>
              <Link
                href={item.href}
                className='text-sm leading-6 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                target={item.external ? '_blank' : '_self'}
                rel={item.external ? 'noopener noreferrer' : ''}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className='mt-10 flex justify-center space-x-10'>
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6' aria-hidden='true' />
            </a>
          ))}
        </div>
        <p className='mt-10 text-center text-xs leading-5 text-zinc-600 dark:text-zinc-400'>
          &copy; 2023 United Heaven. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
