import {createSlice} from '@reduxjs/toolkit'
const socketSlice = createSlice({
    name: "socket",
    initialState:{
        connectedsocket : null,
    },
    reducers:{
        setSocket: (state,action)=>{
            state.connectedsocket = action.payload;
        }
    }
});
export const {setSocket} = socketSlice.actions;
export default socketSlice.reducer;
