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
        deleteBarang: (state) => {
            state.barang.items = initialValue
        }
    }
})

export const { saveBarang, deleteBarang } = sliceBarang.actions;
export default sliceBarang.reducer;