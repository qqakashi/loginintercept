import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useAuth } from './AuthContext';
import { StackActions, useNavigation } from '@react-navigation/native';

interface RequireState {
    children: React.JSX.Element; 
    path: string;
    isTab?: boolean;
}


/**中间件，用于包裹需要登录拦截路由，判断当前登录状态并执行登录拦截 */
function RequireAuth(props: RequireState){
    const { isLoggedIn } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener("focus",loadCheck)
        return()=>{
            navigation.removeListener("focus", loadCheck)
        }
    }, []);

    const loadCheck = useCallback(()=>{
        console.log(isLoggedIn);
        if (!isLoggedIn) {
            navigation.dispatch(StackActions.replace('login', {check: true, path: props.path, isTab: props.isTab }));
        }
    },[isLoggedIn])

    if(!isLoggedIn){
        return <></>
    }
    return props.children;
};

export default RequireAuth;
