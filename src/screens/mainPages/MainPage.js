/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer, SquareCategoryButton, PageTitle, PageLogoSpe, CardContainer, CategoryButton, SubTitle, Colors, RightIcon } from '../../components/styles';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { getData } from '../../helpers/fetchData-helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../../helpers/loader';
import { Searchbar } from 'react-native-paper';

const MainPage = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [produits, setproduits] = useState({});
    const [categories, setcategories] = useState({});
    const [packProduits, setpackProduits] = useState({});
    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {
        console.log(produits, '\n \n')
        console.log(categories, '\n \n')
        console.log(packProduits, '\n \n')
    }, [produits,categories,packProduits]);
    useEffect(() =>{
        let controller = new AbortController()
        let signal = controller.signal
        setTimeout(()=> controller.abort(), 10000)
        const getAllData = async ()=>{
            let products = await getData("produit", signal)
            let catego = await getData("categorie")
            let packProducts = await getData("packProduit")
            setcategories(catego)
            setpackProduits(packProducts)
            setproduits(products)
            await AsyncStorage.setItem('produits', JSON.stringify(products))
            await AsyncStorage.setItem('categories', JSON.stringify(catego))
            await AsyncStorage.setItem('packProduits', JSON.stringify(packProducts))
        }
        getAllData().then(() =>{
            setLoading(false)
            console.log("data recupere du backend")
        })
                    .catch(async (e)=>{
                        //get data from Asyncstorage
                        console.log(e)
                        console.log('echec de recuperation sur l\'API')
                        let products = await AsyncStorage.getItem('produits')
                        products = JSON.parse(products)
                        setproduits(products)
                        let packProducts = await AsyncStorage.getItem('packProduits')
                        packProducts = JSON.parse(packProducts)
                        setpackProduits(packProducts)
                        let catego = await AsyncStorage.getItem('categories')
                        catego = JSON.parse(catego)
                        setcategories(catego)
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
                        <TouchableOpacity onPress={() => navigation.navigate('All packs', {packProduits})}><Text >See All &gt;</Text></TouchableOpacity>
                    </View>
                    <CardContainer
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        {packProduits.map((packProduit, id)=>{
                            const image = {uri:packProduit.photoURL.toString()}
                            return (
                                <CategoryButton key={`${packProduit}-${id}`} onPress={() => {navigation.navigate('Product pack Description',{packProduit, name:packProduit.nom})}}
                                    activeOpacity={0.6}>
                                    <ImageBackground style={styles.img1} resizeMode="cover" source={{uri:packProduit.photoURL}}>
                                        <Text style={styles.title}> {packProduit.nom} </Text>
                                    </ImageBackground>
                                </CategoryButton>
                            )
                        })}
                       
                    </CardContainer>
                    {categories.map((category, id)=>{
                        let subCategories = category.other_categorieproduit.map((subCategory,idx)=>{
                            return (
                                <SquareCategoryButton key={`${subCategory}-${idx}-${id}`} activeOpacity={0.6} onPress={() => navigation.navigate('All products', {produits:subCategory.produit, name:subCategory.nom})}>
                                    <ImageBackground style={styles.img1} source={{uri:subCategory.photoURL}}>
                                        <Text style={styles.title2}>{subCategory.nom}</Text>
                                    </ImageBackground>
                                </SquareCategoryButton>
                            )
                        })
                        return (
                            <>
                                <View style={styles.header}>
                                    <SubTitle mainpagesubspe={true}>{category.nom}</SubTitle>
                                    <TouchableOpacity onPress={() => navigation.navigate('All products', {produits:category.other_categorieproduit, name:category.nom})}><Text >See All &gt;</Text></TouchableOpacity>
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
                        <SubTitle mainpagesubspe={true}>All products</SubTitle>
                        <TouchableOpacity onPress={() => navigation.navigate('All products', {produits, name:'All products'})}><Text >See All &gt;</Text></TouchableOpacity>
                    </View>
                    <CardContainer
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                            {produits.map((product, id)=>{
                                return (
                                    <SquareCategoryButton
                                        onPress={() => navigation.navigate('product description', {product, name:product.nom})}
                                        key={`${product}-${id}`}
                                        activeOpacity={0.6}>
                                        <ImageBackground style={styles.img1} source={{uri:product.photoURL}}>
                                            <Text style={styles.title2}>{product.nom}</Text>
                                        </ImageBackground>
                                    </SquareCategoryButton>
                                )
                            })}
                    </CardContainer>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    forheight:{
        height: hp('97.8%'),
    },
    search:{
        borderRadius: 30,
        backgroundColor: '#f7ffff',
    },
    title: {
        color: 'white',
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
      },
      img1:{
          justifyContent:'center',
          alignItems:'center',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 25,
      },
      title2: {
          color: 'white',
          fontSize: 16,
          padding: 20,
          fontWeight: 'bold',
        },
        header:{
          width:'100%',
          flex: 1,
          flexDirection: 'row',
          alignItems:'center',
          justifyContent:'space-between',
          marginBottom: -65,
          marginTop: -25,
        },
});
export default MainPage;
