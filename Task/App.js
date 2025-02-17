import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Login from './screens/Login';
import Registration from './screens/Registration';
import Listing from './screens/Listing';
import Details from './screens/Details';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import { auth } from './firebase'; // import your firebase config here
import { useTranslation } from 'react-i18next';
import './i18n'
const Stack = createStackNavigator();

export default function App() {
  const { t } = useTranslation();
  const [isLogged, setIsLogged] = useState(false);
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userEmail = await AsyncStorage.getItem("userEmail");
      const userId = await AsyncStorage.getItem("userId");
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsLogged(true);
          AsyncStorage.setItem("userEmail", user.email);
          AsyncStorage.setItem("userId", user.uid);
          console.log("User logged in:", user.email);
          console.log("User ID:", user.uid);
        }else if(userEmail && userId){
          setIsLogged(true);
          console.log("User logged in:", userEmail);
          console.log("User ID:", userId);
        }
         else {
          setIsLogged(false);
        }
      });
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLogged(true);
        await AsyncStorage.setItem("userEmail", user.email);
        await AsyncStorage.setItem("userId", user.uid);
      } else {
        setIsLogged(false);
      }
    });
  
    return () => unsubscribe(); 
  }, []);
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogged ? (
          <>
            <Stack.Screen name="Listing" options={{ headerShown: false }}>
            {(props) => <Listing {...props} setIsLogged={setIsLogged} />}
            </Stack.Screen>
            <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} /> */}

          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
