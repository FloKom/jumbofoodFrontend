import React, {useContext} from "react";
import { Text } from "react-native";
import { AuthContext } from "./RootStack";

const As = function(){
    const a = useContext(AuthContext);
    console.log(a)
    return (<Text>{JSON.stringify(a)}</Text>)
} 

export default As