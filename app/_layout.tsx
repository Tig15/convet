import { Link, Stack, useRouter } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayoutNav() {
  const router = useRouter();

  return (
    <ConvexProvider client={convex}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#F3F0CA" },
          headerTintColor: "#3876BF",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "My Chats",
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push("/(modal)/create")}>
                <Ionicons name="add-circle-outline" size={30} color="#3876BF" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/create"
          options={{
            headerTitle: "Start a Chat",
            presentation: "modal",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.push("/")}>
                <Ionicons
                  name="close-circle-outline"
                  size={30}
                  color="#3876BF"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(chat)/[chatid]"
          options={{
            headerTitle: "Your Chat",
          }}
        />
      </Stack>
    </ConvexProvider>
  );
}
