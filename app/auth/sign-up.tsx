import SigninForm from "@/app/auth/_components/SignUpForm";
import React from "react";
import { View } from "react-native";

const SigupPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#543cda'
      }}
    >
      <SigninForm />
    </View>
  );
};

export default SigupPage;
