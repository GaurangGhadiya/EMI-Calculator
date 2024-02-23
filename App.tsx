import React, { useEffect, useState } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screen/Home';
import Calculator from './src/screen/Sip';
import Lumpsum from './src/screen/Lumpsum';
import FD from './src/screen/FD';
import MutualFund from './src/screen/MutualFund';
import EMI from './src/screen/EMI';
import GST from './src/screen/GST';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Stack = createNativeStackNavigator();
const SplashScreen = () => (
  <View style={styles.container}>

    <Image source={require('./src/assets/logo.png')} style={styles.image} />
  </View>
);
function App(): React.JSX.Element {
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 2000); // Change the duration as needed
  }, []);

  return splashVisible ? <SplashScreen /> :     <NavigationContainer>
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
</NavigationContainer>;

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    // backgroundColor: '#00B386',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    marginTop: 20,
    color : "white"
  },
  btn:{
    borderWidth : 0,
    backgroundColor : "transparent",

  }
});