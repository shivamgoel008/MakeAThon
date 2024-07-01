import {configureStore} from "@reduxjs/toolkit";
import {CommonReducer} from "./Reducers/CommonReducer";
import {UserReducer} from "./Reducers/UserReducer";
import {PostsReducer} from "./Reducers/PostsReducer";
import {CitiesReducer} from "./Reducers/CitiesReducer";

export const reduxStore = configureStore({
  reducer: {
    userReducer: UserReducer,
    commonReducer: CommonReducer,
    postReducer: PostsReducer,
    citiesReducer: CitiesReducer,
  },
});

export type ReduxAppDispatch = typeof reduxStore.dispatch;
export type ReduxRootState = ReturnType<typeof reduxStore.getState>;
