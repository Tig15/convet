import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ListRenderItem,
  FlatList,
  Keyboard,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import tailwind from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";

const Page = () => {
  const { chatid } = useLocalSearchParams();
  const [user, setUser] = useState<string | null>(null);
  const [newMessages, setNewMessages] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const convex = useConvex();
  const navigation = useNavigation();
  const addMessages = useMutation(api.messages.sendMessages);
  const messages =
    useQuery(api.messages.get, { chatId: chatid as Id<"groups"> }) || [];
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadGroup = async () => {
      const groupInfo = await convex.query(api.groups.getGroups, {
        id: chatid as Id<"groups">,
      });
      navigation.setOptions({ headerTitle: groupInfo?.name });
    };
    loadGroup();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const user = await AsyncStorage.getItem("user");
      setUser(user);
    };
    loadUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 300);
  }, [messages]);

  const handleSendMessages = async () => {
    Keyboard.dismiss();
    if (selectedImage) {
      setUploading(true);
      const url = `${
        process.env.EXPO_PUBLIC_CONVEX_SITE
      }/sendImage?user=${encodeURIComponent(
        user!
      )}&group_id=${chatid}&content=${encodeURIComponent(newMessages)}}`;

      const response = await fetch(selectedImage);
      const blob = await response.blob();

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": blob.type! },
        body: blob,
      })
        .then(() => {
          setSelectedImage(null);
          setNewMessages("");
        })
        .catch((err) => console.log(err))
        .finally(() => setUploading(false));
    } else {
      addMessages({
        group_id: chatid as Id<"groups">,
        content: newMessages,
        user: user || "Anony",
      });
    }
    setNewMessages("");
  };

  const renderMessages: ListRenderItem<Doc<"messages">> = ({ item }) => {
    const isUserMessage = item.user === user;

    return (
      <View
        style={[
          tailwind`p-2 rounded-lg mt-3 mx-3 max-w-[80%]`,
          isUserMessage
            ? tailwind`bg-orange-800 self-end`
            : tailwind`bg-red-300 self-start`,
        ]}
      >
        {item.content !== "" ? (
          <Text
            style={isUserMessage ? tailwind`text-white` : tailwind`text-black`}
          >
            {item.content}
          </Text>
        ) : null}
        {item.file && (
          <Image
            source={{ uri: item.file }}
            style={{ width: 50, height: 50, margin: 10 }}
          />
        )}
        <View style={tailwind`mt-1`}>
          <Text style={tailwind`text-[10px] text-red-200`}>
            {new Date(item._creationTime).toLocaleTimeString()} - {item.user}
          </Text>
        </View>
      </View>
    );
  };

  const captureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
    }
  };

  return (
    <SafeAreaView style={tailwind`flex-1 bg-slate-200`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tailwind`flex-1 bg-slate-300`}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ListFooterComponent={<View style={{ padding: 5 }} />}
          ref={listRef}
          data={messages}
          renderItem={renderMessages}
          keyExtractor={(item) => item._id.toString()}
        />

        <View style={tailwind`shadow-lg p-3 bg-slate-200 items-center `}>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 200, height: 200, margin: 10 }}
            />
          )}
          <View style={tailwind`flex-row`}>
            <TextInput
              style={tailwind`flex-1 border border-gray-300 rounded px-2 bg-white min-h-12 `}
              value={newMessages}
              onChangeText={setNewMessages}
              placeholder="Text your message"
              multiline={true}
            />

            <TouchableOpacity
              style={tailwind`bg-orange-300 rounded p-[14px]  ml-2 self-end `}
              onPress={captureImage}
            >
              <Ionicons
                name="add"
                style={tailwind`text-white text-[19px] text-center font-bold`}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={tailwind`bg-orange-300 rounded p-[14px]  ml-2 self-end `}
              onPress={handleSendMessages}
              disabled={newMessages == ""}
            >
              <Ionicons
                name="send-outline"
                style={tailwind`text-white text-[19px] text-center font-bold`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {uploading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            tailwind`bg-white items-center justify-center`,
          ]}
        >
          <Spinner
            visible={uploading}
            textContent={"Loading..."}
            textStyle={tailwind`text-white`}
            color="#333"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Page;
