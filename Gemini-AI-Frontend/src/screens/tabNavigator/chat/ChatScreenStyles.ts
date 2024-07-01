import {StyleSheet} from "react-native";
import {COLORS} from "../../../constants/ColorConstants";
import {horizontalScale, verticalScale} from "../../../helpers/utils/metrics";

export const chatScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(20),
    flex: 1,
  },
  view1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(40),
  },
  view1Text: {
    color: COLORS.CLR_BLACK,
    fontSize: 10,
    marginTop: verticalScale(10),
    // marginLeft: 100,
  },
  view1Div1: {},
  view1Div: {
    height: verticalScale(40),
    paddingVertical: verticalScale(10),
    // backgroundColor: CLR_GRAY_2,
    borderWidth: 0,
  },
  view2: {
    marginTop: verticalScale(30),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: horizontalScale(15),
  },
  view2Div: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  view2Div1: {},
  view2Div2: {},
  view3: {
    marginTop: verticalScale(30),
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
  view3Div: {
    marginLeft: horizontalScale(10),
    // backgroundColor:'red',
  },
  view3Text: {
    color: COLORS.CLR_BLACK,
  },
  view3Text2: {
    color: "#515151",
    fontSize: 11,
    marginTop: verticalScale(5),
  },
  view3Text3: {
    color: "#9E9E9E",
    fontSize: 8,
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(150),
  },
  view4: {
    marginTop: verticalScale(20),
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
});
