import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link, useRouter } from "expo-router";
import tailwind from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalPage from "../components/Modal";

const Page = () => {
  const groups = useQuery(api.groups.get) || [];
  const router = useRouter();
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const performGreetingAction = useAction(api.greeting.getGreeting);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!name) return;
    const loadGreeting = async () => {
      const greeting = await performGreetingAction({ name });
      setGreeting(greeting);
    };
    loadGreeting();
  }, [name]);

  const handleLogOut = async () => {
    await AsyncStorage.clear();
    router.replace("/");
  };

  const renderChats = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/(chat)/${item._id}`)}
        style={tailwind`gap-3 mx-2 my-2 bg-[#706233] p-[8px] rounded-lg shadow-lg flex-row`}
      >
        <Image
          source={{ uri: item.icon_url }}
          style={tailwind`w-13 h-13 rounded-full`}
        />
        <View style={tailwind`gap-1`}>
          <Text style={tailwind`text-lg text-[#E1C78F]`}>{item.name}</Text>
          <Text style={tailwind`text-xs text-slate-300`}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tailwind`flex-1`}>
      <FlatList
        data={groups}
        renderItem={renderChats}
        keyExtractor={(item) => item._id.toString()}
      />

      <View style={tailwind`absolute bottom-20 left-8`}>
        <TouchableOpacity
          style={tailwind`w-9 h-9 rounded-full pl-[2px]  bg-[#F4BF96]`}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={34} color="#3876BF" />
        </TouchableOpacity>
      </View>
      <View style={tailwind`absolute bottom-20 right-8`}>
        <TouchableOpacity
          style={tailwind`w-9 h-9 rounded-full pl-[6px] pt-[4px]  bg-[#CE5A67]`}
          onPress={handleLogOut}
        >
          <Ionicons name="exit-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={tailwind`text-center m-5`}>{greeting}</Text>

      <ModalPage
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default Page;
