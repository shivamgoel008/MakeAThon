import React from "react";
import {WelcomeScreen} from "../screens/rootNavigation/welcomeScreen/WelcomeScreen";
import {LOGIN_SCREEN, VERIFICATION_SCREEN, WELCOME_SCREEN} from "../constants/RouteConstants";
import {LoginScreen} from "../screens/rootNavigation/loginScreen/LoginScreen";
import {VerificationScreen} from "../screens/rootNavigation/verificationScreen/VerificationScreen";
import {HeaderBackButton} from "../components/HeaderBackButton";
import {INoTyppedValue} from "../interfaces/ICommon";
import {createStackNavigator} from "@react-navigation/stack";
import {HeaderRight} from "../components/HeaderRight";
import {COLORS} from "../constants/ColorConstants";

interface IRootNavigatorProps {}

const Stack = createStackNavigator();
export const RootNavigator: React.FC<IRootNavigatorProps> = (_props: IRootNavigatorProps): JSX.Element => {
  const headerBackButtonRender = () => {
    return <HeaderBackButton />;
  };

  const headerRightRender = (options: {showRightDrawer: boolean; showBellIcon: boolean; showCloseIcon: boolean}) => {
    return <HeaderRight showBellIcon={options.showBellIcon} showDrawerMenu={options.showRightDrawer} />;
  };

  const setHeaderOptions = (options: {
    hideHeader: boolean;
    headerTitle: string;
    showBackButton: boolean;
    showRightDrawer: boolean;
    showBellIcon: boolean;
    showCloseIcon: boolean;
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
      headerBackTitleVisible: false,
      headerLeft: () => headerBackButtonRender(),
      headerRight: () => {
        return headerRightRender({
          showBellIcon: options.showBellIcon,
          showRightDrawer: options.showRightDrawer,
          showCloseIcon: options.showCloseIcon,
        });
      },
    };
  };

  return (
    <Stack.Navigator initialRouteName={WELCOME_SCREEN}>
      <Stack.Screen
        name={WELCOME_SCREEN}
        component={WelcomeScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "",
            showBackButton: false,
            showRightDrawer: false,
            showBellIcon: false,
            showCloseIcon: false,
          }) as INoTyppedValue
        }
      />
      <Stack.Screen
        name={LOGIN_SCREEN}
        component={LoginScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "",
            showBackButton: false,
            showRightDrawer: false,
            showBellIcon: false,
            showCloseIcon: false,
          }) as INoTyppedValue
        }
      />
      <Stack.Screen
        name={VERIFICATION_SCREEN}
        component={VerificationScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "",
            showBackButton: false,
            showRightDrawer: false,
            showBellIcon: false,
            showCloseIcon: false,
          }) as INoTyppedValue
        }
      />
    </Stack.Navigator>
  );
};
