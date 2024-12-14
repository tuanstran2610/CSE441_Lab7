import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const AddTransaction = ({navigation}) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [executors, setExecutors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          'https://kami-backend-5rs0.onrender.com/customers',
        );
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          'https://kami-backend-5rs0.onrender.com/services',
        );
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // Calculate total price
  useEffect(() => {
    let total = 0;
    selectedServices.forEach(service => {
      const quantity = quantities[service._id] || 1;
      total += service.price * quantity;
    });
    setTotalPrice(total);
  }, [selectedServices, quantities]);

  const handleServiceToggle = service => {
    const isSelected = selectedServices.find(s => s._id === service._id);
    if (isSelected) {
      setSelectedServices(selectedServices.filter(s => s._id !== service._id));
      const newQuantities = {...quantities};
      delete newQuantities[service._id];
      setQuantities(newQuantities);
    } else {
      setSelectedServices([...selectedServices, service]);
      setQuantities({...quantities, [service._id]: 1});
    }
  };

  const handleQuantityChange = (serviceId, change) => {
    const currentQuantity = quantities[serviceId] || 1;
    const newQuantity = Math.max(1, currentQuantity + change);
    setQuantities({...quantities, [serviceId]: newQuantity});
  };

  const handleSubmit = async () => {
    try {
      const transaction = {
        customer: selectedCustomer,
        services: selectedServices.map(service => ({
          service: service._id,
          quantity: quantities[service._id] || 1,
          executor: executors[service._id] || '',
        })),
        totalPrice,
      };

      await axios.post(
        'https://kami-backend-5rs0.onrender.com/transactions',
        transaction,
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error creating transaction:', error);
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
        <Text style={styles.headerText}>Add Transaction</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Customer *</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={customers.map(customer => ({
              label: customer.name,
              value: customer._id,
            }))}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select customer"
            value={selectedCustomer}
            onChange={item => setSelectedCustomer(item.value)}
          />
        </View>

        <View style={styles.servicesContainer}>
          {services.map(service => (
            <View key={service._id} style={styles.serviceItem}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  selectedServices.find(s => s._id === service._id) &&
                    styles.checked,
                ]}
                onPress={() => handleServiceToggle(service)}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price} đ</Text>
              </TouchableOpacity>

              {selectedServices.find(s => s._id === service._id) && (
                <View style={styles.serviceControls}>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(service._id, -1)}
                      style={styles.quantityButton}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>
                      {quantities[service._id] || 1}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(service._id, 1)}
                      style={styles.quantityButton}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.executorInput}
                    placeholder="Executor"
                    value={executors[service._id]}
                    onChangeText={text =>
                      setExecutors({...executors, [service._id]: text})
                    }
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          See summary: ({totalPrice} đ)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#F06B7A',
    padding: 15,
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
  content: {
    flex: 1,
    padding: 15,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#666',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  servicesContainer: {
    gap: 10,
  },
  serviceItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  checkbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  checked: {
    backgroundColor: '#f0f0f0',
  },
  serviceName: {
    fontSize: 16,
  },
  servicePrice: {
    fontSize: 16,
    color: 'red',
  },
  serviceControls: {
    marginTop: 10,
    gap: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    width: 30,
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
  },
  executorInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
  },
  submitButton: {
    backgroundColor: '#F06B7A',
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTransaction;
