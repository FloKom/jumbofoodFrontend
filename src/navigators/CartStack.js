import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from "../screens/mainPages/Cart";
import CartEmpty from "../screens/mainPages/CartEmpty";
import CartHistory from "../screens/mainPages/CartHistory";
import Checkout from "../screens/mainPages/Checkout";
import { PageTitle, Colors} from "../components/styles";
import PaymentSuccess from "../screens/mainPages/ActiveTransactionCode";
import Recap from "../screens/mainPages/recap";
const {secondary, primary} = Colors;
const Stack = createNativeStackNavigator();

export default function CartStack(){
    return(
    <Stack.Navigator screenOptions={{
        headerShown:true,
        headerTitleAlign: "center",
        headerShadowVisible:false,
        headerStyle:{
            backgroundColor: primary
          }
    }
    }>

        <Stack.Screen 
            name="Cart"  
            component={Cart}
            options={{
                title:'Cart',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>
            }}
            />
        <Stack.Screen 
            name="CartEmpty"  
            component={CartEmpty}
            options={{
                title:'Cart empty',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>
            }}
            />
        <Stack.Screen 
            name="CartHistory"  
            component={CartHistory}
            options={{
                title:'Purchase history',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>
            }}
            />
        <Stack.Screen 
            name="Checkout"  
            component={Checkout}
            options={{
                title:'Checkout',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>
            }}
            />

        <Stack.Screen 
            name="paymentSuccess"  
            component={PaymentSuccess}
            options={{
                title:'Active Transaction Code',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>
            }}
            />
        <Stack.Screen 
            name="recap"  
            component={Recap}
            options={{
                title:'Recapitulatif',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>
            }}
            />
    </Stack.Navigator>)
}