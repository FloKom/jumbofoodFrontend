/* eslint-disable prettier/prettier */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer, PageLogoSpe, PageTitle, StyledButton, ButtonText, LeftIcon, Colors } from '../../components/styles';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button, Linking } from 'react-native';


const ContactManager = () => {
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto" />
                <InnerContainer>
                    <PageLogoSpe
                        resizeMode="cover"
                        source={require('../../assets/jumbofoodlogo.png')}
                    />
                    <View style={styles.pagedesc}>
                        <Text style={styles.textdesc}>Here is where you can directly contact a manager.</Text>
                    </View>
                    <View>
                        <StyledButton contactmanager={true} onPress={() => { Linking.openURL(`tel:${+237691214669}`); }} >
                            <LeftIcon call={true}>
                                <FontAwesome5 name="phone-alt" size={25} color="white" />
                            </LeftIcon>
                            <ButtonText>Direct call </ButtonText>
                        </StyledButton >
                        <StyledButton contactmanager={true} onPress={() => { Linking.openURL(`whatsapp://send?phone=${+237691214669}`); }} >
                            <LeftIcon call={true}>
                                <FontAwesome5 name="whatsapp" size={30} color="white" />
                            </LeftIcon>
                            <ButtonText>Whatsapp call </ButtonText>
                        </StyledButton>
                        <StyledButton contactmanager={true} onPress={() => { Linking.openURL(`sms://+237691214669`); }} >
                            <LeftIcon call={true}>
                                <FontAwesome5 name="sms" size={28} color="white" />
                            </LeftIcon>
                            <ButtonText>Send an sms </ButtonText>
                        </StyledButton>
                    </View>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    forheight: {
        height: hp('100%'),
    },
    pagedesc: {
        marginTop: 30,
        marginBottom: 40,
    },
    textdesc: {
        textAlign: 'center',
        fontSize: hp('2.5%'),
    },

});


export default ContactManager;
