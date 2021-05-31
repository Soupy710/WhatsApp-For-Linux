const {app, BrowserWindow, Tray, shell} = require('electron')
const { Client } = require('whatsapp-web-electron.js');
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");
const path = require('path')
let packageInfo = require('./package.json');
let browser1,user_agent
async function createWindow () {
    browser1 = await pie.connect(app,puppeteer);
    let mainWindow = new BrowserWindow({
      show: false,
      icon: path.join(__dirname,'assets/icons/64x64.png'),
      width: 900,
      height: 800,
      darkTheme: true,
      autoHideMenuBar: true,
      //frame:false,
      webPreferences: {
        preload: path.join(__dirname,'preload.js'),
        enableRemoteModule: true
      }
    })
    user_agent = mainWindow.webContents.session.getUserAgent().replace(`WhatsAppDesktop/${packageInfo.version} `,"").replace(`Electron/${packageInfo.devDependencies.electron} `,"")
    app.userAgentFallback = user_agent
    //console.log(user_agent)
    await mainWindow.loadURL('https://web.whatsapp.com',{userAgent: user_agent})

    /*mainWindow.once('ready-to-show',() => {
     mainWindow.webContents.session.clearStorageData({storages: ["serviceworkers"]}).then( async ()=>{
       mainWindow.webContents.reload()
     }).catch(()=>{console.log("Could not clear the data")})*/
     
     mainWindow.webContents.on('new-window', function(e, url) {
      e.preventDefault();
      shell.openExternal(url);
    });
    /*mainWindow.on('close',(e)=>{
      console.log("not closing") 
      e.preventDefault()
    })*/
   mainWindow.show()
   let page1 = await pie.getPage(browser1, mainWindow);
  page1.on('error',(err)=>{console.log("eerrre")})
   return {mainWindow,user_agent,browser1,page1}  
  }
module.exports = createWindow;