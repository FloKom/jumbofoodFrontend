/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';
import {
  WebView
} from 'react-native-webview';
import html_script from './htmlScript';

class Map extends React.Component {
 
  render(){

    var script = (lat, lng) => {

      this.webref1.injectJavaScript(`map1.setView([`+ lat +`,`+ lng+`], 17)
                                    new L.Marker([`+ lat +`,`+ lng+`]).addTo(map1)`);
    }

    return (
      <>
        <StatusBar barstyle="dark-content"/>
        <SafeAreaView style={styles.Container}>
          <WebView ref={(map1) => {this.webref1 = map1}}
                  javaScriptEnabled={true}
                  injectedJavaScript={``} 
                  source={{html: html_script}} 
                  style={styles.Webview}/>
          <View style={styles.ButtonArea}>
            <TouchableOpacity style={styles.Button} onPress={() => {script(3.866667, 11.516667)}}>
              <Text style={styles.ButtonText}>Yaounde</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={() => {script(4.05, 9.7)}}>
              <Text style={styles.ButtonText}>Douala</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={() => {script(42.21401220, -71.03254988)}}>
              <Text style={styles.ButtonText}>Boston</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={() => {script(41.390205, 2.154007)}}>
              <Text style={styles.ButtonText}>Barcelone</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <SafeAreaView style={styles.Container}>
          <WebView ref={(map2) => {this.webref2 = map2}}
                  javaScriptEnabled={true}
                  injectedJavaScript={``} 
                  source={{html: html_script[1]}} 
                  style={styles.Webview}
                  onMessage={(event) => {
                    console.log(event.nativeEvent.data)
                  }}/>
        </SafeAreaView>
      </>
    );
  };
}

const styles = StyleSheet.create({
  Container : {
    height: 1350,
    flex: 1,
    padding: 10,
    backgroundColor: 'lightgrey'
  },

  Webview: {
    flex: 2
  },

  ButtonArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  Button: {
    width: 80,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center'
  },

  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  }
});

export default Map;
