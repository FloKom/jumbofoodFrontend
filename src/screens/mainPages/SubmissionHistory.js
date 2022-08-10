/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer, RightIcon, PageLogoSpe, PageTitle } from '../../components/styles';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getData, deleteData } from '../../helpers/fetchData-helpers';
import { SplashScreen } from '../../helpers/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SubmissionHistory = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [reload, setreload] = useState(0);
    useEffect(() => {
        AsyncStorage.getItem('credential').then((value)=>{
            value = JSON.parse(value)
            getData('producteur/' + value.producteurId +'/proposer').then((propositions)=>{
                console.log(propositions)
                setData(propositions)
                setLoading(false)
            })
        })
        
    }, [reload]);
    if(loading){
        return <SplashScreen/>
    }
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style = {(data == null || data == [])?styles.forheight:{}} >
                <StatusBar style="auto" />
                <InnerContainer>
                    <PageLogoSpe
                        resizeMode="cover"
                        source={require('../../assets/jumbofoodlogo.png')}
                    />
                    <PageTitle>Submission History</PageTitle>
                    <View style={styles.pagedesc}>
                        <Text style={styles.textdesc}>Here is the history of the products that you've submitted since you're a supplier.</Text>
                    </View>
                    <View style={styles.CardContainer}>
                    {data.map((propo, id)=>{
                        let produits = propo.produitpropose.map((produit, idx)=>{
                            return(
                                <View key={`${produit}-${idx}`} style={{marginTop:10}}>
                                        <Text> Product Name : {produit.nomProduit} </Text>
                                        <Text> Conditioning : {produit.conditionnement}</Text>
                                        <Text> Price : {produit.prix}</Text>
                                </View>
                            )
                        })
                        let plantations = propo.plantation != null?(
                            propo.plantation.map((plan)=>{
                                return (
                                    <Text>{plan.lieu}</Text>
                                )
                            })
                        ):null
                        return (
                            <View style={styles.bigcontainer} key={`${propo}-${id}`}>
                                <View>
                                    <Text style={styles.carddate}> {propo.createdAt} </Text>
                                    <RightIcon
                                    onPress={()=>{
                                        deleteData('proposition/' + propo.id).then(()=>{
                                            //afficher une modal
                                            setreload(reload + 1)
                                        }) 
                                    }}
                                    delete={true}>
                                        <AntDesign
                                        color="red"
                                        name="delete"
                                        size={25}/>
                                        </RightIcon>
                                </View>
                                <View style={styles.Card}>
                                    {produits}
                                    <View>
                                        <Text>Statut: {propo.statut}</Text>
                                    </View>
                                    <View>
                                        <Text>Description : {propo.description}</Text>
                                    </View>
                                    <Text>You have uploaded {propo.photo.length} image(s) on this proposition</Text>
                                    {propo.platation != null? 
                                        (<View style={styles.Card}>
                                            {plantations}
                                        </View>):<Text></Text>
                                    }
                                </View>
                                
                            </View>)
                    })
            }
                    </View>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({

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
    forheight:{
        height: hp('100%'),
    },
});


export default SubmissionHistory;
