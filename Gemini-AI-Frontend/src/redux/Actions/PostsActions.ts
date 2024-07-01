import {createAction} from "@reduxjs/toolkit";
import {IPostItem} from "../../interfaces/IPosts";

export const setUserPosts = createAction<Array<IPostItem>>("SET_USER_POSTS");
