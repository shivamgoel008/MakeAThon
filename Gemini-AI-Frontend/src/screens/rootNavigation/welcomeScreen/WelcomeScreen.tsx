import React, {useCallback, useEffect, useState} from "react";
import {View, StyleProp, TextStyle, TouchableOpacity, StyleSheet} from "react-native";
import {ButtonUi} from "../../../components/ButtonUi";
import WelcomeScreen1 from "../../../assets/media/welcome_screen_1.svg";
import WelcomeScreen2 from "../../../assets/media/welcome_screen_2.svg";
import WelcomeScreen3 from "../../../assets/media/welcome_screen_3.svg";
import {LOGIN_SCREEN} from "../../../constants/RouteConstants";
import {useSwipe} from "../../../helpers/hooks/useSwipe";
import {TextUi} from "../../../components/TextUI";
import {Choose, OtherWise, When} from "../../../helpers/utils/Conditionals";
import {INoTyppedValue} from "../../../interfaces/ICommon";
import {ScrollView} from "react-native-gesture-handler";
import {LOCALIZATION} from "../../../helpers/localization/engLocal";
import {COLORS} from "../../../constants/ColorConstants";
import {verticalScale, moderateScale, horizontalScale} from "../../../helpers/utils/metrics";

interface IWelcomeScreenProps {
  navigation: INoTyppedValue;
}

export const WelcomeScreen: React.FC<IWelcomeScreenProps> = (props: IWelcomeScreenProps): JSX.Element => {
  const [welcomeIndex, setWelcomeIndex] = useState<1 | 2 | 3>(1);

  const onSwipeLeft = useCallback((): void => {
    if (welcomeIndex === 1) {
      setWelcomeIndex(2);
    } else if (welcomeIndex === 2) {
      setWelcomeIndex(3);
    } else if (welcomeIndex === 3) {
      setWelcomeIndex(1);
    }
  }, [welcomeIndex]);

  const onSwipeRight = useCallback(() => {
    if (welcomeIndex === 1) {
      setWelcomeIndex(3);
    } else if (welcomeIndex === 2) {
      setWelcomeIndex(1);
    } else if (welcomeIndex === 3) {
      setWelcomeIndex(2);
    }
  }, [welcomeIndex]);

  const onPress = (elem: 1 | 2 | 3) => {
    setWelcomeIndex(elem);
  };

  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, onSwipeRight, 6);

  const updateWelcomeState = useCallback(() => {
    onSwipeLeft();
  }, [onSwipeLeft]);

  useEffect(() => {
    const welcomeScreenAutoSwipe = setInterval(() => {
      updateWelcomeState();
    }, 2000);

    return () => {
      clearInterval(welcomeScreenAutoSwipe);
    };
  }, [updateWelcomeState]);

  const getCenterDotStyleArray = (elemIdx: 1 | 2 | 3) => {
    const styleArray: StyleProp<TextStyle> = [styles.dotsItem];
    if (elemIdx === 2) {
      styleArray.push(styles.centerDotItem);
    }
    if (elemIdx === welcomeIndex) {
      styleArray.push(styles.activeDotItem);
    }

    return styleArray;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={styles.view1}>
        <View style={styles.imageContainer}>
          <Choose>
            <When condition={welcomeIndex === 1}>
              <WelcomeScreen1 />
            </When>
            <When condition={welcomeIndex === 2}>
              <WelcomeScreen2 />
            </When>
            <OtherWise>
              <WelcomeScreen3 />
            </OtherWise>
          </Choose>
        </View>
      </View>

      <View style={styles.view2}>
        <View style={styles.dotsContainer}>
          <TouchableOpacity onPress={() => onPress(1)}>
            <View style={getCenterDotStyleArray(1)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(2)}>
            <View style={getCenterDotStyleArray(2)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(3)}>
            <View style={getCenterDotStyleArray(3)} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.view3}>
        <View style={styles.view3TextDiv}>
          <TextUi variant="h3" sx={styles.topText}>
            {LOCALIZATION.WELCOME_SCREEN[`swipe_image_${welcomeIndex}_heading`]}
          </TextUi>
          <TextUi variant="h6" sx={styles.bottomText}>
            {LOCALIZATION.WELCOME_SCREEN[`swipe_image_${welcomeIndex}_subheading`]}
          </TextUi>
        </View>
        <View style={styles.view3Button}>
          <View style={styles.bottomButtonView}>
            <ButtonUi variant="primary" onPress={() => props.navigation.navigate(LOGIN_SCREEN)}>
              {LOCALIZATION.WELCOME_SCREEN.register_login_btn_label.toUpperCase()}
            </ButtonUi>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
  },
  contentContainer: {flexGrow: 1},
  view1: {
    height: "60%",
  },
  imageContainer: {
    marginTop: verticalScale(90),
    alignSelf: "center",
  },
  view2: {
    height: "10%",
    justifyContent: "center",
    backgroundColor: COLORS.CLR_GRAY_2,
    flexGrow: 1,
    borderTopStartRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dotsItem: {
    backgroundColor: COLORS.CLR_GRAY_1,
    width: horizontalScale(15),
    height: verticalScale(15),
    borderRadius: moderateScale(15 / 2),
  },
  centerDotItem: {marginHorizontal: horizontalScale(10)},
  activeDotItem: {backgroundColor: COLORS.CLR_PRIMARY},
  view3: {
    height: "30%",
    width: "100%",
    paddingHorizontal: horizontalScale(15),
    backgroundColor: COLORS.CLR_GRAY_2,
  },
  view3TextDiv: {height: "50%"},
  topText: {
    textAlign: "center",
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  bottomText: {marginTop: verticalScale(9), textAlign: "center", color: "#515151"},
  view3Button: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  bottomButtonView: {},
});
