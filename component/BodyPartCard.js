import React from 'react';
import { Card } from 'react-native-elements';
import styles from '../css/styles';

export default class BodyPartCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const param = this.props.param;
        const images = {
            'Chest': require('../assets/Chest.jpg'),
            'Back': require('../assets/Back.jpg'),
            'Leg': require('../assets/Leg.jpg'),
            'Shoulder': require('../assets/Shoulder.jpg'),
        };
        let bodyName;
        switch (param.bodyName) {
            case 'Chest':
                bodyName = '胸';
                break;
            case 'Back':
                bodyName = '背';
                break;
            case 'Leg':
                bodyName = '腿';
                break;
            case 'Shoulder':
                bodyName = '肩';
                break;
        }
        return (
            <Card>
                <Card.Title style={[styles.fontColor, { fontSize: 18 }]}>{bodyName}</Card.Title>
                <Card.Divider></Card.Divider>
                <Card.Image source={images[param.bodyName]} resizeMode="contain"></Card.Image>
            </Card>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//       flex:1,
//       flexDirection: 'row',
//       backgroundColor: '#fff',
//     },
//     image: {
//       // flex: 1,
//     width: '40%',
//     height: '100px',
//     resizeMode: 'cover'
//     }
//   });
