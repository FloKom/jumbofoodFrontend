/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import Octicons from 'react-native-vector-icons/Octicons';
import { RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {WebView} from 'react-native-webview';
import html_script from '../htmlScript';
import { getData, getToken, innitPayment, postData } from '../../helpers/fetchData-helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../../helpers/loader';
import { SelectCountry } from 'react-native-element-dropdown';
import uuid from 'react-native-uuid';
import { StackActions } from '@react-navigation/native';

import {
    StyledContainer,
    InnerContainer,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
} from '../../components/styles';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
const { secondary } = Colors;
const Checkout = ({ navigation }) => {
    
    const [value0, setValue0] = useState('Pick-up point');
    const [paymentmethod, setPaymentmethod] = useState('Mobile Money');
    const [mobile, setMobile] = useState();
    const [value, setValue] = useState('Yaounde');
    const [loading, setloading] = useState(true);
    const [data, setData] = useState();
    const [coor, setCoor] = useState();
    const webref1 = useRef()
    const [parameter, setParameter] = useState();
    const [country, setCountry] = useState();
    const [pay, setPay] = useState(false);
    const script = (lat, lng) => {
        webref1.current.injectJavaScript(`map1.setView([`+ lat +`,`+ lng+`], 17)
                                      new L.Marker([`+ lat +`,`+ lng+`]).addTo(map1)`);
      }
    function identifyOperator(num){
        let orange = /(\+237)?(((655|656|657|658|659)(\d{6}))|(69)(\d{7}))/;
        let mtn = /(\+237)?(((650|651|652|653|654)(\d{6}))|(67)(\d{7}))/;
        if(orange.exec(num) != null){
            return "orange-money"
        }
        if(mtn.exec(num) != null){
            return "mtn-momo"
        }
        // console.log(orange.exec(num))
        // console.log(mtn.exec(num))
    }
    useEffect(() => {
        const getDatas =  async ()=>{
            let credential = await AsyncStorage.getItem('credential')
            credential = JSON.parse(credential)
            setMobile(identifyOperator(credential.numero))
            setParameter(credential)
        }
        getDatas()
    }, []);
    useEffect(() => {
        const getPointRama = async () =>{
            let local_data = await getData('pointRamassage')
            local_data = local_data.filter((item)=>item.ville == value)
            local_data = local_data.map((item)=>{
                return {
                    value:item.id,
                    lable:item.nom + ' ' +item.description + ' Tel: ' + item.numero,
                    image:{
                        uri:item.photoURL
                    }
                }
            })
            setData(local_data)
            setloading(false)
        }
        getPointRama() 
    }, [value])
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required first name'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required last name'),
        phone: Yup.string().required('Required phone number'),
        password: Yup.string()
            .min(5, 'Too Short! ')
            .required('Required password'),
        confirmPassword: Yup.string().min(5, 'Too Short! ')
            .required('Required password'),
    });
    if(loading){
        return <SplashScreen/>
    }
    return (
        <> 
            <KeyboardAvoidingWrapper>
            <StyledContainer style={{flex:1}}>
                <StatusBar style="auto" />
                <InnerContainer>
                    <Formik
                        initialValues={{
                            name: parameter.prenom,
                            lastName: parameter.nom,
                            nameBene: parameter.prenom,
                            lastNameBene: parameter.nom,
                            phone: parameter.numero,
                            phoneBene:parameter.numero
                        }}
                        onSubmit ={async(values)=>{
                             const {token} = await getToken()
                             console.log('token', token)
                             let cart = await AsyncStorage.getItem('pannier')
                             cart = JSON.parse(cart)
                             cart.clientId = parameter.clientId
                             cart.moyenPaiement = paymentmethod
                             cart.numBeneficiaire = values.phoneBene
                             cart.nomBeneficiaire = values.name
                             if(value0 == 'Pick-up point'){
                                cart.pointramassageId = country
                             }else{
                                cart.longitude = coor.lng
                                cart.latitude = coor.lat
                             }
                             if(paymentmethod === 'Mobile Money'){
                                innitPayment(token,values.phone,cart.prix, mobile, uuid.v4()).then(async(res)=>{
                                    console.log('res', res)
                                    if(res.success){
                                        const {pay_token} = res
                                        cart.pay_token = pay_token
                                        console.log('CART',cart)
                                        cart.numPayeur = values.phone
                                        postData(cart, 'pannier').then((res)=>res.json().then((pannier)=>{
                                            console.log("herrrrrrrrrreee")
                                            navigation.navigate('recap', {pannier})
                                        }))
                                    }else{
                                        console.log('echec de paiement')
                                        setPay(false)
                                    }
                                 })
                        
                             }else{
                                cart.moyenPaiement = 'cash on delivery'
                                postData(cart, 'pannier').then((res)=>res.json().then((pannier)=>{
                                    console.log("herrrrrrrrrreee")
                                    navigation.dispatch(
                                        StackActions.replace('recap', {pannier})
                                      );
                                }))
                                
                             }
                        }} 
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                            <StyledFormArea>
                                <View style={{ padding:8}}>
                                    <Text style={{ fontSize:18, color:secondary, fontWeight:'bold'}}>Information sur le destinataire</Text>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 20, padding:20, borderRadius:20 }}>
                                    <MyTextInput
                                        label="Name of the beneficiary"
                                        icon="person"
                                        placeholder="e.g: Junior Steven"
                                        placeholderTextColor="gray"
                                        onChangeText={handleChange('nameBene')}
                                        onBlur={handleBlur('nameBene')}
                                        value={values.nameBene}
                                        keyboardType="default"
                                    />
                                    {errors.firstName && touched.firstName ? (
                                        <Text style={{ color: 'red' }}>{errors.firstName}</Text>) : null}

                                    <MyTextInput
                                        label="Phone number of the beneficiary"
                                        icon="device-mobile"
                                        placeholder="e.g: 690771876"
                                        placeholderTextColor="gray"
                                        onChangeText={(phone)=>{
                                            setFieldValue('phoneBene', phone)
                                            identifyOperator(phone)
                                        }}
                                        onBlur={handleBlur('phoneBene')}
                                        value={values.phoneBene}
                                        keyboardType="phone-pad"
                                    />
                                   
                                    
                                </View>
                                
                                <View style={{ padding:8}}>
                                    <Text style={{ fontSize:18, color:secondary, fontWeight:'bold'}}>Information sur le payeur</Text>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 20, padding:20, borderRadius:20 }}>
                                
                                    <MyTextInput
                                            label="Nom de celui qui paye"
                                            icon="person"
                                            placeholder="e.g: Junior Steven"
                                            placeholderTextColor="gray"
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.name}
                                            keyboardType="default"
                                        
                                        />
                                    <RadioButton.Group
                                        style={styles.radiocontainer}
                                        onValueChange={newValue => setPaymentmethod(newValue)}
                                        value={paymentmethod}>
                                        <StyledInputLabel>Choose your payment method</StyledInputLabel>
                                        <View style={styles.radio}>
                                            <RadioButton value="Mobile Money" />
                                            <Text style={styles.radiotext}>Mobile Money</Text>
                                        </View>
                                        {paymentmethod=="Mobile Money"?
                                            <View style={{flexDirection:'row'}}>
                                                <MyTextInput
                                                placeholder="e.g: 690771876"
                                                placeholderTextColor="gray"
                                                onChangeText={(phone)=>{
                                                    setFieldValue('phone', phone)
                                                    setMobile(identifyOperator(phone))
                                                }}
                                                onBlur={handleBlur('phone')}
                                                value={values.phone}
                                                keyboardType="phone-pad"
                                                style={{marginTop:-20}}
                                            />
                                            {mobile === 'orange-money'?
                                                <Image
                                                style={{width: 70,height: 60, right:15, top:1, borderTopRightRadius:20, borderBottomRightRadius:20}}
                                                source={require('../../assets/orange-money.jpg')}
                                                />:mobile === 'mtn-momo'?
                                                <Image
                                                style={{width: 70,height: 60, right:15, top:1, borderTopRightRadius:20, borderBottomRightRadius:20}}
                                                source={require('../../assets/mtn-momo.jpg')}
                                                />:<Text></Text>
                                            }
                                            
                                            </View>:<Text></Text>
                                        }
                                        
                                        {/* <View style={styles.radio}>
                                            <RadioButton value="delivery payment" />
                                            <Text style={styles.radiotext}>Delivery payment</Text>
                                        </View> */}
                                    </RadioButton.Group>
                                </View>
                                <View style={{ padding:8}}>
                        <Text style={{ fontSize:18, color:secondary, fontWeight:'bold'}}>Information about delivery</Text>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 20, padding:20, borderRadius:20 }}>
                        <RadioButton.Group
                            style={styles.radiocontainer}
                            onValueChange={newValue => setValue(newValue)}
                            value={value}>
                            <StyledInputLabel>Where is located the beneficiary ?</StyledInputLabel>
                            <View style={styles.radio}>
                                <RadioButton value="Yaounde" />
                                <Text style={styles.radiotext}>Yaoundé</Text>
                            </View>
                            <View style={styles.radio}>
                                <RadioButton value="Douala" />
                                <Text style={styles.radiotext}>Douala</Text>
                            </View>
                        </RadioButton.Group>

                        <RadioButton.Group
                            style={styles.radiocontainer}
                            onValueChange={newValue0 => setValue0(newValue0)}
                            value={value0}>
                            <StyledInputLabel>Chose your delivery method</StyledInputLabel>
                            <View style={styles.radio}>
                                <RadioButton value="Pick-up point" />
                                <Text style={styles.radiotext}>Pick-up point</Text>
                            </View>
                            {value0 == 'Pick-up point'?
                                <SelectCountry

                                    style={styles.dropdown}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    placeholderStyle={styles.placeholderStyle}
                                    imageStyle={styles.imageStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    search
                                    maxHeight={200}
                                    value={country}
                                    data={data}
                                    valueField="value"
                                    labelField="lable"
                                    imageField="image"
                                    placeholder="Select your Pick-up point"
                                    searchPlaceholder="Search..."
                                    onChange={e => {
                                        setCountry(e.value);
                                    }}    
                                />
                                :<Text></Text>}
                            <View style={styles.radio}>
                                <RadioButton value="Home delivery" />
                                <Text style={styles.radiotext}>Home delivery</Text>
                            </View>
                            {/* {value0=='Home delivery'?<Text>helllo</Text>:<Text></Text>} */}
                        </RadioButton.Group>
                    </View>
                    <StyledButton onPress={handleSubmit}>
                        {pay?<ActivityIndicator/>:<Text></Text>}
                        <ButtonText>Pay Now</ButtonText>
                    </StyledButton>
                            </StyledFormArea>
                        )}
                    </Formik>   
                </InnerContainer>
                
            </StyledContainer>
        </KeyboardAvoidingWrapper>
        {value0 == 'Home delivery'?  
            <WebView 
                javaScriptEnabled={true}
                injectedJavaScript={``} 
                source={{html: html_script }} 
                style={styles.Webview}
                onMessage={(event) => {
                    console.log(event.nativeEvent.data)
                    setCoor(JSON.parse(event.nativeEvent.data))
                }}
            />      
            :<Text></Text>   }
        </>
        
    );
};
const MyTextInput = ({
    label,
    icon,
    isPassword,
    setHidePassword,
    hidePassword,
    ...props
}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={secondary} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons
                        name={hidePassword ? 'md-eye-off' : 'md-eye'}
                        size={20}
                        color={secondary}
                    />
                </RightIcon>
            )}
        </View>
    );
};
export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "#00000999"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: secondary,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    radio: {
        flex: 1,
        flexDirection: 'row',
        margin: 2,
        alignItems: 'center',
    },
    radiotext: {
        fontSize: 16,

    },
    Webview: {
        flex: 1
      },
    dropdown: {
        margin: 16,
        padding:5,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        
      },
      imageStyle: {
        width: 24,
        height: 24,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      
});
export default Checkout;
