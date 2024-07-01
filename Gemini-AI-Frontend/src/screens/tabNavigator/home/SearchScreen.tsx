import {View, ScrollView, StyleSheet} from "react-native";
import React, {useCallback, useState} from "react";
import {TextUi} from "../../../components/TextUI";
// import {TextInputUi} from "../../../components/TextInputUi";
import {INoTyppedValue} from "../../../interfaces/ICommon";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {COLORS} from "../../../constants/ColorConstants";
import {horizontalScale, moderateScale, verticalScale} from "../../../helpers/utils/metrics";
import {useSwipe} from "../../../helpers/hooks/useSwipe";

interface ISearchScreenProps {
  navigation: INoTyppedValue;
}

type ISeachScreenTypes = "top" | "packages" | "themes" | "places" | "guides";

const seachScreenTypes: Array<ISeachScreenTypes> = ["top", "packages", "themes", "places", "guides"];

export const SearchScreen: React.FC<ISearchScreenProps> = (_props: ISearchScreenProps): JSX.Element => {
  // const [searchVal, setSearchVal] = useState<string>("");
  const [mode, setMode] = useState<ISeachScreenTypes>(seachScreenTypes[0]);

  const navigation = useNavigation();

  // const onChatSearchChange = (newText: string) => {
  //   setSearchVal(newText);
  // };

  const onSwipeLeft = useCallback((): void => {
    const currIndex: number = seachScreenTypes.indexOf(mode);
    if (currIndex > 0) {
      setMode(seachScreenTypes[currIndex + 1]);
    }
  }, [mode]);

  const onSwipeRight = useCallback(() => {
    const currIndex: number = seachScreenTypes.indexOf(mode);
    if (currIndex < seachScreenTypes.length - 1) {
      setMode(seachScreenTypes[currIndex - 1]);
    }
  }, [mode]);

  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, onSwipeRight, 6);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Ionicons
          name="arrow-back"
          color={COLORS.CLR_BLACK}
          size={25}
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        />
        {/* <TextInputUi
          sx={styles.seachInput}
          value={searchVal}
          placeholder="Search Chat"
          onChangeText={(text: string) => onChatSearchChange(text)}
          autoFocus={true}
        /> */}
      </View>

      <ScrollView
        contentContainerStyle={styles.view7}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}>
        <TouchableOpacity
          onPress={() => setMode("top")}
          style={mode === "top" ? styles.view7BtnSelected : styles.view7Button1}>
          {/* <MaterialCommunityIcons name="chart-timeline-variant-shimmer" size={30} style={styles.divIcon} /> */}
          <TextUi variant="h2" sx={styles.view7Text}>
            Top
          </TextUi>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode("packages")}
          style={mode === "packages" ? styles.view7BtnSelected : styles.view7Button1}>
          {/* <MaterialCommunityIcons name="chart-timeline-variant-shimmer" size={30} style={styles.divIcon} /> */}
          <TextUi variant="h2" sx={styles.view7Text}>
            Packages
          </TextUi>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode("themes")}
          style={mode === "themes" ? styles.view7BtnSelected : styles.view7Button1}>
          {/* <MaterialCommunityIcons name="chart-timeline-variant-shimmer" size={30} style={styles.divIcon} /> */}
          <TextUi variant="h2" sx={styles.view7Text}>
            Themes
          </TextUi>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode("places")}
          style={mode === "places" ? styles.view7BtnSelected : styles.view7Button1}>
          <TextUi variant="h2" sx={styles.view7Text}>
            Places
          </TextUi>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode("guides")}
          style={mode === "guides" ? styles.view7BtnSelected : styles.view7Button1}>
          <TextUi variant="h2" sx={styles.view7Text}>
            Guides
          </TextUi>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(20),
    flex: 1,
  },
  topView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(20),
    // backgroundColor: 'red',
    height: verticalScale(60),
  },
  backIcon: {
    // alignSelf: "center",
    backgroundColor: "red",
    height: "100%",
  },
  seachInput: {
    color: COLORS.CLR_BLACK,
    fontSize: 10,
    marginTop: verticalScale(10),
    // marginLeft: 100,
  },
  view1Div1: {},
  view1Div: {
    // height: verticalScale(40),
    // paddingVertical: verticalScale(10),
    // backgroundColor: CLR_GRAY_2,
    // borderWidth: 0,
  },
  view2: {
    marginTop: verticalScale(30),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: horizontalScale(15),
  },
  view2Div: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  view2Div1: {},
  view2Div2: {},
  view7: {
    // backgroundColor: '#EEEEEE',
    // elevation: 5,
    marginTop: verticalScale(10),
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    // backgroundColor: 'red',
    borderBottomWidth: moderateScale(0.6),
    borderBottomColor: COLORS.CLR_GRAY_1,
    // marginHorizontal: 20,
    // paddingHorizontal:horizontalScale(20)
  },
  view7Button1: {
    // width: '20%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    // borderBottomColor: 'blue',
  },
  view7BtnSelected: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: COLORS.CLR_SECONDRY,
  },
  view7Text: {},
  view7textSelected: {},
  // view7Button2: {
  //   paddingVertical: verticalScale(10),
  //   alignItems: 'center',
  //   borderLeftWidth: 1,
  //   borderLeftColor: '#4F4557',

  //   // backgroundColor: 'white',
  //   // marginLeft: 7,
  //   width: '50%',
  // },
});
