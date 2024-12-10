import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

function ServiceDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [service, setService] = useState(null);

  useEffect(() => {
    axios.get(`https://kami-backend-5rs0.onrender.com/services/${id}`)
      .then(response => setService(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    Alert.alert('Delete Service', 'Are you sure?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => console.log('Delete logic here') }
    ]);
  };

  return (
    <View style={styles.container}>
      {service && (
        <>
          <Text>Name: {service.name}</Text>
          <Text>Price: {service.price}</Text>
          <Text>Creator: {service.creator}</Text>
          <Text>Time: {service.time}</Text>
          <Text>Last Updated: {service.updatedAt}</Text>
        </>
      )}
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default ServiceDetailScreen;