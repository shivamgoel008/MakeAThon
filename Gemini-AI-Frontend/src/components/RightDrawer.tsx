import {View, StyleSheet, Linking, ScrollView, TouchableOpacity as TO} from "react-native";
import React from "react";
import {COLORS} from "../constants/ColorConstants";
import {TextUi} from "./TextUI";
import {TouchableOpacity} from "react-native-gesture-handler";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import {useAppDispatch, useAppSelector} from "../redux/reduxHooks";
import {setUserAction} from "../redux/Actions/UserAction";
import Feather from "react-native-vector-icons/Feather";
import IndianFlag from "../assets/media/flag.svg";
import {
  CONTACT_US_SCREEN,
  FAQ_SCREEN,
  INVITE_FRIEND_SCREEN,
  PRIVACY_POLICY_SCREEN,
  ROOT_NAVIGATOR_SCREEN,
  TERMS_CONDITIONS_SCREEN,
  WELCOME_SCREEN,
  AUTH_NAVIGATOR_SCREEN,
  AVATAR_UPLOAD_SCREEN,
  PREFRENCES_SCREEN,
  EDIT_PROFILE_SCREEN,
  DISABLE_REASON_SCREEN,
} from "../constants/RouteConstants";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import {horizontalScale, moderateScale, verticalScale} from "../helpers/utils/metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {INoTyppedValue} from "../interfaces/ICommon";
import {ReduxRootState} from "../redux/ReduxStore";
import {ImageUi} from "./ImageUi";
import {IUser} from "../interfaces/IUser";

interface IRightDrawerProps {
  navigation: INoTyppedValue;
}

