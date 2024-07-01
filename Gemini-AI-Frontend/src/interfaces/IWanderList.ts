export interface ICity {
  id: string;
  city: string;
  state: string;
  country: string;
  heroMedia: string;
  description: string;
  rating: number;
  googlePlaceId: string;
  latitude: number;
  longitude: number;
  prefrableSeasonOfTravel: string;
  created_at: string;
  updated_at: string;
}
//  interface IVendorItem {
//   id: string;
//   wanderlistId: string;
//   vendorId: string;
//   created_at: string;
//   updated_at: string;
// }

export interface IWanderListItem {
  id: string;
  travelDate: string;
  numberOfDays: number;
  // description: string;
  cityId: string;
  userId: string;
  created_at: string;
  updated_at: string;
  city: ICity;
  accommodations: Array<IResturantItem>;
  activities: Array<IResturantItem>;
  events: Array<IResturantItem>;
  places: Array<IResturantItem>;
  resturants: Array<IResturantItem>;
  favouriteWanderlist: Array<IResturantItem>;
}

export interface IWanderListCreate {
  // id: string;
  // description: string;
  cityId: string;
  travelDate: string;
  numberOfDays: string;
  // userId: string;
  // created_at: string;
  // updated_at: string;
  // city: ICity;
  accommodations?: Array<string>;
  activities?: Array<string>;
  events?: Array<string>;
  places?: Array<string>;
  resturants?: Array<string>;
  // favouriteWanderlist: Array<IResturantItem>;
}

// export interface IGetWanderListByIdReq {
//   wanderlistId: string;
// }

export interface IGetAllResturantsByCityReq {
  cityId: string;
}

export interface IResturantItem {
  id: string;
  name: string;
  rating: string;
  contact: Array<string>;
  heroImage: string;
  description: string;
  whatsAppNo: string;
  websiteLink: string;
  created_at: string;
  updated_at: string;
  cityId: string;
  media: Array<IResturantMedia>;
  city: ICity;
}

interface IResturantMedia {
  id: string;
  mediaUrl: string;
  resturantId: string;
  created_at: string;
  updated_at: string;
}

export interface IGetAllWanderlistsByUser {
  userId: string;
}

export interface ICreateWanderList {
  travelDate: string;
  numberOfDays: string;
  cityId: string;
}

export interface ISeasonOfTravel {
  seasonName: string;
  seasonMonth: string;
}

export interface IEventItem {
  id: string;
  name: string;
  rating: string;
  contact: Array<string>;
  heroImage: string;
  description: string;
  whatsAppNo: string;
  websiteLink: string;
  created_at: string;
  updated_at: string;
  cityId: string;
  media: Array<IEventMedia>;
  city: ICity;
}

interface IEventMedia {
  id: string;
  mediaUrl: string;
  resturantId: string;
  created_at: string;
  updated_at: string;
}

export interface IAccomodationItem {
  id: string;
  name: string;
  rating: string;
  contact: Array<string>;
  heroImage: string;
  description: string;
  whatsAppNo: string;
  websiteLink: string;
  created_at: string;
  updated_at: string;
  cityId: string;
  media: Array<IAccomodationMedia>;
  city: ICity;
}

interface IAccomodationMedia {
  id: string;
  mediaUrl: string;
  resturantId: string;
  created_at: string;
  updated_at: string;
}

export interface ICardPref {
  value: IDmpType;
  type: ICardPrefType;
}

export type ICardPrefType = "Places" | "Resturants" | "Accomodataions" | "Activities" | "Events";

export type IDmpType = IAccomodationItem | IEventItem | IResturantItem;
