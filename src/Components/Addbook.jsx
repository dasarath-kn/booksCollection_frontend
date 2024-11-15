import { useFormik } from 'formik'
import React, { useState } from 'react'
import { addBook } from '../Api/BooksApi'
import ValidationSchema from '../validation/ValidationSchema'
import { AiOutlineClose } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

const Addbook = ({ handleStatus }) => {
    const [loading, setLoading] = useState(false)
    const closeForm = () => {
        handleStatus(false)
    }

    const [imagePreview, setImagePreview] = useState(null)

    const {
        values,
        handleChange,
        handleReset,
        handleBlur,
        handleSubmit,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            bookname: '',
            authorname: '',
            description: '',
            publicationyear: '',
            pages: '',
            language: '',
            publisher: '',
            image: '',
        },
        validationSchema: ValidationSchema,
        onSubmit: async (data) => {
            try {
                setLoading(true)
                const formData = new FormData()
                Object.keys(data).forEach((key) => {
                    if (key !== 'image' && data[key]) {
                        formData.append(key, data[key])
                    }
                })

                if (imagePreview) {
                    formData.append('image', imagePreview)
                }

                const response = await addBook(formData)
                if (response.data) {
                    toast.success(response.data.message)
                    handleReset()
                    setImagePreview(null)
                    handleStatus(false)
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error during form submission:', error)
            }
        }
    })

    const handleImageChange = (e) => {
        setImagePreview(e.target.files[0])
    }

    const removeImage = () => {
        setImagePreview(null)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full overflow-y-auto max-h-[80vh]">
                <h2 className="text-2xl font-semibold mb-4">Book Details</h2>
                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Book Name</label>
                            <input
                                type="text"
                                name="bookname"
                                value={values.bookname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-1 p-2 border w-full rounded"
                            />
                            {touched.bookname && errors.bookname && (
                                <div className="text-red-500 text-sm">{errors.bookname}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Author Name</label>
                            <input
                                type="text"
                                name="authorname"
                                value={values.authorname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-1 p-2 border w-full rounded"
                            />
                            {touched.authorname && errors.authorname && (
                                <div className="text-red-500 text-sm">{errors.authorname}</div>
                            )}
                        </div>

                        <div className="mb-4 col-span-2">
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-1 p-2 border w-full rounded"
                            />
                            {touched.description && errors.description && (
                                <div className="text-red-500 text-sm">{errors.description}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Publication Year</label>
                            <input
                                type="number"
                                name="publicationyear"
                                value={values.publicationyear}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-1 p-2 border w-full rounded"
                            />
                            {touched.publicationyear && errors.publicationyear && (
                                <div className="text-red-500 text-sm">{errors.publicationyear}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Pages</label>
                            <input
                                type="number"
                                name="pages"
                                value={values.pages}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-1 p-2 border w-full rounded"
                            />
                            {touched.pages && errors.pages && (
                                <div className="text-red-500 text-sm">{errors.pages}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Language</label>
                            <input
                                type="text"
                                name="language"
                                value={values.language}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-1 p-2 border w-full rounded"
                            />
                            {touched.language && errors.language && (
                                <div className="text-red-500 text-sm">{errors.language}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium">Publisher</label>
                            <input
                                type="text"
                                name="publisher"
                                value={values.publisher}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="mt-1 p-2 border w-full rounded"
                            />
                            {touched.publisher && errors.publisher && (
                                <div className="text-red-500 text-sm">{errors.publisher}</div>
                            )}
                        </div>
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium">Book Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 p-2 border w-full rounded"
                            required
                        />
                      
                    </div>

                    {imagePreview && (
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium">Image Preview:</label>
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(imagePreview)}
                                    alt="Image Preview"
                                    className="mt-1 max-w-xs max-h-40 object-contain rounded mx-auto"
                                />
                                <AiOutlineClose
                                    className="absolute top-0 right-0 w-6 h-6 text-red-500 cursor-pointer"
                                    onClick={removeImage}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end mt-4">
                        {!loading && (<> <button
                            type="button"
                            onClick={closeForm}
                            className="px-4 py-2 mr-2 bg-gray-300 rounded-xl"
                        >
                            Cancel
                        </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-black text-white rounded-xl"
                            >
                                Submit
                            </button></>)}
                        {loading && <button disabled type="button" class="text-white bg-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  dark:focus:ring-black inline-flex items-center">
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            Submiting...
                        </button>}
                    </div>
                </form>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

export default Addbook
