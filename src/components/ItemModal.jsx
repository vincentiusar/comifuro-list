import React, { useState } from 'react'
import MerchModal from './MerchModal';
import { useDispatch, useSelector } from 'react-redux';
import { saveBarang } from '../redux/sliceBarang';
import { toast } from 'react-toastify';

function ItemModal({setHidden}) {

    const barang = useSelector(state => state.barang.barang.items);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        id: null,
        nama: null,
        nomor: null,
        fotoToko: null,
        fotoNamecard: null,
        totalCost: 0,
        items: [],
    });

    const [merch, setMerch] = useState({
        tipeItem: 'ganci',
        price: 15000,
        foto: null,
    });

    const toCurrency = (e) => {
        let res = "";

        for (let i = e.length - 1, j = 0; i >= 0; j++, i--) {
            if (j % 3 === 0) res = ' ' + res;
            res = e[i] + res;
        }
        return res;
    }

    const getBase64Image = async (img) => {
        const reader = new FileReader();
        let res = null;

        await new Promise((resolve, reject) => {
            reader.onload = async () => {
                res = reader.result;
                resolve(res);
            };
            reader.readAsDataURL(img.files[0]);
        });

        return res;
    }

    const handleChange = async (e) => {
        if (e.target.name === 'fotoToko' || e.target.name === 'fotoNamecard') {
            const imgData = await getBase64Image(e.target);
            setData({...data, [e.target.name]: imgData});
            return;
        }

        setData({...data, [e.target.name]: e.target.value});
    }

    const handleCancel = () => {
        const e = {...data};
        let hasInput = false;
        Object.entries(e).forEach(item => {
            if (item[1] && item[0] !== 'totalCost' && item[0] !== 'items') {
                hasInput = true;
            }
            if (item[0] === 'items' && item[1].length !== 0) {                
                hasInput = true;
            }
        });

        if (hasInput) {
            const confirm = window.confirm('want to go back?');
            if (confirm) setHidden(false);
        } else setHidden(false);
    }

    const handleItemModal = () => {
        setShowModal(!showModal);
    }

    const handleSubmit = () => {
        const confirm = window.confirm('confirm?');
        if (!confirm) return;

        const e = [...barang];
        e.push(data);

        dispatch(saveBarang(e));
        setHidden(false);
        toast.success("Toko Added!");
    }

    return (
        <>
            <div id="static-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 w-5/6 z-50 justify-center items-center h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add Store
                            </h3>
                            <button onClick={handleCancel} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4 flex flex-col items-start">
                            <div className='flex flex-col items-start gap-3'>
                                <label>Foto Toko: </label>
                                <input name='fotoToko' onChange={handleChange} accept='image/*' capture='user' className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" required type="file" />
                                <img src={data.fotoToko}></img>
                            </div>
                            <div className='flex flex-col items-start gap-3'>
                                <label>Foto Namecard: </label>
                                <input name='fotoNamecard' onChange={handleChange} accept='image/*' capture='user' className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" required type="file" />
                                <img src={data.fotoNamecard}></img>
                            </div>
                            <div className='flex items-center gap-3'>
                                <label>Nama: </label>
                                <input name='nama' type="text" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Allenerie" required />
                            </div>
                            <div className='flex items-center gap-3'>
                                <label>No: </label>
                                <input name='nomor' type="text" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="AB-40" required />
                            </div>
                            <div className='flex flex-col w-full items-start gap-3'>
                                <label>Items: </label>
                                <div className='w-full border'>
                                    {data.items.map((item, key) => (
                                        <div className='grid grid-cols-11 items-center' key={key}>
                                            <p className='col-span-1'>{key+1}</p>
                                            <img className='col-span-4' src={item.foto} />
                                            <p className='col-span-2'>{item.tipeItem}</p>
                                            <p className='col-span-4'>Rp{toCurrency(item.price.toString())},-</p>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={handleItemModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    ADD ITEM
                                </button>
                                {showModal ? (<MerchModal data={merch} setData={setMerch} setHidden={setShowModal} mainData={data} setMainData={setData} />) : ""}
                            </div>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={handleSubmit} data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                            <button onClick={handleCancel} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed top-0 left-0 w-screen h-screen bg-black opacity-40'></div>
        </>
    )
}

export default ItemModal;