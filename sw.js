var CACHE='bagu-general-v16';
var ASSETS=[./,./index.html,./manifest.json,./favicon.png,./images/logo_small.png,./images/logo_mark.png,./images/logo_full.png,'./images/about.webp?v=16','./images/band.webp?v=16','./images/hero_road.webp?v=16','./images/hero_sugar.webp?v=16','./images/hero_tea.webp?v=16','./images/mach_backhoe.webp?v=16','./images/mach_compactor.webp?v=16','./images/mach_excavator.webp?v=16','./images/mach_roller.webp?v=16','./images/mach_tipper.webp?v=16','./images/svc_construction.webp?v=16','./images/svc_drilling.webp?v=16','./images/svc_hardware.webp?v=16','./images/svc_machinery.webp?v=16','./images/svc_supplies.webp?v=16','./images/svc_transport.webp?v=16'];
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
