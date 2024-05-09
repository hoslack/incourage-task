import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller, SubmitHandler, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { TaskType } from "../types/Task";
import { Status } from "../enums/TaskStatus";
import { RootStackParamList } from "../App";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.date().required("Due date is required"),
  status: yup.string().required("Status is required"),
});

interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date;
  status: string;
}

type TaskViewProps = NativeStackScreenProps<RootStackParamList, "TaskView">;

const TaskView: React.FC<TaskViewProps> = ({
  route: {
    params: { taskId },
  },
  navigation,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [task, setTask] = useState<TaskType | null>(null);
  const [editMode, setEditMode] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
  });

  useFocusEffect(
    React.useCallback(() => {
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
          ToastAndroid.showWithGravity(
            "Failed to fetch task",
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        }
      };
      fetchTask();
    }, [taskId])
  );

  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task]);

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    const id = task?.id as string;

    try {
      const jsonTasks = await AsyncStorage.getItem("taskData");
      let tasks: TaskType[] = [];
      if (jsonTasks) {
        tasks = JSON.parse(jsonTasks);
        const taskIndex = tasks.findIndex((tsk) => tsk.id === id);
        if (taskIndex !== -1) {
          tasks[taskIndex] = { ...data, id };
        } else {
          ToastAndroid.showWithGravity(
            "Task not found",
            ToastAndroid.SHORT,
            ToastAndroid.TOP
          );
        }
      } else {
        ToastAndroid.showWithGravity(
          "Task not found",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      }
      const jsonData = JSON.stringify(tasks);
      await AsyncStorage.setItem("taskData", jsonData);
      setEditMode(false);
      ToastAndroid.showWithGravity(
        "Task updated successfully",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Failed to update task",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }
  };

  const handleDateChange = (_: any, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      setShowPicker(false);
      setValue("dueDate", selectedDate);
    }
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Task not found</Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={[styles.circle, styles.lightBlue]} />
        <View style={[styles.circle, styles.darkBlue]} />
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>View Task</Text>
      </View>
      <View style={styles.formView}>
        <Text style={styles.label}>Title:</Text>
        <Controller
          control={control}
          name="title"
          render={({ field }) =>
            editMode ? (
              <TextInput
                style={styles.input}
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Enter task title"
              />
            ) : (
              <Text style={styles.displayText}>{field.value}</Text>
            )
          }
        />
        {errors.title && (
          <Text style={styles.errorText}>{errors.title.message}</Text>
        )}

        <Text style={styles.label}>Description:</Text>
        <Controller
          control={control}
          name="description"
          render={({ field }) =>
            editMode ? (
              <TextInput
                style={styles.input}
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Enter task description"
                multiline
                editable={editMode ? true : false}
              />
            ) : (
              <Text style={styles.displayText}>{field.value}</Text>
            )
          }
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}

        <Text style={styles.label}>Due Date:</Text>
        <Controller
          control={control}
          name="dueDate"
          render={({ field }) =>
            editMode ? (
              <>
                {showPicker && (
                  <DateTimePicker
                    value={new Date(field.value)}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
                <TouchableOpacity
                  onPress={() => setShowPicker(true)}
                  disabled={editMode ? false : true}
                  style={styles.date}
                >
                  <Text>{dayjs(field.value).format("DD/MM/YYYY")}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.displayText}>
                {dayjs(field.value).format("DD/MM/YYYY")}
              </Text>
            )
          }
        />
        {errors.dueDate && (
          <Text style={styles.errorText}>{errors.dueDate.message}</Text>
        )}

        <Text style={styles.label}>Status:</Text>
        <Controller
          control={control}
          name="status"
          render={({ field }) =>
            editMode ? (
              <Picker
                style={styles.input}
                selectedValue={field.value}
                onValueChange={(itemValue) => setValue("status", itemValue)}
              >
                <Picker.Item label={Status.Pending} value={Status.Pending} />
                <Picker.Item
                  label={Status.InProgress}
                  value={Status.InProgress}
                />
                <Picker.Item
                  label={Status.Completed}
                  value={Status.Completed}
                />
              </Picker>
            ) : (
              <Text style={styles.displayText}>{field.value}</Text>
            )
          }
        />
        {editMode ? (
          <View style={styles.flexBtns}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setEditMode(false)}
            >
              <Text style={styles.textWhite}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.textWhite}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.flexBtns}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.textWhite}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditMode(true)}
            >
              <Text style={styles.textWhite}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f3ffff",
    height: "100%",
  },
  formView: {
    backgroundColor: "#f3ffff",
    paddingTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  submitBtn: {
    backgroundColor: "#50C2C9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 50,
    borderRadius: 10,
    marginTop: 100,
  },
  cancelBtn: {
    backgroundColor: "#FF6666",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 50,
    borderRadius: 10,
    marginTop: 100,
  },
  editBtn: {
    backgroundColor: "#50C2C9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 50,
    borderRadius: 10,
    marginTop: 100,
  },
  date: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
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
    left: 80,
  },
  lighterBlue: {
    backgroundColor: "lightcyan",
  },
  flexBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  displayText: {
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  textWhite: {
    color: "#fff",
  },
});

export default TaskView;
