import React from "react"
import { Pressable, View } from "react-native"
import Svg, { Path } from "react-native-svg"

export const HeaderLogin = (props: {
    navigation
}) => {
    return (
        <View style={{
            position: "absolute",
            top: 0,
            height: 105,
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-end",
            paddingHorizontal: 16,

        }}>
            <Pressable style={{
                height: 30,
                width: "100%",
                justifyContent: "space-between",
            }}
                onPress={() => { props.navigation.goBack()}}
            >
                <Svg
                    width={25}
                    height={24}
                    viewBox="0 0 25 24"
                    fill="none"
                >
                    <Path
                        d="M15.824 19.5l-7.5-7.5 7.5-7.5"
                        stroke="#121212"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </Pressable>

        </View>
    )
}