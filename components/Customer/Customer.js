import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Customer = ({navigation}) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/customers',
      );
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();

    const interval = setInterval(() => {
      fetchCustomers();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading customers...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Customer</Text>
      </View>
      <View style={styles.container}>
        {customers.length === 0 ? (
          <Text style={styles.noServicesText}>Not find any customers</Text>
        ) : (
          <FlatList
            data={customers}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailCustomer', {_id: item._id})
                }>
                <View style={styles.serviceCard}>
                  <View style={styles.serviceCardContent}>
                    <View style={styles.customerInfo}>
                      <View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Customer:</Text>
                          <Text style={styles.value}>{item.name}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Phone:</Text>
                          <Text style={styles.value}>{item.phone}</Text>
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Total money:</Text>
                          <Text
                            style={[
                              styles.value,
                              {color: '#F06B7A', fontWeight: 'bold'},
                            ]}>
                            {item.totalSpent} đ
                          </Text>
                        </View>
                      </View>
                      <View style={styles.memberStatus}>
                        <Text style={styles.memberText}>{item.loyalty}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCustomer')}>
        <Icon name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  headerContainer: {
    alignItems: 'left',
    marginBottom: 5,
    justifyContent: 'center',
    backgroundColor: '#F06B7A',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  noServicesText: {
    color: 'black',
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    borderWidth: 0.2,
  },
  serviceCardContent: {
    flexDirection: 'column',
    gap: 8,
  },
  serviceName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
  servicePrice: {
    fontSize: 16,
    color: 'black',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F06B7A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginRight: 4,
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  memberStatus: {
    alignItems: 'center',
  },
  memberText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default Customer;
