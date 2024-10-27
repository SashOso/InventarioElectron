CREATE TABLE IF NOT EXISTS unidad_medida (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articulo (
    codigo TEXT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    unidad_medida_id INTEGER NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (unidad_medida_id) REFERENCES unidad_medida(id)
);

CREATE TABLE IF NOT EXISTS entrada (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha DATE NOT NULL,
    codigo TEXT NOT NULL,
    cantidad INTEGER NOT NULL,
    observacion TEXT,
    FOREIGN KEY (codigo) REFERENCES articulo(codigo)
);

CREATE TABLE IF NOT EXISTS salida (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha DATE NOT NULL,
    codigo TEXT NOT NULL,
    cantidad INTEGER NOT NULL,
    observacion TEXT,
    FOREIGN KEY (codigo) REFERENCES articulo(codigo)
);

CREATE VIEW IF NOT EXISTS inventario AS
SELECT 
    a.codigo,
    a.descripcion AS articulo,
    um.nombre AS unidad_medida,
    COALESCE(SUM(e.cantidad), 0) AS entradas,
    COALESCE(SUM(s.cantidad), 0) AS salidas,
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
