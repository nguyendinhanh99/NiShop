import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../assest/color'

export default function Loading() {
  return (
    <View style = {{
      justifyContent: "center",
      alignItems: "center",
      flex:1
    }}>
      <ActivityIndicator size="large" color={colors.loading} />
    </View>
  )
}