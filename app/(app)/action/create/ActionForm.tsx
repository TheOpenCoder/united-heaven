'use client'
import { useState } from 'react'
import { HiOutlineX } from 'react-icons/hi'
import clsx from 'clsx'
import Image from 'next/image'
import Dropzone from 'react-dropzone'
import toast from 'react-hot-toast'
import ResizableTextarea from '@/components/ResizableTextarea'
import { Switch } from '@headlessui/react'
import MultiSelect from '@/components/MultiSelect'
import SDGGoals from '@/constants/SDGGoals'
import DatePicker from 'react-datepicker'
import { useColorMode } from '@/context/ColorModeContext'
import Button from '@/components/Button'
import 'react-datepicker/dist/react-datepicker.css'
import './datePicker.css'

const goalsOption = SDGGoals.map((goal) => ({
  name: goal.name,
  value: goal.id,
  avatar: goal.image,
}))

type FormData = {
  title: string
  description: string
  image: File | null
  isOnline: boolean
  location?: string
  onlineLink?: string
  goals: string[]
  startDate: Date | null
  endDate: Date | null
}

const initialFormData: FormData = {
  title: '',
  description: '',
  image: null,
  isOnline: false,
  location: '',
  onlineLink: '',
  goals: [],
  startDate: new Date(),
  endDate: new Date(),
}

