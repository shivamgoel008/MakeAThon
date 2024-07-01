import {IPlacesTravelledYear, ITypeOfTravel} from "../interfaces/IRedux";
// import {ITextConstants} from "../interfaces/ITextConst";

export const ZINGVEL_AUTH_DATA = "ZINGVEL_AUTH_DATA";
// export const ZINGVEL_AUTH_PH_NUMBER: string = 'ZINGVEL_AUTH_PH_NUMBER';

// export const textConstants: ITextConstants = {
//   welcome: [
//     {text1: "Planning to go somewhere?", text2: "We help you to achieve your Travel Goals"},
//     {text1: "Need a travel partner?", text2: "Connect with Like Minded Travellers"},
//     {text1: "Stand out among travellers!", text2: "Build your travel profile, Zing it with your badges"},
//   ],
// };

export const TRAVEL_LIKES: Array<ITypeOfTravel> = [
  "Adventure",
  "Beach",
  "Cultural",
  "Cruise",
  "Film",
  "Wildlife",
  "Sports",
];

export const PLACES_TRAVELLED_IN_YEAR: Array<IPlacesTravelledYear> = ["1-2", "3-4", "5-7", "8-10", "12+"];
