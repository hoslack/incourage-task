import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TaskType } from "../types/Task";
import { tasks } from "../utils/sampleData";
import { imageAssets } from "../assets/imageAssets";
import { RootStackParamList } from "../App";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const handleViewTask = (task: TaskType) => {
    navigation.navigate("TaskView", { taskId: task.id });
  };

  const renderTask = ({ item }: { item: TaskType }) => (
    <Animated.View entering={FadeInDown.delay(100)}>
      <View style={styles.taskContainer}>
        <View style={styles.taskDetails}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
          <Text style={styles.taskDueDate}>
            Due Date: {item.dueDate.toLocaleDateString()}
          </Text>
          <Text style={styles.taskCompletion}>
            {item.completed ? "Completed" : "Pending"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => handleViewTask(item)}
        >
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item: TaskType) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            source={imageAssets.welcome}
            style={{
              marginBottom: 24,
            }}
          />
          <Text style={styles.emptyText}>
            {/* Add image from assets */}
            No tasks available. Add some tasks to get started!
          </Text>
          <Button
            title="Go to Details"
            onPress={() => navigation.navigate("NewTask")}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    paddingTop: 8,
  },

  taskText: {
    fontSize: 16,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#777",
    textAlign: "center",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  taskDueDate: {
    fontSize: 14,
    color: "#777",
  },
  taskCompletion: {
    fontSize: 14,
    // color: item.completion ? "green" : "red",
  },
  viewButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#007BFF",
    borderRadius: 4,
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
