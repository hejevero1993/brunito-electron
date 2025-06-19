import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

/******************************************************************************************************
 * Global constant | DEV:HV|
 ******************************************************************************************************/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/******************************************************************************************************
 * Creating physical window | DEV:HV|
 ******************************************************************************************************/
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    /******************************************************************************************************
     * Start windows maximized | DEV:HV|
     ******************************************************************************************************/
    mainWindow.maximize();
    /******************************************************************************************************
     * Select file to show | DEV:HV|
     ******************************************************************************************************/
    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:5173");
    } else {
        mainWindow.loadFile(path.join(__dirname, "../index.html"));
    }
};

/******************************************************************************************************
 * Manage actions on window load ready | DEV:HV|
 ******************************************************************************************************/
app.whenReady().then(() => {
    //ipcMain.handle("ping", () => "pong");
    /******************************************************************************************************
     * Function to active physical window | DEV:HV|
     ******************************************************************************************************/
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

/******************************************************************************************************
 * Manage actions on all windows closed | DEV:HV|
 ******************************************************************************************************/
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
