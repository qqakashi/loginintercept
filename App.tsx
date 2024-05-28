/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import StackNavigate from './StackNavigate';
import { AuthProvider } from './utils/AuthCheck/AuthContext';
type SectionProps = PropsWithChildren<{
  title: string;
}>;
function App(){
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (<AuthProvider>
        <StackNavigate />
    </AuthProvider>);
}
export default App;
