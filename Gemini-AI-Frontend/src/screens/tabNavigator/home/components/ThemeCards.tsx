import React from "react";
import {ScrollView, View, TouchableOpacity, ImageBackground, StyleSheet} from "react-native";
import {TextUi} from "../../../../components/TextUI";
import {ITheme} from "../../../../interfaces/IHomeScreen";
import {COLORS} from "../../../../constants/ColorConstants";
import {verticalScale, horizontalScale} from "../../../../helpers/utils/metrics";

interface IThemesProps {
  cardData: Array<ITheme>;
  onThemeClick: (theme: ITheme) => void;
}

export const ThemeCards: React.FC<IThemesProps> = (props: IThemesProps) => {
  return (
    <React.Fragment>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardView}>
          {props.cardData &&
            props.cardData.length > 0 &&
            props.cardData?.map((elem: ITheme, idx: number) => {
              let cardWrapperStyle = [styles.cardWrapper];
              if (idx === props.cardData.length - 1) {
                cardWrapperStyle = [styles.cardWrapper, styles.cardWrapperLastItem];
              }

              // let cardWrapperStyle;
              // if (idx === props.cardData.length - 1) {
              //   cardWrapperStyle = [styles.cardWrapper, styles.cardWrapperLastItem];
              // } else {
              //   cardWrapperStyle = styles.cardWrapper;
              // }
              return (
                <TouchableOpacity style={cardWrapperStyle} key={idx} onPress={() => props.onThemeClick(elem)}>
                  <ImageBackground
                    source={{uri: elem.themeImage}}
                    resizeMode="cover"
                    style={styles.cardImageContainer}
                    imageStyle={styles.cardImageElem}
                  />
                  <View style={styles.themeNameWrapper}>
                    <TextUi variant="body2" sx={styles.themeName}>
                      {elem.name}
                    </TextUi>
                  </View>

                  <View style={styles.themeDetailsWrapper}>
                    <TextUi variant="body2" sx={styles.themeDuration}>
                      {`${elem.itinerary.length} D / ${elem.itinerary.length - 1} N`}
                    </TextUi>
                    <TextUi variant="body2" sx={styles.themePrice}>
                      &#8377; 5000
                    </TextUi>
                  </View>
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
    height: verticalScale(120),
    width: horizontalScale(200),
    justifyContent: "flex-end",
    borderRadius: 15,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    // shadowOpacity: 1,
    // shadowOffset: {width: 0.5, height: 0.5},
    // elevation: moderateScale(14),
    // shadowColor: "gray",
  },
  cardImageElem: {
    borderRadius: 15,
  },
  themeNameWrapper: {
    marginTop: verticalScale(5),
    marginHorizontal: horizontalScale(5),
  },
  themeName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.CLR_TEXT,
  },

  themeDetailsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(2.5),
    marginHorizontal: horizontalScale(5),
  },
  themeDuration: {fontSize: 12, fontFamily: "Lato", color: COLORS.CLR_SECONDRY, fontWeight: "600"},
  themePrice: {fontSize: 15, fontFamily: "Lato", color: COLORS.CLR_PRIMARY, fontWeight: "800"},
});
