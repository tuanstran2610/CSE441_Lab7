import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Settings = ({navigation}) => {
  const handleLogout = () => {
    navigation.replace('Login');
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  content: {
    flex: 1,
    padding: 15,
  },
  formContainer: {
    padding: 15,
  },
  button: {
    height: 50,
    backgroundColor: '#F06B7A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
