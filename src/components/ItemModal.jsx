import React, { useEffect, useState } from 'react'
import MerchModal from './MerchModal';
import { useDispatch, useSelector } from 'react-redux';
import { saveBarang } from '../redux/sliceBarang';
import { toast } from 'react-toastify';

function ItemModal({ setHidden }) {

    const barang = useSelector(state => state.barang.barang.items);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentAction, setCurrentAction] = useState(false);
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
        id: Number(new Date()),
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

    const getBase64Image = async (image) => {
        const reader = new FileReader();
        let res = null;

        await new Promise((resolve, reject) => {
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const maxWidth = 1200;
                    const scaleFactor = maxWidth / img.width;
                    canvas.width = maxWidth;
                    canvas.height = img.height * scaleFactor;

                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const quality = 1;
                    res = canvas.toDataURL("image/jpeg", quality)
                    // var stringLength = res.length - 'data:image/png;base64,'.length;
                    // var sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
                    // var sizeInKb = sizeInBytes/1000;
                    // console.log("SIZE: ", sizeInKb);

                    resolve(res);
                };
            };
            reader.readAsDataURL(image.files[0]);
        });

        return res;
    }

    const handleChange = async (e) => {
        if (e.target.name === 'fotoToko' || e.target.name === 'fotoNamecard') {
            const imgData = await getBase64Image(e.target);
            setData({ ...data, [e.target.name]: imgData });
            return;
        }

        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleCancel = () => {
        const e = { ...data };
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

    const handleDelete = async (id) => {
        const confirm = await window.confirm(`delete item`);
        if (!confirm) return;

        const d = { ...data };
        let x = 0;
        for (let i = 0; i < d.items.length; i++) {
            if (d.items[i].id === Number(id)) {
                x = i;
                break;
            }
        }
        d.items.splice(x, 1);
        setData(d);
    }

    const handleSubmit = () => {
        const confirm = window.confirm('confirm?');
        if (!confirm) return;

        const e = [...barang];
        const d = { ...data };
        d.id = Number(new Date());
        e.unshift(d);

        dispatch(saveBarang(e));
        setHidden(false);
        toast.success("Toko Added!", {
            position: "bottom-center",
            autoClose: 2000
        });
    }

    const toggleCurrentStatus = () => {
        setCurrentAction(!currentAction);
    }

    const handleEditMerch = (e) => {
        setShowEditModal(true);
        setMerch(e);
    }

    useEffect(() => {
        if (!showEditModal) {
            setMerch({
                id: Number(new Date()),
                tipeItem: 'ganci',
                price: 15000,
                foto: null,
            });
        }
    }, [showEditModal]);

    return (
        <>
            <div id="static-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-14 w-5/6 z-50 justify-center items-center h-5/6 rounded-lg">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="sticky top-0 bg-gray-700 flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add Store
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
                                <img src={data.fotoToko}></img>
                            </div>
                            <div className='flex flex-col items-start gap-3 w-full'>
                                <label>Foto Namecard: </label>
                                <div className='flex items-center justify-evenly w-full'>
                                    <label className='cursor-pointer'>
                                        <input type="file" name='fotoNamecard' onChange={handleChange} accept='image/*' capture='user' className='hidden' />
                                        <span className="border px-7 py-2 w-full rounded-lg bg-blue-700 font-semibold">Camera</span>
                                    </label>
                                    <label className='cursor-pointer'>
                                        <input type="file" name='fotoNamecard' onChange={handleChange} accept='image/*' className='hidden' />
                                        <span className="border px-4 py-2 rounded-lg bg-green-700 font-semibold">Upload File</span>
                                    </label>
                                </div>

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
                                <div className='w-full flex flex-col gap-3 border p-0.5'>
                                    <div className='grid grid-cols-11 items-center font-bold border'>
                                        <p className='col-span-1'>No.</p>
                                        <p className='col-span-3'>Foto</p>
                                        <p className='col-span-2'>Tipe</p>
                                        <p className='col-span-4'>Harga</p>
                                        <p className='col-span-1'></p>
                                    </div>
                                    {data.items.map((item, key) => (
                                        <div className='grid grid-cols-11 items-center gap-3' key={key}>
                                            <img className='col-span-3' src={item.foto} />
                                            <p className='col-span-2'>{item.tipeItem}</p>
                                            <p className='col-span-4'>Rp{toCurrency(item.price.toString())},-</p>
                                            {!currentAction ? (
                                                <button onClick={() => handleDelete(item.id)} type="button" className={`col-span-2 w-fit p-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-1`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button onClick={() => handleEditMerch(item)} type="button" className={`col-span-2 w-fit p-2 focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm py-1`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <button onClick={() => setShowModal(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        ADD ITEM
                                    </button>
                                    <button onClick={toggleCurrentStatus} type="button" className={`text-white ${!currentAction ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300' : 'bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300'} font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>
                                        {!currentAction ? 'EDIT' : 'DELETE'}
                                    </button>
                                </div>
                                {showModal ? (<MerchModal data={merch} setData={setMerch} setHidden={setShowModal} mainData={{ ...data }} setMainData={setData} />) : ""}
                                {showEditModal ? (<MerchModal data={merch} setData={setMerch} setHidden={setShowEditModal} mainData={{ ...data }} setMainData={setData} isEdit={true} />) : ""}
                            </div>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={handleSubmit} data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                            <button onClick={handleCancel} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => setHidden(false)} className='fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-40'></div>
        </>
    )
}

export default ItemModal;