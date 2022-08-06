'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "12db37883533de5dd8f85e5ccbfa263e",
"assets/assets/fonts/SocialLogo.ttf": "42dde8b3d492d3930ead49ff0e245190",
"assets/assets/gif/cloning1_prev.gif": "3daa9ccf65f466dda6a560dc96ce48f5",
"assets/assets/gif/cloning2_prev.gif": "b82db3110c6601be1392865058a0bf32",
"assets/assets/gif/cloning3_prev.gif": "193e8c6bbe752b7454c064b30c85fbee",
"assets/assets/gif/counter.gif": "8dbe28cf8f21e3c563ea5786f8731b1c",
"assets/assets/gif/filter.gif": "153b1affdda2c3cf80b9b0a0d96150e4",
"assets/assets/imgs/c1_1.png": "88819d1feaa639c976a9095b4926d3dd",
"assets/assets/imgs/c1_2.png": "30081b77ba49db177859996de33a7646",
"assets/assets/imgs/c1_3.png": "5952b562ab7344d0b3bc5a89a29ab3b1",
"assets/assets/imgs/c2_1.png": "8d892d8dcf285ab9f9cb5a0a2f2dd1e5",
"assets/assets/imgs/c2_2.png": "9a225dc0ecbacaeb7587f81691f75eb9",
"assets/assets/imgs/c2_3.png": "3f2c1d9d5a0f2c0e4c5d1166669b787a",
"assets/assets/imgs/c2_4.png": "8e11ddf6a1d3f50a47e0929c6701cffa",
"assets/assets/imgs/c2_5.png": "b79eab002695524ac7f23dfc4f48a991",
"assets/assets/imgs/c3_1.png": "81139fb12283842e4524a714828a54ff",
"assets/assets/imgs/c3_2.png": "2b8ae14073ca464b2dafd6ec19ed4604",
"assets/assets/imgs/c3_3.png": "dd83720db9dcf39798cf48609c5de74e",
"assets/assets/imgs/c3_4.png": "625fcba357b341021309a092bf77830a",
"assets/assets/imgs/c3_5.png": "37b788531128e157cc387e1a9d5bcc3f",
"assets/assets/imgs/c3_6.png": "d46970c27ecd3c133d39b3f123454dbb",
"assets/assets/imgs/c3_7.png": "9ca43dc12ad5f5789df6af6cc8077e76",
"assets/assets/imgs/c3_8.png": "2a9832c7afcf4ebc202825907a5b9039",
"assets/assets/imgs/clone1.png": "d075c8b871d4820ea06293fbed4667c7",
"assets/assets/imgs/clone1_figma.JPG": "83f179c1195be214332a44eb0e98f7ac",
"assets/assets/imgs/clone2.png": "cfc69e67fa903ed8a4313b3760f32887",
"assets/assets/imgs/clone2_figma.png": "51be61b0e4c5405a2c4c3c43fe25718a",
"assets/assets/imgs/clone3.png": "2b85c7041878bee5ad0b1e81b5491498",
"assets/assets/imgs/clone3_figma.png": "516975995e438b0a06ed24021033b92a",
"assets/FontManifest.json": "b8555a4ab285d95473ef5ad01bb377fc",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "3e56a3d3bb7dd46e30f787b96731920c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "aa09d37dc75692d1d2f35a50f572dee2",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "02470e7287bc1281ce603c01f5688e5d",
"/": "02470e7287bc1281ce603c01f5688e5d",
"main.dart.js": "f546456b840dfab0c1da27c7c0a45f0c",
"manifest.json": "10c073b906c1945f5f5438af374c0419",
"version.json": "2b9e1550a9297c05fd6f71cac2008df7"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
