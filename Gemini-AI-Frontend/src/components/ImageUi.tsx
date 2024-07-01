import {ActivityIndicator, StyleProp, StyleSheet, ViewStyle} from "react-native";
import React from "react";
import {Image} from "@rneui/themed";

interface IImageUiProps {
  url: string;
  containerSx?: StyleProp<ViewStyle>;
  // onPress?: () => void;
}

export const ImageUi: React.FC<IImageUiProps> = (props: IImageUiProps): JSX.Element => {
  const imageUIStyles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    placeholderStyle: {width: "100%", height: "100%"},
  });

  return (
    <Image
      source={props.url ? {uri: props.url} : require("../assets/media/placeholder_image.png")}
      containerStyle={[imageUIStyles.container, props.containerSx]}
      PlaceholderContent={<ActivityIndicator />}
      placeholderStyle={imageUIStyles.placeholderStyle}
      // onPress={() => props.onPress()}
    />
  );
};
