import React, {useState, useEffect} from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BecomeSupplier from "../screens/mainPages/BecomeSupplier";
import BecomeSupplierCondition from "../screens/mainPages/BecomeSupplierCondition";
import Supplier from "../screens/mainPages/Supplier";
import WaitingToBeAcceptedAsSupplier from "../screens/mainPages/WaitingToBeAcceptedAsSupplier";
import SubmissionForm from "../screens/mainPages/SubmissionForm";
import AsyncStorage from "@react-native-async-storage/async-storage";  
import { SplashScreen } from "../helpers/loader";
import ContactManager from "../screens/mainPages/ContactManager";
import SubmissionHistory from "../screens/mainPages/SubmissionHistory";
import { Colors, PageTitle, SubTitle } from "../components/styles";
import { View } from "react-native-web";
const {secondary, primary} = Colors
const Stack = createNativeStackNavigator();
export default function SupplierStack(){
    // const [parameter, setparameter] = useState();
    const [loading, setloading] = useState(true);
    const [initialRoute, setinitialRoute] = useState('Become a Supplier');
    useEffect(() => {
        async function getCredential(){
            try {
              let value = await AsyncStorage.getItem('credential')
              // console.log('value', value)
              if(value != null) {
                value = JSON.parse(value)
                console.log('value1', value)
                if(value.statut === "en attente"){
                    setinitialRoute('waiting')
                }else if(value.statut === "supplier"){
                  setinitialRoute('Supplier Approuve')
                }
                setloading(false)
              }
            } catch(e) {
              console.log(e)
            }
            
          }
         getCredential()
    }, []);
    if(loading){
      return <SplashScreen/>
    }
    return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={()=>({
        headerShown:true,
        headerTitleAlign:"center",
        headerShadowVisible:false,
        headerStyle:{
            backgroundColor: primary
        },
    })}> 
        <Stack.Screen
            name="proposition form"
            component={SubmissionForm}
            options={{
                title: 'Product Submission',
                headerTitle:(props)=><SubTitle stack={true} {...props}/>,
            }} />
        <Stack.Screen name="Become a Supplier" component={BecomeSupplier} />
        <Stack.Screen name="Become a Supplier Condition" component={BecomeSupplierCondition} />
        <Stack.Screen 
          name="Supplier Approuve" 
          component={Supplier} 
          options={{ 
            title: 'Supplier',
            headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            headerStyle:{
              backgroundColor: primary
            }
            }} />
        <Stack.Screen name="waiting" component={WaitingToBeAcceptedAsSupplier}  />
        <Stack.Screen name="Contact manager" component={ContactManager} options={{ title: 'Contact A Manager' }}/>
        <Stack.Screen name="History" component={SubmissionHistory} options={{ title: 'Submission History' }}/>
    </Stack.Navigator>
    )
}

const style = StyleSheet.create({
  subtitle:{
    fontSize: 30,
    marginBottom: 25,
    letterSpacing: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: {secondary},
    padding: 10,
    marginTop: 30,
  }
})