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
          headerStyle: { backgroundColor: "#B0926A" },
          headerTintColor: "#FAE7C9",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Login",
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerTitle: "Convet",
          }}
        />
        <Stack.Screen
          name="(chat)/[chatid]"
          options={{
            headerTitle: "",
          }}
        />
      </Stack>
    </ConvexProvider>
  );
}
