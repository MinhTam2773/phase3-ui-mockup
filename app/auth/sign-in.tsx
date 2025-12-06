import React, { useEffect } from 'react'
import { View } from 'react-native'
import SigninForm from './_components/SignInForm'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'

const SiginPage = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({data}) => {
    if(data.session?.user) {
      router.push('/');
    }
    })
  }, [])
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