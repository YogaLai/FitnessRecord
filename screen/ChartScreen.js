import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import styles from '../css/styles';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import { Alert } from 'react-native';

export default class ChartScreen extends React.Component {
    constructor({ props, route }) {
        super(props);
        this.state = {
            isDatePickerVisible: false,
            isLoading: true,
        }
        this.dataList = route.params.data;
        this.uniqueDate = route.params.uniqueDate;
    }

    componentDidMount() {
        var len = this.uniqueDate.length > 7 ? 7 : this.uniqueDate.length;
        var data = [];
        var labels = [];
        var date;
        var weights;
        for (let i = 0; i < len; i++) {
            weights = [];
            for (let j = 0; j < this.dataList.length; j++)
                if (this.dataList[j].chosenDate == this.uniqueDate[i])
                    weights.push(this.dataList[j].weight);
            date = this.uniqueDate[i].substring(5);
            data.push(Math.max.apply(Math, weights));
            labels.push(date);
        }
        this.setState({
            data: data.reverse(),
            labels: labels.reverse(),
            isLoading: false
        });
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true, isLoading: false });

    }

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });;
    };

    handleConfirm = (date) => {
        console.log("A date has been picked in chart screen: ", date);
        this.hideDatePicker();
        var idx;
        var filter = this.uniqueDate.find((item, index) => {
            idx = index;
            return item == moment(date).format().split('T')[0];
        });
        if (filter == null) {
            Alert.alert('無此訓練日期');
            return;
        }
        if (this.dataList.length - idx == 1) {    // line chart 裡的 data 只有一筆資料會 error
            Alert.alert('此訓練日期前已無其他訓練\n請重新選擇訓練日期');
            return;
        }
        var cnt = 0;
        var labels = [];
        var data = [];
        var date;
        var weights;
        for (let i = idx; i < this.uniqueDate.length; i++, cnt++) {
            if (cnt == 7)
                break;
            weights = [];
            for (let j = 0; j < this.dataList.length; j++)
                if (this.dataList[j].chosenDate == this.uniqueDate[i])
                    weights.push(this.dataList[j].weight);
            date = this.uniqueDate[i].substring(5);
            data.push(Math.max.apply(Math, weights));
            labels.push(date);
        }

        this.setState({ data: data.reverse(), labels: labels.reverse() });
    };

    render() {
        const { isDatePickerVisible, isLoading } = this.state;
        if (isLoading)
            return <ActivityIndicator size="large" animating />
        else
            return (
                <View style={styles.container}>
                    {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> */}
                    {/* <Picker
                    // selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    // onValueChange={(itemValue, itemIndex) =>
                    //     this.setState({ language: itemValue })}
                >
                    <Picker.Item label="" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker> */}
                    <TouchableOpacity style={chartStyles.chooseDateContainer} onPress={() => { this.showDatePicker() }}>
                        <Text style={chartStyles.chooseDateTile}>查詢訓練日期</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideDatePicker}
                    />
                    <LineChart
                        data={{
                            labels: this.state.labels,
                            datasets: [
                                {
                                    data: this.state.data,
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={320}
                        yAxisSuffix=" kg"
                        // yAxisInterval={1} // optional, defaults to 1
                        xLabelsOffset={0.5}
                        chartConfig={{
                            backgroundColor: "#FFF",
                            backgroundGradientFrom: "#FFF",
                            backgroundGradientTo: "#FFF",
                            decimalPlaces: 2,
                            color: (opacity = 0) => `rgba(26,188,156, ${opacity})`,
                            labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                            }
                        }}
                    />
                </View>
            )
    }
}

const chartStyles = StyleSheet.create({
    chooseDateContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 12,
        height: 50,
        borderRadius: 6,
    },
    chooseDateTile: {
        fontSize: 18,
        padding: 10,
    },
    icon: {
        paddingTop: 10,
        paddingBottom: 10,
    }
})