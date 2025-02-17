import { 
  View, Text, KeyboardAvoidingView, Platform, TextInput, 
  Pressable, ScrollView, 
  Alert
} from 'react-native';
import React, { useState ,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import styles from '../style/LoginStyle';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from 'react-i18next'; // Import translation hook
import i18n from '../i18n'; 

const Login = () => {
  const navigation = useNavigation(); 
  const { t } = useTranslation();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

 // Function to change language dynamically
 const changeLanguage = async (lang) => {
  i18n.changeLanguage(lang); // Change language in i18n
  await AsyncStorage.setItem("appLanguage", lang); // Store selected language
};

  const handleLogin= async()=>{
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("user logged successfully");
      await AsyncStorage.setItem("userEmail", email);
      // navigation.navigate('Listing');
    } catch (error) {
      Alert.alert(t("invalidCredentials"));
      console.log("Login fail" ,error);
      
    }
  }
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Animation */}
        <LottieView 
          source={require('../assets/animationJSON/loginAnimationTask.json')}
          autoPlay 
          loop 
          style={styles.animation}
        />

      {/* Language Selection */}
       {/* Language Switcher */}
       <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <Pressable onPress={() => changeLanguage('en')}>
            <Text style={{ marginHorizontal: 10 }}>🇺🇸 English</Text>
          </Pressable>
          <Pressable onPress={() => changeLanguage('hi')}>
            <Text style={{ marginHorizontal: 10 }}>🇮🇳 हिन्दी</Text>
          </Pressable>
          <Pressable onPress={() => changeLanguage('mr')}>
            <Text style={{ marginHorizontal: 10 }}>🇮🇳 मराठी</Text>
          </Pressable>
        </View>
        {/* User Input Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.innerInputContainer}>
            {/* <Text style={styles.label}>Email</Text> */}
            <TextInput 
            value={email}
            onChangeText={setEmail}
              style={styles.input} 
              placeholder={t("email")} 
              keyboardType="email-address"
            />
          </View>

          <View style={styles.innerInputContainer}>
            {/* <Text style={styles.label}>Password</Text> */}
            <TextInput 
            value={password}
            onChangeText={setPassword}
              style={styles.input} 
              placeholder={t("password")} 
              secureTextEntry 
            />
          </View>
        </View>

        {/* Submit Button */}
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>{t("login")}</Text>
        </Pressable>

        {/* Register Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
          {t("newUser")} {' '}
            <Pressable onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.loginLink}>{t("register")}</Text>
            </Pressable>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
