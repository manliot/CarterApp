export const ACTUALIZAR_ESTADO = 'ACTUALIZAR_ESTADO'
export const INFO_USER = 'INFO_USER'


export function SetInfoUser(nombre, usuario) {
  return {
    type: INFO_USER,
    nombre: nombre,
    usuario: usuario
  }
}
let tDeben = 0;
let tDebes = 0;
let id_User = '';
export function GetInfoGeneral(id_User2, db) {
  id_User = id_User2
  console.log('================================================== ')
  getTotalMonto(id_User, db)
  get()

  const ast = {
    type: ACTUALIZAR_ESTADO,
    getDeben: tDeben,
    getDebes: tDebes,
    getCartera: 0
  }
  // console.log('va a retornar', ast)
  return ast
}
//to update  InfoGeneal
function populateDB(tx) {
  tx.executeSql('SELECT Monto FROM DebenList WHERE Usuario=?', [id_User], deben
  );
  tx.executeSql('SELECT Monto FROM DeboList WHERE Usuario=?', [id_User], debes);
}
const deben = (tx, res) => {
  let totalTem = 0;
  for (let i = 0; i < res.rows.length; ++i) {
    let item = res.rows.item(i); totalTem = totalTem + item.Monto;
  }
  console.log(' este es el query')
  tDeben = totalTem;
  console.log('deben ' + tDeben)

}
const debes = (tx, res) => {
  let totalTem = 0;
  for (let i = 0; i < res.rows.length; ++i) {
    let item = res.rows.item(i); totalTem = totalTem + item.Monto;
  }
  console.log(' este es el query')
  tDebes = totalTem;
  console.log('debes ' + tDebes)

}
const getTotalMonto = (id_User, db) => {
  db.transaction(populateDB)
}
/*
const getTotalMonto2 = (querytxt, id_User, db, type) => {
    console.log('entro', type),
        db.transaction(
            (tx) => {
                tx.executeSql(querytxt, [id_User],
                    (tx, res) => {
                        let totalTem = 0;
                        for (let i = 0; i < res.rows.length; ++i) {
                            let item = res.rows.item(i); totalTem = totalTem + item.Monto;
                        }
                        console.log(type + ' este es el query')
                        switch (type) {
                            case 'deben':
                                tDeben = totalTem;
                                console.log('deben ' + tDeben)
                                break
                            case 'debes':
                                tDebes = totalTem;
                                console.log('deben ' + tDebes)
                                break
                            default:
                                console.log('un error en action.js(llego un query que no era')
                                break
                        }
                    }
                );
            }
        )

};*/

const get = () => {
  console.log('aqui vale esto: ' + tDeben + tDebes)
}
