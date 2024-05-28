import { NavigationProp, NavigationState, StackActions, TabActions, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../utils/AuthCheck/AuthContext";


interface naviState extends Omit<NavigationProp<ReactNavigation.RootParamList>, 'getState'>  {
    /**替换当前路由 */
    replace(path:string, params?: Record<string,any>):void;
    getState(): NavigationState | undefined;
}

export default function Login(){
    const { isLoggedIn, login } = useAuth();
    const route = useRoute();
    const navigation = useNavigation<naviState>();
    
    const loginto = useCallback(()=>{
        const { check, path, isTab } = route.params as any
        const params = {}
        if (check) {
            login();
            if (isTab) {
                navigation.replace('tab', {screen: path});
            } else {
                navigation.replace(path);
            }
        } else {
            login();
            navigation.goBack()
        }
    },[])

    return <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity onPress={loginto} style={{width: 100, height: 50, borderRadius: 10, backgroundColor: "skyblue", alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>登录</Text>
        </TouchableOpacity>
    </View>
}