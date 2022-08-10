/* eslint-disable prettier/prettier */
import React from 'react';
import { InnerContainer, RightIcon, StyledContainer, SubTitle } from '../../components/styles';
import { Searchbar } from 'react-native-paper';
import {widthPercentageToDP as wp,  heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SeeAllCard from './SeeAllCat';
import SeeAllProd from './SeeAllProd';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../components/styles';




const SeeAll = () => {
    const {secondary} = Colors;
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);


    return (
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto" />
                <InnerContainer>
                    <SubTitle becomesupplier={true}>All Products</SubTitle>
                    <RightIcon search={true}><Feather color={secondary} name="shopping-cart" size={25} /></RightIcon>
                    <Searchbar
                        style={styles.search}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                    <SeeAllProd/>
                </InnerContainer>
            </StyledContainer>

    );
};

const styles = StyleSheet.create({
    forheight: {
        height: hp('100%'),
    },
    search: {
        borderRadius: 30,
        backgroundColor: '#f7ffff',
    },

});

export default SeeAll;
