!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=49)}({3:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._init(t)}var t,n,o;return t=e,(n=[{key:"_init",value:function(e){e.addEventListener("click",this._handleBurgerClick.bind(this))}},{key:"_handleBurgerClick",value:function(e){var t=e.currentTarget;this._toggleButton(t),this._toggleMenu(t)}},{key:"_toggleButton",value:function(e){e.classList.toggle("header__burger-button_active")}},{key:"_toggleMenu",value:function(e){var t=e.closest(".header__container").querySelector(".header__menu"),n=e.classList.contains("header__burger-button_active");t.style.display=n?"block":"none"}}])&&r(t.prototype,n),o&&r(t,o),e}();window.addEventListener("load",(function(){document.querySelectorAll(".js-header__burger-button").forEach((function(e){return new o(e)}))}))},49:function(e,t,n){n(50),e.exports=n(51)},50:function(e,t,n){"use strict";n.r(t);n(3)},51:function(e,t,n){}});