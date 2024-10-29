import React, { useEffect, useState } from 'react'
import ItemModal from '../components/ItemModal';
import { useSelector } from 'react-redux';
import ItemCard from '../components/ItemCard';

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
        <div>
            <div className='flex flex-col items-center'>
                <div className='flex items-center'>
                    <button type="button" onClick={handleModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        ADD STORE
                    </button>
                    <p>Total Spend: Rp. {total},-</p>
                </div>
            </div>
            <div className='flex flex-col items-center w-full gap-9'>
                {data.length !== 0 ? data?.map((item, key) => (
                    <ItemCard key={key} barang={item} id={key} />
                )) : ''}
            </div>
            {showModal ? (<ItemModal setHidden={setShowModal} />) : ""}
        </div>
    )
}

export default Home;