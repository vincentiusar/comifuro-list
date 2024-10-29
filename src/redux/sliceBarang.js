import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    items: []
}

export const sliceBarang = createSlice({
    name: "barang",
    initialState: {
        barang: initialValue
    },
    reducers: {
        saveBarang: (state, action) => {
            const newBarang = [...action.payload]
            state.barang.items = newBarang
        },
        deleteBarang: (state, action) => {
            let x = 0, arr = [...state.barang.items], data = {...action.payload};
            for (let i = 0; i < arr.length; i++) {
                if (data.id === arr[i].id) {
                    x = i;
                    break;
                }
            }
            arr.splice(x, 1);
            state.barang.items = arr;
        }
    }
})

export const { saveBarang, deleteBarang } = sliceBarang.actions;
export default sliceBarang.reducer;