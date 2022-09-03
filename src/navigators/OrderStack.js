import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from "../screens/mainPages/MainPage";
import SeeAllPack from "../screens/mainPages/SeeAllPacks";
import SeeAllCat from "../screens/mainPages/SeeAllCat";
import SeeAllProd from "../screens/mainPages/SeeAllProd";
import ProductDesc from "../screens/mainPages/ProductDesc";
import Feather from 'react-native-vector-icons/Feather';
import { PageTitle, Colors} from "../components/styles";
import { TouchableOpacity } from "react-native";
import PackProductDesc from "../screens/mainPages/PackProductDesc";
import Cart from "../screens/mainPages/Cart";
import Checkout from "../screens/mainPages/Checkout";
import CartHistory from "../screens/mainPages/CartHistory";
import CartEmpty from "../screens/mainPages/CartEmpty";
const {secondary, primary} = Colors;
const Stack = createNativeStackNavigator();
export default function OrderStack(){
    return(
    <Stack.Navigator screenOptions={({navigation})=>({
        headerShown:true,
        headerTitleAlign: "center",
        headerShadowVisible:false,
        headerStyle:{
            backgroundColor: primary
          },
        headerRight:()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('cart')}><Feather color={secondary} name="shopping-cart" size={25}/></TouchableOpacity>
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
            options={({ route }) => ({ 

                title: route.params.name,
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            })}
            />
        <Stack.Screen 
            name="All categories" 
            component={SeeAllCat}
            options={({ route }) => ({ 
                title: route.params.name,
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            })}
            />
        <Stack.Screen 
            name="product description"  
            component={ProductDesc}
            options={({ route }) => ({ 
                title: route.params.name,
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            })}
            />
        <Stack.Screen 
            name="Product pack Description"  
            component={PackProductDesc}
            options={({ route }) => ({ 
                title: route.params.name,
                headerTitle:(props)=><PageTitle stack={true} {...props}/>,
            })}
            />
        {/* <Stack.Screen 
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
            /> */}
    </Stack.Navigator>
)}