/* eslint-disable prettier/prettier */
import {StatusBar} from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../navigators/RootStack';
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
} from './../components/styles';

//keyboard avoiding wrapper
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper'
const {secondary, tertiary} = Colors;
const Login = ({navigation}) => {
const [hidePassword, setHidePassword] = useState(true);
const [wrong, setwrong] = useState(false);
const { authContext } = useContext(AuthContext);
const SignupSchema = Yup.object().shape({
  phone: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required phone'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required password'),
});
  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer style={styles.forheight}>
      <StatusBar style="auto" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('./../assets/jumbofoodlogo.png')} />
        <SubTitle> Account Login</SubTitle>

        <Formik
          initialValues={{phone: '', password: ''}}
          validationSchema = {SignupSchema}
          onSubmit={async (values) => {
            console.log(values);
            authContext.signIn(values).then((res)=>{ 
            setwrong(!res)
          })
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
            <StyledFormArea>
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
              {errors.password && touched.password?(
             <Text style={{color:'red'}}>{errors.password}</Text>) : null}

              {wrong?<Text style={{color:'red'}}>wrong password or number</Text>:<Text></Text>}
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Sign In</ButtonText>
              </StyledButton>
              <Line />
              <MsgBox> Or </MsgBox>
              {/* <StyledButton google={true} onPress={handleSubmit}>
                <Fontisto name="google" color={tertiary} size={20} />
                 <ButtonText google={true}>Sign In With Google</ButtonText>
              </StyledButton> */}
              <ExtraView>
                <ExtraText> Don't have an account already ?</ExtraText>
                <TextLink onPress={() => navigation.navigate('SignUp')}>
                  <TextLinkContent>Singup</TextLinkContent>
                </TextLink>
              </ExtraView>
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

const styles = StyleSheet.create({
  forheight:{
    height: hp('100%'),
},
});

export default Login;
