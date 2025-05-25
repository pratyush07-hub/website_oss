import React from 'react'
import InteractiveDots from '../components/InteractiveDots'

const HomePage = () => {
  return (
    <div className='w-full h-screen bg-black relative'>
      <InteractiveDots />
      <div className='flex justify-center items-center w-full h-full absolute inset-0 z-10'>
        <h1 className='text-6xl text-center w-2/3 text-[#edf1eb] capitalize font-extrabold'>open source software research & development center</h1>
      </div>
    </div>
  )
}

export default HomePage
