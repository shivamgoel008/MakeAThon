import {createAction} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/IUser";

export const setUserAction = createAction<IUser>("SET_USER_ACTION");
export const setNewUserAction = createAction<boolean>("SET_NEW_USER_ACTION");
