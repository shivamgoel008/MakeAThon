/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {AxiosResponse, GenericAbortSignal} from "axios";
import {ZINGVEL_AUTH_DATA} from "../../constants/TextConstants";

const useLocalApi: boolean = true;

const instance = axios.create({
  baseURL: useLocalApi ? "http://localhost:3434/api" : "http://3.208.205.58:3434/api",
});

const getConfig = (doAuth: boolean, authToken: string | undefined) => {
  if (authToken && doAuth) {
    return {
      Authorization: `Bearer ${authToken}`,
    };
  }
  return {};
};

export const getAxios = async (
  url: string,
  config?: {
    doAuth?: boolean;
    abortReq?: GenericAbortSignal | undefined;
    params?: any;
  },
) => {
  let authToken: string | undefined;
  const auth: boolean = config?.doAuth ?? true;

  if (auth) {
    const authDataString = await AsyncStorage.getItem(ZINGVEL_AUTH_DATA);
    const authData = JSON.parse(authDataString || "");

    if (authData !== null) {
      // eslint-disable-next-line prefer-destructuring
      authToken = authData.authToken;
    }
  }

  const response: AxiosResponse = await instance.get(url, {
    headers: getConfig(auth, authToken),
    signal: config?.abortReq,
    params: config?.params,
  });
  if (response?.data) {
    return response.data;
  }
  return response;
};

export const postAxios = async (url: string, body = {}, auth: boolean = true, customHeader?: any) => {
  let authToken: string | undefined;
  if (auth) {
    const authDataString = await AsyncStorage.getItem(ZINGVEL_AUTH_DATA);
    const authData = JSON.parse(authDataString || "");

    if (authData !== null) {
      // eslint-disable-next-line prefer-destructuring
      authToken = authData.authToken;
    }
  }

  let headers = getConfig(auth, authToken);
  if (customHeader) {
    headers = {...headers, ...customHeader};
  }

  const response: AxiosResponse = await instance.post(url, body, {headers});
  if (response?.data) {
    return response.data;
  }
  return response;
};

export const patchAxios = async (url: string, body = {}, auth: boolean = true, customHeader?: any) => {
  let authToken: string | undefined;
  if (auth) {
    const authDataString = await AsyncStorage.getItem(ZINGVEL_AUTH_DATA);
    const authData = JSON.parse(authDataString || "");

    if (authData !== null) {
      // eslint-disable-next-line prefer-destructuring
      authToken = authData.authToken;
    }
  }

  let headers = getConfig(auth, authToken);
  if (customHeader) {
    headers = {...headers, ...customHeader};
  }

  const response: AxiosResponse = await instance.patch(url, body, {headers});
  if (response?.data) {
    return response.data;
  }
  return response;
};

export const deleteAxios = async (
  url: string,
  config?: {
    doAuth?: boolean;
    params?: any;
  },
) => {
  let authToken: string | undefined;
  const auth: boolean = config?.doAuth ?? true;

  if (auth) {
    const authDataString = await AsyncStorage.getItem(ZINGVEL_AUTH_DATA);
    const authData = JSON.parse(authDataString || "");

    if (authData !== null) {
      // eslint-disable-next-line prefer-destructuring
      authToken = authData.authToken;
    }
  }

  const response: AxiosResponse = await instance.delete(url, {
    headers: getConfig(auth, authToken),
    params: config?.params,
  });
  if (response?.data) {
    return response.data;
  }
  return response;
};
