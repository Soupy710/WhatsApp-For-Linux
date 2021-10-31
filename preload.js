const {ipcRenderer, Renderer} = require("electron")
ipcRenderer.on('whatsapp_ready',()=>{
	// console.log('hello woedddddd')
	// x = document
	// console.log(x)
	// console.log(x[0])
	// document.head.append('<script src="./Renderer.js">')
	console.log('as')
	window.oldNotification = Notification;
	window.Notification = function (title, options) {
	console.log("sad")
	const n = new window.oldNotification(title, options);
		console.log(title,options)
		n.addEventListener('click', function () {
			ipcRenderer.send('showWindow');
		});
		return n;
	
};
Object.assign(window.Notification, window.oldNotification);
console.log(window.Notification)
})
console.log("hellow wo")
