import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import Accordion from 'rsuite/Accordion';
import 'rsuite/Accordion/styles/index.css';
import { useDispatch } from 'react-redux';
import { deleteBarang } from '../redux/sliceBarang';
import { toast } from 'react-toastify';
import EditItemModal from './EditItemModal';

function ItemCard({ barang }) {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({});

    const toCurrency = (e) => {
        let res = "";

        for (let i = e.length - 1, j = 0; i >= 0; j++, i--) {
            if (j % 3 === 0) res = ' ' + res;
            res = e[i] + res;
        }
        return res;
    }

    const handleEdit = (item) => {
        setEditData(item);
        setShowModal(!showModal);
    }

    const handleDelete = () => {
        const confirm = window.confirm(`sure want to delete ${barang.nama}`);
        if (!confirm) return;

        dispatch(deleteBarang({ 'id': barang.id }));
        toast.success(`Toko ${barang.name} deleted!`, {
            position: "bottom-center"
        });
    }

    return (
        <div className='flex flex-col items-center w-full border-4 rounded-lg border-cyan-500 p-3 gap-4'>
            <div className='flex items-center justify-evenly w-full'>
                <button onClick={() => handleEdit(barang)} type="button" className="w-20 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900">Edit</button>
                <button onClick={handleDelete} type="button" className="w-20 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
            </div>
            <div className="relative w-full bg-white" data-carousel="slide">
                <div className='w-full'>
                    <Swiper
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {barang.fotoToko ? (
                            <SwiperSlide>
                                <img src={barang?.fotoToko} />
                            </SwiperSlide>
                        ) : null}
                        {barang.fotoNamecard ? (
                            <SwiperSlide>
                                <img src={barang?.fotoNamecard} />
                            </SwiperSlide>
                        ) : null}
                    </Swiper>
                </div>
            </div>
            <p className='text-2xl font-semibold line-clamp-2 w-5/6'>{barang.nama}</p>
            <p className='text-2xl font-semibold line-clamp-2 w-5/6'>{barang.nomor}</p>
            <p className='text-xl font-light'>Total Spent: Rp. {toCurrency(barang.totalCost.toString())},-</p>
            <Accordion className='w-full'>
                <Accordion.Panel header="Merch">
                    {barang.items?.map((merch, key2) => (
                        <div key={key2} className='grid grid-cols-2 gap-3 items-center'>
                            <img src={merch.foto} />
                            <div>
                                <p className='text-2xl font-semibold'>{merch.tipeItem}</p>
                                <p className='text-xl'>Rp. {toCurrency(merch.price.toString())},-</p>
                            </div>
                        </div>
                    ))}
                </Accordion.Panel>
            </Accordion>
            {showModal ? (<EditItemModal setHidden={setShowModal} data={editData} setData={setEditData} />) : ""}

        </div>
    )
}

export default ItemCard;