/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer, StyledButton, LeftIcon, StyledTextInput, ButtonText, Colors, StyledInputLabel, RightIcon, StyledFormArea, PageLogoSpe, SubTitle } from '../../components/styles';

import { View, StyleSheet, Text} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import pickMultiple from '../../helpers/imagePicker';
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { postFormData } from '../../helpers/fetchData-helpers';
import { SplashScreen } from '../../helpers/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { secondary } = Colors;

const SubmissionForm = ({navigation}) => {

    const [value, setValue] = useState('rainy');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [date2, setDate2] = useState(new Date());
    const [open2, setOpen2] = useState(false);
    const [imagePicker, setimagePicker] = useState({ component: null, images: null });
    const [parameter, setParameter] = useState(null);
    useEffect(() => {
        async function getCredential(){
            let value = await AsyncStorage.getItem('credential')
            value = JSON.parse(value)
            setParameter(value)
        }
        getCredential()
    }, []);

    if(parameter == null){
        return <SplashScreen/>
    }
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="auto" />
                <InnerContainer style={{marginTop:18}}>
                    <Formik
                        initialValues={{
                            productName: '',
                            conditioning: '',
                            price: '',
                            description: '',
                        }}
                        onSubmit={async (values) => {
                            let form = new FormData()
                            for(let image of imagePicker.images){
                                form.append('image', image)
                            }
                            form.append('description', values.description)
                            form.append('produits', JSON.stringify({nomProduit:values.productName,saisonnier:value,periodicteAnnuel:date.toString().slice(4, 8) + '- ' + date2.toString().slice(4, 8) ,prix:values.price, conditionnement:values.conditioning}))
                            form.append('statut', 'en attente')
                            postFormData(form, 'producteur/' + parameter.producteurId + '/proposer').then((res)=>{
                                res.json().then((propo)=>{
                                    console.log(propo)
                                    navigation.navigate('Supplier Approuve')
                                })
                            })
                            .catch((e)=>{
                                console.log(e)
                            })

                        }}>
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Product Name"
                                    icon="person"
                                    placeholder="e.g: Tomatoes"
                                    placeholderTextColor="gray"
                                    onChangeText={handleChange('productName')}
                                    onBlur={handleBlur('productName')}
                                    value={values.productName}
                                />

                                <MyTextInput
                                    label="Conditioning"
                                    icon="person"
                                    placeholder="e.g: in kg, in crate"
                                    placeholderTextColor="gray"
                                    onChangeText={handleChange('conditioning')}
                                    onBlur={handleBlur('conditioning')}
                                    value={values.conditioning}
                                />

                                <MyTextInput
                                    label="Price"
                                    icon="lock"
                                    placeholder="e.g: 2000"
                                    placeholderTextColor="gray"
                                    onChangeText={handleChange('price')}
                                    onBlur={handleBlur('price')}
                                    value={values.price}
                                    keyboardType="phone-pad"
                                />

                                <StyledInputLabel>Show us your product</StyledInputLabel>
                                <StyledButton selectimg={true} onPress={() => pickMultiple(setimagePicker)}>
                                    <ButtonText buttontextspe={true}>Click here to select images</ButtonText>
                                </StyledButton>
                                <View>
                                    {imagePicker.component != null ? (imagePicker.component) : <Text style={{marginBottom:10, marginTop:5}}>no image selected</Text>}
                                </View>
                                
                                <MyTextInput
                                    textfield={true}
                                    multiline
                                    label="Description"
                                    icon="text-fields"
                                    placeholder="e.g: my tomatoes is from..."
                                    placeholderTextColor="gray"
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                />
                                <RadioButton.Group
                                    style={styles.radiocontainer}
                                    onValueChange={newValue => setValue(newValue)}
                                    value={value}>
                                    <StyledInputLabel>Your product is from which season?</StyledInputLabel>
                                    <View style={styles.radio}>
                                        <RadioButton 
                                            value="rainy" 
                                        />
                                        <Text style={styles.radiotext}>Rainy season</Text>
                                    </View>
                                    <View style={styles.radio}>
                                        <RadioButton 
                                            value="dry"
                                            />
                                        <Text style={styles.radiotext}>Dry season</Text>
                                    </View>
                                </RadioButton.Group>
                                <StyledInputLabel>What is the period of your harvest ?</StyledInputLabel>
                                <View style={styles.date}>
                                    <View style={styles.datecontainer}>
                                        <StyledButton
                                            datespe={true}
                                            onPress={() => setOpen(true)}>
                                            <ButtonText buttontextspe={true}>{date.toString().slice(4, 8)}</ButtonText>
                                            <DatePicker
                                                modal
                                                mode="date"
                                                open={open}
                                                date={date}
                                                onConfirm={(date) => {
                                                    setOpen(false);
                                                    setDate(date);
                                                }}
                                                onCancel={() => {
                                                    setOpen(false);
                                                }}
                                            />
                                        </StyledButton>
                                    </View>
                                    <View style={styles.datecontainer}>
                                        <StyledButton
                                            datespe={true}
                                            onPress={() => setOpen2(true)}>
                                            <ButtonText buttontextspe={true}>{date2.toString().slice(4, 8)}</ButtonText>
                                            <DatePicker
                                                modal
                                                mode="date"
                                                open={open2}
                                                date={date2}
                                                onConfirm={(date2) => {
                                                    setOpen2(false);
                                                    setDate2(date2);
                                                }}
                                                onCancel={() => {
                                                    setOpen2(false);
                                                }}
                                            />
                                        </StyledButton>
                                    </View>
                                </View>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Submit</ButtonText>
                                </StyledButton>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
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
                <Octicons name={icon} size={25} color={secondary} />
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

const styles = StyleSheet.create({

    mytext: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 100,
        marginBottom: 30,
    },
    radio: {
        flex: 1,
        flexDirection: 'row',
        margin: 2,
        alignItems: 'center',
    },

    datecontainer: {
        marginTop: -5,
        marginBottom: -8,
        width: 150,
    },
    date: {
        flex: 1,
        flexDirection: 'row',
        margin: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    radiotext: {
        fontSize: 16,

    },
});
export default SubmissionForm;
