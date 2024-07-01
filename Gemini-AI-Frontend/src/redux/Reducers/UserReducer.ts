import {createReducer} from "@reduxjs/toolkit";
import {IUserReducerInitialState} from "../../interfaces/IRedux";
import {setNewUserAction, setUserAction} from "../Actions/UserAction";
import {IUser} from "../../interfaces/IUser";

const userInitialState: IUserReducerInitialState = {
  registeredUser: {} as IUser,
  isNewUser: false,
};

export const UserReducer = createReducer(userInitialState, builder => {
  builder.addCase(setUserAction, (state, action) => {
    return {
      ...state,
      registeredUser: action.payload,
    };
  });
  builder
    .addCase(setNewUserAction, (state, action) => {
      return {
        ...state,
        isNewUser: action.payload,
      };
    })
    .addDefaultCase((_state, _action) => {});
});
