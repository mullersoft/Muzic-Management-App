// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import songReducer from "./features/songs/songSlice"; // Adjust the path as needed

export const store = configureStore({
  reducer: {
    songs: songReducer, // Add more reducers here if needed
  },
});

// Define RootState using the return type of the store's `getState` method
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch using the store's `dispatch` method
export type AppDispatch = typeof store.dispatch;
