import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {token} from '../../general/general';

const AddServiceScreen = ({navigation}) => {
  const [nameService, setNameService] = useState('');
  const [priceService, setPriceService] = useState('0');

  function addService() {
    const data = {
      name: nameService,
      price: parseFloat(priceService),
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    axios
      .post('https://kami-backend-5rs0.onrender.com/services', data, {
        headers,
      })
      .then(response => {
        console.log('Response:', response.data);
        Alert.alert('Success', 'Add new service successful', [
          {
            text: 'OK',
            onPress: () => {
              setNameService('');
              setPriceService('0');
              navigation.goBack();
            },
          },
        ]);
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to add service');
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Service</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service name *</Text>
          <TextInput
            style={styles.input}
            onChangeText={data => setNameService(data)}
            value={nameService}
            placeholderTextColor="#666"
            placeholder="Input a service name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={data => setPriceService(data)}
            value={priceService}
            placeholderTextColor="#666"
            placeholder="0"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => addService()}>
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

export default AddServiceScreen;
