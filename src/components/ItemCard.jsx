import React from 'react'
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

function ItemCard({ barang }) {

    const dispatch = useDispatch();

    const toCurrency = (e) => {
        let res = "";

        for (let i = e.length - 1, j = 0; i >= 0; j++, i--) {
            if (j % 3 === 0) res = ' ' + res;
            res = e[i] + res;
        }
        return res;
    }

    const handleDelete = () => {
        const confirm = window.confirm(`sure want to delete ${barang.nama}`);
        if (!confirm) return;

        dispatch(deleteBarang({ 'id': barang.id }));
        toast.success(`Toko ${barang.name} deleted!`);
    }

    return (
        <div className='flex flex-col items-center w-full border-2 rounded-lg border-pink-400 p-3 gap-4'>
            <button onClick={handleDelete} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
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
            {/* <div className='w-full' data-accordion="collapse">
                <h2 id={`accordion-collapse-heading-${id}`}>
                    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target={`#accordion-collapse-body-${id}`} aria-expanded="true" aria-controls={`accordion-collapse-body-${id}`}>
                        <span>Merch</span>
                        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div id={`accordion-collapse-body-${id}`} className="hidden" aria-labelledby={`accordion-collapse-heading-${id}`}>
                    <div className="flex flex-col gap-4 p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        {
                            barang.items?.map((merch, key2) => (
                                <div key={key2} className='grid grid-cols-2 gap-3 items-center'>
                                    <img src={merch.foto} />
                                    <div>
                                        <p className='text-2xl font-semibold'>{merch.tipeItem}</p>
                                        <p className='text-xl'>Rp. {merch.price},-</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default ItemCard;