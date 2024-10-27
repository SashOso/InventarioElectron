const db = require('./BaseDatos');

const tabla = "unidad_medida";

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
module.exports.buscar=async (id)=>{
    const lista = await this.lista();
    return lista.find(item => item.id === Number(id)) || null;
}
module.exports.agregar=async(obj)=>{
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO ${tabla} (nombre, grupo_id) VALUES (?, ?)`;
        db.run(sql, [obj.nombre, obj.grupo.id], function (error) {
            if (error) {
                console.error('Error al agregar registro:', error);
                return reject(new Error('No se pudo agregar el registro.'));
            }
            obj.id=this.lastID;
            resolve(obj);
        });
    });
}
module.exports.actualizar=async (obj)=>{
    return new Promise(async(resolve, reject) => {
        if (!await this.buscar(obj.id))  return reject(new Error('El registro no existe.'));

        const sql = `UPDATE ${tabla} SET nombre = ?, grupo_id = ? WHERE id = ?`; // Asegúrate de que 'grupo_i' es el nombre correcto
        db.run(sql, [obj.nombre, obj.grupo.id, obj.id], function (error) {
            if (error) {
                console.error('Error al actualizar registro:', error);
                return reject(new Error('No se pudo actualizar el registro.'));
            }
            resolve(obj);
        });
    });
}
module.exports.eliminar=async (id)=>{
    return new Promise(async (resolve, reject) => {
        if (!await this.buscar(id))  return reject(new Error('El registro no existe.'));

        const sql = `DELETE FROM ${tabla} WHERE id = ?`;
        db.run(sql, [id], function (error) {
            if (error) {
                console.error('Error al eliminar registro:', error);
                return reject(new Error('No se pudo eliminar el registro.'));
            }
            resolve(true);
        });
    });
}