import React from 'react';
import RootNavigation from './navigation/RootNavigation';
import DrawerNavigation from './navigation/DrawerNavigation';
// import firebase from 'firebase'
import ApiKey from './constant/ApiKey';

export default function App() {
  // if (!firebase.apps.length) { 
  //   firebase.initializeApp(ApiKey.FirebaseConfig); 
  //   firebase.analytics();
  // }
  return (
    <DrawerNavigation/>
  );
}