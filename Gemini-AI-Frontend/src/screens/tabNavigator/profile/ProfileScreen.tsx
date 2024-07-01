import {View, StyleSheet, ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {TextUi} from "../../../components/TextUI";
import {FOLLOWERS_SCREEN} from "../../../constants/RouteConstants";
import {Choose, OtherWise, When} from "../../../helpers/utils/Conditionals";
import {useAppDispatch, useAppSelector} from "../../../redux/reduxHooks";
import {ReduxRootState} from "../../../redux/ReduxStore";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import EntypoIcons from "react-native-vector-icons/Entypo";
import {WanderListContainer} from "./components/WanderListContainer";
import {ImageUi} from "../../../components/ImageUi";
import {TouchableOpacity} from "react-native-gesture-handler";
import {PostsContainer} from "./components/PostsContainer";
import {getUserPostsService} from "../../../services/SPosts";
import {IGetUserPostsReq} from "../../../interfaces/IPosts";
import {setUserPosts} from "../../../redux/Actions/PostsActions";
import {axiosResponseValidation} from "../../../helpers/utils/CommonFunctions";
import {COLORS} from "../../../constants/ColorConstants";
import {horizontalScale, moderateScale, verticalScale} from "../../../helpers/utils/metrics";
import {IWanderListItem} from "../../../interfaces/IWanderList";
import {getUserWanderlistService} from "../../../services/SWanderlist";

interface IProfileScreenProps {
  navigation: INoTyppedValue;
}

export const ProfileScreen: React.FC<IProfileScreenProps> = (props: IProfileScreenProps): JSX.Element => {
  const {registeredUser} = useAppSelector((state: ReduxRootState) => state.userReducer);
  const {userLocation} = useAppSelector((state: ReduxRootState) => state.commonReducer);
  const {userPosts} = useAppSelector((state: ReduxRootState) => state.postReducer);

  const [linesTruncate, setLinesTruncate] = useState<3 | undefined>(3);

  const [wanderlists, setWadnerlists] = useState<Array<IWanderListItem>>([]);

  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<"timeline" | "wanderlist">("timeline");

  const onDescriptionClick = (): void => {
    if (linesTruncate === 3) {
      setLinesTruncate(undefined);
    } else {
      setLinesTruncate(3);
    }
  };

  const handleFollowersClick = (): void => {
    props.navigation.navigate(FOLLOWERS_SCREEN, {userId: registeredUser.id});
  };

  const getUserPosts = (): void => {
    const req: IGetUserPostsReq = {
      userId: registeredUser.id,
    };
    getUserPostsService(req)
      .then((res: IAxiosSuccess) => {
        if (axiosResponseValidation(res)) {
          dispatch(setUserPosts(res.data));
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const getUserWanderlists = (): void => {
    getUserWanderlistService(registeredUser.id)
      .then((res: IAxiosSuccess) => {
        setWadnerlists(res.data);
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
    if (wanderlists.length === 0) {
      getUserWanderlists();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.view1}>
        <ImageUi url={registeredUser.avatarImage || ""} containerSx={styles.view1Image} />
        <View style={styles.view1Div1}>
          <View style={styles.view1Div2}>
            <TextUi variant="h1" sx={styles.view1Text1}>
              {`${registeredUser?.firstName} ${registeredUser.lastName}` || ""}
            </TextUi>
          </View>
          <View style={styles.locationDiv}>
            <EntypoIcons name="location-pin" color={COLORS.CLR_BLUE_1} size={14} style={styles.locationDivIcon} />
            <TextUi variant="h2" sx={styles.view1Loc}>
              {userLocation?.city || "Delhi"}
            </TextUi>
          </View>
          <View style={styles.view1Div3}>
            <TextUi
              variant="body2"
              sx={styles.view1Text2}
              onPress={() => onDescriptionClick()}
              numberOfLines={linesTruncate}>
              {registeredUser?.bio || "I am a disco dancer"}
            </TextUi>
          </View>
        </View>
      </View>
      <View style={styles.view2}>
        {/* <TouchableOpacity style={styles.view2Div1} onPress={() => setMode("wanderlist")}>
          <TextUi variant="h1" sx={styles.view2Text}>
            {`${registeredUser.wanderlist?.length || 0}`}
          </TextUi>
          <TextUi variant="h2" sx={styles.view3Text}>
            Places
          </TextUi>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.view2Div1} onPress={() => setMode("wanderlist")}>
          <TextUi variant="h1" sx={styles.view2Text}>
            {`${registeredUser.wanderlist?.length || 0}`}
          </TextUi>
          <TextUi variant="h2" sx={styles.view3Text}>
            Wanderlists
          </TextUi>
        </TouchableOpacity>
        <TouchableOpacity style={styles.view2Div1} onPress={() => handleFollowersClick()}>
          <TextUi variant="h1" sx={styles.view2Text}>
            {`${registeredUser.followers?.length || 0}`}
          </TextUi>
          <TextUi variant="h2" sx={styles.view3Text}>
            Connections
          </TextUi>
        </TouchableOpacity>
      </View>
      <View style={styles.twlBtnWrapper}>
        <View style={mode === "timeline" ? [styles.twlBtnView, styles.twlBtnViewSelected] : styles.twlBtnView}>
          <TouchableOpacity onPress={() => setMode("timeline")}>
            <React.Fragment>
              <TextUi
                variant="body1"
                sx={mode === "timeline" ? [styles.twlBtnText, styles.twlBtnTextSelected] : styles.twlBtnText}>
                Prescription
              </TextUi>
            </React.Fragment>
          </TouchableOpacity>
        </View>

        <View style={mode === "wanderlist" ? [styles.twlBtnView, styles.twlBtnViewSelected] : styles.twlBtnView}>
          <TouchableOpacity onPress={() => setMode("wanderlist")}>
            <React.Fragment>
              <TextUi
                variant="body1"
                sx={mode === "wanderlist" ? [styles.twlBtnText, styles.twlBtnTextSelected] : styles.twlBtnText}>
                Allergies
              </TextUi>
            </React.Fragment>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.childContainerView}>
        <Choose>
          <When condition={mode === "timeline"}>
            <React.Fragment>
              <PostsContainer navigation={props.navigation} posts={userPosts} profile="personal" />
            </React.Fragment>
          </When>
          <OtherWise>
            <WanderListContainer navigation={props.navigation} wanderlists={wanderlists} profile="personal" />
          </OtherWise>
        </Choose>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
  },
  view1: {
    marginTop: verticalScale(20),
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  view1Image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  view1Div1: {
    paddingLeft: 30,
    flex: 1,
    display: "flex",
    justifyContent: "space-evenly",
  },
  view1Div2: {},
  view1Div3: {},
  view1Icon: {},
  view1Text1: {
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(22),
    fontWeight: "400",
    letterSpacing: 1.2,
    fontFamily: "Poppins",
  },
  view1Icon2: {
    marginTop: verticalScale(20),
  },
  view1Text2: {
    fontSize: 14,
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
  },
  locationDivIcon: {
    color: COLORS.CLR_BLUE_1,
    marginLeft: moderateScale(-1.5),
  },
  view1Loc: {
    color: COLORS.CLR_BLUE_1,
    fontSize: moderateScale(14),
    fontFamily: "Lato",
    fontWeight: "400",
    marginLeft: horizontalScale(2),
  },
  view2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: verticalScale(10),
    padding: 5,
  },
  view2Div1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  view2Text: {
    color: COLORS.CLR_TEXT,
    fontSize: 14,
    letterSpacing: 1.2,
    fontWeight: "500",
  },
  view3Text: {
    color: COLORS.CLR_TEXT,
    fontSize: 12,
    paddingTop: verticalScale(5),
    letterSpacing: 1.2,
    fontFamily: "Lato",
    fontWeight: "400",
  },
  twlBtnWrapper: {
    marginVertical: verticalScale(20),
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  twlBtnView: {
    width: "45%",
    padding: 7,
    borderRadius: 30 / 2,
    borderColor: COLORS.CLR_PRIMARY,
    borderWidth: 0.5,
    justifyContent: "center",
    display: "flex",
  },
  twlBtnViewSelected: {
    backgroundColor: COLORS.CLR_PRIMARY,
    borderColor: COLORS.CLR_PRIMARY,
  },
  twlBtnText: {
    textAlign: "center",
    color: COLORS.CLR_PRIMARY,
    fontSize: 15,
    fontFamily: "Lato",
    letterSpacing: 1.2,
    fontWeight: "500",
  },
  twlBtnTextSelected: {color: COLORS.CLR_WHITE},

  childContainerView: {
    flexGrow: 1,
  },
});
