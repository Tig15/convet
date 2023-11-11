import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import tailwind from "twrnc";

const Page = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [icon, setIcon] = useState('')

  const router = useRouter()
  const startGroup = useMutation(api.groups.create)

  const onCreateGroup = async () => {
    await startGroup({
      name,
      description: desc,
      icon_url: icon
    })
    router.back()
  }

  return (
    <KeyboardAvoidingView style={tailwind`flex-1 my-4 mx-8 gap-6`}>
      <View style={tailwind`gap-1`}>
      <Text style={tailwind`text-base`} >Name:</Text>
      <TextInput value={name} onChangeText={setName} style={tailwind`border rounded border-gray-400 bg-gray-200 pl-2`} />
      </View>
      <View style={tailwind`gap-1`}>
      <Text style={tailwind`text-base`} >Description:</Text>
      <TextInput value={desc} onChangeText={setDesc} style={tailwind`border rounded border-gray-400 bg-gray-200 pl-2`} />
      </View>
      <View style={tailwind`gap-1`}>
      <Text style={tailwind`text-base`} >Icon:</Text>
      <TextInput value={icon} onChangeText={setIcon} style={tailwind`border rounded border-gray-400 bg-gray-200 pl-2`} />
      </View>
      <TouchableOpacity style={tailwind`gap-1 bg-orange-400 p-1 rounded border border-orange-800`} onPress={onCreateGroup}>
      <Text style={tailwind`text-base text-center text-white`} >Create Your Group</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Page;
