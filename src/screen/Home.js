import {View, Text, Alert, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import ButtonCustom from '../components/ButtonCustom';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@react-native-vector-icons/ionicons';

const Home = ({navigation}) => {
  const [dusun, setDusun] = React.useState([]);
  const getData = () => {
    AsyncStorage.getItem('token').then(value => {
      return fetch('https://dev-disambi.sandboxindonesia.id/api/dusun/', {
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
            setDusun(json?.data);
          } else if (json?.response?.code === 401) {
            Alert.alert(json?.response?.message);
          }
        })
        .catch(error => console.log('error', error));
    });
  };

  const deleteDusun = id => {
    AsyncStorage.getItem('token').then(value => {
      return fetch(`https://dev-disambi.sandboxindonesia.id/api/dusun/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + value,
        },
      })
        .then(response => response.json())
        .then(json => {
          if (json?.response?.code == 200) {
            getData();
          } else if (json?.response?.code == 400) {
            Alert.alert(json?.response?.message);
          }
        })
        .catch(error => console.log('error', error));
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <ButtonCustom
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
        warna="black"
        warnaTitle="white"
      />
      <ButtonCustom
        title="Add Dusun"
        onPress={() => navigation.navigate('AddDusun')}
        warna="black"
        warnaTitle="white"
      />
      <ScrollView>
        {dusun.map((value, key) => {
          return (
            <View key={key}>
              <TouchableOpacity
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  margin: 20,
                  width: 250,
                  height: 70,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'left',
                  }}>
                  {value?.name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditDusun', {item: value})
                    }>
                    <Icon
                      name="pencil"
                      size={30}
                      color="black"
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteDusun(value?.id)}>
                    <Icon name="trash" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Home;
