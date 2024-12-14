import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {token} from '../../general/general';

const UpdateCustomer = ({route, navigation}) => {
  const {customerId} = route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `https://kami-backend-5rs0.onrender.com/customers/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setName(response.data.name);
        setPhone(response.data.phone);
      } catch (error) {
        console.error('Error fetching customer:', error);
        Alert.alert('Error', 'Failed to fetch customer details');
      }
    };
    fetchCustomer();
  }, [customerId]);

  const handleUpdate = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Name and phone are required');
      return;
    }

    try {
      await axios.put(
        `https://kami-backend-5rs0.onrender.com/customers/${customerId}`,
        {
          name: name.trim(),
          phone: phone.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      Alert.alert('Success', 'Customer updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error updating customer:', error);
      Alert.alert('Error', 'Failed to update customer');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Update customer</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Customer name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter customer name"
        />

        <Text style={styles.label}>Phone *</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
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
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#F06B7A',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateCustomer;
