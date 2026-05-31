import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { taskApi } from "./services/taskApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]:authApi.reducer,
        [taskApi.reducerPath]:taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(taskApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;