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
    sendForm: (data) => ipcRenderer.invoke("login:send", data),
});
