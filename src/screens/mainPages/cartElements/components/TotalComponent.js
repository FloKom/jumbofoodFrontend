import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TotalComponent = ({total}) => {
  const {containerStyle, goodsStyle, totalStyle} = styles;
  return (
    <View style={containerStyle}>
      <View style={goodsStyle}>
        <Icon name="ios-cart" size={20} style={{marginRight: 8}} />
        <Text>{total.quantity} Items</Text>
      </View>

      <View style={totalStyle}>
        <Text>Total - </Text>
        <Text style={{fontWeight:'bold', color:'black',fontSize:20}}>{total.price} XAF</Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  goodsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default TotalComponent;
