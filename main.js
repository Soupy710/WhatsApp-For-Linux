const {app, BrowserWindow, Menu, globalShortcut, remote} = require('electron')
const path = require('path')

let mainWindow
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
  const user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36';
  mainWindow.loadURL('https://web.whatsapp.com',{userAgent: user_agent})

   //mainWindow.webContents.openDevTools()
   mainWindow.once('ready-to-show', () => {mainWindow.show()})
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

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})