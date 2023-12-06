import { createSlice } from '@reduxjs/toolkit';



const pageDataSlice = createSlice({

    name: 'pageData',
    initialState: {
        menuToggle: false,
        category: [],
        subCategory: [],
        // newUpdates: [],
    },

    reducers: {
        setMenuToggle: (state, action) => {
            state.menuToggle = !action.payload
        },
        selectedSubCategory: (state, action) => {
            state.subCategory = action.payload
        },
    }
});

export const { setMenuToggle, selectedSubCategory, selectedNewUpdates } = pageDataSlice.actions;

export default pageDataSlice.reducer;