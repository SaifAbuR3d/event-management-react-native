import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginBottom: 20,
  },
  paragraph: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 30,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.tertiary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});

export default styles;