import React, { useRef, useState } from 'react'
import ContactCard from '../ContactCard/ContactCard';

const ContactForm = () => {

    const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("Upload Profile Image");
    const [preview, setPreview] = useState(null);

    const [data, setData] = useState(localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : []);


    function handleFileClick() {
        fileInputRef.current.click();
    }

    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            // setPreview(URL.createObjectURL(selectedFile));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // reader.result = Base64 string
            }
            reader.readAsDataURL(selectedFile);
        } else {
            setFileName("Upload Profile Image");
            setPreview(null);
        }   
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newContact = [...data, { name, phone, image: preview }];
        setData(newContact);

        localStorage.setItem("contacts", JSON.stringify(newContact));

        setPreview(null);
        setFileName("Upload Profile Image");
        setName("");
        setPhone("");
        console.log(name, phone, preview, fileName);
    }

    return (
        <div className='w-full flex flex-col items-center gap-10'>
            <form onSubmit={handleSubmit} className='flex flex-col flex-wrap w-full justify-center items-center gap-4 bg-(--bg-card) p-4 rounded-lg  mt-5 border-2 border-(--btn-main)'>
                <h2 className='text-(--text-main) text-3xl font-semibold' >Add Contact</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center w-full items-start'>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text" placeholder='Name' 
                        className='mb-2 p-2 rounded border border-(--btn-main) w-full outline-(--btn-main)' />
                    <input
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        type="tel" placeholder='Phone' className='mb-2 p-2 rounded border border-(--btn-main) w-full outline-(--btn-main)' />
                    <input
                        type="file" name="" id="inputFile" className='mb-2 p-2 rounded border border-(--btn-main) w-full hidden' ref={fileInputRef} onChange={handleFileChange} />
                    <div 
                    className="mb-2 p-2 rounded border border-(--btn-main) w-full cursor-pointer outline-(--btn-main) hover:bg-(--btn-main)/10"
                        onClick={handleFileClick}>{fileName}</div>
                    <button type="submit" className='w-full bg-(--btn-main) text-(--btn-sec) px-4 py-2 rounded hover:bg-(--text-main)/80 hover:text-(--bg-main) transition-all duration-300 cursor-pointer'>Add Contact</button>
                </div>
                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="w-40 h-40 rounded-full object-cover bg-(--btn-main)/20 border-4 border-(--btn-main)/20 overflow-hidden hover:border-(--btn-main) hover:scale-110 transition-all duration-500"
                    />
                )}
            </form>
        </div>
    )
}

export default ContactForm
