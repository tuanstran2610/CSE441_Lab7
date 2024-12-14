import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getServices() {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/services',
      );
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getServices();

    const interval = setInterval(() => {
      getServices();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading services...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>HUYỀN TRINH</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Danh sách dịch vụ</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Add')}>
            <View>
              <Icon name="add" size={20} color={'white'} />
            </View>
          </TouchableOpacity>
        </View>

        {services.length === 0 ? (
          <Text style={styles.noServicesText}>Not find any services</Text>
        ) : (
          <FlatList
            data={services}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', {service: item})}>
                <View style={styles.serviceCard}>
                  <View style={styles.serviceCardContent}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <Text style={styles.servicePrice}>{item.price} đ</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  headerContainer: {
    alignItems: 'left',
    marginBottom: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceName: {
    fontSize: 16,
    color: 'black',
    paddingRight: 10,
  },
  servicePrice: {
    fontSize: 16,
    color: 'black',
  },
  addButton: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#F06B7A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3.84,
  },
});

export default HomeScreen;
