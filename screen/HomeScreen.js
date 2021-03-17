import React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BodyPartCard from '../component/BodyPartCard';
import styles from '../css/styles';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  bodyPartCard = () => {
    const bodyPartList = ['Chest', 'Back', 'Leg', 'Shoulder'];
    return bodyPartList.map((bodyName,key) => {
      return (
        <TouchableOpacity key={key} onPress={() => { this.props.navigation.navigate('BodyPart', { bodyName: bodyName }); }}>
          <BodyPartCard param={{ bodyName: bodyName }} />
        </TouchableOpacity>)
    })
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        { this.bodyPartCard() }
        {/* {this.bodyPartCard('Back')} */}
        {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('BodyPart', { bodyName: 'Chest' }); }}>
          <BodyPartCard param={{ navigation: this.navigation, bodyName: 'Chest' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('BodyPart', { bodyName: 'Back' }); }}>
          <BodyPartCard param={{ navigation: this.navigation, bodyName: 'Back' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('BodyPart', { bodyName: 'Leg' }); }}>
          <BodyPartCard param={{ navigation: this.navigation, bodyName: 'Leg' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('BodyPart', { bodyName: 'Shoulder' }); }}>
          <BodyPartCard param={{ navigation: this.navigation, bodyName: 'Shoulder' }} />
        </TouchableOpacity> */}
      </ScrollView>
    );
  }
}