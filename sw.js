var CACHE='bagu-general-v6';
var ASSETS=['./','./index.html','./manifest.json','./favicon.png','./images/logo_small.png','./images/logo_mark.png','./images/logo_full.png','./images/hero1.jpg','./images/hero2.jpg','./images/hero3.jpg','./images/hero4.jpg','./images/svc_hardware.jpg','./images/svc_transport.jpg','./images/svc_construction.jpg','./images/svc_supplies.jpg','./images/cta_band.jpg','./images/mach_excavator.jpg','./images/mach_compactor.jpg','./images/mach_bowser.jpg','./images/mach_drilling.jpg','./images/svc_drilling.jpg','./images/mach_backhoe.jpg','./images/mach_roller.jpg','./images/mach_tipper.jpg','./images/mach_mixer.jpg','./images/about.jpg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}).then(function(){self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x.indexOf('bagu-general')!==0}).map(function(x){return caches.delete(x)}))}).then(function(){self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var isHtml = e.request.mode==='navigate' || (e.request.destination==='document') || /\.html($|\?)/.test(e.request.url);
  e.respondWith(
    fetch(e.request).then(function(res){
      var copy=res.clone();
      caches.open(CACHE).then(function(c){c.put(e.request,copy)});
      return res;
    }).catch(function(){
      return caches.match(e.request).then(function(h){return h||caches.match('./')});
    })
  );
});
