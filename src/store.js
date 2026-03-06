import { configureStore } from "@reduxjs/toolkit";
import { conditionReducer } from "./redux/conditionSlice";
import { authReducer } from "./redux/authSlice";


export const store = configureStore({
  reducer: {
    conditions: conditionReducer,  
    auth: authReducer
  },
});
