import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native-gesture-handler";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import {ITheme} from "../../../interfaces/IHomeScreen";
import {getAxios} from "../../../helpers/utils/axiosInstance";
import {ITERNITY_SCREEN} from "../../../constants/RouteConstants";
import {CardHeader} from "./components/CardHeader";
import {ThemeCards} from "./components/ThemeCards";
import {COLORS} from "../../../constants/ColorConstants";
import {axiosResponseValidation} from "../../../helpers/utils/CommonFunctions";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import {verticalScale, horizontalScale, moderateScale} from "../../../helpers/utils/metrics";
import {TextUi} from "../../../components/TextUI";
import {screenWidth} from "../../../constants/CommonConstants";
// import {NativeSyntheticEvent} from "react-native";
import {ICity} from "../../../interfaces/IWanderList";
import {getSuggestedCitiesService} from "../../../services/SWanderlist";
import {MustVisitCards} from "./components/MustVisitCards";
// import {MustVisitCards} from "./components/MustVisitCards";
// import {BudgetCards} from "./components/BudgetCards";
// import Contacts from "react-native-contacts";

interface IHomeScreenProps {
  navigation: INoTyppedValue;
}

export const HomeScreen: React.FC<IHomeScreenProps> = (props: IHomeScreenProps): JSX.Element => {
  const [longCardTheme, setLongCardTheme] = useState<Array<ITheme>>([]);
  const [centerTrendingIndex, setCenterTrendingIndex] = useState<number>(1);
  const [tendingCities, setTrendingCities] = useState<Array<ICity>>([]);
  // const [mediumCardTheme, setMediumCardTheme] = useState<Array<ITheme>>([]);
  // const [shortCardTheme, setShortCardTheme] = useState<Array<ITheme>>([]);

  // const handleSearch = () => {
  //   props.navigation.navigate(SEARCH_SCREEN);
  // };

  // const citiesRef = useRef<Array<View>>([]);

  // const viewPortCity = useIsInViewport(ref1);

  const themesSeeAllClick = () => {};

  const onThemeClick = (theme: ITheme) => {
    props.navigation.navigate(ITERNITY_SCREEN, {
      theme,
    });
  };

  useEffect(() => {
    getAxios("/themes/get-all-themes")
      .then((res: IAxiosSuccess) => {
        if (axiosResponseValidation(res)) {
          // console.log(res.data);
          const uniqueHeadings = [...new Set(res.data.map((item: ITheme) => item.heading))];

          const allThemes: Array<ITheme> = res.data;
          const allLongCardThemes: Array<ITheme> = allThemes.filter(
            (elem: ITheme) => elem.heading === uniqueHeadings[0],
          );
          // const allMediumCardThemes: Array<ITheme> = allThemes.filter(
          //   (elem: ITheme) => elem.cardType === "medium card",
          // );
          // const allShortCardThemes: Array<ITheme> = allThemes.filter((elem: ITheme) => elem.cardType === "short card");

          setLongCardTheme(allLongCardThemes);
          // setMediumCardTheme(allMediumCardThemes);
          // setShortCardTheme(allShortCardThemes);
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
      });
  }, []);

  const getSuggestedCities = () => {
    // setCityLoader(true);
    getSuggestedCitiesService()
      .then((res: IAxiosSuccess) => {
        if (axiosResponseValidation(res)) {
          setTrendingCities(res.data);
          // intialSuggestedCities.current = res.data;
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
      })
      .finally(() => {
        // setCityLoader(false);
      });
  };

  // const getAllContacts = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //       title: "Cool Photo App Camera Permission",
  //       message: "Cool Photo App needs access to your camera, so you can take awesome pictures.",
  //       buttonNeutral: "Ask Me Later",
  //       buttonNegative: "Cancel",
  //       buttonPositive: "OK",
  //     });
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // console.log("You can use the camera");
  //     } else {
  //       // console.log("asc permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }

  // Contacts.getAll()
  //   .then(contacts => {
  //     // console.log("ABC", contacts);
  //     // setContacts(contacts);
  //   })
  //   .catch(err => console.log("err", err));
  // };
  useEffect(() => {
    getSuggestedCities();
  }, []);

  const handleOnScroll = (ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    //calculate screenIndex by contentOffset and screen width
    // console.log("AAA", Math.floor(event.nativeEvent.contentOffset.x / (screenWidth / 3)));
    const centerItem = Math.floor(ev.nativeEvent.contentOffset.x / (screenWidth / 6));
    console.log(ev.nativeEvent.contentOffset.x);
    if (centerItem >= 0) {
      setCenterTrendingIndex(centerItem);
    } // console.log("currentScreenIndex", parseInt(event.nativeEvent.contentOffset.x / Dimensions.get("window").width));
  };

  const trendingCityClick = (_city: ICity) => {};
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <View style={styles.trendingCitiesView}>
        <TextUi variant="caption" sx={styles.trendingCitiesText}>
          Welcome to GEMINI Allergy Detection !
        </TextUi>

        <ScrollView
          contentContainerStyle={styles.trendingCitiesScroll}
          horizontal={true}
          onScroll={(ev: NativeSyntheticEvent<NativeScrollEvent>) => handleOnScroll(ev)}
          scrollEventThrottle={5}>
          {tendingCities.map((elem, idx: number) => {
            let cityItemStyle;
            if (idx === tendingCities.length - 1) {
              cityItemStyle = [styles.trendingWrapper, styles.trendingWrapperLastItem];
            } else {
              cityItemStyle = styles.trendingWrapper;
            }
            return (
              <TouchableOpacity style={cityItemStyle} key={idx} onPress={() => trendingCityClick(elem)}>
                <ImageBackground
                  borderRadius={20}
                  source={{uri: elem.heroMedia}}
                  resizeMode="cover"
                  style={
                    idx === centerTrendingIndex ? styles.trendingCityImageWrapperBig : styles.trendingCityImageWrapper
                  }>
                  <TextUi variant="body2" sx={styles.trendingName}>
                    {elem.city}
                  </TextUi>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {longCardTheme && longCardTheme.length > 0 && (
        <View>
          <CardHeader title={longCardTheme[0].heading} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
          <ThemeCards cardData={longCardTheme} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
        </View>
      )}

      {longCardTheme && longCardTheme.length > 0 && (
        <View>
          <CardHeader title={longCardTheme[0].heading} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
          <MustVisitCards cardData={longCardTheme} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
        </View>
      )}

      {/* {mediumCardTheme && mediumCardTheme.length > 0 && (
        <View>
          <CardHeader title={mediumCardTheme[1].heading} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
          <MustVisitCards cardData={mediumCardTheme} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
        </View>
      )} */}

      {/* {shortCardTheme && shortCardTheme.length > 0 && (
        <View>
          <CardHeader title={shortCardTheme[0].heading} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
          <BudgetCards cardData={shortCardTheme} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
        </View>
      )} */}

      {/* <View>
        {longCardTheme &&
          longCardTheme.map((elem: ITheme, idx: number) => {
            return (
              <React.Fragment key={idx}>
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <ThemeCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <MustVisitCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <BudgetCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <SeasonCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
              </React.Fragment>
            );
          })}

{mediumCardTheme &&
          mediumCardTheme.map((elem: ITheme, idx: number) => {
            return (
              <React.Fragment key={idx}>
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <ThemeCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <MustVisitCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <BudgetCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <SeasonCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
              </React.Fragment>
            );
          })}

{shortCardTheme &&
          shortCardTheme.map((elem: ITheme, idx: number) => {
            return (
              <React.Fragment key={idx}>
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <ThemeCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <MustVisitCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <BudgetCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
                <CardHeader title={elem.name} showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
                <SeasonCards cardData={themes} onThemeClick={(theme: ITheme) => onThemeClick(theme)} />
              </React.Fragment>
            );
          })}
      </View> */}

      {/* <CardHeader title="Travel Themes" showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
      <ThemeCards cardData={trendingPlacesData} onCardClick={(placeId: string) => onCardClick(placeId)} />

      <CardHeader title="Must Visit Places" showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
      <MustVisitCards cardData={trendingPlacesData} onCardClick={(placeId: string) => onCardClick(placeId)} />

      <CardHeader title="Romantic Packages" showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
      <ThemeCards cardData={trendingPlacesData} onCardClick={(placeId: string) => onCardClick(placeId)} />

      <CardHeader title="Low Budget" showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
      <BudgetCards cardData={trendingPlacesData} onCardClick={(placeId: string) => onCardClick(placeId)} />

      <CardHeader title="According to season" showSeeAll={true} showAllClick={() => themesSeeAllClick()} />
      <SeasonCards cardData={trendingPlacesData} onCardClick={(placeId: string) => onCardClick(placeId)} /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(15),
  },
  trendingCitiesView: {
    paddingVertical: verticalScale(15),
  },
  trendingCitiesText: {
    marginVertical: verticalScale(10),
    fontSize: 20,
    fontWeight: "800",
    fontFamily: "Poppins",
    fontColor: "red",
    // fontWeight: 40",
    // letterSpacing: 1.2,
  },
  trendingCitiesScroll: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: 'space-around',
    alignItems: "center",
    // backgroundColor:'red',
  },
  trendingWrapper: {
    marginRight: 15,
    // backgroundColor:'red',
  },
  trendingWrapperLastItem: {
    marginRight: 0,
  },
  trendingCityImageWrapperBig: {
    marginHorizontal: horizontalScale(10),
    // backgroundColor:'red',
    height: verticalScale(150),
    width: horizontalScale(screenWidth / 3),
    // borderRadius: 50,
  },
  trendingCityImageWrapper: {
    // backgroundColor: "red",
    height: verticalScale(100),
    width: horizontalScale(screenWidth / 3),

    // borderRadius: moderateScale(10),
  },
  trendingName: {
    // backgroundColor: "red",
    position: "absolute",
    width: "100%",
    bottom: 0,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    fontSize: 16,
    fontFamily: "Poppins",
    letterSpacing: 1.2,
    color: COLORS.CLR_SECONDRY_1,
    fontWeight: "600",
    // textAlign: "cen/ter",
    // textTransform: "uppercase",
  },
  // trendingWrapper: {
  //   marginRight: 15,
  //   // borderRadius: 40,
  // },

  // trendingCityImageWrapperBig: {
  //   height: 150,
  //   width: screenWidth / 3,
  //   borderRadius: 150 / 2,
  // },
  // trendingCityImageWrapper: {
  //   height: 100,
  //   width: screenWidth / 3,
  //   // borderRadius: 10 / 2,
  //   borderRadius: 40,
  // },
  // trendingName: {
  //   // backgroundColor: "red",
  //   position: "absolute",
  //   width: "100%",
  //   bottom: 0,
  //   textAlign: "center",
  //   backgroundColor: "rgba(0, 0, 0, 0.4)",
  //   fontSize: 16,
  //   fontFamily: "Poppins",
  //   letterSpacing: 1.2,
  //   color: COLORS.CLR_SECONDRY_1,
  //   fontWeight: "600",
  //   // textAlign: "cen/ter",
  //   // textTransform: "uppercase",
  // },
  view2: {
    marginTop: verticalScale(15),
    marginHorizontal: horizontalScale(15),
    paddingBottom: verticalScale(5),
    borderBottomWidth: 0.25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  view2Text1: {
    fontWeight: "400",
  },
  view2Text2: {
    fontWeight: "400",
    color: "#088395",
  },
  view5: {
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(15),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  view5Div1: {
    marginHorizontal: horizontalScale(5),
    padding: moderateScale(5),
  },

  view5Image: {
    height: verticalScale(150),
    width: horizontalScale(120),
    justifyContent: "flex-end",
    borderRadius: 15,
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: moderateScale(14),
    shadowColor: "gray",
  },
  view5ImageElem: {
    borderRadius: 15,
  },
  view5View1: {
    backgroundColor: COLORS.CLR_WHITE,
    width: "100%",
    opacity: 0.6,
    alignItems: "center",
  },
  view5Text: {
    color: COLORS.CLR_BLACK,
    fontSize: moderateScale(15),
    padding: 5,
  },
  view6: {
    height: 0,
    borderWidth: 0.7,
    marginTop: verticalScale(15),
    borderColor: "#D9D9D9",
  },
  view602: {
    height: 0,
    borderWidth: 0.7,
    borderColor: "#D9D9D9",
  },
  view7: {
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(20),
    display: "flex",
    flexDirection: "row",
  },
  view7Text: {
    color: COLORS.CLR_BLACK,
    paddingBottom: 5,
  },
  view7Text1: {
    color: "#9E9E9E",
    fontSize: 10,
    marginLeft: horizontalScale(160),
    marginTop: verticalScale(5),
  },
  view7Div1: {
    marginTop: verticalScale(5),

    marginLeft: horizontalScale(15),
  },
  view8: {
    marginTop: verticalScale(5),
    marginHorizontal: horizontalScale(20),
  },
  view8Text: {
    color: COLORS.CLR_BLACK,
  },
  view9: {
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(20),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view9Div: {},
  view10: {
    marginTop: verticalScale(8),
    marginHorizontal: horizontalScale(15),
    display: "flex",
    flexDirection: "row",
  },
  view10Text: {
    color: COLORS.CLR_BLACK,
    paddingLeft: horizontalScale(5),
    paddingRight: horizontalScale(290),
    marginTop: verticalScale(1),
  },
});
