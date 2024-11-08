// Importar dependencias
const { app, BrowserWindow, ipcMain } = require('electron');
const express = require('express');
const path = require('path');
//------
// Configurar la aplicación de Express
const expressApp = express();
const PORT = 3000;
let ventanaPrincipal;

// Configuración de Express
expressApp.set('view engine', 'ejs');
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.use(express.static(path.join(__dirname, 'public')));
expressApp.use(express.json());

// Rutas Express
const UnidadMedidaRoutes = require('./routes/UnidadMedidaRoutes');
const ArticuloRoutes = require('./routes/ArticuloRoutes');
const EntradaRoutes = require('./routes/EntradaRoutes');
const SalidaGastoRoutes = require('./routes/SalidaGastoRoutes');
const InventarioRoutes = require('./routes/InventarioRoutes');

// Usar las rutas
expressApp.use(UnidadMedidaRoutes);
expressApp.use(ArticuloRoutes);
expressApp.use(EntradaRoutes);
expressApp.use(SalidaGastoRoutes);
expressApp.use(InventarioRoutes);

// Rutas de renderización con EJS
expressApp.get('/', (req, res) => {
    res.render('inventario');
});
expressApp.get('/inventario', (req, res) => {
    res.render('inventario');
});
expressApp.get('/unidades-medida', (req, res) => {
    res.render('unidades-medida');
});
expressApp.get('/entradas', (req, res) => {
    res.render('entradas');
});
expressApp.get('/salidas', (req, res) => {
    res.render('salidas');
});
expressApp.get('/articulos', (req, res) => {
    res.render('articulos');
});

// Iniciar el servidor Express
expressApp.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});

// Función para crear la ventana principal de Electron
function createWindow() {
    if (ventanaPrincipal) {
        ventanaPrincipal.focus();
        return;
    }

    ventanaPrincipal = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    ventanaPrincipal.setMenu(null); // Quitar menú

    ventanaPrincipal.loadURL(`http://localhost:${PORT}`); // Cargar la aplicación desde el servidor Express

    ventanaPrincipal.on('closed', () => {
        ventanaPrincipal = null; // Limpiar la referencia cuando la ventana se cierra
    });
}

// Iniciar la aplicación Electron
app.whenReady().then(createWindow);

// Cerrar la aplicación cuando todas las ventanas están cerradas
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (ventanaPrincipal === null) {
        createWindow();
    }
});




/*
---------------------------------------------------------------
npm init --yes
npm install electron --save-dev
npm install express
npm install sqlite3
npm install ejs

{
    ...
    "main": "src/main.js",
    "scripts": {
        "start": "electron src/main.js"
    },
    ...
}

npm start
----------------------------------------------------------------
npm i electron-packager

{
    "productName":"Control Gastos",
    ...
    "scripts": {
        ...
        "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
        "package-win": "electron-packager . electron-tutorial-app --overwrite --platform=win32 --asar --arch=x64 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron Tutorial App\"",    
        "package-linux": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"
    },
    ...
}

npm run package-win
npm run package-mac
npm run package-linux
-------------------------------Subir a git------------------------
.gitignore

git init
git add .
git commit -m "Primer commit"
git remote add origin https://github.com/SashOso2/ControlGastosElectron.git
git push -u origin master
------------------------------Clonar -------------------------
git clone https://github.com/SashOso2/ControlGastosElectron.git
----------------------------Guardar cabmaios--------------------------
git add .
git commit -m "agregar commit"
git push
------------------------------------------------------------------
git pull origin master
git status
*/