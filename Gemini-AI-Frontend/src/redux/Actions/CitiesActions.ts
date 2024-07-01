import {createAction} from "@reduxjs/toolkit";
import {ICity} from "../../interfaces/IWanderList";

export const setCities = createAction<Array<ICity>>("SET_CITY");
