
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput,Text, View, Alert, Button, Image, FlatList} from 'react-native';

export default function ShoppingListApp() {
  
    const [product, setProduct] = React.useState('');
    const [data, setData] = useState([]);
    const [lauseke, setLauseke] = useState('');
    const Add = () => {
    
      setData([...data,{key: product}])
    setProduct('');
    }
    const Clear = () => {
    setData ([''])
    }   
      return (
    <View style={styles.container}>
          <View style={styles.input}>
        <TextInput style={styles.input}  
        style={ {width:200, borderColor:'gray', borderWidth:1} }
        onChangeText = {product=> setProduct(product)}
        value ={product} />
        <Button onPress={Add} title ="Add" />
        <Button onPress={Clear} title ="Clear" />
        
         </View>
         <View style={styles.container}>
         <Text style={styles.blue}>Shopping List</Text>
         <FlatList  data={data}
        renderItem={({item}) => 
         <Text>{item.key} </Text>
    }
        />
        </View>
    </View>
      )}
  const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  input: {
    marginTop: 50,
    marginBottom: 5,
    width: 200,
      
  },
  blue: {
      color: '#0000ff',
  }
});