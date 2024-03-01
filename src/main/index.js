import { app, shell, BrowserWindow, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const isMac = process.platform === 'darwin'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: 'data:image/jpeg;base64,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',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      webSecurity: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
