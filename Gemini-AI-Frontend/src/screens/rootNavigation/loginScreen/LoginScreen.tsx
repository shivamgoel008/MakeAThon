import {View, ScrollView, StyleSheet} from "react-native";
import React, {useState} from "react";
import {TextUi} from "../../../components/TextUI";
import {TextInputUi} from "../../../components/TextInputUi";
import {ButtonUi} from "../../../components/ButtonUi";
import {VERIFICATION_SCREEN} from "../../../constants/RouteConstants";
import {ILoginScreenFormData, ISendOtpReq} from "../../../interfaces/IUser";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import {axiosResponseValidation} from "../../../helpers/utils/CommonFunctions";
import {ONLY_NUMBER_WITH_SPACE_REGEX} from "../../../constants/CommonConstants";
import {sendOtpService} from "../../../services/SUser";
import {LOCALIZATION} from "../../../helpers/localization/engLocal";
import {COLORS} from "../../../constants/ColorConstants";
import {horizontalScale, verticalScale, moderateScale} from "../../../helpers/utils/metrics";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SocialIcon} from "@rneui/themed";

interface ILoginScreenProps {
  navigation: INoTyppedValue;
}

const intialFormData: ILoginScreenFormData = {
  countryCode: "91",
  countryCodeValidation: "",
  phNumber: "",
  phNumberValidation: "",
};

export const LoginScreen: React.FC<ILoginScreenProps> = (props: ILoginScreenProps): JSX.Element => {
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const [formData, setFormData] = useState<ILoginScreenFormData>(intialFormData);

  const onMobileNumberChange = (newText: string): void => {
    const newFormData: ILoginScreenFormData = {...formData};

    if (ONLY_NUMBER_WITH_SPACE_REGEX.test(newText)) {
      newFormData.phNumber = newText;
      newFormData.phNumberValidation = "";
    }
    setFormData(newFormData);
  };

  const validateForm = (): boolean => {
    const newFormData: ILoginScreenFormData = {...formData};
    let isFormClean: boolean = true;

    if (!formData.phNumber || formData.phNumber.length !== 10) {
      newFormData.phNumberValidation = LOCALIZATION.LOGIN_SCREEN.phone_number_validation;
      isFormClean = false;
    }

    setFormData(newFormData);
    return isFormClean;
  };

  const handleLogin = (): void => {
    if (validateForm()) {
      setBtnLoader(true);

      const reqObj: ISendOtpReq = {
        countryCode: Number(formData.countryCode),
        phNumber: Number(formData.phNumber),
      };
      sendOtpService(reqObj)
        .then((res: IAxiosSuccess) => {
          if (axiosResponseValidation(res)) {
            props.navigation.navigate(VERIFICATION_SCREEN, {
              countryCode: formData.countryCode,
              phNumber: formData.phNumber,
            });
          }
        })
        .catch((err: IAxiosError) => {
          console.log(err);
        })
        .finally(() => {
          props.navigation.navigate(VERIFICATION_SCREEN);

          setBtnLoader(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Ionicons name="arrow-back" color={COLORS.CLR_TEXT} size={25} onPress={() => props.navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.view1}>
          <TextUi variant="h3" sx={styles.view1Text}>
            {LOCALIZATION.LOGIN_SCREEN.header}
          </TextUi>
        </View>
        <View style={styles.view2}>
          <TextUi variant="h6" sx={styles.view2Text}>
            {LOCALIZATION.LOGIN_SCREEN.subheader}
          </TextUi>
        </View>
        <View style={styles.view3}>
          <View style={styles.view3Div2}>
            <TextInputUi
              label="Mobile Number"
              value={formData.phNumber}
              placeholder="8650XXXXXX"
              onChangeText={(text: string) => onMobileNumberChange(text)}
              sx={styles.view3textInput2}
              keyboardType="numeric"
              errorMessage={formData.phNumberValidation}
              inputContainerSx={styles.numberInputContainer}
              autoComplete="tel"
            />
          </View>
        </View>
        <View style={styles.view4}>
          <ButtonUi
            variant="primary"
            onPress={() => props.navigation.navigate(VERIFICATION_SCREEN)}
            containerSx={styles.view4Button}
            isLoading={btnLoader}>
            {LOCALIZATION.LOGIN_SCREEN.register_login_btn_label.toUpperCase()}
          </ButtonUi>
        </View>

        <View style={styles.view5}>
          <View style={styles.view5Div1} />
          <View style={styles.view5Div2}>
            <TextUi variant="h5" sx={styles.view5Div2Text}>
              OR
            </TextUi>
          </View>
          <View style={styles.view5Div3} />
        </View>

        <View style={styles.view6}>
          <SocialIcon type="facebook" iconType="font-awesome" />
          <SocialIcon type="google" iconType="font-awesome" />
          <SocialIcon type="twitter" iconType="font-awesome" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(30),
  },
  topHeader: {
    paddingVertical: verticalScale(10),
  },
  scrollView: {
    flexGrow: 1,
  },
  view1: {
    paddingTop: verticalScale(60),
  },
  view1Text: {
    textAlign: "center",
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(25),
    fontWeight: "600",
  },
  view2: {
    paddingTop: verticalScale(40),
  },
  view2Text: {
    textAlign: "center",
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(16),
    fontWeight: "400",
  },
  view3: {
    marginTop: horizontalScale(50),
    flexDirection: "row",
  },
  view3Div1: {
    marginRight: horizontalScale(10),
    paddingTop: verticalScale(10),
  },
  view3Div2: {
    flex: 1,
  },
  leftIconView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.CLR_PLACEHOLDER,
    marginTop: 7,
  },
  countryCodeText: {
    marginLeft: 7,
    marginRight: 15,
    fontSize: moderateScale(14),
    fontWeight: "400",
    fontFamily: "Poppins",
  },
  numberInputContainer: {marginTop: -2.5},
  view3textInput2: {},
  view4: {
    flexGrow: 1,
    justifyContent: "center",
  },
  view4Button: {width: "100%"},
  view5: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
  },
  view5Div1: {
    borderWidth: horizontalScale(1),
    height: 0,
    borderColor: COLORS.CLR_GRAY_1,
    width: "40%",
  },
  view5Div2: {
    width: "20%",
    alignItems: "center",
  },
  view5Div2Text: {
    color: COLORS.CLR_TEXT,
  },
  view5Div3: {
    height: 0,
    borderWidth: horizontalScale(1),
    borderColor: COLORS.CLR_GRAY_1,
    width: "40%",
  },
  view6: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    flexGrow: 1,
  },

  view6Img1: {
    height: verticalScale(50),
    width: horizontalScale(50),
  },
  view6Img2: {
    height: verticalScale(50),
    width: horizontalScale(50),
  },
  view6Img3: {
    height: verticalScale(50),
    width: horizontalScale(50),
  },
});
