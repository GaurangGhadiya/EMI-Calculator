import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screen/Home';
import Calculator from './src/screen/Sip';
import Lumpsum from './src/screen/Lumpsum';
import FD from './src/screen/FD';
import MutualFund from './src/screen/MutualFund';
import EMI from './src/screen/EMI';
import GST from './src/screen/GST';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen name="Calculator" options={{title : "SIP Calculator"}} component={Calculator} />
        <Stack.Screen name="Lumpsum" options={{title : "Lumpsum Calculator"}} component={Lumpsum} />
        <Stack.Screen name="FD" options={{title : "FD Calculator"}} component={FD} />
        <Stack.Screen name="MutualFund" options={{title : "Mutual Fund Calculator"}} component={MutualFund} />
        <Stack.Screen name="EMI" options={{title : "EMI Calculator"}} component={EMI} />
        <Stack.Screen name="GST" options={{title : "GST Calculator"}} component={GST} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
