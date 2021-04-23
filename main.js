const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

const menuTemplate = [
  {
    label: "Flie",
    submenu: [
      {
        label: "New Project",
        click: (item, focusedWindow) => {
          focusedWindow.webContents.send("new-project");
        }
      },
      {
        type: "separator",
      },
      {
        label: "Open Project",
      },
      {
        type: "separator",
      },
      {
        label: "Save Project",
      }
    ]
  },
  {
    label: "Developer",
    submenu: [
      {
        role: "toggleDevTools"
      }
    ]
  }
]

if (process.platform == "darwin") {
  menuTemplate.unshift({
    "label": "Retro Graphics Studio",
    submenu: [
      {
        label: "About Retro Graphics Studio",
        role: "about"
      },
      {
        type: "separator",
      },
      {
        label: "Services",
        role: "services",
        submenu: [],
      },
      {
        type: "separator",
      },
      {
        label: "Hide Retro Graphics Studio",
        accelerator: 'Command+H',
        role: "hide",
      },
      {
        label: "Hide Others",
        accelerator: 'Command+Alt+H',
        role: "hideothers",
      },
      {
        label: "Show All",
        role: "unhide",
      },
      {
        type: "separator",
      },
      {
        label: `Quit Retro Graphics Studio`,
        accelerator: 'Command+Q',
        click() { app.quit(); },
      },
    ]
  })
}