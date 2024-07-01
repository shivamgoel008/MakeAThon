import {IPostItem} from "./IPosts";
import {IUser} from "./IUser";
import {ICity} from "./IWanderList";

export interface IUserReducerInitialState {
  registeredUser: IUser;
  isNewUser: boolean;
}

export type ITypeOfTravel = "Adventure" | "Beach" | "Cultural" | "Cruise" | "Film" | "Wildlife" | "Sports";
export type IPlacesTravelledYear = "1-2" | "3-4" | "5-7" | "8-10" | "12+";

export interface IUserLocation {
  city: string;
  state: string;
  postalCode: string;
}

export interface ICommonInitialState {
  userLocation: IUserLocation | undefined;
  isInternetConnected: boolean;
}

export interface IPostsInitialState {
  userPosts: Array<IPostItem>;
}

export interface ICitiesInitialState {
  cities: Array<ICity>;
}
