if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const o=e=>a(e,n),r={module:{uri:n},exports:t,require:o};s[n]=Promise.all(c.map((e=>r[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-2780d724"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/a9a7754c-7f01b3f76adba240.js",revision:"7f01b3f76adba240"},{url:"/_next/static/chunks/framework-a87821de553db91d.js",revision:"a87821de553db91d"},{url:"/_next/static/chunks/main-5035a05945ec0e6e.js",revision:"5035a05945ec0e6e"},{url:"/_next/static/chunks/pages/_app-5cb409ac09d32cda.js",revision:"5cb409ac09d32cda"},{url:"/_next/static/chunks/pages/_error-0a004b8b8498208d.js",revision:"0a004b8b8498208d"},{url:"/_next/static/chunks/pages/account/login-98ba6b20fa6f9e60.js",revision:"98ba6b20fa6f9e60"},{url:"/_next/static/chunks/pages/account/logout-f4f756d762eeba37.js",revision:"f4f756d762eeba37"},{url:"/_next/static/chunks/pages/divisions-54eb2c7c2884ea69.js",revision:"54eb2c7c2884ea69"},{url:"/_next/static/chunks/pages/divisions/%5Bname%5D-020ee2c0f57e6bcf.js",revision:"020ee2c0f57e6bcf"},{url:"/_next/static/chunks/pages/index-cb846dcbd977f359.js",revision:"cb846dcbd977f359"},{url:"/_next/static/chunks/pages/stocks-935321e14fdd775c.js",revision:"935321e14fdd775c"},{url:"/_next/static/chunks/pages/stocks/%5Bid%5D-efab757862d94915.js",revision:"efab757862d94915"},{url:"/_next/static/chunks/pages/stocks/division/%5Bname%5D-cbaad5525ad70a4f.js",revision:"cbaad5525ad70a4f"},{url:"/_next/static/chunks/pages/tasks/%5Bid%5D-8706fb0174039fec.js",revision:"8706fb0174039fec"},{url:"/_next/static/chunks/pages/tasks/add-b1ddf433390dc9d1.js",revision:"b1ddf433390dc9d1"},{url:"/_next/static/chunks/pages/tasks/division/%5Bdivision%5D-b325bf97547678a6.js",revision:"b325bf97547678a6"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-9b312e20a4e32339.js",revision:"9b312e20a4e32339"},{url:"/_next/static/css/05d468f86721c571.css",revision:"05d468f86721c571"},{url:"/_next/static/css/976bcc694b2226d6.css",revision:"976bcc694b2226d6"},{url:"/_next/static/css/ac7c9b47f5d6d7a7.css",revision:"ac7c9b47f5d6d7a7"},{url:"/_next/static/css/aee574333891c216.css",revision:"aee574333891c216"},{url:"/_next/static/css/b6444ad586c3b629.css",revision:"b6444ad586c3b629"},{url:"/_next/static/css/ba34401006ce9a3b.css",revision:"ba34401006ce9a3b"},{url:"/_next/static/css/c111410de12a9c9b.css",revision:"c111410de12a9c9b"},{url:"/_next/static/css/cea16e0f59472604.css",revision:"cea16e0f59472604"},{url:"/_next/static/css/d2190dd4483f224c.css",revision:"d2190dd4483f224c"},{url:"/_next/static/css/f6280c2117df4574.css",revision:"f6280c2117df4574"},{url:"/_next/static/css/fb7aaf99d867528a.css",revision:"fb7aaf99d867528a"},{url:"/_next/static/eFaQwKh52A3GLfETA_kTq/_buildManifest.js",revision:"8be7990a6410a29e4ecee2a82b7f0677"},{url:"/_next/static/eFaQwKh52A3GLfETA_kTq/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/eFaQwKh52A3GLfETA_kTq/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/login-img.cd937964.jpg",revision:"8d916642b3723b20a4cabd62eb879a77"},{url:"/_next/static/media/logo-VIDVIE-icon.4ac72475.png",revision:"76e667ea59efc35b0b90c56ab1485568"},{url:"/_next/static/media/logo.cb57c663.png",revision:"0a72c53e50556338da0f095b4719f247"},{url:"/box-open-solid.png",revision:"5931e68be4a75456d3e0c21a626ba592"},{url:"/favicon.ico",revision:"76e667ea59efc35b0b90c56ab1485568"},{url:"/icon-192x192.png",revision:"f79efc431a21512a4b9e7cfa363f30aa"},{url:"/icon-256x256.png",revision:"bb9ccdddf3f224165b255c105b3f9185"},{url:"/icon-384x384.png",revision:"4a299f76dc583b87265bc955ad81c38c"},{url:"/icon-512x512.png",revision:"ec6ca6cf8bcd47a8cee7f1617fb92c89"},{url:"/list-check-solid.png",revision:"0e1752667a2c3d0566aee80c4aba2b75"},{url:"/login-img.jpg",revision:"8d916642b3723b20a4cabd62eb879a77"},{url:"/logo-VIDVIE-icon.png",revision:"76e667ea59efc35b0b90c56ab1485568"},{url:"/logo.png",revision:"0a72c53e50556338da0f095b4719f247"},{url:"/manifest.json",revision:"fa74e8e0629ca2425869d063f80d5658"},{url:"/plus-solid.png",revision:"4d129171db925326321116b55eae8911"},{url:"/users-between-lines-solid.png",revision:"e6e8ff08acf218a4316293186d5216b7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
