import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import tailwind from "twrnc";

const ModalPage = ({ modalVisible, setModalVisible }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");

  const router = useRouter();
  const startGroup = useMutation(api.groups.create);

  const onCreateGroup = async () => {
    await startGroup({
      name,
      description: desc,
      icon_url: icon,
    });
    setModalVisible(false);
    router.back();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <KeyboardAvoidingView
        style={tailwind`flex-1 justify-center items-center bg-[#B0926A]`}
        behavior="padding"
      >
        <View style={tailwind`bg-white p-4 rounded shadow-lg w-90 h-[60%] bg-[#FAE7C9]`}>
          <View style={tailwind`mt-15 `}>
            <View style={tailwind` mb-3`}>
              <Text style={tailwind`text-base`}>Name:</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={tailwind`border rounded border-[#706233] bg-[#E1C78F] h-12 pl-3`}
              />
            </View>
            <View style={tailwind`mb-3`}>
              <Text style={tailwind`text-base`}>Description:</Text>
              <TextInput
                value={desc}
                onChangeText={setDesc}
                style={tailwind`border rounded border-[#706233] bg-[#E1C78F] h-12 pl-3`}
                placeholderTextColor="#706233"
              />
            </View>
            <View style={tailwind`mb-3`}>
              <Text style={tailwind`text-base`}>Icon:</Text>
              <TextInput
                value={icon}
                onChangeText={setIcon}
                style={tailwind`border rounded border-[#706233] bg-[#E1C78F] h-12 pl-3`}
              />
            </View>
            <TouchableOpacity
              style={tailwind`bg-orange-400 p-1 rounded mt-4`}
              onPress={onCreateGroup}
            >
              <Text style={tailwind`text-base text-center text-black`}>
                Create Your Group
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tailwind`bg-gray-300 p-1 rounded mt-4`}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={tailwind`text-base text-center`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalPage;
