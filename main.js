const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        titleBarStyle: 'show',
        icon: 'assets/img/icon.png',
        width: 400,
        height: 700,
        resizable: false,
        alwaysOnTop: true,

        webPreferences: {
            nodeIntegration: true
        }
    })
    win.setMenuBarVisibility(false)

    win.loadFile('index.html')
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})