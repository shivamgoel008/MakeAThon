import { Dimensions } from "react-native";
import { ISeasonOfTravel } from "../interfaces/IWanderList";



// export const ONLY_STRING_REGEX: RegExp = /^[A-Za-z ]+$/;

export const ONLY_STRING_WITH_SPACE_REGEX: RegExp = /^[a-zA-Z ]*$/;

// export const ONLY_NUMBER_REGEX: RegExp = /^\d+$/;

export const ONLY_NUMBER_WITH_SPACE_REGEX: RegExp = /^[0-9 ]*$/;

export const { width: screenWidth } = Dimensions.get("window");

export const seasonOfTravel: Array<ISeasonOfTravel> = [
  {
    seasonName: "Winter",
    seasonMonth: "Dec - Feb",
  },
  {
    seasonName: "Spring",
    seasonMonth: "Mar - May",
  },
  {
    seasonName: "Summer",
    seasonMonth: "Jun - Aug",
  },
  {
    seasonName: "Fall",
    seasonMonth: "Sep - Nov",
  },
];
