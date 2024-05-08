import React, { useState } from "react";
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
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { TaskType } from "../types/Task";
import { imageAssets } from "../assets/imageAssets";
import { RootStackParamList } from "../App";
import { renderTask } from "../components/Rendertask";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const handleViewTask = (task: TaskType) => {
    navigation.navigate("TaskView", { taskId: task.id });
  };

  const handleDeleteTask = async (task: TaskType) => {
    try {
      const jsonTasks = await AsyncStorage.getItem("taskData");
      if (jsonTasks) {
        let tasks: TaskType[] = JSON.parse(jsonTasks);
        tasks = tasks.filter((t) => t.id !== task.id);
        await AsyncStorage.setItem("taskData", JSON.stringify(tasks));
        setTasks(tasks);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchTasks = async () => {
        try {
          const jsonTasks = await AsyncStorage.getItem("taskData");
          if (jsonTasks) {
            const tasks: TaskType[] = JSON.parse(jsonTasks);
            setTasks(tasks);
          }
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      };
      fetchTasks();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={[styles.circle, styles.lightBlue]} />
        <View style={[styles.circle, styles.darkBlue]} />
      </View>
      {tasks.length > 0 ? (
        <SafeAreaView>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Your Tasks</Text>
          </View>
          <FlatList
            data={tasks}
            renderItem={(task) =>
              renderTask({ item: task.item, handleViewTask, handleDeleteTask })
            }
            keyExtractor={(item: TaskType) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.emptyContainer}>
          <Image style={styles.welcomeImage} source={imageAssets.welcome} />
          <Text style={styles.emptyText}>
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
      {tasks.length > 0 && (
        <TouchableOpacity
          style={styles.floatingButtonContianer}
          onPress={() => navigation.navigate("NewTask")}
        >
          <Icon name="pluscircle" size={60} color="#023d3b" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3ffff",
  },
  listContainer: {
    paddingTop: 8,
    backgroundColor: "#f3ffff",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  listHeader: {
    height: 60,
    marginTop: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listHeaderText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffff",
    textShadowColor: "#000",
    textShadowRadius: 5,
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
    width: 150,
    resizeMode: "contain",
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
  floatingButtonContianer: {
    position: "absolute",
    bottom: 30,
    right: 10,
  },
});
