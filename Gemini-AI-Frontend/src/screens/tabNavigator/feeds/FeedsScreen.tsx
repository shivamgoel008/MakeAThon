import React, {useCallback, useEffect, useState} from "react";
import {Dimensions, View, StyleSheet, Share, ActivityIndicator, RefreshControl} from "react-native";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {TextUi} from "../../../components/TextUI";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import Carousel from "react-native-snap-carousel";
import {ImageUi} from "../../../components/ImageUi";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {getAllFeedsService} from "../../../services/SFeeds";
import {axiosResponseValidation} from "../../../helpers/utils/CommonFunctions";
import {COLORS} from "../../../constants/ColorConstants";
import moment from "moment";
import EntypoIcons from "react-native-vector-icons/Entypo";
import {ILikeFeedReq, IPostItemMedia, IPostLikeItem, IUnLikeFeedReq} from "../../../interfaces/IPosts";
import {verticalScale, horizontalScale, moderateScale} from "../../../helpers/utils/metrics";
import {likeFeedService, unLikeFeedService} from "../../../services/SPosts";
import {ReduxRootState} from "../../../redux/ReduxStore";
import {useAppSelector} from "../../../redux/reduxHooks";
import {IFeedItem} from "../../../interfaces/IFeedsScreen";
import {DoubleTap} from "../../../components/DoubleTap";
import {PUBLIC_PROFILE_SCREEN, WANDERLIST_DMP_SCREEN} from "../../../constants/RouteConstants";

interface IFeedScreenProps {
  navigation: INoTyppedValue;
}

