import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await AsyncStorage.getItem("user");
    if (!user) {
    } else {
      setName(user);
    }
  };

  const setUser = async () => {
    const r = (Math.random() + 1).toString(36).substring(7);
    const userName = `${name}#${r}`;
    await AsyncStorage.setItem("user", userName);
    setName(userName);
    router.replace("/home");
  };

  return (
    <View style={tailwind`flex-1 justify-center items-center gap-6`}>
      <View style={tailwind`flex justify-center items-center gap-2`}>
        <View style={tailwind`flex justify-center items-start w-[290px]`}>
          <Text style={tailwind`text-lg font-medium text-black`}>
            Username Required
          </Text>
          <Text style={tailwind`text-xs font-medium text-gray-600`}>
            Please Insert a name to Start a chatting
          </Text>
        </View>
        <View
          style={tailwind`mt-2 border border-[#706233] w-[290px] rounded-md pl-2 pt-1 pb-1`}
        >
          <TextInput onChangeText={setName} placeholderTextColor="#706233" />
        </View>
      </View>

      <TouchableOpacity
        style={tailwind`bg-[#E1C78F] w-[290px] p-1 border border-[#706233] rounded`}
        onPress={setUser}
      >
        <Text style={tailwind`text-sm text-center font-medium text-[#706233]`}>
          Set Name
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogPage;
