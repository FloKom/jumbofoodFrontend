const adressIP = '192.168.150.98:3000/'
const paymentGateway = 'https://pay.ikwen.com/' 

let details = {
   'username': 'jumboservice',
   'password': 'LkCYH0XimAq0',
};
let formBody = [];

for (let property in details) {
 let encodedKey = encodeURIComponent(property);
 let encodedValue = encodeURIComponent(details[property]);
 formBody.push(encodedKey + "=" + encodedValue);
}

formBody = formBody.join("&");

export const getToken = ()=>{
   return fetch(paymentGateway + 'v2/token',{
      method:'POST',
      headers:{
         'Content-Type' :'application/x-www-form-urlencoded'
      },
      body:formBody
      
   }).then((res)=>res.json())
}

export const innitPayment = (token, phone, amount, operator, uui4)=>{
   let headers = new Headers()
   headers.append('Authorization', 'Bearer '+ token)
   headers.append("X-Payment-Provider", operator)
   headers.append('Accept-Language', 'en')
   headers.append('Content-Type', 'application/json')
   headers.append('X-Target-Environment','sandbox')
   headers.append('X-Reference-Id', uui4)
   headers.append('X-Notification-Url','http://api-cm.eskalearning.com/payment_callback')
   return fetch(paymentGateway + 'v2/payment/init',{
      method:'POST',
      headers,
      body:JSON.stringify(
         {
            phone,
            amount,
            payer_id:'client@provider.com'
         }
      )
  }).then((res)=>res.json())
} 

export const getPaymentStatus = (token, pay_token)=>{
   let headers = new Headers()
   headers.append('Authorization', 'Bearer '+ token)
   headers.append('Accept-Language', 'en')
   return fetch(paymentGateway + pay_token,{
      method:'GET',
      headers
   }).then((res)=>res.json())
}

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