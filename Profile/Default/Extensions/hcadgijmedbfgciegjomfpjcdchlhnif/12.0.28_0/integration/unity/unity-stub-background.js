!function(e){function t(n){if(r[n])return r[n].exports;var a=r[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t){"use strict";!function(){function e(){for(var e=window.navigator.plugins,t=0;t<e.length;t++){var r=e[t].name||"";if(/unity/i.test(r))return!0}return!1}if(!e()){var t=new Set,r=[{name:"vk",testUrlRegex:/^https?:\/\/([^\.]+\.)?vk.com\//},{name:"ok",testUrlRegex:/^https?:\/\/ok\.ru\/(game|app)\//}];chrome.tabs.onUpdated.addListener(function(e,n,a){for(var o=!1,i=0;i<r.length;i++){var s=r[i];if(s.testUrlRegex.test(a.url)){t.add(e),o=!0;break}}o||t["delete"](e)}),chrome.tabs.onRemoved.addListener(function(e){t["delete"](e)}),chrome.webNavigation.onDOMContentLoaded.addListener(function(e){var r=e.tabId,n=e.frameId,a=e.url;if("about:blank"!==a&&t.has(r)&&0!==n){var o={frameId:n,file:"integration/unity/unity-stub-inject.js",runAt:"document_start"},i=function(){chrome.runtime.lastError&&console.error(chrome.runtime.lastError)};try{chrome.tabs.executeScript(r,o,i)}catch(s){delete o.frameId,o.allFrames=!0,chrome.tabs.executeScript(r,o,i)}}})}}()}]);