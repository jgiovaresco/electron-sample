import * as path from "path";

import { App, BrowserWindow } from "electron";

export default class Main {
  static mainWindow: BrowserWindow | null;
  static application: App;
  static BrowserWindowClass: typeof BrowserWindow;

  private static async createWindow() {
    Main.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    await Main.mainWindow.loadFile("./index.html");
    Main.mainWindow.webContents.openDevTools({ mode: "detach" });
    Main.mainWindow.on("closed", Main.onClose);
  }

  private static onWindowAllClosed() {
    if (process.platform !== "darwin") {
      Main.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object.
    Main.mainWindow = null;
  }

  private static onReady() {
    return Main.createWindow();
  }

  private static async onActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
      await Main.createWindow();
    }
  }

  public static main(
    app: Electron.App,
    browserWindow: typeof BrowserWindow
  ): void {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    Main.BrowserWindowClass = browserWindow;
    Main.application = app;
    Main.application.on("window-all-closed", Main.onWindowAllClosed);
    Main.application.on("ready", Main.onReady);
    Main.application.on("activate", Main.onActivate);
  }
}
