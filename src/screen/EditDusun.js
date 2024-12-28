import {View, Text, Alert, TextInput} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonCustom from '../components/ButtonCustom';

const EditDusun = ({navigation, route}) => {
  const item = route?.params?.item;
  const [namaDusun, setNamaDusun] = React.useState(item?.name);
  const [editNamaDusun, setEditNamaDusun] = React.useState(item?.name);

  const updateDusun = () => {
    if (namaDusun != '') {
      AsyncStorage.getItem('token').then(value => {
        return fetch(
          `https://dev-disambi.sandboxindonesia.id/api/dusun/${item?.id}`,
          {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + value,
            },
            body: JSON.stringify({
              name: editNamaDusun,
            }),
          },
        )
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
    } else {
      Alert.alert('Nama Dusun Tidak Boleh Kosong');
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        value={editNamaDusun}
        onChangeText={setEditNamaDusun}
        placeholder="Nama Dusun"
        placeholderTextColor={'grey'}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          margin: 20,
          color: 'black',
          width: 300,
          height: 50,
          borderRadius: 10,
        }}
      />
      <ButtonCustom
        title="Simpan"
        warna={'#1E90FF'}
        warnaTitle={'#fff'}
        onPress={() => updateDusun()}
      />
    </View>
  );
};

export default EditDusun;
