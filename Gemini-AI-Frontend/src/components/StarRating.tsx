import React from "react";
import {COLORS} from "../constants/ColorConstants";
import {View, StyleSheet} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface IProps {
  rating: number;
  starSize: number;
}

export const StarRating: React.FC<IProps> = (props: IProps): JSX.Element => {
  const fullIconNumber: number = Math.floor(props.rating || 0);
  const emptyIconNumber: number = 5 - Math.ceil(props.rating || 0);
  const halfIconNumber: number = props.rating - fullIconNumber > 0 ? 1 : 0;
  return (
    <View style={styles.imageRatingWrapper}>
      {fullIconNumber > 0 &&
        Array.from(Array(fullIconNumber).keys()).map((elem: number) => (
          <FontAwesome
            name="star"
            size={props.starSize}
            key={elem + Date.now()}
            style={styles.imageRatingIcon}
            color={COLORS.CLR_PRIMARY}
          />
        ))}
      {halfIconNumber > 0 &&
        Array.from(Array(halfIconNumber).keys()).map((elem: number) => (
          <FontAwesome
            name="star-half-o"
            size={props.starSize}
            key={elem + Date.now()}
            style={styles.imageRatingIcon}
            color={COLORS.CLR_PRIMARY}
          />
        ))}
      {emptyIconNumber > 0 &&
        Array.from(Array(emptyIconNumber).keys()).map((elem: number) => (
          <FontAwesome
            name="star-o"
            size={props.starSize}
            key={elem + Date.now()}
            style={styles.imageRatingIcon}
            color={COLORS.CLR_PRIMARY}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imageRatingWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  imageRatingIcon: {
    marginRight: 5,
  },
});
