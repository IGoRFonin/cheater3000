'use script';
const electron = require('electron')
const exec = require('child_process').exec
const fs = require('fs')

const app = electron.app

const BrowserWindow = electron.BrowserWindow

let mainWindow

let confFile = __dirname + '/config.json';


function createWindow () {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({width: width, height: height})
  console.log(__dirname);
  if (fs.existsSync(confFile)) {
    loadBitrix(mainWindow);
  } else {
    loadConfigPage(mainWindow);
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

function loadBitrix(win) {
    let {
      link,
      user,
      pass
    } = require(confFile);

    win.loadURL(link,
      {userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'})

    win.webContents.openDevTools()
    win.on('closed', function () {
      win = null
    });
    const cts = mainWindow.webContents;

    cts.on('dom-ready', function() {
    let configCode = fs.readFileSync(__dirname + '/js/bitrix24.js');
    let dom = cts.executeJavaScript(`
      var user = ${JSON.stringify(user)};
      var pass = ${JSON.stringify(pass)};` + configCode.toString());

    dom.then(result => {
      if(result == 'ok') {
        exec('shutdown /s', function() {
          app.quit();
        })
      }
    });
  });
}

function loadConfigPage(win) {
  win.loadURL(`file://${__dirname}/config.html`);
  win.webContents.openDevTools()

  win.on('closed', function () {
    win = null
  })
  const cts = mainWindow.webContents;
  cts.on('dom-ready', function() {
    var configCode = fs.readFileSync(__dirname + '/js/configPage.js');
    let itog = cts.executeJavaScript(configCode.toString());
    itog.then(result => {
      console.log(result);
      fs.writeFile(confFile, result, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    })
  });
}
