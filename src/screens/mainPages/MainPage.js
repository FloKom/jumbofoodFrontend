/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, StyledContainer, SquareCategoryButton, PageTitle, PageLogoSpe, CardContainer, CategoryButton, SubTitle, Colors, RightIcon } from '../../components/styles';
import { ImageBackground, Text, View, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image, RefreshControl} from 'react-native';
import { getData } from '../../helpers/fetchData-helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../../helpers/loader';
import { Searchbar } from 'react-native-paper';

const MainPage = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [produits, setproduits] = useState({});
    const [categories, setcategories] = useState({});
    const [packProduits, setpackProduits] = useState({});
    const [data, setData] = useState();
    const onChangeSearch = async (query) => {
        setLoadingSearch(true)
        setSearchQuery(query)
        let resultSearch = await getData("produit?nom=" + query)
        // resultSearch = [...resultSearch,...await getData('packProduit?nom=' + query)]
        setData(resultSearch)
        setLoadingSearch(false)
    };

    useEffect(() =>{
        let controller = new AbortController()
        let signal = controller.signal
        let products = null
        let catego = null
        let packProducts = null
        setTimeout(()=> controller.abort(), 10000)
        const getAllData = async ()=>{
            products = await getData("produit", signal)
            catego = await getData("categorie")
            packProducts = await getData("packProduit")
            setcategories(catego)
            setpackProduits(packProducts)
            setproduits(products)
            await AsyncStorage.setItem('produits', JSON.stringify(products))
            await AsyncStorage.setItem('categories', JSON.stringify(catego))
            await AsyncStorage.setItem('packProduits', JSON.stringify(packProducts))
        }
        getAllData().then(() =>{
            console.log("data recupere du backend")
        })
                    .catch(async (e)=>{
                        //get data from Asyncstorage
                        console.log(e)
                        console.log('echec de recuperation sur l\'API')
                        products = await AsyncStorage.getItem('produits')
                        products = JSON.parse(products)
                        setproduits(products)
                        packProducts = await AsyncStorage.getItem('packProduits')
                        packProducts = JSON.parse(packProducts)
                        setpackProduits(packProducts)
                        catego = await AsyncStorage.getItem('categories')
                        catego = JSON.parse(catego)
                        setcategories(catego)
                        
                    })
                    .finally(()=>{
                        console.log("finally",products, catego, packProducts)
                        setLoading(false)
                    })
    }, []);

    if(loading){
        return <SplashScreen/>
    }
    return (
        
            <StyledContainer>
                <StatusBar style="auto" />
                <Searchbar
                        style={styles.search}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />
                {searchQuery != ''?loadingSearch?
                    <SplashScreen/>:
                    <FlatList
                        keyExtractor={(item,id) => item + id}
                        data={data}
                        ListEmptyComponent={()=><Text>Not found</Text>}
                        renderItem = {({item})=> <TouchableOpacity onPress={() => {
                            if(item.ligneproduit == undefined){
                                return navigation.navigate('product description',{product:item, name:item.nom})
                              }
                              return navigation.navigate('Product pack Description',{packProduit:item, name:item.nom})
                              
                        }}>
                            <View style={styles.container}>
                                <View>
                                    <Image
                                        style={{ height: 100, width: 140, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                                        source={{uri:item.photoURL}} />
                                </View>
                                <View style={styles.titlecontainer}>
                                    <Text style={styles.titleSearch}>{item.nom}</Text>
                                    <Text style={styles.subtitle}>{item.prix + ' XAF'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        }
                    /> :
                    <KeyboardAvoidingWrapper>
                        <InnerContainer>
                            <View style={styles.header}>
                                <SubTitle mainpagesubspe={true}>Packs</SubTitle>
                                <TouchableOpacity onPress={() => navigation.navigate('All packs', {packProduits})}><Text >See All &gt;</Text></TouchableOpacity>
                            </View>
                            
                            <FlatList
                                style={{marginTop:20}}
                                horizontal={true}
                                keyExtractor={(item, index) => item + index}
                                showsHorizontalScrollIndicator = {false}
                                renderItem = {({item})=>{
                                    return (
                                        <CategoryButton onPress={() => {navigation.navigate('Product pack Description',{packProduit:item, name:item.nom})}}
                                        activeOpacity={0.6}>
                                            <ImageBackground style={styles.img1} resizeMode="cover" source={{uri:item.photoURL}}>
                                                <Text style={styles.title}> {item.nom} </Text>
                                            </ImageBackground>
                                        </CategoryButton>
                                    )
                                }}
                                data={packProduits}
                            />
                            
                            {categories.map((category, id)=>{
                                return (
                                    <>
                                        <View style={styles.header}>
                                            <SubTitle mainpagesubspe={true}>{category.nom}</SubTitle>
                                            <TouchableOpacity onPress={() => navigation.navigate('All products', {produits:category.other_categorieproduit, name:category.nom})}><Text >See All &gt;</Text></TouchableOpacity>
                                        </View>
                                        <FlatList
                                            style={{marginTop:20}}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator = {false}
                                            renderItem={({item})=>{
                                                return(
                                                    <SquareCategoryButton activeOpacity={0.6} onPress={() => navigation.navigate('All products', {produits:item.produit, name:item.nom})}>
                                                        <ImageBackground style={styles.img1} source={{uri:item.photoURL}}>
                                                            <Text style={styles.title2}>{item.nom}</Text>
                                                        </ImageBackground>
                                                    </SquareCategoryButton>
                                                )
                                            }}
                                            data={category.other_categorieproduit}
                                            keyExtractor={(item, index) => item + index}
                                        />
                                    </>
                                )
                            })}
                        
                            <View style={styles.header}>
                                <SubTitle mainpagesubspe={true}>All products</SubTitle>
                                <TouchableOpacity onPress={() => navigation.navigate('All products', {produits, name:'All products'})}><Text >See All &gt;</Text></TouchableOpacity>
                            </View>
                            
                            <FlatList
                                style={{marginTop:20}}
                                horizontal={true}
                                showsHorizontalScrollIndicator = {false}
                                keyExtractor={(item, index) => item + index}
                                renderItem = {({item})=>{
                                    return(
                                        <SquareCategoryButton
                                            onPress={() => navigation.navigate('product description', {product:item, name:item.nom})}
                                            activeOpacity={0.6}>
                                            <ImageBackground style={styles.img1} source={{uri:item.photoURL}}>
                                                <Text style={styles.title2}>{item.nom}</Text>
                                            </ImageBackground>
                                        </SquareCategoryButton>
                                    )
                                }}
                                data = {produits}
                            />  
                        </InnerContainer>
                    </KeyboardAvoidingWrapper>
                }
            </StyledContainer>
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
        
        container: {
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            margin:7,
            borderWidth: 1,
            borderColor: '#D0C9C0',
            borderRadius: 21,
            backgroundColor: '#f7ffff',
          },
          titlecontainer: {
            margin:10,
            width: 130,
          },
          titleSearch: {
            fontSize: 16,
            fontWeight: 'bold',
            paddingBottom: 15,
            color : '#000000',
          },
          subtitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color : '#000000',
          },
});
export default MainPage;
