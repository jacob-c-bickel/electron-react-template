import path from 'path';
import { app, BrowserWindow } from 'electron';

const isDev: boolean = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '/index.html')}`);
  }
};

app.on('ready', createWindow);
