import {View, ScrollView, TouchableOpacity, StyleSheet} from "react-native";
import React, {useRef, useState} from "react";
import {ButtonUi} from "../../../components/ButtonUi";
import {TextUi} from "../../../components/TextUI";
import {TextInputUi} from "../../../components/TextInputUi";
import {useAppDispatch, useAppSelector} from "../../../redux/reduxHooks";
import {ReduxRootState} from "../../../redux/ReduxStore";
import {Dropdown} from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import {COLORS} from "../../../constants/ColorConstants";
import {ONLY_STRING_WITH_SPACE_REGEX} from "../../../constants/CommonConstants";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import {axiosResponseValidation, generateUserName, validateMail} from "../../../helpers/utils/CommonFunctions";
import {IEditUserReq, IUserGender} from "../../../interfaces/IUser";
import {editUserService} from "../../../services/SUser";
import {setUserAction} from "../../../redux/Actions/UserAction";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import {horizontalScale, moderateScale, verticalScale} from "../../../helpers/utils/metrics";
import {AUTH_NAVIGATOR_SCREEN, PREFRENCES_SCREEN} from "../../../constants/RouteConstants";

interface IEditProfileScreenProps {
  navigation: INoTyppedValue;
}

interface IFormData {
  firstName: string;
  firstNameErr: string;
  lastName: string;
  lastNameErr: string;
  userName: string;
  userNameErr: string;
  userNameSucc: string;
  email: string;
  emailErr: string;
  gender: IUserGender;
  dateOfBirth: string;
}

interface IGenderDdnItem {
  label: IUserGender;
  value: IUserGender;
}

