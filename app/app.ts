import { App, BrowserWindow } from "electron";

export default class Application {
  static mainWindow: BrowserWindow | null;
  static application: App;
  static BrowserWindow: typeof BrowserWindow;
  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        Application.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object. 
    Application.mainWindow = null;
  }

  private static onReady() {
    Application.mainWindow = new Application.BrowserWindow({
      width: 1600,
      height: 900,
      // webPreferences: {
      //   preload: path.join(__dirname, "preload.js"),
      // },
    });
    Application.mainWindow.loadFile(__dirname + '/../view/index.html');
    Application.mainWindow.on('closed', Application.onClose);
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the  
    // Electron.BrowserWindow into this function 
    // so this class has no dependencies. This 
    // makes the code easier to write tests for
    Application.BrowserWindow = browserWindow;
    Application.application = app;
    Application.application.on('window-all-closed', Application.onWindowAllClosed);
    Application.application.on('ready', Application.onReady);
  }
}
