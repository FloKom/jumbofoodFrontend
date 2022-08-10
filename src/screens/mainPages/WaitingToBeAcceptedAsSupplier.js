/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer,  SubTitle, StyledFormArea} from '../../components/styles';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getElement } from '../../helpers/asyncStorage-helpers';
import {heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getData } from '../../helpers/fetchData-helpers';
import { SplashScreen } from '../../helpers/loader';
import { updateUser } from '../../helpers/db-helpers';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WaitingToBeAcceptedAsSupplier = ({navigation}) => {
    const [parameter, setparameter] = useState();
    const [loading, setloading] = useState(true);
    useEffect(() => {
       async function getStatut(){
        let value = await AsyncStorage.getItem('credential')
        value = JSON.parse(value)
        console.log('valueWait', value)
        const id = value.producteurId
        getData('producteur/' + id).then(async (supplier)=>{
            console.log('supplier', supplier)
            if(supplier.preinscriptionValide == 'approuve'){
                await updateUser(value.id,'supplier')
                value.statut = 'supplier'
                await AsyncStorage.setItem('credential', JSON.stringify(value))
                navigation.dispatch(
                    StackActions.replace('Supplier Approuve')
                  );
        }
        })
        setloading(false)
       }
       getStatut()
       
    }, []);
    if(loading){
        return <SplashScreen/>
    }
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto"/>
                <InnerContainer >
                    <SubTitle becomesupplier={true}> Supplier </SubTitle>
                        <StyledFormArea becomesupplierformarea={true}>
                            <Text style={styles.text}>Thanks for your asking to become a supplier! We will examinate your
                            candidature and reply to you within 48 hours. See you soon!
                            </Text>
                            <View>
                            <Image
                            style={{ height: 150, width: 125, top:60, marginLeft: 'auto', marginRight: 'auto' }}
                            source={require('../../assets/happyavocado.png')}
                        />
                        <Image
                            style={{ height: 430, width: 525, bottom:80, right:20, marginRight: 'auto' }}
                            source={require('../../assets/nav.png')}
                        />
                    </View>
                        </StyledFormArea>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );

};

const styles = StyleSheet.create({
    text: {
        fontSize: hp('2.5%'),
        textAlign: 'center',
        marginTop:40,
        padding: 3,
    },
    forheight:{
        height: hp('100%'),
    },
});
export default WaitingToBeAcceptedAsSupplier;