import React from 'react'
import react from '../../assets/react.svg'

const ContactCard = ({ name, phone, image }) => {
    return (
        <div className="grid grid-cols-2 justify-between items-center bg-(--bg-card) hover:bg-(--bg-main) p-4 rounded-lg shadow-lg gap-2 w-full overflow-hidden hover:scale-105 transition-all duration-300 border-2 border-(--btn-main) cursor-pointer">
            <div className="w-24 h-24 cursor-pointer rounded-full bg-(--btn-main)/20 border-4 border-(--btn-main)/20 overflow-hidden hover:border-(--btn-main) hover:scale-110 transition-all duration-500">
                <img
                    src={image ? image : react}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="text-center">
                <h2 className="text-lg font-bold text-(--text-main) wrap-break-word">{name}</h2>
                <p className="text-lg text-(--text-sec) mt-1 wrap-break-word">{phone}</p>
            </div>
        </div>
    )
}

export default ContactCard
