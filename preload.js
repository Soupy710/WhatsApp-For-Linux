const {ipcRenderer} = require("electron")

ipcRenderer.on('whatsapp_ready',()=>{

	oldnotif = Notification;
	window.Notification = function (title, options) {
		const n = new oldnotif(title, options);
		console.log(title,options)
		n.addEventListener('click', function () {
			ipcRenderer.send('showWindow');
		});
		return n;
	};

	workar = window.document.getElementsByClassName('_2XcXo')[0]
	if(workar) window.document.getElementsByClassName('_2XcXo')[0].remove()	

	console.log('WhatsApp notifications configured')
})
