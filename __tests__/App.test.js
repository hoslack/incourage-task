/* global __DEV__ */

import React from "react";
import { render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import App from "../App";

describe("App", () => {
  test("renders navigation container and screens", () => {
    const { getByTestId, toJSON } = render(
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );

    expect(toJSON()).toBeTruthy();

    expect(getByTestId("HomeScreen")).toBeTruthy();
  });
});
