import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {token} from '../../general/general';
const DetailCustomer = ({route, navigation}) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const {_id} = route.params;

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://kami-backend-5rs0.onrender.com/customers/${_id}`,
      );
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
      Alert.alert('Error', 'Failed to fetch customer details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();

    const interval = setInterval(() => {
      fetchCustomerDetails();
    }, 5000);

    return () => clearInterval(interval);
  }, [_id]);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleDelete = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this customer? This operation cannot be returned.',
      [
        {
          text: 'DELETE',
          onPress: async () => {
            try {
              await axios.delete(
                `https://kami-backend-5rs0.onrender.com/customers/${_id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              navigation.goBack();
            } catch (error) {
              console.error('Error:', error);
              Alert.alert(
                'Message',
                error.toString(),
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
                {cancelable: false},
              );
            }
          },
        },
        {
          text: 'CANCEL',
          style: 'cancel',
        },
      ],
    );
  };

  if (loading && !customer) {
    return (
      <View style={styles.container}>
        <Text>Loading customer details...</Text>
      </View>
    );
  }

  return (
    <MenuProvider>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={25} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Customer detail</Text>
          <View style={{flex: 1}} />
          <Menu>
            <MenuTrigger>
              <Icon
                name="ellipsis-vertical-outline"
                size={20}
                color={'white'}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() =>
                  navigation.navigate('UpdateCustomer', {customerId: _id})
                }
                text="Edit"
              />
              <MenuOption onSelect={handleDelete} text="Delete" />
            </MenuOptions>
          </Menu>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>General information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{customer.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{customer.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Total spent:</Text>
                <Text style={[styles.value, styles.highlight]}>
                  {customer.totalSpent?.toLocaleString()} đ
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Last update:</Text>
                <Text style={styles.value}>
                  {new Date(customer.updatedAt).toLocaleDateString('vi-VN')}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Transaction history</Text>
              {customer.transactions?.map(transaction => (
                <View
                  key={transaction._id}
                  style={[styles.card, styles.transactionCard]}>
                  <Text style={styles.transactionId}>
                    {transaction.id} -{' '}
                    {new Date(transaction.createdAt).toLocaleDateString(
                      'vi-VN',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}
                  </Text>
                  {transaction.services.map((service, index) => (
                    <Text
                      key={index}
                      style={styles.serviceItem}
                      numberOfLines={2}>
                      - {service.name}
                    </Text>
                  ))}
                  <Text style={styles.customerName}>
                    Customer: {transaction.customer?.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, styles.highlight]}>
                      {transaction.price?.toLocaleString()} đ
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F06B7A',
    marginBottom: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 100,
    color: '#666',
    fontWeight: '900',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  highlight: {
    color: '#F06B7A',
    fontWeight: 'bold',
  },
  transactionId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '900',
  },
  serviceItem: {
    marginVertical: 2,
    color: '#333',
    paddingRight: 80,
    flexWrap: 'wrap',
  },
  price: {
    color: 'red',
  },
  priceContainer: {
    position: 'absolute',
    bottom: 45,
    right: 12,
    maxWidth: 120,
  },
  transactionCard: {
    position: 'relative',
    padding: 12,
    marginVertical: 8,
    minHeight: 120,
  },
  customerName: {
    color: 'gray',
    marginTop: 8,
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
});

export default DetailCustomer;
