import { Image, StyleSheet, Platform, View, Text, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { LegendList, LegendListRenderItemProps } from "@legendapp/list";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

const fakeData = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  title: `Item ${index + 1}`,
  score: 0,
}));

const ListItem = ({
  item,
  animatedScores,
}: {
  item: { id: number; title: string; score: number };
  index: number;
  animatedScores: SharedValue<{ id: number; score: number }[]>;
}) => {
  const score = useDerivedValue(() => {
    return animatedScores.value.find((score) => score.id === item.id)?.score;
  });
  const animatedText = useDerivedValue(() => {
    return `${item.title} - Score:${score.value}`;
  });
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
      <ReText
        style={{ fontSize: 24, fontWeight: "bold" }}
        text={animatedText}
      />
    </View>
  );
};

export default function Workaround() {
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

  const animatedScores = useDerivedValue(() => {
    return dataWithCount.map((item) => ({ id: item.id, score: item.score }));
  });

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 70 }}>
      <Text style={{ fontSize: 34, fontWeight: "bold" }}>
        Workaround example
      </Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <LegendList
        data={dataWithCount}
        estimatedItemSize={116}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item, index }) => (
          <ListItem animatedScores={animatedScores} item={item} index={index} />
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
