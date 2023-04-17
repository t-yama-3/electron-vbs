const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs');

//vbs実行用（同期的にexe実行を行う）
var spawnSync = require('child_process').spawnSync;

// メインウィンドウはグローバル宣言
let mainWindow = null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

//メール送信コントロール
ipcMain.on('mailer', function(event, args){
  //実行するVBSファイルのパス
  var fullpath = './vbs/mailer.vbs';

  // VBS に処理を渡す
  var child = spawnSync('cscript.exe', [fullpath, args]);

  //返り値を取得する(status)
  var ret = child.status;

  if (ret === 0) {
    dialog.showMessageBox({
      type: 'info',
      title: '通知',
      message: 'メール送信完了',
      detail: 'メール送信完了です',
      button:['OK'],
    })
  } else {
    console.log('error!')
  }
});
