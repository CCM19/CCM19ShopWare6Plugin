(window.webpackJsonp=window.webpackJsonp||[]).push([["papoo-ccm19-integration6"],{"EA/J":function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e,t,n){return(c="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=s(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.r(t);var l=function(e){function t(){return i(this,t),a(this,s(t).apply(this,arguments))}var n,o,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,e),n=t,(o=[{key:"init",value:function(){"CCM"in window||c(s(t.prototype),"init",this).call(this)}}])&&r(n.prototype,o),l&&r(n,l),t}(n("IGih").a),f=n("t8WJ"),v=window.PluginManager;try{v.override("CookiePermission",l,"[data-cookie-permission]")}catch(e){}window.addEventListener("ccm19CookieAccepted",(function(){var e={},t=!0,n=!1,o=void 0;try{for(var i,r=window.CCM.acceptedCookies[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var a=i.value;e[a]={cookie:a}}}catch(e){n=!0,o=e}finally{try{t||null==r.return||r.return()}finally{if(n)throw o}}"_ga"in e&&(e["google-analytics-enabled"]=e._ga),document.$emitter.publish(f.a,e)}))},IGih:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var o=n("FGIj"),i=n("prSB"),r=n("nhVY"),a=n("41MI");function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function l(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p,h,d,y=function(e){function t(){return s(this,t),l(this,f(t).apply(this,arguments))}var n,o,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),n=t,(o=[{key:"init",value:function(){this._button=this.el.querySelector(this.options.buttonSelector),this._isPreferenceSet()||(this._setBodyPadding(),this._registerEvents())}},{key:"_isPreferenceSet",value:function(){return!!i.a.getItem(this.options.cookieName)||(this._showCookieBar(),!1)}},{key:"_showCookieBar",value:function(){this.el.style.display="block",this.$emitter.publish("showCookieBar")}},{key:"_hideCookieBar",value:function(){this.el.style.display="none",this.$emitter.publish("hideCookieBar")}},{key:"_registerEvents",value:function(){if(this._button){var e=a.a.isTouchDevice()?"touchstart":"click";this._button.addEventListener(e,this._handleDenyButton.bind(this))}window.addEventListener("resize",r.a.debounce(this._setBodyPadding.bind(this),this.options.resizeDebounceTime),{capture:!0,passive:!0})}},{key:"_handleDenyButton",value:function(e){e.preventDefault();var t=this.options,n=t.cookieExpiration,o=t.cookieName;this._hideCookieBar(),this._removeBodyPadding(),i.a.setItem(o,"1",n),this.$emitter.publish("onClickDenyButton")}},{key:"_calculateCookieBarHeight",value:function(){return this.el.offsetHeight}},{key:"_setBodyPadding",value:function(){document.body.style.paddingBottom=this._calculateCookieBarHeight()+"px",this.$emitter.publish("setBodyPadding")}},{key:"_removeBodyPadding",value:function(){document.body.style.paddingBottom="0",this.$emitter.publish("removeBodyPadding")}}])&&u(n.prototype,o),c&&u(n,c),t}(o.a);d={cookieExpiration:30,cookieName:"cookie-preference",buttonSelector:".js-cookie-permission-button",resizeDebounceTime:200},(h="options")in(p=y)?Object.defineProperty(p,h,{value:d,enumerable:!0,configurable:!0,writable:!0}):p[h]=d},bK22:function(e,t,n){"use strict";n.d(t,"a",(function(){return y})),n.d(t,"b",(function(){return b}));var o=n("41MI"),i=n("+F6M"),r=n("KeF5"),a=n("ERap"),c=n("p8Xf");function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}var v="offcanvas",p="is-open",h=350,d=function(){function e(){u(this,e),this.$emitter=new i.a}return f(e,[{key:"open",value:function(e,t,n,o,i,r,a){this._removeExistingOffCanvas();var c=this._createOffCanvas(n,r,a);this.setContent(e,o,i),this._openOffcanvas(c,t)}},{key:"setContent",value:function(e,t,n){var o=this.getOffCanvas();o[0]&&(o[0].innerHTML=e,this._registerEvents(t,n))}},{key:"setAdditionalClassName",value:function(e){this.getOffCanvas()[0].classList.add(e)}},{key:"getOffCanvas",value:function(){return document.querySelectorAll(".".concat(v))}},{key:"close",value:function(e){var t=this,n=this.getOffCanvas();c.a.isActive("v6.5.0.0")?a.a.iterate(n,(function(e){bootstrap.Offcanvas.getInstance(e).hide()})):(a.a.iterate(n,(function(e){return e.classList.remove(p)})),setTimeout(this._removeExistingOffCanvas.bind(this),e),r.c.remove(e)),setTimeout((function(){t.$emitter.publish("onCloseOffcanvas",{offCanvasContent:n})}),e)}},{key:"goBackInHistory",value:function(){window.history.back()}},{key:"exists",value:function(){return this.getOffCanvas().length>0}},{key:"_openOffcanvas",value:function(t,n){c.a.isActive("v6.5.0.0")?setTimeout((function(){e.bsOffcanvas.show(),window.history.pushState("offcanvas-open",""),"function"==typeof n&&n()}),75):setTimeout((function(){r.c.create((function(){t.classList.add(p),window.history.pushState("offcanvas-open",""),"function"==typeof n&&n()}))}),75)}},{key:"_registerEvents",value:function(t,n){var i=this,s=o.a.isTouchDevice()?"touchend":"click";if(c.a.isActive("v6.5.0.0")){var u=this.getOffCanvas();t||(e.bsOffcanvas._backdrop._config.clickCallback=function(){}),a.a.iterate(u,(function(e){e.addEventListener("hide.bs.offcanvas",(function t(){setTimeout((function(){i._removeExistingOffCanvas(),i.$emitter.publish("onCloseOffcanvas",{offCanvasContent:u})}),n),e.removeEventListener("hide.bs.offcanvas",t)}))}))}else if(t){document.addEventListener(r.a.ON_CLICK,(function e(){i.close(n),document.removeEventListener(r.a.ON_CLICK,e)}))}window.addEventListener("popstate",this.close.bind(this,n),{once:!0});var l=document.querySelectorAll(".".concat("js-offcanvas-close"));a.a.iterate(l,(function(e){return e.addEventListener(s,i.close.bind(i,n))}))}},{key:"_removeExistingOffCanvas",value:function(){var e=this.getOffCanvas();return a.a.iterate(e,(function(e){return e.remove()}))}},{key:"_getPositionClass",value:function(e){return c.a.isActive("v6.5.0.0")?"left"===e?"offcanvas-start":"right"===e?"offcanvas-end":"offcanvas-".concat(e):"is-".concat(e)}},{key:"_createOffCanvas",value:function(t,n,o){var i=document.createElement("div");if(i.classList.add(v),i.classList.add(this._getPositionClass(t)),!0===n&&i.classList.add("is-fullwidth"),o){var r=s(o);if("string"===r)i.classList.add(o);else{if(!Array.isArray(o))throw new Error('The type "'.concat(r,'" is not supported. Please pass an array or a string.'));o.forEach((function(e){i.classList.add(e)}))}}return document.body.appendChild(i),c.a.isActive("v6.5.0.0")&&(e.bsOffcanvas=new bootstrap.Offcanvas(i)),i}}]),e}(),y=Object.freeze(new d),b=function(){function e(){u(this,e)}return f(e,null,[{key:"open",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"left",o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:h,r=arguments.length>5&&void 0!==arguments[5]&&arguments[5],a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"";y.open(e,t,n,o,i,r,a)}},{key:"setContent",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h;y.setContent(e,t,n)}},{key:"setAdditionalClassName",value:function(e){y.setAdditionalClassName(e)}},{key:"close",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;y.close(e)}},{key:"exists",value:function(){return y.exists()}},{key:"getOffCanvas",value:function(){return y.getOffCanvas()}},{key:"REMOVE_OFF_CANVAS_DELAY",value:function(){return h}}]),e}()},lpb5:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var o=n("bK22"),i=n("k8s9"),r=n("5lm9");function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function l(e,t,n){return(l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var o=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=f(e)););return e}(e,t);if(o){var i=Object.getOwnPropertyDescriptor(o,t);return i.get?i.get.call(n):i.value}})(e,t,n||e)}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=null,h=function(e){function t(){return c(this,t),u(this,f(t).apply(this,arguments))}var n,a,h;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),n=t,h=[{key:"open",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"left",r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:o.b.REMOVE_OFF_CANVAS_DELAY(),c=arguments.length>6&&void 0!==arguments[6]&&arguments[6],s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"";if(!e)throw new Error("A url must be given!");o.a._removeExistingOffCanvas();var u=o.a._createOffCanvas(i,c,s);this.setContent(e,t,n,r,a),o.a._openOffcanvas(u)}},{key:"setContent",value:function(e,n,o,a,c){var s=this,u=new i.a;l(f(t),"setContent",this).call(this,'<div class="offcanvas-content-container">'.concat(r.a.getTemplate(),"</div>"),a,c),p&&p.abort();var v=function(e){l(f(t),"setContent",s).call(s,e,a,c),"function"==typeof o&&o(e)};p=n?u.post(e,n,t.executeCallback.bind(this,v)):u.get(e,t.executeCallback.bind(this,v))}},{key:"executeCallback",value:function(e,t){"function"==typeof e&&e(t),window.PluginManager.initializePlugins()}}],(a=null)&&s(n.prototype,a),h&&s(n,h),t}(o.b)},t8WJ:function(e,t,n){"use strict";n.d(t,"a",(function(){return g})),n.d(t,"b",(function(){return m}));var o=n("FGIj"),i=n("prSB"),r=n("lpb5"),a=n("bK22"),c=(n("DeZd"),n("nnsc")),s=n("k8s9"),u=n("u0Tz");function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y,b,k,g="CookieConfiguration_Update",m=function(e){function t(){return f(this,t),p(this,h(t).apply(this,arguments))}var n,o,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(t,e),n=t,(o=[{key:"init",value:function(){this.lastState={active:[],inactive:[]},this._httpClient=new s.a,this._registerEvents()}},{key:"_registerEvents",value:function(){var e=this,t=this.options,n=t.submitEvent,o=t.buttonOpenSelector,i=t.customLinkSelector,r=t.globalButtonAcceptAllSelector;Array.from(document.querySelectorAll(o)).forEach((function(t){t.addEventListener(n,e.openOffCanvas.bind(e))})),Array.from(document.querySelectorAll(i)).forEach((function(t){t.addEventListener(n,e._handleCustomLink.bind(e))})),Array.from(document.querySelectorAll(r)).forEach((function(t){t.addEventListener(n,e._acceptAllCookiesFromCookieBar.bind(e))}))}},{key:"_registerOffCanvasEvents",value:function(){var e=this,t=this.options,n=t.submitEvent,o=t.buttonSubmitSelector,r=t.buttonAcceptAllSelector,a=t.wrapperToggleSelector,c=this._getOffCanvas();if(c){var s=c.querySelector(o),u=c.querySelector(r),l=Array.from(c.querySelectorAll('input[type="checkbox"]')),f=Array.from(c.querySelectorAll(a));s&&s.addEventListener(n,this._handleSubmit.bind(this,i.a)),u&&u.addEventListener(n,this._acceptAllCookiesFromOffCanvas.bind(this,i.a)),l.forEach((function(t){t.addEventListener(n,e._handleCheckbox.bind(e))})),f.forEach((function(t){t.addEventListener(n,e._handleWrapperTrigger.bind(e))}))}}},{key:"_handleCustomLink",value:function(e){e.preventDefault(),this.openOffCanvas()}},{key:"_handleUpdateListener",value:function(e,t){var n=this._getUpdatedCookies(e,t);document.$emitter.publish(g,n)}},{key:"_getUpdatedCookies",value:function(e,t){var n=this.lastState,o={};return e.forEach((function(e){n.inactive.includes(e)&&(o[e]=!0)})),t.forEach((function(e){n.active.includes(e)&&(o[e]=!1)})),o}},{key:"openOffCanvas",value:function(e){var t=this.options.offCanvasPosition,n=window.router["frontend.cookie.offcanvas"],o=c.a.isXS();this._hideCookieBar(),r.a.open(n,!1,this._onOffCanvasOpened.bind(this,e),t,void 0,void 0,o)}},{key:"closeOffCanvas",value:function(e){r.a.close(),"function"==typeof e&&e()}},{key:"_onOffCanvasOpened",value:function(e){this._registerOffCanvasEvents(),this._setInitialState(),this._setInitialOffcanvasState(),PluginManager.initializePlugins(),"function"==typeof e&&e()}},{key:"_hideCookieBar",value:function(){var e=PluginManager.getPluginInstances("CookiePermission");e&&e[0]&&(e[0]._hideCookieBar(),e[0]._removeBodyPadding())}},{key:"_setInitialState",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||this._getCookies("all"),n=[],o=[];t.forEach((function(e){var t=e.cookie,r=e.required;i.a.getItem(t)||r?n.push(t):o.push(t)})),this.lastState={active:n,inactive:o}}},{key:"_setInitialOffcanvasState",value:function(){var e=this,t=this.lastState.active,n=this._getOffCanvas();t.forEach((function(t){var o=n.querySelector('[data-cookie="'.concat(t,'"]'));o.checked=!0,e._childCheckboxEvent(o)}))}},{key:"_handleWrapperTrigger",value:function(e){e.preventDefault();var t=this.options,n=t.entriesActiveClass,o=t.entriesClass,i=t.groupClass,r=e.target,a=this._findParentEl(r,o,i);a&&(a.classList.contains(n)?a.classList.remove(n):a.classList.add(n))}},{key:"_handleCheckbox",value:function(e){var t=this.options.parentInputClass,n=e.target;(n.classList.contains(t)?this._parentCheckboxEvent:this._childCheckboxEvent).call(this,n)}},{key:"_findParentEl",value:function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e&&!e.classList.contains(n);){if(e.classList.contains(t))return e;e=e.parentElement}return null}},{key:"_isChecked",value:function(e){return!!e.checked}},{key:"_parentCheckboxEvent",value:function(e){var t=this.options.groupClass,n=this._isChecked(e),o=this._findParentEl(e,t);this._toggleWholeGroup(n,o)}},{key:"_childCheckboxEvent",value:function(e){var t=this.options.groupClass,n=this._isChecked(e),o=this._findParentEl(e,t);this._toggleParentCheckbox(n,o)}},{key:"_toggleWholeGroup",value:function(e,t){Array.from(t.querySelectorAll("input")).forEach((function(t){t.checked=e}))}},{key:"_toggleParentCheckbox",value:function(e,t){var n=this.options.parentInputSelector,o=Array.from(t.querySelectorAll("input:not(".concat(n,")"))),i=Array.from(t.querySelectorAll("input:not(".concat(n,"):checked")));if(o.length>0){var r=t.querySelector(n);if(r){var a=i.length>0,c=a&&i.length!==o.length;r.checked=a,r.indeterminate=c}}}},{key:"_handleSubmit",value:function(){var e=this._getCookies("active"),t=this._getCookies("inactive"),n=this.options.cookiePreference,o=[],r=[];t.forEach((function(e){var t=e.cookie;r.push(t),i.a.getItem(t)&&i.a.removeItem(t)})),e.forEach((function(e){var t=e.cookie,n=e.value,r=e.expiration;o.push(t),t&&n&&i.a.setItem(t,n,r)})),i.a.setItem(n,"1","30"),this._handleUpdateListener(o,r),this.closeOffCanvas()}},{key:"acceptAllCookies",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!t)return this._handleAcceptAll(),void this.closeOffCanvas();u.a.create(this.el);var n=window.router["frontend.cookie.offcanvas"];this._httpClient.get(n,(function(t){var n=(new DOMParser).parseFromString(t,"text/html");e._handleAcceptAll(n),u.a.remove(e.el),e._hideCookieBar()}))}},{key:"_acceptAllCookiesFromCookieBar",value:function(){return this.acceptAllCookies(!0)}},{key:"_acceptAllCookiesFromOffCanvas",value:function(){return this.acceptAllCookies()}},{key:"_handleAcceptAll",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this._getCookies("all",e);this._setInitialState(t);var n=this.options.cookiePreference;t.forEach((function(e){var t=e.cookie,n=e.value,o=e.expiration;t&&n&&i.a.setItem(t,n,o)})),i.a.setItem(n,"1","30"),this._handleUpdateListener(t.map((function(e){return e.cookie})),[])}},{key:"_getCookies",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=this.options.cookieSelector;return n||(n=this._getOffCanvas()),Array.from(n.querySelectorAll(o)).filter((function(n){switch(t){case"all":return!0;case"active":return e._isChecked(n);case"inactive":return!e._isChecked(n);default:return!1}})).map((function(e){var t=e.dataset;return{cookie:t.cookie,value:t.cookieValue,expiration:t.cookieExpiration,required:t.cookieRequired}}))}},{key:"_getOffCanvas",value:function(){var e=a.b?a.b.getOffCanvas():[];return!!(e&&e.length>0)&&e[0]}}])&&v(n.prototype,o),l&&v(n,l),t}(o.a);y=m,b="options",k={offCanvasPosition:"left",submitEvent:"click",cookiePreference:"cookie-preference",cookieSelector:"[data-cookie]",buttonOpenSelector:".js-cookie-configuration-button button",buttonSubmitSelector:".js-offcanvas-cookie-submit",buttonAcceptAllSelector:".js-offcanvas-cookie-accept-all",globalButtonAcceptAllSelector:".js-cookie-accept-all-button",wrapperToggleSelector:".offcanvas-cookie-entries span",parentInputSelector:".offcanvas-cookie-parent-input",customLinkSelector:'[href="'.concat(window.router["frontend.cookie.offcanvas"],'"]'),entriesActiveClass:"offcanvas-cookie-entries--active",entriesClass:"offcanvas-cookie-entries",groupClass:"offcanvas-cookie-group",parentInputClass:"offcanvas-cookie-parent-input"},b in y?Object.defineProperty(y,b,{value:k,enumerable:!0,configurable:!0,writable:!0}):y[b]=k}},[["EA/J","runtime","vendor-node","vendor-shared"]]]);