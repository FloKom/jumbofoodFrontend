/* eslint-disable prettier/prettier */

import React from 'react';
import {RootStack} from './src/navigators/RootStack';
import Toast from 'react-native-toast-message';
import toastConfig from './src/helpers/toastConfig';
import Map from './src/screens/App';
export default function App() {
  return (
    <>
      <RootStack/>
      <Toast config={toastConfig} />
    </>
  )
}
