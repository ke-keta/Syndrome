if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>n(e,o),c={module:{uri:o},exports:t,require:d};i[o]=Promise.all(s.map((e=>c[e]||d(e)))).then((e=>(r(...e),t)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BjCkkhWe.css",revision:null},{url:"assets/index-BoQd9Omz.js",revision:null},{url:"index.html",revision:"771f9f5866594d271e675c9f74ad89e8"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"android-02192.png",revision:"2d793b3e16b6455908701db99ee06bae"},{url:"android-02512.png",revision:"fe3f6e5b686ebc7c30c69cbd9134637d"},{url:"manifest.webmanifest",revision:"cc96f091fcb54207652e9c82b4aea1f0"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
