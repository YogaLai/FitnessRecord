import React from 'react';
import { Alert, StyleSheet, View, Text, Button, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../css/styles';
import getDataList from '../library/asyncStorageLib';

export default class BodyPartScreen extends React.Component {
  constructor({ props, route }) {
    super(props);
    this.bodyName = route.params.bodyName;
    this.state={
      trainingList:null,
    }
  }

  componentDidMount() {
    const dataList = getDataList(this.bodyName + 'ItemList');
    dataList.then((value) => {
      this.setState({
        trainingList: value,
      });
    });
    this.props.navigation.closeDrawer();

  }

  async addTrainingItem(bodyPart, newTrainingItem) {
    if (newTrainingItem == null) {
      Alert.alert('訓練項目為必填');
      return;
    }
    AsyncStorage.getItem(bodyPart + 'ItemList').then(
      (value) => {
        var itemList = JSON.parse(value);
        console.log('Add new training item \"' + newTrainingItem + '\" in ' + bodyPart + 'screen');
        if (itemList == null) {
          AsyncStorage.setItem(bodyPart + 'ItemList', JSON.stringify([newTrainingItem]));
          this.setState({ trainingList: [newTrainingItem] });
        }
        else {
          itemList.push(newTrainingItem);
          AsyncStorage.setItem(bodyPart + 'ItemList', JSON.stringify(itemList));
          const newList = this.state.trainingList.concat(newTrainingItem);
          this.setState({ trainingList: newList });
        }
      }
    );
  }

  getTrainingList = async () => {
    try {
      let trainingList = await AsyncStorage.getItem(this.bodyName + 'ItemList');
      trainingList = JSON.parse(trainingList);
      this.setState({
        trainingList: trainingList,
      });
    } catch (e) {
      console.log(e);
    }

  }
  confirmDelete = (itemName) => {
    Alert.alert(
      '刪除',
      '確定要刪除嗎?',
      [
        { text: '取消' },
        {
          text: '確定', onPress: () => {
            let delId;
            let { trainingList } = this.state;
            console.log(trainingList);
            for (let i = 0; i < trainingList.length; i++) {
              if (trainingList[i] == itemName) {
                delId = i;
                break;
              }
            }
            console.log('Delete training item ' + itemName);
            trainingList.splice(delId, 1);
            this.setState({ trainingList: trainingList });
            AsyncStorage.setItem(this.bodyName + 'ItemList', JSON.stringify(trainingList));
            AsyncStorage.removeItem(itemName + 'TrainingDetail').then(
              function success() {
                console.log('Delete training detail of training item ' + itemName+' successed');
              },
              function error(err) {
                console.log('Delete  training detail of training item ' + itemName + ' failed\n Error message: ' + err);
              }
            );
          }
        }
      ]
    );
  }
  render() {
    if (this.state.trainingList) {
      return (
        <View style={styles.container}>
          <Input
            placeholder='請輸入訓練項目'
            onChangeText={value => { this.setState({ newTrainingItem: value }) }}
            containerStyle={form.input}
            style={{ minHeight: 30, height: 30 }} />
          <TouchableOpacity
            style={form.submitBtn}
            onPress={() => this.addTrainingItem(this.bodyName, this.state.newTrainingItem)}>
            <Text style={form.submitBtnText}>增加</Text>
          </TouchableOpacity>
          {
            this.state.trainingList.map((item, i) => (
              <ListItem
                key={i}
                bottomDivider
                onLongPress={() => this.confirmDelete(item)}
                onPress={() => {
                  // this.setModalVisible(!modalVisible);
                  // this.setState({itemName: item});
                  this.props.navigation.navigate('TrainingDetail', { itemName: item });
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
          {/* <AddTrainingItemModal 
            itemName={this.state.itemName} 
            modalVisible={modalVisible} 
            setModalVisible={this.setModalVisible.bind(this)}/> */}
        </View>
      )
    }
    else
      return (
        <View style={{ backgroundColor: '#f1f1f1' }}>
          <Input
            placeholder='請輸入訓練項目'
            onChangeText={value => { this.setState({ newTrainingItem: value }) }}
            containerStyle={form.input}
            style={{ minHeight: 30, height: 30 }} />
          <TouchableOpacity
            style={form.submitBtn}
            onPress={() => this.addTrainingItem(this.bodyName, this.state.newTrainingItem)}>
            <Text style={form.submitBtnText}>增加</Text>
          </TouchableOpacity>
        </View>
      );
  }
}

const form = StyleSheet.create({
  submitBtn: {
    backgroundColor: '#1abc9c',
    borderRadius: 9,
    alignItems: 'center',
    marginBottom: 8,
    height: 30,
  },
  submitBtnText: {
    fontSize: 18,
    color: '#fff'
  },
  input: {
    minHeight: 35,
    height: 35,
    marginTop: 12,
    marginBottom: 8,
  }
})
