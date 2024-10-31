import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { useState } from 'react';
import {GlobalProvider, useGlobalContext} from './../contaxt/GlobalProvider'
import { Link, router } from 'expo-router';
import { createUser, getAllUser } from '../db/firebaseConfig';

export default function SignUp() {

  const {form,setForm}  = useGlobalContext()
  const [formValue,setFormValue] = useState({
    name:"",
    nic:"",
    vehicleNumber:""
  })

  const signUp = async () => {
    try {
      formValue.name = formValue.name.trim();
      formValue.nic = formValue.nic.trim();
      formValue.vehicleNumber = formValue.vehicleNumber.trim();
  
      if (!formValue.name || !formValue.vehicleNumber || !formValue.nic) {
        setErr("Please provide all the information");
        setTimeout(() => {
          setErr("");
        }, 3000);
        return;
      }
  
      const users = await getAllUser();
      const user = users.find(data => 
        data.vehicleNumber === formValue.vehicleNumber && data.nic === formValue.nic);
  
      if (!user) {
        const newUser = await createUser(formValue);
        setForm(formValue);
        router.push('detail');
      } else {
        setErr("User already exists");
        setTimeout(() => {
          setErr("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      setErr("Failed to sign up");
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };
  


  const [err,setErr] = useState("")

  return (
    <SafeAreaView className ="bg-primary h-full">
    <ScrollView>

      <View className="w-full justify-center items-center min-h-[85vh] px-4 my-6">

       
        <Text className="text-4xl text-white font-pbold mt-4">
          Emition Tester
        </Text>

        <InputField
          title= "Name"
          value = {formValue.name}
          handleChangeText = {(e)=>{setFormValue({...formValue,name:e})}}
          otherStyles = "mt-7"
        />

        <InputField
          title= "Vehicle Number"
          value = {formValue.vehicleNumber}
          handleChangeText = {(e)=>{setFormValue({...formValue,vehicleNumber:e})}}
          otherStyles = "mt-7"
        />

        <InputField
          title= "NIC"
          value = {formValue.nic}
          handleChangeText = {(e)=>{setFormValue({...formValue,nic:e})}}
          otherStyles = "mt-7"
        />

        {err && <Text className = "text-base text-red-500 mt-4">
          {err}
        </Text>}

        <CustomButton
          title = "Sign up"
          handlepress={signUp} 
          containerStyle='mt-8 w-full min-h-[60px]'
          textStyles="text-xl"
        />

        <View className="my-2">
          <Text className= "text-white text- text-[18px] mt-3">
            if you are already here?{"  "} <Link href='/' className="text-secondary-100 ">Sign in</Link>
          </Text>
        </View>

      </View>
      <StatusBar style='light' />

    </ScrollView>
  </SafeAreaView>
  );
}


