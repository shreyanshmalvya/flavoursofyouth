import { createSlice } from "@reduxjs/toolkit";

export const usernameSlice = createSlice({
    name : "username",
    initialState : {
        username: " ",
    },
    reducers : {
        incrementByAmount : (state, action) => {
            state.username = action.payload;
        },
    },
});

export const {incrementByAmount} = usernameSlice.actions;

export default usernameSlice.reducer;