export const RightDrawer: React.FC<IRightDrawerProps> = (props: IRightDrawerProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      dispatch(setUserAction({} as IUser));
      props.navigation.navigate(ROOT_NAVIGATOR_SCREEN, {screen: WELCOME_SCREEN});
    } catch (err) {
      console.log(err);
    }
  };

  const handleSocialMediaClick = (type: "twitter" | "instagram" | "facebook" | "youtube") => {
    switch (type) {
      case "twitter":
        Linking.openURL("https://twitter.com/ZingVelTravel");
        break;
      case "instagram":
        Linking.openURL("https://www.instagram.com/travelwithzingvel/");
        break;
      case "facebook":
        Linking.openURL("https://www.facebook.com/people/Zingvel/100092728234634/");
        break;
      case "youtube":
        Linking.openURL("https://www.youtube.com/@Zingvel");
        break;
      default:
        undefined;
    }
  };

  const {registeredUser} = useAppSelector((state: ReduxRootState) => state.userReducer);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Ionicons name="arrow-back" color={COLORS.CLR_TEXT} size={22} onPress={() => props.navigation.goBack()} />
      </View>
      <View style={styles.userInfoView}>
        <View style={styles.imageView}>
          <ImageUi url={registeredUser.avatarImage || ""} containerSx={styles.userImage} />
          <TO
            style={styles.avatarEditWrapper}
            onPress={() => {
              props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: AVATAR_UPLOAD_SCREEN});
            }}>
            <Feather name="edit" size={15} color={COLORS.CLR_TEXT} />
          </TO>
        </View>
        <View style={styles.userInfo}>
          <TextUi variant="h2" sx={styles.userNameText}>
            {registeredUser.userName}
          </TextUi>
          <TextUi variant="h2" sx={styles.emailText}>
            {registeredUser.email || ""}
          </TextUi>
        </View>
      </View>
      <View style={styles.badgeInfoView}>
        <ImageUi url="https://zingvel.s3.amazonaws.com/badge.png" containerSx={styles.badgeIcon} />

        <TextUi variant="h2" sx={styles.badgeName}>
          {registeredUser?.userBadges?.badge?.name || "Badge Name"}
        </TextUi>
        <AntDesign name="right" color={COLORS.CLR_PRIMARY} size={15} style={styles.rightArrowIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollView} style={styles.scrollStyle}>
        <TouchableOpacity
          style={styles.singleCardWrapper}
          onPress={() => {
            props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: EDIT_PROFILE_SCREEN});
          }}>
          <View style={styles.iconView}>
            <Feather name="edit" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
          </View>
          <TextUi variant="h2" sx={styles.cardLabelSingle}>
            Edit Profile
          </TextUi>
          <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.singleCardWrapper}
          onPress={() => {
            props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: EDIT_PROFILE_SCREEN});
          }}>
          <View style={styles.iconView}>
            <Ionicons name="settings-outline" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
          </View>
          <TextUi variant="h2" sx={styles.cardLabelSingle}>
            Account Settings
          </TextUi>
          <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.singleCardWrapper}
          onPress={() => {
            props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: PREFRENCES_SCREEN});
          }}>
          <View style={styles.iconView}>
            <Feather name="anchor" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
          </View>
          <TextUi variant="h2" sx={styles.cardLabelSingle}>
            Prefrences
          </TextUi>
          <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIcon} />
        </TouchableOpacity>
        <View style={styles.multiCardWrapper}>
          <View style={styles.cardHeading}>
            <View style={styles.cardBullet} />
            <TextUi variant="h2" sx={styles.cardLabelMulti}>
              About Us
            </TextUi>
          </View>
          <TouchableOpacity style={styles.cardItem} onPress={() => props.navigation.navigate(TERMS_CONDITIONS_SCREEN)}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <Entypo name="text-document" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapper}>
              <TextUi variant="h2" sx={styles.cardLabelMultiBorder}>
                Terms and Conditions
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => props.navigation.navigate(PRIVACY_POLICY_SCREEN)}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <Ionicons name="information-circle-outline" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapperLast}>
              <TextUi variant="h2" sx={styles.cardLabelMultiNoBorder}>
                Privacy Policy
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.multiCardWrapper}>
          <View style={styles.cardHeading}>
            <View style={styles.cardBullet} />
            <TextUi variant="h2" sx={styles.cardLabelMulti}>
              Support
            </TextUi>
          </View>
          <TouchableOpacity style={styles.cardItem} onPress={() => props.navigation.navigate(FAQ_SCREEN)}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <MaterialCommunityIcons
                  name="message-question-outline"
                  color={COLORS.CLR_TEXT}
                  size={16}
                  style={styles.cardIcon}
                />
              </View>
            </View>
            <View style={styles.itemLabelWrapper}>
              <TextUi variant="h2" sx={styles.cardLabelMultiBorder}>
                FAQ
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => props.navigation.navigate(CONTACT_US_SCREEN)}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <MaterialIcon name="support-agent" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapper}>
              <TextUi variant="h2" sx={styles.cardLabelMultiBorder}>
                Connect with Us
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => props.navigation.navigate(INVITE_FRIEND_SCREEN)}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <AntDesign name="notification" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapperLast}>
              <TextUi variant="h2" sx={styles.cardLabelMultiNoBorder}>
                Invite a Friend
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.multiCardWrapper}>
          <View style={styles.cardHeading}>
            <View style={styles.cardBullet} />
            <TextUi variant="h2" sx={styles.cardLabelMulti}>
              Social Media
            </TextUi>
          </View>

          <TouchableOpacity style={styles.cardItem} onPress={() => handleSocialMediaClick("twitter")}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <MaterialCommunityIcons name="twitter" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapper}>
              <TextUi variant="h2" sx={styles.cardLabelMultiBorder}>
                Twitter
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => handleSocialMediaClick("instagram")}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <AntDesign name="instagram" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapper}>
              <TextUi variant="h2" sx={styles.cardLabelMultiBorder}>
                Instagram
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => handleSocialMediaClick("facebook")}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <Fontisto name="facebook" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapperLast}>
              <TextUi variant="h2" sx={styles.cardLabelMultiNoBorder}>
                Facebook
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.multiCardWrapper}>
          <View style={styles.cardHeading}>
            <View style={styles.cardBullet} />
            <TextUi variant="h2" sx={styles.cardLabelMulti}>
              Support
            </TextUi>
          </View>

          <TouchableOpacity
            style={styles.cardItem}
            onPress={() => {
              props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: DISABLE_REASON_SCREEN});
            }}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <AntDesign name="delete" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapper}>
              <TextUi variant="h2" sx={styles.cardLabelMultiBorder}>
                Delete Account
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardItem} onPress={() => handleLogout()}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconView}>
                <MaterialIcon name="logout" color={COLORS.CLR_TEXT} size={16} style={styles.cardIcon} />
              </View>
            </View>
            <View style={styles.itemLabelWrapperLast}>
              <TextUi variant="h2" sx={styles.cardLabelMultiNoBorder}>
                Logout
              </TextUi>
              <AntDesign name="right" color={COLORS.CLR_TEXT} size={12} style={styles.rightArrowIconMulti} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.flagView}>
          <TextUi variant="h2" sx={styles.flagText}>
            Made In
          </TextUi>
          <IndianFlag style={styles.flag} />
        </View>
        <View style={styles.appVersionView}>
          <TextUi variant="h2" sx={styles.appVersionLabel}>
            App Version :
          </TextUi>
          <TextUi variant="h2" sx={styles.appVersionValue}>
            1.00
          </TextUi>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: horizontalScale(10),
  },
  topView: {
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(10),
  },
  userInfoView: {
    borderTopStartRadius: moderateScale(20),
    borderTopEndRadius: moderateScale(20),
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    backgroundColor: COLORS.CLR_WHITE,
    display: "flex",
    flexDirection: "row",
  },
  imageView: {},
  userImage: {
    height: verticalScale(80),
    width: horizontalScale(80),
    borderRadius: moderateScale(80 / 2),
  },
  avatarEditWrapper: {
    position: "absolute",
    zIndex: 1,
    bottom: -5,
    right: 0,
    backgroundColor: COLORS.CLR_SECONDRY_1,
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    display: "flex",
    justifyContent: "space-evenly",
    marginLeft: horizontalScale(20),
  },
  userNameText: {
    fontSize: moderateScale(25),
    letterSpacing: moderateScale(1.2),
    fontWeight: "500",
  },
  emailText: {
    fontSize: moderateScale(14),
    fontFamily: "Lato",
    fontWeight: "400",
  },
  badgeInfoView: {
    backgroundColor: COLORS.CLR_TEXT,
    borderBottomStartRadius: moderateScale(20),
    borderBottomEndRadius: moderateScale(20),
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  badgeIcon: {
    height: verticalScale(30),
    width: horizontalScale(30),
  },
  badgeName: {
    color: COLORS.CLR_PRIMARY,
    flexGrow: 1,
    marginLeft: horizontalScale(20),
    fontSize: 20,
    letterSpacing: 1.8,
    fontFamily: "Lato",
  },
  scrollView: {
    paddingBottom: verticalScale(40),
  },
  scrollStyle: {
    flex: 1,
  },
  singleCardWrapper: {
    backgroundColor: COLORS.CLR_WHITE,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(15),
    borderTopStartRadius: moderateScale(10),
    borderBottomStartRadius: moderateScale(10),
    borderTopEndRadius: moderateScale(10),
    borderBottomEndRadius: moderateScale(10),
  },
  iconView: {
    backgroundColor: COLORS.CLR_GRAY_4,
    borderRadius: moderateScale(25 / 2),
    height: verticalScale(25),
    width: horizontalScale(25),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  cardIcon: {},
  cardLabelSingle: {
    marginLeft: horizontalScale(15),
    flexGrow: 1,
    fontWeight: "500",
    alignSelf: "center",
    fontSize: 16,
  },
  rightArrowIcon: {
    alignSelf: "center",
  },
  multiCardWrapper: {
    backgroundColor: COLORS.CLR_WHITE,
    marginTop: verticalScale(15),
    borderTopStartRadius: moderateScale(10),
    borderBottomStartRadius: moderateScale(10),
    borderTopEndRadius: moderateScale(10),
    borderBottomEndRadius: moderateScale(10),
  },
  cardHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
  },
  cardItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(5),
  },
  cardBullet: {
    width: horizontalScale(5),
    borderTopEndRadius: moderateScale(10),
    borderBottomEndRadius: moderateScale(10),
    height: "100%",
    backgroundColor: COLORS.CLR_SECONDRY,
  },
  cardLabelMulti: {
    fontWeight: "500",
    letterSpacing: 1.2,
    fontSize: 18,
    fontFamily: "Lato",
    marginLeft: horizontalScale(15),
  },
  iconWrapper: {
    flexGrow: 0,
    marginLeft: horizontalScale(15),
  },
  cardLabelMultiBorder: {
    flexGrow: 1,
    fontWeight: "500",
    fontSize: 15,
  },
  cardLabelMultiNoBorder: {
    flexGrow: 1,
    fontWeight: "500",
    alignSelf: "center",
    fontSize: 15,
  },
  itemLabelWrapper: {
    width: 1,
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    borderBottomColor: COLORS.CLR_GRAY_4,
    borderBottomWidth: 1,
    marginLeft: horizontalScale(15),
    paddingVertical: verticalScale(10),
  },
  itemLabelWrapperLast: {
    width: 1,
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    borderBottomColor: COLORS.CLR_WHITE,
    borderBottomWidth: 1,
    marginLeft: horizontalScale(15),
    paddingVertical: 5,
  },
  rightArrowIconMulti: {
    alignSelf: "center",
    marginRight: horizontalScale(15),
  },
  flagView: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flagText: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1.2,
    fontFamily: "Lato",
  },
  flag: {
    marginLeft: horizontalScale(15),
  },
  appVersionView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  appVersionLabel: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 1.2,
  },
  appVersionValue: {
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 10,
    letterSpacing: 1.5,
  },
});
