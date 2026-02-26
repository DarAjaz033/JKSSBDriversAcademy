(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const jf=()=>{};var Dc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},$f=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],u=n[t++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},pl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,u=a?n[s+1]:0,l=s+2<n.length,d=l?n[s+2]:0,p=i>>2,g=(i&3)<<4|u>>4;let E=(u&15)<<2|d>>6,S=d&63;l||(S=64,a||(E=64)),r.push(t[p],t[g],t[E],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(fl(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):$f(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const g=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||u==null||d==null||g==null)throw new zf;const E=i<<2|u>>4;if(r.push(E),d!==64){const S=u<<4&240|d>>2;if(r.push(S),g!==64){const C=d<<6&192|g;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Hf=function(n){const e=fl(n);return pl.encodeByteArray(e,!0)},vs=function(n){return Hf(n).replace(/\./g,"")},ml=function(n){try{return pl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=()=>Wf().__FIREBASE_DEFAULTS__,Kf=()=>{if(typeof process>"u"||typeof Dc>"u")return;const n=Dc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Qf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ml(n[1]);return e&&JSON.parse(e)},Ws=()=>{try{return jf()||Gf()||Kf()||Qf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},gl=n=>{var e,t;return(t=(e=Ws())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},_l=n=>{const e=gl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},yl=()=>{var n;return(n=Ws())==null?void 0:n.config},El=n=>{var e;return(e=Ws())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ut(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function bo(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[vs(JSON.stringify(t)),vs(JSON.stringify(a)),""].join(".")}const hr={};function Yf(){const n={prod:[],emulator:[]};for(const e of Object.keys(hr))hr[e]?n.emulator.push(e):n.prod.push(e);return n}function Xf(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Vc=!1;function Po(n,e){if(typeof window>"u"||typeof document>"u"||!Ut(window.location.host)||hr[n]===e||hr[n]||Vc)return;hr[n]=e;function t(E){return`__firebase__banner__${E}`}const r="__firebase__banner",i=Yf().prod.length>0;function a(){const E=document.getElementById(r);E&&E.remove()}function u(E){E.style.display="flex",E.style.background="#7faaf0",E.style.position="fixed",E.style.bottom="5px",E.style.left="5px",E.style.padding=".5em",E.style.borderRadius="5px",E.style.alignItems="center"}function l(E,S){E.setAttribute("width","24"),E.setAttribute("id",S),E.setAttribute("height","24"),E.setAttribute("viewBox","0 0 24 24"),E.setAttribute("fill","none"),E.style.marginLeft="-6px"}function d(){const E=document.createElement("span");return E.style.cursor="pointer",E.style.marginLeft="16px",E.style.fontSize="24px",E.innerHTML=" &times;",E.onclick=()=>{Vc=!0,a()},E}function p(E,S){E.setAttribute("id",S),E.innerText="Learn more",E.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",E.setAttribute("target","__blank"),E.style.paddingLeft="5px",E.style.textDecoration="underline"}function g(){const E=Xf(r),S=t("text"),C=document.getElementById(S)||document.createElement("span"),V=t("learnmore"),k=document.getElementById(V)||document.createElement("a"),q=t("preprendIcon"),B=document.getElementById(q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(E.created){const j=E.element;u(j),p(k,V);const Q=d();l(B,q),j.append(B,C,k,Q),document.body.appendChild(j)}i?(C.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ae())}function ep(){var e;const n=(e=Ws())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function tp(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function np(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function rp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function sp(){const n=Ae();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ip(){return!ep()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function op(){try{return typeof indexedDB=="object"}catch{return!1}}function ap(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp="FirebaseError";class tt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=cp,Object.setPrototypeOf(this,tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cr.prototype.create)}}class Cr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?up(i,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new tt(s,u,r)}}function up(n,e){return n.replace(lp,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const lp=/\{\$([^}]+)}/g;function hp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Xt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Oc(i)&&Oc(a)){if(!Xt(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Oc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ir(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function or(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function dp(n,e){const t=new fp(n,e);return t.subscribe.bind(t)}class fp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");pp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=ji),s.error===void 0&&(s.error=ji),s.complete===void 0&&(s.complete=ji);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function pp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ji(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(n){return n&&n._delegate?n._delegate:n}class Nt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Jf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_p(e))try{this.getOrInitializeService({instanceIdentifier:Kt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Kt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Kt){return this.instances.has(e)}getOptions(e=Kt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);r===u&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:gp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Kt){return this.component?this.component.multipleInstances?e:Kt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gp(n){return n===Kt?void 0:n}function _p(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new mp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));const Ep={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},Tp=z.INFO,Ip={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},wp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Ip[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Co{constructor(e){this.name=e,this._logLevel=Tp,this._logHandler=wp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ep[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}}const vp=(n,e)=>e.some(t=>n instanceof t);let Lc,Mc;function Ap(){return Lc||(Lc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Rp(){return Mc||(Mc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Il=new WeakMap,no=new WeakMap,wl=new WeakMap,$i=new WeakMap,ko=new WeakMap;function Sp(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(St(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Il.set(t,n)}).catch(()=>{}),ko.set(e,n),e}function bp(n){if(no.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});no.set(n,e)}let ro={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return no.get(n);if(e==="objectStoreNames")return n.objectStoreNames||wl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return St(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Pp(n){ro=n(ro)}function Cp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(zi(this),e,...t);return wl.set(r,e.sort?e.sort():[e]),St(r)}:Rp().includes(n)?function(...e){return n.apply(zi(this),e),St(Il.get(this))}:function(...e){return St(n.apply(zi(this),e))}}function kp(n){return typeof n=="function"?Cp(n):(n instanceof IDBTransaction&&bp(n),vp(n,Ap())?new Proxy(n,ro):n)}function St(n){if(n instanceof IDBRequest)return Sp(n);if($i.has(n))return $i.get(n);const e=kp(n);return e!==n&&($i.set(n,e),ko.set(e,n)),e}const zi=n=>ko.get(n);function Np(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),u=St(a);return r&&a.addEventListener("upgradeneeded",l=>{r(St(a.result),l.oldVersion,l.newVersion,St(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),u.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const Dp=["get","getKey","getAll","getAllKeys","count"],Vp=["put","add","delete","clear"],Hi=new Map;function xc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Hi.get(e))return Hi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Vp.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Dp.includes(t)))return;const i=async function(a,...u){const l=this.transaction(a,s?"readwrite":"readonly");let d=l.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),s&&l.done]))[0]};return Hi.set(e,i),i}Pp(n=>({...n,get:(e,t,r)=>xc(e,t)||n.get(e,t,r),has:(e,t)=>!!xc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Lp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function Lp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const so="@firebase/app",Uc="0.14.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut=new Co("@firebase/app"),Mp="@firebase/app-compat",xp="@firebase/analytics-compat",Up="@firebase/analytics",Fp="@firebase/app-check-compat",Bp="@firebase/app-check",qp="@firebase/auth",jp="@firebase/auth-compat",$p="@firebase/database",zp="@firebase/data-connect",Hp="@firebase/database-compat",Wp="@firebase/functions",Gp="@firebase/functions-compat",Kp="@firebase/installations",Qp="@firebase/installations-compat",Jp="@firebase/messaging",Yp="@firebase/messaging-compat",Xp="@firebase/performance",Zp="@firebase/performance-compat",em="@firebase/remote-config",tm="@firebase/remote-config-compat",nm="@firebase/storage",rm="@firebase/storage-compat",sm="@firebase/firestore",im="@firebase/ai",om="@firebase/firestore-compat",am="firebase",cm="12.9.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="[DEFAULT]",um={[so]:"fire-core",[Mp]:"fire-core-compat",[Up]:"fire-analytics",[xp]:"fire-analytics-compat",[Bp]:"fire-app-check",[Fp]:"fire-app-check-compat",[qp]:"fire-auth",[jp]:"fire-auth-compat",[$p]:"fire-rtdb",[zp]:"fire-data-connect",[Hp]:"fire-rtdb-compat",[Wp]:"fire-fn",[Gp]:"fire-fn-compat",[Kp]:"fire-iid",[Qp]:"fire-iid-compat",[Jp]:"fire-fcm",[Yp]:"fire-fcm-compat",[Xp]:"fire-perf",[Zp]:"fire-perf-compat",[em]:"fire-rc",[tm]:"fire-rc-compat",[nm]:"fire-gcs",[rm]:"fire-gcs-compat",[sm]:"fire-fst",[om]:"fire-fst-compat",[im]:"fire-vertex","fire-js":"fire-js",[am]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=new Map,lm=new Map,oo=new Map;function Fc(n,e){try{n.container.addComponent(e)}catch(t){ut.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Zt(n){const e=n.name;if(oo.has(e))return ut.debug(`There were multiple attempts to register component ${e}.`),!1;oo.set(e,n);for(const t of As.values())Fc(t,n);for(const t of lm.values())Fc(t,n);return!0}function Gs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function De(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},bt=new Cr("app","Firebase",hm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw bt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn=cm;function vl(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:io,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw bt.create("bad-app-name",{appName:String(s)});if(t||(t=yl()),!t)throw bt.create("no-options");const i=As.get(s);if(i){if(Xt(t,i.options)&&Xt(r,i.config))return i;throw bt.create("duplicate-app",{appName:s})}const a=new yp(s);for(const l of oo.values())a.addComponent(l);const u=new dm(t,r,a);return As.set(s,u),u}function No(n=io){const e=As.get(n);if(!e&&n===io&&yl())return vl();if(!e)throw bt.create("no-app",{appName:n});return e}function Qe(n,e,t){let r=um[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ut.warn(a.join(" "));return}Zt(new Nt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fm="firebase-heartbeat-database",pm=1,Er="firebase-heartbeat-store";let Wi=null;function Al(){return Wi||(Wi=Np(fm,pm,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Er)}catch(t){console.warn(t)}}}}).catch(n=>{throw bt.create("idb-open",{originalErrorMessage:n.message})})),Wi}async function mm(n){try{const t=(await Al()).transaction(Er),r=await t.objectStore(Er).get(Rl(n));return await t.done,r}catch(e){if(e instanceof tt)ut.warn(e.message);else{const t=bt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ut.warn(t.message)}}}async function Bc(n,e){try{const r=(await Al()).transaction(Er,"readwrite");await r.objectStore(Er).put(e,Rl(n)),await r.done}catch(t){if(t instanceof tt)ut.warn(t.message);else{const r=bt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ut.warn(r.message)}}}function Rl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gm=1024,_m=30;class ym{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Tm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=qc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>_m){const a=Im(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ut.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=qc(),{heartbeatsToSend:r,unsentEntries:s}=Em(this._heartbeatsCache.heartbeats),i=vs(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return ut.warn(t),""}}}function qc(){return new Date().toISOString().substring(0,10)}function Em(n,e=gm){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),jc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),jc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Tm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return op()?ap().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await mm(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function jc(n){return vs(JSON.stringify({version:2,heartbeats:n})).length}function Im(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wm(n){Zt(new Nt("platform-logger",e=>new Op(e),"PRIVATE")),Zt(new Nt("heartbeat",e=>new ym(e),"PRIVATE")),Qe(so,Uc,n),Qe(so,Uc,"esm2020"),Qe("fire-js","")}wm("");function Sl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const vm=Sl,bl=new Cr("auth","Firebase",Sl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=new Co("@firebase/auth");function Am(n,...e){Rs.logLevel<=z.WARN&&Rs.warn(`Auth (${cn}): ${n}`,...e)}function fs(n,...e){Rs.logLevel<=z.ERROR&&Rs.error(`Auth (${cn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(n,...e){throw Vo(n,...e)}function qe(n,...e){return Vo(n,...e)}function Do(n,e,t){const r={...vm(),[e]:t};return new Cr("auth","Firebase",r).create(e,{appName:n.name})}function at(n){return Do(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Rm(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Ue(n,"argument-error"),Do(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Vo(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return bl.create(n,...e)}function U(n,e,...t){if(!n)throw Vo(e,...t)}function it(n){const e="INTERNAL ASSERTION FAILED: "+n;throw fs(e),new Error(e)}function lt(n,e){n||it(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Pl(){return $c()==="http:"||$c()==="https:"}function $c(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Pl()||np()||"connection"in navigator)?navigator.onLine:!0}function bm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t){this.shortDelay=e,this.longDelay=t,lt(t>e,"Short delay should be less than long delay!"),this.isMobile=Zf()||rp()}get(){return Sm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oo(n,e){lt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;it("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;it("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;it("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],km=new Nr(3e4,6e4);function nt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function ze(n,e,t,r,s={}){return kl(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const u=kr({key:n.config.apiKey,...a}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:l,...i};return tp()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Ut(n.emulatorConfig.host)&&(d.credentials="include"),Cl.fetch()(await Nl(n,n.config.apiHost,t,u),d)})}async function kl(n,e,t){n._canInitEmulator=!1;const r={...Pm,...e};try{const s=new Dm(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw is(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const u=i.ok?a.errorMessage:a.error.message,[l,d]=u.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw is(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw is(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw is(n,"user-disabled",a);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Do(n,p,d);Ue(n,p)}}catch(s){if(s instanceof tt)throw s;Ue(n,"network-request-failed",{message:String(s)})}}async function Dr(n,e,t,r,s={}){const i=await ze(n,e,t,r,s);return"mfaPendingCredential"in i&&Ue(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function Nl(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Oo(n.config,s):`${n.config.apiScheme}://${s}`;return Cm.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function Nm(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Dm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(qe(this.auth,"network-request-failed")),km.get())})}}function is(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=qe(n,e,r);return s.customData._tokenResponse=t,s}function zc(n){return n!==void 0&&n.enterprise!==void 0}class Vm{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Nm(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Om(n,e){return ze(n,"GET","/v2/recaptchaConfig",nt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lm(n,e){return ze(n,"POST","/v1/accounts:delete",e)}async function bs(n,e){return ze(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Mm(n,e=!1){const t=J(n),r=await t.getIdToken(e),s=Lo(r);U(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:dr(Gi(s.auth_time)),issuedAtTime:dr(Gi(s.iat)),expirationTime:dr(Gi(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Gi(n){return Number(n)*1e3}function Lo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return fs("JWT malformed, contained fewer than 3 sections"),null;try{const s=ml(t);return s?JSON.parse(s):(fs("Failed to decode base64 JWT payload"),null)}catch(s){return fs("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Hc(n){const e=Lo(n);return U(e,"internal-error"),U(typeof e.exp<"u","internal-error"),U(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof tt&&xm(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function xm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=dr(this.lastLoginAt),this.creationTime=dr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ps(n){var g;const e=n.auth,t=await n.getIdToken(),r=await Pn(n,bs(e,{idToken:t}));U(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(g=s.providerUserInfo)!=null&&g.length?Dl(s.providerUserInfo):[],a=Bm(n.providerData,i),u=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=u?l:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ao(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function Fm(n){const e=J(n);await Ps(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Bm(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Dl(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qm(n,e){const t=await kl(n,{},async()=>{const r=kr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await Nl(n,s,"/v1/token",`key=${i}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:u,body:r};return n.emulatorConfig&&Ut(n.emulatorConfig.host)&&(l.credentials="include"),Cl.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function jm(n,e){return ze(n,"POST","/v2/accounts:revokeToken",nt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken<"u","internal-error"),U(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){U(e.length!==0,"internal-error");const t=Hc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await qm(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new wn;return r&&(U(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(U(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(U(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new wn,this.toJSON())}_performRefresh(){return it("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(n,e){U(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Be{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Um(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ao(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Pn(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Mm(this,e)}reload(){return Fm(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Be({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ps(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(De(this.auth.app))return Promise.reject(at(this.auth));const e=await this.getIdToken();return await Pn(this,Lm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,l=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:g,emailVerified:E,isAnonymous:S,providerData:C,stsTokenManager:V}=t;U(g&&V,e,"internal-error");const k=wn.fromJSON(this.name,V);U(typeof g=="string",e,"internal-error"),Tt(r,e.name),Tt(s,e.name),U(typeof E=="boolean",e,"internal-error"),U(typeof S=="boolean",e,"internal-error"),Tt(i,e.name),Tt(a,e.name),Tt(u,e.name),Tt(l,e.name),Tt(d,e.name),Tt(p,e.name);const q=new Be({uid:g,auth:e,email:s,emailVerified:E,displayName:r,isAnonymous:S,photoURL:a,phoneNumber:i,tenantId:u,stsTokenManager:k,createdAt:d,lastLoginAt:p});return C&&Array.isArray(C)&&(q.providerData=C.map(B=>({...B}))),l&&(q._redirectEventId=l),q}static async _fromIdTokenResponse(e,t,r=!1){const s=new wn;s.updateFromServerResponse(t);const i=new Be({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ps(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];U(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Dl(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),u=new wn;u.updateFromIdToken(r);const l=new Be({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ao(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=new Map;function ot(n){lt(n instanceof Function,"Expected a class definition");let e=Wc.get(n);return e?(lt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Wc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Vl.type="NONE";const Gc=Vl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(n,e,t){return`firebase:${n}:${e}:${t}`}class vn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ps(this.userKey,s.apiKey,i),this.fullPersistenceKey=ps("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await bs(this.auth,{idToken:e}).catch(()=>{});return t?Be._fromGetAccountInfoResponse(this.auth,t,e):null}return Be._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new vn(ot(Gc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||ot(Gc);const a=ps(r,e.config.apiKey,e.name);let u=null;for(const d of t)try{const p=await d._get(a);if(p){let g;if(typeof p=="string"){const E=await bs(e,{idToken:p}).catch(()=>{});if(!E)break;g=await Be._fromGetAccountInfoResponse(e,E,p)}else g=Be._fromJSON(e,p);d!==i&&(u=g),i=d;break}}catch{}const l=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new vn(i,e,r):(i=l[0],u&&await i._set(a,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new vn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(xl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ol(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Fl(e))return"Blackberry";if(Bl(e))return"Webos";if(Ll(e))return"Safari";if((e.includes("chrome/")||Ml(e))&&!e.includes("edge/"))return"Chrome";if(Ul(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ol(n=Ae()){return/firefox\//i.test(n)}function Ll(n=Ae()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ml(n=Ae()){return/crios\//i.test(n)}function xl(n=Ae()){return/iemobile/i.test(n)}function Ul(n=Ae()){return/android/i.test(n)}function Fl(n=Ae()){return/blackberry/i.test(n)}function Bl(n=Ae()){return/webos/i.test(n)}function Mo(n=Ae()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function $m(n=Ae()){var e;return Mo(n)&&!!((e=window.navigator)!=null&&e.standalone)}function zm(){return sp()&&document.documentMode===10}function ql(n=Ae()){return Mo(n)||Ul(n)||Bl(n)||Fl(n)||/windows phone/i.test(n)||xl(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jl(n,e=[]){let t;switch(n){case"Browser":t=Kc(Ae());break;case"Worker":t=`${Kc(Ae())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${cn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,u)=>{try{const l=e(i);a(l)}catch(l){u(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wm(n,e={}){return ze(n,"GET","/v2/passwordPolicy",nt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm=6;class Km{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Gm,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Qc(this),this.idTokenSubscription=new Qc(this),this.beforeStateQueue=new Hm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bl,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ot(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await vn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await bs(this,{idToken:e}),r=await Be._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(De(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,u=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===u)&&(l!=null&&l.user)&&(r=l.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ps(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=bm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(De(this.app))return Promise.reject(at(this));const t=e?J(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return De(this.app)?Promise.reject(at(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return De(this.app)?Promise.reject(at(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ot(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Wm(this),t=new Km(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Cr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await jm(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ot(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await vn.create(this,[ot(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(u,this,"internal-error"),u.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=jl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(De(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Am(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ft(n){return J(n)}class Qc{constructor(e){this.auth=e,this.observer=null,this.addObserver=dp(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ks={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Jm(n){Ks=n}function $l(n){return Ks.loadJS(n)}function Ym(){return Ks.recaptchaEnterpriseScript}function Xm(){return Ks.gapiScript}function Zm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class eg{constructor(){this.enterprise=new tg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class tg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const ng="recaptcha-enterprise",zl="NO_RECAPTCHA";class rg{constructor(e){this.type=ng,this.auth=ft(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,u)=>{Om(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const d=new Vm(l);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(l=>{u(l)})})}function s(i,a,u){const l=window.grecaptcha;zc(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(zl)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new eg().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(u=>{if(!t&&zc(window.grecaptcha))s(u,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=Ym();l.length!==0&&(l+=u),$l(l).then(()=>{s(u,i,a)}).catch(d=>{a(d)})}}).catch(u=>{a(u)})})}}async function Jc(n,e,t,r=!1,s=!1){const i=new rg(n);let a;if(s)a=zl;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const u={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const l=u.phoneEnrollmentInfo.phoneNumber,d=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const l=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function Cs(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Jc(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await Jc(n,e,t,t==="getOobCode");return r(n,u)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sg(n,e){const t=Gs(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Xt(i,e??{}))return s;Ue(s,"already-initialized")}return t.initialize({options:e})}function ig(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ot);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function og(n,e,t){const r=ft(n);U(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Hl(e),{host:a,port:u}=ag(e),l=u===null?"":`:${u}`,d={url:`${i}//${a}${l}/`},p=Object.freeze({host:a,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){U(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),U(Xt(d,r.config.emulator)&&Xt(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,Ut(a)?(bo(`${i}//${a}${l}`),Po("Auth",!0)):cg()}function Hl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ag(n){const e=Hl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Yc(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Yc(a)}}}function Yc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function cg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return it("not implemented")}_getIdTokenResponse(e){return it("not implemented")}_linkToIdToken(e,t){return it("not implemented")}_getReauthenticationResolver(e){return it("not implemented")}}async function ug(n,e){return ze(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lg(n,e){return Dr(n,"POST","/v1/accounts:signInWithPassword",nt(n,e))}async function hg(n,e){return ze(n,"POST","/v1/accounts:sendOobCode",nt(n,e))}async function dg(n,e){return hg(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fg(n,e){return Dr(n,"POST","/v1/accounts:signInWithEmailLink",nt(n,e))}async function pg(n,e){return Dr(n,"POST","/v1/accounts:signInWithEmailLink",nt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr extends xo{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Tr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Tr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Cs(e,t,"signInWithPassword",lg);case"emailLink":return fg(e,{email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Cs(e,r,"signUpPassword",ug);case"emailLink":return pg(e,{idToken:t,email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function An(n,e){return Dr(n,"POST","/v1/accounts:signInWithIdp",nt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg="http://localhost";class en extends xo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new en(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ue("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new en(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return An(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,An(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,An(e,t)}buildRequest(){const e={requestUri:mg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=kr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function _g(n){const e=ir(or(n)).link,t=e?ir(or(e)).deep_link_id:null,r=ir(or(n)).deep_link_id;return(r?ir(or(r)).link:null)||r||t||e||n}class Uo{constructor(e){const t=ir(or(e)),r=t.apiKey??null,s=t.oobCode??null,i=gg(t.mode??null);U(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=_g(e);try{return new Uo(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(){this.providerId=On.PROVIDER_ID}static credential(e,t){return Tr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Uo.parseLink(t);return U(r,"argument-error"),Tr._fromEmailAndCode(e,r.code,r.tenantId)}}On.PROVIDER_ID="password";On.EMAIL_PASSWORD_SIGN_IN_METHOD="password";On.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr extends Fo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends Vr{constructor(){super("facebook.com")}static credential(e){return en._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return It.credential(e.oauthAccessToken)}catch{return null}}}It.FACEBOOK_SIGN_IN_METHOD="facebook.com";It.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt extends Vr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return en._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return wt.credential(t,r)}catch{return null}}}wt.GOOGLE_SIGN_IN_METHOD="google.com";wt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends Vr{constructor(){super("github.com")}static credential(e){return en._fromParams({providerId:vt.PROVIDER_ID,signInMethod:vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vt.credentialFromTaggedObject(e)}static credentialFromError(e){return vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vt.credential(e.oauthAccessToken)}catch{return null}}}vt.GITHUB_SIGN_IN_METHOD="github.com";vt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends Vr{constructor(){super("twitter.com")}static credential(e,t){return en._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return At.credentialFromTaggedObject(e)}static credentialFromError(e){return At.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return At.credential(t,r)}catch{return null}}}At.TWITTER_SIGN_IN_METHOD="twitter.com";At.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yg(n,e){return Dr(n,"POST","/v1/accounts:signUp",nt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Be._fromIdTokenResponse(e,r,s),a=Xc(r);return new tn({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Xc(r);return new tn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Xc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks extends tt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ks.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ks(e,t,r,s)}}function Wl(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ks._fromErrorAndOperation(n,i,e,r):i})}async function Eg(n,e,t=!1){const r=await Pn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return tn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tg(n,e,t=!1){const{auth:r}=n;if(De(r.app))return Promise.reject(at(r));const s="reauthenticate";try{const i=await Pn(n,Wl(r,s,e,n),t);U(i.idToken,r,"internal-error");const a=Lo(i.idToken);U(a,r,"internal-error");const{sub:u}=a;return U(n.uid===u,r,"user-mismatch"),tn._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Ue(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gl(n,e,t=!1){if(De(n.app))return Promise.reject(at(n));const r="signIn",s=await Wl(n,r,e),i=await tn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Ig(n,e){return Gl(ft(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kl(n){const e=ft(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Aw(n,e,t){const r=ft(n);await Cs(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",dg)}async function Rw(n,e,t){if(De(n.app))return Promise.reject(at(n));const r=ft(n),a=await Cs(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",yg).catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&Kl(n),l}),u=await tn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(u.user),u}function Sw(n,e,t){return De(n.app)?Promise.reject(at(n)):Ig(J(n),On.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Kl(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wg(n,e){return ze(n,"POST","/v1/accounts:createAuthUri",nt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bw(n,e){const t=Pl()?Ss():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:s}=await wg(J(n),r);return s||[]}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vg(n,e){return ze(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pw(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=J(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Pn(r,vg(r.auth,i));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const u=r.providerData.find(({providerId:l})=>l==="password");u&&(u.displayName=r.displayName,u.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ag(n,e){return J(n).setPersistence(e)}function Rg(n,e,t,r){return J(n).onIdTokenChanged(e,t,r)}function Sg(n,e,t){return J(n).beforeAuthStateChanged(e,t)}function Cw(n,e,t,r){return J(n).onAuthStateChanged(e,t,r)}function kw(n){return J(n).signOut()}const Ns="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ns,"1"),this.storage.removeItem(Ns),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg=1e3,Pg=10;class Jl extends Ql{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ql(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,l)=>{this.notifyListeners(a,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);zm()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Pg):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},bg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jl.type="LOCAL";const Yl=Jl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl extends Ql{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Xl.type="SESSION";const Zl=Xl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cg(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Qs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(a).map(async d=>d(t.origin,i)),l=await Cg(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Qs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kg{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((u,l)=>{const d=Bo("",20);s.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(g){const E=g;if(E.data.eventId===d)switch(E.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(E.data.response);break;default:clearTimeout(p),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(){return window}function Ng(n){Je().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eh(){return typeof Je().WorkerGlobalScope<"u"&&typeof Je().importScripts=="function"}async function Dg(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Vg(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Og(){return eh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th="firebaseLocalStorageDb",Lg=1,Ds="firebaseLocalStorage",nh="fbase_key";class Or{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Js(n,e){return n.transaction([Ds],e?"readwrite":"readonly").objectStore(Ds)}function Mg(){const n=indexedDB.deleteDatabase(th);return new Or(n).toPromise()}function co(){const n=indexedDB.open(th,Lg);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ds,{keyPath:nh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ds)?e(r):(r.close(),await Mg(),e(await co()))})})}async function Zc(n,e,t){const r=Js(n,!0).put({[nh]:e,value:t});return new Or(r).toPromise()}async function xg(n,e){const t=Js(n,!1).get(e),r=await new Or(t).toPromise();return r===void 0?null:r.value}function eu(n,e){const t=Js(n,!0).delete(e);return new Or(t).toPromise()}const Ug=800,Fg=3;class rh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await co(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Fg)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return eh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Qs._getInstance(Og()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Dg(),!this.activeServiceWorker)return;this.sender=new kg(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Vg()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await co();return await Zc(e,Ns,"1"),await eu(e,Ns),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Zc(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>xg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>eu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Js(s,!1).getAll();return new Or(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ug)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}rh.type="LOCAL";const Bg=rh;new Nr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(n,e){return e?ot(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo extends xo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return An(e,this._buildIdpRequest())}_linkToIdToken(e,t){return An(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return An(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function qg(n){return Gl(n.auth,new qo(n),n.bypassAuthState)}function jg(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),Tg(t,new qo(n),n.bypassAuthState)}async function $g(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),Eg(t,new qo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:u}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return qg;case"linkViaPopup":case"linkViaRedirect":return $g;case"reauthViaPopup":case"reauthViaRedirect":return jg;default:Ue(this.auth,"internal-error")}}resolve(e){lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zg=new Nr(2e3,1e4);async function Nw(n,e,t){if(De(n.app))return Promise.reject(qe(n,"operation-not-supported-in-this-environment"));const r=ft(n);Rm(n,e,Fo);const s=sh(r,t);return new Qt(r,"signInViaPopup",e,s).executeNotNull()}class Qt extends ih{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Qt.currentPopupAction&&Qt.currentPopupAction.cancel(),Qt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){lt(this.filter.length===1,"Popup operations only handle one event");const e=Bo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Qt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,zg.get())};e()}}Qt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg="pendingRedirect",ms=new Map;class Wg extends ih{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ms.get(this.auth._key());if(!e){try{const r=await Gg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ms.set(this.auth._key(),e)}return this.bypassAuthState||ms.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Gg(n,e){const t=Jg(e),r=Qg(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Kg(n,e){ms.set(n._key(),e)}function Qg(n){return ot(n._redirectPersistence)}function Jg(n){return ps(Hg,n.config.apiKey,n.name)}async function Yg(n,e,t=!1){if(De(n.app))return Promise.reject(at(n));const r=ft(n),s=sh(r,e),a=await new Wg(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xg=10*60*1e3;class Zg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!e_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!oh(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(qe(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Xg&&this.cachedEventUids.clear(),this.cachedEventUids.has(tu(e))}saveEventToCache(e){this.cachedEventUids.add(tu(e)),this.lastProcessedEventTime=Date.now()}}function tu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function oh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function e_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return oh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function t_(n,e={}){return ze(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,r_=/^https?/;async function s_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await t_(n);for(const t of e)try{if(i_(t))return}catch{}Ue(n,"unauthorized-domain")}function i_(n){const e=Ss(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!r_.test(t))return!1;if(n_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o_=new Nr(3e4,6e4);function nu(){const n=Je().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function a_(n){return new Promise((e,t)=>{var s,i,a;function r(){nu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{nu(),t(qe(n,"network-request-failed"))},timeout:o_.get()})}if((i=(s=Je().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=Je().gapi)!=null&&a.load)r();else{const u=Zm("iframefcb");return Je()[u]=()=>{gapi.load?r():t(qe(n,"network-request-failed"))},$l(`${Xm()}?onload=${u}`).catch(l=>t(l))}}).catch(e=>{throw gs=null,e})}let gs=null;function c_(n){return gs=gs||a_(n),gs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_=new Nr(5e3,15e3),l_="__/auth/iframe",h_="emulator/auth/iframe",d_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},f_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function p_(n){const e=n.config;U(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Oo(e,h_):`https://${n.config.authDomain}/${l_}`,r={apiKey:e.apiKey,appName:n.name,v:cn},s=f_.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${kr(r).slice(1)}`}async function m_(n){const e=await c_(n),t=Je().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:p_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:d_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=qe(n,"network-request-failed"),u=Je().setTimeout(()=>{i(a)},u_.get());function l(){Je().clearTimeout(u),s(r)}r.ping(l).then(l,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},__=500,y_=600,E_="_blank",T_="http://localhost";class ru{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function I_(n,e,t,r=__,s=y_){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const l={...g_,width:r.toString(),height:s.toString(),top:i,left:a},d=Ae().toLowerCase();t&&(u=Ml(d)?E_:t),Ol(d)&&(e=e||T_,l.scrollbars="yes");const p=Object.entries(l).reduce((E,[S,C])=>`${E}${S}=${C},`,"");if($m(d)&&u!=="_self")return w_(e||"",u),new ru(null);const g=window.open(e||"",u,p);U(g,n,"popup-blocked");try{g.focus()}catch{}return new ru(g)}function w_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v_="__/auth/handler",A_="emulator/auth/handler",R_=encodeURIComponent("fac");async function su(n,e,t,r,s,i){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:cn,eventId:s};if(e instanceof Fo){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",hp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,g]of Object.entries({}))a[p]=g}if(e instanceof Vr){const p=e.getScopes().filter(g=>g!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const u=a;for(const p of Object.keys(u))u[p]===void 0&&delete u[p];const l=await n._getAppCheckToken(),d=l?`#${R_}=${encodeURIComponent(l)}`:"";return`${S_(n)}?${kr(u).slice(1)}${d}`}function S_({config:n}){return n.emulator?Oo(n,A_):`https://${n.authDomain}/${v_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki="webStorageSupport";class b_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zl,this._completeRedirectFn=Yg,this._overrideRedirectResult=Kg}async _openPopup(e,t,r,s){var a;lt((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await su(e,t,r,Ss(),s);return I_(e,i,Bo())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await su(e,t,r,Ss(),s);return Ng(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(lt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await m_(e),r=new Zg(e);return t.register("authEvent",s=>(U(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ki,{type:Ki},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[Ki];i!==void 0&&t(!!i),Ue(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=s_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ql()||Ll()||Mo()}}const P_=b_;var iu="@firebase/auth",ou="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function N_(n){Zt(new Nt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;U(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:jl(n)},d=new Qm(r,s,i,l);return ig(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Zt(new Nt("auth-internal",e=>{const t=ft(e.getProvider("auth").getImmediate());return(r=>new C_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qe(iu,ou,k_(n)),Qe(iu,ou,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D_=5*60,V_=El("authIdTokenMaxAge")||D_;let au=null;const O_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>V_)return;const s=t==null?void 0:t.token;au!==s&&(au=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function L_(n=No()){const e=Gs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=sg(n,{popupRedirectResolver:P_,persistence:[Bg,Yl,Zl]}),r=El("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=O_(i.toString());Sg(t,a,()=>a(t.currentUser)),Rg(t,u=>a(u))}}const s=gl("auth");return s&&og(t,`http://${s}`),t}function M_(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Jm({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=qe("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",M_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});N_("Browser");var x_="firebase",U_="12.9.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qe(x_,U_,"app");var cu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pt,ah;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,m){function y(){}y.prototype=m.prototype,I.F=m.prototype,I.prototype=new y,I.prototype.constructor=I,I.D=function(w,T,A){for(var _=Array(arguments.length-2),Ce=2;Ce<arguments.length;Ce++)_[Ce-2]=arguments[Ce];return m.prototype[T].apply(w,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,m,y){y||(y=0);const w=Array(16);if(typeof m=="string")for(var T=0;T<16;++T)w[T]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(T=0;T<16;++T)w[T]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=I.g[0],y=I.g[1],T=I.g[2];let A=I.g[3],_;_=m+(A^y&(T^A))+w[0]+3614090360&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(T^m&(y^T))+w[1]+3905402710&4294967295,A=m+(_<<12&4294967295|_>>>20),_=T+(y^A&(m^y))+w[2]+606105819&4294967295,T=A+(_<<17&4294967295|_>>>15),_=y+(m^T&(A^m))+w[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=m+(A^y&(T^A))+w[4]+4118548399&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(T^m&(y^T))+w[5]+1200080426&4294967295,A=m+(_<<12&4294967295|_>>>20),_=T+(y^A&(m^y))+w[6]+2821735955&4294967295,T=A+(_<<17&4294967295|_>>>15),_=y+(m^T&(A^m))+w[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=m+(A^y&(T^A))+w[8]+1770035416&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(T^m&(y^T))+w[9]+2336552879&4294967295,A=m+(_<<12&4294967295|_>>>20),_=T+(y^A&(m^y))+w[10]+4294925233&4294967295,T=A+(_<<17&4294967295|_>>>15),_=y+(m^T&(A^m))+w[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=m+(A^y&(T^A))+w[12]+1804603682&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(T^m&(y^T))+w[13]+4254626195&4294967295,A=m+(_<<12&4294967295|_>>>20),_=T+(y^A&(m^y))+w[14]+2792965006&4294967295,T=A+(_<<17&4294967295|_>>>15),_=y+(m^T&(A^m))+w[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=m+(T^A&(y^T))+w[1]+4129170786&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^T&(m^y))+w[6]+3225465664&4294967295,A=m+(_<<9&4294967295|_>>>23),_=T+(m^y&(A^m))+w[11]+643717713&4294967295,T=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(T^A))+w[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=m+(T^A&(y^T))+w[5]+3593408605&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^T&(m^y))+w[10]+38016083&4294967295,A=m+(_<<9&4294967295|_>>>23),_=T+(m^y&(A^m))+w[15]+3634488961&4294967295,T=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(T^A))+w[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=m+(T^A&(y^T))+w[9]+568446438&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^T&(m^y))+w[14]+3275163606&4294967295,A=m+(_<<9&4294967295|_>>>23),_=T+(m^y&(A^m))+w[3]+4107603335&4294967295,T=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(T^A))+w[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=m+(T^A&(y^T))+w[13]+2850285829&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^T&(m^y))+w[2]+4243563512&4294967295,A=m+(_<<9&4294967295|_>>>23),_=T+(m^y&(A^m))+w[7]+1735328473&4294967295,T=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(T^A))+w[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=m+(y^T^A)+w[5]+4294588738&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^T)+w[8]+2272392833&4294967295,A=m+(_<<11&4294967295|_>>>21),_=T+(A^m^y)+w[11]+1839030562&4294967295,T=A+(_<<16&4294967295|_>>>16),_=y+(T^A^m)+w[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=m+(y^T^A)+w[1]+2763975236&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^T)+w[4]+1272893353&4294967295,A=m+(_<<11&4294967295|_>>>21),_=T+(A^m^y)+w[7]+4139469664&4294967295,T=A+(_<<16&4294967295|_>>>16),_=y+(T^A^m)+w[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=m+(y^T^A)+w[13]+681279174&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^T)+w[0]+3936430074&4294967295,A=m+(_<<11&4294967295|_>>>21),_=T+(A^m^y)+w[3]+3572445317&4294967295,T=A+(_<<16&4294967295|_>>>16),_=y+(T^A^m)+w[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=m+(y^T^A)+w[9]+3654602809&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^T)+w[12]+3873151461&4294967295,A=m+(_<<11&4294967295|_>>>21),_=T+(A^m^y)+w[15]+530742520&4294967295,T=A+(_<<16&4294967295|_>>>16),_=y+(T^A^m)+w[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=m+(T^(y|~A))+w[0]+4096336452&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~T))+w[7]+1126891415&4294967295,A=m+(_<<10&4294967295|_>>>22),_=T+(m^(A|~y))+w[14]+2878612391&4294967295,T=A+(_<<15&4294967295|_>>>17),_=y+(A^(T|~m))+w[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=m+(T^(y|~A))+w[12]+1700485571&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~T))+w[3]+2399980690&4294967295,A=m+(_<<10&4294967295|_>>>22),_=T+(m^(A|~y))+w[10]+4293915773&4294967295,T=A+(_<<15&4294967295|_>>>17),_=y+(A^(T|~m))+w[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=m+(T^(y|~A))+w[8]+1873313359&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~T))+w[15]+4264355552&4294967295,A=m+(_<<10&4294967295|_>>>22),_=T+(m^(A|~y))+w[6]+2734768916&4294967295,T=A+(_<<15&4294967295|_>>>17),_=y+(A^(T|~m))+w[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=m+(T^(y|~A))+w[4]+4149444226&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~T))+w[11]+3174756917&4294967295,A=m+(_<<10&4294967295|_>>>22),_=T+(m^(A|~y))+w[2]+718787259&4294967295,T=A+(_<<15&4294967295|_>>>17),_=y+(A^(T|~m))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+T&4294967295,I.g[3]=I.g[3]+A&4294967295}r.prototype.v=function(I,m){m===void 0&&(m=I.length);const y=m-this.blockSize,w=this.C;let T=this.h,A=0;for(;A<m;){if(T==0)for(;A<=y;)s(this,I,A),A+=this.blockSize;if(typeof I=="string"){for(;A<m;)if(w[T++]=I.charCodeAt(A++),T==this.blockSize){s(this,w),T=0;break}}else for(;A<m;)if(w[T++]=I[A++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=m},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;m=this.o*8;for(var y=I.length-8;y<I.length;++y)I[y]=m&255,m/=256;for(this.v(I),I=Array(16),m=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)I[m++]=this.g[y]>>>w&255;return I};function i(I,m){var y=u;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=m(I)}function a(I,m){this.h=m;const y=[];let w=!0;for(let T=I.length-1;T>=0;T--){const A=I[T]|0;w&&A==m||(y[T]=A,w=!1)}this.g=y}var u={};function l(I){return-128<=I&&I<128?i(I,function(m){return new a([m|0],m<0?-1:0)}):new a([I|0],I<0?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return g;if(I<0)return k(d(-I));const m=[];let y=1;for(let w=0;I>=y;w++)m[w]=I/y|0,y*=4294967296;return new a(m,0)}function p(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return k(p(I.substring(1),m));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=d(Math.pow(m,8));let w=g;for(let A=0;A<I.length;A+=8){var T=Math.min(8,I.length-A);const _=parseInt(I.substring(A,A+T),m);T<8?(T=d(Math.pow(m,T)),w=w.j(T).add(d(_))):(w=w.j(y),w=w.add(d(_)))}return w}var g=l(0),E=l(1),S=l(16777216);n=a.prototype,n.m=function(){if(V(this))return-k(this).m();let I=0,m=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);I+=(w>=0?w:4294967296+w)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(V(this))return"-"+k(this).toString(I);const m=d(Math.pow(I,6));var y=this;let w="";for(;;){const T=Q(y,m).g;y=q(y,T.j(m));let A=((y.g.length>0?y.g[0]:y.h)>>>0).toString(I);if(y=T,C(y))return A+w;for(;A.length<6;)A="0"+A;w=A+w}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(let m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function V(I){return I.h==-1}n.l=function(I){return I=q(this,I),V(I)?-1:C(I)?0:1};function k(I){const m=I.g.length,y=[];for(let w=0;w<m;w++)y[w]=~I.g[w];return new a(y,~I.h).add(E)}n.abs=function(){return V(this)?k(this):this},n.add=function(I){const m=Math.max(this.g.length,I.g.length),y=[];let w=0;for(let T=0;T<=m;T++){let A=w+(this.i(T)&65535)+(I.i(T)&65535),_=(A>>>16)+(this.i(T)>>>16)+(I.i(T)>>>16);w=_>>>16,A&=65535,_&=65535,y[T]=_<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function q(I,m){return I.add(k(m))}n.j=function(I){if(C(this)||C(I))return g;if(V(this))return V(I)?k(this).j(k(I)):k(k(this).j(I));if(V(I))return k(this.j(k(I)));if(this.l(S)<0&&I.l(S)<0)return d(this.m()*I.m());const m=this.g.length+I.g.length,y=[];for(var w=0;w<2*m;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<I.g.length;T++){const A=this.i(w)>>>16,_=this.i(w)&65535,Ce=I.i(T)>>>16,jt=I.i(T)&65535;y[2*w+2*T]+=_*jt,B(y,2*w+2*T),y[2*w+2*T+1]+=A*jt,B(y,2*w+2*T+1),y[2*w+2*T+1]+=_*Ce,B(y,2*w+2*T+1),y[2*w+2*T+2]+=A*Ce,B(y,2*w+2*T+2)}for(I=0;I<m;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=m;I<2*m;I++)y[I]=0;return new a(y,0)};function B(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function j(I,m){this.g=I,this.h=m}function Q(I,m){if(C(m))throw Error("division by zero");if(C(I))return new j(g,g);if(V(I))return m=Q(k(I),m),new j(k(m.g),k(m.h));if(V(m))return m=Q(I,k(m)),new j(k(m.g),m.h);if(I.g.length>30){if(V(I)||V(m))throw Error("slowDivide_ only works with positive integers.");for(var y=E,w=m;w.l(I)<=0;)y=ne(y),w=ne(w);var T=re(y,1),A=re(w,1);for(w=re(w,2),y=re(y,2);!C(w);){var _=A.add(w);_.l(I)<=0&&(T=T.add(y),A=_),w=re(w,1),y=re(y,1)}return m=q(I,T.j(m)),new j(T,m)}for(T=g;I.l(m)>=0;){for(y=Math.max(1,Math.floor(I.m()/m.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),A=d(y),_=A.j(m);V(_)||_.l(I)>0;)y-=w,A=d(y),_=A.j(m);C(A)&&(A=E),T=T.add(A),I=q(I,_)}return new j(T,I)}n.B=function(I){return Q(this,I).h},n.and=function(I){const m=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)&I.i(w);return new a(y,this.h&I.h)},n.or=function(I){const m=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)|I.i(w);return new a(y,this.h|I.h)},n.xor=function(I){const m=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)^I.i(w);return new a(y,this.h^I.h)};function ne(I){const m=I.g.length+1,y=[];for(let w=0;w<m;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(y,I.h)}function re(I,m){const y=m>>5;m%=32;const w=I.g.length-y,T=[];for(let A=0;A<w;A++)T[A]=m>0?I.i(A+y)>>>m|I.i(A+y+1)<<32-m:I.i(A+y);return new a(T,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,ah=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Pt=a}).apply(typeof cu<"u"?cu:typeof self<"u"?self:typeof window<"u"?window:{});var os=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ch,ar,uh,_s,uo,lh,hh,dh;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof os=="object"&&os];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var v=o[f];if(!(v in h))break e;h=h[v]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var h=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&h.push([f,c[f]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function l(o,c,h){return o.call.apply(o.bind,arguments)}function d(o,c,h){return d=l,d.apply(null,arguments)}function p(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function g(o,c){function h(){}h.prototype=c.prototype,o.Z=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(f,v,R){for(var N=Array(arguments.length-2),$=2;$<arguments.length;$++)N[$-2]=arguments[$];return c.prototype[v].apply(f,N)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function S(o){const c=o.length;if(c>0){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function C(o,c){for(let f=1;f<arguments.length;f++){const v=arguments[f];var h=typeof v;if(h=h!="object"?h:v?Array.isArray(v)?"array":h:"null",h=="array"||h=="object"&&typeof v.length=="number"){h=o.length||0;const R=v.length||0;o.length=h+R;for(let N=0;N<R;N++)o[h+N]=v[N]}else o.push(v)}}class V{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function k(o){a.setTimeout(()=>{throw o},0)}function q(){var o=I;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class B{constructor(){this.h=this.g=null}add(c,h){const f=j.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var j=new V(()=>new Q,o=>o.reset());class Q{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let ne,re=!1,I=new B,m=()=>{const o=Promise.resolve(void 0);ne=()=>{o.then(y)}};function y(){for(var o;o=q();){try{o.h.call(o.g)}catch(h){k(h)}var c=j;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}re=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return o}();function _(o){return/^[\s\xa0]*$/.test(o)}function Ce(o,c){T.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}g(Ce,T),Ce.prototype.init=function(o,c){const h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&Ce.Z.h.call(this)},Ce.prototype.h=function(){Ce.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var jt="closure_listenable_"+(Math.random()*1e6|0),lf=0;function hf(o,c,h,f,v){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=v,this.key=++lf,this.da=this.fa=!1}function zr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Hr(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function df(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function Na(o){const c={};for(const h in o)c[h]=o[h];return c}const Da="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Va(o,c){let h,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(h in f)o[h]=f[h];for(let R=0;R<Da.length;R++)h=Da[R],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function Wr(o){this.src=o,this.g={},this.h=0}Wr.prototype.add=function(o,c,h,f,v){const R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);const N=Ei(o,c,f,v);return N>-1?(c=o[N],h||(c.fa=!1)):(c=new hf(c,this.src,R,!!f,v),c.fa=h,o.push(c)),c};function yi(o,c){const h=c.type;if(h in o.g){var f=o.g[h],v=Array.prototype.indexOf.call(f,c,void 0),R;(R=v>=0)&&Array.prototype.splice.call(f,v,1),R&&(zr(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Ei(o,c,h,f){for(let v=0;v<o.length;++v){const R=o[v];if(!R.da&&R.listener==c&&R.capture==!!h&&R.ha==f)return v}return-1}var Ti="closure_lm_"+(Math.random()*1e6|0),Ii={};function Oa(o,c,h,f,v){if(Array.isArray(c)){for(let R=0;R<c.length;R++)Oa(o,c[R],h,f,v);return null}return h=xa(h),o&&o[jt]?o.J(c,h,u(f)?!!f.capture:!1,v):ff(o,c,h,!1,f,v)}function ff(o,c,h,f,v,R){if(!c)throw Error("Invalid event type");const N=u(v)?!!v.capture:!!v;let $=vi(o);if($||(o[Ti]=$=new Wr(o)),h=$.add(c,h,f,N,R),h.proxy)return h;if(f=pf(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)A||(v=N),v===void 0&&(v=!1),o.addEventListener(c.toString(),f,v);else if(o.attachEvent)o.attachEvent(Ma(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function pf(){function o(h){return c.call(o.src,o.listener,h)}const c=mf;return o}function La(o,c,h,f,v){if(Array.isArray(c))for(var R=0;R<c.length;R++)La(o,c[R],h,f,v);else f=u(f)?!!f.capture:!!f,h=xa(h),o&&o[jt]?(o=o.i,R=String(c).toString(),R in o.g&&(c=o.g[R],h=Ei(c,h,f,v),h>-1&&(zr(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete o.g[R],o.h--)))):o&&(o=vi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=Ei(c,h,f,v)),(h=o>-1?c[o]:null)&&wi(h))}function wi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[jt])yi(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(Ma(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=vi(c))?(yi(h,o),h.h==0&&(h.src=null,c[Ti]=null)):zr(o)}}}function Ma(o){return o in Ii?Ii[o]:Ii[o]="on"+o}function mf(o,c){if(o.da)o=!0;else{c=new Ce(c,this);const h=o.listener,f=o.ha||o.src;o.fa&&wi(o),o=h.call(f,c)}return o}function vi(o){return o=o[Ti],o instanceof Wr?o:null}var Ai="__closure_events_fn_"+(Math.random()*1e9>>>0);function xa(o){return typeof o=="function"?o:(o[Ai]||(o[Ai]=function(c){return o.handleEvent(c)}),o[Ai])}function Ie(){w.call(this),this.i=new Wr(this),this.M=this,this.G=null}g(Ie,w),Ie.prototype[jt]=!0,Ie.prototype.removeEventListener=function(o,c,h,f){La(this,o,c,h,f)};function Re(o,c){var h,f=o.G;if(f)for(h=[];f;f=f.G)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new T(c,o);else if(c instanceof T)c.target=c.target||o;else{var v=c;c=new T(f,o),Va(c,v)}v=!0;let R,N;if(h)for(N=h.length-1;N>=0;N--)R=c.g=h[N],v=Gr(R,f,!0,c)&&v;if(R=c.g=o,v=Gr(R,f,!0,c)&&v,v=Gr(R,f,!1,c)&&v,h)for(N=0;N<h.length;N++)R=c.g=h[N],v=Gr(R,f,!1,c)&&v}Ie.prototype.N=function(){if(Ie.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const h=o.g[c];for(let f=0;f<h.length;f++)zr(h[f]);delete o.g[c],o.h--}}this.G=null},Ie.prototype.J=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},Ie.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function Gr(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let v=!0;for(let R=0;R<c.length;++R){const N=c[R];if(N&&!N.da&&N.capture==h){const $=N.listener,de=N.ha||N.src;N.fa&&yi(o.i,N),v=$.call(de,f)!==!1&&v}}return v&&!f.defaultPrevented}function gf(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function Ua(o){o.g=gf(()=>{o.g=null,o.i&&(o.i=!1,Ua(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class _f extends w{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Ua(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function qn(o){w.call(this),this.h=o,this.g={}}g(qn,w);var Fa=[];function Ba(o){Hr(o.g,function(c,h){this.g.hasOwnProperty(h)&&wi(c)},o),o.g={}}qn.prototype.N=function(){qn.Z.N.call(this),Ba(this)},qn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ri=a.JSON.stringify,yf=a.JSON.parse,Ef=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function qa(){}function ja(){}var jn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Si(){T.call(this,"d")}g(Si,T);function bi(){T.call(this,"c")}g(bi,T);var $t={},$a=null;function Kr(){return $a=$a||new Ie}$t.Ia="serverreachability";function za(o){T.call(this,$t.Ia,o)}g(za,T);function $n(o){const c=Kr();Re(c,new za(c))}$t.STAT_EVENT="statevent";function Ha(o,c){T.call(this,$t.STAT_EVENT,o),this.stat=c}g(Ha,T);function Se(o){const c=Kr();Re(c,new Ha(c,o))}$t.Ja="timingevent";function Wa(o,c){T.call(this,$t.Ja,o),this.size=c}g(Wa,T);function zn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function Hn(){this.g=!0}Hn.prototype.ua=function(){this.g=!1};function Tf(o,c,h,f,v,R){o.info(function(){if(o.g)if(R){var N="",$=R.split("&");for(let X=0;X<$.length;X++){var de=$[X].split("=");if(de.length>1){const pe=de[0];de=de[1];const We=pe.split("_");N=We.length>=2&&We[1]=="type"?N+(pe+"="+de+"&"):N+(pe+"=redacted&")}}}else N=null;else N=R;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+c+`
`+h+`
`+N})}function If(o,c,h,f,v,R,N){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+c+`
`+h+`
`+R+" "+N})}function fn(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+vf(o,h)+(f?" "+f:"")})}function wf(o,c){o.info(function(){return"TIMEOUT: "+c})}Hn.prototype.info=function(){};function vf(o,c){if(!o.g)return c;if(!c)return null;try{const R=JSON.parse(c);if(R){for(o=0;o<R.length;o++)if(Array.isArray(R[o])){var h=R[o];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var v=f[0];if(v!="noop"&&v!="stop"&&v!="close")for(let N=1;N<f.length;N++)f[N]=""}}}}return Ri(R)}catch{return c}}var Qr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ga={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Ka;function Pi(){}g(Pi,qa),Pi.prototype.g=function(){return new XMLHttpRequest},Ka=new Pi;function Wn(o){return encodeURIComponent(String(o))}function Af(o){var c=1;o=o.split(":");const h=[];for(;c>0&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function pt(o,c,h,f){this.j=o,this.i=c,this.l=h,this.S=f||1,this.V=new qn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Qa}function Qa(){this.i=null,this.g="",this.h=!1}var Ja={},Ci={};function ki(o,c,h){o.M=1,o.A=Yr(He(c)),o.u=h,o.R=!0,Ya(o,null)}function Ya(o,c){o.F=Date.now(),Jr(o),o.B=He(o.A);var h=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),lc(h.i,"t",f),o.C=0,h=o.j.L,o.h=new Qa,o.g=Pc(o.j,h?c:null,!o.u),o.P>0&&(o.O=new _f(d(o.Y,o,o.g),o.P)),c=o.V,h=o.g,f=o.ba;var v="readystatechange";Array.isArray(v)||(v&&(Fa[0]=v.toString()),v=Fa);for(let R=0;R<v.length;R++){const N=Oa(h,v[R],f||c.handleEvent,!1,c.h||c);if(!N)break;c.g[N.key]=N}c=o.J?Na(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),$n(),Tf(o.i,o.v,o.B,o.l,o.S,o.u)}pt.prototype.ba=function(o){o=o.target;const c=this.O;c&&_t(o)==3?c.j():this.Y(o)},pt.prototype.Y=function(o){try{if(o==this.g)e:{const $=_t(this.g),de=this.g.ya(),X=this.g.ca();if(!($<3)&&($!=3||this.g&&(this.h.h||this.g.la()||_c(this.g)))){this.K||$!=4||de==7||(de==8||X<=0?$n(3):$n(2)),Ni(this);var c=this.g.ca();this.X=c;var h=Rf(this);if(this.o=c==200,If(this.i,this.v,this.B,this.l,this.S,$,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,v=this.g;if((f=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(f)){var R=f;break t}}R=null}if(o=R)fn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Di(this,o);else{this.o=!1,this.m=3,Se(12),zt(this),Gn(this);break e}}if(this.R){o=!0;let pe;for(;!this.K&&this.C<h.length;)if(pe=Sf(this,h),pe==Ci){$==4&&(this.m=4,Se(14),o=!1),fn(this.i,this.l,null,"[Incomplete Response]");break}else if(pe==Ja){this.m=4,Se(15),fn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else fn(this.i,this.l,pe,null),Di(this,pe);if(Xa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),$!=4||h.length!=0||this.h.h||(this.m=1,Se(16),o=!1),this.o=this.o&&o,!o)fn(this.i,this.l,h,"[Invalid Chunked Response]"),zt(this),Gn(this);else if(h.length>0&&!this.W){this.W=!0;var N=this.j;N.g==this&&N.aa&&!N.P&&(N.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Bi(N),N.P=!0,Se(11))}}else fn(this.i,this.l,h,null),Di(this,h);$==4&&zt(this),this.o&&!this.K&&($==4?Ac(this.j,this):(this.o=!1,Jr(this)))}else Bf(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,Se(12)):(this.m=0,Se(13)),zt(this),Gn(this)}}}catch{}finally{}};function Rf(o){if(!Xa(o))return o.g.la();const c=_c(o.g);if(c==="")return"";let h="";const f=c.length,v=_t(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return zt(o),Gn(o),"";o.h.i=new a.TextDecoder}for(let R=0;R<f;R++)o.h.h=!0,h+=o.h.i.decode(c[R],{stream:!(v&&R==f-1)});return c.length=0,o.h.g+=h,o.C=0,o.h.g}function Xa(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Sf(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?Ci:(h=Number(c.substring(h,f)),isNaN(h)?Ja:(f+=1,f+h>c.length?Ci:(c=c.slice(f,f+h),o.C=f+h,c)))}pt.prototype.cancel=function(){this.K=!0,zt(this)};function Jr(o){o.T=Date.now()+o.H,Za(o,o.H)}function Za(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=zn(d(o.aa,o),c)}function Ni(o){o.D&&(a.clearTimeout(o.D),o.D=null)}pt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(wf(this.i,this.B),this.M!=2&&($n(),Se(17)),zt(this),this.m=2,Gn(this)):Za(this,this.T-o)};function Gn(o){o.j.I==0||o.K||Ac(o.j,o)}function zt(o){Ni(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,Ba(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function Di(o,c){try{var h=o.j;if(h.I!=0&&(h.g==o||Vi(h.h,o))){if(!o.L&&Vi(h.h,o)&&h.I==3){try{var f=h.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)ns(h),es(h);else break e;Fi(h),Se(18)}}else h.xa=v[1],0<h.xa-h.K&&v[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=zn(d(h.Va,h),6e3));nc(h.h)<=1&&h.ta&&(h.ta=void 0)}else Wt(h,11)}else if((o.L||h.g==o)&&ns(h),!_(c))for(v=h.Ba.g.parse(c),c=0;c<v.length;c++){let X=v[c];const pe=X[0];if(!(pe<=h.K))if(h.K=pe,X=X[1],h.I==2)if(X[0]=="c"){h.M=X[1],h.ba=X[2];const We=X[3];We!=null&&(h.ka=We,h.j.info("VER="+h.ka));const Gt=X[4];Gt!=null&&(h.za=Gt,h.j.info("SVER="+h.za));const yt=X[5];yt!=null&&typeof yt=="number"&&yt>0&&(f=1.5*yt,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Et=o.g;if(Et){const ss=Et.g?Et.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ss){var R=f.h;R.g||ss.indexOf("spdy")==-1&&ss.indexOf("quic")==-1&&ss.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Oi(R,R.h),R.h=null))}if(f.G){const qi=Et.g?Et.g.getResponseHeader("X-HTTP-Session-Id"):null;qi&&(f.wa=qi,Z(f.J,f.G,qi))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var N=o;if(f.na=bc(f,f.L?f.ba:null,f.W),N.L){rc(f.h,N);var $=N,de=f.O;de&&($.H=de),$.D&&(Ni($),Jr($)),f.g=N}else wc(f);h.i.length>0&&ts(h)}else X[0]!="stop"&&X[0]!="close"||Wt(h,7);else h.I==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?Wt(h,7):Ui(h):X[0]!="noop"&&h.l&&h.l.qa(X),h.A=0)}}$n(4)}catch{}}var bf=class{constructor(o,c){this.g=o,this.map=c}};function ec(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function tc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function nc(o){return o.h?1:o.g?o.g.size:0}function Vi(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Oi(o,c){o.g?o.g.add(c):o.h=c}function rc(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}ec.prototype.cancel=function(){if(this.i=sc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function sc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.G);return c}return S(o.i)}var ic=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Pf(o,c){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const f=o[h].indexOf("=");let v,R=null;f>=0?(v=o[h].substring(0,f),R=o[h].substring(f+1)):v=o[h],c(v,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function mt(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof mt?(this.l=o.l,Kn(this,o.j),this.o=o.o,this.g=o.g,Qn(this,o.u),this.h=o.h,Li(this,hc(o.i)),this.m=o.m):o&&(c=String(o).match(ic))?(this.l=!1,Kn(this,c[1]||"",!0),this.o=Jn(c[2]||""),this.g=Jn(c[3]||"",!0),Qn(this,c[4]),this.h=Jn(c[5]||"",!0),Li(this,c[6]||"",!0),this.m=Jn(c[7]||"")):(this.l=!1,this.i=new Xn(null,this.l))}mt.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(Yn(c,oc,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Yn(c,oc,!0),"@"),o.push(Wn(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Yn(h,h.charAt(0)=="/"?Nf:kf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Yn(h,Vf)),o.join("")},mt.prototype.resolve=function(o){const c=He(this);let h=!!o.j;h?Kn(c,o.j):h=!!o.o,h?c.o=o.o:h=!!o.g,h?c.g=o.g:h=o.u!=null;var f=o.h;if(h)Qn(c,o.u);else if(h=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var v=c.h.lastIndexOf("/");v!=-1&&(f=c.h.slice(0,v+1)+f)}if(v=f,v==".."||v==".")f="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){f=v.lastIndexOf("/",0)==0,v=v.split("/");const R=[];for(let N=0;N<v.length;){const $=v[N++];$=="."?f&&N==v.length&&R.push(""):$==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),f&&N==v.length&&R.push("")):(R.push($),f=!0)}f=R.join("/")}else f=v}return h?c.h=f:h=o.i.toString()!=="",h?Li(c,hc(o.i)):h=!!o.m,h&&(c.m=o.m),c};function He(o){return new mt(o)}function Kn(o,c,h){o.j=h?Jn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Qn(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function Li(o,c,h){c instanceof Xn?(o.i=c,Of(o.i,o.l)):(h||(c=Yn(c,Df)),o.i=new Xn(c,o.l))}function Z(o,c,h){o.i.set(c,h)}function Yr(o){return Z(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Jn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Yn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,Cf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Cf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var oc=/[#\/\?@]/g,kf=/[#\?:]/g,Nf=/[#\?]/g,Df=/[#\?@]/g,Vf=/#/g;function Xn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Ht(o){o.g||(o.g=new Map,o.h=0,o.i&&Pf(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=Xn.prototype,n.add=function(o,c){Ht(this),this.i=null,o=pn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function ac(o,c){Ht(o),c=pn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function cc(o,c){return Ht(o),c=pn(o,c),o.g.has(c)}n.forEach=function(o,c){Ht(this),this.g.forEach(function(h,f){h.forEach(function(v){o.call(c,v,f,this)},this)},this)};function uc(o,c){Ht(o);let h=[];if(typeof c=="string")cc(o,c)&&(h=h.concat(o.g.get(pn(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)h=h.concat(o[c]);return h}n.set=function(o,c){return Ht(this),this.i=null,o=pn(this,o),cc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=uc(this,o),o.length>0?String(o[0]):c):c};function lc(o,c,h){ac(o,c),h.length>0&&(o.i=null,o.g.set(pn(o,c),S(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var h=c[f];const v=Wn(h);h=uc(this,h);for(let R=0;R<h.length;R++){let N=v;h[R]!==""&&(N+="="+Wn(h[R])),o.push(N)}}return this.i=o.join("&")};function hc(o){const c=new Xn;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function pn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Of(o,c){c&&!o.j&&(Ht(o),o.i=null,o.g.forEach(function(h,f){const v=f.toLowerCase();f!=v&&(ac(this,f),lc(this,v,h))},o)),o.j=c}function Lf(o,c){const h=new Hn;if(a.Image){const f=new Image;f.onload=p(gt,h,"TestLoadImage: loaded",!0,c,f),f.onerror=p(gt,h,"TestLoadImage: error",!1,c,f),f.onabort=p(gt,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=p(gt,h,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function Mf(o,c){const h=new Hn,f=new AbortController,v=setTimeout(()=>{f.abort(),gt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(R=>{clearTimeout(v),R.ok?gt(h,"TestPingServer: ok",!0,c):gt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(v),gt(h,"TestPingServer: error",!1,c)})}function gt(o,c,h,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(h)}catch{}}function xf(){this.g=new Ef}function Mi(o){this.i=o.Sb||null,this.h=o.ab||!1}g(Mi,qa),Mi.prototype.g=function(){return new Xr(this.i,this.h)};function Xr(o,c){Ie.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(Xr,Ie),n=Xr.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,er(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Zn(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,er(this)),this.g&&(this.readyState=3,er(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;dc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function dc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Zn(this):er(this),this.readyState==3&&dc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Zn(this))},n.Na=function(o){this.g&&(this.response=o,Zn(this))},n.ga=function(){this.g&&Zn(this)};function Zn(o){o.readyState=4,o.l=null,o.j=null,o.B=null,er(o)}n.setRequestHeader=function(o,c){this.A.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function er(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Xr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function fc(o){let c="";return Hr(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function xi(o,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=fc(h),typeof o=="string"?h!=null&&Wn(h):Z(o,c,h))}function oe(o){Ie.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(oe,Ie);var Uf=/^https?$/i,Ff=["POST","PUT"];n=oe.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Ka.g(),this.g.onreadystatechange=E(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(R){pc(this,R);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)h.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())h.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),v=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Ff,c,void 0)>=0)||f||v||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,N]of h)this.g.setRequestHeader(R,N);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(R){pc(this,R)}};function pc(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,mc(o),Zr(o)}function mc(o){o.A||(o.A=!0,Re(o,"complete"),Re(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Re(this,"complete"),Re(this,"abort"),Zr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Zr(this,!0)),oe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?gc(this):this.Xa())},n.Xa=function(){gc(this)};function gc(o){if(o.h&&typeof i<"u"){if(o.v&&_t(o)==4)setTimeout(o.Ca.bind(o),0);else if(Re(o,"readystatechange"),_t(o)==4){o.h=!1;try{const R=o.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=R===0){let N=String(o.D).match(ic)[1]||null;!N&&a.self&&a.self.location&&(N=a.self.location.protocol.slice(0,-1)),f=!Uf.test(N?N.toLowerCase():"")}h=f}if(h)Re(o,"complete"),Re(o,"success");else{o.o=6;try{var v=_t(o)>2?o.g.statusText:""}catch{v=""}o.l=v+" ["+o.ca()+"]",mc(o)}}finally{Zr(o)}}}}function Zr(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,c||Re(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function _t(o){return o.g?o.g.readyState:0}n.ca=function(){try{return _t(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),yf(c)}};function _c(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Bf(o){const c={};o=(o.g&&_t(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(_(o[f]))continue;var h=Af(o[f]);const v=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=c[v]||[];c[v]=R,R.push(h)}df(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function tr(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function yc(o){this.za=0,this.i=[],this.j=new Hn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=tr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=tr("baseRetryDelayMs",5e3,o),this.Za=tr("retryDelaySeedMs",1e4,o),this.Ta=tr("forwardChannelMaxRetries",2,o),this.va=tr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new ec(o&&o.concurrentRequestLimit),this.Ba=new xf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=yc.prototype,n.ka=8,n.I=1,n.connect=function(o,c,h,f){Se(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=bc(this,null,this.W),ts(this)};function Ui(o){if(Ec(o),o.I==3){var c=o.V++,h=He(o.J);if(Z(h,"SID",o.M),Z(h,"RID",c),Z(h,"TYPE","terminate"),nr(o,h),c=new pt(o,o.j,c),c.M=2,c.A=Yr(He(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=Pc(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Jr(c)}Sc(o)}function es(o){o.g&&(Bi(o),o.g.cancel(),o.g=null)}function Ec(o){es(o),o.v&&(a.clearTimeout(o.v),o.v=null),ns(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function ts(o){if(!tc(o.h)&&!o.m){o.m=!0;var c=o.Ea;ne||m(),re||(ne(),re=!0),I.add(c,o),o.D=0}}function qf(o,c){return nc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=zn(d(o.Ea,o,c),Rc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const v=new pt(this,this.j,o);let R=this.o;if(this.U&&(R?(R=Na(R),Va(R,this.U)):R=this.U),this.u!==null||this.R||(v.J=R,R=null),this.S)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=Ic(this,v,c),h=He(this.J),Z(h,"RID",o),Z(h,"CVER",22),this.G&&Z(h,"X-HTTP-Session-Id",this.G),nr(this,h),R&&(this.R?c="headers="+Wn(fc(R))+"&"+c:this.u&&xi(h,this.u,R)),Oi(this.h,v),this.Ra&&Z(h,"TYPE","init"),this.S?(Z(h,"$req",c),Z(h,"SID","null"),v.U=!0,ki(v,h,null)):ki(v,h,c),this.I=2}}else this.I==3&&(o?Tc(this,o):this.i.length==0||tc(this.h)||Tc(this))};function Tc(o,c){var h;c?h=c.l:h=o.V++;const f=He(o.J);Z(f,"SID",o.M),Z(f,"RID",h),Z(f,"AID",o.K),nr(o,f),o.u&&o.o&&xi(f,o.u,o.o),h=new pt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),c&&(o.i=c.G.concat(o.i)),c=Ic(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Oi(o.h,h),ki(h,f,c)}function nr(o,c){o.H&&Hr(o.H,function(h,f){Z(c,f,h)}),o.l&&Hr({},function(h,f){Z(c,f,h)})}function Ic(o,c,h){h=Math.min(o.i.length,h);const f=o.l?d(o.l.Ka,o.l,o):null;e:{var v=o.i;let $=-1;for(;;){const de=["count="+h];$==-1?h>0?($=v[0].g,de.push("ofs="+$)):$=0:de.push("ofs="+$);let X=!0;for(let pe=0;pe<h;pe++){var R=v[pe].g;const We=v[pe].map;if(R-=$,R<0)$=Math.max(0,v[pe].g-100),X=!1;else try{R="req"+R+"_"||"";try{var N=We instanceof Map?We:Object.entries(We);for(const[Gt,yt]of N){let Et=yt;u(yt)&&(Et=Ri(yt)),de.push(R+Gt+"="+encodeURIComponent(Et))}}catch(Gt){throw de.push(R+"type="+encodeURIComponent("_badmap")),Gt}}catch{f&&f(We)}}if(X){N=de.join("&");break e}}N=void 0}return o=o.i.splice(0,h),c.G=o,N}function wc(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;ne||m(),re||(ne(),re=!0),I.add(c,o),o.A=0}}function Fi(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=zn(d(o.Da,o),Rc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,vc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=zn(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Se(10),es(this),vc(this))};function Bi(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function vc(o){o.g=new pt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=He(o.na);Z(c,"RID","rpc"),Z(c,"SID",o.M),Z(c,"AID",o.K),Z(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&Z(c,"TO",o.ia),Z(c,"TYPE","xmlhttp"),nr(o,c),o.u&&o.o&&xi(c,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=Yr(He(c)),h.u=null,h.R=!0,Ya(h,o)}n.Va=function(){this.C!=null&&(this.C=null,es(this),Fi(this),Se(19))};function ns(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Ac(o,c){var h=null;if(o.g==c){ns(o),Bi(o),o.g=null;var f=2}else if(Vi(o.h,c))h=c.G,rc(o.h,c),f=1;else return;if(o.I!=0){if(c.o)if(f==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var v=o.D;f=Kr(),Re(f,new Wa(f,h)),ts(o)}else wc(o);else if(v=c.m,v==3||v==0&&c.X>0||!(f==1&&qf(o,c)||f==2&&Fi(o)))switch(h&&h.length>0&&(c=o.h,c.i=c.i.concat(h)),v){case 1:Wt(o,5);break;case 4:Wt(o,10);break;case 3:Wt(o,6);break;default:Wt(o,2)}}}function Rc(o,c){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*c}function Wt(o,c){if(o.j.info("Error code "+c),c==2){var h=d(o.bb,o),f=o.Ua;const v=!f;f=new mt(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Kn(f,"https"),Yr(f),v?Lf(f.toString(),h):Mf(f.toString(),h)}else Se(2);o.I=0,o.l&&o.l.pa(c),Sc(o),Ec(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Se(2)):(this.j.info("Failed to ping google.com"),Se(1))};function Sc(o){if(o.I=0,o.ja=[],o.l){const c=sc(o.h);(c.length!=0||o.i.length!=0)&&(C(o.ja,c),C(o.ja,o.i),o.h.i.length=0,S(o.i),o.i.length=0),o.l.oa()}}function bc(o,c,h){var f=h instanceof mt?He(h):new mt(h);if(f.g!="")c&&(f.g=c+"."+f.g),Qn(f,f.u);else{var v=a.location;f=v.protocol,c=c?c+"."+v.hostname:v.hostname,v=+v.port;const R=new mt(null);f&&Kn(R,f),c&&(R.g=c),v&&Qn(R,v),h&&(R.h=h),f=R}return h=o.G,c=o.wa,h&&c&&Z(f,h,c),Z(f,"VER",o.ka),nr(o,f),f}function Pc(o,c,h){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new oe(new Mi({ab:h})):new oe(o.ma),c.Fa(o.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Cc(){}n=Cc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function rs(){}rs.prototype.g=function(o,c){return new Ve(o,c)};function Ve(o,c){Ie.call(this),this.g=new yc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!_(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!_(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new mn(this)}g(Ve,Ie),Ve.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Ve.prototype.close=function(){Ui(this.g)},Ve.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=Ri(o),o=h);c.i.push(new bf(c.Ya++,o)),c.I==3&&ts(c)},Ve.prototype.N=function(){this.g.l=null,delete this.j,Ui(this.g),delete this.g,Ve.Z.N.call(this)};function kc(o){Si.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}g(kc,Si);function Nc(){bi.call(this),this.status=1}g(Nc,bi);function mn(o){this.g=o}g(mn,Cc),mn.prototype.ra=function(){Re(this.g,"a")},mn.prototype.qa=function(o){Re(this.g,new kc(o))},mn.prototype.pa=function(o){Re(this.g,new Nc)},mn.prototype.oa=function(){Re(this.g,"b")},rs.prototype.createWebChannel=rs.prototype.g,Ve.prototype.send=Ve.prototype.o,Ve.prototype.open=Ve.prototype.m,Ve.prototype.close=Ve.prototype.close,dh=function(){return new rs},hh=function(){return Kr()},lh=$t,uo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Qr.NO_ERROR=0,Qr.TIMEOUT=8,Qr.HTTP_ERROR=6,_s=Qr,Ga.COMPLETE="complete",uh=Ga,ja.EventType=jn,jn.OPEN="a",jn.CLOSE="b",jn.ERROR="c",jn.MESSAGE="d",Ie.prototype.listen=Ie.prototype.J,ar=ja,oe.prototype.listenOnce=oe.prototype.K,oe.prototype.getLastError=oe.prototype.Ha,oe.prototype.getLastErrorCode=oe.prototype.ya,oe.prototype.getStatus=oe.prototype.ca,oe.prototype.getResponseJson=oe.prototype.La,oe.prototype.getResponseText=oe.prototype.la,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Fa,ch=oe}).apply(typeof os<"u"?os:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ve.UNAUTHENTICATED=new ve(null),ve.GOOGLE_CREDENTIALS=new ve("google-credentials-uid"),ve.FIRST_PARTY=new ve("first-party-uid"),ve.MOCK_USER=new ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ln="12.9.0";function F_(n){Ln=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nn=new Co("@firebase/firestore");function _n(){return nn.logLevel}function O(n,...e){if(nn.logLevel<=z.DEBUG){const t=e.map(jo);nn.debug(`Firestore (${Ln}): ${n}`,...t)}}function ht(n,...e){if(nn.logLevel<=z.ERROR){const t=e.map(jo);nn.error(`Firestore (${Ln}): ${n}`,...t)}}function rn(n,...e){if(nn.logLevel<=z.WARN){const t=e.map(jo);nn.warn(`Firestore (${Ln}): ${n}`,...t)}}function jo(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,fh(n,r,t)}function fh(n,e,t){let r=`FIRESTORE (${Ln}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw ht(r),new Error(r)}function K(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||fh(e,s,r)}function F(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class B_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ve.UNAUTHENTICATED))}shutdown(){}}class q_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class j_{constructor(e){this.t=e,this.currentUser=ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){K(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Ye;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ye,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},u=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ye)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(K(typeof r.accessToken=="string",31837,{l:r}),new ph(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return K(e===null||typeof e=="string",2055,{h:e}),new ve(e)}}class $_{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ve.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class z_{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new $_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class uu{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class H_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,De(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){K(this.o===void 0,3512);const r=i=>{i.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new uu(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(K(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new uu(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=W_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function H(n,e){return n<e?-1:n>e?1:0}function lo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return Qi(s)===Qi(i)?H(s,i):Qi(s)?1:-1}return H(n.length,e.length)}const G_=55296,K_=57343;function Qi(n){const e=n.charCodeAt(0);return e>=G_&&e<=K_}function Cn(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu="__name__";class Ge{constructor(e,t,r){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&M(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ge.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ge?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Ge.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return H(e.length,t.length)}static compareSegments(e,t){const r=Ge.isNumericId(e),s=Ge.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Ge.extractNumericId(e).compare(Ge.extractNumericId(t)):lo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Pt.fromString(e.substring(4,e.length-2))}}class Y extends Ge{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new Y(t)}static emptyPath(){return new Y([])}}const Q_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ye extends Ge{construct(e,t,r){return new ye(e,t,r)}static isValidIdentifier(e){return Q_.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ye.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===lu}static keyField(){return new ye([lu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new D(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new D(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(i(),s++)}if(i(),a)throw new D(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ye(t)}static emptyPath(){return new ye([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Y.fromString(e))}static fromName(e){return new L(Y.fromString(e).popFirst(5))}static empty(){return new L(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Y(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mh(n,e,t){if(!t)throw new D(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function J_(n,e,t,r){if(e===!0&&r===!0)throw new D(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function hu(n){if(!L.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function du(n){if(L.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function gh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ys(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function Fe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new D(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ys(n);throw new D(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(n,e){const t={typeString:n};return e&&(t.value=e),t}function Lr(n,e){if(!gh(n))throw new D(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new D(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fu=-62135596800,pu=1e6;class ee{static now(){return ee.fromMillis(Date.now())}static fromDate(e){return ee.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*pu);return new ee(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<fu)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/pu}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ee._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Lr(e,ee._jsonSchema))return new ee(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-fu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ee._jsonSchemaVersion="firestore/timestamp/1.0",ee._jsonSchema={type:he("string",ee._jsonSchemaVersion),seconds:he("number"),nanoseconds:he("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{static fromTimestamp(e){return new x(e)}static min(){return new x(new ee(0,0))}static max(){return new x(new ee(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=-1;function Y_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=x.fromTimestamp(r===1e9?new ee(t+1,0):new ee(t,r));return new Dt(s,L.empty(),e)}function X_(n){return new Dt(n.readTime,n.key,Ir)}class Dt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Dt(x.min(),L.empty(),Ir)}static max(){return new Dt(x.max(),L.empty(),Ir)}}function Z_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ey="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ty{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mn(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==ey)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,r)=>{t(e)})}static reject(e){return new P((t,r)=>{r(e)})}static waitFor(e){return new P((t,r)=>{let s=0,i=0,a=!1;e.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&t()},l=>r(l))}),a=!0,i===s&&t()})}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next(s=>s?P.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,i)=>{r.push(t.call(this,s,i))}),this.waitFor(r)}static mapArray(e,t){return new P((r,s)=>{const i=e.length,a=new Array(i);let u=0;for(let l=0;l<i;l++){const d=l;t(e[d]).next(p=>{a[d]=p,++u,u===i&&r(a)},p=>s(p))}})}static doWhile(e,t){return new P((r,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):r()};i()})}}function ny(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function xn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Xs.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo=-1;function Mr(n){return n==null}function Vs(n){return n===0&&1/n==-1/0}function ry(n){return typeof n=="number"&&Number.isInteger(n)&&!Vs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="";function sy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=mu(e)),e=iy(n.get(t),e);return mu(e)}function iy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case _h:t+="";break;default:t+=i}}return t}function mu(n){return n+_h+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ft(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function yh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||_e.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_e.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_e.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new as(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new as(this.root,e,this.comparator,!1)}getReverseIterator(){return new as(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new as(this.root,e,this.comparator,!0)}}class as{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class _e{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??_e.RED,this.left=s??_e.EMPTY,this.right=i??_e.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new _e(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return _e.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return _e.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_e.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}}_e.EMPTY=null,_e.RED=!0,_e.BLACK=!1;_e.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new _e(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new _u(this.data.getIterator())}getIteratorFrom(e){return new _u(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof fe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new fe(this.comparator);return t.data=e,t}}class _u{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.fields=e,e.sort(ye.comparator)}static empty(){return new Le([])}unionWith(e){let t=new fe(ye.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Le(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Cn(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Eh("Invalid base64 string: "+i):i}}(e);return new Te(t)}static fromUint8Array(e){const t=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(e);return new Te(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Te.EMPTY_BYTE_STRING=new Te("");const oy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Vt(n){if(K(!!n,39018),typeof n=="string"){let e=0;const t=oy.exec(n);if(K(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ce(n.seconds),nanos:ce(n.nanos)}}function ce(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ot(n){return typeof n=="string"?Te.fromBase64String(n):Te.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th="server_timestamp",Ih="__type__",wh="__previous_value__",vh="__local_write_time__";function Ho(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Ih])==null?void 0:r.stringValue)===Th}function Zs(n){const e=n.mapValue.fields[wh];return Ho(e)?Zs(e):e}function wr(n){const e=Vt(n.mapValue.fields[vh].timestampValue);return new ee(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay{constructor(e,t,r,s,i,a,u,l,d,p,g){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=p,this.apiKey=g}}const Os="(default)";class vr{constructor(e,t){this.projectId=e,this.database=t||Os}static empty(){return new vr("","")}get isDefaultDatabase(){return this.database===Os}isEqual(e){return e instanceof vr&&e.projectId===this.projectId&&e.database===this.database}}function cy(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new D(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vr(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah="__type__",uy="__max__",cs={mapValue:{}},Rh="__vector__",Ls="value";function Lt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ho(n)?4:hy(n)?9007199254740991:ly(n)?10:11:M(28295,{value:n})}function et(n,e){if(n===e)return!0;const t=Lt(n);if(t!==Lt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return wr(n).isEqual(wr(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Vt(s.timestampValue),u=Vt(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,i){return Ot(s.bytesValue).isEqual(Ot(i.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,i){return ce(s.geoPointValue.latitude)===ce(i.geoPointValue.latitude)&&ce(s.geoPointValue.longitude)===ce(i.geoPointValue.longitude)}(n,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return ce(s.integerValue)===ce(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ce(s.doubleValue),u=ce(i.doubleValue);return a===u?Vs(a)===Vs(u):isNaN(a)&&isNaN(u)}return!1}(n,e);case 9:return Cn(n.arrayValue.values||[],e.arrayValue.values||[],et);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(gu(a)!==gu(u))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!et(a[l],u[l])))return!1;return!0}(n,e);default:return M(52216,{left:n})}}function Ar(n,e){return(n.values||[]).find(t=>et(t,e))!==void 0}function kn(n,e){if(n===e)return 0;const t=Lt(n),r=Lt(e);if(t!==r)return H(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return function(i,a){const u=ce(i.integerValue||i.doubleValue),l=ce(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(n,e);case 3:return yu(n.timestampValue,e.timestampValue);case 4:return yu(wr(n),wr(e));case 5:return lo(n.stringValue,e.stringValue);case 6:return function(i,a){const u=Ot(i),l=Ot(a);return u.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(i,a){const u=i.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){const p=H(u[d],l[d]);if(p!==0)return p}return H(u.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(i,a){const u=H(ce(i.latitude),ce(a.latitude));return u!==0?u:H(ce(i.longitude),ce(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Eu(n.arrayValue,e.arrayValue);case 10:return function(i,a){var E,S,C,V;const u=i.fields||{},l=a.fields||{},d=(E=u[Ls])==null?void 0:E.arrayValue,p=(S=l[Ls])==null?void 0:S.arrayValue,g=H(((C=d==null?void 0:d.values)==null?void 0:C.length)||0,((V=p==null?void 0:p.values)==null?void 0:V.length)||0);return g!==0?g:Eu(d,p)}(n.mapValue,e.mapValue);case 11:return function(i,a){if(i===cs.mapValue&&a===cs.mapValue)return 0;if(i===cs.mapValue)return 1;if(a===cs.mapValue)return-1;const u=i.fields||{},l=Object.keys(u),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let g=0;g<l.length&&g<p.length;++g){const E=lo(l[g],p[g]);if(E!==0)return E;const S=kn(u[l[g]],d[p[g]]);if(S!==0)return S}return H(l.length,p.length)}(n.mapValue,e.mapValue);default:throw M(23264,{he:t})}}function yu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=Vt(n),r=Vt(e),s=H(t.seconds,r.seconds);return s!==0?s:H(t.nanos,r.nanos)}function Eu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=kn(t[s],r[s]);if(i)return i}return H(t.length,r.length)}function Nn(n){return ho(n)}function ho(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Vt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Ot(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=ho(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${ho(t.fields[a])}`;return s+"}"}(n.mapValue):M(61005,{value:n})}function ys(n){switch(Lt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Zs(n);return e?16+ys(e):16;case 5:return 2*n.stringValue.length;case 6:return Ot(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,i)=>s+ys(i),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Ft(r.fields,(i,a)=>{s+=i.length+ys(a)}),s}(n.mapValue);default:throw M(13486,{value:n})}}function Tu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function fo(n){return!!n&&"integerValue"in n}function Wo(n){return!!n&&"arrayValue"in n}function Iu(n){return!!n&&"nullValue"in n}function wu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Es(n){return!!n&&"mapValue"in n}function ly(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Ah])==null?void 0:r.stringValue)===Rh}function fr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Ft(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=fr(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=fr(n.arrayValue.values[t]);return e}return{...n}}function hy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===uy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.value=e}static empty(){return new Pe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Es(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=fr(t)}setAll(e){let t=ye.emptyPath(),r={},s=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=fr(a):s.push(u.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Es(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return et(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Es(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Ft(t,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Pe(fr(this.value))}}function Sh(n){const e=[];return Ft(n.fields,(t,r)=>{const s=new ye([t]);if(Es(r)){const i=Sh(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)}),new Le(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,t,r,s,i,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(e){return new ge(e,0,x.min(),x.min(),x.min(),Pe.empty(),0)}static newFoundDocument(e,t,r,s){return new ge(e,1,t,x.min(),r,s,0)}static newNoDocument(e,t){return new ge(e,2,t,x.min(),x.min(),Pe.empty(),0)}static newUnknownDocument(e,t){return new ge(e,3,t,x.min(),x.min(),Pe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(x.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Pe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Pe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=x.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ge&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ge(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,t){this.position=e,this.inclusive=t}}function vu(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=kn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Au(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!et(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t="asc"){this.field=e,this.dir=t}}function dy(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{}class le extends bh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new py(e,t,r):t==="array-contains"?new _y(e,r):t==="in"?new yy(e,r):t==="not-in"?new Ey(e,r):t==="array-contains-any"?new Ty(e,r):new le(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new my(e,r):new gy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(kn(t,this.value)):t!==null&&Lt(this.value)===Lt(t)&&this.matchesComparison(kn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class $e extends bh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new $e(e,t)}matches(e){return Ph(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ph(n){return n.op==="and"}function Ch(n){return fy(n)&&Ph(n)}function fy(n){for(const e of n.filters)if(e instanceof $e)return!1;return!0}function po(n){if(n instanceof le)return n.field.canonicalString()+n.op.toString()+Nn(n.value);if(Ch(n))return n.filters.map(e=>po(e)).join(",");{const e=n.filters.map(t=>po(t)).join(",");return`${n.op}(${e})`}}function kh(n,e){return n instanceof le?function(r,s){return s instanceof le&&r.op===s.op&&r.field.isEqual(s.field)&&et(r.value,s.value)}(n,e):n instanceof $e?function(r,s){return s instanceof $e&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,a,u)=>i&&kh(a,s.filters[u]),!0):!1}(n,e):void M(19439)}function Nh(n){return n instanceof le?function(t){return`${t.field.canonicalString()} ${t.op} ${Nn(t.value)}`}(n):n instanceof $e?function(t){return t.op.toString()+" {"+t.getFilters().map(Nh).join(" ,")+"}"}(n):"Filter"}class py extends le{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class my extends le{constructor(e,t){super(e,"in",t),this.keys=Dh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class gy extends le{constructor(e,t){super(e,"not-in",t),this.keys=Dh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Dh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}class _y extends le{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Wo(t)&&Ar(t.arrayValue,this.value)}}class yy extends le{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ar(this.value.arrayValue,t)}}class Ey extends le{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ar(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ar(this.value.arrayValue,t)}}class Ty extends le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Wo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Ar(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{constructor(e,t=null,r=[],s=[],i=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function Ru(n,e=null,t=[],r=[],s=null,i=null,a=null){return new Iy(n,e,t,r,s,i,a)}function Go(n){const e=F(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>po(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Mr(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Nn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Nn(r)).join(",")),e.Te=t}return e.Te}function Ko(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!dy(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!kh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Au(n.startAt,e.startAt)&&Au(n.endAt,e.endAt)}function mo(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t=null,r=[],s=[],i=null,a="F",u=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=l,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function wy(n,e,t,r,s,i,a,u){return new Un(n,e,t,r,s,i,a,u)}function Qo(n){return new Un(n)}function Su(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function vy(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Vh(n){return n.collectionGroup!==null}function pr(n){const e=F(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new fe(ye.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Rr(i,r))}),t.has(ye.keyField().canonicalString())||e.Ie.push(new Rr(ye.keyField(),r))}return e.Ie}function Xe(n){const e=F(n);return e.Ee||(e.Ee=Ay(e,pr(n))),e.Ee}function Ay(n,e){if(n.limitType==="F")return Ru(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Rr(s.field,i)});const t=n.endAt?new Ms(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ms(n.startAt.position,n.startAt.inclusive):null;return Ru(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function go(n,e){const t=n.filters.concat([e]);return new Un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Ry(n,e){const t=n.explicitOrderBy.concat([e]);return new Un(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function _o(n,e,t){return new Un(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ei(n,e){return Ko(Xe(n),Xe(e))&&n.limitType===e.limitType}function Oh(n){return`${Go(Xe(n))}|lt:${n.limitType}`}function yn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Nh(s)).join(", ")}]`),Mr(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>Nn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>Nn(s)).join(",")),`Target(${r})`}(Xe(n))}; limitType=${n.limitType})`}function ti(n,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):L.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,e)&&function(r,s){for(const i of pr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,u,l){const d=vu(a,u,l);return a.inclusive?d<=0:d<0}(r.startAt,pr(r),s)||r.endAt&&!function(a,u,l){const d=vu(a,u,l);return a.inclusive?d>=0:d>0}(r.endAt,pr(r),s))}(n,e)}function Sy(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Lh(n){return(e,t)=>{let r=!1;for(const s of pr(n)){const i=by(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function by(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):function(i,a,u){const l=a.data.field(i),d=u.data.field(i);return l!==null&&d!==null?kn(l,d):M(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ft(this.inner,(t,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return yh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Py=new se(L.comparator);function dt(){return Py}const Mh=new se(L.comparator);function cr(...n){let e=Mh;for(const t of n)e=e.insert(t.key,t);return e}function xh(n){let e=Mh;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Jt(){return mr()}function Uh(){return mr()}function mr(){return new un(n=>n.toString(),(n,e)=>n.isEqual(e))}const Cy=new se(L.comparator),ky=new fe(L.comparator);function W(...n){let e=ky;for(const t of n)e=e.add(t);return e}const Ny=new fe(H);function Dy(){return Ny}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Vs(e)?"-0":e}}function Fh(n){return{integerValue:""+n}}function Vy(n,e){return ry(e)?Fh(e):Jo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(){this._=void 0}}function Oy(n,e,t){return n instanceof Sr?function(s,i){const a={fields:{[Ih]:{stringValue:Th},[vh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ho(i)&&(i=Zs(i)),i&&(a.fields[wh]=i),{mapValue:a}}(t,e):n instanceof br?qh(n,e):n instanceof Pr?jh(n,e):function(s,i){const a=Bh(s,i),u=bu(a)+bu(s.Ae);return fo(a)&&fo(s.Ae)?Fh(u):Jo(s.serializer,u)}(n,e)}function Ly(n,e,t){return n instanceof br?qh(n,e):n instanceof Pr?jh(n,e):t}function Bh(n,e){return n instanceof xs?function(r){return fo(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Sr extends ni{}class br extends ni{constructor(e){super(),this.elements=e}}function qh(n,e){const t=$h(e);for(const r of n.elements)t.some(s=>et(s,r))||t.push(r);return{arrayValue:{values:t}}}class Pr extends ni{constructor(e){super(),this.elements=e}}function jh(n,e){let t=$h(e);for(const r of n.elements)t=t.filter(s=>!et(s,r));return{arrayValue:{values:t}}}class xs extends ni{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function bu(n){return ce(n.integerValue||n.doubleValue)}function $h(n){return Wo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e,t){this.field=e,this.transform=t}}function xy(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof br&&s instanceof br||r instanceof Pr&&s instanceof Pr?Cn(r.elements,s.elements,et):r instanceof xs&&s instanceof xs?et(r.Ae,s.Ae):r instanceof Sr&&s instanceof Sr}(n.transform,e.transform)}class Uy{constructor(e,t){this.version=e,this.transformResults=t}}class Ee{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ee}static exists(e){return new Ee(void 0,e)}static updateTime(e){return new Ee(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ts(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ri{}function zh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new si(n.key,Ee.none()):new xr(n.key,n.data,Ee.none());{const t=n.data,r=Pe.empty();let s=new fe(ye.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Bt(n.key,r,new Le(s.toArray()),Ee.none())}}function Fy(n,e,t){n instanceof xr?function(s,i,a){const u=s.value.clone(),l=Cu(s.fieldTransforms,i,a.transformResults);u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof Bt?function(s,i,a){if(!Ts(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=Cu(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(Hh(s)),l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function gr(n,e,t,r){return n instanceof xr?function(i,a,u,l){if(!Ts(i.precondition,a))return u;const d=i.value.clone(),p=ku(i.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Bt?function(i,a,u,l){if(!Ts(i.precondition,a))return u;const d=ku(i.fieldTransforms,l,a),p=a.data;return p.setAll(Hh(i)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(i,a,u){return Ts(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function By(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Bh(r.transform,s||null);i!=null&&(t===null&&(t=Pe.empty()),t.set(r.field,i))}return t||null}function Pu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Cn(r,s,(i,a)=>xy(i,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class xr extends ri{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Bt extends ri{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Hh(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Cu(n,e,t){const r=new Map;K(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,u=e.data.field(i.field);r.set(i.field,Ly(a,u,t[s]))}return r}function ku(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,Oy(i,a,e))}return r}class si extends ri{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Wh extends ri{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Fy(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=gr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=gr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Uh();return this.mutations.forEach(s=>{const i=e.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=t.has(s.key)?null:u;const l=zh(a,u);l!==null&&r.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(x.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&Cn(this.mutations,e.mutations,(t,r)=>Pu(t,r))&&Cn(this.baseMutations,e.baseMutations,(t,r)=>Pu(t,r))}}class Yo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){K(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return Cy}();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Yo(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue,G;function Gh(n){switch(n){case b.OK:return M(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function Kh(n){if(n===void 0)return ht("GRPC error has no .code"),b.UNKNOWN;switch(n){case ue.OK:return b.OK;case ue.CANCELLED:return b.CANCELLED;case ue.UNKNOWN:return b.UNKNOWN;case ue.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case ue.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case ue.INTERNAL:return b.INTERNAL;case ue.UNAVAILABLE:return b.UNAVAILABLE;case ue.UNAUTHENTICATED:return b.UNAUTHENTICATED;case ue.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case ue.NOT_FOUND:return b.NOT_FOUND;case ue.ALREADY_EXISTS:return b.ALREADY_EXISTS;case ue.PERMISSION_DENIED:return b.PERMISSION_DENIED;case ue.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case ue.ABORTED:return b.ABORTED;case ue.OUT_OF_RANGE:return b.OUT_OF_RANGE;case ue.UNIMPLEMENTED:return b.UNIMPLEMENTED;case ue.DATA_LOSS:return b.DATA_LOSS;default:return M(39323,{code:n})}}(G=ue||(ue={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hy=new Pt([4294967295,4294967295],0);function Nu(n){const e=zy().encode(n),t=new ah;return t.update(e),new Uint8Array(t.digest())}function Du(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Pt([t,r],0),new Pt([s,i],0)]}class Xo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ur(`Invalid padding: ${t}`);if(r<0)throw new ur(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ur(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ur(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Pt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Pt.fromNumber(r)));return s.compare(Hy)===1&&(s=new Pt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Nu(e),[r,s]=Du(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Xo(i,s,t);return r.forEach(u=>a.insert(u)),a}insert(e){if(this.ge===0)return;const t=Nu(e),[r,s]=Du(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.be(a)}}be(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ur extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,Ur.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ii(x.min(),s,new se(H),dt(),W())}}class Ur{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ur(r,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e,t,r,s){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Qh{constructor(e,t){this.targetId=e,this.Ce=t}}class Jh{constructor(e,t,r=Te.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Vu{constructor(){this.ve=0,this.Fe=Ou(),this.Me=Te.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=W(),t=W(),r=W();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:M(38017,{changeType:i})}}),new Ur(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=Ou()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,K(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Wy{constructor(e){this.Ge=e,this.ze=new Map,this.je=dt(),this.He=us(),this.Je=us(),this.Ze=new se(H)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:M(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(mo(i))if(r===0){const a=new L(i.path);this.et(t,a,ge.newNoDocument(a,x.min()))}else K(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const u=this.ut(e),l=u?this.ct(u,e,a):1;if(l!==0){this.it(t);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,u;try{a=Ot(r).toUint8Array()}catch(l){if(l instanceof Eh)return rn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new Xo(a,s,i)}catch(l){return rn(l instanceof ur?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.ge===0?null:u}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(i=>{const a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.et(t,i,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((i,a)=>{const u=this.ot(a);if(u){if(i.current&&mo(u.target)){const l=new L(u.target.path);this.It(l).has(a)||this.Et(a,l)||this.et(a,l,ge.newNoDocument(l,e))}i.Be&&(t.set(a,i.ke()),i.Ke())}});let r=W();this.Je.forEach((i,a)=>{let u=!0;a.forEachWhile(l=>{const d=this.ot(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(i))}),this.je.forEach((i,a)=>a.setReadTime(e));const s=new ii(e,t,this.Ze,this.je,r);return this.je=dt(),this.He=us(),this.Je=us(),this.Ze=new se(H),s}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.qe(t,1):s.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Vu,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new fe(H),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new fe(H),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Vu),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function us(){return new se(L.comparator)}function Ou(){return new se(L.comparator)}const Gy={asc:"ASCENDING",desc:"DESCENDING"},Ky={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Qy={and:"AND",or:"OR"};class Jy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function yo(n,e){return n.useProto3Json||Mr(e)?e:{value:e}}function Us(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Yh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Yy(n,e){return Us(n,e.toTimestamp())}function xe(n){return K(!!n,49232),x.fromTimestamp(function(t){const r=Vt(t);return new ee(r.seconds,r.nanos)}(n))}function Zo(n,e){return Eo(n,e).canonicalString()}function Eo(n,e){const t=function(s){return new Y(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Xh(n){const e=Y.fromString(n);return K(sd(e),10190,{key:e.toString()}),e}function Fs(n,e){return Zo(n.databaseId,e.path)}function _r(n,e){const t=Xh(e);if(t.get(1)!==n.databaseId.projectId)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(ed(t))}function Zh(n,e){return Zo(n.databaseId,e)}function Xy(n){const e=Xh(n);return e.length===4?Y.emptyPath():ed(e)}function To(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function ed(n){return K(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Lu(n,e,t){return{name:Fs(n,e),fields:t.value.mapValue.fields}}function Zy(n,e){return"found"in e?function(r,s){K(!!s.found,43571),s.found.name,s.found.updateTime;const i=_r(r,s.found.name),a=xe(s.found.updateTime),u=s.found.createTime?xe(s.found.createTime):x.min(),l=new Pe({mapValue:{fields:s.found.fields}});return ge.newFoundDocument(i,a,u,l)}(n,e):"missing"in e?function(r,s){K(!!s.missing,3894),K(!!s.readTime,22933);const i=_r(r,s.missing),a=xe(s.readTime);return ge.newNoDocument(i,a)}(n,e):M(7234,{result:e})}function eE(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(d,p){return d.useProto3Json?(K(p===void 0||typeof p=="string",58123),Te.fromBase64String(p||"")):(K(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),Te.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(d){const p=d.code===void 0?b.UNKNOWN:Kh(d.code);return new D(p,d.message||"")}(a);t=new Jh(r,s,i,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=_r(n,r.document.name),i=xe(r.document.updateTime),a=r.document.createTime?xe(r.document.createTime):x.min(),u=new Pe({mapValue:{fields:r.document.fields}}),l=ge.newFoundDocument(s,i,a,u),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Is(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=_r(n,r.document),i=r.readTime?xe(r.readTime):x.min(),a=ge.newNoDocument(s,i),u=r.removedTargetIds||[];t=new Is([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=_r(n,r.document),i=r.removedTargetIds||[];t=new Is([],i,s,null)}else{if(!("filter"in e))return M(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new $y(s,i),u=r.targetId;t=new Qh(u,a)}}return t}function td(n,e){let t;if(e instanceof xr)t={update:Lu(n,e.key,e.value)};else if(e instanceof si)t={delete:Fs(n,e.key)};else if(e instanceof Bt)t={update:Lu(n,e.key,e.data),updateMask:uE(e.fieldMask)};else{if(!(e instanceof Wh))return M(16599,{dt:e.type});t={verify:Fs(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(i,a){const u=a.transform;if(u instanceof Sr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof br)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Pr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof xs)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw M(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Yy(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)}(n,e.precondition)),t}function tE(n,e){return n&&n.length>0?(K(e!==void 0,14353),n.map(t=>function(s,i){let a=s.updateTime?xe(s.updateTime):xe(i);return a.isEqual(x.min())&&(a=xe(i)),new Uy(a,s.transformResults||[])}(t,e))):[]}function nE(n,e){return{documents:[Zh(n,e.path)]}}function rE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Zh(n,s);const i=function(d){if(d.length!==0)return rd($e.create(d,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(p=>function(E){return{field:En(E.field),direction:oE(E.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const u=yo(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:s}}function sE(n){let e=Xy(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){K(r===1,65062);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=function(g){const E=nd(g);return E instanceof $e&&Ch(E)?E.getFilters():[E]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(E=>function(C){return new Rr(Tn(C.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(E))}(t.orderBy));let u=null;t.limit&&(u=function(g){let E;return E=typeof g=="object"?g.value:g,Mr(E)?null:E}(t.limit));let l=null;t.startAt&&(l=function(g){const E=!!g.before,S=g.values||[];return new Ms(S,E)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const E=!g.before,S=g.values||[];return new Ms(S,E)}(t.endAt)),wy(e,s,a,i,u,"F",l,d)}function iE(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function nd(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Tn(t.unaryFilter.field);return le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Tn(t.unaryFilter.field);return le.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Tn(t.unaryFilter.field);return le.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Tn(t.unaryFilter.field);return le.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(t){return le.create(Tn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return $e.create(t.compositeFilter.filters.map(r=>nd(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(t.compositeFilter.op))}(n):M(30097,{filter:n})}function oE(n){return Gy[n]}function aE(n){return Ky[n]}function cE(n){return Qy[n]}function En(n){return{fieldPath:n.canonicalString()}}function Tn(n){return ye.fromServerFormat(n.fieldPath)}function rd(n){return n instanceof le?function(t){if(t.op==="=="){if(wu(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NAN"}};if(Iu(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wu(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NOT_NAN"}};if(Iu(t.value))return{unaryFilter:{field:En(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:En(t.field),op:aE(t.op),value:t.value}}}(n):n instanceof $e?function(t){const r=t.getFilters().map(s=>rd(s));return r.length===1?r[0]:{compositeFilter:{op:cE(t.op),filters:r}}}(n):M(54877,{filter:n})}function uE(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function sd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function id(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t,r,s,i=x.min(),a=x.min(),u=Te.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(e){return new Rt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Rt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE{constructor(e){this.yt=e}}function hE(n){const e=sE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?_o(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dE{constructor(){this.Sn=new fE}addToCollectionParentIndex(e,t){return this.Sn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Dt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Dt.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class fE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new fe(Y.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new fe(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},od=41943040;class ke{static withCacheSize(e){return new ke(e,ke.DEFAULT_COLLECTION_PERCENTILE,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke.DEFAULT_COLLECTION_PERCENTILE=10,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ke.DEFAULT=new ke(od,ke.DEFAULT_COLLECTION_PERCENTILE,ke.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ke.DISABLED=new ke(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Dn(0)}static ar(){return new Dn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu="LruGarbageCollector",pE=1048576;function Uu([n,e],[t,r]){const s=H(n,t);return s===0?H(e,r):s}class mE{constructor(e){this.Pr=e,this.buffer=new fe(Uu),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Uu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class gE{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){O(xu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){xn(t)?O(xu,"Ignoring IndexedDB error during garbage collection: ",t):await Mn(t)}await this.Ar(3e5)})}}class _E{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return P.resolve(Xs.ce);const r=new mE(t);return this.Vr.forEachTarget(e,s=>r.Er(s.sequenceNumber)).next(()=>this.Vr.mr(e,s=>r.Er(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Mu)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Mu):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,a,u,l,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(e,s))).next(g=>(r=g,u=Date.now(),this.removeTargets(e,r,t))).next(g=>(i=g,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),_n()<=z.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(l-u)+`ms
	Removed ${g} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g})))}}function yE(n,e){return new _E(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EE{constructor(){this.changes=new un(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ge.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&gr(r.mutation,s,Le.empty(),ee.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,W()).next(()=>r))}getLocalViewOfDocuments(e,t,r=W()){const s=Jt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(i=>{let a=cr();return i.forEach((u,l)=>{a=a.insert(u,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Jt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,W()))}populateOverlays(e,t,r){const s=[];return r.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,s){let i=dt();const a=mr(),u=function(){return mr()}();return t.forEach((l,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof Bt)?i=i.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),gr(p.mutation,d,p.mutation.getFieldMask(),ee.now())):a.set(d.key,Le.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>u.set(d,new TE(p,a.get(d)??null))),u))}recalculateAndSaveOverlays(e,t){const r=mr();let s=new se((a,u)=>a-u),i=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const u of a)u.keys().forEach(l=>{const d=t.get(l);if(d===null)return;let p=r.get(l)||Le.empty();p=u.applyToLocalView(d,p),r.set(l,p);const g=(s.get(u.batchId)||W()).add(l);s=s.insert(u.batchId,g)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),d=l.key,p=l.value,g=Uh();p.forEach(E=>{if(!i.has(E)){const S=zh(t.get(E),r.get(E));S!==null&&g.set(E,S),i=i.add(E)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,g))}return P.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return vy(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Vh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):P.resolve(Jt());let u=Ir,l=i;return a.next(d=>P.forEach(d,(p,g)=>(u<g.largestBatchId&&(u=g.largestBatchId),i.get(p)?P.resolve():this.remoteDocumentCache.getEntry(e,p).next(E=>{l=l.insert(p,E)}))).next(()=>this.populateOverlays(e,d,i)).next(()=>this.computeViews(e,l,d,W())).next(p=>({batchId:u,changes:xh(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let s=cr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=cr();return this.indexManager.getCollectionParents(e,i).next(u=>P.forEach(u,l=>{const d=function(g,E){return new Un(E,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(p=>{p.forEach((g,E)=>{a=a.insert(g,E)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s))).next(a=>{i.forEach((l,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,ge.newInvalidDocument(p)))});let u=cr();return a.forEach((l,d)=>{const p=i.get(l);p!==void 0&&gr(p.mutation,d,Le.empty(),ee.now()),ti(t,d)&&(u=u.insert(l,d))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wE{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return P.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:xe(s.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(s){return{name:s.name,query:hE(s.bundledQuery),readTime:xe(s.readTime)}}(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{constructor(){this.overlays=new se(L.comparator),this.Lr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Jt();return P.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,i)=>{this.bt(e,t,i)}),P.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Lr.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const s=Jt(),i=t.length+1,a=new L(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const l=u.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new se((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=i.get(d.largestBatchId);p===null&&(p=Jt(),i=i.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const u=Jt(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>u.set(d,p)),!(u.size()>=s)););return P.resolve(u)}bt(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new jy(t,r));let i=this.Lr.get(t);i===void 0&&(i=W(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(){this.sessionToken=Te.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(){this.kr=new fe(me.Kr),this.qr=new fe(me.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new me(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new me(e,t))}Qr(e,t){e.forEach(r=>this.removeReference(r,t))}Gr(e){const t=new L(new Y([])),r=new me(t,e),s=new me(t,e+1),i=[];return this.qr.forEachInRange([r,s],a=>{this.Wr(a),i.push(a.key)}),i}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new L(new Y([])),r=new me(t,e),s=new me(t,e+1);let i=W();return this.qr.forEachInRange([r,s],a=>{i=i.add(a.key)}),i}containsKey(e){const t=new me(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class me{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return L.comparator(e.key,t.key)||H(e.Hr,t.Hr)}static Ur(e,t){return H(e.Hr,t.Hr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new fe(me.Kr)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new qy(i,t,r,s);this.mutationQueue.push(a);for(const u of s)this.Jr=this.Jr.add(new me(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?zo:this.Yn-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new me(t,0),s=new me(t,Number.POSITIVE_INFINITY),i=[];return this.Jr.forEachInRange([r,s],a=>{const u=this.Zr(a.Hr);i.push(u)}),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new fe(H);return t.forEach(s=>{const i=new me(s,0),a=new me(s,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([i,a],u=>{r=r.add(u.Hr)})}),P.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;L.isDocumentKey(i)||(i=i.child(""));const a=new me(new L(i),0);let u=new fe(H);return this.Jr.forEachWhile(l=>{const d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(u=u.add(l.Hr)),!0)},a),P.resolve(this.Yr(u))}Yr(e){const t=[];return e.forEach(r=>{const s=this.Zr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){K(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return P.forEach(t.mutations,s=>{const i=new me(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Jr=r})}nr(e){}containsKey(e,t){const r=new me(t,0),s=this.Jr.firstAfterOrEqual(r);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(e){this.ti=e,this.docs=function(){return new se(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():ge.newInvalidDocument(t))}getEntries(e,t){let r=dt();return t.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ge.newInvalidDocument(s))}),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=dt();const a=t.path,u=new L(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:d,value:{document:p}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Z_(X_(p),r)<=0||(s.has(p.key)||ti(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,t,r,s){M(9500)}ni(e,t){return P.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new bE(this)}getSize(e){return P.resolve(this.size)}}class bE extends EE{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)}),P.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{constructor(e){this.persistence=e,this.ri=new un(t=>Go(t),Ko),this.lastRemoteSnapshotVersion=x.min(),this.highestTargetId=0,this.ii=0,this.si=new ea,this.targetCount=0,this.oi=Dn._r()}forEachTarget(e,t){return this.ri.forEach((r,s)=>t(s)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),P.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Dn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.lr(t),P.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.ri.delete(a),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),P.waitFor(i).next(()=>s)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(a=>{i.push(s.markPotentiallyOrphaned(e,a))}),P.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e,t){this._i={},this.overlays={},this.ai=new Xs(0),this.ui=!1,this.ui=!0,this.ci=new AE,this.referenceDelegate=e(this),this.li=new PE(this),this.indexManager=new dE,this.remoteDocumentCache=function(s){return new SE(s)}(r=>this.referenceDelegate.hi(r)),this.serializer=new lE(t),this.Pi=new wE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new vE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new RE(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new CE(this.ai.next());return this.referenceDelegate.Ti(),r(s).next(i=>this.referenceDelegate.Ii(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(e,t){return P.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}}class CE extends ty{constructor(e){super(),this.currentSequenceNumber=e}}class ta{constructor(e){this.persistence=e,this.Ri=new ea,this.Ai=null}static Vi(e){return new ta(e)}get di(){if(this.Ai)return this.Ai;throw M(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(s=>this.di.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.di.add(i.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.di,r=>{const s=L.fromPath(r);return this.mi(e,s).next(i=>{i||t.removeEntry(s,x.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return P.or([()=>P.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class Bs{constructor(e,t){this.persistence=e,this.fi=new un(r=>sy(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=yE(this,t)}static Vi(e,t){return new Bs(e,t)}Ti(){}Ii(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}mr(e,t){return P.forEach(this.fi,(r,s)=>this.wr(e,r,s).next(i=>i?P.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,a=>this.wr(e,a,t).next(u=>{u||(r++,i.removeEntry(a,x.min()))})).next(()=>i.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),P.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ys(e.data.value)),t}wr(e,t,r){return P.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=s}static Es(e,t){let r=W(),s=W();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new na(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return ip()?8:ny(Ae())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ps(e,t,s,r).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new kE;return this.ys(e,t,a).next(u=>{if(i.result=u,this.As)return this.ws(e,t,a,u.size)})}).next(()=>i.result)}ws(e,t,r,s){return r.documentReadCount<this.Vs?(_n()<=z.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",yn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(_n()<=z.DEBUG&&O("QueryEngine","Query:",yn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(_n()<=z.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",yn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Xe(t))):P.resolve())}gs(e,t){if(Su(t))return P.resolve(null);let r=Xe(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=_o(t,null,"F"),r=Xe(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const a=W(...i);return this.fs.getDocuments(e,a).next(u=>this.indexManager.getMinOffset(e,r).next(l=>{const d=this.bs(t,u);return this.Ss(t,d,a,l.readTime)?this.gs(e,_o(t,null,"F")):this.Ds(e,d,t,l)}))})))}ps(e,t,r,s){return Su(t)||s.isEqual(x.min())?P.resolve(null):this.fs.getDocuments(e,r).next(i=>{const a=this.bs(t,i);return this.Ss(t,a,r,s)?P.resolve(null):(_n()<=z.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),yn(t)),this.Ds(e,a,t,Y_(s,Ir)).next(u=>u))})}bs(e,t){let r=new fe(Lh(e));return t.forEach((s,i)=>{ti(e,i)&&(r=r.add(i))}),r}Ss(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return _n()<=z.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",yn(t)),this.fs.getDocumentsMatchingQuery(e,t,Dt.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next(i=>(t.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra="LocalStore",DE=3e8;class VE{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new se(H),this.Fs=new un(i=>Go(i),Ko),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new IE(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function OE(n,e,t,r){return new VE(n,e,t,r)}async function cd(n,e){const t=F(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r))).next(i=>{const a=[],u=[];let l=W();for(const d of s){a.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}for(const d of i){u.push(d.batchId);for(const p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Ns:d,removedBatchIds:a,addedBatchIds:u}))})})}function LE(n,e){const t=F(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return function(u,l,d,p){const g=d.batch,E=g.keys();let S=P.resolve();return E.forEach(C=>{S=S.next(()=>p.getEntry(l,C)).next(V=>{const k=d.docVersions.get(C);K(k!==null,48541),V.version.compareTo(k)<0&&(g.applyToRemoteDocument(V,d),V.isValidDocument()&&(V.setReadTime(d.commitVersion),p.addEntry(V)))})}),S.next(()=>u.mutationQueue.removeMutationBatch(l,g))}(t,r,e,i).next(()=>i.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let l=W();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function ud(n){const e=F(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function ME(n,e){const t=F(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const u=[];e.targetChanges.forEach((p,g)=>{const E=s.get(g);if(!E)return;u.push(t.li.removeMatchingKeys(i,p.removedDocuments,g).next(()=>t.li.addMatchingKeys(i,p.addedDocuments,g)));let S=E.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(g)!==null?S=S.withResumeToken(Te.EMPTY_BYTE_STRING,x.min()).withLastLimboFreeSnapshotVersion(x.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),s=s.insert(g,S),function(V,k,q){return V.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=DE?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0}(E,S,p)&&u.push(t.li.updateTargetData(i,S))});let l=dt(),d=W();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))}),u.push(xE(i,a,e.documentUpdates).next(p=>{l=p.Bs,d=p.Ls})),!r.isEqual(x.min())){const p=t.li.getLastRemoteSnapshotVersion(i).next(g=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r));u.push(p)}return P.waitFor(u).next(()=>a.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,l,d)).next(()=>l)}).then(i=>(t.vs=s,i))}function xE(n,e,t){let r=W(),s=W();return t.forEach(i=>r=r.add(i)),e.getEntries(n,r).next(i=>{let a=dt();return t.forEach((u,l)=>{const d=i.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),l.isNoDocument()&&l.version.isEqual(x.min())?(e.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(u,l)):O(ra,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)}),{Bs:a,Ls:s}})}function UE(n,e){const t=F(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=zo),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function FE(n,e){const t=F(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.li.getTargetData(r,e).next(i=>i?(s=i,P.resolve(s)):t.li.allocateTargetId(r).next(a=>(s=new Rt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r})}async function Io(n,e,t){const r=F(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!xn(a))throw a;O(ra,`Failed to update sequence numbers for target ${e}: ${a}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function Fu(n,e,t){const r=F(n);let s=x.min(),i=W();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,p){const g=F(l),E=g.Fs.get(p);return E!==void 0?P.resolve(g.vs.get(E)):g.li.getTargetData(d,p)}(r,a,Xe(e)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,u.targetId).next(l=>{i=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:x.min(),t?i:W())).next(u=>(BE(r,Sy(e),u),{documents:u,ks:i})))}function BE(n,e,t){let r=n.Ms.get(e)||x.min();t.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.Ms.set(e,r)}class Bu{constructor(){this.activeTargetIds=Dy()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class qE{constructor(){this.vo=new Bu,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Bu,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu="ConnectivityMonitor";class ju{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){O(qu,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){O(qu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ls=null;function wo(){return ls===null?ls=function(){return 268435456+Math.round(2147483648*Math.random())}():ls++,"0x"+ls.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ji="RestConnection",$E={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class zE{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Os?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=wo(),u=this.Qo(e,t.toUriEncodedString());O(Ji,`Sending RPC '${e}' ${a}:`,u,r);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(l,s,i);const{host:d}=new URL(u),p=Ut(d);return this.zo(e,u,l,r,p).then(g=>(O(Ji,`Received RPC '${e}' ${a}: `,g),g),g=>{throw rn(Ji,`RPC '${e}' ${a} failed with error: `,g,"url: ",u,"request:",r),g})}jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ln}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),r&&r.headers.forEach((s,i)=>e[i]=s)}Qo(e,t){const r=$E[e];let s=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we="WebChannelConnection",rr=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(s){setTimeout(()=>{throw s},0)}})};class Rn extends zE{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Rn.c_){const e=hh();rr(e,lh.STAT_EVENT,t=>{t.stat===uo.PROXY?O(we,"STAT_EVENT: detected buffering proxy"):t.stat===uo.NOPROXY&&O(we,"STAT_EVENT: detected no buffering proxy")}),Rn.c_=!0}}zo(e,t,r,s,i){const a=wo();return new Promise((u,l)=>{const d=new ch;d.setWithCredentials(!0),d.listenOnce(uh.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case _s.NO_ERROR:const g=d.getResponseJson();O(we,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),u(g);break;case _s.TIMEOUT:O(we,`RPC '${e}' ${a} timed out`),l(new D(b.DEADLINE_EXCEEDED,"Request time out"));break;case _s.HTTP_ERROR:const E=d.getStatus();if(O(we,`RPC '${e}' ${a} failed with status:`,E,"response text:",d.getResponseText()),E>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S==null?void 0:S.error;if(C&&C.status&&C.message){const V=function(q){const B=q.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(B)>=0?B:b.UNKNOWN}(C.status);l(new D(V,C.message))}else l(new D(b.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new D(b.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{O(we,`RPC '${e}' ${a} completed.`)}});const p=JSON.stringify(s);O(we,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",p,r,15)})}T_(e,t,r){const s=wo(),i=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(u.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Go(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const d=i.join("");O(we,`Creating RPC '${e}' stream ${s}: ${d}`,u);const p=a.createWebChannel(d,u);this.I_(p);let g=!1,E=!1;const S=new HE({Ho:C=>{E?O(we,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(g||(O(we,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),O(we,`RPC '${e}' stream ${s} sending:`,C),p.send(C))},Jo:()=>p.close()});return rr(p,ar.EventType.OPEN,()=>{E||(O(we,`RPC '${e}' stream ${s} transport opened.`),S.i_())}),rr(p,ar.EventType.CLOSE,()=>{E||(E=!0,O(we,`RPC '${e}' stream ${s} transport closed`),S.o_(),this.E_(p))}),rr(p,ar.EventType.ERROR,C=>{E||(E=!0,rn(we,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),S.o_(new D(b.UNAVAILABLE,"The operation could not be completed")))}),rr(p,ar.EventType.MESSAGE,C=>{var V;if(!E){const k=C.data[0];K(!!k,16349);const q=k,B=(q==null?void 0:q.error)||((V=q[0])==null?void 0:V.error);if(B){O(we,`RPC '${e}' stream ${s} received error:`,B);const j=B.status;let Q=function(I){const m=ue[I];if(m!==void 0)return Kh(m)}(j),ne=B.message;j==="NOT_FOUND"&&ne.includes("database")&&ne.includes("does not exist")&&ne.includes(this.databaseId.database)&&rn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Q===void 0&&(Q=b.INTERNAL,ne="Unknown error status: "+j+" with message "+B.message),E=!0,S.o_(new D(Q,ne)),p.close()}else O(we,`RPC '${e}' stream ${s} received:`,k),S.__(k)}}),Rn.u_(),setTimeout(()=>{S.s_()},0),S}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return dh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WE(n){return new Rn(n)}function Yi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(n){return new Jy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Rn.c_=!1;class sa{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $u="PersistentStream";class ld{constructor(e,t,r,s,i,a,u,l){this.Ci=e,this.b_=r,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new sa(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(ht(t.toString()),ht("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new D(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.H_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return O($u,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(O($u,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class GE extends ld{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=eE(this.serializer,e),r=function(i){if(!("targetChange"in i))return x.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?x.min():a.readTime?xe(a.readTime):x.min()}(e);return this.listener.J_(t,r)}Z_(e){const t={};t.database=To(this.serializer),t.addTarget=function(i,a){let u;const l=a.target;if(u=mo(l)?{documents:nE(i,l)}:{query:rE(i,l).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Yh(i,a.resumeToken);const d=yo(i,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(x.min())>0){u.readTime=Us(i,a.snapshotVersion.toTimestamp());const d=yo(i,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,e);const r=iE(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=To(this.serializer),t.removeTarget=e,this.K_(t)}}class KE extends ld{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return K(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,K(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){K(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=tE(e.writeResults,e.commitTime),r=xe(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=To(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>td(this.serializer,r))};this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{}class JE extends QE{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(e,Eo(t,r),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(b.UNKNOWN,i.toString())})}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.jo(e,Eo(t,r),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new D(b.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function YE(n,e,t,r){return new JE(n,e,t,r)}class XE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ht(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn="RemoteStore";class ZE{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo(a=>{r.enqueueAndForget(async()=>{ln(this)&&(O(sn,"Restarting streams for network reachability change."),await async function(l){const d=F(l);d.Ea.add(4),await Fr(d),d.Va.set("Unknown"),d.Ea.delete(4),await ai(d)}(this))})}),this.Va=new XE(r,s)}}async function ai(n){if(ln(n))for(const e of n.Ra)await e(!0)}async function Fr(n){for(const e of n.Ra)await e(!1)}function hd(n,e){const t=F(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),ca(t)?aa(t):Fn(t).O_()&&oa(t,e))}function ia(n,e){const t=F(n),r=Fn(t);t.Ia.delete(e),r.O_()&&dd(t,e),t.Ia.size===0&&(r.O_()?r.L_():ln(t)&&t.Va.set("Unknown"))}function oa(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(x.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Fn(n).Z_(e)}function dd(n,e){n.da.$e(e),Fn(n).X_(e)}function aa(n){n.da=new Wy({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Fn(n).start(),n.Va.ua()}function ca(n){return ln(n)&&!Fn(n).x_()&&n.Ia.size>0}function ln(n){return F(n).Ea.size===0}function fd(n){n.da=void 0}async function eT(n){n.Va.set("Online")}async function tT(n){n.Ia.forEach((e,t)=>{oa(n,e)})}async function nT(n,e){fd(n),ca(n)?(n.Va.ha(e),aa(n)):n.Va.set("Unknown")}async function rT(n,e,t){if(n.Va.set("Online"),e instanceof Jh&&e.state===2&&e.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds)s.Ia.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.da.removeTarget(u))}(n,e)}catch(r){O(sn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await qs(n,r)}else if(e instanceof Is?n.da.Xe(e):e instanceof Qh?n.da.st(e):n.da.tt(e),!t.isEqual(x.min()))try{const r=await ud(n.localStore);t.compareTo(r)>=0&&await function(i,a){const u=i.da.Tt(a);return u.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const p=i.Ia.get(d);p&&i.Ia.set(d,p.withResumeToken(l.resumeToken,a))}}),u.targetMismatches.forEach((l,d)=>{const p=i.Ia.get(l);if(!p)return;i.Ia.set(l,p.withResumeToken(Te.EMPTY_BYTE_STRING,p.snapshotVersion)),dd(i,l);const g=new Rt(p.target,l,d,p.sequenceNumber);oa(i,g)}),i.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){O(sn,"Failed to raise snapshot:",r),await qs(n,r)}}async function qs(n,e,t){if(!xn(e))throw e;n.Ea.add(1),await Fr(n),n.Va.set("Offline"),t||(t=()=>ud(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(sn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ai(n)})}function pd(n,e){return e().catch(t=>qs(n,t,e))}async function ci(n){const e=F(n),t=Mt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:zo;for(;sT(e);)try{const s=await UE(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,iT(e,s)}catch(s){await qs(e,s)}md(e)&&gd(e)}function sT(n){return ln(n)&&n.Ta.length<10}function iT(n,e){n.Ta.push(e);const t=Mt(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function md(n){return ln(n)&&!Mt(n).x_()&&n.Ta.length>0}function gd(n){Mt(n).start()}async function oT(n){Mt(n).ra()}async function aT(n){const e=Mt(n);for(const t of n.Ta)e.ea(t.mutations)}async function cT(n,e,t){const r=n.Ta.shift(),s=Yo.from(r,e,t);await pd(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await ci(n)}async function uT(n,e){e&&Mt(n).Y_&&await async function(r,s){if(function(a){return Gh(a)&&a!==b.ABORTED}(s.code)){const i=r.Ta.shift();Mt(r).B_(),await pd(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ci(r)}}(n,e),md(n)&&gd(n)}async function zu(n,e){const t=F(n);t.asyncQueue.verifyOperationInProgress(),O(sn,"RemoteStore received new credentials");const r=ln(t);t.Ea.add(3),await Fr(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ai(t)}async function lT(n,e){const t=F(n);e?(t.Ea.delete(2),await ai(t)):e||(t.Ea.add(2),await Fr(t),t.Va.set("Unknown"))}function Fn(n){return n.ma||(n.ma=function(t,r,s){const i=F(t);return i.sa(),new GE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:eT.bind(null,n),Yo:tT.bind(null,n),t_:nT.bind(null,n),J_:rT.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),ca(n)?aa(n):n.Va.set("Unknown")):(await n.ma.stop(),fd(n))})),n.ma}function Mt(n){return n.fa||(n.fa=function(t,r,s){const i=F(t);return i.sa(),new KE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:oT.bind(null,n),t_:uT.bind(null,n),ta:aT.bind(null,n),na:cT.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await ci(n)):(await n.fa.stop(),n.Ta.length>0&&(O(sn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ye,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,u=new ua(e,t,a,s,i);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function la(n,e){if(ht("AsyncQueue",`${e}: ${n}`),xn(n))return new D(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{static emptySet(e){return new Sn(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=cr(),this.sortedSet=new se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Sn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Sn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(){this.ga=new se(L.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):M(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Vn{constructor(e,t,r,s,i,a,u,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach(u=>{a.push({type:0,doc:u})}),new Vn(e,t,Sn.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ei(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(e=>e.Da())}}class dT{constructor(){this.queries=Wu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=F(t),i=s.queries;s.queries=Wu(),i.forEach((a,u)=>{for(const l of u.ba)l.onError(r)})})(this,new D(b.ABORTED,"Firestore shutting down"))}}function Wu(){return new un(n=>Oh(n),ei)}async function _d(n,e){const t=F(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.Sa()&&e.Da()&&(r=2):(i=new hT,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const u=la(a,`Initialization of query '${yn(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.ba.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&ha(t)}async function yd(n,e){const t=F(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.ba.indexOf(e);a>=0&&(i.ba.splice(a,1),i.ba.length===0?s=e.Da()?0:1:!i.Sa()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function fT(n,e){const t=F(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const u of a.ba)u.Fa(s)&&(r=!0);a.wa=s}}r&&ha(t)}function pT(n,e,t){const r=F(n),s=r.queries.get(e);if(s)for(const i of s.ba)i.onError(t);r.queries.delete(e)}function ha(n){n.Ca.forEach(e=>{e.next()})}var vo,Gu;(Gu=vo||(vo={})).Ma="default",Gu.Cache="cache";class Ed{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Vn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.Ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Vn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==vo.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(e){this.key=e}}class Id{constructor(e){this.key=e}}class mT{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=W(),this.mutatedKeys=W(),this.eu=Lh(e),this.tu=new Sn(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Hu,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,u=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,g)=>{const E=s.get(p),S=ti(this.query,g)?g:null,C=!!E&&this.mutatedKeys.has(E.key),V=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let k=!1;E&&S?E.data.isEqual(S.data)?C!==V&&(r.track({type:3,doc:S}),k=!0):this.su(E,S)||(r.track({type:2,doc:S}),k=!0,(l&&this.eu(S,l)>0||d&&this.eu(S,d)<0)&&(u=!0)):!E&&S?(r.track({type:0,doc:S}),k=!0):E&&!S&&(r.track({type:1,doc:E}),k=!0,(l||d)&&(u=!0)),k&&(S?(a=a.add(S),i=V?i.add(p):i.delete(p)):(a=a.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{tu:a,iu:r,Ss:u,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((p,g)=>function(S,C){const V=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Vt:k})}};return V(S)-V(C)}(p.type,g.type)||this.eu(p.doc,g.doc)),this.ou(r),s=s??!1;const u=t&&!s?this._u():[],l=this.Ya.size===0&&this.current&&!s?1:0,d=l!==this.Xa;return this.Xa=l,a.length!==0||d?{snapshot:new Vn(this.query,e.tu,i,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Hu,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=W(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const t=[];return e.forEach(r=>{this.Ya.has(r)||t.push(new Id(r))}),this.Ya.forEach(r=>{e.has(r)||t.push(new Td(r))}),t}cu(e){this.Za=e.ks,this.Ya=W();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Vn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const da="SyncEngine";class gT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class _T{constructor(e){this.key=e,this.hu=!1}}class yT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new un(u=>Oh(u),ei),this.Iu=new Map,this.Eu=new Set,this.Ru=new se(L.comparator),this.Au=new Map,this.Vu=new ea,this.du={},this.mu=new Map,this.fu=Dn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function ET(n,e,t=!0){const r=bd(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await wd(r,e,t,!0),s}async function TT(n,e){const t=bd(n);await wd(t,e,!0,!1)}async function wd(n,e,t,r){const s=await FE(n.localStore,Xe(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let u;return r&&(u=await IT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&hd(n.remoteStore,s),u}async function IT(n,e,t,r,s){n.pu=(g,E,S)=>async function(V,k,q,B){let j=k.view.ru(q);j.Ss&&(j=await Fu(V.localStore,k.query,!1).then(({documents:I})=>k.view.ru(I,j)));const Q=B&&B.targetChanges.get(k.targetId),ne=B&&B.targetMismatches.get(k.targetId)!=null,re=k.view.applyChanges(j,V.isPrimaryClient,Q,ne);return Qu(V,k.targetId,re.au),re.snapshot}(n,g,E,S);const i=await Fu(n.localStore,e,!0),a=new mT(e,i.ks),u=a.ru(i.documents),l=Ur.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(u,n.isPrimaryClient,l);Qu(n,t,d.au);const p=new gT(e,t,a);return n.Tu.set(e,p),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function wT(n,e,t){const r=F(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(a=>!ei(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Io(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ia(r.remoteStore,s.targetId),Ao(r,s.targetId)}).catch(Mn)):(Ao(r,s.targetId),await Io(r.localStore,s.targetId,!0))}async function vT(n,e){const t=F(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ia(t.remoteStore,r.targetId))}async function AT(n,e,t){const r=NT(n);try{const s=await function(a,u){const l=F(a),d=ee.now(),p=u.reduce((S,C)=>S.add(C.key),W());let g,E;return l.persistence.runTransaction("Locally write mutations","readwrite",S=>{let C=dt(),V=W();return l.xs.getEntries(S,p).next(k=>{C=k,C.forEach((q,B)=>{B.isValidDocument()||(V=V.add(q))})}).next(()=>l.localDocuments.getOverlayedDocuments(S,C)).next(k=>{g=k;const q=[];for(const B of u){const j=By(B,g.get(B.key).overlayedDocument);j!=null&&q.push(new Bt(B.key,j,Sh(j.value.mapValue),Ee.exists(!0)))}return l.mutationQueue.addMutationBatch(S,d,q,u)}).next(k=>{E=k;const q=k.applyToLocalDocumentSet(g,V);return l.documentOverlayCache.saveOverlays(S,k.batchId,q)})}).then(()=>({batchId:E.batchId,changes:xh(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,u,l){let d=a.du[a.currentUser.toKey()];d||(d=new se(H)),d=d.insert(u,l),a.du[a.currentUser.toKey()]=d}(r,s.batchId,t),await Br(r,s.changes),await ci(r.remoteStore)}catch(s){const i=la(s,"Failed to persist write");t.reject(i)}}async function vd(n,e){const t=F(n);try{const r=await ME(t.localStore,e);e.targetChanges.forEach((s,i)=>{const a=t.Au.get(i);a&&(K(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?K(a.hu,14607):s.removedDocuments.size>0&&(K(a.hu,42227),a.hu=!1))}),await Br(t,r,e)}catch(r){await Mn(r)}}function Ku(n,e,t){const r=F(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((i,a)=>{const u=a.view.va(e);u.snapshot&&s.push(u.snapshot)}),function(a,u){const l=F(a);l.onlineState=u;let d=!1;l.queries.forEach((p,g)=>{for(const E of g.ba)E.va(u)&&(d=!0)}),d&&ha(l)}(r.eventManager,e),s.length&&r.Pu.J_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function RT(n,e,t){const r=F(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new se(L.comparator);a=a.insert(i,ge.newNoDocument(i,x.min()));const u=W().add(i),l=new ii(x.min(),new Map,new se(H),a,u);await vd(r,l),r.Ru=r.Ru.remove(i),r.Au.delete(e),fa(r)}else await Io(r.localStore,e,!1).then(()=>Ao(r,e,t)).catch(Mn)}async function ST(n,e){const t=F(n),r=e.batch.batchId;try{const s=await LE(t.localStore,e);Rd(t,r,null),Ad(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Br(t,s)}catch(s){await Mn(s)}}async function bT(n,e,t){const r=F(n);try{const s=await function(a,u){const l=F(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,u).next(g=>(K(g!==null,37113),p=g.keys(),l.mutationQueue.removeMutationBatch(d,g))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);Rd(r,e,t),Ad(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Br(r,s)}catch(s){await Mn(s)}}function Ad(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Rd(n,e,t){const r=F(n);let s=r.du[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.du[r.currentUser.toKey()]=s}}function Ao(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(r=>{n.Vu.containsKey(r)||Sd(n,r)})}function Sd(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(ia(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),fa(n))}function Qu(n,e,t){for(const r of t)r instanceof Td?(n.Vu.addReference(r.key,e),PT(n,r)):r instanceof Id?(O(da,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||Sd(n,r.key)):M(19791,{wu:r})}function PT(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(r)||(O(da,"New document in limbo: "+t),n.Eu.add(r),fa(n))}function fa(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new L(Y.fromString(e)),r=n.fu.next();n.Au.set(r,new _T(t)),n.Ru=n.Ru.insert(t,r),hd(n.remoteStore,new Rt(Xe(Qo(t.path)),r,"TargetPurposeLimboResolution",Xs.ce))}}async function Br(n,e,t){const r=F(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((u,l)=>{a.push(r.pu(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const g=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(d){s.push(d);const g=na.Es(l.targetId,d);i.push(g)}}))}),await Promise.all(a),r.Pu.J_(s),await async function(l,d){const p=F(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>P.forEach(d,E=>P.forEach(E.Ts,S=>p.persistence.referenceDelegate.addReference(g,E.targetId,S)).next(()=>P.forEach(E.Is,S=>p.persistence.referenceDelegate.removeReference(g,E.targetId,S)))))}catch(g){if(!xn(g))throw g;O(ra,"Failed to update sequence numbers: "+g)}for(const g of d){const E=g.targetId;if(!g.fromCache){const S=p.vs.get(E),C=S.snapshotVersion,V=S.withLastLimboFreeSnapshotVersion(C);p.vs=p.vs.insert(E,V)}}}(r.localStore,i))}async function CT(n,e){const t=F(n);if(!t.currentUser.isEqual(e)){O(da,"User change. New user:",e.toKey());const r=await cd(t.localStore,e);t.currentUser=e,function(i,a){i.mu.forEach(u=>{u.forEach(l=>{l.reject(new D(b.CANCELLED,a))})}),i.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Br(t,r.Ns)}}function kT(n,e){const t=F(n),r=t.Au.get(e);if(r&&r.hu)return W().add(r.key);{let s=W();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const u=t.Tu.get(a);s=s.unionWith(u.view.nu)}return s}}function bd(n){const e=F(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=vd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=kT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=RT.bind(null,e),e.Pu.J_=fT.bind(null,e.eventManager),e.Pu.yu=pT.bind(null,e.eventManager),e}function NT(n){const e=F(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ST.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=bT.bind(null,e),e}class js{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=oi(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return OE(this.persistence,new NE,e.initialUser,this.serializer)}Cu(e){return new ad(ta.Vi,this.serializer)}Du(e){return new qE}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}js.provider={build:()=>new js};class DT extends js{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){K(this.persistence.referenceDelegate instanceof Bs,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new gE(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?ke.withCacheSize(this.cacheSizeBytes):ke.DEFAULT;return new ad(r=>Bs.Vi(r,t),this.serializer)}}class Ro{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ku(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=CT.bind(null,this.syncEngine),await lT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new dT}()}createDatastore(e){const t=oi(e.databaseInfo.databaseId),r=WE(e.databaseInfo);return YE(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,i,a,u){return new ZE(r,s,i,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Ku(this.syncEngine,t,0),function(){return ju.v()?new ju:new jE}())}createSyncEngine(e,t){return function(s,i,a,u,l,d,p){const g=new yT(s,i,a,u,l,d);return p&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=F(s);O(sn,"RemoteStore shutting down."),i.Ea.add(5),await Fr(i),i.Aa.shutdown(),i.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Ro.provider={build:()=>new Ro};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ht("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let VT=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(b.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const a=F(s),u={documents:i.map(g=>Fs(a.serializer,g))},l=await a.jo("BatchGetDocuments",a.serializer.databaseId,Y.emptyPath(),u,i.length),d=new Map;l.forEach(g=>{const E=Zy(a.serializer,g);d.set(E.key.toString(),E)});const p=[];return i.forEach(g=>{const E=d.get(g.toString());K(!!E,55234,{key:g}),p.push(E)}),p}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new si(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const s=L.fromPath(r);this.mutations.push(new Wh(s,this.precondition(s)))}),await async function(r,s){const i=F(r),a={writes:s.map(u=>td(i.serializer,u))};await i.Wo("Commit",i.serializer.databaseId,Y.emptyPath(),a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw M(50498,{Gu:e.constructor.name});t=x.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new D(b.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(x.min())?Ee.exists(!1):Ee.updateTime(t):Ee.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(x.min()))throw new D(b.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Ee.updateTime(t)}return Ee.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OT{constructor(e,t,r,s,i){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=s,this.deferred=i,this.zu=r.maxAttempts,this.M_=new sa(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Hu()}Hu(){this.M_.p_(async()=>{const e=new VT(this.datastore),t=this.Ju(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.Zu(s)}))}).catch(r=>{this.Zu(r)})})}Ju(e){try{const t=this.updateFunction(e);return!Mr(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Zu(e){this.zu>0&&this.Xu(e)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Hu(),Promise.resolve()))):this.deferred.reject(e)}Xu(e){if((e==null?void 0:e.name)==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Gh(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="FirestoreClient";class LT{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=ve.UNAUTHENTICATED,this.clientId=$o.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async a=>{O(xt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O(xt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ye;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=la(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Xi(n,e){n.asyncQueue.verifyOperationInProgress(),O(xt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await cd(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Ju(n,e){n.asyncQueue.verifyOperationInProgress();const t=await MT(n);O(xt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>zu(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>zu(e.remoteStore,s)),n._onlineComponents=e}async function MT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(xt,"Using user provided OfflineComponentProvider");try{await Xi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;rn("Error using user provided cache. Falling back to memory cache: "+t),await Xi(n,new js)}}else O(xt,"Using default OfflineComponentProvider"),await Xi(n,new DT(void 0));return n._offlineComponents}async function pa(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(xt,"Using user provided OnlineComponentProvider"),await Ju(n,n._uninitializedComponentsProvider._online)):(O(xt,"Using default OnlineComponentProvider"),await Ju(n,new Ro))),n._onlineComponents}function xT(n){return pa(n).then(e=>e.syncEngine)}function UT(n){return pa(n).then(e=>e.datastore)}async function Cd(n){const e=await pa(n),t=e.eventManager;return t.onListen=ET.bind(null,e.syncEngine),t.onUnlisten=wT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=TT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=vT.bind(null,e.syncEngine),t}function FT(n,e,t={}){const r=new Ye;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,u,l,d){const p=new Pd({next:E=>{p.Nu(),a.enqueueAndForget(()=>yd(i,g));const S=E.docs.has(u);!S&&E.fromCache?d.reject(new D(b.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&E.fromCache&&l&&l.source==="server"?d.reject(new D(b.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(E)},error:E=>d.reject(E)}),g=new Ed(Qo(u.path),p,{includeMetadataChanges:!0,Ka:!0});return _d(i,g)}(await Cd(n),n.asyncQueue,e,t,r)),r.promise}function BT(n,e,t={}){const r=new Ye;return n.asyncQueue.enqueueAndForget(async()=>function(i,a,u,l,d){const p=new Pd({next:E=>{p.Nu(),a.enqueueAndForget(()=>yd(i,g)),E.fromCache&&l.source==="server"?d.reject(new D(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(E)},error:E=>d.reject(E)}),g=new Ed(u,p,{includeMetadataChanges:!0,Ka:!0});return _d(i,g)}(await Cd(n),n.asyncQueue,e,t,r)),r.promise}function qT(n,e){const t=new Ye;return n.asyncQueue.enqueueAndForget(async()=>AT(await xT(n),e,t)),t.promise}function jT(n,e,t){const r=new Ye;return n.asyncQueue.enqueueAndForget(async()=>{const s=await UT(n);new OT(n.asyncQueue,s,t,e,r).ju()}),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $T="ComponentProvider",Yu=new Map;function zT(n,e,t,r,s){return new ay(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,kd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd="firestore.googleapis.com",Xu=!0;class Zu{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new D(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Nd,this.ssl=Xu}else this.host=e.host,this.ssl=e.ssl??Xu;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=od;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<pE)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}J_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=kd(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ui{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new B_;switch(r.type){case"firstParty":return new z_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Yu.get(t);r&&(O($T,"Removing Datastore"),Yu.delete(t),r.terminate())}(this),Promise.resolve()}}function HT(n,e,t,r={}){var d;n=Fe(n,ui);const s=Ut(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&(bo(`https://${u}`),Po("Firestore",!0)),i.host!==Nd&&i.host!==u&&rn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...i,host:u,ssl:s,emulatorOptions:r};if(!Xt(l,a)&&(n._setSettings(l),r.mockUserToken)){let p,g;if(typeof r.mockUserToken=="string")p=r.mockUserToken,g=ve.MOCK_USER;else{p=Tl(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new D(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new ve(E)}n._authCredentials=new q_(new ph(p,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new hn(this.firestore,e,this._query)}}class ae{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ct(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ae(this.firestore,e,this._key)}toJSON(){return{type:ae._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Lr(t,ae._jsonSchema))return new ae(e,r||null,new L(Y.fromString(t.referencePath)))}}ae._jsonSchemaVersion="firestore/documentReference/1.0",ae._jsonSchema={type:he("string",ae._jsonSchemaVersion),referencePath:he("string")};class Ct extends hn{constructor(e,t,r){super(e,t,Qo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ae(this.firestore,null,new L(e))}withConverter(e){return new Ct(this.firestore,e,this._path)}}function Ow(n,e,...t){if(n=J(n),mh("collection","path",e),n instanceof ui){const r=Y.fromString(e,...t);return du(r),new Ct(n,null,r)}{if(!(n instanceof ae||n instanceof Ct))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return du(r),new Ct(n.firestore,null,r)}}function WT(n,e,...t){if(n=J(n),arguments.length===1&&(e=$o.newId()),mh("doc","path",e),n instanceof ui){const r=Y.fromString(e,...t);return hu(r),new ae(n,null,new L(r))}{if(!(n instanceof ae||n instanceof Ct))throw new D(b.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return hu(r),new ae(n.firestore,n instanceof Ct?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el="AsyncQueue";class tl{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new sa(this,"async_queue_retry"),this._c=()=>{const r=Yi();r&&O(el,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Yi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Yi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Ye;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!xn(e))throw e;O(el,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,ht("INTERNAL UNHANDLED ERROR: ",nl(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=ua.createAndSchedule(this,e,t,r,i=>this.hc(i));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:nl(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function nl(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class qt extends ui{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new tl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new tl(e),this._firestoreClient=void 0,await e}}}function GT(n,e){const t=typeof n=="object"?n:No(),r=typeof n=="string"?n:Os,s=Gs(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=_l("firestore");i&&HT(s,...i)}return s}function li(n){if(n._terminated)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||KT(n),n._firestoreClient}function KT(n){var r,s,i,a;const e=n._freezeSettings(),t=zT(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new LT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(l){const d=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(d),_online:d}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Oe(Te.fromBase64String(e))}catch(t){throw new D(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Oe(Te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Oe._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Lr(e,Oe._jsonSchema))return Oe.fromBase64String(e.bytes)}}Oe._jsonSchemaVersion="firestore/bytes/1.0",Oe._jsonSchema={type:he("string",Oe._jsonSchemaVersion),bytes:he("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ye(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ze._jsonSchemaVersion}}static fromJSON(e){if(Lr(e,Ze._jsonSchema))return new Ze(e.latitude,e.longitude)}}Ze._jsonSchemaVersion="firestore/geoPoint/1.0",Ze._jsonSchema={type:he("string",Ze._jsonSchemaVersion),latitude:he("number"),longitude:he("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:je._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Lr(e,je._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new je(e.vectorValues);throw new D(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}je._jsonSchemaVersion="firestore/vectorValue/1.0",je._jsonSchema={type:he("string",je._jsonSchemaVersion),vectorValues:he("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT=/^__.*__$/;class JT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Bt(e,this.data,this.fieldMask,t,this.fieldTransforms):new xr(e,this.data,t,this.fieldTransforms)}}class Dd{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Bt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Vd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{dataSource:n})}}class ma{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new ma({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return $s(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Vd(this.dataSource)&&QT.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class YT{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||oi(e)}createContext(e,t,r,s=!1){return new ma({dataSource:e,methodName:t,targetDoc:r,path:ye.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function qr(n){const e=n._freezeSettings(),t=oi(n._databaseId);return new YT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function ga(n,e,t,r,s,i={}){const a=n.createContext(i.merge||i.mergeFields?2:0,e,t,s);ya("Data must be an object, but it was:",a,r);const u=Md(r,a);let l,d;if(i.merge)l=new Le(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const g of i.mergeFields){const E=on(e,g,t);if(!a.contains(E))throw new D(b.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);Fd(p,E)||p.push(E)}l=new Le(p),d=a.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,d=a.fieldTransforms;return new JT(new Pe(u),l,d)}class fi extends di{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof fi}}class _a extends di{_toFieldTransform(e){return new My(e.path,new Sr)}isEqual(e){return e instanceof _a}}function Od(n,e,t,r){const s=n.createContext(1,e,t);ya("Data must be an object, but it was:",s,r);const i=[],a=Pe.empty();Ft(r,(l,d)=>{const p=Ud(e,l,t);d=J(d);const g=s.childContextForFieldPath(p);if(d instanceof fi)i.push(p);else{const E=jr(d,g);E!=null&&(i.push(p),a.set(p,E))}});const u=new Le(i);return new Dd(a,u,s.fieldTransforms)}function Ld(n,e,t,r,s,i){const a=n.createContext(1,e,t),u=[on(e,r,t)],l=[s];if(i.length%2!=0)throw new D(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<i.length;E+=2)u.push(on(e,i[E])),l.push(i[E+1]);const d=[],p=Pe.empty();for(let E=u.length-1;E>=0;--E)if(!Fd(d,u[E])){const S=u[E];let C=l[E];C=J(C);const V=a.childContextForFieldPath(S);if(C instanceof fi)d.push(S);else{const k=jr(C,V);k!=null&&(d.push(S),p.set(S,k))}}const g=new Le(d);return new Dd(p,g,a.fieldTransforms)}function XT(n,e,t,r=!1){return jr(t,n.createContext(r?4:3,e))}function jr(n,e){if(xd(n=J(n)))return ya("Unsupported field value:",e,n),Md(n,e);if(n instanceof di)return function(r,s){if(!Vd(s.dataSource))throw s.createError(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.createError(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(r,s){const i=[];let a=0;for(const u of r){let l=jr(u,s.childContextForArray(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(n,e)}return function(r,s){if((r=J(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Vy(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=ee.fromDate(r);return{timestampValue:Us(s.serializer,i)}}if(r instanceof ee){const i=new ee(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Us(s.serializer,i)}}if(r instanceof Ze)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Oe)return{bytesValue:Yh(s.serializer,r._byteString)};if(r instanceof ae){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.createError(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Zo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof je)return function(a,u){const l=a instanceof je?a.toArray():a;return{mapValue:{fields:{[Ah]:{stringValue:Rh},[Ls]:{arrayValue:{values:l.map(p=>{if(typeof p!="number")throw u.createError("VectorValues must only contain numeric values.");return Jo(u.serializer,p)})}}}}}}(r,s);if(id(r))return r._toProto(s.serializer);throw s.createError(`Unsupported field value: ${Ys(r)}`)}(n,e)}function Md(n,e){const t={};return yh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ft(n,(r,s)=>{const i=jr(s,e.childContextForField(r));i!=null&&(t[r]=i)}),{mapValue:{fields:t}}}function xd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ee||n instanceof Ze||n instanceof Oe||n instanceof ae||n instanceof di||n instanceof je||id(n))}function ya(n,e,t){if(!xd(t)||!gh(t)){const r=Ys(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function on(n,e,t){if((e=J(e))instanceof hi)return e._internalPath;if(typeof e=="string")return Ud(n,e);throw $s("Field path arguments must be of type string or ",n,!1,void 0,t)}const ZT=new RegExp("[~\\*/\\[\\]]");function Ud(n,e,t){if(e.search(ZT)>=0)throw $s(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new hi(...e.split("."))._internalPath}catch{throw $s(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function $s(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${r}`),a&&(l+=` in document ${s}`),l+=")"),new D(b.INVALID_ARGUMENT,u+n+l)}function Fd(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bd{convertValue(e,t="none"){switch(Lt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ot(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Ft(e,(s,i)=>{r[s]=this.convertValue(i,t)}),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Ls].arrayValue)==null?void 0:s.values)==null?void 0:i.map(a=>ce(a.doubleValue));return new je(t)}convertGeoPoint(e){return new Ze(ce(e.latitude),ce(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Zs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(wr(e));default:return null}}convertTimestamp(e){const t=Vt(e);return new ee(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Y.fromString(e);K(sd(r),9688,{name:e});const s=new vr(r.get(1),r.get(3)),i=new L(r.popFirst(5));return s.isEqual(t)||ht(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea extends Bd{constructor(e){super(),this.firestore=e}convertBytes(e){return new Oe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}function Lw(){return new _a("serverTimestamp")}const rl="@firebase/firestore",sl="4.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ae(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new eI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(on("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class eI extends zs{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ta{}class qd extends Ta{}function Mw(n,e,...t){let r=[];e instanceof Ta&&r.push(e),r=r.concat(t),function(i){const a=i.filter(l=>l instanceof Ia).length,u=i.filter(l=>l instanceof pi).length;if(a>1||a>0&&u>0)throw new D(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class pi extends qd{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new pi(e,t,r)}_apply(e){const t=this._parse(e);return jd(e._query,t),new hn(e.firestore,e.converter,go(e._query,t))}_parse(e){const t=qr(e.firestore);return function(i,a,u,l,d,p,g){let E;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new D(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){ol(g,p);const C=[];for(const V of g)C.push(il(l,i,V));E={arrayValue:{values:C}}}else E=il(l,i,g)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||ol(g,p),E=XT(u,a,g,p==="in"||p==="not-in");return le.create(d,p,E)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function xw(n,e,t){const r=e,s=on("where",n);return pi._create(s,r,t)}class Ia extends Ta{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ia(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:$e.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let a=s;const u=i.getFlattenedFilters();for(const l of u)jd(a,l),a=go(a,l)}(e._query,t),new hn(e.firestore,e.converter,go(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class wa extends qd{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new wa(e,t)}_apply(e){const t=function(s,i,a){if(s.startAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Rr(i,a)}(e._query,this._field,this._direction);return new hn(e.firestore,e.converter,Ry(e._query,t))}}function Uw(n,e="asc"){const t=e,r=on("orderBy",n);return wa._create(r,t)}function il(n,e,t){if(typeof(t=J(t))=="string"){if(t==="")throw new D(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Vh(e)&&t.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Y.fromString(t));if(!L.isDocumentKey(r))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Tu(n,new L(r))}if(t instanceof ae)return Tu(n,t._key);throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ys(t)}.`)}function ol(n,e){if(!Array.isArray(n)||n.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function jd(n,e){const t=function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function va(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class nI extends Bd{constructor(e){super(),this.firestore=e}convertBytes(e){return new Oe(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ae(this.firestore,null,t)}}class In{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class kt extends zs{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ws(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(on("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=kt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}kt._jsonSchemaVersion="firestore/documentSnapshot/1.0",kt._jsonSchema={type:he("string",kt._jsonSchemaVersion),bundleSource:he("string","DocumentSnapshot"),bundleName:he("string"),bundle:he("string")};class ws extends kt{data(e={}){return super.data(e)}}class bn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new In(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new ws(this._firestore,this._userDataWriter,r.key,r,new In(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const l=new ws(s._firestore,s._userDataWriter,u.doc.key,u.doc,new In(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const l=new ws(s._firestore,s._userDataWriter,u.doc.key,u.doc,new In(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,p=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:rI(u.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=bn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=$o.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function rI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */bn._jsonSchemaVersion="firestore/querySnapshot/1.0",bn._jsonSchema={type:he("string",bn._jsonSchemaVersion),bundleSource:he("string","QuerySnapshot"),bundleName:he("string"),bundle:he("string")};const sI={maxAttempts:5};function lr(n,e){if((n=J(n)).firestore!==e)throw new D(b.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=qr(e)}get(e){const t=lr(e,this._firestore),r=new nI(this._firestore);return this._transaction.lookup([t._key]).then(s=>{if(!s||s.length!==1)return M(24041);const i=s[0];if(i.isFoundDocument())return new zs(this._firestore,r,i.key,i,t.converter);if(i.isNoDocument())return new zs(this._firestore,r,t._key,null,t.converter);throw M(18433,{doc:i})})}set(e,t,r){const s=lr(e,this._firestore),i=va(s.converter,t,r),a=ga(this._dataReader,"Transaction.set",s._key,i,s.converter!==null,r);return this._transaction.set(s._key,a),this}update(e,t,r,...s){const i=lr(e,this._firestore);let a;return a=typeof(t=J(t))=="string"||t instanceof hi?Ld(this._dataReader,"Transaction.update",i._key,t,r,s):Od(this._dataReader,"Transaction.update",i._key,t),this._transaction.update(i._key,a),this}delete(e){const t=lr(e,this._firestore);return this._transaction.delete(t._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI extends iI{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=lr(e,this._firestore),r=new Ea(this._firestore);return super.get(e).then(s=>new kt(this._firestore,r,t._key,s._document,new In(!1,!1),t.converter))}}function Fw(n,e,t){n=Fe(n,qt);const r={...sI,...t};(function(a){if(a.maxAttempts<1)throw new D(b.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const s=li(n);return jT(s,i=>e(new oI(n,i)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bw(n){n=Fe(n,ae);const e=Fe(n.firestore,qt),t=li(e);return FT(t,n._key).then(r=>aI(e,n,r))}function qw(n){n=Fe(n,hn);const e=Fe(n.firestore,qt),t=li(e),r=new Ea(e);return tI(n._query),BT(t,n._query).then(s=>new bn(e,r,n,s))}function jw(n,e,t){n=Fe(n,ae);const r=Fe(n.firestore,qt),s=va(n.converter,e,t),i=qr(r);return mi(r,[ga(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Ee.none())])}function $w(n,e,t,...r){n=Fe(n,ae);const s=Fe(n.firestore,qt),i=qr(s);let a;return a=typeof(e=J(e))=="string"||e instanceof hi?Ld(i,"updateDoc",n._key,e,t,r):Od(i,"updateDoc",n._key,e),mi(s,[a.toMutation(n._key,Ee.exists(!0))])}function zw(n){return mi(Fe(n.firestore,qt),[new si(n._key,Ee.none())])}function Hw(n,e){const t=Fe(n.firestore,qt),r=WT(n),s=va(n.converter,e),i=qr(n.firestore);return mi(t,[ga(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ee.exists(!1))]).then(()=>r)}function mi(n,e){const t=li(n);return qT(t,e)}function aI(n,e,t){const r=t.docs.get(e._key),s=new Ea(n);return new kt(n,s,e._key,r,new In(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){F_(cn),Zt(new Nt("firestore",(r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),u=new qt(new j_(r.getProvider("auth-internal")),new H_(a,r.getProvider("app-check-internal")),cy(a,s),a);return i={useFetchStreams:t,...i},u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),Qe(rl,sl,e),Qe(rl,sl,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d="firebasestorage.googleapis.com",zd="storageBucket",cI=2*60*1e3,uI=10*60*1e3,lI=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie extends tt{constructor(e,t,r=0){super(Zi(e),`Firebase Storage: ${t} (${Zi(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ie.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Zi(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var te;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(te||(te={}));function Zi(n){return"storage/"+n}function Aa(){const n="An unknown error occurred, please check the error payload for server response.";return new ie(te.UNKNOWN,n)}function hI(n){return new ie(te.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function dI(n){return new ie(te.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function fI(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ie(te.UNAUTHENTICATED,n)}function pI(){return new ie(te.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function mI(n){return new ie(te.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Hd(){return new ie(te.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Wd(){return new ie(te.CANCELED,"User canceled the upload/download.")}function gI(n){return new ie(te.INVALID_URL,"Invalid URL '"+n+"'.")}function _I(n){return new ie(te.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function yI(){return new ie(te.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+zd+"' property when initializing the app?")}function Gd(){return new ie(te.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function EI(){return new ie(te.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function TI(){return new ie(te.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function II(n){return new ie(te.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function So(n){return new ie(te.INVALID_ARGUMENT,n)}function Kd(){return new ie(te.APP_DELETED,"The Firebase app was deleted.")}function wI(n){return new ie(te.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function yr(n,e){return new ie(te.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function sr(n){throw new ie(te.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Me.makeFromUrl(e,t)}catch{return new Me(e,"")}if(r.path==="")return r;throw _I(e)}static makeFromUrl(e,t){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(Q){Q.path.charAt(Q.path.length-1)==="/"&&(Q.path_=Q.path_.slice(0,-1))}const a="(/(.*))?$",u=new RegExp("^gs://"+s+a,"i"),l={bucket:1,path:3};function d(Q){Q.path_=decodeURIComponent(Q.path)}const p="v[A-Za-z0-9_]+",g=t.replace(/[.]/g,"\\."),E="(/([^?#]*).*)?$",S=new RegExp(`^https?://${g}/${p}/b/${s}/o${E}`,"i"),C={bucket:1,path:3},V=t===$d?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",q=new RegExp(`^https?://${V}/${s}/${k}`,"i"),j=[{regex:u,indices:l,postModify:i},{regex:S,indices:C,postModify:d},{regex:q,indices:{bucket:1,path:2},postModify:d}];for(let Q=0;Q<j.length;Q++){const ne=j[Q],re=ne.regex.exec(e);if(re){const I=re[ne.indices.bucket];let m=re[ne.indices.path];m||(m=""),r=new Me(I,m),ne.postModify(r);break}}if(r==null)throw gI(e);return r}}class vI{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AI(n,e,t){let r=1,s=null,i=null,a=!1,u=0;function l(){return u===2}let d=!1;function p(...k){d||(d=!0,e.apply(null,k))}function g(k){s=setTimeout(()=>{s=null,n(S,l())},k)}function E(){i&&clearTimeout(i)}function S(k,...q){if(d){E();return}if(k){E(),p.call(null,k,...q);return}if(l()||a){E(),p.call(null,k,...q);return}r<64&&(r*=2);let j;u===1?(u=2,j=0):j=(r+Math.random())*1e3,g(j)}let C=!1;function V(k){C||(C=!0,E(),!d&&(s!==null?(k||(u=2),clearTimeout(s),g(0)):k||(u=1)))}return g(0),i=setTimeout(()=>{a=!0,V(!0)},t),V}function RI(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SI(n){return n!==void 0}function bI(n){return typeof n=="function"}function PI(n){return typeof n=="object"&&!Array.isArray(n)}function gi(n){return typeof n=="string"||n instanceof String}function al(n){return Ra()&&n instanceof Blob}function Ra(){return typeof Blob<"u"}function cl(n,e,t,r){if(r<e)throw So(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw So(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bn(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Qd(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const s=e(r)+"="+e(n[r]);t=t+s+"&"}return t=t.slice(0,-1),t}var Yt;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Yt||(Yt={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jd(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,i=e.indexOf(n)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CI{constructor(e,t,r,s,i,a,u,l,d,p,g,E=!0,S=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=a,this.callback_=u,this.errorCallback_=l,this.timeout_=d,this.progressCallback_=p,this.connectionFactory_=g,this.retry=E,this.isUsingEmulator=S,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,V)=>{this.resolve_=C,this.reject_=V,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new hs(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const a=u=>{const l=u.loaded,d=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,d)};this.progressCallback_!==null&&i.addUploadProgressListener(a),i.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(a),this.pendingConnection_=null;const u=i.getErrorCode()===Yt.NO_ERROR,l=i.getStatus();if(!u||Jd(l,this.additionalRetryCodes_)&&this.retry){const p=i.getErrorCode()===Yt.ABORT;r(!1,new hs(!1,null,p));return}const d=this.successCodes_.indexOf(l)!==-1;r(!0,new hs(d,i))})},t=(r,s)=>{const i=this.resolve_,a=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const l=this.callback_(u,u.getResponse());SI(l)?i(l):i()}catch(l){a(l)}else if(u!==null){const l=Aa();l.serverResponse=u.getErrorText(),this.errorCallback_?a(this.errorCallback_(u,l)):a(l)}else if(s.canceled){const l=this.appDelete_?Kd():Wd();a(l)}else{const l=Hd();a(l)}};this.canceled_?t(!1,new hs(!1,null,!0)):this.backoffId_=AI(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&RI(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class hs{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function kI(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function NI(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function DI(n,e){e&&(n["X-Firebase-GMPID"]=e)}function VI(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function OI(n,e,t,r,s,i,a=!0,u=!1){const l=Qd(n.urlParams),d=n.url+l,p=Object.assign({},n.headers);return DI(p,e),kI(p,t),NI(p,i),VI(p,r),new CI(d,n.method,p,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,a,u)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LI(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function MI(...n){const e=LI();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Ra())return new Blob(n);throw new ie(te.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function xI(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UI(n){if(typeof atob>"u")throw II("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class eo{constructor(e,t){this.data=e,this.contentType=t||null}}function FI(n,e){switch(n){case Ke.RAW:return new eo(Yd(e));case Ke.BASE64:case Ke.BASE64URL:return new eo(Xd(n,e));case Ke.DATA_URL:return new eo(qI(e),jI(e))}throw Aa()}function Yd(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=r,a=n.charCodeAt(++t);r=65536|(i&1023)<<10|a&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function BI(n){let e;try{e=decodeURIComponent(n)}catch{throw yr(Ke.DATA_URL,"Malformed data URL.")}return Yd(e)}function Xd(n,e){switch(n){case Ke.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw yr(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Ke.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw yr(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=UI(e)}catch(s){throw s.message.includes("polyfill")?s:yr(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}class Zd{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw yr(Ke.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=$I(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function qI(n){const e=new Zd(n);return e.base64?Xd(Ke.BASE64,e.rest):BI(e.rest)}function jI(n){return new Zd(n).contentType}function $I(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){let r=0,s="";al(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(al(this.data_)){const r=this.data_,s=xI(r,e,t);return s===null?null:new rt(s)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new rt(r,!0)}}static getBlob(...e){if(Ra()){const t=e.map(r=>r instanceof rt?r.data_:r);return new rt(MI.apply(null,t))}else{const t=e.map(a=>gi(a)?FI(Ke.RAW,a).data:a.data_);let r=0;t.forEach(a=>{r+=a.byteLength});const s=new Uint8Array(r);let i=0;return t.forEach(a=>{for(let u=0;u<a.length;u++)s[i++]=a[u]}),new rt(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(n){let e;try{e=JSON.parse(n)}catch{return null}return PI(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zI(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function HI(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function tf(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WI(n,e){return e}class be{constructor(e,t,r,s){this.server=e,this.local=t||e,this.writable=!!r,this.xform=s||WI}}let ds=null;function GI(n){return!gi(n)||n.length<2?n:tf(n)}function _i(){if(ds)return ds;const n=[];n.push(new be("bucket")),n.push(new be("generation")),n.push(new be("metageneration")),n.push(new be("name","fullPath",!0));function e(i,a){return GI(a)}const t=new be("name");t.xform=e,n.push(t);function r(i,a){return a!==void 0?Number(a):a}const s=new be("size");return s.xform=r,n.push(s),n.push(new be("timeCreated")),n.push(new be("updated")),n.push(new be("md5Hash",null,!0)),n.push(new be("cacheControl",null,!0)),n.push(new be("contentDisposition",null,!0)),n.push(new be("contentEncoding",null,!0)),n.push(new be("contentLanguage",null,!0)),n.push(new be("contentType",null,!0)),n.push(new be("metadata","customMetadata",!0)),ds=n,ds}function KI(n,e){function t(){const r=n.bucket,s=n.fullPath,i=new Me(r,s);return e._makeStorageReference(i)}Object.defineProperty(n,"ref",{get:t})}function QI(n,e,t){const r={};r.type="file";const s=t.length;for(let i=0;i<s;i++){const a=t[i];r[a.local]=a.xform(r,e[a.server])}return KI(r,n),r}function nf(n,e,t){const r=ef(e);return r===null?null:QI(n,r,t)}function JI(n,e,t,r){const s=ef(e);if(s===null||!gi(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const a=encodeURIComponent;return i.split(",").map(d=>{const p=n.bucket,g=n.fullPath,E="/b/"+a(p)+"/o/"+a(g),S=Bn(E,t,r),C=Qd({alt:"media",token:d});return S+C})[0]}function rf(n,e){const t={},r=e.length;for(let s=0;s<r;s++){const i=e[s];i.writable&&(t[i.server]=n[i.local])}return JSON.stringify(t)}class dn{constructor(e,t,r,s){this.url=e,this.method=t,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(n){if(!n)throw Aa()}function Sa(n,e){function t(r,s){const i=nf(n,s,e);return ct(i!==null),i}return t}function YI(n,e){function t(r,s){const i=nf(n,s,e);return ct(i!==null),JI(i,s,n.host,n._protocol)}return t}function $r(n){function e(t,r){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=pI():s=fI():t.getStatus()===402?s=dI(n.bucket):t.getStatus()===403?s=mI(n.path):s=r,s.status=t.getStatus(),s.serverResponse=r.serverResponse,s}return e}function ba(n){const e=$r(n);function t(r,s){let i=e(r,s);return r.getStatus()===404&&(i=hI(n.path)),i.serverResponse=s.serverResponse,i}return t}function sf(n,e,t){const r=e.fullServerUrl(),s=Bn(r,n.host,n._protocol),i="GET",a=n.maxOperationRetryTime,u=new dn(s,i,Sa(n,t),a);return u.errorHandler=ba(e),u}function XI(n,e,t){const r=e.fullServerUrl(),s=Bn(r,n.host,n._protocol),i="GET",a=n.maxOperationRetryTime,u=new dn(s,i,YI(n,t),a);return u.errorHandler=ba(e),u}function ZI(n,e){const t=e.fullServerUrl(),r=Bn(t,n.host,n._protocol),s="DELETE",i=n.maxOperationRetryTime;function a(l,d){}const u=new dn(r,s,a,i);return u.successCodes=[200,204],u.errorHandler=ba(e),u}function ew(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function of(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=ew(null,e)),r}function af(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function u(){let j="";for(let Q=0;Q<2;Q++)j=j+Math.random().toString().slice(2);return j}const l=u();a["Content-Type"]="multipart/related; boundary="+l;const d=of(e,r,s),p=rf(d,t),g="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+p+`\r
--`+l+`\r
Content-Type: `+d.contentType+`\r
\r
`,E=`\r
--`+l+"--",S=rt.getBlob(g,r,E);if(S===null)throw Gd();const C={name:d.fullPath},V=Bn(i,n.host,n._protocol),k="POST",q=n.maxUploadRetryTime,B=new dn(V,k,Sa(n,t),q);return B.urlParams=C,B.headers=a,B.body=S.uploadData(),B.errorHandler=$r(e),B}class Hs{constructor(e,t,r,s){this.current=e,this.total=t,this.finalized=!!r,this.metadata=s||null}}function Pa(n,e){let t=null;try{t=n.getResponseHeader("X-Goog-Upload-Status")}catch{ct(!1)}return ct(!!t&&(e||["active"]).indexOf(t)!==-1),t}function tw(n,e,t,r,s){const i=e.bucketOnlyServerUrl(),a=of(e,r,s),u={name:a.fullPath},l=Bn(i,n.host,n._protocol),d="POST",p={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},g=rf(a,t),E=n.maxUploadRetryTime;function S(V){Pa(V);let k;try{k=V.getResponseHeader("X-Goog-Upload-URL")}catch{ct(!1)}return ct(gi(k)),k}const C=new dn(l,d,S,E);return C.urlParams=u,C.headers=p,C.body=g,C.errorHandler=$r(e),C}function nw(n,e,t,r){const s={"X-Goog-Upload-Command":"query"};function i(d){const p=Pa(d,["active","final"]);let g=null;try{g=d.getResponseHeader("X-Goog-Upload-Size-Received")}catch{ct(!1)}g||ct(!1);const E=Number(g);return ct(!isNaN(E)),new Hs(E,r.size(),p==="final")}const a="POST",u=n.maxUploadRetryTime,l=new dn(t,a,i,u);return l.headers=s,l.errorHandler=$r(e),l}const ul=256*1024;function rw(n,e,t,r,s,i,a,u){const l=new Hs(0,0);if(a?(l.current=a.current,l.total=a.total):(l.current=0,l.total=r.size()),r.size()!==l.total)throw EI();const d=l.total-l.current;let p=d;s>0&&(p=Math.min(p,s));const g=l.current,E=g+p;let S="";p===0?S="finalize":d===p?S="upload, finalize":S="upload";const C={"X-Goog-Upload-Command":S,"X-Goog-Upload-Offset":`${l.current}`},V=r.slice(g,E);if(V===null)throw Gd();function k(Q,ne){const re=Pa(Q,["active","final"]),I=l.current+p,m=r.size();let y;return re==="final"?y=Sa(e,i)(Q,ne):y=null,new Hs(I,m,re==="final",y)}const q="POST",B=e.maxUploadRetryTime,j=new dn(t,q,k,B);return j.headers=C,j.body=V.uploadData(),j.progressCallback=u||null,j.errorHandler=$r(n),j}const Ne={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function to(n){switch(n){case"running":case"pausing":case"canceling":return Ne.RUNNING;case"paused":return Ne.PAUSED;case"success":return Ne.SUCCESS;case"canceled":return Ne.CANCELED;case"error":return Ne.ERROR;default:return Ne.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{constructor(e,t,r){if(bI(e)||t!=null||r!=null)this.next=e,this.error=t??void 0,this.complete=r??void 0;else{const i=e;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(n){return(...e)=>{Promise.resolve().then(()=>n(...e))}}class iw{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Yt.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Yt.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Yt.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,s,i){if(this.sent_)throw sr("cannot .send() more than once");if(Ut(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const a in i)i.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,i[a].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw sr("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw sr("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw sr("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw sr("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class ow extends iw{initXhr(){this.xhr_.responseType="text"}}function st(){return new ow}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=_i(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(te.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(Jd(s.status,[]))if(i)s=Hd();else{this.sleepTime=Math.max(this.sleepTime*2,lI),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(te.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{const r=tw(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,st,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,r)=>{const s=nw(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(s,st,t,r);this._request=i,i.getPromise().then(a=>{a=a,this._request=void 0,this._updateProgress(a.current),this._needToFetchStatus=!1,a.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=ul*this._chunkMultiplier,t=new Hs(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((s,i)=>{let a;try{a=rw(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(l){this._error=l,this._transition("error");return}const u=this._ref.storage._makeRequest(a,st,s,i,!1);this._request=u,u.getPromise().then(l=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(l.current),l.finalized?(this._metadata=l.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){ul*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const r=sf(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(r,st,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const r=af(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(r,st,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=Wd(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=to(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,s){const i=new sw(t||void 0,r||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(to(this._state)){case Ne.SUCCESS:gn(this._resolve.bind(null,this.snapshot))();break;case Ne.CANCELED:case Ne.ERROR:const t=this._reject;gn(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(to(this._state)){case Ne.RUNNING:case Ne.PAUSED:e.next&&gn(e.next.bind(e,this.snapshot))();break;case Ne.SUCCESS:e.complete&&gn(e.complete.bind(e))();break;case Ne.CANCELED:case Ne.ERROR:e.error&&gn(e.error.bind(e,this._error))();break;default:e.error&&gn(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e,t){this._service=e,t instanceof Me?this._location=t:this._location=Me.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new an(e,t)}get root(){const e=new Me(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return tf(this._location.path)}get storage(){return this._service}get parent(){const e=zI(this._location.path);if(e===null)return null;const t=new Me(this._location.bucket,e);return new an(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw wI(e)}}function cw(n,e,t){n._throwIfRoot("uploadBytes");const r=af(n.storage,n._location,_i(),new rt(e,!0),t);return n.storage.makeRequestWithTokens(r,st).then(s=>({metadata:s,ref:n}))}function uw(n,e,t){return n._throwIfRoot("uploadBytesResumable"),new aw(n,new rt(e),t)}function lw(n){n._throwIfRoot("getMetadata");const e=sf(n.storage,n._location,_i());return n.storage.makeRequestWithTokens(e,st)}function hw(n){n._throwIfRoot("getDownloadURL");const e=XI(n.storage,n._location,_i());return n.storage.makeRequestWithTokens(e,st).then(t=>{if(t===null)throw TI();return t})}function dw(n){n._throwIfRoot("deleteObject");const e=ZI(n.storage,n._location);return n.storage.makeRequestWithTokens(e,st)}function fw(n,e){const t=HI(n._location.path,e),r=new Me(n._location.bucket,t);return new an(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pw(n){return/^[A-Za-z]+:\/\//.test(n)}function mw(n,e){return new an(n,e)}function cf(n,e){if(n instanceof Ca){const t=n;if(t._bucket==null)throw yI();const r=new an(t,t._bucket);return e!=null?cf(r,e):r}else return e!==void 0?fw(n,e):n}function gw(n,e){if(e&&pw(e)){if(n instanceof Ca)return mw(n,e);throw So("To use ref(service, url), the first argument must be a Storage instance.")}else return cf(n,e)}function ll(n,e){const t=e==null?void 0:e[zd];return t==null?null:Me.makeFromBucketSpec(t,n)}function _w(n,e,t,r={}){n.host=`${e}:${t}`;const s=Ut(e);s&&(bo(`https://${n.host}/b`),Po("Storage",!0)),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Tl(i,n.app.options.projectId))}class Ca{constructor(e,t,r,s,i,a=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._isUsingEmulator=a,this._bucket=null,this._host=$d,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=cI,this._maxUploadRetryTime=uI,this._requests=new Set,s!=null?this._bucket=Me.makeFromBucketSpec(s,this._host):this._bucket=ll(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Me.makeFromBucketSpec(this._url,e):this._bucket=ll(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){cl("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){cl("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(De(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new an(this,e)}_makeRequest(e,t,r,s,i=!0){if(this._deleted)return new vI(Kd());{const a=OI(e,this._appId,r,s,t,this._firebaseVersion,i,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,s).getPromise()}}const hl="@firebase/storage",dl="0.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf="storage";function Ww(n,e,t){return n=J(n),cw(n,e,t)}function Gw(n,e,t){return n=J(n),uw(n,e,t)}function Kw(n){return n=J(n),lw(n)}function Qw(n){return n=J(n),hw(n)}function Jw(n){return n=J(n),dw(n)}function Yw(n,e){return n=J(n),gw(n,e)}function yw(n=No(),e){n=J(n);const r=Gs(n,uf).getImmediate({identifier:e}),s=_l("storage");return s&&Ew(r,...s),r}function Ew(n,e,t,r={}){_w(n,e,t,r)}function Tw(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new Ca(t,r,s,e,cn)}function Iw(){Zt(new Nt(uf,Tw,"PUBLIC").setMultipleInstances(!0)),Qe(hl,dl,""),Qe(hl,dl,"esm2020")}Iw();const ww={apiKey:"AIzaSyAxRsJwYHIV3rVqJgjGf_ZwqmMF3TGwooM",authDomain:"jkssbdriversacd.firebaseapp.com",projectId:"jkssbdriversacd",storageBucket:"jkssbdriversacd.firebasestorage.app",messagingSenderId:"723957920242",appId:"1:723957920242:web:825bc69a22161871107b6b",measurementId:"G-TN6YTZCPH1"},ka=vl(ww),vw=L_(ka),Xw=GT(ka),Zw=yw(ka);Ag(vw,Yl).catch(n=>{console.error("[FIREBASE] Failed to set persistence:",n)});export{Sw as A,Nw as B,Aw as C,Rw as D,bw as E,Fw as F,wt as G,Pw as a,jw as b,Xw as c,WT as d,Bw as e,qw as f,Qw as g,Ow as h,yw as i,ka as j,Kw as k,Hw as l,Lw as m,$w as n,Uw as o,zw as p,Mw as q,Yw as r,Zw as s,Jw as t,Ww as u,Gw as v,xw as w,Cw as x,vw as y,kw as z};
