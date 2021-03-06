var CACHE = 'network-or-cache'

var IAMGE_URL = 'https://picsum.photos/200/300/?random'

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.')
  evt.waitUntil(precache())
})

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.')
  evt.respondWith(
    fromNetwork(evt.request, 400)
      .then(function (e) {
        console.log('success get image from Network in 400ms!')
        return e
      })
      .catch(function () {
        return fromCache(evt.request)
      })
  )
})


function precache() {
  return caches.open(CACHE).then(function (cache) {
    console.log('get cache file!')
    return cache.addAll([
      './index.html',
      IAMGE_URL
    ]);
  });
}


function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout)
    fetch(request).then(function (response) {
      console.log('get image from network!')
      clearTimeout(timeoutId)
      updateCacheImage(request, response)
      fulfill(response)
    }, reject)
  })
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      console.log('get image from cache storage!')
      return matching || Promise.reject('no-match')
    })
  })
}

function updateCacheImage (request, response) {
  console.log('updateCache', request, response)
  caches.open(CACHE).then(function (cache) {
    cache.delete(IAMGE_URL).then(function () {
      cache.put(IAMGE_URL, response)
    })
  })
}