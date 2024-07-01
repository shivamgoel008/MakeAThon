import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

const guidelineBaseWidth: number = 375;
const guidelineBaseHeight: number = 812;

export const horizontalScale = (size: number): number => {
  return (width / guidelineBaseWidth) * size;
};

export const verticalScale = (size: number): number => {
  return (height / guidelineBaseHeight) * size;
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (horizontalScale(size) - size) * factor;
};
