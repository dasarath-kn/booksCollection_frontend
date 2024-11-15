import React from 'react'
import { format } from 'date-fns';
const BookDetails = ({ selectedBook, handleModal }) => {
    const handleCloseModal = () => {
        handleModal(false)
    }
    return (
        <>
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/3 p-6 relative">

                    {selectedBook && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">{selectedBook.bookname}</h2>
                            <img
                                className="w-full h-96 object-cover mb-4"
                                src={selectedBook.coverimgurl}
                                alt={`Cover of ${selectedBook.bookname}`}
                            />
                            <p className="text-gray-600 italic mb-2">by {selectedBook.authorname}</p>
                            <p className="text-gray-700 text-base mb-4">{selectedBook.description}</p>
                            <ul className="text-sm text-gray-600 mb-4">
                                <li><strong>Publication Year:</strong> {selectedBook.publicationyear}</li>
                                <li><strong>Pages:</strong> {selectedBook.pages}</li>
                                <li><strong>Language:</strong> {selectedBook.language}</li>
                                <li><strong>Publisher:</strong> {selectedBook.publisher}</li>
                                <li><strong>Created At:</strong> {format(new Date(selectedBook.createdat), "MMMM dd, yyyy, hh:mm:ss a")}</li>
                            </ul>
                            <button
                                onClick={handleCloseModal}
                                className="w-full bg-black hover:border-2 hover:bg-white hover:border-gray-200 hover:text-black text-white font-bold py-2 px-4 rounded shadow-md"
                            >
                                Close
                            </button>
                        </>
                    )}
                </div>
            </div>

        </>
    )
}

export default BookDetails
