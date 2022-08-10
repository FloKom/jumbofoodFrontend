import ImagePicker from 'react-native-image-crop-picker';
import { Text } from 'react-native';
import React from 'react';
export default function pickMultiple(setState) {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: "photo"
    })
      .then((images) => {
        setState({
          component: <Text style={{marginBottom:10, marginTop:5}}>You have selected {images.length} image(s)</Text>,
          images: images.map((i) => {
            return {
              uri: i.path,
              name:i.path.split('/').pop(),
              type: i.mime,
            };
          }),
        });
      })
      .catch((e) => console.log(e));
  }