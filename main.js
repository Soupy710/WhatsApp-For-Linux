const {app, BrowserWindow, Menu, globalShortcut, remote} = require('electron')
const path = require('path')
let mainWindow
let packageInfo = require('./package.json')
//onsole.log(packageInfo)
function createWindow () {
  mainWindow = new BrowserWindow({
    show: false,
    darkTheme: true,
    //frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true
    }
  })
  const user_agent = mainWindow.webContents.session.getUserAgent().replace(`whatsapp-desktop/${packageInfo.version} `,"").replace(`Electron/${packageInfo.devDependencies.electron} `,"")
  
  console.log(user_agent)
  mainWindow.loadURL('https://web.whatsapp.com',{userAgent: user_agent})
  //mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show',() => {
   mainWindow.webContents.session.clearStorageData({storages: ["serviceworkers"]}).then( async ()=>{
     //console.log("inside")
     await mainWindow.webContents.reload()
     mainWindow.show()
   })
 })
 mainWindow.show()
}

let flag = true;
let menu
let templ = 
[
  {
    label: 'Controls',
    submenu: 
    [{
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      role: 'reload'
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+W',
      role: 'quit'
    }
  ]
  }
]
menu = Menu.buildFromTemplate(templ)
app.whenReady().then(() => {
  createWindow()
  const menu = Menu.buildFromTemplate(templ)
    Menu.setApplicationMenu(menu)
  globalShortcut.register('CommandOrControl+Q', () => {
    if(!flag)
    {
      flag=true;
      Menu.setApplicationMenu(menu)
    }
    else 
    {
      flag=false;
      Menu.setApplicationMenu(null)
    }
  })
  //BrowserWindow.getAllWindows()[0].webContents.session.clearStorageData()
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('quit',()=>{
  mainWindow = null
})
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})