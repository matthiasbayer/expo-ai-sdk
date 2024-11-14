import { View, Text, TextInput } from "react-native";

import { useChat } from "@ai-sdk/react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { fetch } from "expo/fetch";

export default function HomeScreen() {
  const { messages, input, setInput, handleSubmit } = useChat({
    api: "http://localhost:3000/api/chat",
    fetch,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ margin: 10 }}>
          <View>
            <TextInput
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSubmit}
              placeholder="Type a message..."
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
              }}
            />
          </View>
          <View>
            {messages.map((message) => (
              <View key={message.id}>
                <Text>{message.role === "user" ? "User: " : "AI: "}</Text>
                <Text>{message.content}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
