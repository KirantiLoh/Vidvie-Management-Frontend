if(!self.define){let e,s={};const c=(c,i)=>(c=new URL(c+".js",i).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(i,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let t={};const o=e=>c(e,a),r={module:{uri:a},exports:t,require:o};s[a]=Promise.all(i.map((e=>r[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-2780d724"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/EuxnmbcBY_qs-xoD7YATG/_buildManifest.js",revision:"54b5252a91b8aab5090be3206b66ebef"},{url:"/_next/static/EuxnmbcBY_qs-xoD7YATG/_ssgManifest.js",revision:"5352cb582146311d1540f6075d1f265e"},{url:"/_next/static/chunks/a9a7754c-cbde9111da122f3e.js",revision:"cbde9111da122f3e"},{url:"/_next/static/chunks/framework-aff430f29c2822f9.js",revision:"aff430f29c2822f9"},{url:"/_next/static/chunks/main-433b718276daae64.js",revision:"433b718276daae64"},{url:"/_next/static/chunks/pages/_app-1b7421e8bdd9a3c2.js",revision:"1b7421e8bdd9a3c2"},{url:"/_next/static/chunks/pages/_error-7397496ca01950b1.js",revision:"7397496ca01950b1"},{url:"/_next/static/chunks/pages/account/login-488c4b343f2b0b9d.js",revision:"488c4b343f2b0b9d"},{url:"/_next/static/chunks/pages/account/logout-2a2bca40279c2b55.js",revision:"2a2bca40279c2b55"},{url:"/_next/static/chunks/pages/divisions-bc8ca47b5fc0b69a.js",revision:"bc8ca47b5fc0b69a"},{url:"/_next/static/chunks/pages/divisions/%5Bname%5D-1b6e001b4c8f8d8e.js",revision:"1b6e001b4c8f8d8e"},{url:"/_next/static/chunks/pages/index-365b24c5856ded20.js",revision:"365b24c5856ded20"},{url:"/_next/static/chunks/pages/stocks-0f704c859603bd88.js",revision:"0f704c859603bd88"},{url:"/_next/static/chunks/pages/stocks/%5Bid%5D-6b5450ca19fb09be.js",revision:"6b5450ca19fb09be"},{url:"/_next/static/chunks/pages/stocks/division/%5Bname%5D-63c8c71e97a075a9.js",revision:"63c8c71e97a075a9"},{url:"/_next/static/chunks/pages/tasks/%5Bid%5D-d820f6ef0c582a9c.js",revision:"d820f6ef0c582a9c"},{url:"/_next/static/chunks/pages/tasks/add-fdb25ac9799fe3a7.js",revision:"fdb25ac9799fe3a7"},{url:"/_next/static/chunks/pages/tasks/division/%5Bdivision%5D-e43df94f0ccea310.js",revision:"e43df94f0ccea310"},{url:"/_next/static/chunks/polyfills-0d1b80a048d4787e.js",revision:"40ccea369337cec877151c906f22814d"},{url:"/_next/static/chunks/webpack-71e149bd9a6f2c0d.js",revision:"71e149bd9a6f2c0d"},{url:"/_next/static/css/05d468f86721c571.css",revision:"05d468f86721c571"},{url:"/_next/static/css/1e08f0f5e4381505.css",revision:"1e08f0f5e4381505"},{url:"/_next/static/css/62278e1d371e165e.css",revision:"62278e1d371e165e"},{url:"/_next/static/css/7f0744a1310ef4d0.css",revision:"7f0744a1310ef4d0"},{url:"/_next/static/css/84d76c5d0f54c5cb.css",revision:"84d76c5d0f54c5cb"},{url:"/_next/static/css/976bcc694b2226d6.css",revision:"976bcc694b2226d6"},{url:"/_next/static/css/982215ad68de0914.css",revision:"982215ad68de0914"},{url:"/_next/static/css/ba34401006ce9a3b.css",revision:"ba34401006ce9a3b"},{url:"/_next/static/css/c111410de12a9c9b.css",revision:"c111410de12a9c9b"},{url:"/_next/static/css/da3bb6c5fe24f2f3.css",revision:"da3bb6c5fe24f2f3"},{url:"/_next/static/css/f6280c2117df4574.css",revision:"f6280c2117df4574"},{url:"/_next/static/media/login-img.cd937964.jpg",revision:"8d916642b3723b20a4cabd62eb879a77"},{url:"/_next/static/media/logo-VIDVIE-icon.4ac72475.png",revision:"76e667ea59efc35b0b90c56ab1485568"},{url:"/_next/static/media/logo.cb57c663.png",revision:"0a72c53e50556338da0f095b4719f247"},{url:"/_next/static/media/no-image-available.cc308864.png",revision:"5261fd4f3309cc2a739380ce875cc159"},{url:"/box-open-solid.png",revision:"5931e68be4a75456d3e0c21a626ba592"},{url:"/favicon.ico",revision:"76e667ea59efc35b0b90c56ab1485568"},{url:"/icon-192x192.png",revision:"f79efc431a21512a4b9e7cfa363f30aa"},{url:"/icon-256x256.png",revision:"bb9ccdddf3f224165b255c105b3f9185"},{url:"/icon-384x384.png",revision:"4a299f76dc583b87265bc955ad81c38c"},{url:"/icon-512x512.png",revision:"ec6ca6cf8bcd47a8cee7f1617fb92c89"},{url:"/list-check-solid.png",revision:"0e1752667a2c3d0566aee80c4aba2b75"},{url:"/login-img.jpg",revision:"8d916642b3723b20a4cabd62eb879a77"},{url:"/logo-VIDVIE-icon.png",revision:"76e667ea59efc35b0b90c56ab1485568"},{url:"/logo-vidvie-management-maskable.png",revision:"31a70fae24b39037b8f59e26e2cdb41c"},{url:"/logo.png",revision:"0a72c53e50556338da0f095b4719f247"},{url:"/manifest.json",revision:"d4e5bfbbbeccb3a264b29933f9836d81"},{url:"/no-image-available.png",revision:"5261fd4f3309cc2a739380ce875cc159"},{url:"/plus-solid.png",revision:"4d129171db925326321116b55eae8911"},{url:"/users-between-lines-solid.png",revision:"e6e8ff08acf218a4316293186d5216b7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
