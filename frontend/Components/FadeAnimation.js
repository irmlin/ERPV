import { useState, useEffect, useRef } from "react";
import { ImageBackground, Animated } from "react-native";

export default function FadeView (props) {
  // 0 - fade in animation, 1 - fade out
  const initialOpacity = props.type;
  const fadeAnimRef = useRef(new Animated.Value(initialOpacity));

  useEffect(() => {
    const toValue = props.type === 0 ? 1 : 0;
    console.log(toValue, fadeAnimRef.current);
    Animated.timing(fadeAnimRef.current, {
      toValue: toValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [props.control]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnimRef.current
      }}
    >
      {props.children}
    </Animated.View>
  );
};