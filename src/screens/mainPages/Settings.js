/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';

import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../../helpers/loader';
import { AuthContext } from '../../navigators/RootStack';
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
  Avatar,
} from '../../components/styles';

import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
const {secondary} = Colors;
const Settings = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [parameter, setparameter] = useState();
  const [loading, setloading] = useState(true);
  const { authContext } = useContext(AuthContext);
  useEffect(() => {
    async function getCredential(){
      try {
        let value = await AsyncStorage.getItem('credential')
        console.log('value', value)
        if(value !== null) {
          value = JSON.parse(value)
          setparameter(value)
          setloading(false)
        }
      } catch(e) {
        console.log(e)
      }
    }
   getCredential()
  }, []);

  if(loading){
    return <SplashScreen/>
}
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
      <StatusBar style="auto" />
        <InnerContainer>
        <SubTitle becomesupplier={true}>Settings</SubTitle>
          <Formik
            initialValues={{
              firstName: parameter.prenom,
              lastName: parameter.nom,
              phone: parameter.numero,
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => {
              console.log(values);
              navigation.navigate('MainPage');
            }}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <StyledFormArea>
                <View>
                <Avatar/>
                <RightIcon edit={true}><AntDesign color={secondary} name="edit" size={25}/></RightIcon>
                </View>
                <MyTextInput
                  label="Change your First Name"
                  icon="person"
                  placeholder="e.g: Junior Steven"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  keyboardType="default"
                />

                <MyTextInput
                  label="Change your Last Name"
                  icon="person"
                  placeholder="e.g: Mvondo"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  keyboardType="default"
                />

                <MyTextInput
                  label="Change your Phone Number"
                  icon="device-mobile"
                  placeholder="e.g: 243.419.657"
                  placeholderTextColor="gray"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType="phone-pad"
                />

                <MyTextInput
                  label="Enter your Old Password"
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
                <MyTextInput
                  label="Enter your New Password"
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
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Apply Changes</ButtonText>
                </StyledButton>
                <StyledButton onPress={()=>{authContext.signOut()}} logout={true}>
                  <ButtonText>Log out</ButtonText>
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
      <Octicons name={icon} size={25} />
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

export default Settings;
