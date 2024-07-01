import {View, StyleSheet, ViewStyle} from "react-native";
import React, {useState} from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import {TouchableOpacity} from "react-native-gesture-handler";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import {COLORS} from "../constants/ColorConstants";
import {horizontalScale, verticalScale, moderateScale} from "../helpers/utils/metrics";
import {TextUi} from "./TextUI";

interface IProps {
  value?: Date;
  onSelect: (date: Date) => void;
  errMessage: string;
  containerSx?: ViewStyle;
}

export const FormDatePicker: React.FC<IProps> = (props: IProps) => {
  const [openPicker, setOpenPicker] = useState<boolean>(false);

  const toggleDatePicker = (value: boolean): void => {
    setOpenPicker(value);
  };

  const handleSelect = (date: Date): void => {
    props.onSelect(date);
    toggleDatePicker(false);
  };

  const styles = StyleSheet.create({
    label: {
      backgroundColor: COLORS.CLR_WHITE,
      position: "absolute",
      alignSelf: "flex-start",
      marginTop: -10,
      left: 7,
      paddingHorizontal: 10,
      fontFamily: "Poppins",
      fontWeight: "400",
      letterSpacing: 1.1,
      fontSize: 12,
      zIndex: 99,
      color: props.errMessage ? COLORS.CLR_ERROR : COLORS.CLR_TEXT,
    },

    viewLabelExpectedDate: {
      marginBottom: verticalScale(10),
    },
    expectedDate: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderColor: COLORS.CLR_GRAY_1,
      borderWidth: moderateScale(0.5),
      height: verticalScale(50),
      borderRadius: moderateScale(12),
      paddingHorizontal: horizontalScale(20),
    },
    expectedDateErr: {
      borderColor: COLORS.CLR_ERROR,
    },
    expectedDateText: {
      color: COLORS.CLR_TEXT,
      fontSize: moderateScale(14),
      fontWeight: "400",
      fontFamily: "Poppins",
    },
    expectedDatePlaceHolder: {
      color: COLORS.CLR_PLACEHOLDER,
      fontSize: moderateScale(14),
      fontWeight: "400",
      fontFamily: "Poppins",
    },
    expectedDateErrText: {
      color: COLORS.CLR_ERROR,
      fontSize: moderateScale(12),
      fontWeight: "400",
      fontFamily: "Lato",
      marginLeft: 10,
      marginTop: 3,
      letterSpacing: 1.2,
    },
  });

  return (
    <View style={props.containerSx}>
      <TextUi variant="h1" sx={styles.label}>
        Select expected date of travel
      </TextUi>
      <TouchableOpacity
        style={props.errMessage ? [styles.expectedDate, styles.expectedDateErr] : styles.expectedDate}
        onPress={() => toggleDatePicker(true)}>
        <TextUi variant="h2" sx={props.value ? styles.expectedDateText : styles.expectedDatePlaceHolder}>
          {props.value ? moment(props.value).format("DD - MMM - YYYY") : "DD - MM - YYYY"}
        </TextUi>
        <AntDesign name="calendar" color={COLORS.CLR_BLACK} size={15} />
        <DatePicker
          modal
          open={openPicker}
          date={props.value || new Date()}
          onConfirm={(date: Date) => handleSelect(date)}
          onCancel={() => toggleDatePicker(false)}
          mode="date"
          minimumDate={new Date()}
        />
      </TouchableOpacity>
      {props.errMessage && (
        <TextUi variant="body1" sx={styles.expectedDateErrText}>
          {props.errMessage}
        </TextUi>
      )}
    </View>
  );
};
