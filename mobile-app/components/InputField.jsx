import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { React,useState } from 'react'

const InputField = ({title,value,handleChangeText,otherStyles,keyBoardType,placeHolder,...Props}) => {

  return (
    <View className = {`space-y-2 ${otherStyles}`}>

      <Text className="text-base text-gray-100 font-pmedium">
        {title}</Text>

        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
            <TextInput
                className="flex-1 font-psemibold text-white text-base"
                value={value}
                 placeholder={placeHolder}
                 placeholderTextColor="#7b7b8b"
                 onChangeText={handleChangeText}
                 
                 
            />

        </View>

    </View>
  )
}

export default InputField