import {View, Text, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const [user, setUser] = React.useState({});

  const getProfile = () => {
    AsyncStorage.getItem('token').then(value => {
      return fetch('https://dev-disambi.sandboxindonesia.id/auth/me/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        },
      })
        .then(response => response.json())
        .then(json => {
          if (json?.response?.code === 200) {
            setUser(json?.data);
            Alert.alert(json?.response?.message);
            console.log(json?.response?.message);
          } else if (json?.response?.code === 401) {
            Alert.alert('Error', json?.response?.message);
          }
        })
        .catch(error => console.log('error', error));
    });
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
      }}>
      <Image
        source={{uri: user?.photo_url}}
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',

          color: 'black',
          textAlign: 'center',
          marginTop: 20,
        }}>
        {user?.username}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: 'grey',
          textAlign: 'center',

          fontStyle: 'italic',
        }}>
        {user?.RoleName}
      </Text>
    </View>
  );
};

export default Profile;
