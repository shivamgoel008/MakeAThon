import {ActivityIndicator, View, StyleSheet} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {ButtonUi} from "../../../components/ButtonUi";
import {TextUi} from "../../../components/TextUI";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import {AUTH_NAVIGATOR_SCREEN, AVATAR_UPLOAD_SCREEN, HOME_SCREEN} from "../../../constants/RouteConstants";
import {ISendOtpReq, IValidateOtpReq} from "../../../interfaces/IUser";
import {sendOtpService, validateOtpService} from "../../../services/SUser";
import {axiosResponseValidation, settingCookie} from "../../../helpers/utils/CommonFunctions";
import {useRoute} from "@react-navigation/native";
import {LOCALIZATION} from "../../../helpers/localization/engLocal";
import {COLORS} from "../../../constants/ColorConstants";
import {useAppDispatch} from "../../../redux/reduxHooks";
import {setNewUserAction, setUserAction} from "../../../redux/Actions/UserAction";
import {horizontalScale, moderateScale, verticalScale} from "../../../helpers/utils/metrics";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IVerificationScreenProps {
  navigation: INoTyppedValue;
}

export const VerificationScreen: React.FC<IVerificationScreenProps> = (
  props: IVerificationScreenProps,
): JSX.Element => {
  const dispatch = useAppDispatch();

  const OTP_TIME_SECONDS: number = 90;

  const [timer, setTimer] = useState<number>(OTP_TIME_SECONDS);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const [resendLoader, setResendLoader] = useState<boolean>(false);
  const [inputOtp, setInputOtp] = useState<string>("");
  const [otpValidation, setOtpValidation] = useState<string>("");

  const route = useRoute();

  // const {countryCode, phNumber} = route.params as {countryCode: string; phNumber: string};

  const timerRef = useRef<number>(timer);

  const reduceTimer = (otpTimerId: number) => {
    timerRef.current -= 1;
    if (timerRef.current < 0) {
      clearInterval(otpTimerId);
    } else {
      setTimer(timerRef.current);
    }
  };

  const resendOTP = () => {
    setResendLoader(true);
    if (timer <= 0) {
      const reqObj: ISendOtpReq = {
        countryCode: Number(countryCode),
        phNumber: Number(phNumber),
      };
      sendOtpService(reqObj)
        .then((res: IAxiosSuccess) => {
          if (axiosResponseValidation(res)) {
            setTimer(OTP_TIME_SECONDS);
            timerRef.current = OTP_TIME_SECONDS;
            const otpTimerId: number = setInterval(() => {
              reduceTimer(otpTimerId);
            }, 1000);
          }
        })
        .catch((err: IAxiosError) => {
          console.log(err);
        })
        .finally(() => {
          setResendLoader(false);
        });
    }
  };

  const validateOtp = () => {
    // if (!inputOtp || inputOtp.length !== 4) {
    //   setOtpValidation(LOCALIZATION.VERIFICATION_SCREEN.otp_validation_blank);
    // } else {
    setBtnLoader(true);

    const reqObj: IValidateOtpReq = {
      countryCode: Number(countryCode),
      phNumber: Number(phNumber),
      otpCode: 8774,
      // otpCode: Number(inputOtp),
    };

    validateOtpService(reqObj)
      .then((res: IAxiosSuccess) => {
        if (axiosResponseValidation(res)) {
          if (
            res.data &&
            res.data.user &&
            res.data.token &&
            typeof res.data.token === "string" &&
            typeof res.data.isUserExist === "boolean"
          ) {
            dispatch(setUserAction(res.data.user));
            settingCookie(res.data.user.countryCode, res.data.user.phNumber, res.data.token);
            if (res.data.isUserExist) {
              props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: HOME_SCREEN});
            } else {
              dispatch(setNewUserAction(true));
              props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: AVATAR_UPLOAD_SCREEN});
            }
          }
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
        setOtpValidation(LOCALIZATION.VERIFICATION_SCREEN.otp_validation_incorrect);
      })
      .finally(() => {
        setBtnLoader(false);
      });
    // }
  };

  const getTimerFormat = () => {
    let hours: number | string = Math.floor(timer / 3600);
    let minutes: number | string = Math.floor((timer - hours * 3600) / 60);
    let seconds: number | string = timer - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const otpTimerId: number = setInterval(() => {
      reduceTimer(otpTimerId);
    }, 1000);
    return () => {
      clearInterval(otpTimerId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Ionicons name="arrow-back" color={COLORS.CLR_TEXT} size={25} onPress={() => props.navigation.goBack()} />
      </View>
      {/* <ScrollView contentContainerStyle={styles.scrollView}> */}
      <View style={styles.view1}>
        <TextUi variant="h3" sx={styles.view1Text}>
          {LOCALIZATION.VERIFICATION_SCREEN.header}
        </TextUi>
      </View>

      <View style={styles.view2}>
        <TextUi variant="h6" sx={styles.view2Text}>
          {LOCALIZATION.VERIFICATION_SCREEN.subheader}
        </TextUi>
      </View>

      <View style={styles.view3}>
        <OTPInputView
          autoFocusOnLoad
          pinCount={4}
          style={styles.view3Input}
          codeInputFieldStyle={
            otpValidation ? styles.view3InputCodeInputFieldErrorStyle : styles.view3InputCodeInputFieldStyle
          }
          code={inputOtp}
          onCodeChanged={(newCode: string) => {
            setOtpValidation("");
            setInputOtp(newCode);
          }}
          onCodeFilled={() => validateOtp()}
        />
        {otpValidation && (
          <TextUi variant="caption" sx={styles.otpValidation}>
            {otpValidation}
          </TextUi>
        )}
      </View>

      <View style={styles.view5}>
        <View>
          <TextUi variant="body2" sx={styles.view5Text1}>
            {getTimerFormat()}
          </TextUi>
        </View>
        <View>
          <View>
            <TextUi variant="body2" sx={styles.view5Text2}>
              {LOCALIZATION.VERIFICATION_SCREEN.dont_recieve_otp}
            </TextUi>
          </View>
          <View pointerEvents={timer > 0 ? "none" : "auto"} style={styles.view5Div3}>
            <ActivityIndicator size="small" color={COLORS.CLR_PRIMARY} animating={resendLoader} />

            <TextUi
              variant="body1"
              sx={timer > 0 ? styles.view5Text3Disabled : styles.view5Text3}
              onPress={() => resendOTP()}>
              {LOCALIZATION.VERIFICATION_SCREEN.resend_text}
            </TextUi>
          </View>
        </View>
      </View>

      <View style={styles.view6}>
        <ButtonUi
          variant="primary"
          isLoading={btnLoader}
          // onPress={() => validateOtp()}
          onPress={() => props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: HOME_SCREEN})}
          containerSx={styles.view6Button}>
          {LOCALIZATION.VERIFICATION_SCREEN.verify_btn_label.toUpperCase()}
        </ButtonUi>
      </View>
      {/* </ScrollView> */}
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
    marginTop: verticalScale(40),
  },
  view1Text: {
    color: COLORS.CLR_TEXT,
    textAlign: "center",
    fontSize: moderateScale(25),
    fontWeight: "500",
    letterSpacing: 1.5,
    // fontFamily: "",
  },
  view2: {
    paddingTop: verticalScale(40),
  },
  view2Text: {
    color: COLORS.CLR_TEXT,
    textAlign: "center",
    fontSize: moderateScale(15),
    fontWeight: "400",
    letterSpacing: 1.2,
  },
  view3: {
    paddingTop: verticalScale(40),
  },
  view3Input: {
    width: "100%",
    height: 100,
  },
  view3InputCodeInputFieldStyle: {
    borderColor: COLORS.CLR_BLACK,
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(10),
    color: COLORS.CLR_TEXT,
  },
  view3InputCodeInputFieldErrorStyle: {
    borderColor: COLORS.CLR_ERROR,
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(10),
    color: COLORS.CLR_ERROR,
    fontSize: moderateScale(12),
    fontWeight: "400",
    fontFamily: "Lato",
    letterSpacing: 1.5,
  },
  otpValidation: {
    fontFamily: "Lato",
    fontSize: moderateScale(14),
    fontWeight: "300",
    color: COLORS.CLR_ERROR,
  },
  view4: {
    display: "flex",
    flexDirection: "row",
    paddingTop: verticalScale(20),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  view4Text1: {
    fontSize: moderateScale(14),
    fontWeight: "300",
    fontFamily: "Lato",
  },
  view4Text2: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    marginLeft: horizontalScale(10),
    fontFamily: "Lato",
  },
  view4EditIcon: {
    color: COLORS.CLR_TEXT,
    marginLeft: horizontalScale(10),
  },
  view5: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(50),
  },
  view5Text1: {
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  view5Text2: {
    color: COLORS.CLR_TEXT,
  },
  view5Text3Disabled: {
    color: COLORS.CLR_GRAY_1,
    marginLeft: horizontalScale(5),
    textAlign: "right",
    marginTop: verticalScale(10),
  },
  view5Div3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  view5Text3: {
    color: COLORS.CLR_TEXT,
    marginLeft: horizontalScale(5),
    textAlign: "right",
    marginTop: verticalScale(10),
  },
  view6: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  view6Button: {
    marginBottom: verticalScale(40),
  },
});