export const FeedsScreen: React.FC<IFeedScreenProps> = (props: IFeedScreenProps): JSX.Element => {
  const {width: screenWidth} = Dimensions.get("window");

  const {registeredUser} = useAppSelector((state: ReduxRootState) => state.userReducer);

  const [feedsData, setFeedsData] = useState<Array<IFeedItem>>([]);
  const [dataLoader, setDataLoader] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const updateFeedsLikeData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any[]) => {
      const updatedData = data.map(elem => {
        const isLiked: boolean = elem.likes.findIndex((item: IPostLikeItem) => item.userId === registeredUser.id) > -1;
        return {isLiked, ...elem, numberOfLines: 2};
      });
      return updatedData;
    },
    [registeredUser.id],
  );

  const getFeedsData = useCallback(
    (type: "load" | "refresh") => {
      if (type === "load") {
        setDataLoader(true);
      }
      getAllFeedsService()
        .then((res: IAxiosSuccess) => {
          if (axiosResponseValidation(res)) {
            setFeedsData(updateFeedsLikeData(res.data));
          }
        })
        .catch((err: IAxiosError) => {
          console.log(err);
        })
        .finally(() => {
          setDataLoader(false);
        });
    },
    [updateFeedsLikeData],
  );

  useEffect(() => {
    getFeedsData("load");
  }, [getFeedsData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFeedsData("refresh");
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [getFeedsData]);

  const handleLocationPress = (item: IFeedItem): void => {
    props.navigation.navigate(WANDERLIST_DMP_SCREEN, {
      city: item.city,
    });
  };

  const shareFeedItem = async (elem: IFeedItem): Promise<void> => {
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

  const onDescriptionTap = (_elem: IFeedItem, idx: number): void => {
    const newFeedsData: Array<IFeedItem> = [...feedsData];
    const numberOfLines: 2 | undefined = feedsData[idx].numberOfLines === 2 ? undefined : 2;
    newFeedsData[idx] = {...feedsData[idx], numberOfLines};

    setFeedsData(newFeedsData);
  };

  const likeUnlikePost = (elem: IFeedItem, idx: number) => {
    if (elem.isLiked) {
      const req: IUnLikeFeedReq = {
        userId: registeredUser.id,
        postId: elem.id,
      };
      unLikeFeedService(req)
        .then((res: IAxiosSuccess) => {
          if (axiosResponseValidation(res)) {
            const newFeedsData: Array<IFeedItem> = [...feedsData];
            newFeedsData[idx] = {...feedsData[idx], ...res.data};
            setFeedsData(newFeedsData);
          }
        })
        .catch((err: IAxiosError) => {
          console.log(err);
        })
        .finally(() => {});
    } else {
      const req: ILikeFeedReq = {
        userId: registeredUser.id,
        postId: elem.id,
      };
      likeFeedService(req)
        .then((res: IAxiosSuccess) => {
          if (axiosResponseValidation(res)) {
            const newFeedsData: Array<IFeedItem> = [...feedsData];
            newFeedsData[idx] = {...feedsData[idx], ...res.data};
            setFeedsData(newFeedsData);
          }
        })
        .catch((err: IAxiosError) => {
          console.log(err);
        })
        .finally(() => {});
    }
    const newFeedsData: Array<IFeedItem> = [...feedsData];
    newFeedsData[idx].isLiked = !elem.isLiked;
    setFeedsData(newFeedsData);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {dataLoader && (
        <View style={styles.dataLoaderView}>
          <ActivityIndicator size="large" color={COLORS.CLR_TEXT} />
        </View>
      )}

      {feedsData.length > 0 &&
        feedsData.map((elem: IFeedItem, idx: number) => {
          return (
            <View key={idx} style={styles.parentViewStyle}>
              <View style={styles.view7}>
                <View style={styles.view7Wrapper}>
                  <DoubleTap onDoubleTap={() => likeUnlikePost(elem, idx)}>
                    <ImageUi
                      url={elem.user.avatarImage || ""}
                      containerSx={styles.feedUserImage}
                      // onPress={() => props.navigation.navigate(PUBLIC_PROFILE_SCREEN, {userId: elem.userId})}
                    />
                  </DoubleTap>
                  <View style={styles.view7Div1}>
                    <TextUi
                      variant="h5"
                      sx={styles.view7Text}
                      onPress={() => props.navigation.navigate(PUBLIC_PROFILE_SCREEN, {userId: elem.userId})}>
                      {`${elem.user.firstName} ${elem.user.lastName}`}
                    </TextUi>
                    <TextUi variant="h5" sx={styles.view7TextLoc} onPress={() => handleLocationPress(elem)}>
                      {`${elem.city.city}, ${elem.city.state}`}
                    </TextUi>
                  </View>
                </View>

                <View style={styles.view7ChildWrapper}>
                  <TextUi variant="body1" sx={styles.view7Text1}>
                    {moment(elem.created_at).format("DD-MMM-YYYY")}
                  </TextUi>
                  <TextUi variant="body1" sx={styles.view7Text2}>
                    {moment(elem.created_at).format("h:mm A")}
                  </TextUi>
                </View>
              </View>

              <View>
                <Carousel
                  data={elem.media}
                  renderItem={(item: {item: IPostItemMedia; index: number}) => {
                    return (
                      <View>
                        <ImageUi url={item.item.mediaUrl} containerSx={styles.imageContainer} />
                        <View style={styles.imagePagination}>
                          <TextUi variant="body1" sx={styles.imagePaginationText}>
                            {`${item.index + 1} / ${elem.media.length}`}
                          </TextUi>
                        </View>
                      </View>
                    );
                  }}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth}
                />
              </View>

              <View style={styles.view10}>
                <TouchableOpacity onPress={() => likeUnlikePost(elem, idx)} style={styles.likeUnlikePost}>
                  <MaterialCommunityIcons
                    name={elem.isLiked ? "lightning-bolt" : "lightning-bolt-outline"}
                    size={18}
                    color={elem.isLiked ? COLORS.CLR_PRIMARY : COLORS.CLR_BLACK}
                  />
                  <TextUi variant="h2" sx={styles.view10Text}>
                    {`${elem.likes.length}`}
                  </TextUi>
                </TouchableOpacity>
                <EntypoIcons
                  name="share"
                  size={15}
                  color={COLORS.CLR_TEXT}
                  onPress={() => shareFeedItem(elem)}
                  style={styles.shareIcon}
                />
              </View>

              <View style={styles.view8}>
                <TextUi
                  variant="body2"
                  sx={styles.view8Text}
                  numberOfLines={elem.numberOfLines}
                  onPress={() => onDescriptionTap(elem, idx)}>
                  {elem.description}
                </TextUi>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
  },
  dataLoaderView: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  view7: {
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(20),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  view7Wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "aqua",
    justifyContent: "space-between",
  },
  view7Text: {
    color: COLORS.CLR_TEXT,
    paddingBottom: 2.5,
    fontSize: moderateScale(14),
    fontWeight: "500",
    // backgroundColor: "green",
  },
  // locationIcon: {marginLeft: moderateScale(-1.5)},
  view7TextLoc: {
    color: COLORS.CLR_BLUE_1,
    fontSize: moderateScale(12),
    fontFamily: "Lato",
    fontWeight: "400",
    paddingTop: 2.5,
    // backgroundColor: "red",
    // marginLeft: horizontalScale(5),
  },
  view7ChildWrapper: {
    display: "flex",
    alignItems: "center",
  },
  view7Text1: {
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(11),
    fontWeight: "300",
    letterSpacing: 1.2,
    fontFamily: "Poppins",
    marginTop: verticalScale(5),
    alignSelf: "flex-end",
  },
  view7Text2: {
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(10),
    fontWeight: "200",
    letterSpacing: 1.2,
    fontFamily: "Lato",
    marginTop: verticalScale(5),
    alignSelf: "flex-end",
  },
  view7Div1: {
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(15),
  },
  view7Div2: {
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  view8: {
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(20),
  },
  view8Text: {
    color: COLORS.CLR_TEXT,
    fontWeight: "300",
    fontFamily: "Lato",
    letterSpacing: 1.2,
    fontSize: 14,
  },
  view10: {
    marginTop: verticalScale(15),
    marginHorizontal: horizontalScale(15),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  likeUnlikePost: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  view10Text: {
    color: COLORS.CLR_BLACK,
    fontSize: moderateScale(12),
    paddingLeft: horizontalScale(5),
    paddingRight: horizontalScale(290),
    marginTop: verticalScale(1),
  },
  shareIcon: {marginRight: 10},
  parentViewStyle: {
    borderBottomColor: COLORS.CLR_GRAY_1,
    borderBottomWidth: 0.5,
    paddingVertical: 20,
  },
  feedUserImage: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  imageContainer: {
    height: 300,
  },
  imagePagination: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    right: 10,
    top: 10,
    padding: 10,
    borderRadius: 20,
  },
  imagePaginationText: {
    fontSize: 10,
    fontWeight: "500",
    fontFamily: "Lato",
  },
});
