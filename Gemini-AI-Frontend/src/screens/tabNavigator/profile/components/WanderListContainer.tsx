import {View, StyleSheet, TouchableOpacity as TO} from "react-native";
import React from "react";
import {TextUi} from "../../../../components/TextUI";
import {Choose, OtherWise, When} from "../../../../helpers/utils/Conditionals";
import {verticalScale, horizontalScale, moderateScale} from "../../../../helpers/utils/metrics";
import {INoTyppedValue} from "../../../../interfaces/ICommon";
import {IWanderListItem} from "../../../../interfaces/IWanderList";
import {COLORS} from "../../../../constants/ColorConstants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import EntypoIcons from "react-native-vector-icons/Entypo";
import {ImageUi} from "../../../../components/ImageUi";
import {ButtonUi} from "../../../../components/ButtonUi";
import {TouchableOpacity} from "react-native-gesture-handler";
import {StarRating} from "../../../../components/StarRating";
import {WANDERLIST_DMP_SCREEN} from "../../../../constants/RouteConstants";

interface IProps {
  navigation: INoTyppedValue;
  wanderlists: Array<IWanderListItem>;
  profile: "public" | "personal";
}

export const WanderListContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
  const onDeleteClick = (_elem: IWanderListItem): void => {
    return undefined;
  };
  const onFollowClick = (_elem: IWanderListItem): void => {
    return undefined;
  };

  const numberOfDaysToGo = (item: IWanderListItem): string => {
    const currentData = new Date();
    const wanderListDate = new Date(item.travelDate);
    const diffTime = Math.abs(wanderListDate.valueOf() - currentData.valueOf());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days to go`;
  };
  return (
    <View style={props?.wanderlists?.length > 0 ? styles.container : [styles.container, styles.containerCenter]}>
      <Choose>
        <When condition={props.wanderlists.length === 0}>
          <TouchableOpacity style={styles.noWanderlistContainer}>
            <FontAwesome5 name="clipboard-list" size={40} color={COLORS.CLR_TEXT} />
            <TextUi variant="h3" sx={styles.noListHeading}>
              Empty Wanderlist
            </TextUi>
            <TextUi variant="h6" sx={styles.noListSubHeading}>
              Woops ! Looks like you haven’t added any place to your wanderlist !
            </TextUi>
          </TouchableOpacity>
        </When>
        <OtherWise>
          <View style={styles.wanderListContainer}>
            {props.wanderlists &&
              props.wanderlists.length > 0 &&
              props.wanderlists?.map((elem: IWanderListItem, idx: number) => {
                return (
                  <TO
                    key={idx}
                    style={styles.wanderListItem}
                    onPress={() => {
                      props.navigation.navigate(WANDERLIST_DMP_SCREEN, {city: elem.city, wanderlist: elem});
                    }}>
                    <View style={styles.wanderListImageWrap}>
                      <ImageUi url={elem.city.heroMedia} containerSx={styles.wanderListImage} />
                      <View style={styles.daysToGo}>
                        <TextUi variant="body1" sx={styles.daysToGoText}>
                          {numberOfDaysToGo(elem)}
                        </TextUi>
                      </View>
                    </View>
                    <View style={styles.wanderListDetails}>
                      <TextUi variant="body1" sx={styles.wanderListCityName}>
                        {`${elem.city.city || ""}`}
                      </TextUi>
                      <View style={styles.wanderListRating}>
                        <StarRating rating={elem.city.rating} starSize={14} />
                      </View>

                      {props.profile === "public" && (
                        <ButtonUi
                          variant="secondry"
                          buttonStyleSx={styles.wanderListFollowBtn}
                          titleStyleSx={styles.wanderListFollowTitle}
                          onPress={() => onFollowClick(elem)}>
                          {"+  Follow"}
                        </ButtonUi>
                      )}
                    </View>
                    <View style={styles.wanderListActions}>
                      {props.profile === "personal" && (
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={20}
                          style={styles.wanderListDeleteIcon}
                          onPress={() => onDeleteClick(elem)}
                          color={COLORS.CLR_ERROR}
                        />
                      )}
                      <EntypoIcons
                        name="share"
                        size={20}
                        color={COLORS.CLR_BLUE_1}
                        style={styles.wanderListShareIcon}
                      />
                    </View>
                  </TO>
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
    backgroundColor: COLORS.CLR_GRAY_3,
    flexGrow: 1,
  },
  containerCenter: {justifyContent: "center"},
  noWanderlistContainer: {
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: verticalScale(30),
    borderRadius: moderateScale(10),
    shadowColor: "gray",
    shadowOpacity: 5,
    elevation: 2,
    shadowOffset: {width: 1, height: 1},
    marginHorizontal: 15,
    backgroundColor: COLORS.CLR_WHITE,
  },
  noListHeading: {
    color: COLORS.CLR_BLACK,
    textAlign: "center",
    marginTop: verticalScale(15),
    marginHorizontal: horizontalScale(30),
    fontSize: 18,
    fontWeight: "400",
    fontFamily: "Lato",
  },
  noListSubHeading: {
    color: COLORS.CLR_BLACK,
    textAlign: "center",
    marginTop: verticalScale(15),
    marginHorizontal: horizontalScale(30),
    fontSize: 14,
    letterSpacing: 1.2,
    fontWeight: "400",
  },
  wanderListContainer: {
    marginHorizontal: horizontalScale(10),
    marginTop: 20,
  },
  wanderListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: COLORS.CLR_WHITE,
    borderRadius: 10,
    elevation: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    marginBottom: 8,
    marginHorizontal: horizontalScale(10),
    padding: 15,
  },
  wanderListImageWrap: {},
  wanderListImage: {
    height: 100,
    width: 100,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  daysToGo: {
    backgroundColor: COLORS.CLR_WHITE,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderColor: COLORS.CLR_GRAY_1,
    borderWidth: 0.5,
    borderTopWidth: 0,
  },
  daysToGoText: {
    fontWeight: "500",
    fontFamily: "Lato",
    letterSpacing: 1.2,
    fontSize: 11,
    textAlign: "center",
    paddingVertical: 4,
    color: COLORS.CLR_GRAY_1,
    // position: "absolute",
    // bottom: -10,
    // left: 0,
    // right: 0,
    // backgroundColor: COLORS.CLR_ERROR,
    // borderBottomRightRadius: 10,
    // borderBottomLeftRadius: 10,
  },
  wanderListDetails: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  wanderListCityName: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.2,
    fontFamily: "Lato",
  },
  wanderListRating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    flexGrow: 1,
  },
  wanderListRatingText: {
    fontSize: 14,
    fontWeight: "500",
  },
  wanderListRatingIcon: {
    marginLeft: 5,
  },
  wanderListFollowBtn: {
    padding: 0,
    flexGrow: 1,
    borderColor: COLORS.CLR_SECONDRY,
  },
  wanderListFollowTitle: {
    color: COLORS.CLR_SECONDRY,
    fontSize: moderateScale(12),
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  wanderListActions: {
    // backgroundColor: "red",
    // justifyContent: "space-between",
    // display: "flex",
    // flexDirection: "column",
    // flexGrow: 1,
    // height: "100%",
    // flex: 1,
  },
  wanderListShareIcon: {
    // flexGrow: 1,
  },
  wanderListDeleteIcon: {
    flexGrow: 1,
  },
});
