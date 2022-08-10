import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from "../screens/mainPages/MainPage";
import SeeAllPack from "../screens/mainPages/SeeAllPacks";
import SeeAllCat from "../screens/mainPages/SeeAllCat";
import SeeAllProd from "../screens/mainPages/SeeAllProd";
import ProductDesc from "../screens/mainPages/ProductDesc";
import Feather from 'react-native-vector-icons/Feather';
import { PageTitle } from "../components/styles";
import { Colors,RightIcon } from "../components/styles";
import { TouchableOpacity } from "react-native";
const {secondary, primary} = Colors;
const Stack = createNativeStackNavigator();
export default function OrderStack(){
    return(
    <Stack.Navigator screenOptions={()=>({
        headerShown:true,
        headerTitleAlign: "center",
        headerStyle:{
            backgroundColor: primary
          },
        headerRight:()=>(
            <TouchableOpacity><Feather color={secondary} name="shopping-cart" size={25}/></TouchableOpacity>
        )
    })
    }>
        <Stack.Screen 
            name="Home" 
            component={MainPage}
            options={{
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            }}
            />
        <Stack.Screen 
            name="All packs" 
            component={SeeAllPack}
            options={{
                title: 'All Packs',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            }}
            />
        <Stack.Screen 
            name="All products" 
            component={SeeAllProd}
            options={{
                title: 'All Products',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            }}
            />
        <Stack.Screen 
            name="All categories" 
            component={SeeAllCat}
            options={{
                title: 'All Categories',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            }}
            />
        <Stack.Screen 
            name="product description"  
            component={ProductDesc}
            options={{
                title: 'Product Description',
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            }}
            />
    </Stack.Navigator>
)}