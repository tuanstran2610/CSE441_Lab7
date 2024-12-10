import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import axios from 'axios';

function MenuScreen({ navigation }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('https://kami-backend-5rs0.onrender.com/services')
      .then(response => setServices(response.data))
      .catch(error => console.error(error));
  }, []);

  const renderService = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ServiceDetail', { id: item.id })}>
      <Text style={styles.item}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={services} renderItem={renderService} keyExtractor={item => item.id} />
      <Button title="Add Service" onPress={() => navigation.navigate('AddService')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 20, borderBottomWidth: 1 },
});


export default MenuScreen;