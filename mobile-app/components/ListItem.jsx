import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from './CustomButton';
import Display from './Display';

const ListItem = ({data}) => {

    const date = data.time.toDate()
    const day = date.getDate();       
    const month = date.getMonth() + 1;
    const year = date.getFullYear();  
    const formattedDate = `${day}/${month}/${year}`;

    const hours = date.getHours();       
    const minutes = date.getMinutes().toString().padStart(2, '0');   
    const seconds = date.getSeconds().toString().padStart(2, '0');   
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const [seeMore,setSeeMore] = useState(false)

  return (
         <>
            {!seeMore ? (
            <View className = "bg-white p-4 m-3 flex-row justify-between rounded-2xl">

            <View>
                <Text>{data.name}</Text>
                <Text>{data.vehicleNumber}</Text>
                <Text>{formattedDate} at {formattedTime}</Text>
            </View>
            <CustomButton
                title= "See More"
                containerStyle="w-fit px-2 max-h-[50px]"
                textStyles="text-base"
                handlepress={()=>setSeeMore(!seeMore)}
            /> 
    </View>
        ) : (
            <View className = "bg-white p-4 m-3 rounded-xl ">
                <Display data={data} history={true} />
                <View className = "justify-center items-center">
                <CustomButton
                    title= "See Less"
                    containerStyle="w-[100px] px-2 min-h-[50px]"
                    textStyles="text-base"
                    handlepress={()=>setSeeMore(!seeMore)}
                />
                </View>
            </View> 
        )}
         </>
        
  )
}

export default ListItem

