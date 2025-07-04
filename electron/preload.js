import { contextBridge, ipcRenderer } from "electron";
import Store from "electron-store";

console.log("Preload.js is loaded...");

const store = new Store();

contextBridge.exposeInMainWorld("env", {
    nodeEnv: () => process.env.NODE_ENV,
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping"),
});

contextBridge.exposeInMainWorld("api", {
    sendLoginForm: (data) => ipcRenderer.invoke("login:send", data),
    saveUser: (user) => store.set("user", user),
    getUser: () => store.get("user"),
    clearUser: () => store.delete("user"),
});
