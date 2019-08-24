var websql=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";(function(e){var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))(function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new t(function(r){r(e.value)}).then(i,a)}u((n=n.apply(e,r||[])).next())})};Object.defineProperty(r,"__esModule",{value:!0});const o=t(2);class s{constructor(e,r={allowWebWorkerFallback:!1,allowMainWebWorker:!1}){if(this.workerUrl=e,this.options=r,this.databaseInstanceCreated=!1,this.postMessageToWorker=(e,r=[],t={})=>new Promise((n,o)=>{const i=new s.MessageChannel;i.port1.onmessage=r=>{i.port1.close();const t=r.data.error;if(t)return o(s.translateError(t));const a=this.remapper(e,r.data.output);n(a)};const a=Object.assign({args:r.slice(),functionName:e},t),u=[i.port2];s.isNodejs?this.worker.postMessage(Object.assign({},a,{transfer:u}),u):s.isSharedWorkerSupported?this.worker.port.postMessage(a,u):this.worker.postMessage(a,u)}),s.isNodejs){console.log("websql: Using Node.JS Worker");const{MessageChannel:r,Worker:t}=require("worker_threads");this.worker=new t(e),s.MessageChannel=r}else if(s.isSharedWorkerSupported)console.log("websql: Using Shared Worker"),this.worker=new SharedWorker(e),this.worker.port.start();else if(!s.isSharedWorkerSupported&&s.isWorkerSupported&&!s.isIEOrLegacyEdge&&r.allowWebWorkerFallback)console.warn("websql: Using Web Worker. Experience will be degraded."),this.worker=new Worker(e);else{if(s.isSharedWorkerSupported||s.isWorkerSupported&&!s.isIEOrLegacyEdge||!r.allowMainWebWorker)throw new Error("Shared Worker are not available in your browser and Web Worker / Web Worker in Main Thread fallback is disabled. Aborting.");{console.warn("websql: Using Pseudo Web Worker. Experience will be degraded heavily."),console.log("Database.isWorkerSupported ",s.isWorkerSupported),console.log("Database.isIEOrLegacyEdge ",s.isIEOrLegacyEdge);const r=t(3);this.worker=new r(e)}}return s.isNodejs||(s.MessageChannel=window.MessageChannel,window.addEventListener("unload",()=>n(this,void 0,void 0,function*(){this.databaseInstanceCreated&&(s.isSharedWorkerSupported?yield this.postMessageToWorker("saveChanges"):yield this.postMessageToWorker("close"))}))),this.createNewProxy(this,(e,...r)=>n(this,void 0,void 0,function*(){if("_getWorkerInstance"===e)return this.worker;return this.databaseInstanceCreated||(yield this.createDatabaseInstance()),yield this.postMessageToWorker(e,r)}))}createNewProxy(e,r){return new Proxy(e,{get:(e,t)=>"then"===t?null:(...e)=>n(this,void 0,void 0,function*(){return r(t.toString(),...e)}),set:()=>{throw new Error("Forbidden operation, object is frozen")},has:()=>{throw new Error("Forbidden operation, object is frozen")},deleteProperty:()=>{throw new Error("Forbidden operation, object is frozen")}})}createDatabaseInstance(){return n(this,void 0,void 0,function*(){yield this.postMessageToWorker("constructor"),this.databaseInstanceCreated=!0})}remapper(e,r){switch(e){case"prepare":const t=r;return this.createNewProxy({},(e,...r)=>n(this,void 0,void 0,function*(){return yield this.postMessageToWorker(`statements.${e.toString()}`,r,{statementId:t})}))}return r}static translateError(e){const r=new Error(e.message);return r.stack=e.stack,r.name=e.name,r}}s.isNodejs="object"==typeof e&&"object"==typeof e.versions&&"string"==typeof e.versions.node,s.isSharedWorkerSupported=!s.isNodejs&&"undefined"!=typeof window&&void 0!==window.SharedWorker,s.isWorkerSupported=!s.isNodejs&&"undefined"!=typeof window&&void 0!==window.Worker,s.isIEOrLegacyEdge="undefined"!=typeof window&&o.isIEOrLegacyEdge(),r.Database=s}).call(this,t(1))},function(e,r){var t,n,o=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{n="function"==typeof clearTimeout?clearTimeout:i}catch(e){n=i}}();var u,c=[],d=!1,l=-1;function f(){d&&u&&(d=!1,u.length?c=u.concat(c):l=-1,c.length&&p())}function p(){if(!d){var e=a(f);d=!0;for(var r=c.length;r;){for(u=c,c=[];++l<r;)u&&u[l].run();l=-1,r=c.length}u=null,d=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===i||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(r){try{return n.call(null,e)}catch(r){return n.call(this,e)}}}(e)}}function h(e,r){this.fun=e,this.array=r}function w(){}o.nextTick=function(e){var r=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)r[t-1]=arguments[t];c.push(new h(e,r)),1!==c.length||d||a(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=w,o.addListener=w,o.once=w,o.off=w,o.removeListener=w,o.removeAllListeners=w,o.emit=w,o.prependListener=w,o.prependOnceListener=w,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.isIEOrLegacyEdge=function(){const e=window.navigator.userAgent;return e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0}},function(module,exports,__webpack_require__){"use strict";(function(global){function doEval(self,__pseudoworker_script){(function(){eval(__pseudoworker_script)}).call(global)}function PseudoWorker(e){var r,t,n=[],o=[],s=[],i=[],a=[],u=!1,c=this;function d(e,r){for(var t=-1;++t<e.length;)e[t]&&r(e[t])}function l(e){var r=function(e){return function(r){r({type:"error",error:e,message:e.message})}}(e);"function"==typeof c.onerror&&r(c.onerror),t&&"function"==typeof t.onerror&&r(t.onerror),d(o,r),d(i,r)}function f(e,r){function n(t){try{t({data:e,ports:r})}catch(e){l(e)}}t&&"function"==typeof t.onmessage&&n(t.onmessage),d(s,n)}function p(){u=!0}function h(e){function r(r){r({data:e})}u||("function"==typeof c.onmessage&&r(c.onmessage),d(n,r))}function w(e,r){"message"===e?s.push(r):"error"===e&&i.push(r)}var g=new XMLHttpRequest;return g.open("GET",e),g.onreadystatechange=function(){if(4===g.readyState)if(g.status>=200&&g.status<400){r=g.responseText,doEval(t={postMessage:h,addEventListener:w,close:p},r);var n=a;a=[];for(var o=0;o<n.length;o++)f(n[o].msg,n[o].transfer)}else l(new Error("cannot find script "+e))},g.send(),c.postMessage=function(e,t){if(void 0===e)throw new Error("postMessage() requires an argument");u||(r?f(e,t):a.push({msg:e,transfer:t||void 0}))},c.addEventListener=function(e,r){"message"===e?n.push(r):"error"===e&&o.push(r)},c.removeEventListener=function(e,r){var t;if("message"===e)t=n;else{if("error"!==e)return;t=o}for(var s=-1;++s<t.length;){if(t[s]===r){delete t[s];break}}},c.terminate=p,c}module.exports=PseudoWorker}).call(this,__webpack_require__(4))},function(e,r){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t}]);