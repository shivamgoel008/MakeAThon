import {createReducer} from "@reduxjs/toolkit";
import {ICommonInitialState} from "../../interfaces/IRedux";
import {setInternetConnected, setUserLocation} from "../Actions/CommonAction";

const commonInitialState: ICommonInitialState = {
  userLocation: undefined,
  isInternetConnected: true,
};

export const CommonReducer = createReducer(commonInitialState, builder => {
  builder
    .addCase(setUserLocation, (state, action) => {
      return {
        ...state,
        userLocation: action.payload,
      };
    })
    .addCase(setInternetConnected, (state, action) => {
      return {
        ...state,
        isInternetConnected: action.payload,
      };
    })
    .addDefaultCase((_state, _action) => {});
});
