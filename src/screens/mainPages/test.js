import React, {useState, useEffect} from "react";
import { TextInput, View, Button } from "react-native";

function AddField({ navigation }) {
    const [fields, setFields] = useState([{ value: null }]);
    useEffect(() => {
        console.log(fields)
    }, [fields]);
    function handleChange(i, event) {
      console.log(i)
      const values = [...fields];
      values[i].value = event;
      setFields(values);
      
    }
  
    function handleAdd() {
      
      const values = [...fields];
      values.push({ value: null });
      setFields(values);
    }
  
    function handleRemove(i) {
      const values = [...fields];
      values.splice(i, 1);
      setFields(values);
    }
    
    return (
      <View>
        <Button title="add" onPress={() => handleAdd()} />
  
        {fields.map((field, idx) => {
          return (
            <View key={`${field}-${idx}`}>
              <TextInput
                type="text"
                placeholder="Enter text"
                value={field.value}
                onChangeText={(text) => handleChange(idx, text)}
              />
              <Button title="sub" onPress={() => handleRemove(idx)} />
            </View>
          );
        })}
      </View>
    );
  }

export default AddField