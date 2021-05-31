const {Tray, shell,Menu, ipcMain} = require('electron')
class TraySettings
{
    constructor(path_name,mainWindow)
    {
        this.window = mainWindow
        this.path_name = path_name;
        console.log('Tray instance created!')
    }
    initialize()
    {
        let tray = new Tray(this.path_name)
        tray.setToolTip('WhatsApp')
        let temp = [
        {
            label: 'Quit WhatsApp',click: ()=>{
                this.window.close()
                tray.setContextMenu(contextmenu)
            }
        },
        {
            label: 'Show Window',click: ()=>{
                this.window.show()
                tray.setContextMenu(contextmenu)
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Developers Site',
            click: ()=>{
                shell.openExternal('https://www.github.com/Soupy710/WhatsApp-For-Linux')
            }
        }
       ]
        const contextmenu = Menu.buildFromTemplate(temp)
        tray.setContextMenu(contextmenu)
    }
}
module.exports = TraySettings