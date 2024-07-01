import {View, StyleSheet, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from "react";
import {TextUi} from "../../../components/TextUI";
import {FOLLOWERS_SCREEN} from "../../../constants/RouteConstants";
import {Choose, If, OtherWise, When} from "../../../helpers/utils/Conditionals";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import {WanderListContainer} from "./components/WanderListContainer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {ImageUi} from "../../../components/ImageUi";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {PostsContainer} from "./components/PostsContainer";
import {getUserPostsService} from "../../../services/SPosts";
import {IGetUserPostsReq, IPostItem} from "../../../interfaces/IPosts";
// import {setUserPosts} from "../../../redux/Actions/PostsActions";
import {axiosResponseValidation} from "../../../helpers/utils/CommonFunctions";
import {COLORS} from "../../../constants/ColorConstants";
import {horizontalScale, moderateScale, verticalScale} from "../../../helpers/utils/metrics";
import {useRoute} from "@react-navigation/native";
import {IGetUserByIdReq, IUser} from "../../../interfaces/IUser";
import {getUserById} from "../../../services/SUser";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IPublicProfileScreenProps {
  navigation: INoTyppedValue;
}

export const PublicProfileScreen: React.FC<IPublicProfileScreenProps> = (
  props: IPublicProfileScreenProps,
): JSX.Element => {
  const [pageLoader, setPageLoader] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<IUser>({} as IUser);
  const [userPosts, setUserPosts] = useState<Array<IPostItem>>([]);
  const [mode, setMode] = useState<"timeline" | "wanderlist">("timeline");

  // const {registeredUser} = useAppSelector((state: ReduxRootState) => state.userReducer);
  // const {userLocation} = useAppSelector((state: ReduxRootState) => state.commonReducer);
  // const {userPosts} = useAppSelector((state: ReduxRootState) => state.postReducer);
  // const dispatch = useAppDispatch();

  const route = useRoute();

  const params = route.params as INoTyppedValue;

  const getUserDetails = (): void => {
    setPageLoader(true);
    const req: IGetUserByIdReq = {userId: params.userId};
    getUserById(req)
      .then((res: IAxiosSuccess) => {
        console.log(res);
        if (axiosResponseValidation(res)) {
          setUserForm(res.data);
        }
      })
      .catch((err: IAxiosError) => {
        // console.log("abc");
        console.log(err);
      })
      .finally(() => {
        setPageLoader(false);
      });
  };

  useEffect(() => {
    if (params && params.userId) {
      getUserDetails();
      // getUserPosts();
    } else {
      props.navigation.goBack();
    }
  }, []);

  const handleFollowersClick = (): void => {
    props.navigation.navigate(FOLLOWERS_SCREEN);
  };

  const getUserPosts = (): void => {
    const req: IGetUserPostsReq = {
      userId: params.userId,
    };
    getUserPostsService(req)
      .then((res: IAxiosSuccess) => {
        if (axiosResponseValidation(res)) {
          setUserPosts(res.data);
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (userPosts.length === 0) {
      getUserPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" color={COLORS.CLR_TEXT} size={22} onPress={() => props.navigation.goBack()} />
        <TextUi variant="h1" sx={styles.view1Text1}>
          {`${userForm?.userName}` || ""}
        </TextUi>
        {/* <Ionicons name="notifications" color={COLORS.CLR_TEXT} size={21} style={styles.headerIcon} /> */}
        <Ionicons name="ellipsis-vertical-sharp" color={COLORS.CLR_TEXT} size={20} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <If condition={pageLoader}>
          <View style={styles.dataLoaderView}>
            <ActivityIndicator size="large" color={COLORS.CLR_TEXT} />
          </View>
        </If>
        <View style={styles.view1}>
          <ImageUi url={userForm.avatarImage || ""} containerSx={styles.view1Image} />
          <View style={styles.view1Div1}>
            <View style={styles.view1Div2}>
              <TextUi variant="h1" sx={styles.view1Text1}>
                {`${userForm?.firstName} ${userForm.lastName}` || ""}
              </TextUi>
            </View>
            {/* <View style={styles.locationDiv}> */}
            {/* <EntypoIcons name="location-pin" color={COLORS.CLR_BLUE_1} size={16} style={styles.locationDivIcon} /> */}
            {/* <Ionicons name="md-location-outline" style={styles.locationDivIcon} size={12} /> */}
            {/* <TextUi variant="h2" sx={styles.view1Loc}>
              {userForm?.city || "Delhi"}
            </TextUi> */}
            {/* </View> */}
            <View style={styles.view1Div3}>
              <TextUi variant="body2" sx={styles.view1Text2}>
                {userForm?.bio || "I am a disco dancer"}
              </TextUi>
            </View>
          </View>
        </View>
        <View style={styles.view2}>
          {/* <TouchableOpacity style={styles.view2Div1} onPress={() => setMode("wanderlist")}>
            <TextUi variant="h1" sx={styles.view2Text2}>
              {`${userForm.wanderlist?.length || 0}`}
            </TextUi>
            <TextUi variant="h2" sx={styles.view3Text}>
              Places Visited
            </TextUi>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.view2Div1} onPress={() => setMode("wanderlist")}>
            <TextUi variant="h1" sx={styles.view2Text2}>
              {`${userForm.wanderlist?.length || 0}`}
            </TextUi>
            <TextUi variant="h2" sx={styles.view3Text}>
              Wanderlist Created
            </TextUi>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view2Div1} onPress={() => handleFollowersClick()}>
            <TextUi variant="h1" sx={styles.view2Text3}>
              {`${userForm.followers?.length || 0}`}
            </TextUi>
            <TextUi variant="h2" sx={styles.view3Text}>
              Connected Travellers
            </TextUi>
          </TouchableOpacity>
        </View>
        <View style={styles.view7}>
          <TouchableOpacity
            onPress={() => setMode("timeline")}
            style={mode === "timeline" ? styles.view7BtnSelected : styles.view7Button1}>
            <MaterialCommunityIcons name="chart-timeline-variant-shimmer" size={20} style={styles.divIcon} />
            <TextUi variant="body1" sx={styles.divIconText}>
              Timeline
            </TextUi>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMode("wanderlist")}
            style={mode === "wanderlist" ? styles.view7BtnSelected : styles.view7Button2}>
            <MaterialCommunityIcons name="format-list-checks" size={20} style={styles.divIcon} />
            <TextUi variant="body1" sx={styles.divIconText}>
              Wanderlist
            </TextUi>
          </TouchableOpacity>
        </View>
        <View style={styles.childContainerView}>
          <Choose>
            <When condition={mode === "timeline"}>
              <React.Fragment>
                <PostsContainer navigation={props.navigation} posts={userPosts} profile="public" />
              </React.Fragment>
            </When>
            <OtherWise>
              <WanderListContainer
                navigation={props.navigation}
                wanderlists={userForm.wanderlist || []}
                profile="public"
              />
            </OtherWise>
          </Choose>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // justifyContent:'center',
    alignItems: "center",
    paddingVertical: verticalScale(10),
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: horizontalScale(10),
    // backgroundColor: "red",
  },
  headerIcon: {
    marginRight: horizontalScale(5),
  },
  container: {
    // flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
    // paddingHorizontal: horizontalScale(10)
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
    // paddingHorizontal: horizontalScale(10)
  },
  dataLoaderView: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  view1: {
    marginTop: verticalScale(20),
    display: "flex",
    flexDirection: "row",
    marginHorizontal: horizontalScale(30),
  },
  view1Image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  view1Div1: {
    paddingLeft: 30,
  },
  view1Div2: {},
  view1Div3: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  view1Icon: {},
  view1Text1: {
    marginLeft: horizontalScale(15),
    flexGrow: 1,
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(20),
    fontWeight: "400",
    letterSpacing: 1.5,
    fontFamily: "Poppins",
  },
  view1Icon2: {
    marginTop: verticalScale(20),
  },
  view1Text2: {
    fontSize: 15,
    fontFamily: "Lato",
    fontWeight: "400",
    color: COLORS.CLR_TEXT,
  },
  divIcon: {
    color: COLORS.CLR_TEXT,
  },
  divIconText: {
    marginLeft: horizontalScale(10),
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1.1,
    color: COLORS.CLR_TEXT,
  },
  locationDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  locationDivIcon: {
    marginRight: horizontalScale(5),
    color: COLORS.CLR_BLUE_1,
    marginLeft: moderateScale(-1.5),
  },
  view1Loc: {
    // color: COLORS.CLR_BLUE_1,
    // fontWeight: "400",
    // fontSize: 12,

    color: COLORS.CLR_BLUE_1,
    // paddingBottom: 5,
    fontSize: moderateScale(14),
    fontFamily: "Lato",
    fontWeight: "400",
    marginLeft: horizontalScale(5),

    // backgroundColor: "yellow",

    // alignSelf: "center",
    // verticalAlign: "middle",
    // paddingTop: 15,
  },

  // locationIcon: {marginLeft: moderateScale(-1.5)},
  // view7TextLoc: {
  //   color: COLORS.CLR_BLUE_1,
  //   // paddingBottom: 5,
  //   fontSize: moderateScale(14),
  //   fontFamily: "Lato",
  //   fontWeight: "400",
  //   marginLeft: horizontalScale(5),

  //   // backgroundColor: "yellow",

  //   // alignSelf: "center",
  //   // verticalAlign: "middle",
  //   // paddingTop: 15,
  // },

  view2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: verticalScale(25),
  },
  view2Div1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  view2Text2: {
    color: COLORS.CLR_TEXT,
    fontWeight: "400",
    fontSize: 18,
  },
  view2Text3: {
    color: COLORS.CLR_TEXT,
    fontWeight: "400",
    fontSize: 18,
  },
  view3Text: {
    color: COLORS.CLR_TEXT,
    fontSize: 10,
    paddingTop: verticalScale(5),
  },
  view7: {
    elevation: 5,
    marginTop: verticalScale(20),
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    backgroundColor: COLORS.CLR_SECONDRY_1,
    // paddingVertical: 10,
  },
  view7Button1: {
    width: "100%",
    paddingVertical: verticalScale(10),
    // alignItems: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  view7BtnSelected: {
    width: "100%",
    paddingVertical: verticalScale(10),

    alignItems: "center",
    borderBottomWidth: moderateScale(5),
    borderBottomColor: COLORS.CLR_PRIMARY,
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: horizontalScale(7),
  },
  view7Button2: {
    paddingVertical: verticalScale(10),
    alignItems: "center",
    // textAlign: "center",
    width: "100%",
    // height: "100%",
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    // fontSize: 12,
    borderBottomWidth: moderateScale(5),
    borderBottomColor: COLORS.CLR_SECONDRY_1,
    // backgroundColor: "red",
  },
  childContainerView: {
    flexGrow: 1,
  },
});
