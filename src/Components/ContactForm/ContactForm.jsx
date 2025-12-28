import React, { useRef, useState } from 'react'
import ContactCard from '../ContactCard/ContactCard';

const ContactForm = () => {

    const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("Upload Profile Image");
    const [preview, setPreview] = useState(null);
    const [modal, setModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("Please fill in all required fields.");

    const [data, setData] = useState(localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts")) : []);

    function handlePhoneChange(e) {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPhone(value);
    }

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
                setPreview(reader.result); // Base64 string
            }
            reader.readAsDataURL(selectedFile);
        } else {
            setFileName("Upload Profile Image");
            setPreview(null);
        }
    }

    const deleteHandler = (index) => {
        const copyUser = [...data];
        copyUser.splice(index, 1);
        setData(copyUser);
        localStorage.setItem("contacts", JSON.stringify(copyUser));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (name.trim() === "") {
            setModal(true);
            setErrorMsg("Name is required.");
            return;
        }
        if (phone.trim() === "") {
            setModal(true);
            setErrorMsg("Phone number is required.");
            return;
        }

        const newContact = [...data, { name, phone, image: preview }];
        setData(newContact);

        localStorage.setItem("contacts", JSON.stringify(newContact));

        setPreview(null);
        setFileName("Upload Profile Image");
        setName("");
        setPhone("");
        fileInputRef.current.value = "";
    }

    return (
        <div className='w-full flex flex-col items-center gap-4'>
            <form onSubmit={handleSubmit} className='flex flex-col flex-wrap w-full justify-center items-center gap-4 bg-(--bg-card) p-4 rounded-lg  mt-5 border-2 border-(--btn-main)'>
                <h2 className='text-(--text-main) text-xl sm:text-2xl md:text-3xl font-semibold' >Add Contact</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center w-full items-start'>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text" placeholder='Name'
                        className='mb-2 p-2 rounded border border-(--btn-main) w-full outline-(--btn-main)' />
                    <input
                        onChange={handlePhoneChange}
                        value={phone}
                        type="tel" placeholder='Phone Number' className='mb-2 p-2 rounded border border-(--btn-main) w-full outline-(--btn-main)' />
                    <input
                        type="file" name="" id="inputFile" className='mb-2 p-2 rounded border border-(--btn-main) w-full hidden' ref={fileInputRef} onChange={handleFileChange} />
                    <div
                        className="mb-2 p-2 truncate rounded border border-(--btn-main) w-full cursor-pointer outline-(--btn-main) hover:bg-(--btn-main)/10"
                        onClick={handleFileClick}>{fileName}</div>
                    <button type="submit" className='w-full bg-(--btn-main) text-(--btn-sec) px-4 py-2 rounded hover:bg-(--btn-sec)/80 hover:text-(--bg-main) transition-all duration-300 cursor-pointer'>Add Contact</button>
                </div>
                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="w-40 h-40 rounded-full object-cover bg-(--btn-main)/40 border-4 border-(--btn-main) overflow-hidden hover:scale-110 transition-all duration-500"
                    />
                )}
            </form>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
                {data.length > 0 && (
                    data.map((contact, idx) => (
                        <ContactCard key={idx} name={contact.name} phone={contact.phone} image={contact.image} onDelete={() => deleteHandler(idx)} />
                    ))
                )}
            </div>

            <div>
                {data.length === 0 && (
                    <h2 className='text-(--text-main) text-2xl font-semibold mt-10'>No contacts available. Please add some contacts.</h2>
                )}
            </div>

            {/* Modal for errors */}
            {modal && (
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-(--bg-main)/50 backdrop-blur-sm transition-all duration-300'>
                    <div className='flex flex-col bg-(--bg-card) p-6 rounded-lg shadow-lg border-2 border-(--btn-main)'>
                        <h2 className='text-(--text-main) text-xl font-semibold mb-4'>Alert</h2>
                        <p className='text-(--text-sec) mb-4'>{errorMsg}</p>
                        <button
                            className='bg-(--btn-main) text-(--btn-sec) px-4 py-2 rounded hover:bg-(--text-main)/80 hover:text-(--bg-main) cursor-pointer transition-all duration-300'
                            onClick={() => setModal(false)}
                        >Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContactForm
