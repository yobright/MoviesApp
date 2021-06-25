import * as React from 'react';
import { View, Text, Button } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Search } from "../components/Search";
import FilmDetail  from '../components/FilmDetail'; 

function Home( { navigation } ) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button 
        title='Go to search'
        onPress={() => navigation.navigate('Recherche')}
        /> 
      </View>
    );
  }

const Stack = createStackNavigator(); 

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="Home" 
            screenOptions={{  }}
            >
                <Stack.Screen name="Recherche" component={Search} />
                <Stack.Screen name="Home" component={Home} options={{title: 'Overview'}} />
                <Stack.Screen name="FilmDetail" component={FilmDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
