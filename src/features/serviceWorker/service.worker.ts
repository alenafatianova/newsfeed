const _self = self as unknown as ServiceWorkerGlobalScope

const date = new Date()
const firstJan = new Date(date.getFullYear(), 0, 1)
const version = [
  'v',
  date.getFullYear(),
  Math.floor((date.getTime() - firstJan.getTime()) / (1000 * 60 * 60 * 24 * 7)),
].join()

const cacheKey = 'newsfeed_' + version

_self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(cacheKey)
      .then(async (cache) => {
        return cache.addAll([
          '/',
          'https://frontend.karpovcourses.net/api/v2/ru/trends/',
          'https://frontend.karpovcourses.net/api/v2/ru/news/',
          'https://frontend.karpovcourses.net/api/v2/ru/news/6',
        ])
      })
      .catch((err) => console.log('service worker intall error', err))
  )
})

// deleting all old versions from the cache:
_self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key !== cacheKey).map((key) => caches.delete(key)))
    })
  )
})

// caching all of the fetching responses:
_self.addEventListener('fetch', async (event) => {
  const url = event.request.url
  const isRequestInterceptable = url.startsWith('http') && event.request.method.toUpperCase() === 'GET'
  if (isRequestInterceptable) {
    event.respondWith(
      (async () => {
        const request = event.request
        const isHtmlPage = request.headers.get('Accept')?.indexOf('text/html') !== -1 && url.startsWith(_self.origin)
        const isCachedFirstRequest =
          !isHtmlPage &&
          (request.headers.get('Accept')?.indexOf('image/') !== -1 ||
            (url.startsWith(_self.origin) && url.match(/(\.js|\.css)$/)) ||
            url.match(/(\.woff.)$/))

        const requestKey = isHtmlPage ? '/' : request
        try {
          if (isCachedFirstRequest) {
            const cachedResponse = await caches.match(requestKey)
            if (cachedResponse) {
              return cachedResponse
            }
          }
          const response = await fetch(requestKey)
          const cache = await caches.open(cacheKey)
          await cache.put(requestKey, response.clone())

          return response
        } catch (err) {
          const cachedItem = await caches.match(requestKey)
          if (cachedItem) {
            return cachedItem
          }
          console.log(err)
        }
        return new Response('', {
          status: 502,
          statusText: 'No internet connection',
        })
      })()
    )
  }
})
