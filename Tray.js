const {Tray, shell,Menu} = require('electron')
class TraySettings
{
    constructor(path_name,mainWindow)
    {
        this.window = mainWindow
        this.tray = new Tray(path_name)
    }
    initialize()
    {
        this.tray.setToolTip('WhatsApp')
        this.tray.setTitle('WhatsApp')
        let temp = [
        {
            label: 'Quit WhatsApp',click: ()=>{
                this.window.destroy()
            }
        },
        {
            label: 'Show Window',click: ()=>{
                this.window.show()
                this.tray.setContextMenu(contextmenu)
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
        this.tray.setContextMenu(contextmenu)
    }
}
module.exports = TraySettings