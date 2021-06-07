// registering service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    let registration =navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

function update(id, clear) {
  if (clear) {
    document.querySelector(`#${id}`).textContent = 0;
    return;
  }
  document.querySelector(`#${id}`).textContent = parseInt((document.querySelector(`#${id}`).textContent || 0)) + 1;
}

function initialise(){
  update('hours',true);
  update('minutes',true);
  update('seconds',true);
}
initialise()

function getValue(id) {
  return document.querySelector(`#${id}`).textContent;
}

let pause = true;
function toggleCounter(){
  pause = !pause;
  document.querySelector('#trigger').textContent = (pause)?'Resume':'Pause';
}

setInterval(() => {
  if(pause) return;
  if (getValue('minutes') == 60) { update('seconds',true); update('minutes',true); update('hours'); }
  if (getValue('seconds') == 60) { update('seconds',true); update('minutes'); }

  update('seconds');
}, 100)

function clearCounter(){
  pause = true;
  initialise();
  document.querySelector('#trigger').textContent = 'Start';
}
