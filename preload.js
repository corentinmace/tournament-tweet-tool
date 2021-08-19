const { contextBridge, ipcRenderer } = require('electron')

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld(
  'myAPI', // This is just an arbitrary name of the window property you're creating.
           // It should be meaningful to your app.
  {
    // You can call this in the renderer like so:
    // window.myAPI.printNameToCLI(myName)
    printNameToCLI: (name) => ipcRenderer.send('print-name', name)
  }
)

// Handle the IPC message sent from the main process after it prints the
// name to the console by showing a status banner at the top
ipcRenderer.on('name-status', (event, message) => {
  
  console.log(`Message from the main process: ${message}`)

})