const {ipcRenderer} = require("electron")
window.oldNotification = Notification;
window.Notification = function (title, options) {
	console.log("sad")
	//if(settings.get('notification.enabled.value')) {
		const n = new window.oldNotification(title, options);
		//console.log(title,options)
		n.addEventListener('click', function () {
			ipcRenderer.send('showWindow');
		});
		return n;
	//}
};
//console.log("hellow wo")
Object.assign(window.Notification, window.oldNotification);