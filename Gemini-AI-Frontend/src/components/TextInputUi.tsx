import {
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ViewStyle,
  TextInputProps,
} from "react-native";
import React from "react";
import {COLORS} from "../constants/ColorConstants";
import {horizontalScale, moderateScale, verticalScale} from "../helpers/utils/metrics";
import {Input} from "@rneui/themed";
import {IconNode} from "@rneui/themed/dist/Icon";

interface ITextInputUiProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  successMessage?: string;
  placeholder?: string;
  contianerSx?: StyleProp<ViewStyle>;
  sx?: StyleProp<TextStyle>;
  inputContainerSx?: StyleProp<ViewStyle>;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  pointerEvents?: "auto" | "none" | "box-none" | "box-only";
  autoFocus?: boolean;
  onPressIn?: () => void;
  onBlur?: (ev: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  leftIcon?: IconNode;
  autoComplete?: TextInputProps["autoComplete"];
}

export const TextInputUi: React.FC<ITextInputUiProps> = (props: ITextInputUiProps): JSX.Element => {
  const getBorderColor = (): string => {
    if (props.errorMessage) {
      return COLORS.CLR_ERROR;
    }
    if (props.successMessage) {
      return COLORS.CLR_SUCCESS;
    }
    return COLORS.CLR_PLACEHOLDER;
  };

  const getLabelColor = (): string => {
    if (props.errorMessage) {
      return COLORS.CLR_ERROR;
    }
    if (props.successMessage) {
      return COLORS.CLR_SUCCESS;
    }
    return COLORS.CLR_TEXT;
  };

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: getBorderColor(),
      borderBottomEndRadius: moderateScale(15),
      borderBottomStartRadius: moderateScale(15),
      borderTopEndRadius: moderateScale(15),
      borderTopStartRadius: moderateScale(15),
      paddingBottom: 0,
      height: props.multiline ? 100 : 50,
      marginTop: 10,
    },
    label: {
      backgroundColor: COLORS.CLR_WHITE,
      alignSelf: "flex-start",
      marginTop: -10,
      paddingHorizontal: 10,
      fontFamily: "Poppins",
      fontWeight: "400",
      letterSpacing: 1.1,
      fontSize: 12,
      color: getLabelColor(),
    },
    inputContainer: {
      borderBottomWidth: 0,
    },
    input: {
      flexGrow: 1,
      paddingHorizontal: horizontalScale(15),
      maxHeight: verticalScale(200),
      borderColor: COLORS.CLR_WHITE,
      fontFamily: "Poppins",
      fontSize: 12,
    },
    leftIconContainer: {
      paddingHorizontal: horizontalScale(15),
    },
    errorStyle: {
      color: COLORS.CLR_ERROR,
      fontSize: moderateScale(10),
      fontWeight: "400",
      fontFamily: "Poppins",
      letterSpacing: 1.5,
      paddingTop: 2,
    },
    successStyle: {
      color: COLORS.CLR_SUCCESS,
      fontSize: moderateScale(10),
      fontWeight: "400",
      fontFamily: "Poppins",
      letterSpacing: 1.2,
      paddingTop: 2,
    },
  });

  const getErrorSuccessStyle = () => {
    if (props.errorMessage) {
      return styles.errorStyle;
    }
    if (props.successMessage) {
      return styles.successStyle;
    }
    return undefined;
  };

  return (
    <React.Fragment>
      <Input
        containerStyle={[styles.container, props.contianerSx]}
        inputContainerStyle={[styles.inputContainer, props.inputContainerSx]}
        inputStyle={[styles.input, props.sx]}
        onChangeText={(text: string) => props.onChangeText(text)}
        label={props.label || "Danger"}
        labelStyle={styles.label}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        multiline={props.multiline}
        placeholderTextColor={COLORS.CLR_PLACEHOLDER}
        disabled={props.disabled}
        errorStyle={getErrorSuccessStyle()}
        errorMessage={props.errorMessage || props.successMessage}
        pointerEvents={props.pointerEvents}
        autoFocus={props.autoFocus}
        onPressIn={props.onPressIn}
        onBlur={props.onBlur}
        leftIcon={props.leftIcon}
        leftIconContainerStyle={styles.leftIconContainer}
        autoComplete={props.autoComplete}
      />
    </React.Fragment>
  );
};

TextInputUi.defaultProps = {
  disabled: false,
  autoFocus: false,
};
