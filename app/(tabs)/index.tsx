import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { LegendList, LegendListRenderItemProps } from "@legendapp/list";

const fakeData = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  title: `Item ${index + 1}`,
  score: 0,
}));

const Item = ({ item }: { item: { title: string; score: number } }) => {
  console.log("item", item);
  return (
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
        {`${item.title} - Score:${item.score}`}
      </Text>
    </View>
  );
};

export default function NotWorking() {
  const [count, setCount] = useState(0);
  const dataWithCount = fakeData.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        score: count,
      };
    }
    return item;
  });

  const renderItem = ({
    item,
  }: LegendListRenderItemProps<{
    title: string;
    score: number;
  }>) => <Item item={item} />;
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 70 }}>
      <Text style={{ fontSize: 34, fontWeight: "bold" }}>
        Not working example
      </Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <LegendList
        data={dataWithCount}
        estimatedItemSize={116}
        // Note: keyExtractor should be removed in order to see the list updates
        // but removing it causes a flicker when update happens
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={renderItem}
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
