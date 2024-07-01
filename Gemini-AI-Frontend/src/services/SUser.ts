import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../interfaces/ICommon";
import {
  IEditUserReq,
  IGetAvatarImagesRequest,
  ISendOtpReq,
  IValidateOtpReq,
  IGetUserByIdReq,
} from "../interfaces/IUser";
import {getAxios, patchAxios, postAxios} from "../helpers/utils/axiosInstance";

export const getUserFromTokenService = async (authToken: string) => {
  const requestUser = {authToken};
  const result = await getAxios("/users/get-user-from-token", {params: requestUser});
  return result;
};

export const sendOtpService = (sendOtpReq: ISendOtpReq): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/users/send-otp", {params: sendOtpReq, doAuth: false});
};

export const validateOtpService = (validateOtpReq: IValidateOtpReq): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/users/validate-otp", {params: validateOtpReq, doAuth: false});
};

export const editUserService = (editUserReq: IEditUserReq): Promise<IAxiosSuccess | IAxiosError> => {
  return postAxios("/users/update-user-profile", editUserReq);
};

export const getUserById = (req: IGetUserByIdReq): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/users/get-user-by-id", {params: req});
};

export const getAvatarImagesService = (req: IGetAvatarImagesRequest): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/app-media/get-media", {params: req});
};

export const uploadUserAvatarImage = (editUserReq: INoTyppedValue): Promise<IAxiosSuccess | IAxiosError> => {
  return patchAxios("/users/upload-avatar-image", editUserReq);
};

export const getFollowersByUserService = (userId: string): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/followers/all-followers-by-user-id", {params: {userId}});
};
