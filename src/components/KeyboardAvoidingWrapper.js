import React from "react";

//Keyboard avoiding view
import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';


const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}} >
            <ScrollView
                nestedScrollEnabled = {true}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;