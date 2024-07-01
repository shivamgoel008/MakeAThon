import React from "react";
import {
  TAB_SCREEN,
  EDIT_PROFILE_SCREEN,
  PRIVACY_POLICY_SCREEN,
  TERMS_CONDITIONS_SCREEN,
  CONTACT_US_SCREEN,
  DISABLE_REASON_SCREEN,
  FAQ_SCREEN,
  INVITE_FRIEND_SCREEN,
  FOLLOWERS_SCREEN,
  RIGHT_DRAWER_SCREEN,
  ITERNITY_SCREEN,
  HOME_SCREEN,
  AVATAR_UPLOAD_SCREEN,
  POST_UPLOAD_SCREEN,
  PREFRENCES_SCREEN,
  WANDERLIST_CHOICES_SCHREEN,
  WANDERLIST_DMP_SCREEN,
  SEARCH_SCREEN,
  FEEDS_ITEM_SCREEN,
  PUBLIC_PROFILE_SCREEN,
  TRIP_PLANNER_SCREEN,
} from "../constants/RouteConstants";
import {HeaderBackButton} from "../components/HeaderBackButton";
import {PrivacyPolicy} from "../screens/authNavigator/privacyPolicy/PrivacyPolicy";
import {INoTyppedValue} from "../interfaces/ICommon";
import {TermsAndConditions} from "../screens/authNavigator/termsAndConditions/TermsAndConditions";
import {HeaderRight} from "../components/HeaderRight";
import {RightDrawer} from "../components/RightDrawer";
import {TabNavigation} from "./TabNavigation";
import {InviteFriendScreen} from "../screens/authNavigator/inviteFriendScreen/InviteFriendScreen";
import {FaqScreen} from "../screens/authNavigator/faqScreen/FaqScreen";
import {ContactUsScreen} from "../screens/authNavigator/contactUsScreen/ContactUsScreen";
import {DisableReasonScreen} from "../screens/authNavigator/DisableReasonScreen/DisableReasonScreen";
import {PrefrencesScreen} from "../screens/authNavigator/prefrences/Prefrences";
import {FollowersScreen} from "../screens/tabNavigator/profile/Followers";
import {createStackNavigator} from "@react-navigation/stack";
import {useAppSelector} from "../redux/reduxHooks";
import {ReduxRootState} from "../redux/ReduxStore";
import {COLORS} from "../constants/ColorConstants";
import {IternityScreen} from "../screens/authNavigator/iternityScreen/IternityScreen";
import {AvatarUploadScreen} from "../screens/authNavigator/avatarUpload/AvatarUpload";
import {EditProfileScreen} from "../screens/authNavigator/editProfile/EditProfile";
import {WanderListChoiceScreen} from "../screens/authNavigator/wanderListChoice/WanderListChoiceScreen";
import {WanderListDmpScreen} from "../screens/authNavigator/wanderListDmp/wanderListScreen";
import {SearchScreen} from "../screens/tabNavigator/home/SearchScreen";
import {PostUploadScreen} from "../screens/authNavigator/postUpload/PostUpload";
import {FeedsItem} from "../screens/tabNavigator/feeds/FeedItemDialog";
import {PublicProfileScreen} from "../screens/tabNavigator/profile/PublicProfileScreen";
import {TripPlannerScreen} from "../screens/authNavigator/tripPlannerScreen/TripPlannerScreen";

interface IAuthNavigatorProps {
  navigation: INoTyppedValue;
}

export const AuthNavigator: React.FC<IAuthNavigatorProps> = (_props: IAuthNavigatorProps): JSX.Element => {
  const StackNavigation = createStackNavigator();
  const {registeredUser, isNewUser} = useAppSelector((state: ReduxRootState) => state.userReducer);

  const headerBackButtonRender = () => {
    return <HeaderBackButton />;
  };

  const headerRightRender = (options: {showRightDrawer: boolean; showBellIcon: boolean}) => {
    return <HeaderRight showBellIcon={options.showBellIcon} showDrawerMenu={options.showRightDrawer} />;
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
      title: `${options?.headerTitle || ""}`,
      headerStyle: {
        backgroundColor: COLORS.CLR_WHITE,
      },
      headerBackTitleVisible: false,
      headerLeft: () => (options.showBackButton ? headerBackButtonRender() : undefined),
      headerRight: () => {
        return headerRightRender({
          showBellIcon: options.showBellIcon,
          showRightDrawer: options.showRightDrawer,
        });
      },
    };
  };

  return (
    <StackNavigation.Navigator initialRouteName={isNewUser ? AVATAR_UPLOAD_SCREEN : HOME_SCREEN}>
      <StackNavigation.Screen name={TAB_SCREEN} component={TabNavigation} options={{headerShown: false}} />

      <StackNavigation.Screen
        name={AVATAR_UPLOAD_SCREEN}
        component={AvatarUploadScreen}
        options={
          setHeaderOptions({
            hideHeader: Boolean(isNewUser),
            headerTitle: "Avatar",
            showBackButton: !isNewUser,
            showRightDrawer: !isNewUser,
            showBellIcon: !isNewUser,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
        options={
          setHeaderOptions({
            hideHeader: Boolean(isNewUser),
            headerTitle: "Edit Profile",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={PREFRENCES_SCREEN}
        component={PrefrencesScreen}
        options={
          setHeaderOptions({
            hideHeader: Boolean(isNewUser),
            headerTitle: "Prefrences",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={POST_UPLOAD_SCREEN}
        component={PostUploadScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "Travel Uploads",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={WANDERLIST_CHOICES_SCHREEN}
        component={WanderListChoiceScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "",
            showBackButton: false,
            showRightDrawer: false,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={FOLLOWERS_SCREEN}
        component={FollowersScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "Suggested Travellers",
            showBackButton: false,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={WANDERLIST_DMP_SCREEN}
        component={WanderListDmpScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "WanderList",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={PRIVACY_POLICY_SCREEN}
        component={PrivacyPolicy}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Account",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={TERMS_CONDITIONS_SCREEN}
        component={TermsAndConditions}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Account",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={DISABLE_REASON_SCREEN}
        component={DisableReasonScreen}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Settings",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={INVITE_FRIEND_SCREEN}
        component={InviteFriendScreen}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Invite a Friend",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={FAQ_SCREEN}
        component={FaqScreen}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Questions",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={CONTACT_US_SCREEN}
        component={ContactUsScreen}
        options={
          setHeaderOptions({
            hideHeader: false,
            headerTitle: "Support",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={SEARCH_SCREEN}
        component={SearchScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={ITERNITY_SCREEN}
        component={IternityScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={FEEDS_ITEM_SCREEN}
        component={FeedsItem}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={PUBLIC_PROFILE_SCREEN}
        component={PublicProfileScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "Support",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={RIGHT_DRAWER_SCREEN}
        component={RightDrawer}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: `${registeredUser?.firstName || ""}`,
            showBackButton: true,
            showRightDrawer: false,
            showBellIcon: true,
          }) as INoTyppedValue
        }
      />

      <StackNavigation.Screen
        name={TRIP_PLANNER_SCREEN}
        component={TripPlannerScreen}
        options={
          setHeaderOptions({
            hideHeader: true,
            headerTitle: "",
            showBackButton: true,
            showRightDrawer: true,
            showBellIcon: false,
          }) as INoTyppedValue
        }
      />
    </StackNavigation.Navigator>
  );
};
