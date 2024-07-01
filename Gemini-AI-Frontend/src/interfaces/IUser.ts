import {ITypeOfTravel, IPlacesTravelledYear} from "./IRedux";
import {IWanderListItem} from "./IWanderList";

export interface ILoginScreenFormData {
  countryCode: string;
  countryCodeValidation: string;
  phNumber: string;
  phNumberValidation: string;
}

export type IUserGender = "Male" | "Female" | "Other";

export interface IUser {
  id: string;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  countryCode: number;
  phNumber: string;
  phVerified: boolean;
  avatarImage: string | null;
  email: string | null;
  emailVerified: boolean;
  bio: string | null;
  gender: IUserGender;
  typeOfTravel: Array<ITypeOfTravel> | null;
  placesTravelledYear: Array<IPlacesTravelledYear> | null;
  dateOfBirth: string | null;
  wanderlist: Array<IWanderListItem>;
  userBadges: IUserBadge;
  followers: Array<IFollowerItem>;
}

export interface IFollowerItem {
  id: string;
  userId: string;
  followerId: string;
  user: IUser;
}
interface IUserBadge {
  id: string;
  userId: string;
  badgeId: string;
  created_at: string;
  updated_at: string;
  badge: IBadge;
}

interface IBadge {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ISendOtpReq {
  countryCode: number;
  phNumber: number;
}

export interface IValidateOtpReq {
  countryCode: number;
  phNumber: number;
  otpCode: number;
}

export interface IEditUserReq {
  id: string;
  avatarImage: string | null;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  phNumber: string | null;
  email: string | null;
  bio: string | null;
  gender: IUserGender;
  typeOfTravel: Array<ITypeOfTravel> | null;
  placesTravelledYear: Array<IPlacesTravelledYear> | null;
  dateOfBirth: string | null;
  reasonOfDisable: string | null;
}

export interface IGetAvatarImagesRequest {
  mediaType: string;
}

export interface IGetUserByIdReq {
  userId: string;
}
