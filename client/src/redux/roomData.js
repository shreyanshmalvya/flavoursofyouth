import { createSlice } from "@reduxjs/toolkit";

export const roomDataSlice = createSlice({
    name : "roomData",
    initialState : {
        roomName: {name : '', id : ''},
    },
    reducers : {
        incrementByAmount : (state, action) => {
            state.roomName = action.payload;
        },
    },
});

export const {incrementByAmount} = roomDataSlice.actions;

export default roomDataSlice.reducer;