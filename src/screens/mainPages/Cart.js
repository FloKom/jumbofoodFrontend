/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, PageTitle, StyledContainer} from '../../components/styles';
import Header from '../mainPages/cartElements/components/Header';
import ItemsContainer from '../mainPages/cartElements/components/ItemsContainer';
import Footer from '../mainPages/cartElements/components/Footer';
import { View } from 'react-native';
import { getData } from '../../helpers/fetchData-helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../../helpers/loader';
import { StackActions } from '@react-navigation/native';
const Cart = ({navigation}) => {
    const [data, setData] = useState([]);
    const [total, settotal] = useState({price:0, quantity:0});
    const [loading, setloading] = useState(true);
    useEffect(() => {
        let comp = 0
        async function getItem(){
            let packProducts = null
            let products = null
            let tosend = []
            let pannier = await AsyncStorage.getItem('pannier')
            if(pannier == null){
                pannier = {prix:0}
            }
            pannier = JSON.parse(pannier)
            try {
                if(pannier.ligneProduits != undefined){
                    products = await Promise.all(
                        pannier.ligneProduits.map((item) => {
                          return getData('produit/' + item.produitId);
                        })
                    );
                    tosend = [...products.map((produit,id)=>{
                        let ligneproduit = pannier.ligneProduits.filter((ligne)=>ligne.produitId == produit.id)
                        comp = id
                        return {
                            photoURL:produit.photoURL,
                            id,
                            nom:produit.nom,
                            prix:produit.prix,
                            quantite:ligneproduit[0].quantite,
                            produitId:produit.id
                        }
                    }), ...tosend]
                }
                if(pannier.lignePacks != undefined){
                    packProducts = await Promise.all(
                        pannier.lignePacks.map((item) => {
                          return getData('packProduit/' + item.packproduitId);
                        })
                    );
                    tosend = [...packProducts.map((packProduct,id)=>{
                        let lignePack = pannier.lignePacks.filter((ligne)=>ligne.packproduitId == packProduct.id)
                        return {
                            photoURL:packProduct.photoURL,
                            id:comp + id + 1,
                            nom:packProduct.nom,
                            prix:packProduct.prix,
                            quantite:lignePack[0].quantite,
                            packproduitId:packProduct.id
                        }
                    }), ...tosend]
                }
                console.log('produits', products)
                console.log('pack produit', packProducts)
                
            } catch (error) {
                if(error)
                AsyncStorage.setItem('pannier',JSON.stringify({prix:0}))
            }   
            settotal({price:pannier.prix, quantity:tosend.length})
            setData(tosend)
            setloading(false) 
        }
        getItem()
    }, []);
    if(loading){
        return <SplashScreen/>
    }
    if(total.price == 0){
        navigation.dispatch(
            StackActions.replace('CartEmpty')
          );
    }
    return (
            <StyledContainer>
                <StatusBar style="auto" />
                <InnerContainer>
                    <View style={{ flex: 1 }}>
                        <Header setData={setData} setTotal={settotal}/>
                        <ItemsContainer data={data} setData={setData} setTotal={settotal}  />
                        <Footer total={total} navigation={navigation}/>
                    </View>
                </InnerContainer>
            </StyledContainer>
    );
};

export default Cart;
