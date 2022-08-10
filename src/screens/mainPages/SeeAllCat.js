/* eslint-disable prettier/prettier */
import React from 'react';
import {SectionList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp,  heightPercentageToDP as hp } from 'react-native-responsive-screen';

const sections = [
  {
    id: '0',
    title: 'A',
    data: [
      { id: '0', text: 'Agrumes', Image:require('../../assets/coffee.jpg') },
      { id: '1', text: 'Abricots', Image:require('../../assets/tubers.jpg') },
      { id: '2', text: 'Alouettes', Image:require('../../assets/solo.jpg') },
    ],
  },
  {
    id: '1',
    title: 'B',
    data: [
      { id: '3', text: 'baba', Image:require('../../assets/walkingwoman.png') },
      { id: '4', text: 'ListView', Image:require('../../assets/mitumba.jpg') },
    ],
  },
];


const SeeAllCat = ({navigation}) => {
  return (
    <SectionList
    style={styles.sectionliststyle}
    sections={sections}
    renderItem={({ item }) => <TouchableOpacity onPress={()=>{navigation.navigate('All products')}}>
    <View style={styles.container}>
    <View style={styles.imagecontainer}>
      <Image
      style={{ height: 100, width: 140, borderTopLeftRadius: 20,borderBottomLeftRadius: 20, }}
        source={(item.Image)} />
    </View>
    <View style={styles.titlecontainer}>
      <Text style={styles.title}>{item.text}</Text>
    </View>
  </View>
  </TouchableOpacity>}
  renderSectionHeader={({ section }) => (
    <Text style={styles.header}>{section.title}</Text>
  )}
  keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  sectionliststyle:{
    width: wp('90%'),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin:7,
    borderWidth: 1,
    borderColor: '#D0C9C0',
    borderRadius: 21,
    backgroundColor: '#f7ffff',
  },
  titlecontainer: {
    margin:20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    color : '#000000',
  },
  header: {
    marginTop: 20,
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#34BE82',
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default SeeAllCat;
