import React from "react";
import {AuthNavigator} from "./AuthNavigator";
import {RootNavigator} from "./RootNavigator";
import {useAppSelector} from "../redux/reduxHooks";
import {ReduxRootState} from "../redux/ReduxStore";
import {createStackNavigator} from "@react-navigation/stack";
import {AUTH_NAVIGATOR_SCREEN, ROOT_NAVIGATOR_SCREEN} from "../constants/RouteConstants";
import {NavigationContainer} from "@react-navigation/native";

export const RouteMain: React.FC = (): JSX.Element => {
  const {registeredUser} = useAppSelector((state: ReduxRootState) => state.userReducer);
  const Stack = createStackNavigator();

  const isUserLoggedIn = (): boolean => {
    if (Object.keys(registeredUser).length > 0 && registeredUser.phNumber) {
      return true;
    }
    return false;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isUserLoggedIn() ? AUTH_NAVIGATOR_SCREEN : ROOT_NAVIGATOR_SCREEN}>
        <Stack.Screen name={AUTH_NAVIGATOR_SCREEN} component={AuthNavigator} options={{headerShown: false}} />
        <Stack.Screen name={ROOT_NAVIGATOR_SCREEN} component={RootNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
