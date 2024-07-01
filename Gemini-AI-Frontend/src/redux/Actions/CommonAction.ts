import {createAction} from "@reduxjs/toolkit";
import {IUserLocation} from "../../interfaces/IRedux";

export const setUserLocation = createAction<IUserLocation>("SET_USER_LCOATION");
export const setInternetConnected = createAction<boolean>("SET_INTERNET_CONNECTED");
