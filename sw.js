var CACHE='bagu-general-v1';
var ASSETS=['./','./index.html','./manifest.json','./favicon.png','./images/logo_small.png','./images/hero1.jpg','./images/hero2.jpg','./images/hero3.jpg','./images/hero4.jpg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}).then(function(){self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE}).map(function(x){return caches.delete(x)}))}).then(function(){self.clients.claim()}))});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(function(h){return h||fetch(e.request)}))});
