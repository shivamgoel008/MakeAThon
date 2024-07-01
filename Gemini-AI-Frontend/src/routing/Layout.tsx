import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet, SafeAreaView} from "react-native";
import {SplashScreen} from "../screens/splashScreen/SplashScreen";
import {RouteMain} from "./RouteMain";
import {ToastProvider} from "react-native-toast-notifications";
import {COLORS} from "../constants/ColorConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ZINGVEL_AUTH_DATA} from "../constants/TextConstants";
import {useAppDispatch, useAppSelector} from "../redux/reduxHooks";
import {setUserAction} from "../redux/Actions/UserAction";
import Geolocation from "@react-native-community/geolocation";
import {IAxiosError, IAxiosSuccess} from "../interfaces/ICommon";
import {setInternetConnected, setUserLocation} from "../redux/Actions/CommonAction";
import {ReduxRootState} from "../redux/ReduxStore";
import {getUserFromTokenService} from "../services/SUser";
import {useNetInfo} from "@react-native-community/netinfo";
import {NoInternet} from "../screens/noInternet/noInternet";
import {getAxios} from "../helpers/utils/axiosInstance";
import {axiosResponseValidation} from "../helpers/utils/CommonFunctions";
import {IUser} from "../interfaces/IUser";

export const Layout: React.FC = (): JSX.Element => {
  const [seeSplash, setSeeSplash] = useState<boolean>(true);

  const {registeredUser} = useAppSelector((state: ReduxRootState) => state.userReducer);

  const {isInternetConnected} = useAppSelector((state: ReduxRootState) => state.commonReducer);

  const dispatch = useAppDispatch();

  const netInfo = useNetInfo();

  const handleLogout = async (): Promise<void> => {
    await AsyncStorage.clear();
    dispatch(setUserAction({} as IUser));
  };

  const getRegisteredUserFromToken = (authData: string): void => {
    getUserFromTokenService(authData)
      .then((res: IAxiosSuccess) => {
        if (axiosResponseValidation(res)) {
          const result: IUser = res.data;
          dispatch(setUserAction(result));
          // console.log("AAA", result.userBadges);
          // if (result.userBadges) {
          //   const badgeRequest: IGetUserBadge = {id: result.userBadges.badgeId};
          //   getUserBadges(badgeRequest)
          //     .then((badgeRes: IAxiosSuccess) => {
          //       console.log("AAA", badgeRes);

          //       if (axiosResponseValidation(badgeRes)) {
          //         const newReqUser: IUser = {
          //           ...registeredUser,
          //           userBadges: {...registeredUser.userBadges, name: badgeRes.data.name},
          //         };
          //         dispatch(setUserAction(newReqUser));
          //       }
          //     })
          //     .catch((err: IAxiosError) => {
          //       console.log(err);
          //       handleLogout();
          //     });
          // }
        } else {
          handleLogout();
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
        handleLogout();
      })
      .finally(() => {
        setSeeSplash(false);
      });
  };

  const checkUserExists = async (): Promise<void> => {
    try {
      const authDataString = await AsyncStorage.getItem(ZINGVEL_AUTH_DATA);
      const authData = JSON.parse(authDataString || "");
      if (authData) {
        getRegisteredUserFromToken(authData.authToken);
      } else {
        setSeeSplash(false);
      }
    } catch (error) {
      setSeeSplash(false);
    }
  };

  useEffect(() => {
    checkUserExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      getAxios("/cities/reverse_geolocation", {
        params: {latitude: info.coords.latitude, longitude: info.coords.longitude},
      })
        .then((res: IAxiosSuccess) => {
          if (axiosResponseValidation(res)) {
            dispatch(setUserLocation(res.data));
          }
        })
        .catch((err: IAxiosError) => {
          console.log(err);
        })
        .finally(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkInternetConnected = useCallback(() => {
    if (netInfo.isConnected || netInfo.isInternetReachable) {
      dispatch(setInternetConnected(true));
    } else {
      dispatch(setInternetConnected(false));
    }
  }, [dispatch, netInfo.isConnected, netInfo.isInternetReachable]);

  useEffect(() => {
    checkInternetConnected();
  }, [checkInternetConnected]);

  const renderComponent = (): JSX.Element => {
    if (!isInternetConnected) {
      return <NoInternet />;
    } else if (seeSplash && Boolean(registeredUser)) {
      return <SplashScreen />;
    }
    return <RouteMain />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ToastProvider
        placement="center"
        duration={3000}
        animationType="slide-in"
        animationDuration={250}
        successColor="green"
        dangerColor={COLORS.CLR_ERROR}
        warningColor="orange"
        normalColor="gray"
        offsetBottom={100}
        swipeEnabled={true}>
        {renderComponent()}
      </ToastProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.CLR_WHITE,
  },
});
