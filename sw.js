self.addEventListener('install',function(event){
  event.waitUntil(
    caches.open('sample_cache')
    .then(function(cache){
      return cache.addAll(['/','/index.js'])
    })
  )
  
})

self.addEventListener('fetch', function(event) {
  caches.keys().then((d)=>console.log(d))
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});