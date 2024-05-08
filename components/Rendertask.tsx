import Animated, { FadeInDown } from "react-native-reanimated";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/AntDesign";

import { TaskType } from "../types/Task";

export const renderTask = ({
  item,
  handleViewTask,
  handleDeleteTask,
}: {
  item: TaskType;
  handleViewTask: (task: TaskType) => void;
  handleDeleteTask: (task: TaskType) => void;
}) => (
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
            Due: {dayjs(item.dueDate).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.taskCompletion}>{item.status}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDeleteTask(item)}>
          <Icon name="delete" size={32} color="#FF6666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Animated.View>
);

const styles = StyleSheet.create({
  taskText: {
    fontSize: 16,
    flex: 1,
  },

  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
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
    backgroundColor: "#BFEBE5",
    borderRadius: 8,
    marginVertical: 10,
    shadowOffset: { width: -2, height: 1 },
    shadowColor: "#000",
    elevation: 5,
  },
});
