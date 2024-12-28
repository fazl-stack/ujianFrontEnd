import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import ButtonCustom from '../components/ButtonCustom';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@react-native-vector-icons/ionicons';

const Login = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mata, setMata] = React.useState(false);

  const Login = () => {
    fetch('https://dev-disambi.sandboxindonesia.id/api/auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json?.response?.code === 200) {
          console.log(json);

          AsyncStorage.setItem('token', json?.data?.access_token);

          navigation.replace('Home');
        } else {
          Alert.alert('Error', json?.response?.message);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <TextInput
        placeholder="username"
        placeholderTextColor="grey"
        value={username}
        onChangeText={text => setUsername(text)}
        style={{
          width: 300,
          height: 50,
          backgroundColor: 'lightgrey',
          margin: 10,
          borderRadius: 10,
          color: 'black',
          paddingHorizontal: 10,
        }}></TextInput>
      <View
        style={{
          width: 300,
          height: 50,
          backgroundColor: 'lightgrey',
          margin: 10,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TextInput
          placeholder="password"
          placeholderTextColor="grey"
          secureTextEntry={!mata}
          value={password}
          onChangeText={text => setPassword(text)}
          style={{
            width: 250,
            color: 'black',
          }}></TextInput>
        <Icon
          name={mata ? 'eye-off' : 'eye'}
          size={20}
          onPress={() => setMata(!mata)}
          color="black"
        />
      </View>

      <ButtonCustom
        title="Login"
        onPress={Login}
        warna="black"
        warnaTitle="white"
      />
    </View>
  );
};

export default Login;
