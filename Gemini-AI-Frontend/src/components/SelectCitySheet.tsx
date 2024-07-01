import React, {useEffect, useRef, useState} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ICity} from "../interfaces/IWanderList";
import {ListItem, BottomSheet} from "@rneui/themed";
import {axiosResponseValidation} from "../helpers/utils/CommonFunctions";
import {IAxiosSuccess, IAxiosError} from "../interfaces/ICommon";
import {getSuggestedCitiesService} from "../services/SWanderlist";
import {TextInputUi} from "./TextInputUi";
import {ScrollView} from "react-native-gesture-handler";
import {horizontalScale, moderateScale, verticalScale} from "../helpers/utils/metrics";
import {COLORS} from "../constants/ColorConstants";
import Ionicons from "react-native-vector-icons/Ionicons";
import {TextUi} from "./TextUI";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {ImageUi} from "./ImageUi";

interface ISelectCitySheetProps {
  openSheet: boolean;
  handleSelect: (city: ICity) => void;
  handleCancel: () => void;
}

export const SelectCitySheet: React.FC<ISelectCitySheetProps> = (props: ISelectCitySheetProps): JSX.Element => {
  const [citiesList, setCitiesList] = useState<Array<ICity>>([]);
  const [citySearch, setCitySearch] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const initialCityList = useRef<Array<ICity> | null>(null);

  const getSuggestedCities = (): void => {
    setShowLoader(true);
    getSuggestedCitiesService()
      .then((res: IAxiosSuccess) => {
        if (axiosResponseValidation(res)) {
          setCitiesList(res.data);
          initialCityList.current = res.data;
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    getSuggestedCities();
  }, []);

  useEffect(() => {
    if (initialCityList.current && initialCityList.current?.length > 0) {
      if (citySearch === "") {
        setCitiesList(initialCityList.current);
      } else {
        const searchCityList: Array<ICity> = initialCityList.current?.filter((elem: ICity) => {
          return elem.city.toLowerCase().includes(citySearch.toLowerCase());
        });

        setCitiesList(searchCityList);
      }
    }
  }, [citySearch]);

  const showRatingComponent = (rating: number): JSX.Element => {
    const fullIconNumber: number = Math.floor(rating || 0);
    const emptyIconNumber: number = 5 - Math.ceil(rating || 0);
    const halfIconNumber: number = rating - fullIconNumber > 0 ? 1 : 0;
    return (
      <View style={styles.autocompleteItemRatingView}>
        {fullIconNumber > 0 &&
          Array.from(Array(fullIconNumber).keys()).map((elem: number) => (
            <FontAwesome
              name="star"
              size={12}
              key={elem + Date.now()}
              style={styles.autocompleteItemRatingIcon}
              color={COLORS.CLR_PRIMARY}
            />
          ))}
        {halfIconNumber > 0 &&
          Array.from(Array(halfIconNumber).keys()).map((elem: number) => (
            <FontAwesome
              name="star-half-o"
              size={12}
              key={elem + Date.now()}
              style={styles.autocompleteItemRatingIcon}
              color={COLORS.CLR_PRIMARY}
            />
          ))}
        {emptyIconNumber > 0 &&
          Array.from(Array(emptyIconNumber).keys()).map((elem: number) => (
            <FontAwesome
              name="star-o"
              size={12}
              key={elem + Date.now()}
              style={styles.autocompleteItemRatingIcon}
              color={COLORS.CLR_PRIMARY}
            />
          ))}
      </View>
    );
  };

  return (
    <BottomSheet
      isVisible={props.openSheet}
      containerStyle={styles.container}
      scrollViewProps={{
        style: styles.sheetScrollView,
        contentContainerStyle: styles.sheetScrollContentView,
        scrollEnabled: false,
      }}
      // modalProps={{presentationStyle: "fullScreen"}}
      onBackdropPress={() => props.handleCancel()}>
      <View style={styles.cityTopBar} />

      <View style={styles.topView}>
        <Ionicons name="arrow-back" color={COLORS.CLR_TEXT} size={22} onPress={() => props.handleCancel()} />
        <TextInputUi
          label="Search City"
          value={citySearch}
          sx={styles.citySearchContainer}
          contianerSx={styles.searchInputContainer}
          placeholder="Munnar"
          onChangeText={(newText: string) => setCitySearch(newText)}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.cityScrollView}
        style={styles.scrollStyle}
        showsVerticalScrollIndicator={false}>
        {showLoader && citiesList?.length <= 0 && (
          <View style={styles.dataLoaderView}>
            <ActivityIndicator size="large" color={COLORS.CLR_TEXT} />
          </View>
        )}
        {citiesList?.length > 0 &&
          [...citiesList].map((elem: ICity, idx: number) => (
            <ListItem key={idx} containerStyle={styles.listItemContainer} onPress={() => props.handleSelect(elem)}>
              <ListItem.Content style={styles.autocompleteItemWrapper}>
                <ImageUi url={elem.heroMedia} containerSx={styles.autocompleteItemImage} />
                <View>
                  <TextUi variant="body1" sx={styles.autocompleteItemName}>
                    {`${elem.city}, ${elem.state}`}
                  </TextUi>
                  {showRatingComponent(elem.rating)}
                  <TextUi variant="body1" sx={styles.autocompleteSeasonOfTravel}>
                    {elem.prefrableSeasonOfTravel || "Oct - Dec"}
                  </TextUi>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "85%",
  },
  sheetScrollView: {},
  sheetScrollContentView: {
    height: "85%",
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(20),
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  topView: {
    marginTop: 10,
    paddingVertical: verticalScale(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cityTopBar: {
    height: 4,
    backgroundColor: COLORS.CLR_GRAY_1,
    // width: 20,
    marginHorizontal: "30%",
    marginTop: 15,
    // justifyContent: "center",
    // alignItems: "center",
    // flex: 1,
    textAlign: "center",
    borderRadius: 10 / 2,
    // ba
  },
  citySearchContainer: {},
  searchInputContainer: {
    width: "90%",
  },
  scrollStyle: {},
  cityScrollView: {
    paddingBottom: 70,
  },
  dataLoaderView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemContainer: {},
  autocompleteItemWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  autocompleteItemImage: {
    height: verticalScale(75),
    width: horizontalScale(100),
    borderRadius: moderateScale(30 / 2),
  },
  autocompleteItemName: {
    textAlign: "right",
    fontFamily: "Lato",
    fontSize: 15,
    fontWeight: "800",
  },
  autocompleteItemRatingView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  autocompleteItemRatingIcon: {
    marginHorizontal: 2,
  },
  autocompleteSeasonOfTravel: {
    fontFamily: "Poppins",
    textAlign: "right",
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.CLR_TEXT,
  },
});
