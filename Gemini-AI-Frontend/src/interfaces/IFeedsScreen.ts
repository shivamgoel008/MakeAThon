import {IPostItem} from "./IPosts";

interface IFeedLiked {
  isLiked: boolean;
  numberOfLines: 2 | undefined;
}
export interface IFeedItem extends IPostItem, IFeedLiked {}
