import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import uuid from "react-native-uuid";
import { TaskType } from "../types/Task";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.date().required("Due date is required"),
  completed: yup.boolean().required("Completed is required"),
});

interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

const TaskForm: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isLoading },
    setValue,
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      completed: false,
    },
  });

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    console.log("Data submitted:", data);
    const id = uuid.v4() as string;
    try {
      const newTask = { ...data, id };
      // add new task to  array of tasks in AsyncStorage
      const jsonTasks = await AsyncStorage.getItem("taskData");
      let tasks: TaskType[] = [];
      if (jsonTasks) {
        tasks = JSON.parse(jsonTasks);
      }
      tasks.push(newTask);
      const jsonData = JSON.stringify(tasks);
      await AsyncStorage.setItem("taskData", jsonData);
      console.log("Data stored in AsyncStorage:", jsonData);
      setValue("title", "");
      setValue("description", "");
      setValue("dueDate", new Date());
    } catch (error) {
      console.error("Failed to store data:", error);
    }
  };

  const handleDateChange = (_: any, selectedDate?: Date | undefined) => {
    if (selectedDate) {
      setShowPicker(false);
      setValue("dueDate", selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={[styles.circle, styles.lightBlue]} />
        <View style={[styles.circle, styles.darkBlue]} />
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>New Task</Text>
      </View>
      <View style={styles.formView}>
        <Text style={styles.label}>Title:</Text>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter task title"
            />
          )}
        />
        {errors.title && (
          <Text style={styles.errorText}>{errors.title.message}</Text>
        )}

        <Text style={styles.label}>Description:</Text>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter task description"
              multiline
            />
          )}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        )}

        <Text style={styles.label}>Pick Due Date:</Text>
        <Controller
          control={control}
          name="dueDate"
          render={({ field }) => (
            <>
              {showPicker && (
                <DateTimePicker
                  value={field.value}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "#ccc",
                  height: 50,
                  paddingLeft: 6,
                  borderRadius: 4,
                  backgroundColor: "#fff",
                }}
              >
                <Text>{dayjs(field.value).format("DD/MM/YYYY")}</Text>
              </TouchableOpacity>
            </>
          )}
        />

        {errors.dueDate && (
          <Text style={styles.errorText}>{errors.dueDate.message}</Text>
        )}

        <Text style={styles.label}>Completed:</Text>
        <Controller
          control={control}
          name="completed"
          render={() => <Switch value={false} disabled />}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "#fff" }}>Submit</Text>
        </TouchableOpacity>
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
    width: "100%",
    height: 50,
    borderRadius: 10,
    marginTop: 100,
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
});

export default TaskForm;
