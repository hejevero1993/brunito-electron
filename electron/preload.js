import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("env", {
    nodeEnv: process.env.NODE_ENV,
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke("ping"),
});
