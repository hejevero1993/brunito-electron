import { contextBridge, ipcRenderer } from "electron";

console.log("Preload.js is loaded...");

contextBridge.exposeInMainWorld("env", {
    nodeEnv: () => process.env.NODE_ENV,
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping"),
});

contextBridge.exposeInMainWorld("api", {
    sendLoginForm: (data) => ipcRenderer.invoke("login:send", data),
    sendRegisterForm: (data) => ipcRenderer.invoke("register:send", data),
    setData: (key, value) => ipcRenderer.invoke("data:set", key, value),
    getData: (key) => ipcRenderer.invoke("data:get", key),
    clearData: () => ipcRenderer.invoke("data:clear"),
});
