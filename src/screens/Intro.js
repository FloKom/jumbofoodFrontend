/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'react-native';

const Intro = () => {
  return (

    <Swiper style={styles.wrapper} showsButtons={false}>
      <StatusBar style="dark" />
      <View style={styles.slide1}>
        <Image
          style={{height: 130, width: 140}}
          source={require('./../assets/fruits.png')}
        />
        <Text style={styles.textHeading}>Welcome</Text>
        <Text style={styles.text}>
          Welcome to Jumbo food, the application that allows you to sell and buy
          local agricultural products
        </Text>
      </View>
      <View style={styles.slide2}>
        <Image
          style={{height: 130, width: 190}}
          source={require('./../assets/walkingwoman.png')}
        />
        <Text style={styles.textHeading}>Customer</Text>
        <Text style={styles.text}>
          Register, build your cart, pay in one click and have it delivered to
          your home
        </Text>
      </View>
      <View style={styles.slide3}>
        <Image
          style={{height: 140, width: 240}}
          source={require('./../assets/fruitgroup.png')}
        />
        <Text style={styles.textHeading}>Supplier</Text>
        <Text style={styles.text}>
          Enroll yourself as a supplier and offer your products to a wide range
          of customers!
        </Text>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    marginTop: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    marginTop: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    marginTop: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    color: 'black',
    marginTop: 100,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto-bold',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
    paddingHorizontal: 37,
  },
});

export default Intro;
