import {IUser} from "./IUser";
import {ICity} from "./IWanderList";

export interface IGetUserPostsReq {
  userId: string;
}

export interface IPostItemMedia {
  id: string;
  mediaUrl: string;
  postId: string;
  created_at: string;
  updated_at: string;
}

export interface IPostLikeItem {
  userId: string;
  postId: string;
}

export interface IPostItem {
  id: string;
  travelDate: string;
  userId: string;
  cityId: string;
  description: string;
  created_at: string;
  updated_at: string;
  media: Array<IPostItemMedia>;
  user: IUser;
  city: ICity;
  likes: Array<IPostLikeItem>;
}

export interface ILikeFeedReq {
  userId: string;
  postId: string;
}

export interface IUnLikeFeedReq {
  userId: string;
  postId: string;
}
