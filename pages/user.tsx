import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";
import { useAuth } from "../utils/AuthCheck/AuthContext";
import { useCallback, useEffect } from "react";

export function User(){
    const { isLoggedIn } = useAuth()
    const navi = useNavigation()

    const to = useCallback(()=>{
        //@ts-ignore
        navi.navigate("userinfo")
    },[])

    return <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Button title={isLoggedIn?"已登录将不再验证":"未登录时进入用户详情页登录拦截，登录成功自动进入详情页"} onPress={to} />
    </View>
}