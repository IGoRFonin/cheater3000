new Promise((resolve, reject) => {
  var user = document.getElementById('user');
  var pass = document.getElementById('pass');
  var link = document.getElementById('link');
  var form = document.getElementById('config_form');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(user.value && pass.value && link.value) {
      resolve(JSON.stringify({
        'user': user.value,
        'pass': pass.value,
        'link': link.value
      }))
    }
  }, false);
});
