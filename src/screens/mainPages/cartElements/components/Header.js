/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {Alert, Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
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
            <Text style={styles.modalText}>Do you really want to wipe all your cart ?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    <View style={styles.headerStyle}>
        <TouchableOpacity onPress={() => console.log(1)}>
          <Icon name="ios-cart" size={35} color="#a8a9ad" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18 }}>Your Shopping Cart</Text>
        <TouchableOpacity
        onPress={() => setModalVisible(true)}>
          <Text>Empty</Text>
        </TouchableOpacity>
      </View></>
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
    borderRadius: 10,
    width: 50,
    padding: 10,
    elevation: 1,
  },
  buttonClose: {
    backgroundColor: 'red',
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
};

export default Header;
