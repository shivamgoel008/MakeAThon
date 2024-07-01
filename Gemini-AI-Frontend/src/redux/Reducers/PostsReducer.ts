import {createReducer} from "@reduxjs/toolkit";
import {IPostsInitialState} from "../../interfaces/IRedux";
import {setUserPosts} from "../Actions/PostsActions";

const postsInitialState: IPostsInitialState = {
  userPosts: [],
};

export const PostsReducer = createReducer(postsInitialState, builder => {
  builder
    .addCase(setUserPosts, (state, action) => {
      return {
        ...state,
        userPosts: action.payload,
      };
    })
    .addDefaultCase((_state, _action) => {});
});
