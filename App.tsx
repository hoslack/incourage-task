import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import NewTask from "./screens/NewTask";
import TaskView from "./screens/TaskView";

export type RootStackParamList = {
  Home: undefined;
  NewTask: undefined;
  TaskView: { taskId: string };
};

const RootStack = createStackNavigator<RootStackParamList>();

const customTheme = {
  ...DefaultTheme,
};

const App: React.FC = () => {
  return (
    <NavigationContainer theme={customTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="NewTask" component={NewTask} />
        <RootStack.Screen name="TaskView" component={TaskView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
