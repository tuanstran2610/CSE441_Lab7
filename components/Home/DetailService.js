import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const DetailServiceScreen = ({route, navigation}) => {
  const {service} = route.params;
  const [currentService, setCurrentService] = useState(service);

  useEffect(() => {
    const service = route.params.service;
    console.log(service);
    setCurrentService(service);
  }, [route.params]);

  function deleteService() {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned.',
      [
        {
          text: 'DELETE',
          onPress: () => {
            axios
              .delete(
                `https://kami-backend-5rs0.onrender.com/services/${currentService._id}`,
              )
              .then(response => {
                console.log('Response:', response.data);
                console.log(response.status);
                navigation.goBack();
              })
              .catch(error => {
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
              });
          },
        },
        {
          text: 'CANCEL',
          style: 'cancel',
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={25} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Service detail</Text>
        <View style={{flex: 1}} />
        <Menu>
          <MenuTrigger>
            <Icon name="ellipsis-vertical-outline" size={20} color={'white'} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() =>
                navigation.navigate('Update', {service: currentService})
              }
              text="Update"
            />
            <MenuOption onSelect={() => deleteService()} text="Delete" />
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.formContainer}>
        <View
          style={[
            styles.detailGroup,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Text style={[styles.label, {marginBottom: 0, marginRight: 5}]}>
            Service name:
          </Text>
          <Text style={styles.value}>{currentService?.name}</Text>
        </View>
        <View
          style={[
            styles.detailGroup,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Text style={[styles.label, {marginBottom: 0, marginRight: 5}]}>
            Price:
          </Text>
          <Text style={styles.value}>{currentService?.price} đ</Text>
        </View>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={[styles.label, {marginBottom: 0, marginRight: 5}]}>
            Time:
          </Text>
          <Text style={styles.value}>{currentService?.time}</Text>
        </View>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={[styles.label, {marginBottom: 0, marginRight: 5}]}>
            Final update:
          </Text>
          <Text style={styles.value}>{currentService?.updatedAt}</Text>
        </View>
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

  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: 'black',
  },
});

export default DetailServiceScreen;
