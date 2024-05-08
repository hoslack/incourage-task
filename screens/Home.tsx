import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
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
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => handleViewTask(item)}
      >
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
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={[styles.circle, styles.lightBlue]} />
        <View style={[styles.circle, styles.darkBlue]} />
      </View>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item: TaskType) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.welcomeImageContainer}>
            <Image
              resizeMethod="scale"
              style={styles.welcomeImage}
              source={imageAssets.welcome}
            />
          </View>
          <Text style={styles.emptyText}>
            {/* Add image from assets */}
            No tasks available. Add some tasks to get started!
          </Text>
          <Pressable
            style={styles.addButton}
            onPress={() => navigation.navigate("NewTask")}
          >
            <Text style={styles.addButtonText}>Create a Task</Text>
          </Pressable>
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 150,
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
  },
  viewButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    shadowColor: "#000",
  },
  viewButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#50C2C9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 50,
    borderRadius: 10,
    top: "40%",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },
  welcomeImage: {
    width: 200,
    height: 150,
  },
  welcomeImageContainer: {
    width: 250,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    transform: [{ rotate: "-45deg" }],
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 70,
    position: "absolute",
    top: -80,
  },
  lightBlue: {
    backgroundColor: "#50C2C9",
    left: 0,
  },
  darkBlue: {
    backgroundColor: "#8FE1D7",
    opacity: 0.5,
    left: 100,
  },
  lighterBlue: {
    backgroundColor: "lightcyan",
  },
});
