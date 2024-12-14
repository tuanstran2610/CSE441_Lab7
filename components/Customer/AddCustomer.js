import React, {useState} from 'react';
import axios from 'axios';
import {token} from '../../general/general';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const AddCustomer = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  function addCustomer() {
    const data = {
      name: name,
      phone: phone,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    axios
      .post('https://kami-backend-5rs0.onrender.com/customers', data, {
        headers,
      })
      .then(response => {
        console.log('Response:', response.data);
        Alert.alert('Success', 'Add new customer successful', [
          {
            text: 'OK',
            onPress: () => {
              setName('');
              setPhone('');
            },
          },
        ]);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to add customer');
      });
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Customer</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            onChangeText={data => setName(data)}
            value={name}
            placeholderTextColor="#666"
            placeholder="Input your customer's name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone *</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={data => setPhone(data)}
            value={phone}
            placeholderTextColor="#666"
            placeholder="Input phone number"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => addCustomer()}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F06B7A',
    height: 50,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 0.2,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    height: 50,
    backgroundColor: '#F06B7A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCustomer;
