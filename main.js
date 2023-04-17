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
ipcMain.on('mailer', function(event, args="pxbdg597@ybb.ne.jp"){
  // WScript.Echo("ネットワーク プリンタ割り当て :");

  // //デスクトップのパスを指定
  // var dir_home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
  // var dir_desktop = require("path").join(dir_home, "Desktop");

  //実行するVBSファイルの名前
  var filename = "/mailer.vbs";

  //実行パスを構築する
  var fullpath = './vbs' + filename;
  //実行パスを構築する
  // var fullpath = "C:\\Users\\t-yam\\mailer.vbs";

  console.log(fullpath);

  //コマンドラインを構築
  var ret = vbsCommand(fullpath, args);

  console.log('tttt')

  //返り値により処理を分岐
  if(ret == 0){
    //メッセージを表示
    //メッセージオプション
    var options ={
      type:'info',
      title:"通知",
      button:['OK'],
      message:'メール送信完了',
      detail:'メールは無事に' + args + "へ送信されました。"
    }

    //表示する
    dialog.showMessageBox(null,options);
  }else{
  	//エラーが発生しているので、なにか処理をする
  	console.log("error:" + ret + "みたいですよ。");
  }
});

//外部コマンドを実行する
function vbsCommand(fullpath, address) {
  console.log('rrrr')
  //コマンドを組み立てて実行
  var child = spawnSync('cscript.exe', [fullpath, address]);

  //返り値を取得する(status)
  var ret = child.status;

  //retを返す
  return ret;
}