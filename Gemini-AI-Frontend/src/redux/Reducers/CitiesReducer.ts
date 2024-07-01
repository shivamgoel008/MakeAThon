import {createReducer} from "@reduxjs/toolkit";
import {ICitiesInitialState} from "../../interfaces/IRedux";
import {setCities} from "../Actions/CitiesActions";

const citiesInitialState: ICitiesInitialState = {
  cities: [],
};

export const CitiesReducer = createReducer(citiesInitialState, builder => {
  builder
    .addCase(setCities, (state, action) => {
      return {
        ...state,
        cities: action.payload,
      };
    })
    .addDefaultCase((_state, _action) => {});
});
