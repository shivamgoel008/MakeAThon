import {StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {
  WANDERLIST_CHOICES_SCHREEN,
  CHAT_SCREEN,
  FEEDS_SCREEN,
  HOME_SCREEN,
  PROFILE_SCREEN,
} from "../constants/RouteConstants";
import {COLORS} from "../constants/ColorConstants";
import {TextUi} from "./TextUI";
import HomeOutline from "../assets/media/tab_home_outline.svg";
import HomeFilled from "../assets/media/tab_home_filled.svg";
import FeedOutline from "../assets/media/tab_feeds_outline.svg";
import FeedFilled from "../assets/media/tab_feeds_filled.svg";
import WanderListOutline from "../assets/media/tab_wanderlist_outline.svg";
import ChatOutline from "../assets/media/tab_chat_outline.svg";
import ChatFilled from "../assets/media/tab_chat_filled.svg";
import ProfileOutline from "../assets/media/tab_profile_outline.svg";
import ProfileFilled from "../assets/media/tab_profile_filled.svg";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {screenWidth} from "../constants/CommonConstants";
import {TouchableOpacity} from "react-native-gesture-handler";
import {SelectCitySheet} from "./SelectCitySheet";
import {ICity} from "../interfaces/IWanderList";

type IBottomBarRoutes =
  | typeof HOME_SCREEN
  | typeof FEEDS_SCREEN
  | typeof WANDERLIST_CHOICES_SCHREEN
  | typeof CHAT_SCREEN
  | typeof PROFILE_SCREEN;

export const BottomTab: React.FC<BottomTabBarProps> = (props: BottomTabBarProps): JSX.Element => {
  const [selectedCitySheet, setSelectedCitySheet] = useState<boolean>(false);

  const onViewClick = (routeName: IBottomBarRoutes): void => {
    props.navigation.navigate(routeName);
  };

  const isRouteActive = (routeName: IBottomBarRoutes): boolean => {
    if (props.state.routeNames[props.state.index] === routeName) {
      return true;
    }
    return false;
  };

  const handleSelectCity = (city: ICity): void => {
    setSelectedCitySheet(false);
    props.navigation.navigate(WANDERLIST_CHOICES_SCHREEN, {
      city,
    });
  };

  return (
    <View style={styles.container}>
      {selectedCitySheet && (
        <SelectCitySheet
          openSheet={selectedCitySheet}
          handleSelect={(city: ICity) => handleSelectCity(city)}
          handleCancel={() => setSelectedCitySheet(false)}
        />
      )}
      <TouchableOpacity style={styles.outerView} onPress={() => onViewClick(HOME_SCREEN)}>
        <View style={styles.innerView}>
          {isRouteActive(HOME_SCREEN) ? <HomeFilled transform={[{rotateY: "180deg"}]} /> : <HomeOutline />}
        </View>
        <TextUi variant="caption" sx={isRouteActive(HOME_SCREEN) ? styles.textSelected : styles.text}>
          Home
        </TextUi>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outerView} onPress={() => onViewClick(FEEDS_SCREEN)}>
        <View style={styles.innerView}>{isRouteActive(FEEDS_SCREEN) ? <FeedFilled /> : <FeedOutline />}</View>
        <TextUi variant="caption" sx={isRouteActive(FEEDS_SCREEN) ? styles.textSelected : styles.text}>
          Feeds
        </TextUi>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.outerView} onPress={() => setSelectedCitySheet(true)}>
        <View style={styles.innerView}>
          <WanderListOutline />
        </View>
        <TextUi variant="caption" sx={styles.text}>
          Wanderlist
        </TextUi>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.outerView} onPress={() => onViewClick(CHAT_SCREEN)}>
        <View style={styles.innerView}>{isRouteActive(CHAT_SCREEN) ? <ChatFilled /> : <ChatOutline />}</View>
        <TextUi variant="caption" sx={isRouteActive(CHAT_SCREEN) ? styles.textSelected : styles.text}>
          Chat
        </TextUi>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outerView} onPress={() => onViewClick(PROFILE_SCREEN)}>
        <View style={styles.innerView}>{isRouteActive(PROFILE_SCREEN) ? <ProfileFilled /> : <ProfileOutline />}</View>
        <TextUi variant="caption" sx={isRouteActive(PROFILE_SCREEN) ? styles.textSelected : styles.text}>
          Profile
        </TextUi>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: COLORS.CLR_WHITE,
    shadowColor: COLORS.CLR_TEXT,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
  },
  outerView: {
    paddingVertical: 5,
    alignItems: "center",
    width: screenWidth / 5,
  },
  innerView: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    paddingBottom: 5,
  },
  textSelected: {
    color: COLORS.CLR_PRIMARY,
    fontSize: 12,
  },
  text: {
    color: COLORS.CLR_GRAY_1,
    fontSize: 12,
  },
});
