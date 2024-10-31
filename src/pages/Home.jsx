import React, { useEffect, useState } from 'react'
import ItemModal from '../components/ItemModal';
import { useSelector } from 'react-redux';
import ItemCard from '../components/ItemCard';

function Home() {
    const barang = useSelector(state => state.barang.barang.items);

    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showWishlistModal, setShowWishlistModal] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const handleModal = () => {
        setShowModal(!showModal);
    }

    const handleWishlistModal = () => {
        setShowWishlistModal(!showWishlistModal);
    }

    useEffect(() => {
        let x = 0;
        barang.map(item => {
            x += item.totalCost
        });
        setTotal(toCurrency(x.toString()));
        setData(barang);
    }, [data, barang]);

    const toCurrency = (e) => {
        let res = "";

        for (let i = e.length - 1, j = 0; i >= 0; j++, i--) {
            if (j % 3 === 0) res = ' ' + res;
            res = e[i] + res;
        }
        return res;
    }

    return (
        <div className='m-auto text-center h-full'>
            <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                    <button onClick={() => setCurrentPage(1)} type="button" className={`inline-flex flex-col items-center justify-center px-5 ${currentPage === 1 ? 'bg-gray-50' : ''} ${currentPage === 1 ? "dark:bg-gray-800" : ""} group`}>
                        <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                            <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Checked Out</span>
                    </button>
                    <button onClick={() => setCurrentPage(2)} type="button" className={`inline-flex flex-col items-center justify-center px-5 ${currentPage === 2 ? 'bg-gray-50' : ''} ${currentPage === 2 ? "dark:bg-gray-800" : ""} group`}>
                        <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group:text-blue-600 dark:group-hover:text-blue-500">Wishlist</span>
                    </button>
                </div>
            </div>
            {currentPage === 1 ? (
                <div className='relative flex flex-col items-center h-full'>
                    <div className='flex flex-col items-center p-6 fixed z-30 bg-[#242424] w-full'>
                        <div className='flex flex-col items-center'>
                            <button type="button" onClick={handleModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                ADD STORE
                            </button>
                            <p className='text-xl font-thin'>Total Spend</p>
                            <p className='font-semibold text-2xl'>Rp. {total},-</p>
                        </div>
                    </div>
                    <div className='flex flex-col pb-36 px-8 overflow-y-auto items-center h-full w-full gap-9 pt-44 absolute'>
                        {data.length !== 0 ? data?.map((item, key) => (
                            <ItemCard key={key} barang={item} id={key} />
                        )) : ''}
                    </div>
                    {showModal ? (<ItemModal setHidden={setShowModal} />) : ""}
                </div>
            ) : (
                <>
                    <div className='flex flex-col items-center'>
                        <div className='flex items-center'>
                            <button type="button" onClick={handleWishlistModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                ADD Wishlist
                            </button>
                        </div>
                        <p>Search</p>
                    </div>
                    <div className='flex flex-col items-center w-full gap-9'>
                        
                    </div>
                    {showWishlistModal ? 'sementara' : ''}
                </>
            )}
        </div>
    )
}

export default Home;