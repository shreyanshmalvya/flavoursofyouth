import {configureStore} from '@reduxjs/toolkit';
import roomDataReducer from './roomData';
import usernameReducer from './username';

export default configureStore({
    reducer : {
        roomData : roomDataReducer,
        username : usernameReducer,
    },
})