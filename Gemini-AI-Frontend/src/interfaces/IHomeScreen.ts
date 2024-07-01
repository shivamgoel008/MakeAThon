import {ICity} from "./IWanderList";
interface IItinerary {
  id: string;
  day: string;
  dayHeading: string;
  description: string;
  itineraryImage: string;
  cityId: string;
  themeId: string;
  city: ICity;
}
export interface ITheme {
  id: string;
  type: Array<string>;
  name: string;
  themeImage: string;
  description: string;
  rating: string;
  price: string;
  itinerary: Array<IItinerary>;
  heading: string;
  inclusions: string;
  exclusions: string;
}
