/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { InnerContainer, StyledContainer,  StyledFormArea, PageTitle, ExtraView, TextLink, TextLinkContent} from '../../components/styles';
import { Image, StyleSheet, Text, View } from 'react-native';

import {heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CartEmpty = ({navigation}) => {

    return (
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto"/>
                <InnerContainer >
                        <StyledFormArea becomesupplierformarea={true}>
                            <Text style={styles.text}>Your cart is empty. Add something to cart and you'll see it here.
                            Click on the button below to see your history.
                            </Text>
                            <View>
                            <Image
                            style={{ height: 350, width: 325, top:60, marginLeft: 'auto', marginRight: 'auto' }}
                            source={require('../../assets/cartwithproducts.png')}
                        />
                    </View>
                <ExtraView
                    style={{ top:70  }}>
                  <TextLink onPress={() => navigation.navigate('CartHistory')}>
                    <TextLinkContent>See my history</TextLinkContent>
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
        marginTop:40,
        padding: 3,
    },
    forheight:{
        height: hp('100%'),
    },
});
export default CartEmpty;