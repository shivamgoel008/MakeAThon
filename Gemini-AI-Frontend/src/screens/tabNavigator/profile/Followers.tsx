import {ActivityIndicator, View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {TextUi} from "../../../components/TextUI";
import {ScrollView, TouchableOpacity} from "react-native-gesture-handler";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import {COLORS} from "../../../constants/ColorConstants";
import {TextInputUi} from "../../../components/TextInputUi";
import {IFollowerItem} from "../../../interfaces/IUser";
import {horizontalScale, verticalScale, moderateScale} from "../../../helpers/utils/metrics";
import {useRoute} from "@react-navigation/native";
import {getFollowersByUserService} from "../../../services/SUser";
import {axiosResponseValidation} from "../../../helpers/utils/CommonFunctions";
import {ImageUi} from "../../../components/ImageUi";

interface IFollowersProps {
  navigation: INoTyppedValue;
}

export const FollowersScreen: React.FC<IFollowersProps> = (props: IFollowersProps): JSX.Element => {
  const [followersList, setFollowersList] = useState<Array<IFollowerItem>>([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [pageLoader, setPageLoader] = useState<boolean>(false);

  // const initialCityList = useRef<Array<ICity> | null>(null);

  const route = useRoute();

  const params = route.params as INoTyppedValue;
  const userId: string = params.userId as string;

  const getFollowersByUser = (): void => {
    setPageLoader(true);
    getFollowersByUserService(userId)
      .then((res: IAxiosSuccess) => {
        console.log(res);
        if (axiosResponseValidation(res)) {
          setFollowersList(res.data.items);
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
      })
      .finally(() => {
        setPageLoader(false);
      });
  };

  const onFollowerSearch = (newText: string): void => {
    //   const newFormData: IFormData = {...formData};
    //   newFormData.citySearch = newText;
    //   newFormData.selectedCity = undefined;
    //   newFormData.selectedCityErr = "";
    //   setFormData(newFormData);
  };

  // const onFollowerSearch = (): void => {
  //   const newFormData: IFormData = {...formData};
  //   newFormData.selectedCity = undefined;
  //   setFormData(newFormData);
  // };

  useEffect(() => {
    if (userId) {
      getFollowersByUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.viewTop}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          color={COLORS.CLR_TEXT}
          style={styles.icon}
          size={28}
          onPress={() => props.navigation.goBack()}
        />
        <TextInputUi
          label="Followers"
          // sx={{flexGrow: 1, alignItems: "center", flex: 1}}
          placeholder="Search Followers"
          onChangeText={(text: string) => onFollowerSearch(text)}
          value={searchItem}
          // onPressIn={() => onCitySearchPress()}
          // errorMessage={formData.selectedCityErr}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {pageLoader ? (
          <View style={styles.dataLoaderView}>
            <ActivityIndicator size="large" color={COLORS.CLR_TEXT} />
          </View>
        ) : (
          <>
            {followersList && followersList.length > 0 ? (
              followersList.map((elem: IFollowerItem, idx: number) => {
                return (
                  <View style={styles.listItem} key={idx}>
                    <ImageUi url={elem.user.avatarImage || ""} containerSx={styles.userImage} />
                    <View style={styles.userDescView}>
                      <TextUi variant="h5" sx={styles.userNameText}>
                        {elem?.user?.userName || ""}
                      </TextUi>
                      <TextUi variant="h5" sx={styles.userDescText}>
                        {elem?.user?.firstName || ""}
                      </TextUi>
                    </View>
                    <TouchableOpacity>
                      <View style={styles.btnView}>
                        <TextUi variant="h5" sx={styles.btnText}>
                          {elem?.user?.userName || ""}
                        </TextUi>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <View>
                <TextUi variant="h2">No Follower present</TextUi>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTop: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
  },
  header: {
    // flex:1,
    paddingHorizontal: horizontalScale(10),
    // marginVertical: verticalScale(20),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: COLORS.CLR_WHITE,
    // backgroundColor:'red'
  },
  icon: {
    marginTop: verticalScale(10),
    marginRight: 15,
  },

  container: {
    flexGrow: 1,
    backgroundColor: COLORS.CLR_WHITE,
  },
  dataLoaderView: {
    // backgroundColor: "red",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
  },

  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
  userDescView: {},
  userNameText: {},
  userDescText: {},
  btnView: {},
  btnText: {},

  view1: {
    marginTop: verticalScale(25),
    // marginHorizontal: horizontalScale(30),
  },
  view2: {
    marginTop: verticalScale(5),
    display: "flex",
    flexDirection: "row",
  },
  view2Div: {
    height: verticalScale(30),
    width: horizontalScale(30),
    borderRadius: moderateScale(3),
    backgroundColor: COLORS.CLR_GRAY_3,
    padding: 10,
    alignSelf: "center",
    marginRight: horizontalScale(10),
  },
  view2Div2: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // paddingRight: horizontalScale(40),
  },
  view1Text: {
    color: COLORS.CLR_BLACK,
  },
  view1Text2: {
    color: COLORS.CLR_BLACK,
    fontSize: 12,
  },
  view2Text: {
    color: "gray",
    fontSize: 12,
  },
  view3: {
    borderWidth: 1,
    borderColor: "orange",
    // marginLeft: horizontalScale(60),
    display: "flex",
    flexDirection: "row",
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(5),
  },
  view3Icon: {
    // color: CLR_BLACK,
  },
  view4: {
    // width: '80%',
    borderColor: "#CCCCCC",
    height: 0,
    borderWidth: 0.6,
    marginTop: verticalScale(10),
  },
});
