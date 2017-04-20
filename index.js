'use script';
const electron = require('electron')
const exec = require('child_process').exec
// Модуль, контролирующий основное: сам Electron.
const app = electron.app
// Модуль, создающий окно приложения.
const BrowserWindow = electron.BrowserWindow

// Удерживайте глобальное обращение к объекту окна, если Вы так не сделаете, то
// окно само закроется после того, как объект будет собран сборщиком мусора.
let mainWindow

function createWindow () {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

  // Создаём окно браузера
  mainWindow = new BrowserWindow({width: width, height: height})

  // и загружаем index.html приложения.
  mainWindow.loadURL(`https://plan.pixelplus.ru/`,
    {userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'})

  // Открываем DevTools.
  mainWindow.webContents.openDevTools()

  // Будет выполнено, когда пользователь закроет окно
  mainWindow.on('closed', function () {
    // Убрать обращение на объект окна, обычно стоит хранить окна в массиве,
    // если ваше приложение поддерживает несколько, сейчас стоит удалить
    // соответствующий элемент.
    mainWindow = null
  })
  const cts = mainWindow.webContents;

  // cts.webContents.on('did-finish-load', function() {
  // 	console.log('did-finish-load');
  // });
  // cts.webContents.on('did-frame-finish-load', function() {
  // 	console.log('did-frame-finish-load');
  // });
  // cts.webContents.on('did-start-loading', function() {
  // 	console.log('did-start-loading');
  // });
  // cts.webContents.on('did-stop-loading', function() {
  // 	console.log('did-stop-loading');
  // });
  // cts.webContents.on('did-get-response-details', function() {
  // 	console.log('did-get-response-details');
  // });
  // cts.webContents.on('did-get-redirect-request', function() {
  // 	console.log('did-get-redirect-request');
  // });
  cts.webContents.on('dom-ready', function() {
  
  const executeJavaScript = (code) =>
    new Promise((resolve) => {
      cts.webContents.executeJavaScript(code, resolve);
    });

  var test = 'q1q1q1q1';
  var backgroundColor = executeJavaScript(`
    new Promise((resolve, reject) => {
      console.log( "ok?" ,  ${JSON.stringify(test)}   )
       setInterval(function() {
        location.href = location.href;
      }, 60000 * 30);
      var l = document.querySelector('[name=USER_PASSWORD]');
      var f = document.querySelector('[name=form_auth]');
      if(l != undefined) l.value = 'q1q1q1q1', f.submit();

      var tb = document.getElementById('timeman-background');
      
       if(tb != undefined) {
        tb.onclick = function() {
          setTimeout(function() {
            setInterval(function() {
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
    if(result == 'ok') {
      exec('shutdown /s', function() {
        console.log('ok');
        app.quit();
      })
    }
  });
   
  });
  	
}

// Этот метод будет вызван, когда Electron закончит инициализацию
// и будет готов создавать окна браузера.
// Некоторые API возможно использовать только после того, как
// это произойдёт.
app.on('ready', createWindow)

// Выйти, если все окна закрыты
app.on('window-all-closed', function () {
  // На macOS приложение и его строка меню обычно остаются активными,
  // пока пользователь не завершит их с помощью `Cmd + Q`.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // На macOS приложение обычно пересоздаёт окно, когда
  // пользователь кликает на его иконку в доке, если не открыто
  // других окон.
  if (mainWindow === null) {
    createWindow()
  }
})

// В этот файл Вы можете включить остальной код вашего главного процесса.
// Вы также можете разложить его по отдельным файлам и подключить с помощью require.