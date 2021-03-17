import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getDataList(keyName){
    try {
        let dataList = await AsyncStorage.getItem(keyName);
        dataList = JSON.parse(dataList);
        console.log('Get data list in asyncStorageLib');
        return dataList;
    } catch (e) {
        console.log(e);
    }
}

// getTrainingDetail = async () => {
//     try {
//         let trainingDetail = await AsyncStorage.getItem(this.itemName + 'TrainingDetail');
//         trainingDetail = JSON.parse(trainingDetail);
//         console.log(trainingDetail);
//         this.setState({
//             trainingDetail: trainingDetail,
//             isLoading: false,
//         });
//     } catch (e) {
//         console.log(e);
//     }
// }