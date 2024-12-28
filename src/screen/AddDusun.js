import {View, Text, TextInput, Alert} from 'react-native';
import React from 'react';
import ButtonCustom from '../components/ButtonCustom';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDusun = ({navigation}) => {
  const [dusun, setDusun] = React.useState('');

  const tambahDusun = () => {
    if (dusun != '') {
      AsyncStorage.getItem('token').then(value => {
        return fetch('https://dev-disambi.sandboxindonesia.id/api/dusun/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + value,
          },
          body: JSON.stringify({
            name: dusun,
          }),
        })
          .then(response => response.json())
          .then(json => {
            if (json?.response?.code === 200) {
              navigation.navigate('Home');
            } else if (json?.response?.code === 401) {
              Alert.alert(json?.response?.message);
            }
          })
          .catch(error => console.log('error', error));
      });
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
      }}>
      <TextInput
        placeholder="Nama Dusun"
        placeholderTextColor={'grey'}
        value={dusun}
        onChangeText={setDusun}
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'lightgrey',
          margin: 10,
          borderRadius: 10,
          color: 'black',
        }}></TextInput>
      <ButtonCustom
        title="Add Dusun"
        onPress={() => tambahDusun()}
        warna="black"
        warnaTitle="white"
      />
    </View>
  );
};

export default AddDusun;
