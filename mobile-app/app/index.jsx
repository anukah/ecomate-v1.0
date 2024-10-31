import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { useState, useEffect } from 'react';
import { useGlobalContext } from './../contaxt/GlobalProvider';
import { Link, router } from 'expo-router';
import { createUser, getAllUser } from '../db/firebaseConfig';

export default function SignIn() {
  const { form, setForm } = useGlobalContext();
  const [formValue, setFormValue] = useState({
    name: '',
    nic: '',
    vehicleNumber: '',
  });
  const [err, setErr] = useState('');

  useEffect(() => {
    if (form && form.name) {
      setErr(`${form.name} already logged in`);
      router.push('detail');
    }
  }, [form]);

  const signIn = async () => {
    if (form && form.name) {
      router.push('detail');
      return
    }
    try {
      const trimmedFormValue = {
        name: formValue.name.trim(),
        vehicleNumber: formValue.vehicleNumber.trim(),
        nic: formValue.nic.trim(),
      };

      if (!trimmedFormValue.name || !trimmedFormValue.vehicleNumber || !trimmedFormValue.nic) {
        setErr('Please provide all the information');
        setTimeout(() => setErr(''), 3000);
        return;
      }

      const users = await getAllUser();
      const user = users.find(
        (data) =>
          data.vehicleNumber === trimmedFormValue.vehicleNumber &&
          data.nic === trimmedFormValue.nic &&
          data.name === trimmedFormValue.name
      );

      if (user) {
        setForm(trimmedFormValue);
        router.push('detail');

        setFormValue({
          name: '',
          nic: '',
          vehicleNumber: '',
        });
      } else {
        setErr('Please provide correct information');
        setTimeout(() => setErr(''), 3000);
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      setErr('Failed to sign in');
      setTimeout(() => setErr(''), 3000);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[85vh] px-4 my-6">
          <Text className="text-4xl text-white font-pbold mt-4">Emition Tester</Text>

          <InputField
            title="Name"
            value={formValue.name}
            handleChangeText={(e) => setFormValue({ ...formValue, name: e })}
            otherStyles="mt-7"
          />

          <InputField
            title="Vehicle Number"
            value={formValue.vehicleNumber}
            handleChangeText={(e) => setFormValue({ ...formValue, vehicleNumber: e })}
            otherStyles="mt-7"
          />

          <InputField
            title="NIC"
            value={formValue.nic}
            handleChangeText={(e) => setFormValue({ ...formValue, nic: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlepress={signIn}
            containerStyle="mt-8 w-full min-h-[60px]"
            textStyles="text-xl"
          />

          {err && <Text className="text-base text-secondary-200 mt-4">{err}</Text>}

          <View className="my-2">
            <Text className="text-white text-[18px] mt-3">
              If you are new here?{' '}
              <Link href="/sign-up" className="text-secondary-100">
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}
