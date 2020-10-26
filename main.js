const { app, BrowserWindow } = require("electron");

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    hauteur: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  await win.loadFile("index.html");
  win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    return createWindow();
  }
});
