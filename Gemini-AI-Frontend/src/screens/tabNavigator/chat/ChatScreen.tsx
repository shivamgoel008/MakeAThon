import {View, ScrollView} from "react-native";
import React from "react";
import {TextUi} from "../../../components/TextUI";
import {INoTyppedValue} from "../../../interfaces/ICommon";
import {chatScreenStyles} from "./ChatScreenStyles";
// import UserProfile1 from "../../../assets/media/user_avatar_1.svg";
// import UserProfile2 from "../../../assets/media/user_avatar_2.svg";
// import UserProfile3 from "../../../assets/media/user_avatar_3.svg";
// import UserProfile4 from "../../../assets/media/user_avatar_4.svg";
// import {horizontalScale, verticalScale} from "../../../helpers/utils/metrics";
// import {homeScreenStyles} from "../home/HomeScreenStyles";

interface IChatScreenProps {
  navigation: INoTyppedValue;
}

export const ChatScreen: React.FC<IChatScreenProps> = (_props: IChatScreenProps): JSX.Element => {
  // const [chatSearch, setChatSearch] = useState<string>("");
  // const onChatSearchChange = (newText: string) => {
  //   setChatSearch(newText);
  // };

  return (
    <ScrollView style={chatScreenStyles.container}>
      {/* <View style={chatScreenStyles.view1}>
        <TextInputUi
          // variant="secondry"
          sx={chatScreenStyles.view1Div}
          value={chatSearch}
          placeholder="Search Chat"
          onChangeText={(text: string) => onChatSearchChange(text)}
        />
        <Fontisto name="search" color={COLORS.CLR_BLACK} size={15} style={homeScreenStyles.view1Icon} />
      </View> */}

      {/* <ScrollView horizontal={true}> */}
      <View style={chatScreenStyles.view2}>
        <View style={chatScreenStyles.view2Div}>
          {/* <UserProfile1 style={{height: verticalScale(60), width: horizontalScale(60)}} /> */}
          <TextUi variant="body2" sx={chatScreenStyles.view1Text}>
            John Patelo
          </TextUi>
        </View>

        <View style={chatScreenStyles.view2Div}>
          {/* <UserProfile2 style={{height: verticalScale(60), width: horizontalScale(60)}} /> */}
          <TextUi variant="body2" sx={chatScreenStyles.view1Text}>
            John Patelo
          </TextUi>
        </View>

        <View style={chatScreenStyles.view2Div}>
          {/* <UserProfile3 style={{height: verticalScale(60), width: horizontalScale(60)}} /> */}
          <TextUi variant="body2" sx={chatScreenStyles.view1Text}>
            John Patelo
          </TextUi>
        </View>

        <View style={chatScreenStyles.view2Div}>
          {/* <UserProfile4 style={{height: verticalScale(60), width: horizontalScale(60)}} /> */}
          <TextUi variant="body2" sx={chatScreenStyles.view1Text}>
            John Patelo
          </TextUi>
        </View>
        {/* <View style={chatScreenStyles.view2Div}>
          <UserProfile1 style={{height: verticalScale(60), width: horizontalScale(60)}} />
          <TextUi variant="body2" sx={chatScreenStyles.view1Text}>
            John Patelo
          </TextUi>
        </View> */}
      </View>
      {/* </ScrollView> */}

      <View style={chatScreenStyles.view3}>
        {/* <UserProfile4 style={{height: verticalScale(40), width: horizontalScale(40)}} /> */}
        <View style={chatScreenStyles.view3Div}>
          <TextUi variant="h2" sx={chatScreenStyles.view3Text}>
            Kaitlyn
          </TextUi>
          <TextUi variant="body2" sx={chatScreenStyles.view3Text2}>
            Have a good one!
          </TextUi>
        </View>
        <TextUi variant="h1" sx={chatScreenStyles.view3Text3}>
          3:02 PM
        </TextUi>
      </View>

      <View style={chatScreenStyles.view4}>
        {/* <UserProfile3 style={{height: verticalScale(40), width: horizontalScale(40)}} /> */}
        <View style={chatScreenStyles.view3Div}>
          <TextUi variant="h2" sx={chatScreenStyles.view3Text}>
            Kaitlyn
          </TextUi>
          <TextUi variant="body2" sx={chatScreenStyles.view3Text2}>
            Have a good one!
          </TextUi>
        </View>
        <TextUi variant="h1" sx={chatScreenStyles.view3Text3}>
          3:02 PM
        </TextUi>
      </View>

      <View style={chatScreenStyles.view4}>
        {/* <UserProfile2 style={{height: verticalScale(40), width: horizontalScale(40)}} /> */}
        <View style={chatScreenStyles.view3Div}>
          <TextUi variant="h2" sx={chatScreenStyles.view3Text}>
            Kaitlyn
          </TextUi>
          <TextUi variant="body2" sx={chatScreenStyles.view3Text2}>
            Have a good one!
          </TextUi>
        </View>
        <TextUi variant="h1" sx={chatScreenStyles.view3Text3}>
          3:02 PM
        </TextUi>
      </View>

      <View style={chatScreenStyles.view4}>
        {/* <UserProfile1 style={{height: verticalScale(40), width: horizontalScale(40)}} /> */}
        <View style={chatScreenStyles.view3Div}>
          <TextUi variant="h2" sx={chatScreenStyles.view3Text}>
            Kaitlyn
          </TextUi>
          <TextUi variant="body2" sx={chatScreenStyles.view3Text2}>
            Have a good one!
          </TextUi>
        </View>
        <TextUi variant="h1" sx={chatScreenStyles.view3Text3}>
          3:02 PM
        </TextUi>
      </View>

      <View style={chatScreenStyles.view4}>
        {/* <UserProfile4 style={{height: verticalScale(40), width: horizontalScale(40)}} /> */}
        <View style={chatScreenStyles.view3Div}>
          <TextUi variant="h2" sx={chatScreenStyles.view3Text}>
            Kaitlyn
          </TextUi>
          <TextUi variant="body2" sx={chatScreenStyles.view3Text2}>
            Have a good one!
          </TextUi>
        </View>
        <TextUi variant="h1" sx={chatScreenStyles.view3Text3}>
          3:02 PM
        </TextUi>
      </View>

      <View style={chatScreenStyles.view4}>
        {/* <UserProfile3 style={{height: verticalScale(40), width: horizontalScale(40)}} /> */}
        <View style={chatScreenStyles.view3Div}>
          <TextUi variant="h2" sx={chatScreenStyles.view3Text}>
            Kaitlyn
          </TextUi>
          <TextUi variant="body2" sx={chatScreenStyles.view3Text2}>
            Have a good one!
          </TextUi>
        </View>
        <TextUi variant="h1" sx={chatScreenStyles.view3Text3}>
          3:02 PM
        </TextUi>
      </View>

      <View style={chatScreenStyles.view4}>
        {/* <UserProfile2 style={{height: verticalScale(40), width: horizontalScale(40)}} /> */}
        <View style={chatScreenStyles.view3Div}>
          <TextUi variant="h2" sx={chatScreenStyles.view3Text}>
            Kaitlyn
          </TextUi>
          <TextUi variant="body2" sx={chatScreenStyles.view3Text2}>
            Have a good one!
          </TextUi>
        </View>
        <TextUi variant="h1" sx={chatScreenStyles.view3Text3}>
          3:02 PM
        </TextUi>
      </View>

      <View style={chatScreenStyles.view4}>
        {/* <UserProfile1 style={{height: verticalScale(40), width: horizontalScale(40)}} /> */}
        <View style={chatScreenStyles.view3Div}>
          <TextUi variant="h2" sx={chatScreenStyles.view3Text}>
            Kaitlyn
          </TextUi>
          <TextUi variant="body2" sx={chatScreenStyles.view3Text2}>
            Have a good one!
          </TextUi>
        </View>
        <TextUi variant="h1" sx={chatScreenStyles.view3Text3}>
          3:02 PM
        </TextUi>
      </View>
    </ScrollView>
  );
};
