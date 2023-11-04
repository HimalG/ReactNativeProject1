import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Button, Alert, StyleSheet, StatusBar, SafeAreaView, ScrollView, useColorScheme, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



function Section({ children, title }) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
//Read user data
const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user');
    setUsername(jsonValue != null ? JSON.parse(jsonValue) : null);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
  }
};
// useEffect(()=>{
//  getUserData();
// },[]);
const LoginScreen = (props) => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');


  //Save user data
const storeUserData = async (userData) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('@user', jsonValue);
  } catch (e) {
  }
};

  const isDarkMode = useColorScheme() === 'dark';

  const handleLogin = () => {
   // storeUserData(dt);
    if (userName === 'admin' && password === 'admin') {
      props.navigation.navigate("Home");
      Alert.alert('Success', 'Logged in successfully!');
    } else {
      Alert.alert('Error', 'Invalid userName or password');
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            alignItems: 'center'
          }}>
          <Section >
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={userName}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <Button title="Login"
               onPress={handleLogin}
              // onPress={handleLogin(userName)}
              />
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width:100
  },
});

export default LoginScreen;