const ActionForm = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [actionImage, setActionImage] = useState('')
  const { colorMode } = useColorMode()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, limit?: number) => {
    const { name, value } = e.target

    if (limit && value.length > limit) return

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageUpload = (file: File) => {
    const fileSizeLimitInMB = 10

    if (file.size > fileSizeLimitInMB * 1024 * 1024) {
      toast.error(`File size should be less than ${fileSizeLimitInMB}MB`, {
        id: 'action-image-file-size-limit',
      })
      return
    }

    setFormData({ ...formData, image: file })
    setActionImage(URL.createObjectURL(file))
  }

  const checkFormValidity = () => {
    if (formData.title === '') {
      toast.error(`Title is required`, {
        id: 'action-title-required',
      })
      return false
    }

    if (formData.description === '') {
      toast.error(`Description is required`, {
        id: 'action-description-required',
      })
      return false
    }

    if (formData.image === null) {
      toast.error(`Action image is required`, {
        id: 'action-image-required',
      })
      return false
    }

    if (formData.goals.length === 0) {
      toast.error(`SDG Goals are required`, {
        id: 'action-goals-required',
      })
      return false
    }

    if (formData.startDate === null) {
      toast.error(`Start Date is required`, {
        id: 'action-start-date-required',
      })
      return false
    }

    if (formData.endDate === null) {
      toast.error(`End Date is required`, {
        id: 'action-end-date-required',
      })
      return false
    }

    if (formData.isOnline && formData.onlineLink === '') {
      toast.error(`Online Link is required`, {
        id: 'action-online-link-required',
      })
      return false
    }

    if (!formData.isOnline && formData.location === '') {
      toast.error(`Location is required`, {
        id: 'action-location-required',
      })
      return false
    }

    return true
  }

  const createAction = () => {
    if (!checkFormValidity()) {
      return
    }

    const actionContractFields = {
      startDate: Math.floor(formData.startDate!.getTime() / 1000),
    }
    console.log(actionContractFields)
  }

  return (
    <div className='space-y-10'>
      <Dropzone
        onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles[0])}
        accept={{
          'image/*': ['.png', '.jpg', '.jpeg'],
        }}
        maxFiles={1}
        multiple={false}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div className='relative'>
            <label className='sr-only'>Upload action Image</label>
            <div
              className={clsx(
                'flex focus-ring justify-center items-center rounded-2xl w-full aspect-[4/3] cursor-pointer relative bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700'
              )}
              {...getRootProps()}
            >
              {actionImage !== '' ? (
                <Image src={actionImage} alt='item' fill className='object-cover object-center rounded-2xl' />
              ) : (
                <div className='space-y-1 text-center'>
                  <svg
                    className='mx-auto h-12 w-12 md:h-20 md:w-20 text-zinc-600 dark:text-zinc-400'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 48 48'
                    aria-hidden='true'
                  >
                    <path
                      d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <div className='flex text-sm text-zinc-800 dark:text-zinc-200 justify-center'>
                    <label htmlFor='file-upload' className='relative font-medium'>
                      {isDragActive ? 'Drop the image here ...' : 'Upload Action Cover Image'}
                    </label>
                  </div>
                  <p className='text-xs text-zinc-500'>PNG, JPG up to 10MB.</p>
                </div>
              )}
              <input {...getInputProps()} />
            </div>
            {actionImage !== '' && (
              <button
                className='absolute top-0 right-0 p-2 rounded-full m-3 bg-zinc-800 hover:scale-110 focus-visible-ring'
                onClick={() => {
                  setFormData({ ...formData, image: null })
                  setActionImage('')
                }}
              >
                <HiOutlineX className={`h-4 w-4 text-zinc-400 stroke-2`} />
              </button>
            )}
          </div>
        )}
      </Dropzone>
      <div>
        <label htmlFor='title' className='block text-sm font-medium leading-6 text-black dark:text-white'>
          Title
        </label>
        <div className='mt-2'>
          <input
            type='text'
            name='title'
            id='title'
            value={formData.title}
            onChange={handleChange}
            required
            className='input-ui'
            placeholder='What is your action about?'
          />
        </div>
      </div>

      <div>
        <label htmlFor='description' className='block text-sm font-medium leading-6 text-black dark:text-white'>
          Description
        </label>
        <div className='mt-2'>
          <ResizableTextarea
            name='description'
            id='description'
            value={formData.description}
            onChange={(e) => handleChange(e, 150)}
            className='min-h-[128px] resize-none input-ui'
            placeholder='Provide a brief description about your product'
          />
        </div>
      </div>

      <div>
        <MultiSelect
          data={goalsOption}
          label='Related SDG Goals'
          emptyText='Select SDG Goals'
          onSelectionChange={(selected: string[]) => setFormData({ ...formData, goals: selected })}
        />
      </div>

      <div className={colorMode === 'light' ? 'light-calendar' : 'dark-calendar'}>
        <label htmlFor='startDate' className='block text-sm font-medium leading-6 text-black dark:text-white'>
          Start Date
        </label>
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData({ ...formData, startDate: date })}
          className='input-ui mt-2'
          wrapperClassName='w-full'
          dateFormat='MM/dd/yyyy h:mm aa'
          showPopperArrow={false}
          showTimeSelect
          allowSameDay
          placeholderText='Click to select date'
        />
      </div>

      <div className={colorMode === 'light' ? 'light-calendar' : 'dark-calendar'}>
        <label htmlFor='endDate' className='block text-sm font-medium leading-6 text-black dark:text-white'>
          End Date
        </label>
        <DatePicker
          selected={formData.endDate}
          onChange={(date) => setFormData({ ...formData, endDate: date })}
          className='input-ui mt-2'
          wrapperClassName='w-full'
          dateFormat='MM/dd/yyyy h:mm aa'
          showPopperArrow={false}
          showTimeSelect
          allowSameDay
          placeholderText='Click to select date'
        />
      </div>

      <div>
        <Switch.Group as='div' className='flex items-center justify-between'>
          <span className='flex flex-grow flex-col'>
            <Switch.Label as='span' className='text-sm font-medium leading-6 text-black dark:text-white' passive>
              Is Online?
            </Switch.Label>
            <Switch.Description as='span' className='text-sm text-zinc-500'>
              Is your action happening online?
            </Switch.Description>
          </span>
          <Switch
            checked={formData.isOnline}
            onChange={(e) => setFormData({ ...formData, isOnline: e })}
            className={clsx(
              formData.isOnline ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-800',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ring-offset-zinc-100 dark:ring-offset-zinc-900'
            )}
          >
            <span
              aria-hidden='true'
              className={clsx(
                formData.isOnline ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
        </Switch.Group>
      </div>

      {formData.isOnline ? (
        <div>
          <label htmlFor='onlineLink' className='block text-sm font-medium leading-6 text-black dark:text-white'>
            Online event Link
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='onlineLink'
              id='onlineLink'
              value={formData.onlineLink}
              onChange={handleChange}
              required
              className='input-ui'
              placeholder='Website link where participants can join'
            />
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor='location' className='block text-sm font-medium leading-6 text-black dark:text-white'>
            Location
          </label>
          <div className='mt-2'>
            <input
              type='text'
              name='location'
              id='location'
              value={formData.location}
              onChange={handleChange}
              required
              className='input-ui'
              placeholder='Where is your action happening?'
            />
          </div>
        </div>
      )}

      <Button type='button' variant='green' className='px-5 w-full' onClick={createAction}>
        Create Action
      </Button>
    </div>
  )
}

export default ActionForm
