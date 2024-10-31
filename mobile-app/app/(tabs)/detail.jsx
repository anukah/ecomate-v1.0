import { View, Text, ScrollView, Alert,RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../contaxt/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from './../../components/CustomButton';
import Display from '../../components/Display';
import { addTestToDb } from '../../db/firebaseConfig';

const Detail = () => {
  const [data, setData] = useState(null);
  const { form } = useGlobalContext();
  const [popup, setPopup] = useState("");
  const [isConnected, setIsConnected] = useState(false); 
  const [refreshing, setRefreshing] = useState(false);
  const [display,setDisplay] = useState("Scan for Your Test Results")


  const ESP32_SERVER_URL = "http://192.168.1.65:3000"; 

  useEffect(() => {
    checkConnection();

    return () => {
      setIsConnected(false);
    };
  }, []);

  const checkConnection = () => {
    setPopup("Connecting to ESP32 device...");
    fetch(`${ESP32_SERVER_URL}/data`)
      .then(response => {
        if (response.ok) {
          setIsConnected(true);
          setPopup("Successfully connected to the ESP32 device");
        } else {
          setPopup("Failed to connect to ESP32 device");
        }
        setTimeout(() => setPopup(""), 3000);
      })
      .catch(error => {
        setPopup("Failed to connect to ESP32 device");
        setTimeout(() => setPopup(""), 3000);
        console.error("Error connecting to ESP32:", error);
      });
  };

  const scan = async () => {
    if (!isConnected) {
      Alert.alert("Device not connected", "Please ensure the ESP32 device is connected.");
      return;
    }
  
    // Immediately clear any previous data and set the display to "Scanning 0%"
    setData(null);
    setDisplay("Scanning 0%");
  
    let elapsed = 0;
    const scanDuration = 35000; // 35 seconds
    const intervalTime = 1000; // 1 second for updating the percentage
  
    // Start a timer to track the progress percentage
    const interval = setInterval(() => {
      elapsed += intervalTime;
      const progress = Math.min(Math.floor((elapsed / scanDuration) * 100), 100);
      setDisplay(`Scanning  ${progress}%`);
  
      if (elapsed >= scanDuration) {
        clearInterval(interval); // Stop updating once 35 seconds have passed
      }
    }, intervalTime);
  
    setTimeout(async () => {
      try {
        const response = await fetch(`${ESP32_SERVER_URL}/data`);
        const json = await response.json();
        const decodedValue = decode(json);
  
        if (json.temperature > 40) {
          Alert.alert("Overheated", "Device is Overheated");
        }
  
        setData({
          name: form.name,
          nic: form.nic,
          vehicleNumber: form.vehicleNumber,
          co: decodedValue.co,
          hc: decodedValue.hc,
          time: new Date(),
          result: decodedValue.result,
          additionalDetails: decodedValue.additionalDetails,
        });
  
        setDisplay("");
        setPopup("Data successfully retrieved");
        setTimeout(() => setPopup(""), 3000);
      } catch (error) {
        console.error("Error fetching data from ESP32:", error);
        Alert.alert("Error", "Failed to retrieve data.");
      }
  
      clearInterval(interval); // Clear the interval when scan is done
    }, scanDuration); // 35 seconds delay
  };
  
  

  const handleSave = async () => {
    try {
      if (data) {
        const newDocId = await addTestToDb(data);
        console.log("New test document ID:", newDocId);
        setPopup("Successfully saved");
        setTimeout(() => setPopup(""), 3000);
      } else {
        console.log("No data to save.");
        Alert.alert("No Data", "Please scan data before saving.");
      }
    } catch (error) {
      console.error("Error saving test data:", error);
      setPopup("Failed to save data.");
      setTimeout(() => setPopup(""), 3000);
    }
  };

  const decode = (json) => {
    const coLevel = parseFloat(json.co);
    const hcLevel = parseFloat(json.hc);

    const MIN_CO_LEVEL = 1.0;
    const MIN_HC_LEVEL = 2.0;

    let result = "Pass";
    let additionalDetails = "You should check regularly to maintain your vehicle condition.";

    if (coLevel > MIN_CO_LEVEL || hcLevel > MIN_HC_LEVEL) {
      result = "Fail";
      additionalDetails = `Failed due to high levels. CO: ${coLevel}, HC: ${hcLevel}. Ensure your vehicle is maintained properly.`;
    }

    return {
      co: coLevel.toFixed(2),
      hc: hcLevel.toFixed(2),
      result,
      additionalDetails
    };
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await checkConnection(); 
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="w-full justify-center items-center">
          <Text className="text-3xl text-secondary-200 font-semibold my-8 text-center">
            Hi {form.name}
          </Text>

          {data ? (
            <Display data={data} />
          ) : (
            <View className="justify-center items-center w-[90%] h-fit min-h-[450px] bg-white rounded-xl p-4">
              <Text className="text-[18px]">
                {display}
              </Text>
            </View>
          )}

          <View className="w-full flex-row mx-3 justify-between px-5 mt-10">
            <CustomButton
              title="Scan"
              containerStyle="w-[47%] min-h-[60px]"
              textStyles="text-xl"
              handlepress={scan}
            />

            <CustomButton
              title="Save"
              containerStyle="w-[47%] min-h-[60px]"
              textStyles="text-xl"
              handlepress={handleSave}
            />
          </View>
        </View>

        {popup && (
          <Text className="text-base text-secondary-200 mt-4 text-center">
            {popup}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;
