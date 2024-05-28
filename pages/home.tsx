import { TabActions, useNavigation } from "@react-navigation/native"
import { useCallback } from "react"
import { Button, Pressable, Text, View, TouchableOpacity } from "react-native"
import { useAuth } from "../utils/AuthCheck/AuthContext"
export default function Home(){
    const navigation = useNavigation()
    const to = useCallback(()=>{
        //@ts-ignore
        navigation.navigate("detail")
    },[])

    return <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        
    </View>
}