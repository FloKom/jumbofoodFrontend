/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
// import { NavigationActions } from 'react-navigation';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer, Line, StyledFormArea, ExtraText, ExtraView, TextLink, TextLinkContent, StyledButton, ButtonText, SubTitle } from '../../components/styles';
import Unorderedlist from 'react-native-unordered-list';
import {StatusBar} from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BecomeSupplier = ({navigation}) => {

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto"/>
                <InnerContainer >
                    {/* <SubTitle becomesupplier={true}> Supplier </SubTitle> */}
                        <StyledFormArea becomesupplierformarea={true}>
                            <Text style={styles.text}>By clicking the button below, you agree to abide by all of our rules
                                and conditions for becoming a certified Jumbo Food supplier and will be able to:
                            </Text>
                            <Unorderedlist><Text style={styles.text}>Offer and sell your products to JumboFood</Text></Unorderedlist>
                            <Unorderedlist><Text style={styles.text}>Contacting the application managers directly</Text></Unorderedlist>

                            <Line />
                            <StyledButton becomesupplierbutton={true}>
                                <ButtonText onPress={()=> navigation.navigate('Become a Supplier Condition')}>Become a supplier</ButtonText>
                            </StyledButton>
                            <ExtraView extraviewbecomesupplier={true}>
                                <ExtraText extratextbecomesupplier={true}>Warning: You must have a mobile wallet
                                    (orange money, mtn mobile money,...) to become a provider. If your current number does
                                    not match your mobile wallet number, please change it here :
                                </ExtraText>
                                <TextLink onPress={()=>{
                                    navigation.navigate('Settings');
                                }}>
                                    <TextLinkContent>change number</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );

};

const styles = StyleSheet.create({
    text: {
        fontSize: hp('2.5%'),
        padding: 3,
    },
    forheight:{
        height: hp('97.8%'),
    },
});
export default BecomeSupplier;
