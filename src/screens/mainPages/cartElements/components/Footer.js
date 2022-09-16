/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import TotalComp from './TotalComponent';
import { ExtraView, TextLink, TextLinkContent,  Colors } from '../../../../components/styles';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
 const { secondary } = Colors;

const Footer = ({total, navigation}) => {
  
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Info',
      text2: 'Your cart\'s price must be superior or equal to 5000XAF'
    });
  }
  const {
    containerStyle,
    buttonContainerStyle,
    closeButtonStyle,
    checkoutButtonStyle } = styles;
  return (
    <View style={containerStyle}>
      <TotalComp total={total} />
      <View style={buttonContainerStyle}>
        <TouchableOpacity 
          style={closeButtonStyle}
          onPress={()=>{
            navigation.navigate('MainPage')
          }}>
          <Text style={{ color: '#fff' }}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={checkoutButtonStyle}
          onPress = {()=>{
            if(total.price > 10){
              navigation.navigate('Checkout')            
            }
            else{
              showToast()
            }
          }}
          >
          <Text style={{ color: '#fff' }}>Go to checkout</Text>
        </TouchableOpacity>
      </View>
      <ExtraView>
          <TextLink onPress={() => navigation.navigate('paymentSuccess')}>
              <TextLinkContent>See my active code</TextLinkContent>
          </TextLink>
      </ExtraView>

    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  closeButtonStyle: {
    backgroundColor: '#7f8c8d',
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 3,
  },
  checkoutButtonStyle: {
    backgroundColor: secondary,
    padding: 10,
    paddingRight: 60,
    paddingLeft: 60,
    borderRadius: 3,
    marginLeft: 10,
  },
};

export default Footer;
