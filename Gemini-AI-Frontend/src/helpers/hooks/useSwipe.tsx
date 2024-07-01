/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dimensions} from "react-native";
const windowWidth = Dimensions.get("window").width;

export function useSwipe(onSwipeLeft?: any, onSwipeRight?: any, rangeOffset = 4) {
  let firstTouch = 0;

  // set user touch start position
  function onTouchStart(ev: any) {
    firstTouch = ev.nativeEvent.pageX;
  }

  // when touch ends check for swipe directions
  function onTouchEnd(ev: any) {
    // get touch position and screen size
    const positionX = ev.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;

    // check if position is growing positively and has reached specified range
    if (positionX - firstTouch > range) {
      onSwipeRight && onSwipeRight();
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range) {
      onSwipeLeft && onSwipeLeft();
    }
  }

  return {onTouchStart, onTouchEnd};
}
