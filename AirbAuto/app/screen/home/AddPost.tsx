
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, TextInput, Image, View, Pressable } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { connect } from "react-redux";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { useMount } from "../../lib/function/useMount";
import { bindActionCreators } from "redux";
import {
    AppInit,
    updateBottomTabBar
} from "../../redux/actions/AppActions";
import SplashScreenStyle from "../../ressources/style/SplashScreenStyle";
import stringsImage from "../../ressources/stringsImage";




interface ExplorerType {
    navigation,
    route,
    AppInit: Function;
    initApp,
    isBottomTabBarVisibre,
    updateBottomTabBar

}
type showMessage = {
    message: string,
    duration: number
}

const AddPost = (props: ExplorerType) => {







    return (

        <View style={[{
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            borderStyle: "solid",
            height: "100%",
            width: "100%",
            padding: 10,
        }]} >




        </View>
    );
};

function mapStateToProps(state) {
    return {

        initApp: state.app.initApp,
        isBottomTabBarVisibre: state.app.isBottomTabBarVisibre

    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators(
            {
                AppInit,
                updateBottomTabBar,

            },
            dispatch,
        ),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddPost);

