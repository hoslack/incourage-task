import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

import { TaskType } from "../types/Task";
import { RootStackParamList } from "../App";
// import { tasks } from "../utils/sampleData";

type TaskViewProps = NativeStackScreenProps<RootStackParamList, "TaskView">;

const TaskView: React.FC<TaskViewProps> = ({
  route: {
    params: { taskId },
  },
}) => {
  const navigation = useNavigation();
  const [editedTask, setEditedTask] = useState<TaskType>();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("taskData");
        if (jsonData) {
          const tasks: TaskType[] = JSON.parse(jsonData);
          const foundTask = tasks.find((task) => task.id === taskId);
          if (foundTask) {
            setTask(foundTask);
          }
        }
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleSave = async () => {
    if (task) {
      try {
        // Fetch existing tasks from AsyncStorage
        const jsonData = await AsyncStorage.getItem("taskData");
        let tasks: TaskType[] = [];
        if (jsonData) {
          tasks = JSON.parse(jsonData);
        }

        // Find the index of the task in the array and update it
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          tasks[taskIndex] = task;
        }

        // Store the updated tasks array back to AsyncStorage
        await AsyncStorage.setItem("taskData", JSON.stringify(tasks));
        console.log("Task updated and stored in AsyncStorage");
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to save task:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(task as TaskType);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle toggle edit mode
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle date picker change
  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTask({ ...task!, dueDate: selectedDate });
    }
  };

  // Render the component
  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Loading task...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={task.title}
          onChangeText={(text) => setTask({ ...task, title: text })}
        />
      ) : (
        <Text style={styles.text}>{task.title}</Text>
      )}

      <Text style={styles.label}>Description:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={task.description}
          onChangeText={(text) => setTask({ ...task, description: text })}
          multiline
        />
      ) : (
        <Text style={styles.text}>{task.description}</Text>
      )}

      <Text style={styles.label}>Due Date:</Text>
      {isEditing ? (
        <DateTimePicker
          value={task.dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      ) : (
        <Text style={styles.text}>
          {dayjs(task.dueDate).format("DD/MM/YYYY")}
        </Text>
      )}

      {isEditing ? (
        <>
          <Button title="Save" onPress={handleSave} />
          <Button
            title="Cancel"
            onPress={() => setIsEditing(false)}
            color="red"
          />
        </>
      ) : (
        <Button title="Edit" onPress={handleToggleEdit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default TaskView;
