/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { CardContainer, CategoryButton, Colors, InnerContainer, PageTitle, RightIcon, StyledContainer, StyledTextInput } from '../../components/styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import { SplashScreen } from '../../helpers/loader';
const SeeAllPack = ({route, navigation}) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [packProduits, setpackProduits] = useState({});
    const [loading, setloading] = useState(true);
    useEffect(() => {
        setpackProduits(route.params.packProduits)
        setloading(false)
    }, []);
    useEffect(() => {
        console.log(packProduits)
    }, [packProduits]);
    const { secondary } = Colors;
    if(loading){
        return <SplashScreen/>
    }
    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="auto" />
            <InnerContainer>
               
                <Searchbar
                        style={styles.search}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                    
                <CardContainer CardContainerspe ={true}>
                    {packProduits.map((item, id)=>{
                        return (
                            <CategoryButton
                                key={`${item}-${id}`}
                                Categoryspe ={true}
                                onPress={() => { navigation.navigate('Product pack Description', {packProduit:item, name:item.nom})}}
                                activeOpacity={0.6}>
                                <ImageBackground style={styles.img1} source={{uri:item.photoURL}}>
                                    <Text style={styles.title}> {item.nom}</Text>
                                </ImageBackground>
                            </CategoryButton>
                        )
                    })}
                    {/* <CategoryButton
                    Categoryspe ={true}
                    onPress={() => { console.log('test1') }}
                        activeOpacity={0.6}>
                        <ImageBackground style={styles.img1} source={require('../../assets/pack.jpg')}>
                            <Text style={styles.title}> </Text>
                        </ImageBackground>
                    </CategoryButton>
                    <CategoryButton
                    Categoryspe ={true}
                    activeOpacity={0.6}>
                        <ImageBackground style={styles.img1} source={require('../../assets/family.jpg')}>
                            <Text style={styles.title}> Family Pack </Text>
                        </ImageBackground>
                    </CategoryButton>
                    <CategoryButton
                    Categoryspe ={true}
                    activeOpacity={0.6}>
                        <ImageBackground style={styles.img1} source={require('../../assets/love.jpeg')}>
                            <Text style={styles.title}> Lovely Pack </Text>
                        </ImageBackground>
                    </CategoryButton>
                    <CategoryButton
                    Categoryspe ={true}
                    activeOpacity={0.6}>
                        <ImageBackground style={styles.img1} source={require('../../assets/solo.jpg')}>
                            <Text style={styles.title}> Solo Pack </Text>
                        </ImageBackground>
                    </CategoryButton> */}
                </CardContainer>
            </InnerContainer>
            </StyledContainer>
            </KeyboardAvoidingWrapper>

        );
};

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
    },
    img1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 25,
        opacity: 0.95,
    },
    title2: {
        color: 'white',
        fontSize: 16,
        padding: 20,
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: -65,
        marginTop: -25,
    },
    forheight: {
        height: hp('100%'),
    },
    search:{
        borderRadius: 30,
        backgroundColor: '#f7ffff',
    },
});

export default SeeAllPack;
