import { createSlice } from "@reduxjs/toolkit";

export const roomDataSlice = createSlice({
    name : "roomData",
    initialState : {
        roomData: {name : '', id : ''},
    },
    reducers : {
        incrementByAmount : (state, action) => {
            state.roomData = action.payload;
        },
    },
});

export const {incrementByAmount} = roomDataSlice.actions;

export default roomDataSlice.reducer;