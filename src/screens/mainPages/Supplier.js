/* eslint-disable prettier/prettier */
import React, { useState, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, PageTitle, StyledContainer, StyledButton, LeftIcon, StyledTextInput, ButtonText, Colors } from '../../components/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, TouchableOpacity, Text, Image, useWindowDimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { secondary } = Colors;

const Supplier = ({navigation}) => {
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto" />
                <InnerContainer>
                    <View>
                        <Text style={styles.mytext}>Click on the button "Submit a product" bellow to submit a new product.</Text>
                    </View>
                    <View>
                        <Image
                            style={{ height: 130, width: 222 }}
                            source={require('../../assets/fruitgroup.png')}
                        />
                    </View>
                    <ActionButton
                    style={{ bottom:90 }}
                    buttonColor={secondary}>
                        <ActionButton.Item
                            buttonColor='#9b59b6'
                            title="Submit a product"
                            onPress={() => navigation.navigate('proposition form')}>
                            <Icon
                                name="add-circle"
                                style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor='#ff9865'
                            title="Submission history"
                            onPress={() => {navigation.navigate("History")}}>
                            <Icon
                                name="book"
                                style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item
                            buttonColor='#3498db'
                            title="Contact a manager"
                            onPress={() => {navigation.navigate("Contact manager") }}>
                            <Icon
                                name="call"
                                style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};



const styles = StyleSheet.create({
    button: {
        marginLeft: 40,
        marginRight: 40,
        fontWeight: 'bold',
    },
    mytext: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 100,
        marginBottom: 30,
    },
    actionButtonIcon: {
        fontSize: 22,
        height: 22,
        color: 'white',
    },
    forheight: {
        height: hp('100%'),
    },
});

export default Supplier;
