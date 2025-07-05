import { configureStore } from "@reduxjs/toolkit";
import { conditionReducer } from "./redux/conditionSlice";


export const store = configureStore({
  reducer: {
    conditions: conditionReducer,  
 
  },
});
