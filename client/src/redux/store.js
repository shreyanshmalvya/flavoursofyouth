import {configureStore} from '@reduxjs/toolkit';
import roomDataReducer from './roomData';

export default configureStore({
    reducer : {
        roomData : roomDataReducer,
    },
})