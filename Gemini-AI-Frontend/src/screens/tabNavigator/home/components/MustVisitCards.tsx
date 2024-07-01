import React from "react";
import {ScrollView, View, TouchableOpacity, ImageBackground, StyleSheet} from "react-native";
import {TextUi} from "../../../../components/TextUI";
import {ITheme} from "../../../../interfaces/IHomeScreen";
import {COLORS} from "../../../../constants/ColorConstants";
import {verticalScale, horizontalScale, moderateScale} from "../../../../helpers/utils/metrics";
import AntDesign from "react-native-vector-icons/AntDesign";

interface IMustVisitCardsProps {
  cardData: Array<ITheme>;
  onThemeClick: (theme: ITheme) => void;
}

export const MustVisitCards: React.FC<IMustVisitCardsProps> = (props: IMustVisitCardsProps) => {
  return (
    <React.Fragment>
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // style={{backgroundColor: "red"}}
        // contentContainerStyle={{backgroundColor: "yellow"}}
      >
        <View style={styles.cardView}>
          {props.cardData?.map((elem: ITheme, idx: number) => {
            let cardWrapperStyle = [styles.cardWrapper];
            if (idx === props.cardData.length - 1) {
              cardWrapperStyle = [styles.cardWrapper, styles.cardWrapperLastItem];
            }
            return (
              <TouchableOpacity style={cardWrapperStyle} key={idx} onPress={() => props.onThemeClick(elem)}>
                <ImageBackground
                  source={{uri: elem.themeImage}}
                  resizeMode="cover"
                  style={styles.cardImageContainer}
                  imageStyle={styles.cardImageElem}>
                  <View style={styles.ratingWrapper}>
                    <View style={styles.ratingItem}>
                      <AntDesign name="star" size={14} color={COLORS.CLR_SECONDRY_1} style={styles.ratingStar} />
                      <TextUi variant="body2" sx={styles.ratingText}>
                        4.2
                      </TextUi>
                    </View>
                  </View>

                  <View style={styles.placeNameWrapper}>
                    <TextUi variant="body2" sx={styles.placeNameItem}>
                      Kasol
                    </TextUi>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  cardView: {
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(15),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    // backgroundColor: "green",
  },
  cardWrapper: {
    marginRight: 15,
    // marginHorizontal: horizontalScale(5),
    // padding: moderateScale(5),
    // backgroundColor: "aqua",
  },
  cardWrapperLastItem: {
    marginRight: 0,
  },
  cardImageContainer: {
    height: verticalScale(200),
    width: horizontalScale(150),
    justifyContent: "flex-end",
    borderRadius: 15,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: moderateScale(14),
    shadowColor: "gray",
    // backgroundColor: "red",
  },
  cardImageElem: {
    borderRadius: 15,
  },
  ratingWrapper: {
    // marginTop: verticalScale(5),
    // marginHorizontal: horizontalScale(5),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    top: 5,
    right: 5,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: 20 / 2,
  },
  ratingItem: {display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
  ratingStar: {marginRight: horizontalScale(5)},
  ratingText: {fontSize: 14, fontWeight: "500", color: COLORS.CLR_SECONDRY_1},
  placeNameWrapper: {
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
  },
  placeNameItem: {
    fontSize: 20,
    fontFamily: "Poppins",
    letterSpacing: 5,
    color: COLORS.CLR_SECONDRY_1,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
