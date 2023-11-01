import clsx from 'clsx'
import Link from 'next/link'

const variantStyles = {
  green:
    'bg-emerald-600 dark:bg-emerald-700 hover:bg-emerald-700 dark:hover:bg-emerald-600 focus:ring-emerald-600 dark:focus:ring-emerald-700 text-white',
  outline:
    'border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-800',
}

const btnSizes = {
  sm: 'p-2 font-medium',
  md: 'p-3 font-medium',
  lg: 'p-4 font-semibold',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
  size?: keyof typeof btnSizes
  children: React.ReactNode
} & (React.ComponentPropsWithoutRef<typeof Link> | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined }))

const Button = ({ variant = 'green', size = 'sm', className, children, ...props }: ButtonProps) => {
  className = clsx(
    'rounded-md text-sm shadow-sm focus-ring ring-offset-2 disabled:opacity-50',
    variantStyles[variant],
    btnSizes[size],
    className
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {children}
    </Link>
  )
}

export default Button
