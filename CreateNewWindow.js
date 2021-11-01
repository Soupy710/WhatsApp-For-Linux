const {app, BrowserWindow, Tray, shell, ipcMain} = require('electron')
const { Client } = require('whatsapp-web-electron.js');
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");
const path = require('path')
const TraySettings = require('./Tray')
let packageInfo = require('./package.json');
let browser1


async function createWindow () {

  let mainWindow = new BrowserWindow({
    show: false,
    icon: path.join(__dirname,'assets/icons/64x64.png'),
    width: 900,
    height: 800,
    darkTheme: true,
    autoHideMenuBar: true,
    //frame:false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '/preload.js'),
      contextIsolation: false
    }
  })

  const tray = new TraySettings(path.join(__dirname,'assets/icons/whatsapp.png'),mainWindow,app)
  tray.initialize()


  const user_agent = mainWindow.webContents.session.getUserAgent().replace(`WhatsAppDesktop/${packageInfo.version} `,"").replace(`Electron/${packageInfo.devDependencies.electron} `,"")


  mainWindow.loadURL('https://web.whatsapp.com',{userAgent: user_agent})
  browser1 = await pie.connect(app,puppeteer);


  let whatsapp =new Client(browser1,mainWindow,{userAgent: user_agent,qrTimeoutMs: 0});
  whatsapp.on('ready', () => {
        console.log('WhatsApp client ready');
        mainWindow.webContents.send('whatsapp_ready')
  });
  whatsapp.initialize()
  
  /*whatsapp.on('message',async (msg)=>{
    console.log(msg.body)
    if(msg.body=='Hey')
    {
      msg.getChat().then(async (chat)=>{
        msg.reply('Hello')
      })
    }
  });*/

  mainWindow.on('close',(e)=>{
      e.preventDefault()
      mainWindow.hide()
  })

  mainWindow.once('ready-to-show',() => {
    mainWindow.webContents.session.clearStorageData({storages: ["serviceworkers"]})
  })

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.show()

  return {mainWindow,user_agent,browser1}  
}


module.exports = createWindow;