import Login from './../screens/Login';
import Signup from '../screens/Signup';
import { Colors } from '../components/styles';
import React, {useEffect, useReducer, useMemo, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import {createtable, authUser, db, isPromise} from '../helpers/db-helpers';
import { getElement} from '../helpers/asyncStorage-helpers';
import { SplashScreen } from '../helpers/loader';



const AuthContext = React.createContext();  
const Stack = createNativeStackNavigator();
const {primary, secondary, tertiary, darkLight} = Colors;
const RootStack = () => {    
      const [state, dispatch] = useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
      );
      const [credential, setcredential] = useState({});
    
      useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
        let userToken = null;

        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
        const value = await getElement('token')
        console.log(value)
        if(value != undefined){
          userToken = parseInt(value)
        }
        if((Date.now() - userToken) >= 6000000){
            userToken=null
        }
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        // postData()
          // After restoring token, we may need to validate it in production apps
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
        };
        async function fetchData(){
            await createtable()
            await bootstrapAsync();
          }
          fetchData()
      }, []);
      const authContext = useMemo(
        () => ({
          signIn: async (data) => {
            console.log("resultat")
            let result = await authUser(data.phone, data.password)
            console.log("resultat", result)
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
            // In the example, we'll use a dummy token
            let token = Date.now().toString()
            //enregistrer la date dans le async storage
            if(result.result){
                await AsyncStorage.setItem('credential', JSON.stringify(result))
                await AsyncStorage.setItem('token', token)
                dispatch({ type: 'SIGN_IN', token })
            }
            return result.result
            
          },
          signOut: () => dispatch({ type: 'SIGN_OUT' }),
          signUp: async (data) => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
            // In the example, we'll use a dummy token
    
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
        }),
        []
      );    
    return (
        <AuthContext.Provider value={{authContext, credential}}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={()=>({
                    headerShown:false  
                })}>
        
                    {state.isLoading ? (
                // We haven't finished checking for the token yet
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : state.userToken == null ? (
                // No token found, user isn't signed in
                        <>
                         <Stack.Screen
                            name="SignIn"
                            component={Login}
                            options={{
                                title: 'Sign in',
                                // When logging out, a pop animation feels intuitive
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                    }}
                                    />
                         <Stack.Screen name="SignUp" component={Signup} />
                        </>
                    ) : (
                        // User is signed in
                        <Stack.Screen name="Home" component={HomeStack} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>

    );
};

export {RootStack, AuthContext}









