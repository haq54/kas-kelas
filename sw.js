var V='kas-kelas-v1',SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=='GET')return;
 var ok=u.origin===location.origin||u.hostname==='www.gstatic.com'||u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';
 if(!ok)return; /* Firestore & Auth dibiarkan langsung ke jaringan */
 e.respondWith(fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque')){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}return res}).catch(function(){return caches.match(r).then(function(m){return m||(r.mode==='navigate'?caches.match('index.html'):undefined)})}))});
