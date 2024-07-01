import {View, ScrollView, Platform, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {ButtonUi} from "../../../components/ButtonUi";
import {TextUi} from "../../../components/TextUI";
import {useAppDispatch, useAppSelector} from "../../../redux/reduxHooks";
import {ReduxRootState} from "../../../redux/ReduxStore";
import {Asset, ImagePickerResponse, launchImageLibrary} from "react-native-image-picker";
import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../../../interfaces/ICommon";
import {axiosResponseValidation} from "../../../helpers/utils/CommonFunctions";
import {editUserService, getAvatarImagesService, uploadUserAvatarImage} from "../../../services/SUser";
import {IGetAvatarImagesRequest} from "../../../interfaces/IUser";
import {ImageUi} from "../../../components/ImageUi";
import {setUserAction} from "../../../redux/Actions/UserAction";
import {COLORS} from "../../../constants/ColorConstants";
import {verticalScale, moderateScale, horizontalScale} from "../../../helpers/utils/metrics";
import {AUTH_NAVIGATOR_SCREEN, EDIT_PROFILE_SCREEN} from "../../../constants/RouteConstants";
import Feather from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "react-native-gesture-handler";

interface IAvatarUploadScreenProps {
  navigation: INoTyppedValue;
}

type IAvatarItems =
  | "user_avatar_1"
  | "user_avatar_2"
  | "user_avatar_3"
  | "user_avatar_4"
  | "user_avatar_5"
  | "user_avatar_6"
  | "user_avatar_7"
  | "user_avatar_8";

interface IAvatarImageItem {
  id: string;
  mediaUrl: string;
  mediaType: IAvatarItems;
}

interface IFormData {
  avatarUrl: string;
  localPhoto: Asset | undefined;
}

export const AvatarUploadScreen: React.FC<IAvatarUploadScreenProps> = (
  props: IAvatarUploadScreenProps,
): JSX.Element => {
  const {registeredUser, isNewUser} = useAppSelector((state: ReduxRootState) => state.userReducer);
  const dispatch = useAppDispatch();

  const [avatarImages, setAvatarImages] = useState<Array<IAvatarImageItem>>(initialAvatarImages);
  const [formData, setFormData] = useState<IFormData>({
    avatarUrl: registeredUser.avatarImage || "",
    // avatarUrl: "",
    localPhoto: undefined,
  });

  // const [btnLoader, setBtnLoader] = useState<boolean>(false);

  const chooseAvatarImage = (item: IAvatarImageItem) => {
    const newFormData: IFormData = {...formData};
    newFormData.avatarUrl = item.mediaUrl;
    newFormData.localPhoto = undefined;

    setFormData(newFormData);
  };

  const handleChoosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else if (response) {
          const imageUri: Asset | undefined = response?.assets?.[0];
          const newFormData: IFormData = {...formData};
          newFormData.localPhoto = imageUri;
          console.log(imageUri);
          setFormData(newFormData);
        }
      },
    );
  };

  const validateForm = (): boolean => {
    return true;
  };

  // const openAI = (): void => {
  //   const fetch = require("node-fetch"); // For making HTTP requests

  //   const apiBase = "https://gpt-4-turbo-vision.openai.azure.com/";
  //   const apiKey = "3bd8e4e1a2db439e9a499d1690f6e232";
  //   const deploymentName = "gpt-4-vision-preview";

  //   const encodeImage = (imagePath: any) => {
  //     const fs = require("fs");
  //     const path = require("path");
  //     const mime = require("mime-types");

  //     const imageData = fs.readFileSync(imagePath);
  //     const base64Image = Buffer.from(imageData).toString("base64");
  //     return `data:${mime.lookup(imagePath)};base64,${base64Image}`;
  //   };

  //   const imageIngredientsAzure = async (imageBase64: string) => {
  //     const prompt =
  //       "You are a bot that is good at analyzing images. Provide a list of ingredients present in the image.";

  //     const response = await fetch(`${apiBase}openai/deployments/${deploymentName}/extensions`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${apiKey}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         model: deploymentName,
  //         messages: [
  //           {role: "system", content: "You are a helpful assistant."},
  //           {
  //             role: "user",
  //             content: [
  //               {type: "text", text: prompt},
  //               {type: "image_url", image_url: {url: `data:image/png;base64,${imageBase64}`}},
  //             ],
  //           },
  //         ],
  //         max_tokens: 2000,
  //       }),
  //     });

  //     const responseData = await response.json();
  //     return responseData.choices[0].message.content;
  //   };

  //   // Example usage:
  //   const imagePath = imageUri ; // Replace with the actual image path
  //   const encodedImage = encodeImage(imagePath);

  //   imageIngredientsAzure(encodedImage)
  //     .then(response => {
  //       console.log("Ingredients:", response);
  //     })
  //     .catch(error => {
  //       console.error("Error processing image:", error);
  //     });
  // };

  const handleSave = (): void => {
    if (validateForm()) {
      if (isNewUser) {
        props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: EDIT_PROFILE_SCREEN});
      } else {
        props.navigation.goBack();
      }
      const isLocalPhoto = Boolean(formData.localPhoto && formData.localPhoto.type && formData.localPhoto.uri);
      if (isLocalPhoto) {
      }
      const promiseToResolve = isLocalPhoto ? uploadUserAvatarImage : editUserService;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const reqBody: any = isLocalPhoto ? new FormData() : {};

      if (isLocalPhoto && formData.localPhoto && formData.localPhoto.type && formData.localPhoto.uri) {
        reqBody.append("id", registeredUser.id);
        reqBody.append("avatarImage", {
          name: formData.localPhoto.fileName,
          type: formData.localPhoto.type,
          uri: Platform.OS === "ios" ? formData.localPhoto.uri.replace("file://", "") : formData.localPhoto.uri,
        });
      } else {
        reqBody.id = registeredUser.id;
        reqBody.avatarImage = formData.avatarUrl;
      }
      promiseToResolve(reqBody)
        .then((res: IAxiosSuccess) => {
          if (axiosResponseValidation(res)) {
            dispatch(setUserAction(res.data));
            // if (isNewUser) {
            //   props.navigation.navigate(AUTH_NAVIGATOR_SCREEN, {screen: EDIT_PROFILE_SCREEN});
            // } else {
            //   props.navigation.goBack();
            // }
          }
        })
        .catch((err: IAxiosError) => {
          console.log(err);
        });
    }
  };

  const getAvatarImages = () => {
    const req: IGetAvatarImagesRequest = {
      mediaType:
        "user_avatar_1, user_avatar_2, user_avatar_3, user_avatar_4, user_avatar_5, user_avatar_6, user_avatar_7, user_avatar_8",
    };
    getAvatarImagesService(req)
      .then((res: IAxiosSuccess) => {
        if (axiosResponseValidation(res)) {
          setAvatarImages(res.data);
          if (!registeredUser.avatarImage) {
            const newFormData: IFormData = {...formData};
            newFormData.avatarUrl = res.data[0].mediaUrl;
            setFormData(newFormData);
          }
        }
      })
      .catch((err: IAxiosError) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getAvatarImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMainAvatarUrl = (): string => {
    if (formData.localPhoto && formData.localPhoto.uri) {
      return formData.localPhoto.uri;
    } else if (formData.avatarUrl) {
      return formData.avatarUrl;
    }
    return "";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.view1}>
        <View style={styles.view1Ch}>
          <TextUi variant="h3" sx={styles.view1ChText1}>
            Hi
          </TextUi>
          <TextUi variant="h3" sx={styles.view1ChText2}>
            {`${registeredUser?.firstName || "Zingler"} !`}
          </TextUi>
        </View>
        <TextUi variant="h3" sx={styles.view1Text1}>
          Please put your best picture
        </TextUi>
      </View>

      <View style={styles.view2}>
        <ImageUi url={getMainAvatarUrl()} containerSx={styles.view2Image} />
      </View>

      <View style={styles.view3}>
        <TextUi variant="h3" sx={styles.view3Text1}>
          Select a Funky Avatar
        </TextUi>
      </View>
      {avatarImages.length > 0 && (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.view4}>
          {avatarImages.map((elem: IAvatarImageItem, idx: number) => {
            return (
              <TouchableOpacity onPress={() => chooseAvatarImage(elem)} key={idx} style={styles.view4ImageWrapper}>
                <ImageUi url={elem.mediaUrl} containerSx={styles.view4Image} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <View style={styles.view5}>
        <View style={styles.view5Div1} />
        <View style={styles.view5Div2}>
          <TextUi variant="h5" sx={styles.view5Div2Text}>
            OR
          </TextUi>
        </View>
        <View style={styles.view5Div3} />
      </View>

      <View style={styles.view7}>
        <TouchableOpacity style={styles.view7Wrapper} onPress={() => handleChoosePhoto()}>
          <TextUi variant="h2" sx={styles.view7Text}>
            Upload your cool snap
          </TextUi>
          <Feather name="upload" size={20} style={styles.view7Image} />
        </TouchableOpacity>
      </View>

      <View style={styles.view8}>
        <ButtonUi
          variant="primary"
          disabled={!formData.localPhoto && !formData.avatarUrl}
          onPress={() => handleSave()}
          containerSx={styles.view8Button}>
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
    paddingHorizontal: verticalScale(30),
  },
  view1: {
    marginTop: verticalScale(30),
  },
  view1Ch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  view1ChText1: {
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(30),
    fontWeight: "400",
  },
  view1ChText2: {
    color: COLORS.CLR_PRIMARY,
    fontSize: moderateScale(30),
    marginLeft: horizontalScale(8),
  },
  view1Text1: {
    color: COLORS.CLR_TEXT,
    fontSize: moderateScale(15),
    marginTop: verticalScale(5),
    fontWeight: "400",
  },
  view2: {
    marginTop: verticalScale(30),
    alignItems: "center",
  },
  view2Image: {
    height: verticalScale(150),
    width: horizontalScale(150),
    borderRadius: 150,
  },
  view3: {
    marginTop: verticalScale(40),
  },
  view3Text1: {
    color: COLORS.CLR_TEXT,
    fontWeight: "600",
    fontFamily: "Lato",
    letterSpacing: 1.2,
    fontSize: 18,
  },
  view4: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },

  view4ImageWrapper: {
    marginHorizontal: moderateScale(8),
  },

  view4Image: {
    height: verticalScale(70),
    width: horizontalScale(70),
    borderRadius: moderateScale(70),
  },

  view5: {
    marginTop: verticalScale(-5),
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  view5Div1: {
    borderWidth: 1,
    borderColor: "#9C9C9C",
    width: "35%",
  },

  view5Div2: {
    width: "30%",
    alignItems: "center",
  },
  view5Div2Text: {
    color: COLORS.CLR_TEXT,
    fontFamily: "Roboto",
    fontSize: moderateScale(14),
    letterSpacing: 2,
  },
  view5Div3: {
    width: "35%",
    borderWidth: 1,
    borderColor: "#9C9C9C",
  },
  // view6: {
  //   marginTop: verticalScale(30),
  //   // backgroundColor: "red",
  // },
  // view6Text1: {
  //   color: COLORS.CLR_TEXT,
  //   fontSize: moderateScale(16),
  //   fontWeight: "500",
  // },
  view7: {
    flexGrow: 1,
    justifyContent: "center",
    // backgroundColor: "red",
  },
  view7Wrapper: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: COLORS.CLR_PLACEHOLDER,
    borderRadius: moderateScale(25),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.CLR_GRAY_3,
  },
  view7Text: {
    color: COLORS.CLR_SECONDRY,
    fontSize: 15,
  },
  view7Image: {
    color: COLORS.CLR_SECONDRY,
  },
  view8: {
    // flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: verticalScale(20),
  },
  view8Button: {},
});

const initialAvatarImages: Array<IAvatarImageItem> = [
  {id: "", mediaUrl: "", mediaType: "user_avatar_1"},
  {id: "", mediaUrl: "", mediaType: "user_avatar_2"},
  {id: "", mediaUrl: "", mediaType: "user_avatar_3"},
  {id: "", mediaUrl: "", mediaType: "user_avatar_4"},
  {id: "", mediaUrl: "", mediaType: "user_avatar_5"},
  {id: "", mediaUrl: "", mediaType: "user_avatar_6"},
  {id: "", mediaUrl: "", mediaType: "user_avatar_7"},
  {id: "", mediaUrl: "", mediaType: "user_avatar_8"},
];
