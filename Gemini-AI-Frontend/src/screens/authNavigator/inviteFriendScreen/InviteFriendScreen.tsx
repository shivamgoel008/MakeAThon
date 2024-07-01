import {View, Linking, StyleSheet} from "react-native";
import React, {useState} from "react";
import {TextUi} from "../../../components/TextUI";
import {INoTyppedValue} from "../../../interfaces/ICommon";
import Invite from "../../../assets/media/invite.svg";
import {ButtonUi} from "../../../components/ButtonUi";
import Clipboard from "@react-native-clipboard/clipboard";
import {TouchableOpacity} from "react-native-gesture-handler";
import {COLORS} from "../../../constants/ColorConstants";
import {horizontalScale, verticalScale} from "../../../helpers/utils/metrics";

interface IInviteFriendScreenProps {
  navigation: INoTyppedValue;
}

export const InviteFriendScreen: React.FC<IInviteFriendScreenProps> = (
  _props: IInviteFriendScreenProps,
): JSX.Element => {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = () => {
    Clipboard.setString("zingvel2023");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  const handleButton = () => {
    fetchCopiedText();
    Linking.openURL(
      `whatsapp://send?text=Hey! Install Zingvel App with my CODE '${copiedText}' and we both get exciting rewards.`,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Invite />
      </View>
      <TextUi variant="h6" sx={styles.view1Text}>
        Share the below code and ask them to
      </TextUi>
      <TextUi variant="h6" sx={styles.view1Text2}>
        enter it during their signup.
      </TextUi>

      <View style={styles.view2}>
        <TextUi variant="body2" sx={styles.view2Text}>
          apps/zingvel
        </TextUi>
        <TouchableOpacity style={styles.view2Div} onPress={copyToClipboard}>
          <TextUi variant="body1" sx={styles.view2Text2}>
            COPY URL
          </TextUi>
        </TouchableOpacity>
      </View>
      <ButtonUi variant="primary" onPress={() => handleButton()} containerSx={styles.button}>
        {"Invite a Friend".toUpperCase()}
      </ButtonUi>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(20),
    flex: 1,
  },
  view1: {
    alignSelf: "center",
    marginTop: verticalScale(80),
  },
  view1Text: {
    marginTop: verticalScale(30),
    color: COLORS.CLR_BLACK,
    alignSelf: "center",
  },
  view1Text2: {
    color: COLORS.CLR_BLACK,
    alignSelf: "center",
  },
  view2: {
    marginTop: verticalScale(50),
    marginHorizontal: horizontalScale(20),
    alignSelf: "center",
    borderWidth: 0.8,
    borderColor: "#000000",
    display: "flex",
    flexDirection: "row",
    height: verticalScale(40),
  },
  view2Text: {
    color: COLORS.CLR_BLACK,
    fontSize: 12,
    alignSelf: "center",
    paddingLeft: horizontalScale(40),
    paddingRight: horizontalScale(100),
  },
  view2Text2: {
    color: COLORS.CLR_BLACK,
    fontSize: 10,
    padding: 15,
  },
  view2Div: {
    backgroundColor: "#DADADA",
  },
  button: {
    marginTop: verticalScale(100),
    marginHorizontal: horizontalScale(10),
  },
});
