import React from 'react'
import profileImage from '../../assets/profile.png'

const ContactCard = ({ name, phone, image, onDelete }) => {
    return (
        <div className='flex flex-col bg-(--bg-card) hover:bg-(--bg-main) p-4 rounded-lg shadow-lg gap-4 w-full overflow-hidden hover:scale-105 transition-all duration-300 border-2 border-(--btn-main)'>
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between sm:gap-4 ">
                <div className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer rounded-full bg-(--btn-main)/20 border-4 border-(--btn-main)/20 overflow-hidden hover:border-(--btn-main) hover:scale-110 transition-all duration-500">
                    <img
                        src={image ? image : profileImage}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-lg sm:text-xl tracking-wider font-medium text-(--text-main) wrap-break-word">{name}</h2>
                    <p className="text-sm sm:text-xs lg:text-sm tracking-widest font-medium text-(--text-main) mt-1 wrap-break-word">{phone}</p>
                </div>
            </div>
            <button onClick={onDelete} className="bg-(--btn-main) text-(--btn-sec) px-4 py-2 rounded active:scale-95 hover:bg-(--btn-sec)/80 hover:text-(--bg-main) transition-all duration-300 cursor-pointer">Delete</button>
        </div>
    )
}

export default ContactCard
