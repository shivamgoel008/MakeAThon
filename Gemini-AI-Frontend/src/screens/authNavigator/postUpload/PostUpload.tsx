import {View, Image, ScrollView, Platform, StyleSheet} from "react-native";
import React, {useState} from "react";
import {Asset, ImagePickerResponse, launchImageLibrary} from "react-native-image-picker";
import EntypoIcons from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ButtonUi} from "../../../components/ButtonUi";
import {TextInputUi} from "../../../components/TextInputUi";
import {TextUi} from "../../../components/TextUI";
import {COLORS} from "../../../constants/ColorConstants";
import {ONLY_STRING_WITH_SPACE_REGEX} from "../../../constants/CommonConstants";
import {INoTyppedValue, IAxiosSuccess, IAxiosError} from "../../../interfaces/ICommon";
import {useAppSelector, useAppDispatch} from "../../../redux/reduxHooks";
import {ReduxRootState} from "../../../redux/ReduxStore";
import {axiosResponseValidation} from "../../../helpers/utils/CommonFunctions";
import {If} from "../../../helpers/utils/Conditionals";
import {createUserPost} from "../../../services/SPosts";
import {setUserPosts} from "../../../redux/Actions/PostsActions";
import {horizontalScale, moderateScale, verticalScale} from "../../../helpers/utils/metrics";
import {SelectCitySheet} from "../../../components/SelectCitySheet";
import {ICity} from "../../../interfaces/IWanderList";
import {TouchableOpacity} from "react-native-gesture-handler";

interface IPostUploadScreenProps {
  navigation: INoTyppedValue;
}

export interface IFormData {
  media: Array<Asset>;
  mediaError: string;
  city: ICity | undefined;
  cityError: string;
  description: string;
}

