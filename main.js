const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

function onReady () {
	win = new BrowserWindow({width: 1280, height: 675})
	win.loadURL(url.format({
		pathname: path.join(
			__dirname,
			'dist/bpicsmb/index.html'),
		protocol: 'file:',
		slashes: true
	}))
}

app.on('ready', onReady);