import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-(--bg-card) backdrop-blur-3xl p-4 shadow-md rounded-lg'>
      <div>
        <h1 className='text-2xl sm:text-3xl text-(--text-main) font-semibold'>BuddyBook</h1>
      </div>
        <div className='hidden sm:flex gap-4'>
            <a href="#" className='bg-(--btn-main) text-(--text-sec) px-4 py-2 rounded hover:bg-(--btn-sec)/80 hover:text-(--bg-main) transition-all duration-300'>Home</a>
            <a href="#" className='bg-(--btn-main) text-(--text-sec) px-4 py-2 rounded hover:bg-(--btn-sec)/80 hover:text-(--bg-main) transition-all duration-300'>All Contacts</a>
            <a href="#" className='bg-(--btn-main) text-(--text-sec) px-4 py-2 rounded hover:bg-(--btn-sec)/80 hover:text-(--bg-main) transition-all duration-300'>About us</a>
        </div>
    </div>
  )
}

export default Navbar
