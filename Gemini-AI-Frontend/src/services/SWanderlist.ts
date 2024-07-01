import {IAxiosSuccess, IAxiosError} from "../interfaces/ICommon";
import {
  IAccomodationItem,
  ICreateWanderList,
  IEventItem,
  IGetAllResturantsByCityReq,
  // IGetAllWanderlistsByUser,
} from "../interfaces/IWanderList";
import {getAxios, postAxios} from "../helpers/utils/axiosInstance";

export const getSuggestedCitiesService = (): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/cities/get-all-cities");
};

// export const getWanderListItemService = (req: IGetWanderListByIdReq): Promise<IAxiosSuccess | IAxiosError> => {
//   return getAxios("wanderlist/get-wanderlist-by-id", {params: req});
// };

export const getAllResturatsByCityService = (req: IGetAllResturantsByCityReq): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios("/resturants/get-all-resturants-by-city", {params: req});
};

export const getAllEventsByCityService = (id: string): Promise<Array<IEventItem>> => {
  return getAxios(`/events/city/${id}`);
};

export const getAllAccomodationsByCityService = (id: string): Promise<Array<IAccomodationItem>> => {
  return getAxios(`/accomodations/city/${id}`);
};

export const getUserWanderlistService = (userId: string): Promise<IAxiosSuccess | IAxiosError> => {
  return getAxios(`/wanderlist/user/${userId}`);
};

export const createWanderListService = (req: ICreateWanderList) => {
  return postAxios("/wanderlist", req);
};
