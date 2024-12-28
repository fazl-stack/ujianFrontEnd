import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const ButtonCustom = ({title, warna, onPress, warnaTitle}) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: warna,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 250,
        height: 50,
        borderColor: warnaTitle,
        borderWidth: 1,
        margin: 10,
      }}
      onPress={onPress}>
      {loading ? (
        <Text style={{color: warnaTitle}}>Loading...</Text>
      ) : (
        <Text style={{color: warnaTitle}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonCustom;
