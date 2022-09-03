/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, StyleSheet, Image, Pressable,Modal} from 'react-native';
import DropShadow from "react-native-drop-shadow";
import ImageColors from 'react-native-image-colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {
    StyledContainer,
    InnerContainer,
    LeftIcon,
    Colors,
    StyledButton,
    ButtonText,
} from '../../components/styles';

//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { SplashScreen } from '../../helpers/loader';

const { secondary } = Colors;
const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

const ProductDesc = ({route, navigation}) => {
    const [loading, setloading] = useState(true);
    const [produit, setproduit] = useState({});
    const [color, setcolor] = useState('red');
    const [value, setValue] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const showToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Info',
          text2: value + ' '+ produit.nom + ' was successfully added to cart!'
        });
      }
    useEffect(() => {
        const operation = async ()=>{
            const result = await ImageColors.getColors(route.params.product.photoURL, {
                fallback: '#228B22',
                cache: true,
                key: route.params.product.photoURL,
              })
            setcolor(result.dominant)
            setproduit(route.params.product)
            setloading(false)
        }
        operation()
    }, []);
    async function updateCart(){
        let pannier = null
        // await AsyncStorage.removeItem('pannier')
        pannier = await AsyncStorage.getItem('pannier')
        console.log('string', pannier)
        if(pannier != null){
            pannier = JSON.parse(pannier)
            //verifier si ca existe pas deja
            if(pannier.ligneProduits == undefined){
                pannier.ligneProduits = []
            }
            let ligne = pannier.ligneProduits.filter((item)=> item.produitId == produit.id)
            if(ligne.length != 0){
                console.log('ligne', ligne)
                ligne[0].quantite = parseInt(ligne[0].quantite)
                ligne[0].prix = parseFloat(ligne[0].prix)
                ligne[0].quantite += value
                ligne[0].prix += value*produit.prix
                pannier.ligneProduits = pannier.ligneProduits.map((item)=>{
                    if(item.produitId == produit.id){
                        return ligne[0]
                    }
                    return item
                })

            }else{
                pannier.ligneProduits.push({
                    produitId:produit.id,
                    quantite:value,
                    prix:value*produit.prix
                })
            }
            pannier.prix = parseFloat(pannier.prix)
            pannier.prix = pannier.prix + value*produit.prix
            await AsyncStorage.setItem('pannier', JSON.stringify(pannier))
        }
        else{
            pannier = {
                prix:0,
                ligneProduits:[],
            }
            //client id l'obtenir
            pannier.prix = pannier.prix + value*produit.prix 
            pannier.ligneProduits.push({
                produitId:produit.id,
                quantite:value,
                prix:value*produit.prix
            })
            pannier = JSON.stringify(pannier)
            console.log('new', pannier)
            AsyncStorage.setItem('pannier', pannier)
        }
        console.log(pannier)
    }
    if(loading){
        return <SplashScreen/>
    }
    return (
        <>
          <Modal
            statusBarTranslucent={true}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  setModalVisible(!modalVisible);
              } }
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>{value} {produit.conditionnement} of {produit.nom} were added successfully to cart. What do you want to do now?</Text>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Pressable
                            style={{...styles.button, marginRight:15}}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.navigate('Home')
                                }
                            }
                        >
                            <Text style={styles.textStyle}>Add new product to cart</Text>
                        </Pressable>
                        <Pressable
                            style={{...styles.button}}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                navigation.navigate('Cart')
                            }}
                        >
                            <Text style={styles.textStyle}>End my order and pay</Text>
                        </Pressable>
                      </View>
                      
                  </View>
              </View>
          </Modal>
       
        <KeyboardAvoidingWrapper>
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto" />
                <InnerContainer >
                    <View style={styles.imgview}>
                        <Image
                            resizeMode="cover"
                            style={{ width: wp('100%'), height: 400 }}
                            source={{uri:produit.photoURL}} />
                        {/*route.photoURL*/}
                    </View>
                    <DropShadow style={styles.shadowProp}>
                        <View style={styles.descview}>
                            <View>
                                <Text style={styles.productTitle}>{produit.nom}</Text>
                            </View>
                            <View>
                                <Text style={styles.productsubtitle}> {produit.conditionnement}</Text>
                            </View>
                            <View>
                                <Text style={styles.productdesc}>{produit.description}</Text>
                            </View>
                            <View>
                                <Text style={{...styles.productprice, color}}>{produit.prix} XAF</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View>
                                    <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Quantity :</Text>
                                </View>
                                <View style={styles.counterStyle}>
                                    <Icon.Button
                                        name="ios-remove"
                                        size={15}
                                        color="#fff"
                                        backgroundColor="white"
                                        style={{
                                        borderRadius: 15,
                                        backgroundColor: 'red',
                                        height: 30,
                                        width: 30,
                                        }}
                                        onPress={()=>
                                            {
                                                if(value == 1){
                                                    return
                                                }
                                                setValue(value - 1)
                                            }
                                        }
                                        iconStyle={{ marginRight: 0 }}
                                    />

                                    <Text>{value}</Text>
                                    <Icon.Button
                                        name="ios-add"
                                        size={15}
                                        color="#fff"
                                        backgroundColor="#fff"
                                        style={{
                                        borderRadius: 15,
                                        backgroundColor: secondary,
                                        height: 30,
                                        width: 30,
                                        }}
                                        onPress={()=>setValue(value + 1)}
                                        iconStyle={{ marginRight: 0 }}
                                    />
                                </View>
                            </View>
                            {/* <View style={{flexDirection:'row', justifyContent:'space-between', width:'40%'}}>
                                <Text style={{fontSize:20, fontWeight:'bold', color:'black'}}>Total :</Text>
                                <Text style={{fontSize:20, fontWeight:'bold', color:color}}>{ value*produit.prix }</Text>
                            </View> */}
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <StyledButton
                                    style={{flex:1.25, marginRight:15}} 
                                    onPress={async ()=>{
                                        await updateCart()
                                        // setModalVisible(true)
                                        //tosat message
                                        showToast()
                                        navigation.navigate('Home')
                                        }
                                    } 
                                    submitproductbutton={true}>
                                    <LeftIcon>
                                        <FontAwesome5 name="cart-plus" size={25} color="white" style={{bottom:22}}/>
                                    </LeftIcon>
                                    <ButtonText> Add to cart</ButtonText>
                                </StyledButton>
                                <StyledButton 
                                    style={{flex:1}}
                                    onPress={async ()=>{
                                        await updateCart()
                                        showToast()
                                        navigation.navigate('cart')
                                    }}
                                submitproductbutton={true}
                                
                                >
                                    <LeftIcon>
                                        <FontAwesome5 name="dollar-sign" size={25} color="white" style={{bottom:22}}/>
                                    </LeftIcon>
                                    <ButtonText> Buy Now</ButtonText>
                                </StyledButton>
                            </View>
                        </View>
                    </DropShadow>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    </>
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
        marginBottom: 20,

    },
    productdesc: {
        textAlign: 'justify',
        marginBottom: 20,
    },
    productprice: {
        textAlign: 'justify',
        marginBottom: 30,
        fontWeight: 'bold',
        fontSize: 23,
        color: 'red',
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
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
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
      counterStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:'40%'
      },

});

export default ProductDesc;
