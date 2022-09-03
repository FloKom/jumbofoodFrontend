/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../../components/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { secondary } = Colors;
const image1 = require('../images/orange.jpg');
const image2 = require('../images/tomato.jpg');
const image3 = require('../images/salmon.jpg');
const image4 = require('../images/greens.jpg');
const image5 = require('../images/rye-bread.jpg');

// const data = [
//   {
//     id: 1,
//     image: image1,
//     name: 'Orange',
//     price: 100,
//     amountTaken: 3,
//   },
//   {
//     id: 2,
//     image: image2,
//     name: 'Tomate noire de krime',
//     price: 500,
//     amountTaken: 4,
//   },
//   {
//     id: 3,
//     image: image3,
//     name: 'Salmon fillet',
//     price: 1600,
//     amountTaken: 2,
//   },
//   {
//     id: 4,
//     image: image4,
//     name: 'Greens',
//     price: 3000,
//     amountTaken: 3,
//   },
//   {
//     id: 5,
//     image: image5,
//     name: 'Rye Bread',
//     price: 20000,
//     amountTaken: 1,
//   },
// ];

function Item({data, setData, setTotal}) {

  const onPress = async (id,bool=true)=>{
    let newData = data.map((item)=>{
      if(item.id == id){
        item.quantite = bool?item.quantite + 1:item.quantite - 1 
      }
      return item
    })
    let cart = await AsyncStorage.getItem('pannier')
    cart = JSON.parse(cart)
    const element = data.findIndex((item)=>item.id == id)
    let index = null
    let value = null
    if(data[element].produitId == undefined){
      index = cart.lignePacks.findIndex((item)=>item.packproduitId == data[element].packproduitId)
      value = (cart.lignePacks[index].prix)/(cart.lignePacks[index].quantite)
      if(bool){
        cart.prix = cart.prix + value
        cart.lignePacks[index].prix = cart.lignePacks[index].prix + value
        cart.lignePacks[index].quantite = cart.lignePacks[index].quantite + 1
      }else{
        cart.prix = cart.prix - value
        cart.lignePacks[index].prix = cart.lignePacks[index].prix - value
        cart.lignePacks[index].quantite = cart.lignePacks[index].quantite - 1
      }
      if(cart.lignePacks[index].quantite == 0){
        remove(id)
      }  
    }else{
      index = cart.ligneProduits.findIndex((item)=>item.produitId == data[element].produitId)
      value = (cart.ligneProduits[index].prix)/(cart.ligneProduits[index].quantite)
      if(bool){
        cart.prix = cart.prix + value
        cart.ligneProduits[index].prix = cart.ligneProduits[index].prix + value
        cart.ligneProduits[index].quantite = cart.ligneProduits[index].quantite + 1
      }else{
        cart.prix = cart.prix - value
        cart.ligneProduits[index].prix = cart.ligneProduits[index].prix - value
        cart.ligneProduits[index].quantite = cart.ligneProduits[index].quantite - 1
      }
      if(cart.ligneProduits[index].quantite == 0){
        remove(id)
      }
    }
    setTotal({price:cart.prix, quantity:newData.length})
    await AsyncStorage.setItem('pannier', JSON.stringify(cart))
    setData(newData)
  }

  const remove = async (id)=>{
    let element = data.findIndex((item)=>item.id == id)
    let newData = [...data]
    newData.splice(element, 1)
    let cart = await AsyncStorage.getItem('pannier')
    cart = JSON.parse(cart)
    if(data[element].produitId == undefined){
      let index = cart.lignePacks.findIndex((item)=>item.packproduitId == data[element].packproduitId)
      cart.prix = cart.prix - cart.lignePacks[index].prix
      cart.lignePacks.splice(index, 1)  
    }else{
      let index = cart.ligneProduits.findIndex((item)=>item.produitId == data[element].produitId)
      cart.prix = cart.prix - cart.ligneProduits[index].prix
      cart.ligneProduits.splice(index, 1)
    }
    setTotal({price:cart.prix, quantity:newData.length})
    await AsyncStorage.setItem('pannier', JSON.stringify(cart))
    setData(newData)
  }

  const _renderItem = ({ item, index }) => {
    const {
      containerStyle,
      lastItemStyle,
      imageStyle,
      textStyle,
      counterStyle,
      priceStyle,
      buttonContainerStyle,
      closeButtonStyle,
    } = styles;
    
    return (
      <View style={{backgroundColor:'#fff', borderBottomWidth: 1,borderColor: '#e2e2e2'}}>
      <View style={index + 1 === data.length ? lastItemStyle : containerStyle}>
        <Image source={{uri:item.photoURL}} style={imageStyle} />

        <View style={textStyle}>
          <Text style={{ color: '#2e2f30', fontSize: 17, letterSpacing: 1 }}>{item.nom}</Text>
          <View style={priceStyle}>
            <Text style={{ color: '#2e2f30', fontSize: 13, fontWeight:'bold' }}>{item.prix} XAF</Text>
          </View>
        </View>

        <View style={counterStyle}>
          <Icon.Button
            name="ios-remove"
            size={15}
            color="#fff"
            backgroundColor="white"
            onPress={()=>onPress(item.id, false)}
            style={{
              borderRadius: 15,
              backgroundColor: 'red',
              height: 30,
              width: 30,
            }}
            iconStyle={{ marginRight: 0 }}
          />

          <Text>{item.quantite}</Text>

          <Icon.Button
            name="ios-add"
            size={15}
            color="#fff"
            backgroundColor="#fff"
            onPress={()=>onPress(item.id)}
            style={{
              borderRadius: 15,
              backgroundColor: secondary,
              height: 30,
              width: 30,
            }}
            iconStyle={{ marginRight: 0 }}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={buttonContainerStyle}
        onPress={()=>remove(item.id)}
        >
        <View style={closeButtonStyle}>
          <Text style={{ color: '#fff' }}>Remove item</Text>
        </View>
    </TouchableOpacity>
  </View>
    );
  }
    return (
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={item => item.id}

      />
    );
  
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  lastItemStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 1.5,
    justifyContent: 'center',
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 80,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    marginBottom:10,
    justifyContent: 'flex-end',
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

export default Item;
