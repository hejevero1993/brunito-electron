import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        electron([
            {
                entry: "electron/main.js",
                vite: { envFile: false },
            },
            {
                entry: "electron/preload.js",
                onstart(options) {
                    options.reload();
                },
            },
        ]),
    ],
    base: "./",
    build: {
        outDir: "dist",
    },
});

