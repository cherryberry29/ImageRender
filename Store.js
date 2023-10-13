import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from '.reducers/images';

const store = configureStore({
    reducer:{
        images: imageReducer,
    },
});
export default store;
