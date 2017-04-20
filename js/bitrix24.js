new Promise((resolve, reject) => {
   setInterval(function() {
    location.href = location.href;
  }, 60000 * 30);
  var l = document.querySelector('[name=USER_LOGIN]');
  var p = document.querySelector('[name=USER_PASSWORD]');
  var f = document.querySelector('[name=form_auth]');
  if(l != undefined && p != undefined) l.value = user, p.value = pass, f.submit();

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
