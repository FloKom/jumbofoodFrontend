/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import DropShadow from "react-native-drop-shadow";

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    Line,
    MsgBox,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
} from '../../components/styles';

//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';


const { secondary } = Colors;
const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

const ProductDesc = ({route, navigation}) => {
    const product = route.params
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto" />
                <InnerContainer >
                    <View style={styles.imgview}>
                        <Image
                            resizeMode="cover"
                            style={{ width: wp('100%'), height: 400 }}
                            source={require('../../assets/tomatoes.jpg')} />
                        {/*route.photoURL*/}
                    </View>
                    <DropShadow style={styles.shadowProp}>
                        <View style={styles.descview}>
                            <View>
                                <Text style={styles.productTitle}>Tomate noire de kribi</Text>
                            </View>
                            <View>
                                <Text style={styles.productsubtitle}> Vente en cageot</Text>
                            </View>
                            <View>
                                <Text style={styles.productdesc}>"Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur."</Text>
                            </View>
                            <View>
                                <Text style={styles.productprice}>2500 XAF</Text>
                            </View>
                            <StyledButton submitproductbutton={true}>
                                <LeftIcon>
                                    <FontAwesome5 name="cart-plus" size={25} color="white" style={{bottom:22}}/>
                                </LeftIcon>
                                <ButtonText style={{paddingLeft:15}}> Add to cart</ButtonText>
                            </StyledButton>
                        </View>
                    </DropShadow>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    forheight: {
        height: hp('100%'),
    },
    imgview: {
        marginTop: -30,
    },
    productTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: 2,
    },
    descview: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: wp('100%'),
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        marginTop: -20,
        marginBottom: 20,
    },
    productsubtitle: {
        marginBottom: 30,

    },
    productdesc: {
        textAlign: 'justify',
        marginBottom: 20,
    },
    productprice: {
        textAlign: 'justify',
        marginBottom: -20,
        fontWeight: 'bold',
        fontSize: 23,
        color: 'red',
    },

});

export default ProductDesc;
