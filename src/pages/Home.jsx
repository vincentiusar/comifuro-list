import React, { useEffect, useRef, useState } from 'react'
import ItemModal from '../components/ItemModal';
import { useSelector } from 'react-redux';
import ItemCard from '../components/ItemCard';
import WishlistModal from '../components/WishlistModal';
import ExportModal from '../components/ExportModal';
import { useNavigate } from 'react-router-dom';

function Home() {
    const barang = useSelector(state => state.barang.barang.items);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showWishlistModal, setShowWishlistModal] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState([]);
    const ref1 = useRef();

    const handleModal = () => {
        setShowModal(!showModal);
    }

    const handleWishlistModal = () => {
        setShowWishlistModal(!showWishlistModal);
    }

    useEffect(() => {
        setSearch([...barang]);
    }, []);

    useEffect(() => {
        let x = 0;
        barang.map(item => {
            x += item.totalCost
        });
        setTotal(toCurrency(x.toString()));
        setData(barang);
        setSearch(barang);
        ref1.current.value = "";
    }, [data, barang]);

    const toCurrency = (e) => {
        let res = "";

        for (let i = e.length - 1, j = 0; i >= 0; j++, i--) {
            if (j % 3 === 0) res = ' ' + res;
            res = e[i] + res;
        }
        return res;
    }

    const handleSearch = (e) => {
        const res = data.filter(item => {
            if (!item.nama && e.target.value === "") return item;
            if (item.nama && (item.nama.toLowerCase()).includes(e.target.value?.toLowerCase())) {
                return item;
            }
            if (item.nomor && (item.nomor.toLowerCase()).includes(e.target.value?.toLowerCase())) {
                return item;
            }
        })
        setSearch(res);
    }

    const handleExportModal = () => {
        setShowExportModal(true);
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
                            <div className='flex items-center gap-3'>
                                <button type="button" onClick={handleModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    ADD STORE
                                </button>
                                <button type="button" onClick={handleExportModal} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none">
                                    Export
                                </button>
                                <button type="button" onClick={() => navigate('/import')} className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none">
                                    Import
                                </button>
                            </div>
                            <p className='text-xl font-thin'>Total Spend</p>
                            <p className='font-semibold text-2xl'>Rp. {total},-</p>
                        </div>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input ref={ref1} onInput={handleSearch} type="search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        </div>
                        <img src='./logocf.png' className='bg-white p-4 w-full absolute -z-10 opacity-5' />
                    </div>
                    <div className='flex flex-col pb-36 px-8 overflow-y-auto items-center h-full w-full gap-9 pt-48 absolute'>
                        {search.length !== 0 ? search?.map((item, key) => (
                            <ItemCard key={key} barang={item} id={key} />
                        )) : ''}
                    </div>
                    {showModal ? (<ItemModal setHidden={setShowModal} />) : ""}
                    {showExportModal ? (<ExportModal setHidden={setShowExportModal} />) : ""}
                </div>
            ) : (
                <div className='relative flex flex-col items-center h-full'>
                    <div className='flex flex-col items-center p-6 fixed z-30 bg-[#242424] w-full'>
                        <div className='flex items-center'>
                            <button type="button" onClick={handleWishlistModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                ADD Wishlist
                            </button>
                        </div>
                        <p>Search</p>
                        <input type='text' />
                        <img src='./logocf.png' className='bg-white p-4 w-full absolute -z-10 opacity-5' />
                    </div>
                    <div className='flex flex-col pb-36 px-8 overflow-y-auto items-center h-full w-full gap-9 pt-36 absolute'>
                        {showWishlistModal ? <WishlistModal setHidden={handleWishlistModal} /> : ''}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;