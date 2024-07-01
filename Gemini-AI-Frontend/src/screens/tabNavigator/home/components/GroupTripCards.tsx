import React from 'react';
import {ScrollView, View, TouchableOpacity, ImageBackground} from 'react-native';
import {TextUi} from '../../../../components/TextUI';
import {IThemeCardData} from '../../../../interfaces/IHomeScreen';
import {homeScreenStyles} from '../HomeScreenStyles';

interface IGroupTripCardsProps {
  cardData: Array<IThemeCardData>;
  onCardClick: (placeId: string) => void;
}

export const GroupTripCards: React.FC<IGroupTripCardsProps> = (props: IGroupTripCardsProps) => {
  return (
    <React.Fragment>
      <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={homeScreenStyles.view5}>
          {props.cardData?.map((elem: IThemeCardData, idx: number) => {
            return (
              <TouchableOpacity style={homeScreenStyles.view5Div1} key={idx} onPress={() => props.onCardClick(elem.placeId)}>
                <ImageBackground
                  source={{uri: elem.bannerImage}}
                  resizeMode="cover"
                  style={homeScreenStyles.view5Image}
                  imageStyle={homeScreenStyles.view5ImageElem}>
                  <View style={homeScreenStyles.view5View1}>
                    <TextUi variant="caption" sx={homeScreenStyles.view5Text}>
                      {elem.placeName}
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
