import {View, StyleSheet, Share, TouchableOpacity as TO} from "react-native";
import React from "react";
import {TextUi} from "../../../../components/TextUI";
import {Choose, OtherWise, When} from "../../../../helpers/utils/Conditionals";
import {COLORS} from "../../../../constants/ColorConstants";
import {verticalScale, horizontalScale, moderateScale} from "../../../../helpers/utils/metrics";
import Feather from "react-native-vector-icons/Feather";
import {INoTyppedValue} from "../../../../interfaces/ICommon";
import {ImageUi} from "../../../../components/ImageUi";
import {
  AUTH_NAVIGATOR_SCREEN,
  FEEDS_ITEM_SCREEN,
  POST_UPLOAD_SCREEN,
  WANDERLIST_DMP_SCREEN,
} from "../../../../constants/RouteConstants";
import {IPostItem, IPostItemMedia} from "../../../../interfaces/IPosts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import Entypo from "react-native-vector-icons/Entypo";
import {TouchableOpacity} from "react-native-gesture-handler";

interface IPostContainerProps {
  navigation: INoTyppedValue;
  posts: Array<IPostItem>;
  profile: "public" | "personal";
}

export const PostsContainer: React.FC<IPostContainerProps> = (props: IPostContainerProps): JSX.Element => {
  const handleLocationPress = (item: IPostItem): void => {
    props.navigation.navigate(WANDERLIST_DMP_SCREEN, {
      city: item.city,
    });
  };

  const sharePostItem = async (elem: IPostItem): Promise<void> => {
    try {
      const result = await Share.share({
        message: `Share the memory by ${elem.user.firstName} ${elem.user.lastName} in ${elem.city.city}, ${elem.city.state}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Choose>
        <When condition={props.posts.length === 0}>
          {props.profile === "personal" ? (
            <TouchableOpacity
              style={styles.view1}
              onPress={() => props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: POST_UPLOAD_SCREEN})}>
              <Feather name="upload" size={20} style={styles.Icon} />
              <TextUi variant="body1" sx={styles.view2}>
                Upload Pictures and Videos of Past Travel
              </TextUi>
              <TextUi variant="body1" sx={styles.view3}>
                Hi there, share your best travel experience with photos and video here!
              </TextUi>
            </TouchableOpacity>
          ) : (
            <View style={styles.publicNoView}>
              <TextUi variant="body1" sx={styles.publicNoText}>
                No Posts added by user
              </TextUi>
            </View>
          )}
        </When>
        <OtherWise>
          {props.posts && props.profile === "personal" && (
            <TouchableOpacity
              style={styles.view8}
              onPress={() => props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: POST_UPLOAD_SCREEN})}>
              <Feather name="upload" size={14} color={COLORS.CLR_SECONDRY} />

              <TextUi variant="h2" sx={styles.view8Text1}>
                Upload Photos or Videos
              </TextUi>
            </TouchableOpacity>
          )}
          <View style={styles.postWrapper}>
            {props.posts &&
              props.posts?.map((elem: IPostItem, idx: number) => {
                return (
                  <View key={idx} style={styles.postItemWrapper}>
                    <View style={styles.postTimeView}>
                      <TextUi variant="caption" sx={styles.postTimeText}>
                        {`${moment(elem.created_at).format("DD - MMMM - YYYY")}`}
                      </TextUi>
                    </View>
                    <View style={styles.postDescWrapper}>
                      <View style={styles.postTimeLine} />
                      <View style={styles.mainItem}>
                        <TouchableOpacity style={styles.postLocationView} onPress={() => handleLocationPress(elem)}>
                          <Entypo name="location" size={12} color={COLORS.CLR_BLUE_1} />
                          <TextUi variant="caption" sx={styles.postLocationText}>
                            {elem.city.city}
                          </TextUi>
                        </TouchableOpacity>
                        <TO
                          style={styles.postElevatedItem}
                          onPress={() => props.navigation.navigate(FEEDS_ITEM_SCREEN, {feed: elem})}>
                          <View style={styles.postDesctiptionView}>
                            <TextUi variant="caption" sx={styles.postDescriptionText} numberOfLines={3}>
                              {elem.description}
                            </TextUi>
                          </View>
                          <View style={styles.postMediaView}>
                            {elem.media.map((item: IPostItemMedia, cidx: number) => {
                              return <ImageUi url={item.mediaUrl} key={cidx} containerSx={styles.postMediaItem} />;
                            })}
                          </View>
                          <View style={styles.postActionView}>
                            <View style={styles.postLikesView}>
                              <MaterialCommunityIcons
                                name="lightning-bolt"
                                size={20}
                                color={COLORS.CLR_PRIMARY}
                                style={styles.postLikeIcon}
                              />
                              <TextUi variant="caption" sx={styles.postLikeText}>
                                60
                              </TextUi>
                            </View>
                            <View style={styles.postShareView}>
                              <FontAwesome
                                name="share-square-o"
                                size={15}
                                color={COLORS.CLR_BLUE_1}
                                style={styles.postShareIcon}
                                onPress={() => sharePostItem(elem)}
                              />
                            </View>
                          </View>
                        </TO>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </OtherWise>
      </Choose>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_GRAY_3,
    justifyContent: "center",
  },
  view1: {
    alignSelf: "center",
    paddingVertical: verticalScale(30),
    borderRadius: moderateScale(10),
    shadowColor: "gray",
    shadowOpacity: 5,
    elevation: 2,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 10,
    backgroundColor: COLORS.CLR_WHITE,
  },
  view2: {
    color: COLORS.CLR_TEXT,
    textAlign: "center",
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(30),
    fontSize: 20,
    fontWeight: "400",
    letterSpacing: 1.5,
  },
  view3: {
    color: COLORS.CLR_GRAY_1,
    textAlign: "center",
    marginTop: verticalScale(15),
    marginHorizontal: horizontalScale(40),
    fontSize: 15,
    fontWeight: "400",
    letterSpacing: 1.5,
    fontFamily: "Lato",
  },
  publicNoView: {
    alignItems: "center",
    // backgroundColor: "red",

    // flexGrow: 1,
  },
  publicNoText: {},
  view8: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.CLR_SECONDRY_1,
  },
  view8Text1: {
    color: COLORS.CLR_SECONDRY,
    marginLeft: horizontalScale(15),
    fontSize: 12,
    letterSpacing: moderateScale(2),
    fontFamily: "Lato",
  },
  Icon: {
    color: COLORS.CLR_BLACK,
    alignSelf: "center",
    marginBottom: verticalScale(15),
  },
  postWrapper: {
    flexGrow: 1,
  },
  postItemWrapper: {
    marginVertical: 20,
  },
  postTimeView: {
    marginLeft: 10,
  },
  postDescWrapper: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 20,
  },
  postTimeLine: {
    width: 1.5,
    backgroundColor: COLORS.CLR_PRIMARY,
    marginTop: 5,
  },
  mainItem: {
    flex: 1,
    marginLeft: 30,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    elevation: 2,
    marginBottom: 8,
  },
  postLocationView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  postLocationText: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.CLR_BLUE_1,
  },
  postElevatedItem: {
    backgroundColor: COLORS.CLR_WHITE,
    padding: 15,
    borderRadius: 40 / 2,
  },
  postDesctiptionView: {},
  postDescriptionText: {
    fontSize: 12,
    fontWeight: "500",
  },
  postTimeText: {
    fontWeight: "400",
    letterSpacing: 1.5,
    fontSize: 12,
  },
  postMediaView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  postMediaItem: {
    height: 40,
    width: 40,
    marginHorizontal: 10,
  },
  postActionView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  postLikesView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  postLikeIcon: {},
  postLikeText: {
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 2,
  },
  postShareView: {},
  postShareIcon: {},
});
