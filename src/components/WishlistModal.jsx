import React, { useState } from 'react'

function WishlistModal({setHidden}) {

    const [data, setData] = useState({
        id: null,
        nama: null,
        nomor: null,
        fotoToko: null,
        fotoNamecard: null,
        totalCost: 0,
        items: [],
    });

    const handleChange = (e) => {
        
    }

    const handleCancel = () => {
        setHidden(false);
    }

    return (
        <>
            <div id="static-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-14 w-5/6 z-50 justify-center items-center h-5/6 rounded-lg">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="sticky top-0 bg-gray-700 flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add Wishlist
                            </h3>
                            <button onClick={handleCancel} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4 flex flex-col items-start">
                            <div className='flex flex-col items-start gap-3 w-full'>
                                <label>Foto Toko: </label>
                                <div className='flex items-center justify-evenly w-full'>
                                    <label className='cursor-pointer'>
                                        <input type="file" name='fotoToko' onChange={handleChange} accept='image/*' capture='user' className='hidden' />
                                        <span className="border px-7 py-2 w-full rounded-lg bg-blue-700 font-semibold">Camera</span>
                                    </label>
                                    <label className='cursor-pointer'>
                                        <input type="file" name='fotoToko' onChange={handleChange} accept='image/*' className='hidden' />
                                        <span className="border px-4 py-2 rounded-lg bg-green-700 font-semibold">Upload File</span>
                                    </label>
                                </div>
                                <img></img>
                            </div>
                            <div className='flex flex-col items-start gap-3 w-full'>
                                <label>Foto Namecard: </label>
                            </div>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                            <button onClick={handleCancel} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => setHidden(false)} className='fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-40'></div>
        </>
    )
}

export default WishlistModal;