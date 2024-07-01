import React from "react";
import {CHAT_SCREEN, FEEDS_SCREEN, HOME_SCREEN, PROFILE_SCREEN} from "../constants/RouteConstants";
import {HomeScreen} from "../screens/tabNavigator/home/HomeScreen";
import {ProfileScreen} from "../screens/tabNavigator/profile/ProfileScreen";
import {HeaderRight} from "../components/HeaderRight";
import {HeaderBackButton} from "../components/HeaderBackButton";
import {INoTyppedValue} from "../interfaces/ICommon";
import {BottomTabBarProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {BottomTab} from "../components/BottomTab";
import {ChatScreen} from "../screens/tabNavigator/chat/ChatScreen";
import {FeedsScreen} from "../screens/tabNavigator/feeds/FeedsScreen";
import {COLORS} from "../constants/ColorConstants";

export const TabNavigation: React.FC = (): JSX.Element => {
  const TabNavigaton = createBottomTabNavigator();

  const headerBackButtonRender = (options: {showBackButton: boolean}) => {
    if (options.showBackButton) {
      return <HeaderBackButton />;
    }
    return null;
  };

  const headerRightRender = (options: {showRightDrawer: boolean; showBellIcon: boolean}) => {
    return <HeaderRight showBellIcon={options.showBellIcon} showDrawerMenu={options.showRightDrawer} />;
  };

  const bottomTabRender = (props: BottomTabBarProps) => {
    return <BottomTab {...props} />;
  };

  const setHeaderOptions = (options: {
    hideHeader: boolean;
    headerTitle: string;
    showBackButton: boolean;
    showRightDrawer: boolean;
    showBellIcon: boolean;
  }) => {
    if (options.hideHeader) {
      return {
        headerShown: false,
      };
    }
    return {
      headerTitleAlign: "center",
      title: `${options.headerTitle}`,
      headerStyle: {
        backgroundColor: COLORS.CLR_WHITE,
      },
      headerTitleStyle: {
        color: COLORS.CLR_TEXT,
        fontFamily: "Poppins",
        fontWeight: "600",
      },
      headerBackTitleVisible: false,
      headerShadowVisible: true,
      headerLeft: () => headerBackButtonRender({showBackButton: options.showBackButton}),
      headerRight: () => {
        return headerRightRender({
          showBellIcon: options.showBellIcon,
          showRightDrawer: options.showRightDrawer,
        });
      },
    };
  };

  return (
    <TabNavigaton.Navigator
      tabBar={(props: BottomTabBarProps) => bottomTabRender(props)}
      initialRouteName={HOME_SCREEN}>
      <TabNavigaton.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Home",
            showBackButton: false,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <TabNavigaton.Screen
        name={FEEDS_SCREEN}
        component={FeedsScreen}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Feed",
            showBackButton: false,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <TabNavigaton.Screen
        name={CHAT_SCREEN}
        component={ChatScreen}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Chat",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <TabNavigaton.Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Profile",
            showBackButton: false,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />
    </TabNavigaton.Navigator>
  );
};
