
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon, Avatar, Divider } from 'react-native-elements';


export default function DrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ backgroundColor: '#1abc9c', paddingVertical: 40 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar size='large' rounded source={require('../assets/fit_icon.png')} />
                    {/* <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} /> */}
                    <Text style={{ color: '#f9f9f9', marginTop: '3%', fontWeight: 'bold' }}>歡迎使用</Text>
                    <Text style={{ color: '#f9f9f9', fontWeight: 'bold' }}>Fitness Record</Text>
                </View>
            </View>
            {/* <View style={{backgroundColor:'#000', height:40}}></View> */}
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        color={color}
                        size={size}
                    />
                )}
                labelStyle={styles.label}
                label="首頁"
                onPress={() => { props.navigation.navigate('Home') }}
                style={{ marginTop: 20 }}
            />
            <Text style={styles.title}>訓練部位</Text>
            <Divider />
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name='sitemap'
                        type='font-awesome'
                        color={color}
                        size={size}
                    />
                )}
                labelStyle={styles.label}
                label="胸"
                onPress={() => {
                    console.log(props.navigation);
                    props.navigation.reset({
                        index: 0,
                        routes: [
                            { name: 'Home' },
                            {
                                name: 'BodyPart',
                                params: { bodyName: 'Chest' },
                            },
                        ],
                    })
                }}
            />
            {/* <Divider/> */}
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name='sitemap'
                        type='font-awesome'
                        color={color}
                        size={size}
                    />
                )}
                labelStyle={styles.label}
                label="背"
                onPress={() => {
                    props.navigation.reset({
                        index: 0,
                        routes: [
                            { name: 'Home' },
                            {
                                name: 'BodyPart',
                                params: { bodyName: 'Back' },
                            },
                        ],
                    })
                }}
            />
            {/* <Divider/> */}
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name='sitemap'
                        type='font-awesome'
                        color={color}
                        size={size}
                    />
                )}
                labelStyle={styles.label}
                label="腿"
                onPress={() => {
                    props.navigation.reset({
                        index: 0,
                        routes: [
                            { name: 'Home' },
                            {
                                name: 'BodyPart',
                                params: { bodyName: 'Leg' },
                            },
                        ],
                    })
                }}
            />
            {/* <Divider/> */}
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name='sitemap'
                        type='font-awesome'
                        color={color}
                        size={size}
                    />
                )}
                labelStyle={styles.label}
                label="肩"
                onPress={() => {
                    props.navigation.reset({
                        index: 0,
                        routes: [
                            { name: 'Home' },
                            {
                                name: 'BodyPart',
                                params: { bodyName: 'Shoulder' },
                            },
                        ],
                    })
                }}
            />
        </DrawerContentScrollView>

    );
}

const styles = StyleSheet.create({
    label: {
        color: '#2c3e50',
        fontWeight: 'bold',
    },
    title: {
        marginVertical: 4,
        marginLeft: 8,
        padding: 8,
        color: '#2c3e50',
    },

});

