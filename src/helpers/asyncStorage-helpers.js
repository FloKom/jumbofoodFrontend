import AsyncStorage from '@react-native-async-storage/async-storage';

export const getElement = async (item) => {
    try {
        const value = await AsyncStorage.getItem(item)
        if(value !== null) {
            return value
        // value previously stored
        }
    } catch(e) {
        // error reading value
    }
}

export const postData = async () => {
    try {
        const value = await AsyncStorage.getItem('toSend')
        if(value !== null) {
            console.log(value)
            let tosend = JSON.parse(value)
            let tosend2 = []
            for(let item of tosend){
                fetch('locahost:3000/client', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                    }).then(console.log("item envoye"))
                    .catch(() => {
                        tosend2.push(item)
                    })
            }
            const storeData = async (value) => {
                await AsyncStorage.setItem('toSend', JSON.stringify(value))
            }
            storeData(tosend2)
        }
    } catch(e) {
        // error reading value
    }
}