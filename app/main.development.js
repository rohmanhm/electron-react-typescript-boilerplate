"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var electron_1 = require("electron");
require("./database");
var menu;
var template;
var mainWindow = null;
if (process.env.NODE_ENV === 'production') {
    var sourceMapSupport = require('source-map-support'); // eslint-disable-line
    sourceMapSupport.install();
}
if (process.env.NODE_ENV === 'development') {
    require('electron-debug')(); // eslint-disable-line global-require
    var path = require('path'); // eslint-disable-line
    var p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
    require('module').globalPaths.push(p); // eslint-disable-line
}
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
var installExtensions = function () {
    if (process.env.NODE_ENV === 'development') {
        var installer_1 = require('electron-devtools-installer'); // eslint-disable-line global-require
        var extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
        var forceDownload_1 = !!process.env.UPGRADE_EXTENSIONS;
        return Promise.all(extensions.map(function (name) { return installer_1.default(installer_1[name], forceDownload_1); }));
    }
    return Promise.resolve([]);
};
electron_1.app.on('ready', function () {
    return installExtensions().then(function () {
        mainWindow = new electron_1.BrowserWindow({
            show: false,
            width: 1024,
            height: 728
        });
        mainWindow.loadURL("file://" + __dirname + "/app.html");
        mainWindow.webContents.on('did-finish-load', function () {
            mainWindow.show();
            mainWindow.focus();
        });
        mainWindow.on('closed', function () {
            mainWindow = null;
        });
        if (process.env.NODE_ENV === 'development') {
            mainWindow.openDevTools();
            mainWindow.webContents.on('context-menu', function (e, props) {
                var x = props.x, y = props.y;
                electron_1.Menu.buildFromTemplate([
                    {
                        label: 'Inspect element',
                        click: function () {
                            mainWindow.inspectElement(x, y);
                        }
                    }
                ]).popup(mainWindow);
            });
        }
        if (process.platform === 'darwin') {
            template = [
                {
                    label: 'Electron',
                    submenu: [
                        {
                            label: 'About ElectronReact'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Services',
                            submenu: []
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Hide ElectronReact',
                            accelerator: 'Command+H',
                            selector: 'hide:'
                        },
                        {
                            label: 'Hide Others',
                            accelerator: 'Command+Shift+H',
                            selector: 'hideOtherApplications:'
                        },
                        {
                            label: 'Show All',
                            selector: 'unhideAllApplications:'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Quit',
                            accelerator: 'Command+Q',
                            click: function () {
                                electron_1.app.quit();
                            }
                        }
                    ]
                },
                {
                    label: 'Edit',
                    submenu: [
                        {
                            label: 'Undo',
                            accelerator: 'Command+Z',
                            selector: 'undo:'
                        },
                        {
                            label: 'Redo',
                            accelerator: 'Shift+Command+Z',
                            selector: 'redo:'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Cut',
                            accelerator: 'Command+X',
                            selector: 'cut:'
                        },
                        {
                            label: 'Copy',
                            accelerator: 'Command+C',
                            selector: 'copy:'
                        },
                        {
                            label: 'Paste',
                            accelerator: 'Command+V',
                            selector: 'paste:'
                        },
                        {
                            label: 'Select All',
                            accelerator: 'Command+A',
                            selector: 'selectAll:'
                        }
                    ]
                },
                {
                    label: 'View',
                    submenu: process.env.NODE_ENV === 'development'
                        ? [
                            {
                                label: 'Reload',
                                accelerator: 'Command+R',
                                click: function () {
                                    mainWindow.webContents.reload();
                                }
                            },
                            {
                                label: 'Toggle Full Screen',
                                accelerator: 'Ctrl+Command+F',
                                click: function () {
                                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                                }
                            },
                            {
                                label: 'Toggle Developer Tools',
                                accelerator: 'Alt+Command+I',
                                click: function () {
                                    mainWindow.toggleDevTools();
                                }
                            }
                        ]
                        : [
                            {
                                label: 'Toggle Full Screen',
                                accelerator: 'Ctrl+Command+F',
                                click: function () {
                                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                                }
                            }
                        ]
                },
                {
                    label: 'Window',
                    submenu: [
                        {
                            label: 'Minimize',
                            accelerator: 'Command+M',
                            selector: 'performMiniaturize:'
                        },
                        {
                            label: 'Close',
                            accelerator: 'Command+W',
                            selector: 'performClose:'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Bring All to Front',
                            selector: 'arrangeInFront:'
                        }
                    ]
                },
                {
                    label: 'Help',
                    submenu: [
                        {
                            label: 'Learn More',
                            click: function () {
                                electron_1.shell.openExternal('http://electron.atom.io');
                            }
                        },
                        {
                            label: 'Documentation',
                            click: function () {
                                electron_1.shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                            }
                        },
                        {
                            label: 'Community Discussions',
                            click: function () {
                                electron_1.shell.openExternal('https://discuss.atom.io/c/electron');
                            }
                        },
                        {
                            label: 'Search Issues',
                            click: function () {
                                electron_1.shell.openExternal('https://github.com/atom/electron/issues');
                            }
                        }
                    ]
                }
            ];
            menu = electron_1.Menu.buildFromTemplate(template);
            electron_1.Menu.setApplicationMenu(menu);
        }
        else {
            template = [
                {
                    label: '&File',
                    submenu: [
                        {
                            label: '&Open',
                            accelerator: 'Ctrl+O'
                        },
                        {
                            label: '&Close',
                            accelerator: 'Ctrl+W',
                            click: function () {
                                mainWindow.close();
                            }
                        }
                    ]
                },
                {
                    label: '&View',
                    submenu: process.env.NODE_ENV === 'development'
                        ? [
                            {
                                label: '&Reload',
                                accelerator: 'Ctrl+R',
                                click: function () {
                                    mainWindow.webContents.reload();
                                }
                            },
                            {
                                label: 'Toggle &Full Screen',
                                accelerator: 'F11',
                                click: function () {
                                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                                }
                            },
                            {
                                label: 'Toggle &Developer Tools',
                                accelerator: 'Alt+Ctrl+I',
                                click: function () {
                                    mainWindow.toggleDevTools();
                                }
                            }
                        ]
                        : [
                            {
                                label: 'Toggle &Full Screen',
                                accelerator: 'F11',
                                click: function () {
                                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                                }
                            }
                        ]
                },
                {
                    label: 'Help',
                    submenu: [
                        {
                            label: 'Learn More',
                            click: function () {
                                electron_1.shell.openExternal('http://electron.atom.io');
                            }
                        },
                        {
                            label: 'Documentation',
                            click: function () {
                                electron_1.shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                            }
                        },
                        {
                            label: 'Community Discussions',
                            click: function () {
                                electron_1.shell.openExternal('https://discuss.atom.io/c/electron');
                            }
                        },
                        {
                            label: 'Search Issues',
                            click: function () {
                                electron_1.shell.openExternal('https://github.com/atom/electron/issues');
                            }
                        }
                    ]
                }
            ];
            menu = electron_1.Menu.buildFromTemplate(template);
            mainWindow.setMenu(menu);
        }
    });
});
