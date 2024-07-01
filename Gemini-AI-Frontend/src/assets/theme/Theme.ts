import {color} from "@rneui/base";
import {createTheme, CreateThemeOptions, lightColors} from "@rneui/themed";

export const appTheme: CreateThemeOptions = createTheme({
  lightColors: {
    white: "#ffffff",
    black: "#000000",
    primary: "#e7e7e8",
    secondary: "#222222",
    warning: "",
    error: "#BA0F30",
    success: "",
    background: "#FFFFFF",
    divider: "",
    grey0: "",
    grey1: "",
    grey2: "",
    grey3: "",
    grey4: "",
    grey5: "",
  },
  darkColors: {
    white: "#ffffff",
    black: "#000000",
    primary: "#e7e7e8",
    secondary: "",
    warning: "",
    error: "",
    success: "",
    background: "",
    divider: "",
    grey0: "",
    grey1: "",
    grey2: "",
    grey3: "",
    grey4: "",
    grey5: "",
  },
  mode: "light",
  spacing: {},
  components: {
    Button: {
      buttonStyle: {},
    },
    Text: {
      h1Style: {},
      h2Style: {fontStyle: "normal", fontWeight: "800", fontSize: 18, color: lightColors.primary},
      h3Style: {fontStyle: "normal", fontWeight: "400", fontSize: 16},
      h4Style: {},
    },
    Input: {
      style: {
        borderWidth: 0.5,
        borderRadius: 25,
        color: color.secondary,
        fontSize: 15,
        fontWeight: "500",
      },
      errorStyle: {
        borderColor: color.error,
      },
    },
  },
});
