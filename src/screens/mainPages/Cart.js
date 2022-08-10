/* eslint-disable prettier/prettier */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, PageTitle, StyledContainer } from '../../components/styles';

const Cart = () =>{
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="auto"/>
                <InnerContainer>
                <PageTitle>Cart</PageTitle>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

export default Cart;