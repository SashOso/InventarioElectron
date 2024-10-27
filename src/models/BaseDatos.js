const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const ruta_base_datos = "db.db";

const db = new sqlite3.Database(ruta_base_datos, (error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    } else {
        crearTablas();
    }
});

function crearTablas() {
    const sqlUnidadMedida = `
        CREATE TABLE IF NOT EXISTS unidad_medida (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL
        );
    `;
    const sqlArticulo = `
        CREATE TABLE IF NOT EXISTS articulo (
            codigo TEXT PRIMARY KEY,
            descripcion TEXT NOT NULL,
            unidad_medida_id INTEGER NOT NULL,
            precio_unitario DECIMAL(10, 2) NOT NULL,
            FOREIGN KEY (unidad_medida_id) REFERENCES unidad_medida(id)
        );
    `;
    const sqlEntrada = `
        CREATE TABLE IF NOT EXISTS entrada (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha DATE NOT NULL,
            codigo TEXT NOT NULL,
            cantidad INTEGER NOT NULL,
            observacion TEXT,
            FOREIGN KEY (codigo) REFERENCES articulo(codigo)
        );
    `;
    const sqlSalida = `
        CREATE TABLE IF NOT EXISTS salida (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha DATE NOT NULL,
            codigo TEXT NOT NULL,
            cantidad INTEGER NOT NULL,
            observacion TEXT,
            FOREIGN KEY (codigo) REFERENCES articulo(codigo)
        );
    `;
    const sqlInventario = `
        CREATE VIEW IF NOT EXISTS inventario AS
        SELECT 
            a.codigo,
            a.descripcion AS articulo,
            um.nombre AS unidad_medida,
            COALESCE(SUM(e.cantidad), 0) AS entrada,
            COALESCE(SUM(s.cantidad), 0) AS salida,
            COALESCE(SUM(e.cantidad), 0) - COALESCE(SUM(s.cantidad), 0) AS total,
            a.precio_unitario as precio_unitario,
            (COALESCE(SUM(e.cantidad), 0) - COALESCE(SUM(s.cantidad), 0)) * a.precio_unitario AS precio_total
        FROM 
            articulo a
        LEFT JOIN 
            entrada e ON a.codigo = e.codigo
        LEFT JOIN 
            salida s ON a.codigo = s.codigo
        JOIN 
            unidad_medida um ON a.unidad_medida_id = um.id
        GROUP BY 
            a.codigo, a.descripcion, um.nombre;
    `;
    db.run(sqlUnidadMedida, (error) => {
        if (error) {
            console.error('Error al crear la tabla unidad_medida:', error.message);
        }
    });
    db.run(sqlArticulo, (error) => {
        if (error) {
            console.error('Error al crear la tabla articulo:', error.message);
        }
    });
    db.run(sqlEntrada, (error) => {
        if (error) {
            console.error('Error al crear la tabla entrada:', error.message);
        }
    });
    db.run(sqlSalida, (error) => {
        if (error) {
            console.error('Error al crear la tabla salida:', error.message);
        }
    });
    db.run(sqlInventario, (error) => {
        if (error) {
            console.error('Error al crear la vista inventario:', error.message);
        }
    });
}

console.log("Base de datos y tablas configuradas.");

module.exports = db;

