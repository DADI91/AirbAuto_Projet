import { showMessage } from "react-native-flash-message";


export function showErrorMessage(message) {
  // Snackbar.show({
  //   title: message,
  //   duration: Snackbar.LENGTH_SHORT,
  //   color: colors.white,
  // });
  showMessage({
    message: message.email,
    animationDuration: 400,
    duration: 2000,
    type: "default",
    autoHide: true,
    backgroundColor: "#000000E3",
    titleStyle: {
      color: "white",
      // fontFamily: fonts.Dosis_Regular,
      //fontSize: RFPercentage(2),
    },
  });


}
