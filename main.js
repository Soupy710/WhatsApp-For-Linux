const {app, BrowserWindow, Tray, shell, Menu, globalShortcut, remote, ipcMain} = require('electron')
const { Client } = require('whatsapp-web-electron.js');
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");
const TraySettings = require('./Tray')
const path = require('path')
const createNewWindow = require('./CreateNewWindow')
let packageInfo = require('./package.json');
let mainWindow,user_agent,whatsapp,page1
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
  await pie.initialize(app);
  app.whenReady().then(async () => {
  const menu = Menu.buildFromTemplate(templ)
  Menu.setApplicationMenu(menu)
  let obj= await createNewWindow()
  mainWindow = obj.mainWindow
  let browser1 = obj.browser1
  user_agent = obj.user_agent
  page1 = obj.page1
  whatsapp =new Client(browser1,mainWindow,{userAgent: user_agent,qrTimeoutMs: 0});
  await whatsapp.initialize(browser1,path.join(__dirname,'assets/icon/whatsapp.png'))
  globalShortcut.register('CommandOrControl+Shift+R', async function() {
    flag1=1
    console.log('CommandOrControl+R is pressed')
    app.emit('reload1')
    mainWindow.close()
    //await page1.reload().then(()=>{console.log("everything's fine")}).catch((err)=>{console.log})
  })
  whatsapp.on('ready', () => {
    console.log('Whatsapp client ready');
  });
  whatsapp.on('message',(msg)=>{
   console.log(msg.from)
   console.log(msg.body)
   if(msg.body=='Hi')
   {
    msg.getChat().then(async (chat)=>{
      await chat.sendStateTyping()
      msg.reply('Hello')
      //await setInterval(()=>{},1000)
    })
   }
   //console.log(msg.location)
   /*msg.getContact().then((con)=>{
     console.log(con)
   })
   msg.getChat().then((chat)=>{
     console.log(chat)
   })*/
  });
  const tray = new TraySettings(path.join(__dirname,'assets/icons/whatsapp.png'),mainWindow)
  tray.initialize()
  //BrowserWindow.getAllWindows()[0].webContents.session.clearStorageData()

  }).catch((err)=>{console.log('An error occured while starting the process...',err)})
}
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
ipcMain.addListener('showWindow',(event)=>{
  console.log("in")
})  
mynewfun()
app.on('reload1',()=>{
  console.log("dfsd")
  app.relaunch()
})