import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import ContactForm from './Components/ContactForm/ContactForm'

const App = () => {
  return (
    <div className='w-full min-h-screen bg-(--btn-main)/30 p-4'>
      <Navbar />
      <ContactForm />
    </div>
  )
}

export default App
