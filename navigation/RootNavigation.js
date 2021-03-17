import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import BodyPartScreen from '../screen/BodyPartScreen';
import TrainingDetailScreen from '../screen/TrainingDetailScreen';
import ChartScreen from '../screen/ChartScreen';

const Stack = createStackNavigator();

const navigationBar = (navigation) => {
    return (
        <TouchableOpacity onPress={() => { navigation.openDrawer(); }}>
            <Icon
                style={{ paddingLeft: 20 }}
                size={20}
                name='bars'
                type='font-awesome'
            />
        </TouchableOpacity>
    )
}

export default function RootNavigator({ navigation }) {
    return (
        // <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerTintColor: '#2c3e50', headerLeft: () => (navigationBar(navigation))
        }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: '首頁' }} />
            <Stack.Screen name="BodyPart" component={BodyPartScreen} options={{ title: '訓練部位' }} />
            <Stack.Screen name="TrainingDetail" component={TrainingDetailScreen} options={{ title: '訓練細節' }} />
            <Stack.Screen name="Chart" component={ChartScreen} options={{ title: '訓練成長圖表' }} />
        </Stack.Navigator>
        // </NavigationContainer>
    );
}
