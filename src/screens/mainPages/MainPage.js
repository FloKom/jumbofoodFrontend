/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer,Mainstyles, SquareCategoryButton, PageTitle, PageLogoSpe, CardContainer, CategoryButton, SubTitle, Colors, RightIcon } from '../../components/styles';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { getData } from '../../helpers/fetchData-helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../../helpers/loader';
import { Searchbar } from 'react-native-paper';


const styles = Mainstyles
let produits =  null
let categories = null
let packProduits = null
const MainPage = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() =>{
        let controller = new AbortController()
        let signal = controller.signal
        const getAllData = async ()=>{
            setTimeout(()=> controller.abort(), 5000)
            produits = await getData("produit", signal)
            categories = await getData("categorie")
            packProduits = await getData("packProduit")

            await AsyncStorage.setItem('produits', JSON.stringify(produits))
            await AsyncStorage.setItem('categories', JSON.stringify(categories))
            await AsyncStorage.setItem('packProduits', JSON.stringify(packProduits))
            //save data in database first make a delete all
        }
        getAllData().then(() =>{
            setLoading(false)
            console.log("data recupere du backend")
            console.log(produits, categories, packProduits)
        })
                    .catch(async (e)=>{
                        //get data from Asyncstorage
                        console.log(e)
                        console.log('echec de recuperation sur l\'API')
                        produits = await AsyncStorage.getItem('produits')
                        produits = JSON.parse(produits)
                        packProduits = await AsyncStorage.getItem('packProduits')
                        packProduits = JSON.parse(packProduits)
                        categories = await AsyncStorage.getItem('categories')
                        categories = JSON.parse(categories)
                        console.log(produits, categories, packProduits)
                        setLoading(false)
                    })
    }, []);
    if(loading){
        return <SplashScreen/>
    }
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer style={styles.forheight}>
                <StatusBar style="auto" />
                <InnerContainer>
                    <Searchbar
                        style={styles.search}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                    <View style={styles.header}>
                        <SubTitle mainpagesubspe={true}>Packs</SubTitle>
                        <TouchableOpacity onPress={() => navigation.navigate('All packs', {...packProduits})}><Text >See All &gt;</Text></TouchableOpacity>
                    </View>
                    <CardContainer
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        {packProduits.map((item, id)=>{
                            return (
                                <CategoryButton key={`${item}-${id}`} onPress={() => { console.log('test1') }}
                                    activeOpacity={0.6}>
                                    <ImageBackground style={styles.img1} source={item.photoURL}>
                                        <Text style={styles.title}> {item.nom} </Text>
                                    </ImageBackground>
                                </CategoryButton>
                            )
                        })}
                        <CategoryButton onPress={() => { console.log('test1') }}
                            activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/pack.jpg')}>
                                <Text style={styles.title}> </Text>
                            </ImageBackground>
                        </CategoryButton>
                        <CategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/family.jpg')}>
                                <Text style={styles.title}> Family Pack </Text>
                            </ImageBackground>
                        </CategoryButton>
                        <CategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/love.jpeg')}>
                                <Text style={styles.title}> Lovely Pack </Text>
                            </ImageBackground>
                        </CategoryButton>
                        <CategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/solo.jpg')}>
                                <Text style={styles.title}> Solo Pack </Text>
                            </ImageBackground>
                        </CategoryButton>
                    </CardContainer>
                    {categories.map((item, id)=>{
                        let subCategories = categories.categories.map((item,id)=>{
                            return (
                                <SquareCategoryButton key={`${item}-${id}`} activeOpacity={0.6}  onPress={() => navigation.navigate('All categories', {...item})}>
                                    <ImageBackground style={styles.img1} source={item.photoURL}>
                                        <Text style={styles.title2}>{item.nom}</Text>
                                    </ImageBackground>
                                </SquareCategoryButton>
                            )
                        })
                        return (
                            <>
                                <View key={`${item}-${id}`} style={styles.header}>
                                    <SubTitle mainpagesubspe={true}>{item.nom}</SubTitle>
                                    <TouchableOpacity onPress={() => navigation.navigate('All categories', {...item})}><Text >See All &gt;</Text></TouchableOpacity>
                                </View>
                                <CardContainer
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}>
                                    {subCategories}
                                </CardContainer>
                            </>
                        )
                    })}
                    <View style={styles.header}>
                        <SubTitle mainpagesubspe={true}>Food products</SubTitle>
                        <TouchableOpacity onPress={() => navigation.navigate('All categories')}><Text >See All &gt;</Text></TouchableOpacity>
                    </View>
                    <CardContainer
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        <SquareCategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/fruits.jpg')}>
                                <Text style={styles.title2}> Fruits</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                        <SquareCategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/vegetable.jpg')}>
                                <Text style={styles.title2}>Vegetables</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                        <SquareCategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/tubers.jpg')}>
                                <Text style={styles.title2}>Feculents</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                    </CardContainer>
                    <View style={styles.header}>
                        <SubTitle mainpagesubspe={true}>Processed products</SubTitle>
                        <TouchableOpacity onPress={() => navigation.navigate('All categories')}><Text >See All &gt;</Text></TouchableOpacity>
                    </View>
                    <CardContainer
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        <SquareCategoryButton
                            activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/tea.jpg')}>
                                <Text style={styles.title2}>Tea</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                        <SquareCategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/miel.jpg')}>
                                <Text style={styles.title2}>Honey</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                        <SquareCategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/spices.jpg')}>
                                <Text style={styles.title2}>Spices</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                        <SquareCategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/confiture.jpg')}>
                                <Text style={styles.title2}>Jam</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                    </CardContainer>

                    <View style={styles.header}>
                        <SubTitle mainpagesubspe={true}>All products</SubTitle>
                        <TouchableOpacity onPress={() => navigation.navigate('All products')}><Text >See All &gt;</Text></TouchableOpacity>
                    </View>
                    <CardContainer
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                            {produits.map((item, id)=>{
                                return (
                                    <SquareCategoryButton
                                        onPress={() => navigation.navigate('product description', {
                                            ...item
                                        })}
                                        key={`${item}-${id}`}
                                        activeOpacity={0.6}>
                                        <ImageBackground style={styles.img1} source={item.photoURL}>
                                            <Text style={styles.title2}>{item.nom}</Text>
                                        </ImageBackground>
                                    </SquareCategoryButton>
                                )
                            })}
                    </CardContainer>
                    <View style={styles.header}>
                        <SubTitle mainpagesubspe={true}>All products</SubTitle>
                        <TouchableOpacity onPress={() => navigation.navigate('All products')}><Text >See All &gt;</Text></TouchableOpacity>
                    </View>
                    <CardContainer
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        <SquareCategoryButton onPress={() => navigation.navigate('product description')}
                            activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/tomatoes.jpg')}>
                                <Text style={styles.title2}>Tomatoes</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                        <SquareCategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/okok.jpeg')}>
                                <Text style={styles.title2}>Okok</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                        <SquareCategoryButton activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/bobolo.jpg')}>
                                <Text style={styles.title2}>Bobolo</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                        <SquareCategoryButton  activeOpacity={0.6}>
                            <ImageBackground style={styles.img1} source={require('../../assets/mitumba.jpg')}>
                                <Text style={styles.title2}>Mitumba</Text>
                            </ImageBackground>
                        </SquareCategoryButton>
                    </CardContainer>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const styless = StyleSheet.create({
    forheight:{
        height: hp('97.8%'),
    },
    search:{
        borderRadius: 30,
        backgroundColor: '#f7ffff',
    },
});
export default MainPage;
