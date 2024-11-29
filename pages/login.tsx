import { NavigationProp, NavigationState, StackActions, TabActions, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../utils/AuthCheck/AuthContext";


interface naviState extends Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>  {
    /**替换当前路由 */
    replace(path:string, params?: Record<string,any>):void;
    getState(): NavigationState | undefined;
}


export default function Login(){
    const { login } = useAuth();
    const route = useRoute();
    const navigation = useNavigation<naviState>();
    const loginto = useCallback(()=>{
        const { path } = route.params as any
        const params = {}
        login();
        navigation.replace(path);
    },[])

    return <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity onPress={loginto} style={{width: 100, height: 50, borderRadius: 10, backgroundColor: "skyblue", alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>登录</Text>
        </TouchableOpacity>
    </View>
}