/* eslint-disable prettier/prettier */
import {StatusBar} from 'expo-status-bar';
import React from 'react';

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,

  StyledButton,
  ButtonText,
  Line,
  HomeContainer,
  HomeImage,
  Avatar,
} from './../components/styles';


const Home = ({navigation}) => {

  return (
    <>
      <StatusBar style="auto" />
      <InnerContainer>
        <HomeImage
          resizeMode="cover"
          source={require('./../assets/cover.jpg')}
        />
        <HomeContainer>
          <StyledFormArea>
            <PageTitle> Welcome!</PageTitle>
            <SubTitle home={true}> David Nyongo</SubTitle>
            <SubTitle home={true}> +237 691214669</SubTitle>
            <Avatar />
            <Line />
            <StyledButton onPress={() => navigation.navigate('Login')}>
              <ButtonText>Log Out</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </HomeContainer>
      </InnerContainer>
    </>
  );
};

export default Home;
