/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer, StyledButton, LeftIcon, StyledTextInput, ButtonText, Colors, StyledInputLabel, RightIcon, StyledFormArea, PageLogoSpe, SubTitle} from '../../components/styles';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import pickMultiple from '../../helpers/imagePicker';
import { postData, postFormData } from '../../helpers/fetchData-helpers';
import { updateUser, updateUserSupplierId } from '../../helpers/db-helpers';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { secondary } = Colors;
const BecomeSupplierCondition = ({navigation}) => {

    const [loading, setloading] = useState();
    const [imagePicker, setimagePicker] = useState({component:null, images:null});
    const [parameter, setparameter] = useState({});
    const [fields, setFields] = useState([{ lieu: null }]);
    const [products, setProducts] = useState([{ nomProduit: null}]);
    useEffect(() => {
        console.log(products)
    }, [products]);
    function handleChanges(i, event) {
        console.log(i)
        const values = [...fields];
        values[i].lieu = event;
        setFields(values);
      }
    function handleAdd() {
        const values = [...fields];
        values.push({ lieu: null });
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }
    function handleChangesP(i, event) {
        console.log(i)
        const values = [...products];
        values[i].nomProduit = event;
        setProducts(values);    
    }
    function handleAddP() {
        const values = [...products];
        values.push({ nomProduit: null});
        setProducts(values);
    }
    function handleRemoveP(i) {
        const values = [...products];
        values.splice(i, 1);
        setProducts(values);
    }
    useEffect(() => {
        async function getCredential(){
            try {
              let value = await AsyncStorage.getItem('credential')
            //   console.log('value', value)
              if(value !== null) {
                value = JSON.parse(value)
                delete value.result
                delete value.statut
                delete value.producteurId
                setparameter(value)
                setloading(false)
              }
            } catch(e) {
              console.log(e)
            }
          }
         getCredential()
    }, []);
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="auto" />
                <InnerContainer>

                    <PageLogoSpe
                        resizeMode="cover"
                        source={require('../../assets/jumbofoodlogo.png')}
                    />
                    <SubTitle>Supplier form</SubTitle>
                    <Formik
                        initialValues={{
                            conditioning: 'Jumbo Food',
                            description: 'good tomatoes well tasty',
                        }}
                        onSubmit={async (values) => {
                            try{
                                let {id, ...tosend} = parameter
                                postData({...tosend}, 'producteur').then((res)=>{
                                    res.json().then(async (supplier)=>{
                                        console.log("bonjour test")
                                        console.log('supplier cree',supplier)
                                        // AsyncStorage.setItem('producteurId', supplier.id.toString())
                                        const a = await updateUserSupplierId(id,supplier.id)
                                        let result = parameter
                                        result.producteurId = supplier.id
                                        result.statut = 'en attente'
                                        await AsyncStorage.setItem('credential', JSON.stringify(result))
                                        console.log('aaa',a)
                                        let form = new FormData()
                                        for(let image of imagePicker.images){
                                            form.append('image', image)
                                        }
                                        form.append('plantation',JSON.stringify(fields))
                                        form.append('produits', JSON.stringify(products))
                                        form.append('description', values.description)
                                        form.append('statut', 'en attente')
                                        postFormData(form, 'producteur/' + supplier.id + '/proposer').then((res)=>{
                                            res.json().then(async (proposition)=>{
                                                console.log('proposition',proposition)
                                                await updateUser(id, 'en attente')
                                                navigation.dispatch(
                                                    StackActions.replace('waiting')
                                                  );
                                            })
                                            
                                            //update la Bd recuperer l'Id de lq proposition
                                        })
        
    
                                    })
                                })
                            }catch(e){
                                console.log(e)
                            }
                        }}>
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="What is the name of your business? (optional)"
                                    icon="store-mall-directory"
                                    placeholder="e.g: jumbo food"
                                    placeholderTextColor="gray"
                                    onChangeText={handleChange('conditioning')}
                                    onBlur={handleBlur('conditioning')}
                                    value={values.conditioning}
                                />
                                <StyledInputLabel>Where your plantation is located ?</StyledInputLabel>
                                <View>
                                    {fields.map((field, idx) => {
                                            return (
                                                <View key={`${field}-${idx}`}>
                                                    <MyTextInput
                                                        placeholder=""
                                                        value={field.lieu}
                                                        onChangeText={(text) => handleChanges(idx, text)}
                                                        icon="place"
                                                        placeholderTextColor="gray"
                                                    />
                                                    {idx == 0?<Text></Text>:
                                                    <View style={{alignItems:"flex-end"}}>
                                                        <TouchableOpacity
                                                            style={styles.remove}
                                                            onPress={() => handleRemove(idx)}
                                                        >
                                                            <AntDesign color={secondary} name="minuscircleo" size={20} />
                                                            <Text>remove this plantation</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    }
                                                </View>
                                                );
                                    })}
                                    <View style={{alignItems:"flex-end"}}>
                                        <TouchableOpacity
                                            style={styles.add}
                                            onPress={() => handleAdd()}
                                        >
                                            <AntDesign color={secondary} name="pluscircleo" size={20} />
                                            <Text>Add (click here to add new plantation)</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <StyledInputLabel>What are the products you are selling ?</StyledInputLabel>
                                <View>
                                    {products.map((product, idx) => {
                                     
                                            return (
                                                <View key={`${product}-${idx}`}>
                                                        <View  style={{flexDirection:'row', justifyContent:'space-between'}}>
                                                            <View style={{flex:1.25, marginRight:5}}>
                                                                <MyTextInput
                                                                    // label="Where your plantation is located ?"
                                                                    placeholder=""
                                                                    value={product.nomProduit}
                                                                    onChangeText={(text) => handleChangesP(idx, text)}
                                                                    icon="fiber-new"
                                                                    placeholderTextColor="gray"
                                                                />
                                                            </View>
                                                        </View>
                                                        {idx == 0?<Text></Text>:
                                                        <View style={{alignItems:"flex-end"}}>
                                                            <TouchableOpacity
                                                                style={styles.remove}
                                                                onPress={() => handleRemoveP(idx)}
                                                            >
                                                                <AntDesign color={secondary} name="minuscircleo" size={20} />
                                                                <Text>remove this product</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        }
                                                </View>
                                                );
                                    })}
                                    <View style={{alignItems:"flex-end"}}>
                                        <TouchableOpacity
                                            style={styles.add}
                                            onPress={() => handleAddP()}
                                        >
                                            <AntDesign color={secondary} name="pluscircleo" size={20} />
                                            <Text>Add (click here to add new product)</Text>
                                        </TouchableOpacity>
                                    </View>
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
                                <StyledInputLabel>Show us some of your products</StyledInputLabel>
                                <StyledButton selectimg={true} onPress={() => pickMultiple(setimagePicker)}>
                                    <ButtonText buttontextspe={true}>Click here to select images</ButtonText>
                                </StyledButton>
                                <View>
                                    {imagePicker.component != null ? (imagePicker.component) : <Text style={{marginBottom:10, marginTop:5}}>no image selected</Text>}
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
                <MaterialIcons name={icon} size={25} color={secondary} />
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
    button: {
        marginLeft: 40,
        marginRight: 40,
        fontWeight: 'bold',
    },
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

    dateContainer: {
        marginTop: 5,
        width: 100,
    },
    date: {
        flex: 1,
        flexDirection: 'row',
        margin: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    radiotext: {
        fontSize: 15,

    },
    remove: {
        alignItems: "center",
        padding: 10,
        flexDirection:"row",
        justifyContent:"space-between",
        width:190
      },
      add: {
        alignItems: "center",
        padding: 10,
        flexDirection:"row",
        justifyContent:"space-between",
        width:220
      },
});

export default BecomeSupplierCondition;
