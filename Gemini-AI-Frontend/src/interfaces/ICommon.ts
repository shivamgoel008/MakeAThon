/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAxiosSuccess {
  data: any;
  message: string;
  statusCode: number;
}

export interface IAxiosError {
  data: {errorMessage: string; result: any};
  message: string;
  statusCode: number;
}

export interface INoTyppedValue<T = any> {
  [key: string]: T;
}

// export type IMediaType =
//   | "welcome_screen_1"
//   | "welcome_screen_2"
//   | "welcome_screen_3"
//   | "facebook_social_media"
//   | "google_social_media"
//   | "istagram_social_media"
//   | "iternity_placeinfo_1";
