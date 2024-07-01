import React from "react";
import {View, StyleSheet} from "react-native";
import {TextUi} from "../../../../components/TextUI";
import {COLORS} from "../../../../constants/ColorConstants";
import {horizontalScale} from "../../../../helpers/utils/metrics";

interface IProps {
  title: string;
  showSeeAll?: boolean;
  showAllClick?: () => void;
}

export const CardHeader: React.FC<IProps> = (props: IProps) => {
  return (
    <View style={styles.headerWrapper}>
      <TextUi variant="h3" sx={styles.title}>
        {props.title}
      </TextUi>

      {props.showSeeAll && props.showAllClick && (
        <TextUi
          variant="h4"
          sx={styles.seeAllText}
          onPress={() => (props.showAllClick ? props.showAllClick() : undefined)}>
          {`${"See All >>"}`}
        </TextUi>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: horizontalScale(15),
  },
  title: {
    fontFamily: "Lato",
    fontWeight: "600",
    fontSize: 18,
    letterSpacing: 1.2,
  },
  seeAllText: {
    fontWeight: "400",
    fontSize: 12,
    letterSpacing: 1.2,
    color: COLORS.CLR_GRAY_1,
  },
});
