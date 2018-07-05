'use script';
const electron = require('electron')
const exec = require('child_process').exec
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({ width: width, height: height })

  mainWindow.loadURL(
    `https://plan.pixelplus.ru/`,
    { 
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
  )

  // Открываем DevTools.
  // mainWindow.webContents.openDevTools()

  // Будет выполнено, когда пользователь закроет окно
  mainWindow.on('closed', function () {
    // Убрать обращение на объект окна, обычно стоит хранить окна в массиве,
    // если ваше приложение поддерживает несколько, сейчас стоит удалить
    // соответствующий элемент.
    mainWindow = null
  })
  const cts = mainWindow.webContents;

  cts.webContents.on('dom-ready', function() {
  
  const executeJavaScript = (code) =>
    new Promise((resolve) => {
      cts.webContents.executeJavaScript(code, resolve);
    });

  var backgroundColor = executeJavaScript(`
    new Promise((resolve, reject) => {
      setInterval(function () {
        location.href = location.href;
      }, 60000 * 30);

      var login = document.querySelector('[name=USER_LOGIN]');
      var password = document.querySelector('[name=USER_PASSWORD]');
      var form = document.querySelector('[name=form_auth]');

      if (password != undefined && login != undefined) {
        login.value = '#LOGIN#';
        password.value = '#PASSWORD#';
        form.submit();
      } 

      var tb = document.getElementById('timeman-background');
      
       if (tb != undefined) {
        tb.onclick = function () {
          setTimeout(function () {
            setInterval(function () {
              var h = document.querySelector('.tm-popup-notice-time .tm-popup-notice-time-hours');
              console.log(parseInt(h.textContent));
              if(h != undefined && parseInt(h.textContent) >= 8) {
                var wbc = document.querySelector('.webform-button-decline');
                if(wbc != undefined) {
                    wbc.onclick = function() {
                    setTimeout(function() {
                        var pwbd = document.querySelector('.popup-window-button-decline');
                        pwbd.onclick = function() {
                          resolve('ok');
                        }
                        pwbd.click();
                    }, 300);
                  }
                  wbc.click();  
                } else {
                  resolve('ok');
                }
              }    
            }, 60000);
            
          }, 300);
          
        }
        tb.click();
      }
    });
`);
  backgroundColor.then(result => {
    if (result == 'ok') {
        exec('shutdown /s', function () {
          app.quit();
        });
      }
    });
  }); 	
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