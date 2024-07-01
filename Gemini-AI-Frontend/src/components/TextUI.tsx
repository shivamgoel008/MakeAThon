import {Text, StyleSheet, StyleProp, TextStyle, GestureResponderEvent} from "react-native";
import React from "react";
import {moderateScale} from "../helpers/utils/metrics";
import {COLORS} from "../constants/ColorConstants";

interface ITextUiProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption";
  children: JSX.Element | string;
  sx?: StyleProp<TextStyle>;
  onPress?: (ev: GestureResponderEvent) => void;
  numberOfLines?: number;
}

export const TextUi: React.FC<ITextUiProps> = (props: ITextUiProps): JSX.Element => {
  return (
    <Text
      style={[styles[`${props.variant}`], styles.container, props.sx]}
      onPress={(ev: GestureResponderEvent) => {
        props.onPress && props.onPress(ev);
      }}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  h1: {
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: moderateScale(16),
    color: COLORS.CLR_TEXT,
  },
  h2: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: moderateScale(14),
    color: COLORS.CLR_TEXT,
  },
  h3: {
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: moderateScale(18),
    color: COLORS.CLR_TEXT,
  },
  h4: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: moderateScale(12),
    color: COLORS.CLR_TEXT,
  },
  h5: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: moderateScale(13),
    color: COLORS.CLR_TEXT,
  },
  h6: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: moderateScale(16),
    color: COLORS.CLR_TEXT,
  },
  body1: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: moderateScale(14),
    color: COLORS.CLR_TEXT,
  },
  body2: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: moderateScale(14),
    color: COLORS.CLR_TEXT,
  },
  caption: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: moderateScale(14),
    color: COLORS.CLR_TEXT,
  },
});
