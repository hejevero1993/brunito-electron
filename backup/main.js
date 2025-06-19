require("dotenv").config();

const { app, BrowserWindow, ipcMain, autoUpdater, dialog, Menu } = require("electron");
const { updateElectronApp, UpdateSourceType } = require("update-electron-app");
const { setMainMenu } = require("./menu.js");
const path = require("node:path");

updateElectronApp();

const server = "";
const url = ``;

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
    mainWindow.loadFile("index.html");
};

/******************************************************************************************************
 * Generate menu from template | DEV:HV|
 ******************************************************************************************************/
setMainMenu();

/******************************************************************************************************
 * Manage actions on window load ready | DEV:HV|
 ******************************************************************************************************/
app.whenReady().then(() => {
    ipcMain.handle("ping", () => "pong");
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
