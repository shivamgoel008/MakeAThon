import React from "react";
import {ScrollView, View, TouchableOpacity, ImageBackground} from "react-native";
import {TextUi} from "../../../../components/TextUI";
import {ITheme} from "../../../../interfaces/IHomeScreen";
import {homeScreenStyles} from "../HomeScreenStyles";

interface IBudgetCardsProps {
  cardData: Array<ITheme>;
  onThemeClick: (theme: ITheme) => void;
}

export const BudgetCards: React.FC<IBudgetCardsProps> = (props: IBudgetCardsProps) => {
  return (
    <React.Fragment>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={homeScreenStyles.view5}>
          {props.cardData?.map((elem: ITheme, idx: number) => {
            return (
              <TouchableOpacity style={homeScreenStyles.view5Div1} key={idx} onPress={() => props.onThemeClick(elem)}>
                <ImageBackground
                  source={{uri: elem.themeImage}}
                  resizeMode="cover"
                  style={homeScreenStyles.view5Image}
                  imageStyle={homeScreenStyles.view5ImageElem}>
                  <View style={homeScreenStyles.view5View1}>
                    <TextUi variant="caption" sx={homeScreenStyles.view5Text}>
                      {elem.name}
                    </TextUi>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
