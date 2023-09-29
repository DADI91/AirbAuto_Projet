import {
  StyleSheet,
  
} from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

  
  
  
const SplashScreenStyle = StyleSheet.create({
  viewGlobal: {
    flex: 1,
    zIndex: 999999999,
    position: "absolute",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    backgroundColor: "#E1E1E1",
  },

  viewLogo:{
    flexDirection: "row",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    justifyContent: "center"
  },
  viewLogo2:{
    top:200
  },

  logo:{
    width: widthPercentageToDP(68.26),
    height: heightPercentageToDP(15.46),
    alignSelf: "center"
  }

  
});
    
export default SplashScreenStyle ;