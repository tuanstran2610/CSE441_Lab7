import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function LoginScreen({ navigation }) {
    const [phone, setPhone] = useState('0373007856');
    const [password, setPassword] = useState('123');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://kami-backend-5rs0.onrender.com/auth', { phone, password });
            await AsyncStorage.setItem('token', response.data.token);
            navigation.navigate('Menu');
        } catch (error) {
            Alert.alert('Login Failed', 'Check your credentials');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});


export default LoginScreen;