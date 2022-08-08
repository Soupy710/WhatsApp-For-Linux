const { BrowserWindow, shell} = require('electron')
const path = require('path')
const TraySettings = require('./Tray')
let packageInfo = require('./package.json');

async function createWindow () {

  let mainWindow = new BrowserWindow({
    show: false,
    icon: path.join(__dirname,'assets/icons/64x64.png'),
    width: 900,
    height: 800,
    darkTheme: true,
    autoHideMenuBar: true,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'),
      contextIsolation: false
    }
  })

  const tray = new TraySettings(path.join(__dirname,'assets/icons/whatsapp.png'),mainWindow)
  tray.initialize()

  const user_agent = mainWindow.webContents.session.getUserAgent().replace(`WhatsAppDesktop/${packageInfo.version} `,"").replace(`Electron/${packageInfo.devDependencies.electron} `,"")

  mainWindow.loadURL('https://web.whatsapp.com',{userAgent: user_agent})
  mainWindow.webContents.send("whatsapp_ready")
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
  return mainWindow
}

module.exports = createWindow;