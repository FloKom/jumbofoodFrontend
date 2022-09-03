/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { InnerContainer, StyledContainer, StyledFormArea, PageTitle, ExtraView, TextLink, TextLinkContent, SubTitle } from '../../components/styles';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getData } from '../../helpers/fetchData-helpers';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentSuccess = ({ navigation }) => {
    const [codes, setCode] = useState([]);

    useEffect(() => {
        const getCode = async()=>{
            let value = await AsyncStorage.getItem('credential')
            value = JSON.parse(value) 
            console.log(value)
            let data = await getData('client/'+value.clientId + '/panniers')
            console.log(data)
            setCode(data)
        }
        getCode()
    }, []);
    
    return (
        <StyledContainer style={styles.forheight}>
            <StatusBar style="auto" />
            <InnerContainer >
                {/* <PageTitle>Active Transaction Code</PageTitle> */}
                <StyledFormArea becomesupplierformarea={true}>
                    <Text style={styles.text}>Here's the code that you should give for finishing your transaction.
                    </Text>
                    <ScrollView>
                        {codes.map((code)=>{
                            return(
                                <View style={{ marginTop: 70, alignItems: 'center' }}>
                                    <Text> Transaction Date : {code.createdAt.split('T')[0]}</Text>
                                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{code.id}</Text>
                                </View>
                            )    
                        })}
                    </ScrollView>
                    <ExtraView
                        style={{ top: 70 }}>
                        <TextLink onPress={() => navigation.navigate('MainPage')}>
                            <TextLinkContent>Go home</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
            </InnerContainer>
        </StyledContainer>
    );

};

const styles = StyleSheet.create({
    text: {
        fontSize: hp('2.5%'),
        textAlign: 'center',
        marginTop: 40,
        padding: 3,
    },
});
export default PaymentSuccess;
