import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import Store from "electron-store";

const store = new Store();

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
            enableRemoteModule: true,
            contextIsolation: true,
            nodeIntegration: true,
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

/******************************************************************************************************
 * Front functions communication | DEV:HV|
 ******************************************************************************************************/
ipcMain.handle("login:send", async (event, data) => {
    console.log("Login data", data);

    const response = await login(data);

    return response;
});

ipcMain.handle("register:send", async (event, data) => {
    console.log("Register data", data);

    const response = await register(data);

    return response;
});

ipcMain.handle("data:get", (event, key) => store.get(key));

ipcMain.handle("data:set", (event, key, value) => store.set(key, value));

ipcMain.handle("data:clear", () => store.clear());

/******************************************************************************************************
 * Init axio librarie used to connect to api | DEV:HV|
 ******************************************************************************************************/
const api = axios.create({
    baseURL: process.env.API_URL || "http://127.0.0.1:8000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

const apiSecure = axios.create({
    baseURL: process.env.API_URL || "http://127.0.0.1:8000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

const login = async (data) => {
    try {
        const res = await api.post("/api/login", data);

        return {
            status: res.status,
            statusText: res.statusText,
            success: res.data?.success || false,
            message: res.data?.message || null,
            ...(res.data?.errors && { error: res.data.errors }),
            ...(res.data?.data && { data: res.data.data }),
        };
    } catch (error) {
        return {
            success: false,
            status: error.response?.status || 500,
            statusText: error.response?.statusText || "Network error!",
            message: error.response?.data?.message || null,
            error: {
                errors: error.response?.data?.errors || null,
            },
        };
    }
};

const register = async (data) => {
    try {
        const res = await api.post("/api/register", data);

        return {
            status: res.status,
            statusText: res.statusText,
            success: res.data?.success || false,
            message: res.data?.message || null,
            ...(res.data?.errors && { error: res.data.errors }),
            ...(res.data?.data && { data: res.data.data }),
        };
    } catch (error) {
        return {
            success: false,
            status: error.response?.status || 500,
            statusText: error.response?.statusText || "Network error!",
            message: error.response?.data?.message || null,
            error: {
                errors: error.response?.data?.errors || null,
            },
        };
    }
};
