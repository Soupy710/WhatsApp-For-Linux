
const {app,Notification,ipcRenderer} = require('electron')
class Notifiers
{
    constructor(body,auth)
    {
        this.body = body
        this.auth = auth
    }
    async initialize()
    {
        const notif = new Notification({
            title: `From ${this.auth}`,
            body: this.body
            });
        return notif;
    }
}
module.exports = Notifiers