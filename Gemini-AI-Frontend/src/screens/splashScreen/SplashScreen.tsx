import React from "react";
import {View, StyleSheet} from "react-native";
import SplashScreenSvg from "../../assets/media/splash_screen.svg";

const splashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const SplashScreen: React.FC = (): JSX.Element => {
  return (
    <View style={splashScreenStyles.container}>
      <SplashScreenSvg />
    </View>
  );
};
