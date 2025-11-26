import React from 'react'
import { View } from 'react-native'
import SigninForm from './_components/SignInForm'

const SiginPage = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#543cda'
    }}>
      <SigninForm />
    </View>
  )
}

export default SiginPage