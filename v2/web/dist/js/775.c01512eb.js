"use strict";(globalThis["webpackChunkis_it_my_birthday"]=globalThis["webpackChunkis_it_my_birthday"]||[]).push([[775],{487:(e,t,o)=>{o.d(t,{a:()=>c,c:()=>v,g:()=>d,s:()=>u});var n=o(587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const i="ION-CONTENT",r="ion-content",s=".ion-content-scroll-host",a=`${r}, ${s}`,l=e=>e.tagName===i,d=async e=>l(e)?(await new Promise((t=>(0,n.c)(e,t))),e.getScrollElement()):e,c=e=>e.closest(a),u=(e,t)=>{if(l(e)){const o=e;return o.scrollToTop(t)}return Promise.resolve(e.scrollTo({top:0,left:0,behavior:t>0?"smooth":"auto"}))},v=(e,t,o,n)=>{if(l(e)){const i=e;return i.scrollByPoint(t,o,n)}return Promise.resolve(e.scrollBy({top:o,left:t,behavior:n>0?"smooth":"auto"}))}},775:(e,t,o)=>{o.r(t),o.d(t,{startInputShims:()=>M});var n=o(461),i=o(487),r=o(587),s=o(420);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const a=new WeakMap,l=(e,t,o,n=0,i=!1)=>{a.has(e)!==o&&(o?c(e,t,n,i):u(e,t))},d=e=>e===e.getRootNode().activeElement,c=(e,t,o,n=!1)=>{const i=t.parentNode,r=t.cloneNode(!1);r.classList.add("cloned-input"),r.tabIndex=-1,n&&(r.disabled=!0),i.appendChild(r),a.set(e,r);const s=e.ownerDocument,l="rtl"===s.dir?9999:-9999;e.style.pointerEvents="none",t.style.transform=`translate3d(${l}px,${o}px,0) scale(0)`},u=(e,t)=>{const o=a.get(e);o&&(a.delete(e),o.remove()),e.style.pointerEvents="",t.style.transform=""},v=50,m=(e,t,o)=>{if(!o||!t)return()=>{};const n=o=>{d(t)&&l(e,t,o)},i=()=>l(e,t,!1),s=()=>n(!0),a=()=>n(!1);return(0,r.a)(o,"ionScrollStart",s),(0,r.a)(o,"ionScrollEnd",a),t.addEventListener("blur",i),()=>{(0,r.b)(o,"ionScrollStart",s),(0,r.b)(o,"ionScrollEnd",a),t.removeEventListener("blur",i)}},w="input, textarea, [no-blur], [contenteditable]",h=()=>{let e=!0,t=!1;const o=document,n=()=>{t=!0},i=()=>{e=!0},s=n=>{if(t)return void(t=!1);const i=o.activeElement;if(!i)return;if(i.matches(w))return;const r=n.target;r!==i&&(r.matches(w)||r.closest(w)||(e=!1,setTimeout((()=>{e||i.blur()}),50)))};return(0,r.a)(o,"ionScrollStart",n),o.addEventListener("focusin",i,!0),o.addEventListener("touchend",s,!1),()=>{(0,r.b)(o,"ionScrollStart",n,!0),o.removeEventListener("focusin",i,!0),o.removeEventListener("touchend",s,!1)}},f=.3,y=(e,t,o,n)=>{var i;const r=null!==(i=e.closest("ion-item,[ion-item]"))&&void 0!==i?i:e;return p(r.getBoundingClientRect(),t.getBoundingClientRect(),o,n)},p=(e,t,o,n)=>{const i=e.top,r=e.bottom,s=t.top,a=Math.min(t.bottom,n-o),l=s+15,d=a-v,c=d-r,u=l-i,m=Math.round(c<0?-c:u>0?-u:0),w=Math.min(m,i-s),h=Math.abs(w),y=h/f,p=Math.min(400,Math.max(150,y));return{scrollAmount:w,scrollDuration:p,scrollPadding:o,inputSafeY:4-(i-l)}},b="$ionPaddingTimer",E=(e,t,o)=>{const n=e[b];n&&clearTimeout(n),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[b]=setTimeout((()=>{e.style.setProperty("--keyboard-offset","0px"),o&&o()}),120)},g=(e,t,o)=>{const n=()=>{t&&E(t,0,o)};e.addEventListener("focusout",n,{once:!0})};let S=0;const L="data-ionic-skip-scroll-assist",D=(e,t,o,i,r,a,l,d=!1)=>{const c=a&&(void 0===l||l.mode===s.a.None);let u=!1;const v=void 0!==n.w?n.w.innerHeight:0,m=n=>{!1!==u?k(e,t,o,i,n.detail.keyboardHeight,c,d,v,!1):u=!0},w=()=>{u=!1,null===n.w||void 0===n.w||n.w.removeEventListener("ionKeyboardDidShow",m),e.removeEventListener("focusout",w,!0)},h=async()=>{t.hasAttribute(L)?t.removeAttribute(L):(k(e,t,o,i,r,c,d,v),null===n.w||void 0===n.w||n.w.addEventListener("ionKeyboardDidShow",m),e.addEventListener("focusout",w,!0))};return e.addEventListener("focusin",h,!0),()=>{e.removeEventListener("focusin",h,!0),null===n.w||void 0===n.w||n.w.removeEventListener("ionKeyboardDidShow",m),e.removeEventListener("focusout",w,!0)}},T=e=>{document.activeElement!==e&&(e.setAttribute(L,"true"),e.focus())},k=async(e,t,o,n,s,a,d=!1,c=0,u=!0)=>{if(!o&&!n)return;const m=y(e,o||n,s,c);if(o&&Math.abs(m.scrollAmount)<4)return T(t),void(a&&null!==o&&(E(o,S),g(t,o,(()=>S=0))));if(l(e,t,!0,m.inputSafeY,d),T(t),(0,r.r)((()=>e.click())),a&&o&&(S=m.scrollPadding,E(o,S)),"undefined"!==typeof window){let n;const r=async()=>{void 0!==n&&clearTimeout(n),window.removeEventListener("ionKeyboardDidShow",s),window.removeEventListener("ionKeyboardDidShow",r),o&&await(0,i.c)(o,0,m.scrollAmount,m.scrollDuration),l(e,t,!1,m.inputSafeY),T(t),a&&g(t,o,(()=>S=0))},s=()=>{window.removeEventListener("ionKeyboardDidShow",s),window.addEventListener("ionKeyboardDidShow",r)};if(o){const e=await(0,i.g)(o),a=e.scrollHeight-e.clientHeight;if(u&&m.scrollAmount>a-e.scrollTop)return"password"===t.type?(m.scrollAmount+=v,window.addEventListener("ionKeyboardDidShow",s)):window.addEventListener("ionKeyboardDidShow",r),void(n=setTimeout(r,1e3))}r()}},A=!0,M=async(e,t)=>{if(void 0===n.d)return;const o="ios"===t,a="android"===t,l=e.getNumber("keyboardHeight",290),d=e.getBoolean("scrollAssist",!0),c=e.getBoolean("hideCaretOnScroll",o),u=e.getBoolean("inputBlurring",o),v=e.getBoolean("scrollPadding",!0),w=Array.from(n.d.querySelectorAll("ion-input, ion-textarea")),f=new WeakMap,y=new WeakMap,p=await s.K.getResizeMode(),b=async e=>{await new Promise((t=>(0,r.c)(e,t)));const t=e.shadowRoot||e,o=t.querySelector("input")||t.querySelector("textarea"),n=(0,i.a)(e),s=n?null:e.closest("ion-footer");if(!o)return;if(n&&c&&!f.has(e)){const t=m(e,o,n);f.set(e,t)}const u="date"===o.type||"datetime-local"===o.type;if(!u&&(n||s)&&d&&!y.has(e)){const t=D(e,o,n,s,l,v,p,a);y.set(e,t)}},E=e=>{if(c){const t=f.get(e);t&&t(),f.delete(e)}if(d){const t=y.get(e);t&&t(),y.delete(e)}};u&&A&&h();for(const n of w)b(n);n.d.addEventListener("ionInputDidLoad",(e=>{b(e.detail)})),n.d.addEventListener("ionInputDidUnload",(e=>{E(e.detail)}))}}}]);
//# sourceMappingURL=775.c01512eb.js.map