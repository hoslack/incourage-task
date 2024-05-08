import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { TaskType } from "../types/Task";
import { RootStackParamList } from "../App";
import { tasks } from "../utils/sampleData";

type TaskViewProps = NativeStackScreenProps<RootStackParamList, "TaskView">;

const TaskView: React.FC<TaskViewProps> = ({
  route: {
    params: { taskId },
  },
}) => {
  const task: TaskType = tasks.find((task) => task.id === taskId) || tasks[0];
  const navigation = useNavigation();
  const [editedTask, setEditedTask] = useState<TaskType>({ ...task });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  const handleToggleCompletion = () => {
    setEditedTask({ ...editedTask, completed: !editedTask.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedTask.title}
          onChangeText={(text) => setEditedTask({ ...editedTask, title: text })}
        />
      ) : (
        <Text style={styles.text}>{task.title}</Text>
      )}

      <Text style={styles.label}>Description:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedTask.description}
          multiline
          onChangeText={(text) =>
            setEditedTask({ ...editedTask, description: text })
          }
        />
      ) : (
        <Text style={styles.text}>{task.description}</Text>
      )}

      <Text style={styles.label}>Due Date:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editedTask.dueDate.toISOString().split("T")[0]} // Format date as YYYY-MM-DD
          onChangeText={(text) => {
            const date = new Date(text);
            if (!isNaN(date.getTime())) {
              setEditedTask({ ...editedTask, dueDate: date });
            }
          }}
        />
      ) : (
        <Text style={styles.text}>
          {editedTask.dueDate.toLocaleDateString()}
        </Text>
      )}

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Completed:</Text>
        <Switch
          value={editedTask.completed}
          onValueChange={handleToggleCompletion}
          disabled={!isEditing}
        />
      </View>

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={handleCancel} color="red" />
          </>
        ) : (
          <Button title="Edit" onPress={handleEdit} />
        )}
      </View>
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
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TaskView;
