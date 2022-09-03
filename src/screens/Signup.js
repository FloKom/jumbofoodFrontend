/* eslint-disable prettier/prettier */
import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, StyleSheet, Modal, Pressable, Button, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import { AuthContext } from '../navigators/RootStack';
import * as Yup from 'yup';
import { postData } from '../helpers/fetchData-helpers';
import { updateClientId } from '../helpers/db-helpers';
// import pickMultiple from '../helpers/imagePicker';
import {
  StyledContainer,
  InnerContainer,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
  PageLogoSpe,
  LineSpe,
} from './../components/styles';
import { addUser } from '../helpers/db-helpers';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
let message = ''
let route = ''
const {secondary} = Colors;
const Signup = ({navigation}) => {
  const { authContext } = useContext(AuthContext);
const [hidePassword, setHidePassword] = useState(true);
const [modalVisible, setModalVisible] = useState(false);
const [credential, setCredential] = useState({phone:null, password:null});
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
  confirmPassword:Yup.string().min(5, 'Too Short! ')
                              .required('Required password'),
});
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
      <StatusBar style="auto" />
        <InnerContainer>
          <PageLogoSpe
            resizeMode="cover"
            source={require('./../assets/jumbofoodlogo.png')}
          />
          <SubTitle> Account Signup</SubTitle>

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              phone: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema= {SignupSchema}
            onSubmit={async (values) => {
              console.log(values);
              const {firstName, lastName, phone, password} = values
              if(values.password !== values.confirmPassword){
                console.log('different')
                message = "Passwords are different! Write the same password"
                route = "SignUp";
                setModalVisible(true)  
               }else{
                
                addUser(firstName, lastName, password, phone).then((res)=>{
                  console.log(res)
                  if(res){
                    console.log("sucess")
                    setCredential({phone, password})
                    message = "Successfully created account!"
                    route = null
                    setModalVisible(true)

                    let client = {
                      nom:lastName,
                      prenom:firstName,
                      numero:phone,
                      motPasse:password
                    }
                    postData(client, 'client')
                      .then((result)=>result.json().then((client)=>{
                          updateClientId(res,client.id)
                            }))
                    
                  }
                  else{
                    console.log("sucess")
                    message = "An account already have this number please change the number!"
                    route = "SignUp"
                    setModalVisible(true)
                    
                  }
                })
                console.log('la suite') 
              }
              
                          // .catch(async()=>{
                          //   let toSend = JSON.parse(await getElement('toSend'))
                          //   toSend.push(client)
                          //   await AsyncStorage.setItem('toSend', JSON.stringify(toSend))
                          // })
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
              <StyledFormArea>
                <MyTextInput
                  label="First Name"
                  icon="person"
                  placeholder="e.g: Junior Steven"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  keyboardType="default"
                />
                {errors.firstName && touched.firstName ? (
             <Text style={{color:'red'}}>{errors.firstName}</Text>) : null}

                <MyTextInput
                  label="Last Name"
                  icon="person"
                  placeholder="e.g: Mvondo"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  keyboardType="default"
                />
                {errors.lastName && touched.lastName ? (
             <Text style={{color:'red'}}>{errors.lastName}</Text>) : null}
                <MyTextInput
                  label="Phone Number"
                  icon="device-mobile"
                  placeholder="e.g: 243.419.657"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType="phone-pad"
                />
                {errors.phone && touched.phone ? (
             <Text style={{color:'red'}}>{errors.phone}</Text>) : null}

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * *"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {errors.password && touched.password ? (
             <Text style={{color:'red'}}>{errors.password}</Text>) : null}
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * *"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
             <Text style={{color:'red'}}>{errors.confirmPassword}</Text>) : null}
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Sign Up</ButtonText>
                </StyledButton>
                <LineSpe />
                <ExtraView>
                  <ExtraText> Already have an account ? </ExtraText>
                  <TextLink>
                    <TextLinkContent onPress = {() => navigation.navigate('SignIn')}>Sign In</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
          <View style={styles.centeredView}>
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{message}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            if(route!=null){
              navigation.navigate(route);
            }else{
              authContext.signIn(credential)
            }
            setModalVisible(!modalVisible)
          }}
        >
          <Text style={styles.textStyle}>OK</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
</View>
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
  }
});
export default Signup;
