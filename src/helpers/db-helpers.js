import {openDatabase} from 'react-native-sqlite-storage';



export const db = openDatabase({
    name:"jumbofood.db",
    location:'default',
  },
    ()=>{console.log("connection a la BD reussie")},
    (e)=>{
      console.log(e)
    }
)



export const createtable = ()=>{
    return new Promise((resolve, reject) => {
      
        db.transaction((tx)=>{
            
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR(20),prenom VARCHAR(20), numero VARCHAR(20),motPasse VARCHAR(20), ville VARCHAR(20), quartier VARCHAR(20),address VARCHAR(20), sexe VARCHAR(20), preference VARCHAR(40), statut VARCHAR(40), producteurId VARCHAR(40))',
              [],
              (sqlTxn, res)=>{
                console.log("table user cree")
            })
          },()=>{resolve(false)},()=>{resolve(true)})    
    });
    
  }

export const authUser = (numero, password)=>{
    return new Promise((resolve, reject) => {
      let results = []
        db.transaction((tx)=>{
            tx.executeSql(
              'SELECT * FROM user WHERE numero=?',
              [numero],
              (sqlTxn, res)=>{
                let len = res.rows.length
                if(len>0){
                  for(let i=0;i<len;i++){
                    let item = res.rows.item(i)
                    results.push({id:item.id, nom:item.nom, prenom:item.prenom, numero:item.numero, motPasse:item.motPasse, statut:item.statut, producteurId:item.producteurId})
                    //ajouter producteurId
                    resolve({...results[0], result:results[0].motPasse==password})
                  }
                  
                }
                else{
                  resolve({result:false})
                }
              },
              (e)=>{reject(e)}
            )
          })    
    });
    
  }

const insert = (firstName,name, password, number)=>new Promise((resolve, reject) => {
  {
    db.transaction((tx)=>{
      tx.executeSql(
        'INSERT INTO user (nom, prenom, numero, motPasse, statut) values (?,?,?,?,?)',
        [name, firstName, number, password, "client"],
        (sqlTxn, res)=>{
          console.log("User cree")
        },
        (e)=>{reject(e)}
      )
    },(e)=>console.log(e),()=>resolve(true))
}
});

export const addUser = async (firstName,name, password, number)=>{
    return new Promise((resolve, reject) => {
      db.transaction((tx)=>{
        tx.executeSql(
          'SELECT * FROM user WHERE numero=?',
          [number],
          async (sqlTxn, res)=>{
            let len = res.rows.length
            if(len>0){
             resolve(false)
            }
            else{
             let res = await insert(firstName,name, password, number)
             resolve(res)
             console.log("insert termine")
            }
          },
          (e)=>{reject(e)}
        )
      }, (e)=>reject(e),()=>{
        console.log('transaction termine')
      })  
    });
    }

export const updateAllAttrUser = (number,name, firstName)=>{
  
}

export const updateUser = (id, statut)=>{
  id = parseInt(id)
  return new Promise((resolve, reject) => {
    db.transaction((tx)=>{
      tx.executeSql(
        'UPDATE user SET statut = ? WHERE id = ? ',
        [statut, id],(trans, result)=>{
          resolve(result)
        },(e)=>{
          reject(e)
        }
      )
    })    
  });
  
}

export const updateUserSupplierId = (id, producteurId)=>{
  id = parseInt(id)
  return new Promise((resolve, reject) => {
    db.transaction((tx)=>{
      tx.executeSql(
        'UPDATE user SET producteurId = ? WHERE id = ? ',
        [producteurId, id],(trans, result)=>{
          resolve(result)
        },(e)=>{
          reject(e)
        }
      )
    })    
  });
  
}
