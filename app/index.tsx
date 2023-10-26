import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Link, useRouter } from "expo-router";
import tailwind from "twrnc";

const Page = () => {
  const groups = useQuery(api.groups.get) || [];
  const router = useRouter();

  const renderChats = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/(chat)/${item._id}`)}
        style={tailwind`gap-3 mx-2 my-2 bg-slate-700 p-[8px] rounded-lg shadow-lg flex-row`}
      >
        <Image
          source={{ uri: item.icon_url }}
          style={tailwind`w-13 h-13 rounded-full`}
        />
        <View style={tailwind`gap-1`}>
          <Text style={tailwind`text-lg text-slate-100`}>{item.name}</Text>
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
    </View>
  );
};

export default Page;
