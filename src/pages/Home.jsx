import React, { useEffect, useState } from 'react'
import ItemModal from '../components/ItemModal';
import { useSelector } from 'react-redux';

function Home() {
    const barang = useSelector(state => state.barang.barang.items);

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const handleModal = () => {
        setShowModal(!showModal);
    }

    useEffect(() => {
        let x = 0;
        barang.map(item => {
            x += item.totalCost
        });
        setTotal(x);
        setData(barang);
    }, [barang]);

    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='flex items-center'>
                    <button type="button" onClick={handleModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        ADD STORE
                    </button>
                    <p>Total Spend: {total}</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                {data.map((item, key) => (
                    <div key={key} className='flex items-center gap-6'>
                        <img src={item.fotoToko} />
                        <p>{item.nama}</p>
                        <p>{item.totalCost}</p>
                    </div>
                ))}
            </div>
            {showModal ? (<ItemModal setHidden={setShowModal} />) : ""}
        </div>
    )
}

export default Home;