require("dotenv").config();

const { app, Menu } = require("electron");

const setMainMenu = () => {
    const template = [
        {
            label: process.env.APP_NAME,
            submenu: [
                {
                    label: "Acerca de...",
                    role: "about",
                },
                {
                    type: "separator",
                },
                {
                    label: "Salir",
                    role: "quit",
                },
            ],
        },
        {
            label: "Vista",
            submenu: [
                {
                    label: "Recargar",
                    role: "reload",
                },
                {
                    label: "Forzar recarga",
                    role: "forceReload",
                },
                {
                    label: "DevTools",
                    role: "toggleDevTools",
                },
                {
                    type: "separator",
                },
                {
                    label: "Reiniciar zoom",
                    role: "resetZoom",
                },
                {
                    label: "Acercar",
                    role: "zoomIn",
                },
                {
                    label: "Alejar",
                    role: "zoomOut",
                },
                { type: "separator" },
                {
                    label: "Pantalla completa",
                    role: "togglefullscreen",
                },
            ],
        },
        // {
        //     label: "Ventana",
        //     submenu: [],
        // },
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

module.exports = {
    setMainMenu,
};
