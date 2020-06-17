
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
cambiarfechas() {//cambiar fechas
    this.props.db.transaction(tx => {
        tx.executeSql('UPDATE DebenList SET Fecha = ? WHERE IDdeben==?', ["6/15/2020", 53],
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