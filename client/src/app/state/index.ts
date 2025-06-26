import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes{
    isSidebarCollapsed: boolean,
    isDarkMode: boolean;
}

const initialState: InitialStateTypes ={
    isSidebarCollapsed: false,
    isDarkMode: false,
}

export const globalSlice = createSlice({
    name:'global',
    initialState,
    reducers: {
        setisSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        setisDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
    },

});

export const { setisSidebarCollapsed, setisDarkMode} = globalSlice.actions;

export default globalSlice.reducer;

