import React, {useRef} from "react";
import {TouchableWithoutFeedback} from "react-native";

interface IDoubleTapProps {
  delay?: number;
  onDoubleTap: () => void;
  children: JSX.Element;
}
export const DoubleTap: React.FC<IDoubleTapProps> = (props: IDoubleTapProps) => {
  const lastTap = useRef<number>(Date.now());

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && lastTap.current && now - lastTap.current < (props?.delay || 3000)) {
      props.onDoubleTap();
    } else {
      lastTap.current = now;
    }
  };

  return <TouchableWithoutFeedback onPress={handleDoubleTap}>{props.children}</TouchableWithoutFeedback>;
};
