/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.7.0 (2021-02-10)
 */
!function(){"use strict";var t,e,n,r,i,o,u,a,f,c,l=function(t){var e=t;return{get:function(){return e},set:function(t){e=t}}},s=tinymce.util.Tools.resolve("tinymce.PluginManager"),d=tinymce.util.Tools.resolve("tinymce.util.Tools"),m=function(){},h=function(t){return function(){return t}},g=h(!1),v=h(!0),p=function(){return y},y=(t=function(t){return t.isNone()},{fold:function(t,e){return t()},is:g,isSome:g,isNone:v,getOr:n=function(t){return t},getOrThunk:e=function(t){return t()},getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:h(null),getOrUndefined:h(undefined),or:n,orThunk:e,map:p,each:m,bind:p,exists:g,forall:v,filter:p,equals:t,equals_:t,toArray:function(){return[]},toString:h("none()")}),w=function(n){var t=h(n),e=function(){return o},r=function(t){return t(n)},o={fold:function(t,e){return e(n)},is:function(t){return n===t},isSome:v,isNone:g,getOr:t,getOrThunk:t,getOrDie:t,getOrNull:t,getOrUndefined:t,or:e,orThunk:e,map:function(t){return w(t(n))},each:function(t){t(n)},bind:r,exists:r,forall:r,filter:function(t){return t(n)?o:y},toArray:function(){return[n]},toString:function(){return"some("+n+")"},equals:function(t){return t.is(n)},equals_:function(t,e){return t.fold(g,function(t){return e(n,t)})}};return o},b={some:w,none:p,from:function(t){return null===t||t===undefined?y:w(t)}},I=function(t){return!(null===(e=t)||e===undefined);var e},T=(r="function",function(t){return typeof t===r}),_=function(t,e){return A(document.createElement("canvas"),t,e)},R=function(t){var e=_(t.width,t.height);return U(e).drawImage(t,0,0),e},U=function(t){return t.getContext("2d")},A=function(t,e,n){return t.width=e,t.height=n,t},x=window.Promise?window.Promise:(i=function(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],c(t,a(L,this),a(j,this))},o=window,u=i.immediateFn||"function"==typeof o.setImmediate&&o.setImmediate||function(t){return setTimeout(t,1)},a=function(n,r){return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return n.apply(r,t)}},f=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},c=function(t,e,n){var r=!1;try{t(function(t){r||(r=!0,e(t))},function(t){r||(r=!0,n(t))})}catch(o){if(r)return;r=!0,n(o)}},i.prototype["catch"]=function(t){return this.then(null,t)},i.prototype.then=function(n,r){var o=this;return new i(function(t,e){E.call(o,new C(n,r,t,e))})},i.all=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var c=Array.prototype.slice.call(1===t.length&&f(t[0])?t[0]:t);return new i(function(o,i){if(0===c.length)return o([]);for(var u=c.length,a=function(e,t){try{if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if("function"==typeof n)return void n.call(t,function(t){a(e,t)},i)}c[e]=t,0==--u&&o(c)}catch(r){i(r)}},t=0;t<c.length;t++)a(t,c[t])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(n){return new i(function(t,e){e(n)})},i.race=function(o){return new i(function(t,e){for(var n=0,r=o;n<r.length;n++)r[n].then(t,e)})},i);function E(r){var o=this;null!==this._state?u(function(){var t,e=o._state?r.onFulfilled:r.onRejected;if(null!==e){try{t=e(o._value)}catch(n){return void r.reject(n)}r.resolve(t)}else(o._state?r.resolve:r.reject)(o._value)}):this._deferreds.push(r)}function L(t){try{if(t===this)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var e=t.then;if("function"==typeof e)return void c(a(e,t),a(L,this),a(j,this))}this._state=!0,this._value=t,k.call(this)}catch(n){j.call(this,n)}}function j(t){this._state=!1,this._value=t,k.call(this)}function k(){for(var t=0,e=this._deferreds;t<e.length;t++){var n=e[t];E.call(this,n)}this._deferreds=[]}function C(t,e,n,r){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.resolve=n,this.reject=r}var O=function(a){return new x(function(t,e){var n=URL.createObjectURL(a),r=new Image,o=function(){r.removeEventListener("load",i),r.removeEventListener("error",u)},i=function(){o(),t(r)},u=function(){o(),e("Unable to load data of type "+a.type+": "+n)};r.addEventListener("load",i),r.addEventListener("error",u),r.src=n,r.complete&&setTimeout(i,0)})},P=function(r){return new x(function(t,n){var e=new XMLHttpRequest;e.open("GET",r,!0),e.responseType="blob",e.onload=function(){200===this.status&&t(this.response)},e.onerror=function(){var t,e=this;n(0===this.status?((t=new Error("No access to download image")).code=18,t.name="SecurityError",t):new Error("Error "+e.status+" downloading image"))},e.send()})},S=function(n){return new x(function(t,e){(function(t){var e=t.split(","),n=/data:([^;]+)/.exec(e[0]);if(!n)return b.none();for(var r=n[1],o=e[1],i=atob(o),u=i.length,a=Math.ceil(u/1024),c=new Array(a),f=0;f<a;++f){for(var s=1024*f,l=Math.min(1024+s,u),d=new Array(l-s),m=s,h=0;m<l;++h,++m)d[h]=i[m].charCodeAt(0);c[f]=new Uint8Array(d)}return b.some(new Blob(c,{type:r}))})(n).fold(function(){e("uri is not base64: "+n)},t)})},M=function(t,r,o){return r=r||"image/png",T(HTMLCanvasElement.prototype.toBlob)?new x(function(e,n){t.toBlob(function(t){t?e(t):n()},r,o)}):S(t.toDataURL(r,o))},B=function(t){return O(t).then(function(t){N(t);var e,n,r=_((n=t).naturalWidth||n.width,(e=t).naturalHeight||e.height);return U(r).drawImage(t,0,0),r})},N=function(t){URL.revokeObjectURL(t.src)},D=O,F=function(t){return(0===(e=t.src).indexOf("data:")?S:P)(e);var e},H=function(t,e){return function(t,e,n){for(var r=0,o=t.length;r<o;r++){var i=t[r];if(e(i,r))return b.some(i);if(n(i,r))break}return b.none()}(t,e,g)},q=function(t,e,n){var r=e.type,o=h(r),i=h(n),u=function(r,o){return t.then(function(t){return n=o,e=(e=r)||"image/png",t.toDataURL(e,n);var e,n})};return{getType:o,toBlob:function(){return x.resolve(e)},toDataURL:i,toBase64:function(){return n.split(",")[1]},toAdjustedBlob:function(e,n){return t.then(function(t){return M(t,e,n)})},toAdjustedDataURL:u,toAdjustedBase64:function(t,e){return u(t,e).then(function(t){return t.split(",")[1]})},toCanvas:function(){return t.then(R)}}},z=function(e){return n=e,new x(function(t){var e=new FileReader;e.onloadend=function(){t(e.result)},e.readAsDataURL(n)}).then(function(t){return q(B(e),e,t)});var n},$=function(e,t){return M(e,t).then(function(t){return q(x.resolve(e),t,e.toDataURL())})},G=function(t,e,n){var r=_(t.width,t.height),o=U(r),i=0,u=0;return 90!==(n=n<0?360+n:n)&&270!==n||A(r,r.height,r.width),90!==n&&180!==n||(i=r.width),270!==n&&180!==n||(u=r.height),o.translate(i,u),o.rotate(n*Math.PI/180),o.drawImage(t,0,0),$(r,e)},J=function(t,e,n){var r=_(t.width,t.height),o=U(r);return"v"===n?(o.scale(1,-1),o.drawImage(t,0,-r.height)):(o.scale(-1,1),o.drawImage(t,-r.width,0)),$(r,e)},K=function(t,e){return r=e,(n=t).toCanvas().then(function(t){return J(t,n.getType(),r)});var n,r},V=function(t,e){return r=e,(n=t).toCanvas().then(function(t){return G(t,n.getType(),r)});var n,r},W=Object.keys,X=function(e,r,o){return void 0===o&&(o=!1),new x(function(t){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&t({status:n.status,blob:n.response})},n.open("GET",e,!0),n.withCredentials=o,function(t,e){for(var n=W(t),r=0,o=n.length;r<o;r++){var i=n[r];e(t[i],i)}}(r,function(t,e){n.setRequestHeader(e,t)}),n.responseType="blob",n.send()})},Q=[{code:404,message:"Could not find Image Proxy"},{code:403,message:"Rejected request"},{code:0,message:"Incorrect Image Proxy URL"}],Y=[{type:"not_found",message:"Failed to load image."},{type:"key_missing",message:"The request did not include an api key."},{type:"key_not_found",message:"The provided api key could not be found."},{type:"domain_not_trusted",message:"The api key is not valid for the request origins."}],Z=function(t,e){var n,r,o=(n=function(t,e){return I(t)?t[e]:undefined},r=t,function(t,e){for(var n=0,r=t.length;n<r;n++)e(t[n],n)}(e,function(t){r=n(r,t)}),r);return b.from(o)},tt=function(t){var e,n=(e=t,"ImageProxy HTTP error: "+H(Q,function(t){return e===t.code}).fold(h("Unknown ImageProxy error"),function(t){return t.message}));return x.reject(n)},et=function(e){return H(Y,function(t){return t.type===e}).fold(h("Unknown service error"),function(t){return t.message})},nt=function(t){return"ImageProxy Service error: "+function(t){try{return b.some(JSON.parse(t))}catch(e){return b.none()}}(t).bind(function(t){return Z(t,["error","type"]).map(et)}).getOr("Invalid JSON in service error message")},rt=function(t){return r=t,new x(function(t,e){var n=new FileReader;n.onload=function(){t(n.result)},n.onerror=function(t){e(t)},n.readAsText(r)}).then(function(t){var e=nt(t);return x.reject(e)});var r},ot=function(t){return t<200||300<=t},it=function(t,e){var n,r,o,i={"Content-Type":"application/json;charset=UTF-8","tiny-api-key":e};return X((r=e,o=-1===(n=t).indexOf("?")?"?":"&",/[?&]apiKey=/.test(n)?n:n+o+"apiKey="+encodeURIComponent(r)),i).then(function(t){return ot(t.status)?(e=t.status,n=t.blob,r=e,"application/json"!==(null==(o=n)?void 0:o.type)||400!==r&&403!==r&&404!==r&&500!==r?tt(e):rt(n)):x.resolve(t.blob);var e,n,r,o})},ut=function(t,e,n){return void 0===n&&(n=!1),e?it(t,e):X(t,{},n).then(function(t){return ot(t.status)?tt(t.status):x.resolve(t.blob)})},at=z,ct=function(t){if(null===t||t===undefined)throw new Error("Node cannot be null or undefined");return{dom:t}},ft={fromHtml:function(t,e){var n=(e||document).createElement("div");if(n.innerHTML=t,!n.hasChildNodes()||1<n.childNodes.length)throw console.error("HTML does not have a single root node",t),new Error("HTML must have a single root node");return ct(n.childNodes[0])},fromTag:function(t,e){var n=(e||document).createElement(t);return ct(n)},fromText:function(t,e){var n=(e||document).createTextNode(t);return ct(n)},fromDom:ct,fromPoint:function(t,e,n){return b.from(t.dom.elementFromPoint(e,n)).map(ct)}},st=("undefined"!=typeof window||Function("return this;")(),function(t,e){return n=function(t){return function(t,e){var n=t.dom;if(1!==n.nodeType)return!1;var r=n;if(r.matches!==undefined)return r.matches(e);if(r.msMatchesSelector!==undefined)return r.msMatchesSelector(e);if(r.webkitMatchesSelector!==undefined)return r.webkitMatchesSelector(e);if(r.mozMatchesSelector!==undefined)return r.mozMatchesSelector(e);throw new Error("Browser lacks native selectors")}(t,e)},H(t.dom.childNodes,function(t){return n(ft.fromDom(t))}).map(ft.fromDom);var n}),lt=tinymce.util.Tools.resolve("tinymce.util.Delay"),dt=tinymce.util.Tools.resolve("tinymce.util.Promise"),mt=tinymce.util.Tools.resolve("tinymce.util.URI"),ht=function(t){return t.getParam("imagetools_proxy")},gt=function(t){var e=function(t){return/^[0-9\.]+px$/.test(t)},n=t.style.width,r=t.style.height;return n||r?e(n)&&e(r)?{w:parseInt(n,10),h:parseInt(r,10)}:null:(n=t.width,r=t.height,n&&r?{w:parseInt(n,10),h:parseInt(r,10)}:null)},vt=function(t){return{w:t.naturalWidth,h:t.naturalHeight}},pt=0,yt=function(t){return st(ft.fromDom(t),"img")},wt=function(t,e){return t.dom.is(e,"figure")},bt=function(t,e){return t.dom.is(e,"img:not([data-mce-object],[data-mce-placeholder])")},It=function(e,t){var n=function(t){return bt(e,t)&&(Ut(e,t)||At(e,t)||I(ht(e)))};return wt(e,t)?yt(t).bind(function(t){return n(t.dom)?b.some(t.dom):b.none()}):n(t)?b.some(t):b.none()},Tt=function(t,e){t.notificationManager.open({text:e,type:"error"})},_t=function(t){var e=t.selection.getNode(),n=t.dom.getParent(e,"figure.image");return null!==n&&wt(t,n)?yt(n):bt(t,e)?b.some(ft.fromDom(e)):b.none()},Rt=function(t,e,n){var r=e.match(/(?:\/|^)(([^\/\?]+)\.(?:[a-z0-9.]+))(?:\?|$)/i);return I(r)?t.dom.encode(r[n]):null},Ut=function(t,e){var n=e.src;return 0===n.indexOf("data:")||0===n.indexOf("blob:")||new mt(n).host===t.documentBaseURI.host},At=function(t,e){return-1!==d.inArray(t.getParam("imagetools_cors_hosts",[],"string[]"),new mt(e.src).host)},xt=function(t,e){if(At(t,e))return ut(e.src,null,(n=t,r=e,-1!==d.inArray(n.getParam("imagetools_credentials_hosts",[],"string[]"),new mt(r.src).host)));var n,r,o;if(Ut(t,e))return F(e);var i=ht(t),u=i+(-1===i.indexOf("?")?"?":"&")+"url="+encodeURIComponent(e.src),a=(o=t).getParam("api_key",o.getParam("imagetools_api_key","","string"),"string");return ut(u,a,!1)},Et=function(t,e){return n=t,b.from(n.getParam("imagetools_fetch_image",null,"function")).fold(function(){return xt(t,e)},function(t){return t(e)});var n},Lt=function(t,e){var n=t.editorUpload.blobCache.getByUri(e.src);return n?dt.resolve(n.blob()):Et(t,e)},jt=function(t){lt.clearTimeout(t.get())},kt=function(a,c,f,s,l,d,m){return f.toBlob().then(function(t){var e,n,o,r=a.editorUpload.blobCache,i=d.src,u=c.type===t.type;return a.getParam("images_reuse_filename",!1,"boolean")&&(o=r.getByUri(i),n=I(o)?(i=o.uri(),e=o.name(),o.filename()):(e=Rt(a,i,2),Rt(a,i,1))),o=r.create({id:"imagetools"+pt++,blob:t,base64:f.toBase64(),uri:i,name:e,filename:u?n:undefined}),r.add(o),a.undoManager.transact(function(){var r=function(){var t,e,n;a.$(d).off("load",r),a.nodeChanged(),s?a.editorUpload.uploadImagesAuto():(jt(l),t=a,e=l,n=lt.setEditorTimeout(t,function(){t.editorUpload.uploadImagesAuto()},t.getParam("images_upload_timeout",3e4,"number")),e.set(n))};a.$(d).on("load",r),m&&a.$(d).attr({width:m.w,height:m.h}),a.$(d).attr({src:o.blobUri()}).removeAttr("data-mce-src")}),o})},Ct=function(r,o,t,i){return function(){return _t(r).fold(function(){Tt(r,"Could not find selected image")},function(n){return r._scanForImages().then(function(){return Lt(r,n.dom)}).then(function(e){return at(e).then(t).then(function(t){return kt(r,e,t,!1,o,n.dom,i)})})["catch"](function(t){Tt(r,t)})})}},Ot=function(e,n,r){return function(){var t=_t(e).fold(function(){return null},function(t){var e=gt(t.dom);return e?{w:e.h,h:e.w}:null});return Ct(e,n,function(t){return V(t,r)},t)()}},Pt=function(t,e,n){return function(){return Ct(t,e,function(t){return K(t,n)})()}},St=function(e,n,u,a,c){return D(c).then(function(t){var e,n,r,o,i=vt(t);return a.w===i.w&&a.h===i.h||gt(u)&&(e=u,(n=i)&&(r=e.style.width,o=e.style.height,(r||o)&&(e.style.width=n.w+"px",e.style.height=n.h+"px",e.removeAttribute("data-mce-style")),r=e.width,o=e.height,(r||o)&&(e.setAttribute("width",String(n.w)),e.setAttribute("height",String(n.h))))),URL.revokeObjectURL(t.src),c}).then(at).then(function(t){return kt(e,c,t,!0,n,u)})},Mt=function(i,u){return function(){var r=_t(i),o=r.map(function(t){return vt(t.dom)});r.each(function(e){It(i,e.dom).each(function(t){Lt(i,e.dom).then(function(t){var e,n={blob:e=t,url:URL.createObjectURL(e)};i.windowManager.open({title:"Edit Image",size:"large",body:{type:"panel",items:[{type:"imagetools",name:"imagetools",label:"Edit Image",currentState:n}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0,disabled:!0}],onSubmit:function(t){var n=t.getData().imagetools.blob;r.each(function(e){o.each(function(t){St(i,u,e.dom,t,n)})}),t.close()},onCancel:m,onAction:function(t,e){switch(e.name){case"save-state":e.value?t.enable("save"):t.disable("save");break;case"disable":t.disable("save"),t.disable("cancel");break;case"enable":t.enable("cancel")}}})})})})}};s.add("imagetools",function(t){var n,e,r,o,i,u,a,c,f=l(0),s=l(null);n=t,e=f,d.each({mceImageRotateLeft:Ot(n,e,-90),mceImageRotateRight:Ot(n,e,90),mceImageFlipVertical:Pt(n,e,"v"),mceImageFlipHorizontal:Pt(n,e,"h"),mceEditImage:Mt(n,e)},function(t,e){n.addCommand(e,t)}),o=function(t){return function(){return r.execCommand(t)}},(r=t).ui.registry.addButton("rotateleft",{tooltip:"Rotate counterclockwise",icon:"rotate-left",onAction:o("mceImageRotateLeft")}),r.ui.registry.addButton("rotateright",{tooltip:"Rotate clockwise",icon:"rotate-right",onAction:o("mceImageRotateRight")}),r.ui.registry.addButton("flipv",{tooltip:"Flip vertically",icon:"flip-vertically",onAction:o("mceImageFlipVertical")}),r.ui.registry.addButton("fliph",{tooltip:"Flip horizontally",icon:"flip-horizontally",onAction:o("mceImageFlipHorizontal")}),r.ui.registry.addButton("editimage",{tooltip:"Edit image",icon:"edit-image",onAction:o("mceEditImage"),onSetup:function(e){var t=function(){var t=_t(r).forall(function(t){return It(r,t.dom).isNone()});e.setDisabled(t)};return r.on("NodeChange",t),function(){r.off("NodeChange",t)}}}),r.ui.registry.addButton("imageoptions",{tooltip:"Image options",icon:"image",onAction:o("mceImage")}),r.ui.registry.addContextMenu("imagetools",{update:function(t){return It(r,t).fold(function(){return[]},function(t){return[{text:"Edit image",icon:"edit-image",onAction:o("mceEditImage")}]})}}),(i=t).ui.registry.addContextToolbar("imagetools",{items:i.getParam("imagetools_toolbar","rotateleft rotateright flipv fliph editimage imageoptions"),predicate:function(t){return It(i,t).isSome()},position:"node",scope:"node"}),a=f,c=s,(u=t).on("NodeChange",function(t){var e=c.get(),n=It(u,t.element);e&&!n.exists(function(t){return e.src===t.src})&&(jt(a),u.editorUpload.uploadImagesAuto(),c.set(null)),n.each(c.set)})})}();