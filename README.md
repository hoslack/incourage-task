# Task Manager

Welcome to the **Incourage Task Manager** React Native project! This guide will help you set up, install, and run the project locally on your machine.


## Table of Contents

- [Task Manager](#task-manager)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Project Structure](#project-structure)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)
  - [License](#license)
  - [Screenshots](#screenshots)

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js (version 16 or later)
- npm or yarn (version 6 or later)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development) or Xcode (for iOS development) if you want to run the app on a physical device or emulator.

## Installation

1. **Clone the repository**:

   ```shell
   git clone https://github.com/hoslack/incourage-task.git
   ```

2. **Navigate to the project directory**:

   ```shell
   cd incourage-task
   ```

3. **Install dependencies**:

   The project uses `npm` as the package manager. Run the following command to install all dependencies listed in the `package.json` file:

   ```shell
   npm install
   ```

   or

   ```shell
   yarn install
   ```

## Running the Project

1. **Start the Expo development server**:

   Use the following command to start the development server:

   ```shell
   npm run start or yarn start
   ```

   Alternatively, you can specify the platform you want to run the project on:

   - For Android devices or emulators:

     ```shell
     npm run android
     ```

   - For iOS devices or simulators:

     ```shell
     npm run ios
     ```

   - For web:

     ```shell
     npm run web
     ```

2. **Connect your device or emulator**:

   If you want to run the app on a physical Android/iOS device, install the Expo Go app from the Google Play Store or App Store and scan the QR code that appears in your terminal. You can also run the app on an Android/iOS emulator.

## Project Structure

The project follows a standard React Native structure with the main files and directories:

- `assets/`: Contains asset files such as images and fonts.
- `App.tsx`: The main application file.
- `babel.config.js`: Babel configuration file.
- `package.json`: Lists project dependencies and scripts.
- `README.md`: This file.

## Dependencies

The project uses the following dependencies:

- **React Native**: The core framework for building native apps.
- **Expo**: Provides tools and services to simplify app development.
- **@react-navigation/native**: For navigation in the app.
- **@react-native-async-storage/async-storage**: For persistent storage.
- **react-hook-form**: For handling forms and validations.
- **yup**: For form validation schema.
- **react-native-paper**: UI components and theming.
- **@react-native-community/datetimepicker**: For date and time picker.
- **react-native-reanimated**: For animations.

Refer to the `package.json` file for the complete list of dependencies.

## Contributing

If you wish to contribute to this project, please fork the repository and create a pull request with your changes. Make sure to follow the coding style and contribute in a way that maintains project quality.

## License

This project is licensed under the [MIT License](LICENSE).

---

## Screenshots

![Screenshot_2024-05-09-12-14-45-47_f73b71075b1de7323614b647fe394240](https://github.com/hoslack/incourage-task/assets/15017978/d2288c23-461c-43fb-a4ac-aeac8b5d500e)
![Screenshot_2024-05-09-12-12-30-92_f73b71075b1de7323614b647fe394240](https://github.com/hoslack/incourage-task/assets/15017978/d5b4c29a-1b2c-442c-9542-398597c1966a)
![Screenshot_2024-05-09-12-12-24-46_f73b71075b1de7323614b647fe394240](https://github.com/hoslack/incourage-task/assets/15017978/872a17b5-fa09-4120-83aa-c8e74015fb4e)
![Screenshot_2024-05-09-12-11-51-24_f73b71075b1de7323614b647fe394240](https://github.com/hoslack/incourage-task/assets/15017978/ca276e9e-5337-44a8-b6c1-a3dc9f0c1b0b)
![Screenshot_2024-05-09-12-11-15-60_f73b71075b1de7323614b647fe394240](https://github.com/hoslack/incourage-task/assets/15017978/a7ec4933-73b6-4dfd-bf85-aa76b9a890fd)

Thank you for checking out the Incourage Task project! If you encounter any issues, please feel free to open an issue on the repository. Happy coding!
