import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './RootNavigation';
import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import DrawerContent from '../component/DrawerContent';

const Drawer = createDrawerNavigator();
// function DrawerContent(props) {
//     return (
//         <DrawerContentScrollView {...props}>
//             {/* <DrawerItemList {...props} /> */}
//             <DrawerItem
//                 label="Help"
//                 onPress={() => Linking.openURL('https://mywebsite.com/help')}
//             />
//         </DrawerContentScrollView>
//     )
// }

export default function DrawerNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}> */}
                <Drawer.Screen name="RootNavigation" component={RootNavigation} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}