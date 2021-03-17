import React from 'react';
import { Alert, ActivityIndicator, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import styles from '../css/styles';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDataList from '../library/asyncStorageLib';

export default class TrainingDetailScreen extends React.Component {
    constructor({ props, route }) {
        super(props);
        // useFonts({
        //     NotoSansTCBlack: NotoSansTC_300Light,
        // });
        this.itemName = route.params.itemName;
        global.itemName = this.itemName;
        this.state = {
            isDatePickerVisible: false,
            chosenDate: null,
            trainingDetail: '',
            isLoading: true,
        };
        // AsyncStorage.removeItem(this.itemName+'TrainingDetail');

    }

    async componentDidMount() {
        const dataList = getDataList(this.itemName + 'TrainingDetail');
        dataList.then((value) => {
            this.setState({ trainingDetail: value, isLoading: false });

        });
    }

    componentDidUpdate() {
        var trainingDetial = this.state.trainingDetail;
        var uniqueDate = [];
        if (trainingDetial != null) {
            for (let i = 0; i < trainingDetial.length; i++)
                if (!uniqueDate.includes(trainingDetial[i].chosenDate))
                    uniqueDate.push(trainingDetial[i].chosenDate);
            if (uniqueDate.length >= 2) {
                this.props.navigation.setOptions({
                    headerRight: () => (
                        <Icon
                            containerStyle={{ marginRight: 12 }}
                            name='line-chart'
                            type='font-awesome'
                            onPress={() => {
                                this.props.navigation.navigate('Chart', { data: trainingDetial, uniqueDate: uniqueDate })
                            }} />
                    ),
                });
            }
            else
                this.props.navigation.setOptions({
                    headerRight: null
                });

        }
    }

    confirmDelete = (id) => {
        Alert.alert(
            '刪除',
            '確定要刪除嗎?',
            [
                { text: '取消' },
                {
                    text: '確定', onPress: () => {
                        let delId;
                        let { trainingDetail } = this.state;
                        console.log(trainingDetail);
                        for (let i = 0; i < trainingDetail.length; i++) {
                            if (trainingDetail[i].id == id) {
                                delId = i;
                                break;
                            }
                        }
                        console.log('Delete id:' + delId + ' training detail');
                        trainingDetail.splice(delId, 1);
                        this.setState({ trainingDetail: trainingDetail });
                        AsyncStorage.setItem(this.itemName + 'TrainingDetail', JSON.stringify(trainingDetail));
                    }
                }
            ]
        );
    }

    renderItem = ({ item }) => {
        return (
            <View style={listStyle.listItem}>
                <TouchableOpacity
                    onLongPress={() => this.confirmDelete(item.id)}>
                    <Text>日期: {item.chosenDate}</Text>
                    <Text>訓練重量: {item.weight}</Text>
                    <Text>訓練次數: {item.repetition}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    }

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });;
    };

    handleConfirm = (date) => {
        console.log("A date has been picked in training detail screen: ", date);
        this.hideDatePicker();
        // if(parseInt(moment(date).format("Do"))<10)
        this.setState({ chosenDate: moment(date).format().split('T')[0] });
    };

    compare = (a, b) => {
        if (Date.parse(a.chosenDate).valueOf() < Date.parse(b.chosenDate).valueOf()) {
            return 1;
        }
        if (Date.parse(a.chosenDate).valueOf() > Date.parse(b.chosenDate).valueOf()) {
            return -1;
        }
        return 0;
    }

    async addTrainingDetail(itemName) {
        const { weight, repetition, chosenDate } = this.state;
        if (weight == null || repetition == null || chosenDate == null) {
            Alert.alert('提醒','訓練重量、訓練組數以及日期為必填');
            return;
        }
        const newTrainDetail = {
            weight: weight,
            repetition: repetition,
            chosenDate: chosenDate,
        };
        AsyncStorage.getItem(itemName + 'TrainingDetail').then(
            (value) => {
                var trainingDetail = JSON.parse(value);
                console.log(trainingDetail);
                console.log('Add new training detail weight is ' + weight + ', repetition is ' + repetition + ' , date is ' + chosenDate + ' in ' + itemName + 'training detail screen');
                if (trainingDetail == null) {
                    newTrainDetail.id = 0;
                    AsyncStorage.setItem(itemName + 'TrainingDetail', JSON.stringify([newTrainDetail]));
                    this.setState({ trainingDetail: [newTrainDetail] });
                }
                else {
                    const lastId = Math.max.apply(Math, trainingDetail.map(function (item) { return item.id; }));
                    newTrainDetail.id = lastId + 1;
                    trainingDetail.push(newTrainDetail);
                    trainingDetail = trainingDetail.sort(this.compare);
                    AsyncStorage.setItem(this.itemName + 'TrainingDetail', JSON.stringify(trainingDetail));
                    // const newList = this.state.trainingDetail.concat(newTrainDetail);
                    this.setState({ trainingDetail: trainingDetail });
                }
            }
        );
        Toast.show('新增成功');
    }
    render() {
        const { trainingDetail, isDatePickerVisible, isLoading } = this.state;

        if (isLoading)
            return (
                <View>
                    <ActivityIndicator size="large" animating />
                </View>
            )
        else {

            return (
                // <View style={[form.container, { minHeight: Math.round(Dimensions.get('window').height) }]}>
                <View style={styles.container}>
                    <Text style={[form.title, styles.fontColor]}>{this.itemName}</Text>
                    <View style={form.box}>
                        <Input
                            placeholder='訓練重量'
                            onChangeText={value => { this.setState({ weight: value }) }}
                            containerStyle={form.input} />
                        <Input
                            placeholder='訓練組數'
                            onChangeText={value => { this.setState({ repetition: value }) }}
                            containerStyle={form.input} />
                        <Icon
                            containerStyle={form.calendar}
                            name='calendar'
                            type='font-awesome'
                            onPress={() => { this.showDatePicker() }} />
                        <DateTimePicker
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={this.handleConfirm}
                            onCancel={this.hideDatePicker}
                        />
                    </View>
                    <View style={form.box}>
                        <TouchableOpacity
                            style={form.submitBtn}
                            onPress={() => this.addTrainingDetail(this.itemName)}>
                            <Text style={form.submitBtnText}>送出</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={form.box3}>
                        <FlatList
                            data={trainingDetail}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </View >
            );
        }
    }
}

const form = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        // fontFamily: 'NotoSansTCBlack',
    },

    box: {
        width: '100%',
        flexDirection: 'row',
        // height: '8%',
        minHeight: 20,
        marginBottom: 4,
    },

    box3: {
        flex: 1,
        padding: 8,
    },

    input: {
        height: 50,
        flex: 2,
    },
    calendar: {
        height: 50,
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
    },
    submitBtn: {
        backgroundColor: '#1abc9c',
        borderRadius: 9,
        flex: 1,
        height: 30,
        alignItems: 'center',
    },
    submitBtnText: {
        fontSize: 18,
        color: '#fff'
    }
});

const listStyle = StyleSheet.create({
    listItem: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: '#fff',
    }
});