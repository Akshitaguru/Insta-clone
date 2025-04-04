import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice ({
    name:'realTimeNotification',
    initialState:{
        likeNofitication:[],

    },
    reducers: {
        setLikeNotification:(state,action) => {
            if(action.payload.type === 'like') {
                state.likeNofitication.push(action.payload);
            }
            else if(action.payload.type === 'unlike') {
                state.likeNofitication = state.likeNofitication.filter((item)=> item.userId !== action.payload.userId);
            }
        }
    }
});

export const {setLikeNotification} = rtnSlice.actions;
export default rtnSlice.reducer;