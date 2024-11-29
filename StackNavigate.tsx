import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './pages/home';
import { View } from 'react-native';
import Seting from './pages/seting';
import Login from './pages/login';
import RequireAuth from './utils/AuthCheck/RequireAuth';
import { UserInfo } from './pages/userInfo';
import { User } from './pages/user';
import Detail from './pages/detail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RootTabs() {
    return (
        <Tab.Navigator screenOptions={{tabBarActiveTintColor: "tomato", tabBarInactiveTintColor: "gray", tabBarLabelStyle: {marginTop: 5}}}>
            <Tab.Screen name="Home" component={Home} options={{
                    headerShown: true,
                    headerTitle: "首页",
                    tabBarLabel: "首页",
                    tabBarIcon: ({focused, color, size})=> <View style={{width: size, height: size, backgroundColor: focused? color : "gray"}} /> 
                }} 
            />
            <Tab.Screen name="Seting" component={Seting} options={{
                    headerShown: true,
                    headerTitle: "设置",
                    tabBarLabel: "设置",
                    tabBarIcon: ({focused, color, size})=> <View style={{width: size, height: size, backgroundColor: focused? color : "gray"}} /> 
                }} 
            />
            <Tab.Screen name="User" component={User} options={{
                    headerShown: true,
                    headerTitle: "我的",
                    tabBarLabel: "我的",
                    tabBarIcon: ({focused, color, size})=> <View style={{width: size, height: size, backgroundColor: focused? color : "gray"}} /> 
                }} 
            />
        </Tab.Navigator>
    );
}

function StackRoute(){
    return <Stack.Navigator initialRouteName='Tab' screenOptions={{headerShown: false, gestureEnabled: true}}>
        <Stack.Screen name='Tab' component={RootTabs} options={{headerTitle: "我的"}} />
        <Stack.Screen name='Login' component={Login} options={{headerTitle: "登录", headerShown: true}} />
        <Stack.Screen name='Userinfo' options={{headerTitle: "用户详情", headerShown: true}}>
            {()=>(<RequireAuth path='Userinfo'>
                <UserInfo />
            </RequireAuth>)}
        </Stack.Screen>
        <Stack.Screen name='Detail' component={Detail} options={{headerTitle: "详情", headerShown: true}} />
    </Stack.Navigator>
}


/** 
 * react-navigation默认顶部标题栏在验证登录拦截时会有显示问题，建议自己封装标题栏并把默认标题栏隐藏 
 * @param headerShown 设置为false
 * */
export default function StackNavigate(){
    return <NavigationContainer>
        <StackRoute />
    </NavigationContainer>
}

