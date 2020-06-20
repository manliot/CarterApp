
/*  populateDB(tx) {
     tx.executeSql('SELECT Monto FROM DebenList WHERE Usuario=?', [this.props.usuario], this.deben.bind(this));
     tx.executeSql('SELECT Monto FROM DeboList WHERE Usuario=?', [this.props.usuario], this.debes.bind(this));
 }
 deben(tx, res) {
     let totalTem = 0;
     for (let i = 0; i < res.rows.length; ++i) {
         let item = res.rows.item(i); totalTem = totalTem + item.Monto;
     }
     this.props.UpdateDEBEN_(totalTem).bind(this)
 }
 debes = (tx, res) => {
     let totalTem = 0;
     for (let i = 0; i < res.rows.length; ++i) {
         let item = res.rows.item(i); totalTem = totalTem + item.Monto;
     }
     this.props.UpdateDEBES_(totalTem).bind(this)
 }
 getTotalMonto = () => {
     this.props.db.transaction(this.populateDB.bind(this))
 }
*/
cambiarfechas(fe, idl) {//cambiar fechas
    this.props.db.transaction(tx => {
        tx.executeSql('UPDATE DebenList SET Fecha = ? WHERE IDdeben==?', [fe, idl],
            (tx, res) => {
                for (let i = 0; i < res.rows.length; i++) {
                    console.log(i + '): ' + res/* .rows.item(i) */)
                }
            }, function (error) {
                console.log(error)
                // returnValue = false;
            }, function (res) {
                console.log(res)
            }
        )
    })
}
let texVec = new Array();
let texVect = item.Fecha.split('/').reverse()
let text = `${texVect[0]}/${texVect[1]}/${texVect[2]}`
texVec[i] = { text, Id }

console.log(texVec[i])
    //texVec.map((i) => this.cambiarfechas(i.text, i.Id))