import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Transaction = ({navigation}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTransactions() {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/transactions',
      );
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Transaction</Text>
      </View>
      <View style={styles.container}>
        {transactions.length === 0 ? (
          <Text style={styles.noServicesText}>Not find any transactions</Text>
        ) : (
          <FlatList
            data={transactions}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailTransaction', {detail: item})
                }>
                <View style={styles.serviceCard}>
                  <View style={styles.serviceCardContent}>
                    <View style={styles.customerInfo}>
                      <View style={styles.serviceInfoContainer}>
                        <View style={[styles.infoRow]}>
                          <Text style={[styles.value, {fontWeight: 'bold'}]}>
                            {item.id}
                          </Text>
                          <Text> - </Text>
                          <Text style={[styles.value, {fontWeight: 'bold'}]}>
                            {new Date(item.createdAt)
                              .toLocaleString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                              })
                              .replace(',', '')}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.infoRow,
                            {flexDirection: 'column', alignItems: 'flex-start'},
                          ]}>
                          {item.services.map(service => (
                            <Text
                              key={service._id}
                              style={styles.value}
                              numberOfLines={1}>
                              - {service.name}
                            </Text>
                          ))}
                        </View>
                        <View style={styles.infoRow}>
                          <Text style={styles.label}>Customer:</Text>
                          <Text style={styles.label}>{item.customer.name}</Text>
                        </View>
                      </View>
                      <View style={styles.memberStatus}>
                        <Text
                          style={[
                            styles.memberText,
                            {fontWeight: 'bold', color: 'red'},
                          ]}>
                          {item.price} đ
                        </Text>
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
        onPress={() => navigation.navigate('AddTransaction')}>
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
    alignItems: 'flex-start',
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
    flexShrink: 1,
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  serviceInfoContainer: {
    flex: 3,
    maxWidth: '70%',
  },
  memberStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    paddingLeft: 10,
  },
  memberText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Transaction;
