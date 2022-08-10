/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Alert,Pressable, Modal, SectionList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {widthPercentageToDP as wp,  heightPercentageToDP as hp } from 'react-native-responsive-screen';



const sections = [
  {
    id: '0',
    title: 'A',
    data: [
      { id: '0', text: 'Tomates noires de krimey', price:'2000', Image:require('../../assets/coffee.jpg') },
      { id: '1', text: 'Abricots', price:'2000', Image:require('../../assets/tubers.jpg') },
      { id: '2', text: 'Alouettes', price:'2000', Image:require('../../assets/solo.jpg') },
    ],
  },
  {
    id: '1',
    title: 'B',
    data: [
      { id: '3', text: 'baba', price:'2000', Image:require('../../assets/walkingwoman.png') },
      { id: '4', text: 'ListView', price:'2000', Image:require('../../assets/mitumba.jpg') },
    ],
  },
];



const SeeAllProd = () => {

const [modalVisible, setModalVisible] = useState(false);

  return (

    <><View style={styles.centeredView}>
          <Modal
            statusBarTranslucent={true}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
              } }
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Hello World!</Text>
                      <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                      >
                          <Text style={styles.textStyle}>Hide Modal</Text>
                      </Pressable>
                  </View>
              </View>
          </Modal>
      </View>
      <SectionList
              style={styles.sectionliststyle}
              sections={sections}
              renderItem={({ item }) => <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View style={styles.container}>
                      <View style={styles.imagecontainer}>
                          <Image
                              style={{ height: 100, width: 140, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                              source={(item.Image)} />
                      </View>
                      <View style={styles.titlecontainer}>
                          <Text style={styles.title}>{item.text}</Text>
                          <Text style={styles.subtitle}>{item.price} XAF</Text>
                      </View>
                  </View>
              </TouchableOpacity>}
              renderSectionHeader={({ section }) => (
                  <Text style={styles.header}>{section.title}</Text>
              )}
              keyExtractor={(item) => item.id} /></>


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
    margin:10,
    width: 130,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 15,
    color : '#000000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default SeeAllProd;
