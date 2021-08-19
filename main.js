const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

const isMac = process.platform === 'darwin'

const template = [
  {
    label: 'Settings',
    submenu:[
      {
        label: 'Twitter Tokens',
        click: async () => {
         let twitter_tokens_settings = new BrowserWindow({width: 600,height: 400, resizable: false, webPreferences: {contextIsolation: true, nodeIntegration: true, preload: path.join(__dirname, 'preload.js'),}})
         twitter_tokens_settings.setMenuBarVisibility(false)
         twitter_tokens_settings.loadFile('tokens_settings.html')
         twitter_tokens_settings.webContents.openDevTools()
        }
      },
      {
        label: 'Tweet Message'
      }
    ]
  },
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Join Discord',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://discord.com/invite/nhvh8zeYdX')
        }
      },
      {
        label: 'Github',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://github.com/corentinmace/gamepad-viewer-app')
        }
      },
      {
        label: 'About ElectronJS',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }

    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow() {
    const win = new BrowserWindow({
        titleBarStyle: 'show',
        icon: 'assets/img/icon.png',
        width: 400,
        height: 750,
        resizable: false,
        alwaysOnTop: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),

        }
    })
    win.setMenuBarVisibility(true)

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

ipcMain.on('print-name', (event, name) => {
  event.reply('name-status', 'Printed tokens to the Node.js console!')
  fs.writeFileSync(`${__dirname}/tokens.json`, JSON.stringify(name, null, 4), 'utf-8')
})