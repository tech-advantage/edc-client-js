!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("es6-promise"),require("axios")):"function"==typeof define&&define.amd?define(["es6-promise","axios"],n):"object"==typeof exports?exports["edc-client-js"]=n(require("es6-promise"),require("axios")):t["edc-client-js"]=n(t["es6-promise"],t.axios)}(self,(function(t,n){return(()=>{"use strict";var e={300:t=>{t.exports=n},930:n=>{n.exports=t}},r={};function o(t){var n=r[t];if(void 0!==n)return n.exports;var i=r[t]={exports:{}};return e[t](i,i.exports,o),i.exports}o.n=t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return o.d(n,{a:n}),n},o.d=(t,n)=>{for(var e in n)o.o(n,e)&&!o.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})},o.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};return(()=>{var t;o.r(i),o.d(i,{Article:()=>en,ArticleType:()=>Vt,Documentation:()=>rn,DocumentationTransfer:()=>Zt,EdcClient:()=>nn,ExportInfo:()=>un,Helper:()=>fn,Info:()=>on,InformationMap:()=>ln,Link:()=>cn,PopoverError:()=>It,PopoverLabel:()=>yt,Toc:()=>Et}),function(t){t.TYPE_MULTI_TOC_SUFFIX="/multi-doc.json",t.TYPE_CONTEXT_SUFFIX="/context.json",t.TYPE_INFO_SUFFIX="/info.json",t.TYPE_TOC_SUFFIX="/toc.json",t.TYPE_EMPTY_SUFFIX=""}(t||(t={})),t.TYPE_INFO_SUFFIX,t.TYPE_CONTEXT_SUFFIX,t.TYPE_TOC_SUFFIX;var n=o(930);const e=Array.isArray,r="object"==typeof global&&global&&global.Object===Object&&global;var u="object"==typeof self&&self&&self.Object===Object&&self;const c=r||u||Function("return this")(),a=c.Symbol;var s=Object.prototype,l=s.hasOwnProperty,f=s.toString,p=a?a.toStringTag:void 0;var g=Object.prototype.toString;var h=a?a.toStringTag:void 0;const d=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":h&&h in Object(t)?function(t){var n=l.call(t,p),e=t[p];try{t[p]=void 0;var r=!0}catch(t){}var o=f.call(t);return r&&(n?t[p]=e:delete t[p]),o}(t):function(t){return g.call(t)}(t)},v=function(t){return null!=t&&"object"==typeof t},y=function(t){return"symbol"==typeof t||v(t)&&"[object Symbol]"==d(t)};var I=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,C=/^\w*$/;const m=function(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)},x=function(t){if(!m(t))return!1;var n=d(t);return"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n},_=c["__core-js_shared__"];var E,b=(E=/[^.]+$/.exec(_&&_.keys&&_.keys.IE_PROTO||""))?"Symbol(src)_1."+E:"";var S=Function.prototype.toString;var T=/^\[object .+?Constructor\]$/,P=Function.prototype,L=Object.prototype,O=P.toString,R=L.hasOwnProperty,F=RegExp("^"+O.call(R).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");const j=function(t){return!(!m(t)||(n=t,b&&b in n))&&(x(t)?F:T).test(function(t){if(null!=t){try{return S.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t));var n},U=function(t,n){var e=function(t,n){return null==t?void 0:t[n]}(t,n);return j(e)?e:void 0},w=U(Object,"create");var D=Object.prototype.hasOwnProperty;var M=Object.prototype.hasOwnProperty;function A(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}A.prototype.clear=function(){this.__data__=w?w(null):{},this.size=0},A.prototype.delete=function(t){var n=this.has(t)&&delete this.__data__[t];return this.size-=n?1:0,n},A.prototype.get=function(t){var n=this.__data__;if(w){var e=n[t];return"__lodash_hash_undefined__"===e?void 0:e}return D.call(n,t)?n[t]:void 0},A.prototype.has=function(t){var n=this.__data__;return w?void 0!==n[t]:M.call(n,t)},A.prototype.set=function(t,n){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=w&&void 0===n?"__lodash_hash_undefined__":n,this};const N=A,G=function(t,n){return t===n||t!=t&&n!=n},H=function(t,n){for(var e=t.length;e--;)if(G(t[e][0],n))return e;return-1};var Y=Array.prototype.splice;function z(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}z.prototype.clear=function(){this.__data__=[],this.size=0},z.prototype.delete=function(t){var n=this.__data__,e=H(n,t);return!(e<0||(e==n.length-1?n.pop():Y.call(n,e,1),--this.size,0))},z.prototype.get=function(t){var n=this.__data__,e=H(n,t);return e<0?void 0:n[e][1]},z.prototype.has=function(t){return H(this.__data__,t)>-1},z.prototype.set=function(t,n){var e=this.__data__,r=H(e,t);return r<0?(++this.size,e.push([t,n])):e[r][1]=n,this};const X=z,B=U(c,"Map"),k=function(t,n){var e,r,o=t.__data__;return("string"==(r=typeof(e=n))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==e:null===e)?o["string"==typeof n?"string":"hash"]:o.map};function $(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}$.prototype.clear=function(){this.size=0,this.__data__={hash:new N,map:new(B||X),string:new N}},$.prototype.delete=function(t){var n=k(this,t).delete(t);return this.size-=n?1:0,n},$.prototype.get=function(t){return k(this,t).get(t)},$.prototype.has=function(t){return k(this,t).has(t)},$.prototype.set=function(t,n){var e=k(this,t),r=e.size;return e.set(t,n),this.size+=e.size==r?0:1,this};const W=$;function V(t,n){if("function"!=typeof t||null!=n&&"function"!=typeof n)throw new TypeError("Expected a function");var e=function(){var r=arguments,o=n?n.apply(this,r):r[0],i=e.cache;if(i.has(o))return i.get(o);var u=t.apply(this,r);return e.cache=i.set(o,u)||i,u};return e.cache=new(V.Cache||W),e}V.Cache=W;var q=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,K=/\\(\\)?/g;const J=(Q=V((function(t){var n=[];return 46===t.charCodeAt(0)&&n.push(""),t.replace(q,(function(t,e,r,o){n.push(r?o.replace(K,"$1"):e||t)})),n}),(function(t){return 500===Z.size&&Z.clear(),t})),Z=Q.cache,Q);var Q,Z;var tt=a?a.prototype:void 0,nt=tt?tt.toString:void 0;const et=function t(n){if("string"==typeof n)return n;if(e(n))return function(t,n){for(var e=-1,r=null==t?0:t.length,o=Array(r);++e<r;)o[e]=n(t[e],e,t);return o}(n,t)+"";if(y(n))return nt?nt.call(n):"";var r=n+"";return"0"==r&&1/n==-1/0?"-0":r},rt=function(t){return null==t?"":et(t)},ot=function(t,n){return e(t)?t:function(t,n){if(e(t))return!1;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!y(t))||C.test(t)||!I.test(t)||null!=n&&t in Object(n)}(t,n)?[t]:J(rt(t))},it=function(t){if("string"==typeof t||y(t))return t;var n=t+"";return"0"==n&&1/t==-1/0?"-0":n},ut=function(t,n,e){var r=null==t?void 0:function(t,n){for(var e=0,r=(n=ot(n,t)).length;null!=t&&e<r;)t=t[it(n[e++])];return e&&e==r?t:void 0}(t,n);return void 0===r?e:r};var ct=o(300),at=o.n(ct),st=function(){function t(){}return t.getFileUrl=function(t,n,e){var r=e?"".concat(e,"/"):"";return"".concat(null!=t?t:"","/").concat(r).concat(n)},t.getContentUrl=function(t,n,e){var r=e?"".concat(e):"",o=n?"".concat(n):"";return"".concat(t,"/").concat(r).concat(o)},t}(),lt=function(){function t(){}return t.safeGet=function(t,n){if(!n||!n.length||!t)return null;var e=t;return n.forEach((function(t){e=gt(e,t)?e[t]:null})),e},t}(),ft=function(t){return null==t},pt=function(t){return(null!=t?t:[]).filter((function(t){return!ft(t)}))},gt=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},ht=function(){function t(){this.baseURL="",this.helpURL="",this.i18nURL=""}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.setURLs=function(t,n,e){void 0===t&&(t=""),void 0===n&&(n=""),void 0===e&&(e=""),this.baseURL=null!=t?t:"",this.helpURL=null!=n?n:"",this.i18nURL=null!=e?e:""},t.prototype.getBaseUrl=function(){return this.baseURL},t.prototype.getHomeUrl=function(){return this.helpURL+"/home"},t.prototype.getErrorUrl=function(){return this.helpURL+"/error"},t.prototype.getContextUrl=function(t,n,e,r,o){return ft(t)||ft(n)||ft(e)||ft(r)||ft(o)?null:"".concat(this.helpURL,"/context/").concat(t,"/").concat(n,"/").concat(e,"/").concat(r,"/").concat(o)},t.prototype.getDocumentationUrl=function(t,n,e){var r=e?"".concat(e,"/"):"",o=n?"/".concat(n):"";return"".concat(this.helpURL,"/doc/").concat(r).concat(t).concat(o)},t.prototype.getI18nBaseUrl=function(){return this.i18nURL?this.i18nURL:"".concat(this.baseURL,"/").concat(t.I18N_ROOT_FOLDER)},t.prototype.getWebHelpI18nUrl=function(){return"".concat(this.getI18nBaseUrl(),"/").concat(t.I18N_WEB_HELP_FOLDER)},t.prototype.getPopoverI18nUrl=function(){return"".concat(this.getI18nBaseUrl(),"/").concat(t.I18N_POPOVER_FOLDER)},t.prototype.getFileUrl=function(t,n){return st.getFileUrl(this.getBaseUrl(),t,n)},t.prototype.getContentUrl=function(t,n){return st.getContentUrl(this.getBaseUrl(),t,n)},t.prototype.getPopoverLabelsPath=function(n){return n?"".concat(t.I18N_ROOT_FOLDER,"/").concat(t.I18N_POPOVER_FOLDER,"/").concat(n,".json"):null},t.I18N_ROOT_FOLDER="i18n",t.I18N_POPOVER_FOLDER="popover",t.I18N_WEB_HELP_FOLDER="web-help",t}(),dt=function(){function t(t){this.urlConfigService=t}return t.getInstance=function(){return t.instance||(t.instance=new t(ht.getInstance())),t.instance},t.prototype.getFile=function(t,e){var r=this.urlConfigService.getFileUrl(t,e);return r?at().get(r).then((function(t){return 200===ut(t,"status")?t.data:null}),(function(t){return n.Promise.reject(t)})):n.Promise.reject("Invalid url")},t.prototype.getContent=function(t,e){var r=this.urlConfigService.getContentUrl(t,e);return r?at().get(r).then((function(t){return 200===ut(t,"status")?t.data:null}),(function(t){return n.Promise.reject(t)})):n.Promise.reject("Invalid url")},t.prototype.getItemContent=function(t){return t?t.url?this.getFile(t.url).then((function(n){return t.content=n,t}),(function(){return null})).catch((function(){return null})):n.Promise.resolve(t):n.Promise.reject("Cannot get content, url is not defined")},t}(),vt=function(t,n){this.pluginId=t,this.contextualHelp=n},yt=function(){this.exportId="",this.url="",this.errors=null},It=function(){},Ct=function(){function e(t){this.httpClient=t,this.context=null,this.contextReady=null}return e.getInstance=function(){return e.instance||(e.instance=new e(dt.getInstance())),e.instance},e.prototype.initContext=function(t){var e,r=this;return(!this.context||t&&this.context.pluginId!==t)&&(this.contextReady=this.readContext(t).then((function(t){return r.context=t,t.contextualHelp})).catch((function(e){return console.warn("Edc-client-js : could not get context from plugin [".concat(t,"]: ").concat(e)),n.Promise.resolve(null)}))),null!==(e=this.contextReady)&&void 0!==e?e:n.Promise.resolve(null)},e.prototype.readContext=function(n){return this.httpClient.getContent(t.TYPE_CONTEXT_SUFFIX,n).then((function(t){return new vt(n,t)}))},e.prototype.getContext=function(t,e,r,o){var i=this;return this.initContext(r).then((function(){var u;if(!i.context||!i.context.contextualHelp)return null;var c=[t,e];o&&c.push(o);var a=lt.safeGet(i.context.contextualHelp,c);return a?(a.language=o,a.exportId=r,n.Promise.all(function(t,n,e){if(e||2===arguments.length)for(var r,o=0,i=n.length;o<i;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return t.concat(r||Array.prototype.slice.call(n))}([i.httpClient.getItemContent(a)],(null!==(u=a.articles)&&void 0!==u?u:[]).filter(Boolean).map((function(t){return i.httpClient.getItemContent(t).then((function(){return a}))})),!0)).then((function(){return a})).catch((function(){return null}))):null}))},e.prototype.getPopoverLabel=function(t,e,r){var o=this;return this.initContext(e).then((function(){if(!o.context||!o.context.contextualHelp)return null;var e=new yt;return e.url=r.getPopoverLabelsPath(t),o.httpClient.getItemContent(e).then((function(t){if(!t)return n.Promise.reject("Can't fetch popover labels !");var e=lt.safeGet(t.content,["labels"]),r=lt.safeGet(t.content,["errors"]);if(e&&r){t.articles=lt.safeGet(e,["articles"]),t.links=lt.safeGet(e,["links"]),t.iconAlt=lt.safeGet(e,["iconAlt"]),t.comingSoon=lt.safeGet(e,["comingSoon"]),t.errorTitle=lt.safeGet(e,["errorTitle"]);var o=new It;return o.failedData=lt.safeGet(r,["failedData"]),t.errors=o,t}return n.Promise.reject("Can't find required data in fetched popover labels !")}))}))},e}(),mt=["en","ar","bg","zh","hr","cs","da","nl","et","fi","fr","de","el","he","hu","is","ga","it","ja","ko","lv","lt","lb","mt","no","fa","pl","pt","ro","ru","sk","sl","es","sv","tr","vi"],xt=function(){function t(){this.defaultLanguage=null,this.currentLanguage=null,this.languages=[]}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.init=function(t,n,e){return this.setLanguages(e),this.setDefaultLanguage(t),this.setCurrentLanguage(n),this.currentLanguage},t.prototype.getDefaultLanguage=function(){return this.defaultLanguage},t.prototype.setDefaultLanguage=function(n){this.defaultLanguage=n&&mt.some((function(t){return t===n}))?n.substr(0,2):t.SYS_DEFAULT},t.prototype.getCurrentLanguage=function(){return this.currentLanguage},t.prototype.setCurrentLanguage=function(t){return t||(t=this.getCurrentLanguage()),this.currentLanguage=this.isLanguagePresent(t)?t:this.defaultLanguage,this.currentLanguage},t.prototype.getLanguages=function(){return this.languages},t.prototype.setLanguages=function(t){this.languages=(t||[]).filter((function(t){return mt.some((function(n){return n===t}))}))},t.prototype.isLanguagePresent=function(t){return!!t&&this.languages&&this.languages.some((function(n){return n===t}))},t.prototype.isLanguageValid=function(t){return!!t&&mt.some((function(n){return n===t}))},t.SYS_DEFAULT="en",t.LANG_SEPARATOR="[langCode]",t}(),_t=function(t,n){void 0===t&&(t=[]),void 0===n&&(n={}),this.exports=t,this.index=n},Et=function(t,n){this.label=null!=t?t:"",this.toc=null!=n?n:[]},bt=function(t,n,e,r,o){void 0===e&&(e=new Et),this.pluginId=t,this.productId=n,this.toc=e,this.defaultLanguage=r,this.languages=o};const St=function(t,n,e){var r=t.length;return e=void 0===e?r:e,!n&&e>=r?t:function(t,n,e){var r=-1,o=t.length;n<0&&(n=-n>o?0:o+n),(e=e>o?o:e)<0&&(e+=o),o=n>e?0:e-n>>>0,n>>>=0;for(var i=Array(o);++r<o;)i[r]=t[r+n];return i}(t,n,e)};var Tt=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");const Pt=function(t){return Tt.test(t)};var Lt=/^(?:0|[1-9]\d*)$/;const Ot=function(t,n,e){if(!m(e))return!1;var r=typeof n;return!!("number"==r?function(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}(t.length)&&!x(t)}(e)&&function(t,n){var e=typeof t;return!!(n=null==n?9007199254740991:n)&&("number"==e||"symbol"!=e&&Lt.test(t))&&t>-1&&t%1==0&&t<n}(n,e.length):"string"==r&&n in e)&&G(e[n],t)};var Rt="object"==typeof exports&&exports&&!exports.nodeType&&exports,Ft=Rt&&"object"==typeof module&&module&&!module.nodeType&&module,jt=Ft&&Ft.exports===Rt&&r.process,Ut=function(){try{return Ft&&Ft.require&&Ft.require("util").types||jt&&jt.binding&&jt.binding("util")}catch(t){}}(),wt=Ut&&Ut.isRegExp;const Dt=wt?(Mt=wt,function(t){return Mt(t)}):function(t){return v(t)&&"[object RegExp]"==d(t)};var Mt;var At="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",Nt="\\ud83c[\\udffb-\\udfff]",Gt="[^\\ud800-\\udfff]",Ht="(?:\\ud83c[\\udde6-\\uddff]){2}",Yt="[\\ud800-\\udbff][\\udc00-\\udfff]",zt="(?:"+At+"|"+Nt+")?",Xt="[\\ufe0e\\ufe0f]?",Bt=Xt+zt+"(?:\\u200d(?:"+[Gt,Ht,Yt].join("|")+")"+Xt+zt+")*",kt="(?:"+[Gt+At+"?",At,Ht,Yt,"[\\ud800-\\udfff]"].join("|")+")",$t=RegExp(Nt+"(?="+Nt+")|"+kt+Bt,"g");const Wt=function(t){return Pt(t)?function(t){return t.match($t)||[]}(t):function(t){return t.split("")}(t)};var Vt,qt=function(){return qt=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t},qt.apply(this,arguments)},Kt=function(){function t(){}return t.indexTree=function(n,e,r){return n?n.reduce((function(n,o,i){if(!o)return n;var u=o.id,c=o.topics,a=r?e:"".concat(e,".topics[").concat(i,"]");return ft(u)||(n[u]=a),qt(qt({},n),t.indexTree(c,a))}),{}):{}},t.findFirstContent=function(t){for(var n=null,e=0,r=mt;e<r.length;e++){var o=r[e];if(n=lt.safeGet(t,[o]))break}return n},t.findIMFromDocumentationId=function(n,e){var r;if(ft(e))return null;if(n&&n.index&&n.exports){var o=n.index[e],i=t.findIMPathFromDocPath(o);r=ut(n,i)}if(!r)throw Error("Could not find informationMap from documentation id : ".concat(e));return r},t.findDocumentationFromId=function(n,e,r,o){var i="index[".concat(e,"]"),u=ut(n,i),c=t.replaceLanguageCode(u,r),a=ut(n,c);return!a&&o&&(c=t.replaceLanguageCode(u,o),a=ut(n,c)),a},t.findPluginIdFromDocumentationId=function(n,e){if(ft(e))return null;var r=ut(n,"index[".concat(e,"]")),o=t.findExportPathFromDocPath(r);return ut(n,o)},t.findExportPathFromDocPath=function(t){var n,e,r,o,i=(e=t,r=".",o&&"number"!=typeof o&&Ot(e,r,o)&&(r=o=void 0),(n=(o=void 0===o?4294967295:o>>>0)?(e=rt(e))&&("string"==typeof r||null!=r&&!Dt(r))&&!(r=et(r))&&Pt(e)?St(Wt(e),0,o):e.split(r,o):[])&&n.length?n[0]:void 0);return"".concat(i,".pluginId")},t.replaceLanguageCode=function(t,n){return t&&n?t.replace(xt.LANG_SEPARATOR,"[".concat(n,"]")):""},t.findIMPathFromDocPath=function(t){if(!t)throw new Error("Documentation path is not defined, could not extract information map path");var n=t.split(xt.LANG_SEPARATOR);if(!n||2!==n.length)throw new Error("Documentation path is not valid, could not extract information map path: "+t);return n[0]},t}(),Jt=function(){function e(t){this.httpClient=t,this.globalToc=null,this.globalTocReady=null}return e.getInstance=function(){return e.instance||(e.instance=new e(dt.getInstance())),e.instance},e.prototype.initMultiToc=function(t){var e=this;return this.globalToc=null,this.globalTocReady=this.readTocs(t).then((function(t){return n.Promise.resolve(e.createMultiToc(t))})).then((function(t){return n.Promise.resolve(e.globalToc=t)})).then((function(){return n.Promise.resolve(e.globalToc)})),this.globalTocReady},e.prototype.getDocumentation=function(t,e,r){var o,i=this;return(null!==(o=this.globalTocReady)&&void 0!==o?o:n.Promise.reject("TOC not defined")).then((function(n){return Kt.findDocumentationFromId(n,t,e,r)})).then((function(t){return i.httpClient.getItemContent(t)}))},e.prototype.findPluginIdFromDocumentationId=function(t){var r=this;return ft(this.globalTocReady)?n.Promise.reject(e.TOC_NOT_DEFINED_MSG):this.globalTocReady.then((function(){return Kt.findPluginIdFromDocumentationId(r.globalToc,t)}))},e.prototype.getInformationMapFromDocId=function(t){var r=this;return ft(this.globalTocReady)?n.Promise.reject(e.TOC_NOT_DEFINED_MSG):this.globalTocReady.then((function(){return Kt.findIMFromDocumentationId(r.globalToc,t)}))},e.prototype.getToc=function(t){var r=this;return ft(this.globalTocReady)?n.Promise.reject(e.TOC_NOT_DEFINED_MSG):this.globalTocReady.then((function(){var n=ft(r.globalToc)||!r.globalToc.exports?null:r.globalToc.exports.find((function(n){return n.pluginId===t}));return n?lt.safeGet(n,["toc"]):null}))},e.prototype.readTocs=function(t){var e=this;return t&&t.size?n.Promise.all(Array.from(t.entries(),(function(t){var n=t[0],r=t[1];return e.readSingleToc(n,r)}))).then((function(t){return t?t.filter(Boolean):[]})):n.Promise.resolve([])},e.prototype.createIndex=function(t){var n=this;return t.reduce((function(t,e,r){var o=n.createIndexOfExport(e,r);return o&&Object.assign(t,o),t}),{})},e.prototype.createIndexOfExport=function(t,n){return t&&t.toc&&t.toc.toc&&t.toc.toc.length?t.toc.toc.reduce((function(t,e,r){var o=Kt.findFirstContent(e);if(!o)return console.error("No content found for the information map",e),t;var i="exports[".concat(n,"].toc.toc[").concat(r,"]").concat(xt.LANG_SEPARATOR);return Object.assign(t,Kt.indexTree([o],i,!0)),t}),{}):(console.warn("Could not create index for documentation export: ",t),null)},e.prototype.readSingleToc=function(e,r){var o=this;return this.httpClient.getContent(t.TYPE_TOC_SUFFIX,e).then((function(t){return o.readInformationMaps(e,t)})).then((function(t){var n,o,i;return new bt(e,r.productId,t,null===(n=r.info)||void 0===n?void 0:n.defaultLanguage,null!==(i=null===(o=r.info)||void 0===o?void 0:o.languages)&&void 0!==i?i:[])})).catch((function(t){return console.warn("Could not find table of contents for export : {}, {}",e,t),n.Promise.resolve(null)}))},e.prototype.readInformationMaps=function(t,e){var r=this,o=e.toc;return n.Promise.all((null!=o?o:[]).map((function(n){return r.httpClient.getFile(n.file,t)}))).then(pt).then((function(t){return new Et(e.label,t)})).catch((function(t){return console.error("Could not get toc ",e,t),n.Promise.resolve(null)}))},e.prototype.createMultiToc=function(t){if(!t||!t.length)return null;var n=this.createIndex(t);return new _t(t,n)},e.TOC_NOT_DEFINED_MSG="TOC is not defined",e}(),Qt=function(){function e(t,n){this.httpClient=t,this.translationService=n,this.infos=new Map,this.infosReady=null,this.currentExportId=null}return e.getInstance=function(){return e.instance||(e.instance=new e(dt.getInstance(),xt.getInstance())),e.instance},e.prototype.initInfos=function(t,e,r){var o=this;return this.infosReady=this.readMultiToc().then((function(t){return n.Promise.all(t.map((function(t){return o.readInfos(t)})))})).then((function(){return o.initExportId(t,r)})).then((function(){return o.infos})),this.infosReady},e.prototype.getExportInfoValues=function(){return this.infos},e.prototype.getCurrentExportId=function(){return this.currentExportId},e.prototype.getTitle=function(){var t=this;if(!this.infosReady)throw new Error("Could not get title: Export information not available");return this.infosReady.then((function(){var n=t.getCurrentInfo();if(!n)throw new Error("Could not get title: no current Export information");if(!t.translationService.getCurrentLanguage())throw new Error("Current Language is not defined");if(!t.translationService.getDefaultLanguage())throw new Error("Default Language is not defined");var e=t.translationService.getCurrentLanguage(),r=t.translationService.getDefaultLanguage(),o=n.name,i=n.titles;return i&&e&&(i[e]&&i[e].title?o=i[e].title:r&&i[r]&&i[r].title&&(o=i[r].title)),o}))},e.prototype.getCurrentExportInfo=function(){var t=this;return ft(this.infosReady)?n.Promise.reject("No information for current export"):this.infosReady.then((function(){var n=t.getCurrentExportId(),e=ft(n)?null:t.infos.get(n);return e&&(e.currentLanguage=t.translationService.getCurrentLanguage()),e}))},e.prototype.readInfos=function(e){var r=this;if(!e||!e.pluginId)throw new Error("Export information not valid");return this.infos.clear(),this.httpClient.getContent(t.TYPE_INFO_SUFFIX,e.pluginId).then((function(t){return e.info=r.getInfo(t,e.pluginId),r.infos.set(e.pluginId,e),t})).catch((function(t){return console.error("Could not read info file",t),n.Promise.resolve(null)}))},e.prototype.setCurrentExportId=function(t,n){return this.doesExportExist(t)&&t!==this.currentExportId?(this.currentExportId=null!=t?t:null,this.initLanguages(n)):n&&this.translationService.setCurrentLanguage(n),this.getCurrentExportId()},e.prototype.doesExportExist=function(t){return!ft(t)&&this.infos.has(t)&&!!this.infos.get(t)},e.prototype.getInfo=function(t,n){if(!t||!t.identifier)throw new Error("Info.json file of plugin ".concat(n," is not valid"));return t.defaultLanguage||(t.defaultLanguage=xt.SYS_DEFAULT,t.languages=[xt.SYS_DEFAULT]),t},e.prototype.readMultiToc=function(){return this.httpClient.getContent(t.TYPE_MULTI_TOC_SUFFIX).then((function(t){if(!t)throw new Error("MultiToc must be defined");return t})).catch((function(t){return n.Promise.reject(new Error("Could not read MultiToc: "+t))}))},e.prototype.initExportId=function(t,n){var e=ft(t)?null:this.infos.get(t);e&&e.info||(t=this.infos.keys().next().value),this.setCurrentExportId(t,n)},e.prototype.initLanguages=function(t){var n=ft(this.currentExportId)?null:this.infos.get(this.currentExportId);if(!n||!n.info||!n.info.defaultLanguage)throw new Error("Could not initialize languages, no info found for the current export");return this.translationService.init(n.info.defaultLanguage,t,n.info.languages)},e.prototype.getCurrentInfo=function(){var t,n,e=this.getCurrentExportId();return this.infos&&!ft(e)&&this.doesExportExist(e)&&(n=null===(t=this.infos.get(e))||void 0===t?void 0:t.info),n},e}(),Zt=function(t,n,e,r){this.doc=t,this.exportId=n,this.hasExportChanged=e,this.resolvedLanguage=r},tn=function(){function t(t,n,e,r){this.infoService=t,this.contextService=n,this.translationService=e,this.documentationService=r,this.contentReady=null}return t.getInstance=function(){return t.instance||(t.instance=new t(Qt.getInstance(),Ct.getInstance(),xt.getInstance(),Jt.getInstance())),t.instance},t.prototype.initContent=function(t,n,e){var r=this;return this.contentReady=this.infoService.initInfos(t,!0,e).then((function(){return r.contextService.initContext(r.infoService.getCurrentExportId())})).then((function(){return n?null:r.documentationService.initMultiToc(r.infoService.getExportInfoValues())})).then((function(){return r.getExportInfo()})).catch((function(t){return console.error("Could not load help content",t),null})),this.contentReady},t.prototype.getTitle=function(){var t=this;return this.getContentReady().then((function(){return t.infoService.getTitle()}))},t.prototype.getToc=function(t,n){var e=this;return this.getContentReady().then((function(){return e.infoService.setCurrentExportId(t,n)})).then((function(){return e.documentationService.getToc(e.getCurrentPluginId())}))},t.prototype.getExportInfo=function(){return this.infoService.getCurrentExportInfo()},t.prototype.getInfos=function(){return this.infoService.getExportInfoValues()},t.prototype.getCurrentPluginId=function(){return this.infoService.getCurrentExportId()},t.prototype.getContentReady=function(t,n,e){return this.contentReady&&this.contentReady||this.initContent(t,n,e)},t.prototype.getContext=function(t,n,e,r){var o=this;return this.getContentReady().then((function(){return o.infoService.setCurrentExportId(e,r)})).then((function(){return o.contextService.initContext(e)})).then((function(){return o.contextService.getContext(t,n,o.infoService.getCurrentExportId(),o.translationService.getCurrentLanguage())}))},t.prototype.getDocumentation=function(t,e,r){var o,i=this,u=this.infoService.getCurrentExportId();return(null!==(o=this.contentReady)&&void 0!==o?o:n.Promise.reject("Documentation content is not ready")).then((function(){return i.documentationService.findPluginIdFromDocumentationId(t)})).then((function(t){return i.infoService.setCurrentExportId(t,e)})).then((function(){return i.documentationService.getDocumentation(t,i.translationService.getCurrentLanguage(),i.translationService.getDefaultLanguage())})).then((function(t){t||i.infoService.setCurrentExportId(r,e);var n=u!==i.infoService.getCurrentExportId();return new Zt(t,i.infoService.getCurrentExportId(),n,i.translationService.getCurrentLanguage())})).catch((function(){return null}))},t.prototype.getInformationMapFromDocId=function(t){var e,r=this;return(null!==(e=this.contentReady)&&void 0!==e?e:n.Promise.reject("Content not ready")).then((function(){return r.documentationService.getInformationMapFromDocId(t)}))},t.prototype.getPopoverLabel=function(t,n,e){var r=this;return this.getContentReady().then((function(){return r.infoService.setCurrentExportId(t,e)})).then((function(){return r.contextService.initContext(t)})).then((function(){return r.contextService.getPopoverLabel(r.translationService.getCurrentLanguage(),r.infoService.getCurrentExportId(),n)}))},t}(),nn=function(){function t(t,n,e,r,o,i){this.urlConfigService=ht.getInstance(),this.urlConfigService.setURLs(t,n,o),this.languageService=xt.getInstance(),this.contentService=tn.getInstance(),this.contentService.initContent(e,r,i)}return t.prototype.getContent=function(t,n,e){return this.contentService.getContentReady(t,n,e)},t.prototype.getTitle=function(){return this.contentService.getTitle()},t.prototype.getToc=function(t){return this.contentService.getToc(t)},t.prototype.getHelper=function(t,n,e,r){var o=this;return this.getContent().then((function(){return o.contentService.getContext(t,n,e,r)}))},t.prototype.getDocumentation=function(t,n,e){var r=this;return this.getContent().then((function(){return r.contentService.getDocumentation(t,n,e)}))},t.prototype.getContextWebHelpUrl=function(t,n,e,r,o){var i=o||this.contentService.getCurrentPluginId(),u=this.languageService.isLanguageValid(e)?e:this.languageService.getCurrentLanguage();return this.urlConfigService.getContextUrl(i,t,n,u,r)},t.prototype.getDocumentationWebHelpUrl=function(t,n){var e=this.languageService.isLanguagePresent(n)?n:this.languageService.getCurrentLanguage(),r=this.contentService.getCurrentPluginId();return this.urlConfigService.getDocumentationUrl(t,e,r)},t.prototype.getHomeWebHelpUrl=function(){return this.urlConfigService.getHomeUrl()},t.prototype.getErrorWebHelpUrl=function(){return this.urlConfigService.getErrorUrl()},t.prototype.getPopoverI18nUrl=function(){return this.urlConfigService.getPopoverI18nUrl()},t.prototype.getWebHelpI18nUrl=function(){return this.urlConfigService.getWebHelpI18nUrl()},t.prototype.getPopoverLabels=function(t,n){var e=this,r=n||this.contentService.getCurrentPluginId();return this.getContent().then((function(){return e.contentService.getPopoverLabel(r,e.urlConfigService,t)}))},t.prototype.getInformationMapFromDocId=function(t){return this.contentService.getInformationMapFromDocId(t)},t.prototype.getDefaultLanguage=function(){return this.languageService.getDefaultLanguage()},t.prototype.isLanguagePresent=function(t){return this.languageService.isLanguagePresent(t)},t.prototype.getCurrentLanguage=function(){return this.languageService.getCurrentLanguage()},t}(),en=function(){this.exportId=null,this.label="",this.url="",this.content=""},rn=function(){this.id=null,this.exportId="",this.label="",this.topics=null,this.url="",this.content="",this.links=null},on=function(){this.vendor="",this.version="",this.name="",this.titles=null,this.identifier="",this.defaultLanguage="",this.languages=null},un=function(t,n,e,r){this.pluginId=t,this.productId=n,this.info=e,this.currentLanguage=r},cn=function(t,n,e,r){this.id=t,this.label=n,this.type=e,this.url=r};!function(t){t.BRICK="BRICK",t.CHAPTER="CHAPTER",t.DOCUMENT="DOCUMENT"}(Vt||(Vt={}));var an,sn=(an=function(t,n){return an=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])},an(t,n)},function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function e(){this.constructor=t}an(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}),ln=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.id=null,n.label="",n.file="",n.topics=null,n}return sn(n,t),n}((function(){})),fn=function(){this.exportId="",this.label="",this.description="",this.url="",this.articles=null,this.links=null};window.EdcClient=nn})(),i})()}));