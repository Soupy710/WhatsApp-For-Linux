const {app, BrowserWindow, Tray, shell, Menu, globalShortcut, remote, ipcMain,Notification} = require('electron')
const Notifiers = require('./notifier.js')
const { Client } = require('whatsapp-web-electron.js');
const pie = require("puppeteer-in-electron")
const path = require('path')
const createNewWindow = require('./CreateNewWindow');
pie.initialize(app);
let mainWindow=null,user_agent,whatsapp,page1,check
const gotTheLock = app.requestSingleInstanceLock()
if(gotTheLock){
  app.on('second-instance',()=>{
    if(mainWindow){
      console.log('gotcha!')
      mainWindow.show()
    }
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
        app.quit()
      }
    }
  ]
  }
]
let menu = Menu.buildFromTemplate(templ);
let flag1
async function mynewfun() {
  flag1 = 0
  const menu = Menu.buildFromTemplate(templ)
  Menu.setApplicationMenu(menu)
  let obj= await createNewWindow()
  mainWindow = obj.mainWindow
  let browser1 = obj.browser1
  user_agent = obj.user_agent
  console.log(mainWindow)
  globalShortcut.register('CommandOrControl+Shift+R', async function() {
    flag1=1
    console.log('CommandOrControl+R is pressed')
    app.emit('reload1')
    mainWindow.close()
  })
   //console.log(msg.location)
   /*msg.getContact().then((con)=>{
     console.log(con)
   })
   msg.getChat().then((chat)=>{
     console.log(chat)
   })
});*/
//temp.show()
  //BrowserWindow.getAllWindows()[0].webContents.session.clearStorageData()
}



app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


ipcMain.addListener('showWindow',(event)=>{
  BrowserWindow.getAllWindows()[0].show()
  console.log("in")
})  


app.on('ready',()=>{
  mynewfun()})

app.on('reload1',()=>{
  console.log("dfsd")
  app.relaunch()
})