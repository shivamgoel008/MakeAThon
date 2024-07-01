import React from "react";
import {TouchableOpacity, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {horizontalScale} from "../helpers/utils/metrics";
import EntypoIcons from "react-native-vector-icons/Entypo";
import {COLORS} from "../constants/ColorConstants";

export const HeaderBackButton: React.FC = () => {
  const navigation = useNavigation();

  const headerBackButtonStyles = StyleSheet.create({
    container: {
      padding: 10,
      marginLeft: horizontalScale(5),
    },
  });

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={headerBackButtonStyles.container}>
      <EntypoIcons name="chevron-left" color={COLORS.CLR_TEXT} size={20} />
    </TouchableOpacity>
  );
};
