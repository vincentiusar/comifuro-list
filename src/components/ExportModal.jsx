import JSZip from 'jszip';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ExportModal({ setHidden }) {

    const barang = useSelector(state => state.barang.barang.items);

    const [data, setData] = useState('img');

    const handleCancel = () => {
        setHidden(false);
    }

    function base64ToBlob(base64, contentType = "",
        sliceSize = 512) {
        const byteCharacters = atob(base64.split(",")[1]);
        const byteArrays = [];
    
        for (let offset = 0; offset < byteCharacters.length;
            offset += sliceSize) {
            const slice = byteCharacters.slice(
                offset, offset + sliceSize);
    
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
    
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const handleSubmit = async () => {
        if (data === 'img') {
            const exp = [];
            barang.map(item => {
                if (item.fotoToko) exp.push(item.fotoToko);
                if (item.fotoNamecard) exp.push(item.fotoNamecard);
                item?.items.map(merch => {
                    if (merch.foto) exp.push(merch.foto);
                });
            });
            console.log(exp);
            const zip = new JSZip();

            const img = zip.folder('images');
            exp.map(async (item, key) => {
                const t = base64ToBlob(item);
                img.file(`image-${key}.png`, t);
            })
            const lnk = document.createElement('a');
            await zip.generateAsync({ type:"blob" }).then(function(content) {
                lnk.href = (URL || webkitURL).createObjectURL(content);
                lnk.download = "images.zip";
            });
            lnk.click();

            toast.success("All images exported");
            setHidden(false);
        } else {
            const d = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(barang));
            const lnk = document.createElement('a');
            lnk.setAttribute("href", d);
            lnk.setAttribute("download", "comifuro-list.json");
            lnk.click();
            toast.success("All Data exported");
            setHidden(false);
        }
    }

    return (
        <>
            <div id="static-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-14 w-5/6 z-50 justify-center items-center h-5/6 rounded-lg">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="sticky top-0 bg-gray-700 flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Export
                            </h3>
                            <button onClick={handleCancel} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4 flex flex-col items-start">
                            <div className="flex items-center ps-4 border w-full rounded border-gray-500">
                                <label className="w-full py-4 flex place-content-start gap-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <input onChange={() => setData('img')} defaultChecked type="radio" value="img" name="bordered-radio" className="w-4 h-4 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
                                    All Images
                                </label>
                            </div>
                            <div className="flex items-center ps-4 border w-full rounded border-gray-500">
                                <label className="w-full py-4 flex place-content-start gap-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <input onChange={() => setData('all')} type="radio" value="all" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    All Data
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={handleSubmit} data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Confirm</button>
                            <button onClick={handleCancel} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => setHidden(false)} className='fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-40'></div>
        </>
    )
}

export default ExportModal;