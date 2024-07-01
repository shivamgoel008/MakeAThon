import {IAxiosError, IAxiosSuccess, INoTyppedValue} from "../interfaces/ICommon";
import {IGetUserPostsReq, ILikeFeedReq} from "../interfaces/IPosts";
import {deleteAxios, getAxios, postAxios} from "../helpers/utils/axiosInstance";

// export const getUserFromTokenService = async (authToken: string) => {
//   const requestUser = {authToken};
//   const result = await getAxios("/users/get-user-from-token", {params: requestUser});
//   return result;
// };

// // export const loginUserService = (loginUserReq: ILoginUserReq): Promise<IAxiosSuccess | IAxiosError> => {
// //   return getAxios("/users/login-user", {params: loginUserReq});
// // };

// export const sendOtpService = (sendOtpReq: ISendOtpReq): Promise<IAxiosSuccess | IAxiosError> => {
//   return getAxios("/users/send-otp", {params: sendOtpReq, doAuth: false});
// };

export const getUserPostsService = (req: IGetUserPostsReq): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/post/get-all-posts-by-user", {params: req});
};

export const createUserPost = (req: INoTyppedValue): Promise<IAxiosSuccess | IAxiosError> => {
  return postAxios("/post/create-post", req);
};

export const likeFeedService = (req: ILikeFeedReq): Promise<IAxiosSuccess | IAxiosError> => {
  return postAxios("/post/like-post", req);
};

export const unLikeFeedService = (req: ILikeFeedReq): Promise<IAxiosSuccess | IAxiosError> => {
  return deleteAxios("/post/un-like-post", {params: req});
};

// export const editUserService = (editUserReq: IEditUserReq): Promise<IAxiosSuccess | IAxiosError> => {
//   return patchAxios("/users/update-user-profile", editUserReq);
// };
