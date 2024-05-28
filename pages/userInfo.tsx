import { Button, Image, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../utils/AuthCheck/AuthContext";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export function UserInfo(){
    const { logout } = useAuth()
    const navi = useNavigation()


    const out = useCallback(()=>{
        logout();
        navi.goBack();
    },[])

    return <View style={{alignItems: "center", flex: 1}}>
        <View style={{width: "90%", height: 150, backgroundColor: "#BED7DC", borderRadius: 15, marginTop: 15, justifyContent: "center", alignItems: "center"}}>
            <Image source={require("../ava.png")} style={{width: 50, height: 50}} />
            <Text style={{marginTop: 15}}>ReactNavigation登录拦截</Text>
        </View>
        <TouchableOpacity onPress={out} style={{width: "85%", marginTop: 30, backgroundColor: "#F2613F", borderRadius: 15, paddingVertical: 15, alignItems: "center"}}>
            <Text style={{color: "white", fontSize: 18}}>退出登录</Text>
        </TouchableOpacity>
    </View>
}