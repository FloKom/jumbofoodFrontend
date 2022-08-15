const adressIP = '192.168.25.98:3000/'
export const getData = (route, signal=null)=>{
    console.log('http://' + adressIP + route)
    return fetch('http://' + adressIP + route, {signal})
            .then((response)=>{
               return response.json()
            }) 
}

export const postData = (data, route)=>{
   return fetch('http://' + adressIP + route, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
}

export const postFormData = (data, route)=>{
   console.log('route proposer', adressIP + route)
   return fetch('http://' + adressIP + route, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
            },
            body: data
        })
}

export const deleteData = (route)=>{
   return fetch('http://' + adressIP + route,{
            method: 'DELETE'
   })
}