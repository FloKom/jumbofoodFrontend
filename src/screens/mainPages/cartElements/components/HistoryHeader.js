/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HistoryHeader = () => {
  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity onPress={() => console.log(1)}>
        <Icon name="ios-close" size={35} color="#a8a9ad" />
      </TouchableOpacity>
      <Text style={{fontSize: 18}}>Shopping Cart</Text>
    </View>
  );
};

const styles = {
  headerStyle: {
    flex: 0.3,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#e2e2e2',
  },
};

export default HistoryHeader;
