import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function AddServiceScreen() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Service Name" />
      <TextInput style={styles.input} placeholder="Price" />
      <Button title="Add Service" onPress={() => console.log('Add logic here')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});

export default AddServiceScreen;