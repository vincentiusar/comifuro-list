import React, { useRef, useState } from 'react'
import ItemCard from '../components/ItemCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Import() {

    const [search, setSearch] = useState([]);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const ref1 = useRef();
    const ref2 = useRef();

    const toCurrency = (e) => {
        let res = "";

        for (let i = e.length - 1, j = 0; i >= 0; j++, i--) {
            if (j % 3 === 0) res = ' ' + res;
            res = e[i] + res;
        }
        return res;
    }

    const onJSONLoaded = async (e) => {
        let d;

        toast.info('loading..', {
            autoClose: 1
        });

        try {
            const reader = new FileReader();
            await new Promise((resolve) => {
                reader.onload = (t) => {
                    d = JSON.parse(t.target.result);
                    resolve();
                }
                reader.readAsText(e.target.files[0]);
            })
    
            ref2.current.value = '';
            let x = 0;
            d.map(item => {
                x += item.totalCost
            });
            setTotal(toCurrency(x.toString()));
            setData(d);
            setSearch(d);
            toast.success('JSON Successfully Loaded', {
                autoClose: 1000
            });
            ref1.current.value = "";
        } catch (e) {
            toast.error("JSON might be invalid", {
                autoClose: 3000
            });
        }
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

    return (
        <>
            <div className='relative flex flex-col items-center h-full'>
                <div className='flex flex-col items-center p-6 fixed z-30 bg-[#242424] w-full'>
                    <div className='flex flex-col items-center'>
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-4'>
                                <label className='cursor-pointer'>
                                    <input ref={ref2} type="file" name='fotoToko' onInput={onJSONLoaded} accept='application/json' className='hidden' />
                                    <span className="px-4 py-2.5 rounded-lg bg-blue-700 font-semibold">Upload File</span>
                                </label>
                                <button type="button" onClick={() => navigate('/')} className="px-4 py-1.5 rounded-lg bg-red-700 font-semibold">
                                    Back to Your List
                                </button>
                            </div>
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
                        <ItemCard key={key} barang={item} viewOnly={true} />
                    )) : ''}
                </div>
            </div>
        </>
    )
}

export default Import;