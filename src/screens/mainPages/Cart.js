/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { InnerContainer, PageTitle, StyledContainer } from '../../components/styles';
import Header from '../mainPages/cartElements/components/Header';
import ItemsContainer from '../mainPages/cartElements/components/ItemsContainer';
import Footer from '../mainPages/cartElements/components/Footer';
import { View } from 'react-native';
import { getData } from '../../helpers/fetchData-helpers';
import HistoryHeader from '../mainPages/cartElements/components/HistoryHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from '../../helpers/loader';
const Cart = () => {
    const [data, setData] = useState();
    const [total, settotal] = useState({price:0, quantity:0});
    const [loading, setloading] = useState(true);
    useEffect(() => {
        async function getItem(){
            let pannier = await AsyncStorage.getItem('pannier')
            pannier = JSON.parse(pannier)
            const products = await Promise.all(
                pannier.ligneProduits.map((item) => {
                  return getData('produit/' + item.produitId);
                })
            );
            console.log('produits', products)
            let tosend = products.map((produit,id)=>{
                let ligneproduit = pannier.ligneProduits.filter((ligne)=>ligne.produitId == produit.id)
                return {
                    photoURL:produit.photoURL,
                    id,
                    nom:produit.nom,
                    prix:produit.prix,
                    quantite:ligneproduit[0].quantite,
                    produitId:produit.id
                }
            })
    
            settotal({price:pannier.prix, quantity:tosend.length})
            setData(tosend)
            setloading(false)
        }
        getItem()
    }, []);
    if(loading){
        return <SplashScreen/>
    }
    return (
            <StyledContainer>
                <StatusBar style="auto" />
                <InnerContainer>
                    <View style={{ flex: 1 }}>
                        <Header />
                        <ItemsContainer data={data} setData={setData} setTotal={settotal}  />
                        <Footer total={total} />
                    </View>
                </InnerContainer>
            </StyledContainer>
    );
};

export default Cart;
