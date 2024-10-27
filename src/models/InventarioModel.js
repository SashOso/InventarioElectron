const db = require('./BaseDatos');

const tabla = "inventario";

module.exports.lista=async ()=>{
    return new Promise((resolve, reject) => {
        const sql = ` SELECT * FROM ${tabla}`;
        
        db.all(sql, [], (error, rows) => {
            if (error) {
                console.error('Error al listar registros:', error);
                return reject(new Error('No se pudieron listar los registros.'));
            }
            resolve(rows);
        });
    });
}
module.exports.buscar=async (codigo)=>{
    const lista = await this.lista();
    return lista.find(item => item.codigo === Number(codigo)) || null;
}