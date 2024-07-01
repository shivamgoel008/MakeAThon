import {IAxiosSuccess, IAxiosError} from "../interfaces/ICommon";
import {getAxios} from "../helpers/utils/axiosInstance";

export const getAllFeedsService = (): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/post/get-posts-in-feeds");
};
