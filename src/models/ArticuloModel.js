const db = require('./BaseDatos');

const tabla = "articulo";
const vista_tabla = "articulo";

module.exports.lista=async ()=>{
    return new Promise((resolve, reject) => {
        const sql = ` 
            SELECT 
                t.codigo,
                t.descripcion,
                t.unidad_medida_id,
                um.nombre as unidad_medida_nombre
            FROM 
                ${tabla} t
            JOIN 
                unidad_medida um ON t.unidad_medida_id = um.id
            `;
        db.all(sql, [], (error, rows) => {
            if (error) {
                console.error('Error al listar registros:', error);
                return reject(new Error('No se pudieron listar los registros.'));
            }
            const lista = rows.map(row => ({
                codigo: row.codigo,
                descripcion: row.descripcion,
                unidad_medida:{
                    id: row.unidad_medida_id,
                    nombre: row.unidad_medida_nombre,
                }
            }));
            resolve(lista);
        });
    });
}
module.exports.buscar=async (codigo)=>{
    const lista = await this.lista();
    return lista.find(item => item.codigo === codigo) || null;
}
module.exports.agregar=async (obj)=>{
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO ${tabla} (codigo,descripcion,unidad_medida_id) VALUES (?,?,?)`;
        db.run(sql, [obj.codigo,obj.descripcion,obj.unidad_medida.id], function (error) {
            if (error) {
                console.error('Error al agregar registro:', error);
                return reject(new Error('No se pudo agregar el registro.'));
            }
            resolve(obj);
        });
    });
}
module.exports.actualizar=async(obj)=>{
    return new Promise( async(resolve, reject) => {
        if (!await this.buscar(obj.id))  return reject(new Error('El registro no existe.'));
        const sql = `UPDATE ${tabla} SET descripcion = ?, unidad_medida_id=? WHERE codigo = ?`;
        db.run(sql, [obj.descripcion,obj.unidad_medida.id, obj.id], function (error) {
            if (error) {
                console.error('Error al actualizar registro:', error);
                return reject(new Error('No se pudo actualizar el registro.'));
            }
            resolve(obj);
        });
    });
}
module.exports.eliminar=async(codigo)=>{
    return new Promise(async(resolve, reject) => {
        if (!await this.buscar(codigo))  return reject(new Error('El registro no existe.'));

        const sql = `DELETE FROM ${tabla} WHERE codigo = ?`;
        db.run(sql, [codigo], function (error) {
            if (error) {
                console.error('Error al eliminar registro:', error);
                return reject(new Error('No se pudo eliminar el registro.'));
            }
            resolve(true);
        });
    });
}

