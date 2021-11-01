const {app, BrowserWindow, Tray, shell, Menu, globalShortcut, remote, ipcMain,Notification} = require('electron')
const Notifiers = require('./notifier.js')
const { Client } = require('whatsapp-web-electron.js');
const pie = require("puppeteer-in-electron")
const path = require('path')
const { autoUpdater } = require("electron-updater");
const createNewWindow = require('./CreateNewWindow');

autoUpdater.checkForUpdatesAndNotify();
pie.initialize(app);


let mainWindow=null,user_agent,whatsapp,page1,check

//Only one instance of whatsapp can run at once
const gotTheLock = app.requestSingleInstanceLock()
if(gotTheLock){
  app.on('second-instance',()=>{
    if(mainWindow){
      mainWindow.show()
    }
  })
}
else app.quit()


//defines the menu template
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
let menu = Menu.buildFromTemplate(templ);



async function myNewFun() {
  const menu = Menu.buildFromTemplate(templ)
  Menu.setApplicationMenu(menu)


  let obj= await createNewWindow()
  mainWindow = obj.mainWindow
  let browser1 = obj.browser1
  user_agent = obj.user_agent


  globalShortcut.register('CommandOrControl+Shift+R', async function() {
    console.log('CommandOrControl+R was pressed')
    app.emit('reload1')
  })
  //BrowserWindow.getAllWindows()[0].webContents.session.clearStorageData()
}



app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready',()=>{
  myNewFun()
})

app.on('reload1',async ()=>{
  console.log('Reloading the app')
  app.relaunch()
  app.exit()
})



ipcMain.addListener('showWindow',(event)=>{
  window = BrowserWindow.getAllWindows()[0]
  if(!window.isVisible()) window.show()
  window.focus()
  //console.log("in")
})  