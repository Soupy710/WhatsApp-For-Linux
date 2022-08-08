const {app, BrowserWindow, Menu, globalShortcut, ipcMain} = require('electron')
const path = require('path')
const createNewWindow = require('./CreateNewWindow');

//const { autoUpdater } = require("electron-updater");
//autoUpdater.checkForUpdatesAndNotify();

let mainWindow=null

//Only one instance of whatsapp can run at once
const gotTheLock = app.requestSingleInstanceLock()
if(gotTheLock){
  app.on('second-instance',()=>{
    if(mainWindow) mainWindow.show()
  })
}
else app.quit()

let templ = 
[
  {
    label: 'Controls',
    submenu: 
    [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+Shift+R'  
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+Q',
      role: 'minimize'
    },
    {
      label: 'Open Developer Tools',
      accelerator: 'CmdOrCtrl+Shift+I',
      role: 'toggleDevTools'
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+W',
      click: ()=>{
        console.log('Quitting WhatsApp...')
        app.quit()
      }
    }
  ]
  }
]

async function mainFunction() {

  const menu = Menu.buildFromTemplate(templ)
  Menu.setApplicationMenu(menu)

  mainWindow = await createNewWindow()

  globalShortcut.register('CommandOrControl+Shift+R', async function() {
    app.emit('reload1')
  })
  //BrowserWindow.getAllWindows()[0].webContents.session.clearStorageData()
}

app.on('window-all-closed',()=>{app.quit()})

app.on('activate', function () {
  if(BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready',()=>{mainFunction()})

app.on('reload1',async ()=>{
  console.log('Reloading the app')
  app.relaunch()
  app.exit()
})

ipcMain.addListener('showWindow',(event)=>{
  window = BrowserWindow.getAllWindows()[0]
  if(!window.isVisible()) window.show()
  window.focus()
})  