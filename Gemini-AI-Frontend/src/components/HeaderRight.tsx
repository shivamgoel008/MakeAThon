import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {horizontalScale} from "../helpers/utils/metrics";
import {If} from "../helpers/utils/Conditionals";
import Octicons from "react-native-vector-icons/Octicons";
import {COLORS} from "../constants/ColorConstants";
import {useAppSelector} from "../redux/reduxHooks";
import {ReduxRootState} from "../redux/ReduxStore";
import {ImageUi} from "./ImageUi";
import {RIGHT_DRAWER_SCREEN} from "../constants/RouteConstants";

interface IHeaderRightProps {
  showBellIcon: boolean;
  showDrawerMenu: boolean;
}

export const HeaderRight: React.FC<IHeaderRightProps> = (props: IHeaderRightProps): JSX.Element => {
  const navigation = useNavigation();
  const {registeredUser} = useAppSelector((state: ReduxRootState) => state.userReducer);

  return (
    <View style={styles.container}>
      <If condition={props.showBellIcon}>
        <TouchableOpacity onPress={() => undefined} style={styles.view1}>
          <Octicons name="bell" color={COLORS.CLR_TEXT} size={20} />
        </TouchableOpacity>
      </If>
      <If condition={props.showDrawerMenu}>
        <TouchableOpacity onPress={() => navigation.navigate(RIGHT_DRAWER_SCREEN as never)} style={styles.view2}>
          <ImageUi url={registeredUser.avatarImage || ""} containerSx={styles.view2Image} />
        </TouchableOpacity>
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  view1: {
    padding: 10,
  },
  view1Image2: {},
  view2: {
    padding: 10,
    marginHorizontal: horizontalScale(5),
  },
  view2Image: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});
