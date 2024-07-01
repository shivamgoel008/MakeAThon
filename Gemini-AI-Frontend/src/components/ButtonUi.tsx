import React from "react";
import {ActivityIndicator, GestureResponderEvent, StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {Button} from "@rneui/themed";
import {COLORS} from "../constants/ColorConstants";
import {horizontalScale, moderateScale, verticalScale} from "../helpers/utils/metrics";

interface IButtonUiProps {
  variant: "primary" | "secondry";
  children: JSX.Element | string;
  onPress: (ev: GestureResponderEvent) => void;
  disabled?: boolean;
  isLoading?: boolean;
  containerSx?: StyleProp<ViewStyle>;
  buttonStyleSx?: StyleProp<ViewStyle>;
  titleStyleSx?: StyleProp<TextStyle>;
}

export const ButtonUi: React.FC<IButtonUiProps> = (props: IButtonUiProps): JSX.Element => {
  const buttonUiStyle = StyleSheet.create({
    container: {},
    disabledStyle: {
      opacity: 0.5,
    },
    disabledTitleStyle: {
      color: COLORS.CLR_WHITE,
    },
    loadingStyle: {
      marginRight: horizontalScale(10),
    },
    primaryBtn: {
      opacity: props.isLoading ? 0.4 : 1,
      backgroundColor: COLORS.CLR_PRIMARY,
      borderRadius: moderateScale(25),
      borderColor: COLORS.CLR_PRIMARY,
    },
    secondryBtn: {
      opacity: props.isLoading ? 0.4 : 1,
      backgroundColor: "transparent",
      borderRadius: moderateScale(25),
      borderColor: COLORS.CLR_TEXT,
    },
    primaryTitleStyle: {
      fontWeight: "700",
      fontSize: moderateScale(15),
      fontFamily: "Lato",
      color: COLORS.CLR_WHITE,
      paddingVertical: verticalScale(5),
    },
    secondryTitleStyle: {
      fontWeight: "700",
      fontSize: moderateScale(15),
      fontFamily: "Lato",
      paddingVertical: verticalScale(5),
      color: COLORS.CLR_TEXT,
    },
  });
  return (
    <Button
      disabled={props.disabled}
      disabledStyle={buttonUiStyle.disabledStyle}
      disabledTitleStyle={buttonUiStyle.disabledTitleStyle}
      onPress={(ev: GestureResponderEvent) => props.onPress(ev)}
      containerStyle={(buttonUiStyle.container, props.containerSx)}
      buttonStyle={[buttonUiStyle[`${props.variant}Btn`], props.buttonStyleSx]}
      titleStyle={[buttonUiStyle[`${props.variant}TitleStyle`], props.titleStyleSx]}
      type="outline"
      icon={props.isLoading ? <ActivityIndicator style={buttonUiStyle.loadingStyle} color={"#fff"} /> : undefined}
      // uppercase={true}
    >
      {props.children}
    </Button>
  );
};

ButtonUi.defaultProps = {
  titleStyleSx: {},
};
