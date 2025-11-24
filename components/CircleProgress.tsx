import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CircleProgress = ({
  size = 120,
  strokeWidth = 12,
  percentage = 75,
  color = "#4caf50",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={{position: 'relative', width: size}}>
      <Svg width={size} height={size}>
        {/* Background ring */}
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.centerContent}>
        <Text
        style={styles.percentageText}
      >
        {percentage}%
      </Text>
      <Text style={{color:'gray'}}>
        {percentage >= 80 
        ? 'Excellent!'
        : percentage >= 60
            ? 'Good work'
            : percentage >= 40 
                ? 'Medium'
                : 'Try hard!'
        }
      </Text>
      </View>
      
    </View>
  );
};

export default CircleProgress;

const styles = StyleSheet.create({
  percentageText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  centerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  }
});
