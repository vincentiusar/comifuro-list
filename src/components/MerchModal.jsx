import React from 'react'
import { toast } from 'react-toastify';

function MerchModal({data, setData, setHidden, mainData, setMainData}) {

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
        if (e.target.name === 'foto') {
            const imgData = await getBase64Image(e.target);
            setData({...data, [e.target.name]: imgData});
            return;
        }
        console.log(e.target.value);

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

    const onSubmit = () => {
        const confirm = window.confirm('confirm?');
        if (!confirm) return;

        const e = {...mainData};
        e.items.push(data);
        e.totalCost = Number(e.totalCost) + Number(data.price);
        setMainData(e);
        setHidden(false);
        setData({ foto: null, tipeItem: null, price: 0 });
        toast.success("Merch Added");
    }

    return (
        <div>
            <div id="static-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 w-5/6 z-50 justify-center items-center h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add Merch
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
                                <label>Foto: </label>
                                <input name='foto' onChange={handleChange} accept='image/*' capture='user' className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" required type="file" />
                                <img src={data.foto}></img>
                            </div>
                            <div className='flex items-center gap-4'>
                                <label>Type:</label>
                                <ul className="flex flex-wrap items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="Ganci" defaultChecked name="tipeItem" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                Ganci
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="Sticker" name="tipeItem" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                Sticker
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="Poster" name="tipeItem" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                Poster
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="Baju" name="tipeItem" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                Baju
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="Acrylic" name="tipeItem" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                Acrylic
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="Pin" name="tipeItem" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                Pin
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="Others" name="tipeItem" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                Others
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className='flex items-center gap-4'>
                                <label>Price:</label>
                                <ul className="flex flex-wrap items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="5000" defaultChecked name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                5k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="10000" name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                10k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="15000" defaultChecked name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                15k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="20000" name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                20k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="25000" name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                25k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="35000" name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                35k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="50000" name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                50k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="100000" name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                100k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value="150000" name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                150k
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-1/3 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <label className="w-full flex items-center gap-2 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <input onChange={handleChange} type="radio" value={data.price} name="price" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                <input type="number" name='price' className='p-1 placeholder-gray-500' placeholder='200000, 250000, ...' onChange={handleChange} />
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={onSubmit} data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                            <button onClick={handleCancel} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='fixed top-0 left-0 w-screen h-screen bg-black opacity-40'></div>
        </div>
    );
}

export default MerchModal;