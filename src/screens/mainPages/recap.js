import React, {useState, useEffect} from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native";
import { getData } from "../../helpers/fetchData-helpers";
import { SplashScreen } from "../../helpers/loader";
import WebView from "react-native-webview";
import html_script from '../htmlScript';
const Recap = ({route})=>{
    const [cart, setCart] = useState();
    const [loading, setLoading] = useState(true);
    const [pickUp, setPickUp] = useState();
    // const web = useRef()
    // const script = (lat, lng) => {
    //     web.current.injectJavaScript(`map1.setView([`+ lat +`,`+ lng+`], 17)
    //                                   new L.Marker([`+ lat +`,`+ lng+`]).addTo(map1)`);
    //   }
    useEffect(() => {
        async function getItems(){
            console.log(route.params.pannier)
            setCart(route.params.pannier)
            if(route.params.pannier.pointramassageId != null){
                let data = await getData('pointRamassage/'+route.params.pannier.pointramassageId)
                setPickUp(data)
            }
            setLoading(false)
        }
        getItems()
    }, []);
    if(loading){
        return <SplashScreen/>
    }
    return<><ScrollView style={{margin:20, flex:1, marginBottom:-70}}>
        <View style ={{flexDirection:'row'}}>
            <Item name="code" value={cart.id} />
            <Text style={{width:280, textAlign:'justify'}}>(Here is your code you have to show it to pick-up point to get your order)</Text>
        </View>
        <Item name="nom Payeur" value={cart.nomPayeur}/>
        <Item name="numero Payeur" value={cart.numPayeur}/>
        <Item name="nom Beneficiaire" value={cart.nomBeneficiaire}/>
        <Item name="numero Beneficiaire" value={cart.numBeneficiaire}/>
        {/* <Item name="products" value={} /> */}
        <Item name="Prix" value={cart.prix}/>
        {cart.pointramassageId!=null?
            <>
            <Item name="pick up delivery"/>
            <Item name="nom" value={pickUp.ville}/>
            <Item name="ville" value={pickUp.nom}/>
            <Item name="numero" value={pickUp.numero}/>
            <Text>Pick Up point show on map</Text>
            <WebView 
                javaScriptEnabled={true}
                injectedJavaScript={`map1.setView([`+ pickUp.latitude +`,`+ pickUp.longitude+`], 17)
                new L.Marker([`+ pickUp.latitude +`,`+ pickUp.longitude+`]).addTo(map1)`} 
                source={{html: html_script }} 
                style={styles.Webview}
                onMessage={(event) => {
                    console.log(event.nativeEvent.data)
                    setCoor(JSON.parse(event.nativeEvent.data))
                }}
                />
            </>      
            :<Item name="Home delivery" value="yes" />}
    </ScrollView>
    <WebView 
        javaScriptEnabled={true}
        injectedJavaScript={`map1.setView([`+ pickUp.latitude +`,`+ pickUp.longitude+`], 17)
        new L.Marker([`+ pickUp.latitude +`,`+ pickUp.longitude+`]).addTo(map1)`} 
        source={{html: html_script }} 
        style={styles.Webview}
        onMessage={(event) => {
            console.log(event.nativeEvent.data)
        }}
    /></>
}

function Item({name, value}){
    return <View style={{flexDirection:"row" , marginBottom:8}}>
        <Text>{name} :</Text>
        <Text>{value}</Text>
    </View>
}
const styles = StyleSheet.create({
    Webview: {
        flex: 1
    }
})
export default Recap