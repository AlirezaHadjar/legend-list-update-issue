import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { LegendList } from "@legendapp/list";

const fakeData = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  title: `Item ${index + 1}`,
}));

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const dataWithCount = fakeData.map((item, index) => ({
    ...item,
    score: index * count,
  }));
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 70 }}>
      <Text style={{ fontSize: 34, fontWeight: "bold" }}>
        Not working example
      </Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <LegendList
        data={dataWithCount}
        estimatedItemSize={116}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item, index }) => (
          <View
            style={{
              height: 100,
              backgroundColor: "#fefefe",
              justifyContent: "center",
              paddingHorizontal: 24,
              borderRadius: 16,
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {`${item.title} - Score:${index * item.score}`}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
