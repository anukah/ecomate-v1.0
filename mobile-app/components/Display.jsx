import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../contaxt/GlobalProvider'

const Display = ({data ,history}) => {

    date = history? data.time.toDate() : data.time;

    const {form} = useGlobalContext()
    const day = date.getDate();       
    const month = date.getMonth() + 1;
    const year = date.getFullYear();  
    const formattedDate = `${day}/${month}/${year}`;
    
    const hours = date.getHours();       
    const minutes = date.getMinutes().toString().padStart(2, '0');   
    const seconds = date.getSeconds().toString().padStart(2, '0');   
    const formattedTime = `${hours}:${minutes}:${seconds}`;

  return (
    <View className = "items-center justify-center">

        <View className= {`${history?"w-[98%] p-2":"w-[95%] p-6"} min-w-[90%] h-fit min-h-[450px] bg-white rounded-xl `}>
          <Text className = "text-black-100 font-psemibold text-2xl my-5 text-center">
            Your Test Report
          </Text>
          
          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              Name
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {data.name}
            </Text>
          </View>
          
          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              NIC
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {data.nic}
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              Date
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {formattedDate} 
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              Time
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {formattedTime} 
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              Vehicle Number
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {data.vehicleNumber}
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              CO level
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {data.co} ppm
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              HC level
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {data.hc} ppm
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              Test Result
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {data.result}
            </Text>
          </View>

          <View className="flex-row mb-2">
            <Text className = "w-32 text-base ">
              Additional Details
            </Text>
            <Text>: {" "}</Text>
            <Text className = "flex-1 text-base">
               {data.additionalDetails}
            </Text>
          </View>
          
        </View>
      </View>
  )
}

export default Display