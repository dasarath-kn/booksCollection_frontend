import React, { useEffect, useState } from 'react';
import { books, deleteBooks } from '../Api/BooksApi';
import Header from '../Header';
import Addbook from './Addbook';
import toast, { Toaster } from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';
import BookDetails from './BookDetails';

const Books = () => {
    const [booksdata, setBooksdata] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetails, setShowDetails] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [selected, setSelected] = useState({})
    const [selectedId, setSelectedId] = useState("")

    const addBooks = () => {
        setShowModal(true);
    };

    const handleModal = (value) => {
        setShowModal(value);
    };

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await books();
                if (response.data) {
                    setBooksdata(response.data.bookData);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchBooks();
    }, [showModal]);

    const handleConfirmModal = () => {
        setConfirm(!confirm)
    }
    const handleDeleteBook = async (id) => {
        try {
            setBooksdata(booksdata.filter((book) => book._id !== id));
            const response = await deleteBooks(id);
            if (response.data) {
                setConfirm(!confirm)
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleViewmore = (value) => {
        setShowDetails(true)
        setSelected(value)
    }
    const handleBookdetailsModal = (value) => {
        setShowDetails(value)
    }

    return (
        <>
            <Header />
            <div className="flex justify-between items-center p-4 flex-col sm:flex-row lg:w-2/3 lg:ml-48">
                <button
                    onClick={addBooks}
                    className="border-2 border-gray-400 text-black font-bold py-2 px-4 rounded shadow-md flex items-center justify-center w-full sm:w-auto"
                >
                    <FaPlus className="mr-2" /> Add Book
                </button>
            </div>
            <div className="container mx-auto p-4">
                {booksdata.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg font-semibold">
                        No books available. Add some to get started!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {booksdata.map((val) => (
                            <div key={val._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <img
                                    className="w-full h-72 object-cover"
                                    src={val.coverimgurl}
                                    alt={`Cover of ${val.bookname}`}
                                />
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-2">{val.bookname}</h2>
                                    <p className="text-gray-600 italic mb-2">by {val.authorname}</p>
                                    <p className="text-gray-700 text-base mb-4">{val.description}</p>
                                    <ul className="text-sm text-gray-600 mb-4">
                                        <li><strong>Publication Year:</strong> {val.publicationyear}</li>
                                        <li><strong>Pages:</strong> {val.pages}</li>
                                        <li><strong>Language:</strong> {val.language}</li>
                                        <li><strong>Publisher:</strong> {val.publisher}</li>
                                    </ul>
                                    <div className="flex flex-col space-y-2">
                                        <button onClick={() => handleViewmore(val)}
                                            className="w-full bg-gray-400 hover:text-black text-white font-bold py-2 px-4 rounded shadow-md flex items-center justify-center"
                                        >
                                            View More
                                        </button>
                                        <button
                                            onClick={() => { handleConfirmModal(), setSelectedId(val._id) }}
                                            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md flex items-center justify-center"
                                        >
                                            <FaTrash className="mr-2" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}



                {confirm && <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow ">
                            <button onClick={handleConfirmModal} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center " data-modal-hide="popup-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-4 md:p-5 text-center">
                                <svg class="mx-auto mb-4 text-gray-500 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-gray-900 ">Are you sure you want to delete this book?</h3>
                                <button onClick={() => handleDeleteBook(selectedId)} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={handleConfirmModal} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div>}


                {showDetails && <BookDetails selectedBook={selected} handleModal={handleBookdetailsModal} />}
                {showModal && <Addbook handleStatus={handleModal} />}
                <Toaster position="top-right" reverseOrder={false} />
            </div>
        </>
    );
};

export default Books;
