import { configureStore } from "@reduxjs/toolkit";
import taskSliceReducer from "./slice";

export default configureStore({
  reducer: {
    taskStatus: taskSliceReducer,
  },
});