export const PostUploadScreen: React.FC<IPostUploadScreenProps> = (props: IPostUploadScreenProps): JSX.Element => {
  const {registeredUser} = useAppSelector((state: ReduxRootState) => state.userReducer);
  const {userPosts} = useAppSelector((state: ReduxRootState) => state.postReducer);

  const dispatch = useAppDispatch();

  const [selectedCitySheet, setSelectedCitySheet] = useState<boolean>(false);
  const [selectedPhoto, setSeleectedPhoto] = useState<Asset>();
  const [formData, setFormData] = useState<IFormData>({
    media: [],
    mediaError: "",
    city: undefined,
    cityError: "",
    description: "",
  });

  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response: ImagePickerResponse) => {
        if (response) {
          const imageUri: Asset | undefined = response?.assets?.[0];

          if (imageUri) {
            const newFromData: IFormData = {...formData};
            formData.media.push(imageUri);
            setFormData(newFromData);
            setSeleectedPhoto(imageUri);
          }
        }
      },
    );
  };

  const handleSelectCity = (city: ICity): void => {
    const newFormData: IFormData = {...formData};
    newFormData.city = city;
    setFormData(newFormData);
    setSelectedCitySheet(false);
  };

  const onDescriptionChange = (newText: string): void => {
    const newFormData: IFormData = {...formData};
    if (ONLY_STRING_WITH_SPACE_REGEX.test(newText)) {
      newFormData.description = newText;
    }
    setFormData(newFormData);
  };

  const handleDeleteMedia = () => {
    const newFormData = {...formData};

    const imageIndex: number = formData.media.findIndex((elem: Asset) => elem.uri === selectedPhoto?.uri);

    if (imageIndex > -1) {
      newFormData.media.splice(imageIndex, 1);
    }

    if (imageIndex === newFormData.media.length) {
      setSeleectedPhoto(newFormData.media[imageIndex - 1]);
    } else {
      setSeleectedPhoto(newFormData.media[imageIndex + 1]);
    }
  };

  const validateForm = (): boolean => {
    const newFormData: IFormData = {...formData};
    let isFormDirty: boolean = false;

    if (!formData.city) {
      newFormData.cityError = "Please Select City";
      isFormDirty = true;
    }
    if (formData.media.length < 0) {
      newFormData.mediaError = "Please select a memory";
      isFormDirty = true;
    }

    setFormData(newFormData);
    return isFormDirty;
  };

  const handleSubmit = (): void => {
    if (!validateForm()) {
      if (formData.media && formData.media.length > 0) {
        const reqBody: INoTyppedValue = new FormData();
        reqBody.append("userId", registeredUser.id);
        reqBody.append("cityId", formData.city?.id);
        reqBody.append("description", formData.description);

        formData.media.forEach((elem: Asset) => {
          if (elem && elem.uri) {
            reqBody.append("mediaFiles[]", {
              uri: Platform.OS === "ios" ? elem.uri.replace("file://", "") : elem.uri,
              type: elem.type,
              name: elem.fileName,
            });
          }
        });

        createUserPost(reqBody)
          .then((res: IAxiosSuccess) => {
            if (axiosResponseValidation(res)) {
              dispatch(setUserPosts([...userPosts, res.data]));
              props.navigation.goBack();
            }
          })
          .catch((err: IAxiosError) => {
            console.log(err);
          })
          .finally(() => {});
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Ionicons name="arrow-back" color={COLORS.CLR_TEXT} size={22} onPress={() => props.navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView} style={styles.scrollStyle}>
        {selectedCitySheet && (
          <SelectCitySheet
            openSheet={selectedCitySheet}
            handleSelect={(city: ICity) => handleSelectCity(city)}
            handleCancel={() => setSelectedCitySheet(false)}
          />
        )}
        <View style={styles.parentContainer}>
          <View style={styles.view2}>
            {selectedPhoto && (
              <>
                <If condition={formData.media.length > 0}>
                  <TouchableOpacity style={styles.view2Delete} onPress={() => handleDeleteMedia()}>
                    <Ionicons name="trash-bin-outline" color={COLORS.CLR_BLACK} size={15} />
                  </TouchableOpacity>
                </If>
                <Image source={{uri: selectedPhoto.uri}} style={styles.view2Image1} resizeMode="cover" />
              </>
            )}
          </View>
          <If condition={formData.media.length > 0}>
            <TextUi variant="h4" sx={styles.view2Add} onPress={() => handleChoosePhoto()}>
              + Add More
            </TextUi>
          </If>

          <If condition={formData.media.length === 0}>
            <TouchableOpacity style={styles.view3Div1} onPress={() => handleChoosePhoto()}>
              <EntypoIcons name="plus" color={COLORS.CLR_BLACK} size={30} />
            </TouchableOpacity>
          </If>

          <ScrollView style={styles.view3} horizontal={true} showsHorizontalScrollIndicator={false}>
            {formData.media.length > 0 &&
              formData.media.map((elem: Asset, idx: number) => (
                <TouchableOpacity style={styles.allImagesWrapper} key={idx} onPress={() => setSeleectedPhoto(elem)}>
                  <Image source={{uri: elem.uri}} style={styles.view3Image1} resizeMode="cover" />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <View style={styles.view4}>
          <TextInputUi
            label="Select City"
            value={formData.city ? `${formData.city?.city}, ${formData.city?.state}` : ""}
            sx={styles.view4Div}
            placeholder="Kasol"
            onChangeText={() => undefined}
            onPressIn={() => setSelectedCitySheet(true)}
          />
        </View>

        <View style={styles.view6}>
          <TextInputUi
            sx={styles.view6Div}
            label="Enter Description"
            value={formData.description}
            multiline={true}
            placeholder="Experiencing breathtaking vistas, cultures, and adventures, a wanderlust-fueled journey unfolds."
            onChangeText={(text: string) => onDescriptionChange(text)}
          />
        </View>
      </ScrollView>
      <View style={styles.view7}>
        <ButtonUi variant="primary" onPress={() => handleSubmit()} containerSx={styles.view7Button}>
          {"Add Post".toUpperCase()}
        </ButtonUi>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CLR_WHITE,
    paddingHorizontal: horizontalScale(15),
    flexGrow: 1,
  },
  topView: {
    paddingVertical: verticalScale(10),
  },
  scrollView: {},
  scrollStyle: {
    flex: 1,
  },
  view1: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(15),
  },
  view1Text: {
    color: COLORS.CLR_BLACK,
  },
  parentContainer: {
    flexGrow: 1,
  },
  view2: {
    position: "relative",
    // marginHorizontal: horizontalScale(55),
    backgroundColor: "#EDEDED",
    height: verticalScale(200),
    width: 200,
    // justifyContent: "center",
    // alignItems: "center",
    alignSelf: "center",
    borderRadius: moderateScale(20),
  },
  view2Delete: {
    position: "absolute",
    padding: 10,
    backgroundColor: COLORS.CLR_ERROR,
    top: 10,
    right: 10,
    zIndex: 999,
    borderRadius: moderateScale(30),
    borderWidth: horizontalScale(1),
    borderColor: COLORS.CLR_BLACK,
  },
  view2Add: {color: COLORS.CLR_BLACK, marginVertical: verticalScale(20), textAlign: "center", fontSize: 15},
  view2Image1: {
    height: "100%",
    width: "100%",
    zIndex: 998,
    // height: verticalScale(75),
    // width: horizontalScale(75),
    borderRadius: moderateScale(20),
    // backgroundColor: "red",
  },
  view3: {
    // marginHorizontal: horizontalScale(15),
    display: "flex",
    flexDirection: "row",
    marginBottom: 30,
    // backgroundColor: "red",
    // height: verticalScale(75),
    // width: horizontalScale(75),
  },
  view3Image1: {
    height: verticalScale(80),
    width: horizontalScale(80),
    marginRight: horizontalScale(15),
    borderRadius: moderateScale(10),
  },
  view3Div1: {
    marginVertical: verticalScale(15),
    // backgroundColor: "#ededed",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(20),
    // alignSelf: "center",
    // padding: 5,
    marginHorizontal: horizontalScale(10),
    // backgroundColor: "red",
    // ba,
  },
  allImagesWrapper: {},
  view4: {
    marginBottom: 10,
  },
  view4Div: {
    fontSize: 15,
    height: verticalScale(35),
    paddingVertical: verticalScale(10),
  },
  view6: {
    marginTop: verticalScale(10),
  },
  view6Div: {
    flexGrow: 1,
  },
  view7: {
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(5),
    alignItems: "flex-end",
    marginBottom: 20,
  },
  view7Button: {
    width: "100%",
  },
});
