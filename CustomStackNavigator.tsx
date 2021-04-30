import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  NavigationHelpersContext,
  RouterConfigOptions,
  StackRouter,
  ParamListBase,
  StackRouterOptions,
  useNavigationBuilder,
} from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { StackNavigationConfig, StackNavigationEventMap } from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import { View } from 'react-native';
import window from "./window"


//不需要登录可看的页面
const publicRoute = [
    "Home",
    "StartPage",
]

type Props = DefaultNavigatorOptions<StackNavigationOptions> &
  StackRouterOptions &
  StackNavigationConfig;

const MyStackRouter = (options: StackRouterOptions) => {
  const router = StackRouter(options);

  return {
    ...router,
    getStateForAction(
      state: any,
      action: any,
      options: { routeNames: string[]; 
        routeParamList: ParamListBase; 
        routeGetIdList: Record<string, (options: { params?: Record<string, any>; }) => string>; 
      }
    ) {
      const result = router.getStateForAction(state, action, options);
      switch (action.type) {
        case 'GO_BACK':
          if(publicRoute.includes(action?.payload?.name)){
              return result;
          }
          if (state.routes[state?.routes.length - 1].params?.ISLOGIN) {
              state.routes = state?.routes?.filter((v: { name: string; }) => v.name != 'Login');
              state.index = state?.routes.length - 1;
              return router.getStateForAction(state, action, options)
          }
        case "NAVIGATE":
          if(!publicRoute.includes(action?.payload?.name) && action?.payload?.name != "Login" && !window.userinfo){
              action = {
                payload: {name: "Login", params: {
                  ...action?.payload?.params, _routeName: action?.payload?.name
                }},
                source: state?.routes[state.routes.length-1]?.key,
                type: "NAVIGATE"
              }
          }
          return router.getStateForAction(state, action, options)
        default:
          return result;
      }
    }
  }
};

function StackNavigator({
  initialRouteName,
  children,
  screenOptions,
}:Props) {
  const {state, navigation, descriptors} = useNavigationBuilder(MyStackRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <View style={{flex: 1}}>
        {descriptors[state.routes[state.index].key].render()}
      </View>
    </NavigationHelpersContext.Provider>
  );
}

export const createMyNavigator = createNavigatorFactory(StackNavigator);
