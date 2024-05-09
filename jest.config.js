global.__DEV__ = true; // Set __DEV__ to true for development mode

module.exports = {
  rootDir: "./",
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|@react-navigation|expo)/.*)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
