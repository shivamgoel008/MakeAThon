import React, {useEffect, useState} from "react";
import {IFeedItem} from "../../../interfaces/IFeedsScreen";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {TextUi} from "../../../components/TextUI";
import {ImageUi} from "../../../components/ImageUi";
import EntypoIcons from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Linking, Platform, View, StyleSheet, ActivityIndicator} from "react-native";
import moment from "moment";
import {COLORS} from "../../../constants/ColorConstants";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

import {INoTyppedValue} from "../../../interfaces/ICommon";
import {useRoute} from "@react-navigation/native";
import {horizontalScale, verticalScale} from "../../../helpers/utils/metrics";

interface IFeedItemProps {
  navigation: INoTyppedValue;
}

export const FeedsItem: React.FC<IFeedItemProps> = (props: IFeedItemProps): JSX.Element => {
  const [truncateDesc, setTrunceateDesc] = useState<2 | undefined>(undefined);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [feedItem, setFeedItem] = useState<IFeedItem | undefined>(undefined);
  const [dataLoader, setDataLoader] = useState<boolean>(false);
  const route = useRoute();

  const params = route.params as INoTyppedValue;

  const getFeedItem = (): void => {
    setDataLoader(true);
  };

  useEffect(() => {
    if (params && params.feed) {
      setFeedItem(params.feed);
    } else {
      getFeedItem();
    }
  }, []);

  const handleLocationPress = (item: IFeedItem): void => {
    const scheme = Platform.select({ios: "maps://0,0?q=", android: "geo:0,0?q="});
    const latLng = `${item.city.latitude},${item.city.longitude}`;
    const label = `${item.city.city}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const onDescriptionPress = (): void => {
    if (truncateDesc === 2) {
      setTrunceateDesc(undefined);
    } else {
      setTrunceateDesc(2);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <AntDesign
          name="close"
          color={COLORS.CLR_BLACK}
          size={30}
          style={styles.crossIcon}
          onPress={() => props.navigation.goBack()}
        />
      </View>

      {dataLoader && (
        <View style={styles.dataLoaderView}>
          <ActivityIndicator size="large" color={COLORS.CLR_TEXT} />
        </View>
      )}
      {!dataLoader && feedItem && Object.keys(feedItem).length > 0 && (
        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollStyle}>
          <View style={styles.timeLikeView}>
            <TextUi variant="h1" sx={styles.timeText}>
              {moment(feedItem.created_at).format("DD-MMM-YYYY")}
            </TextUi>

            <View style={styles.likeView}>
              <MaterialCommunityIcons
                name={feedItem.isLiked ? "lightning-bolt" : "lightning-bolt-outline"}
                size={20}
                color={feedItem.isLiked ? COLORS.CLR_PRIMARY : COLORS.CLR_PRIMARY}
              />
              <TextUi variant="h1" sx={styles.likeText}>{`${feedItem.likes.length}`}</TextUi>
            </View>
          </View>

          <TouchableOpacity onPress={() => handleLocationPress(feedItem)} style={styles.locationView}>
            <EntypoIcons name="location" color={COLORS.CLR_BLUE_1} size={14} />
            <TextUi variant="h5" sx={styles.locationText}>
              {feedItem.city.city}
            </TextUi>
          </TouchableOpacity>

          <View style={styles.descriptionView}>
            <TextUi
              variant="body2"
              numberOfLines={truncateDesc}
              onPress={() => onDescriptionPress()}
              sx={styles.descriptionText}>
              {feedItem.description}
            </TextUi>
          </View>

          <View style={styles.imageView}>
            <ImageUi url={feedItem.media[currentImage].mediaUrl} containerSx={styles.feedImage} />
          </View>
          <View style={styles.bottomArrowView}>
            {/* {currentImage > 0 && ( */}
            <TouchableOpacity onPress={() => setCurrentImage((prev: number) => prev - 1)} style={styles.leftArrowView}>
              <Feather name="arrow-left" color={COLORS.CLR_TEXT} size={20} />
            </TouchableOpacity>
            {/* )} */}
            {currentImage < feedItem.media.length && (
              <TouchableOpacity
                onPress={() => setCurrentImage((prev: number) => prev + 1)}
                style={styles.rightArrowView}>
                <Feather name="arrow-right" color={COLORS.CLR_TEXT} size={20} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: horizontalScale(20),
    // marginTop: verticalScale(10),
    backgroundColor: COLORS.CLR_WHITE,
  },
  topHeader: {
    marginTop: verticalScale(10),
  },
  crossIcon: {
    alignSelf: "flex-end",
  },
  dataLoaderView: {flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"},
  scrollViewStyle: {
    // flexGrow: 1,
    // backgroundColor: "yellow",
  },
  scrollStyle: {
    flexGrow: 1,
  },
  timeLikeView: {
    display: "flex",
    flexDirection: "row",
    marginTop: verticalScale(20),
  },
  timeText: {
    flexGrow: 1,
    fontWeight: "400",
    fontSize: 18,
  },
  likeView: {
    display: "flex",
    flexDirection: "row",
  },
  likeText: {
    fontWeight: "500",
  },
  locationView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  locationText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: horizontalScale(10),
    color: COLORS.CLR_BLUE_1,
  },
  descriptionView: {
    marginTop: verticalScale(10),
    // flexGrow: 1,
  },
  descriptionText: {
    flexGrow: 1,
  },
  imageView: {
    marginTop: verticalScale(20),
    flexGrow: 1,
    justifyContent: "center",
    // backgroundColor: "red",
  },
  feedImage: {
    height: verticalScale(400),
    width: "100%",
    borderRadius: 20,
  },
  bottomArrowView: {
    // flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    // backgroundColor: "red",
    marginBottom: verticalScale(20),
  },
  leftArrowView: {
    // width: "50%",
    backgroundColor: COLORS.CLR_GRAY_4,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rightArrowView: {
    // width: "50%",
    // backgroundColor:'green'
    backgroundColor: COLORS.CLR_GRAY_4,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