export const EditProfileScreen: React.FC<IEditProfileScreenProps> = (props: IEditProfileScreenProps): JSX.Element => {
  const {registeredUser, isNewUser} = useAppSelector((state: ReduxRootState) => state.userReducer);

  const dispatch = useAppDispatch();

  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  const [formData, setFormData] = useState<IFormData>({
    firstName: registeredUser.firstName || "",
    firstNameErr: "",
    lastName: registeredUser.lastName || "",
    lastNameErr: "",
    userName: registeredUser.userName || "",
    userNameErr: "",
    userNameSucc: "",
    email: registeredUser.email || "",
    emailErr: "",
    gender: registeredUser.gender || "Other",
    dateOfBirth: registeredUser.dateOfBirth || "",
  });

  const [btnLoader, setBtnLoader] = useState<boolean>(false);

  const userNameServiceRef = useRef<"searching" | "not-searching">("not-searching");

  const GENDER_DDN_DATA: Array<IGenderDdnItem> = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"},
    {label: "Other", value: "Other"},
  ];

  const onFirstNameChange = (newText: string): void => {
    const newFormData: IFormData = {...formData};

    if (ONLY_STRING_WITH_SPACE_REGEX.test(newText)) {
      newFormData.firstName = newText;
      newFormData.firstNameErr = "";
    }

    setFormData(newFormData);
  };

  const onFirstNameBlur = (): void => {
    if (isNewUser && !formData.userName) {
      const newFormData: IFormData = {...formData};
      newFormData.userName = `${formData.firstName}_${generateUserName()}`;

      setFormData(newFormData);
    }
  };

  const onLastNameChange = (newText: string): void => {
    const newFormData: IFormData = {...formData};

    if (ONLY_STRING_WITH_SPACE_REGEX.test(newText)) {
      newFormData.lastName = newText;
      newFormData.lastNameErr = "";
    }

    setFormData(newFormData);
  };

  const onUserNameChange = (newText: string): void => {
    const newFormData: IFormData = {...formData};

    newFormData.userName = newText.toLowerCase();
    newFormData.userNameErr = "";

    setFormData(newFormData);
  };

  const onMailChange = (newText: string): void => {
    const newFormData: IFormData = {...formData};
    newFormData.email = newText;
    newFormData.emailErr = "";

    setFormData(newFormData);
  };

  const onGenderChange = (item: {label: IUserGender; value: IUserGender}): void => {
    const newFormData: IFormData = {...formData};
    newFormData.gender = item.label;

    setFormData(newFormData);
  };

  const onSelectDateOfBirth = (date: Date): void => {
    const newFormData: IFormData = {...formData};
    newFormData.dateOfBirth = moment(date).toISOString();
    setFormData(newFormData);
    setOpenDatePicker(false);
  };

  const validateForm = (): boolean => {
    let isFormDirty: boolean = false;
    const newFormData: IFormData = {...formData};

    if (!formData.firstName) {
      isFormDirty = true;
      newFormData.firstNameErr = "Please enter first name";
    }
    if (!formData.lastName) {
      isFormDirty = true;

      newFormData.lastNameErr = "Please enter last name";
    }
    if (!formData.userName) {
      isFormDirty = true;

      newFormData.userNameErr = "Please enter a valid user name";
    }
    if (formData.email && !validateMail(formData.email)) {
      isFormDirty = true;

      newFormData.emailErr = "Please enter a valid email";
    }

    setFormData(newFormData);
    return isFormDirty;
  };

  const handleSave = (): void => {
    if (!validateForm()) {
      setBtnLoader(true);

      const reqUser: IEditUserReq = {} as IEditUserReq;

      reqUser.id = registeredUser.id;
      if (formData.firstName.trim()) {
        reqUser.firstName = formData.firstName.trim();
      }
      if (formData.lastName.trim()) {
        reqUser.lastName = formData.lastName.trim();
      }
      if (formData.userName.trim()) {
        reqUser.userName = formData.userName.trim().toLowerCase();
      }
      if (formData.email.trim()) {
        reqUser.email = formData.email.trim().toLowerCase();
      }
      if (formData.gender.trim()) {
        reqUser.gender = formData.gender;
      }
      if (formData.dateOfBirth.trim()) {
        reqUser.dateOfBirth = formData.dateOfBirth.trim();
      }

      reqUser.gender = formData.gender;

      editUserService(reqUser)
        .then((res: IAxiosSuccess) => {
          if (axiosResponseValidation(res)) {
            dispatch(setUserAction(res.data));
            if (isNewUser) {
              props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: PREFRENCES_SCREEN});
            } else {
              props.navigation.goBack();
            }
          }
        })
        .catch((err: IAxiosError) => {
          console.log(err);
        })
        .finally(() => {
          setBtnLoader(false);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topView} />
      {isNewUser && (
        <View style={styles.welcomeView}>
          <TextUi sx={styles.welcomeText} variant="caption">
            Hey Zinger! more about you
          </TextUi>
        </View>
      )}

      <View style={styles.viewValue}>
        <TextInputUi
          label="First Name"
          value={formData.firstName}
          placeholder="John"
          onChangeText={(text: string) => onFirstNameChange(text)}
          sx={styles.value}
          errorMessage={formData.firstNameErr}
          onBlur={() => onFirstNameBlur()}
        />
      </View>

      <View style={styles.viewValue}>
        <TextInputUi
          label="Last Name"
          value={formData.lastName}
          placeholder="Smith"
          onChangeText={(text: string) => onLastNameChange(text)}
          sx={styles.value}
          errorMessage={formData.lastNameErr}
        />
      </View>

      <View style={styles.viewValue}>
        <TextInputUi
          label="User Name"
          value={formData.userName}
          placeholder="john_smith"
          onChangeText={(text: string) => onUserNameChange(text)}
          sx={styles.value}
          errorMessage={formData.userNameErr}
          successMessage={formData.userNameSucc}
        />
      </View>

      {isNewUser && (
        <View style={styles.viewValue}>
          <TextInputUi
            label="E-Mail"
            value={formData.email}
            placeholder="john.smith@gmail.com"
            onChangeText={(text: string) => onMailChange(text)}
            sx={styles.value}
            errorMessage={formData.emailErr}
          />
        </View>
      )}

      <View style={styles.viewDateOfBirth}>
        <TextUi variant="h1" sx={styles.labelDateOfBirth}>
          Date Of Birth
        </TextUi>
        <TouchableOpacity
          style={styles.dateOfBirth}
          onPress={() => {
            setOpenDatePicker(true);
          }}>
          <TextUi variant="h2" sx={formData.dateOfBirth ? styles.dateOfBirthText : styles.dateOfBirthPlaceholder}>
            {formData.dateOfBirth ? moment(formData.dateOfBirth).format("DD - MMMM - YYYY") : "DD - MM - YYYY"}
          </TextUi>
          <AntDesign name="calendar" color={COLORS.CLR_PLACEHOLDER} size={15} />
          <DatePicker
            modal
            open={openDatePicker}
            date={formData.dateOfBirth ? moment(formData.dateOfBirth).toDate() : new Date()}
            onConfirm={(date: Date) => onSelectDateOfBirth(date)}
            onCancel={() => setOpenDatePicker(false)}
            mode="date"
            maximumDate={new Date()}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.viewGender}>
        <TextUi variant="h1" sx={styles.labelGender}>
          Gender
        </TextUi>
        <Dropdown
          style={styles.gender}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={styles.itemTextStyle}
          iconStyle={styles.iconStyle}
          iconColor={COLORS.CLR_PLACEHOLDER}
          containerStyle={styles.dropdwonContainerStyle}
          activeColor="transparent"
          data={GENDER_DDN_DATA}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Gender"
          value={GENDER_DDN_DATA.filter(elem => elem.label === formData?.gender)[0]}
          onChange={(item: {label: IUserGender; value: IUserGender}) => onGenderChange(item)}
        />
      </View>

      <View style={styles.bottomButtonView}>
        <ButtonUi
          variant="primary"
          onPress={() => handleSave()}
          containerSx={styles.button}
          disabled={btnLoader || userNameServiceRef.current === "searching"}
          isLoading={btnLoader}>
          {"Save".toUpperCase()}
        </ButtonUi>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(20),
  },
  topView: {
    marginTop: verticalScale(30),
  },
  welcomeView: {
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "600",
    letterSpacing: 1.2,
    color: COLORS.CLR_PRIMARY,
  },
  // viewLabel: {
  //   display: "flex",
  //   flexDirection: "row",
  //   marginBottom: verticalScale(10),
  // },
  // requiredText: {color: "red", marginLeft: horizontalScale(5), fontSize: 14, fontWeight: "400"},
  label: {
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "Lato",
    letterSpacing: 1.2,
  },
  viewValue: {marginBottom: 25},
  viewDateOfBirth: {marginBottom: 25, marginTop: 10},
  value: {},
  labelDateOfBirth: {
    position: "absolute",
    backgroundColor: COLORS.CLR_WHITE,
    top: -10,
    left: 10,
    zIndex: 1,
    color: COLORS.CLR_TEXT,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    fontFamily: "Lato",
    fontWeight: "400",
    letterSpacing: 1.1,
    fontSize: 12.5,
  },
  dateOfBirth: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.CLR_PLACEHOLDER,
    borderWidth: moderateScale(1),
    height: verticalScale(55),
    paddingHorizontal: verticalScale(20),
    width: "100%",
    borderBottomEndRadius: moderateScale(15),
    borderBottomStartRadius: moderateScale(15),
    borderTopEndRadius: moderateScale(15),
    borderTopStartRadius: moderateScale(15),
  },
  dateOfBirthPlaceholder: {
    color: COLORS.CLR_PLACEHOLDER,
    fontSize: 15,
  },
  dateOfBirthText: {
    color: COLORS.CLR_TEXT,
    fontSize: 15,
  },
  locationIcon: {},
  locationText: {},
  viewGender: {
    marginTop: 10,
  },
  labelGender: {
    position: "absolute",
    backgroundColor: COLORS.CLR_WHITE,
    top: -10,
    left: 10,
    zIndex: 1,
    color: COLORS.CLR_TEXT,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    fontFamily: "Lato",
    fontWeight: "400",
    letterSpacing: 1.1,
    fontSize: 12.5,
  },
  gender: {
    borderColor: COLORS.CLR_PLACEHOLDER,
    borderWidth: moderateScale(1),
    height: verticalScale(55),
    paddingHorizontal: verticalScale(20),
    borderBottomEndRadius: moderateScale(15),
    borderBottomStartRadius: moderateScale(15),
    borderTopEndRadius: moderateScale(15),
    borderTopStartRadius: moderateScale(15),
  },
  selectedTextStyle: {
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(16),
    fontFamily: "Poppins",
  },
  itemTextStyle: {
    fontSize: moderateScale(15),
    color: COLORS.CLR_TEXT,
    fontFamily: "Poppins",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdwonContainerStyle: {
    marginTop: 5,
    borderColor: COLORS.CLR_GRAY_1,
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(15),
  },
  bottomButtonView: {flexGrow: 1, justifyContent: "flex-end"},
  button: {marginBottom: verticalScale(20)},
});
