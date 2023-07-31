import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import tasksSlice from "./tasksSlice";
import pagesSlice from "./pagesSlice";


export default configureStore({
    reducer: {
        auth: authSlice,
        tasks: tasksSlice,
        pages: pagesSlice
    }
})