import React, { memo } from 'react'
import { IoChevronBackOutline, IoClose } from 'react-icons/io5'
import isEqualWith from 'lodash.isequalwith'
import clsx from 'clsx'

const OverlayCard = ({
  children,
  position: { top = 0, right, bottom, left },
  title,
  onClose,
  onBack,
  className,
  width,
  divider,
  titleOnClick,
}: {
  children: React.ReactNode
  position: {
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
  }
  title?: string
  onClose?: () => void
  onBack?: () => void
  className?: string
  width?: number
  divider?: boolean
  titleOnClick?: () => void
}) => {
  return (
    <div
      className={clsx('z-30 absolute px-4', !width ? '!w-fit' : 'max-md:!w-full', className)}
      style={{
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        width: width,
      }}
    >
      <div className='bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-4 rounded-md shadow-lg h-full overflow-scroll'>
        {title && (
          <>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                {onBack && <IoChevronBackOutline className='cursor-pointer' size='26' onClick={onBack} />}
                <p
                  className={`text-2xl font-bold truncate ${onBack && 'ml-2.5'} ${titleOnClick && 'cursor-pointer'}`}
                  style={{ maxWidth: width ? width / 1.5 : '260px' }}
                  onClick={titleOnClick}
                >
                  {title}
                </p>
              </div>
              {onClose && <IoClose className='cursor-pointer' size='26' onClick={onClose} />}
            </div>
            {divider && <hr className={`${children ? 'mb-4' : ''}`} />}
          </>
        )}
        {children}
      </div>
    </div>
  )
}

const isPropsEqual = (prevProps: any, nextProps: any) => {
  return isEqualWith(prevProps, nextProps)
}

export default memo(OverlayCard, isPropsEqual)
