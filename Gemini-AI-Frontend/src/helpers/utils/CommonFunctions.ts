import AsyncStorage from "@react-native-async-storage/async-storage";
import {ZINGVEL_AUTH_DATA} from "../../constants/TextConstants";
import {IAxiosSuccess} from "../../interfaces/ICommon";
// import {Dimensions} from "react-native";

export const settingCookie = async (countryCode: number, phNumber: number, authToken: string): Promise<void> => {
  try {
    const authData = {
      countryCode,
      phNumber,
      authToken,
    };

    await AsyncStorage.setItem(ZINGVEL_AUTH_DATA, JSON.stringify(authData));
  } catch (err: unknown) {
    console.log(err);
  }
};

export const axiosResponseValidation = (res: IAxiosSuccess): boolean => {
  if (res.statusCode === 200 && res.message === "success") {
    return true;
  }
  return false;
};

// export const isObjEmpty = (objName: Object): boolean => {
//   if (objName && Object.keys(objName).length === 0 && objName.constructor === Object) {
//     return true;
//   }
//   return false;
// };

// export const getDimensions = (): {screenWidth: number; screenHeight: number} => {
//   const {width: screenWidth, height: screenHeight} = Dimensions.get("window");

//   return {screenWidth, screenHeight};
// };

export const validateMail = (value: string): boolean => {
  if (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }
  return false;
};

export const generateUserName = (): string => {
  const generateFirstStamp = (Math.random() * Date.now() * 2805).toString(36);
  const generateSecondStamp = (Math.random() * Date.now() * 9984).toString(25);

  const createRandomString = `${generateFirstStamp}SHIVA${generateSecondStamp}`;

  let uniqueId = "";
  for (let i = 10; i > 0; --i) {
    uniqueId += createRandomString[Math.floor(Math.random() * createRandomString.length)];
  }

  return uniqueId.substring(0, 4);
};
