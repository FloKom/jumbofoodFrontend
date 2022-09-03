/* eslint-disable prettier/prettier */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer, RightIcon, PageLogoSpe, PageTitle } from '../../components/styles';
import { StyleSheet, Text, View,ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';


const CartHistory = () => {
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto" />
                <InnerContainer>
                    <View style={styles.pagedesc}>
                        <Text style={styles.textdesc}>Here is the history of the products that you've bought.</Text>
                    </View>
                    <View style={styles.CardContainer}>
                        <View style={styles.bigcontainer} >
                            <View>
                                <Text style={styles.carddate}> 27 April 2022 </Text>
                                <RightIcon
                                onPress={() => { console.log('test1'); }}
                                delete={true}>
                                    <AntDesign
                                    color="red"
                                    name="delete"
                                    size={25}/>
                                    </RightIcon>
                            </View>
                            <View style={styles.Card}>
                                <View>
                                    <Text> All Products : Banane (1), ananas (2), cube(3), ginger (20) </Text>
                                    <Text> Total : </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.bigcontainer} >
                            <View>
                                <Text style={styles.carddate}> 20 April 2022 </Text>
                                <RightIcon
                                onPress={() => { console.log('test1'); }}
                                delete={true}>
                                    <AntDesign
                                    color="red"
                                    name="delete"
                                    size={25}/>
                                    </RightIcon>
                            </View>
                            <View style={styles.Card}>
                                <View>
                                    <Text> All Products : </Text>
                                    <Text> Price : </Text>
                                </View>
                            </View>
                            <View style={styles.Card}>
                                <View>
                                    <Text> All Products : </Text>
                                    <Text> Price : </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.bigcontainer} >
                            <View>
                                <Text style={styles.carddate}> 20 April 2022 </Text>
                                <RightIcon
                                onPress={() => { console.log('test1'); }}
                                delete={true}>
                                    <AntDesign
                                    color="red"
                                    name="delete"
                                    size={25}/>
                                    </RightIcon>
                            </View>
                            <View style={styles.Card}>
                                <View>
                                    <Text> All Products: </Text>
                                    <Text> Price : </Text>
                                </View>
                            </View>
                            <View style={styles.Card}>
                                <View>
                                    <Text> All Products: </Text>
                                    <Text> Price : </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    forheight: {

    },
    pagedesc: {
        marginTop: 30,
        marginBottom: 40,
    },
    textdesc: {
        textAlign: 'center',
        fontSize: hp('2.5%'),
    },
    carddate: {
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        paddingBottom: 10,
    },
    Card: {
        backgroundColor: '#EAF6F9',
        width: wp('85%'),
        borderRadius: 20,
        padding: 10,
        marginBottom: 5,

    },
    bigcontainer: {
        marginBottom: 20,
        borderWidth:0.9,
        borderRadius: 20,
        padding: 10,
    },
});


export default CartHistory;
