const {ipcRenderer} = require("electron")

ipcRenderer.on('whatsapp_ready',()=>{
	oldnotif = Notification;
	window.Notification = function (title, options) {
		const n = new oldnotif(title, options);
		n.addEventListener('click', function () {
			ipcRenderer.send('showWindow');
		});
		return n;
	};

	updateAvailable = window.document.getElementsByClassName('_2XcXo')[0]
	if(updateAvailable) window.document.getElementsByClassName('_2XcXo')[0].remove()	
	Object.assign(window.Notification,oldnotif)
	
	//below code is used to remove the frame of the whatsapp webview
	element = window.document.getElementsByTagName("body")
    let ele = window.document.createElement("div")
    ele.setAttribute("style","width: 100%;height:2.5%; -webkit-app-region: drag; position: absolute")
    element[0].insertBefore(ele,element[0].childNodes[0])
})