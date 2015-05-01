//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=d(e,i,4);var o=!w(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=b(r,e);for(var u=null!=t&&t.length,i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t){var r=S.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||o,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=S[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var e=this,u=e._,i=Array.prototype,o=Object.prototype,a=Function.prototype,c=i.push,l=i.slice,f=o.toString,s=o.hasOwnProperty,p=Array.isArray,h=Object.keys,v=a.bind,g=Object.create,y=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):e._=m,m.VERSION="1.8.2";var d=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},b=function(n,t,r){return null==n?m.identity:m.isFunction(n)?d(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return b(n,t,1/0)};var x=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var l=o[c];t&&r[l]!==void 0||(r[l]=i[l])}return r}},_=function(n){if(!m.isObject(n))return{};if(g)return g(n);y.prototype=n;var t=new y;return y.prototype=null,t},j=Math.pow(2,53)-1,w=function(n){var t=n&&n.length;return"number"==typeof t&&t>=0&&j>=t};m.each=m.forEach=function(n,t,r){t=d(t,r);var e,u;if(w(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=w(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=b(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(b(t)),r)},m.every=m.all=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=b(t,r);for(var e=!w(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r){return w(n)||(n=m.values(n)),m.indexOf(n,t,"number"==typeof r&&r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=w(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=b(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=w(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(w(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=b(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var A=function(n){return function(t,r,e){var u={};return r=b(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=A(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=A(function(n,t,r){n[r]=t}),m.countBy=A(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):w(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:w(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=b(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var k=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=n&&n.length;a>o;o++){var c=n[o];if(w(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=k(c,t,r));var l=0,f=c.length;for(u.length+=f;f>l;)u[i++]=c[l++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return k(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){if(null==n)return[];m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=b(r,e));for(var u=[],i=[],o=0,a=n.length;a>o;o++){var c=n[o],l=r?r(c,o,n):c;t?(o&&i===l||u.push(c),i=l):r?m.contains(i,l)||(i.push(l),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(k(arguments,!0,!0))},m.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=k(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,"length").length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=n&&n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.indexOf=function(n,t,r){var e=0,u=n&&n.length;if("number"==typeof r)e=0>r?Math.max(0,u+r):r;else if(r&&u)return e=m.sortedIndex(n,t),n[e]===t?e:-1;if(t!==t)return m.findIndex(l.call(n,e),m.isNaN);for(;u>e;e++)if(n[e]===t)return e;return-1},m.lastIndexOf=function(n,t,r){var e=n?n.length:0;if("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1)),t!==t)return m.findLastIndex(l.call(n,0,e),m.isNaN);for(;--e>=0;)if(n[e]===t)return e;return-1},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=b(r,e,1);for(var u=r(t),i=0,o=n.length;o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var O=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=_(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(v&&n.bind===v)return v.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return O(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return O(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var l=m.now();a||r.leading!==!1||(a=l);var f=t-(l-a);return e=this,u=arguments,0>=f||f>t?(o&&(clearTimeout(o),o=null),a=l,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,f)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var l=m.now()-o;t>l&&l>=0?e=setTimeout(c,t-l):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var F=!{toString:null}.propertyIsEnumerable("toString"),S=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(h)return h(n);var t=[];for(var e in n)m.has(n,e)&&t.push(e);return F&&r(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var e in n)t.push(e);return F&&r(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=x(m.allKeys),m.extendOwn=m.assign=x(m.keys),m.findKey=function(n,t,r){t=b(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=d(t,r)):(u=k(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var l=u[a],f=o[l];e(f,l,o)&&(i[l]=f)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(k(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=x(m.allKeys,!0),m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var E=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=f.call(n);if(u!==f.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!E(n[c],t[c],r,e))return!1}else{var l,s=m.keys(n);if(c=s.length,m.keys(t).length!==c)return!1;for(;c--;)if(l=s[c],!m.has(t,l)||!E(n[l],t[l],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return E(n,t)},m.isEmpty=function(n){return null==n?!0:w(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=p||function(n){return"[object Array]"===f.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return f.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===f.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&s.call(n,t)},m.noConflict=function(){return e._=u,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=function(n){return function(t){return null==t?void 0:t[n]}},m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=d(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var M={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},N=m.invert(M),I=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=I(M),m.unescape=I(N),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var B=0;m.uniqueId=function(n){var t=++B+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var T=/(.)^/,R={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},q=/\\|'|\r|\n|\u2028|\u2029/g,K=function(n){return"\\"+R[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||T).source,(t.interpolate||T).source,(t.evaluate||T).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(q,K),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},l=t.variable||"obj";return c.source="function("+l+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var z=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return c.apply(n,arguments),z(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=i[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],z(this,r)}}),m.each(["concat","join","slice"],function(n){var t=i[n];m.prototype[n]=function(){return z(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
/*! jQuery v2.1.3 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=hb(),z=hb(),A=hb(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},eb=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fb){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function gb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+rb(o[l]);w=ab.test(a)&&pb(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function hb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ib(a){return a[u]=!0,a}function jb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function kb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function lb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function nb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function ob(a){return ib(function(b){return b=+b,ib(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pb(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=gb.support={},f=gb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=gb.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",eb,!1):e.attachEvent&&e.attachEvent("onunload",eb)),p=!f(g),c.attributes=jb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=jb(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=jb(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(jb(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),jb(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&jb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return lb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?lb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},gb.matches=function(a,b){return gb(a,null,null,b)},gb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return gb(b,n,null,[a]).length>0},gb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},gb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},gb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},gb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=gb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=gb.selectors={cacheLength:50,createPseudo:ib,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||gb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&gb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=gb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||gb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ib(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ib(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ib(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ib(function(a){return function(b){return gb(a,b).length>0}}),contains:ib(function(a){return a=a.replace(cb,db),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ib(function(a){return W.test(a||"")||gb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:ob(function(){return[0]}),last:ob(function(a,b){return[b-1]}),eq:ob(function(a,b,c){return[0>c?c+b:c]}),even:ob(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:ob(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:ob(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:ob(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=mb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=nb(b);function qb(){}qb.prototype=d.filters=d.pseudos,d.setFilters=new qb,g=gb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?gb.error(a):z(a,i).slice(0)};function rb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function tb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ub(a,b,c){for(var d=0,e=b.length;e>d;d++)gb(a,b[d],c);return c}function vb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wb(a,b,c,d,e,f){return d&&!d[u]&&(d=wb(d)),e&&!e[u]&&(e=wb(e,f)),ib(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ub(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:vb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=vb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=vb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sb(function(a){return a===b},h,!0),l=sb(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sb(tb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wb(i>1&&tb(m),i>1&&rb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xb(a.slice(i,e)),f>e&&xb(a=a.slice(e)),f>e&&rb(a))}m.push(c)}return tb(m)}function yb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=vb(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&gb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ib(f):f}return h=gb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,yb(e,d)),f.selector=a}return f},i=gb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&pb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&rb(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&pb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=jb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),jb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||kb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&jb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||kb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),jb(function(a){return null==a.getAttribute("disabled")})||kb(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),gb}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)
},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(ob(c,"script"),kb),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(hb,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function tb(a){var b=l,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:"0",fontWeight:"400"},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fb(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fb(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?zb.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=yb(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(n.cssHooks[a+b].set=Gb)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}n.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Kb.prototype.init,n.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=n.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||tb(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?tb(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ub(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return n.map(k,Ub,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xb,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xb(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),n.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Lb=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Lb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Mb||(Mb=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Mb),Mb=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Yb,Zb,$b=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))
},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||n.find.attr;$b[b]=function(a,b,d){var e,f;return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=n.now(),dc=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var ec=/#.*$/,fc=/([?&])_=[^&]*/,gc=/^(.*?):[ \t]*([^\r\n]*)$/gm,hc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ic=/^(?:GET|HEAD)$/,jc=/^\/\//,kc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lc={},mc={},nc="*/".concat("*"),oc=a.location.href,pc=kc.exec(oc.toLowerCase())||[];function qc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rc(a,b,c,d){var e={},f=a===mc;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sc(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function uc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:oc,type:"GET",isLocal:hc.test(pc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sc(sc(a,n.ajaxSettings),b):sc(n.ajaxSettings,a)},ajaxPrefilter:qc(lc),ajaxTransport:qc(mc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gc.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||oc)+"").replace(ec,"").replace(jc,pc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pc[1]&&h[2]===pc[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pc[3]||("http:"===pc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rc(lc,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ic.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fc.test(d)?d.replace(fc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rc(mc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tc(k,v,f)),u=uc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vc=/%20/g,wc=/\[\]$/,xc=/\r?\n/g,yc=/^(?:submit|button|image|reset|file)$/i,zc=/^(?:input|select|textarea|keygen)/i;function Ac(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wc.test(a)?d(a,e):Ac(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ac(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ac(c,a[c],b,e);return d.join("&").replace(vc,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zc.test(this.nodeName)&&!yc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xc,"\r\n")}}):{name:b.name,value:c.replace(xc,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bc=0,Cc={},Dc={0:200,1223:204},Ec=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cc)Cc[a]()}),k.cors=!!Ec&&"withCredentials"in Ec,k.ajax=Ec=!!Ec,n.ajaxTransport(function(a){var b;return k.cors||Ec&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Dc[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cc[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fc=[],Gc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fc.pop()||n.expando+"_"+cc++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hc)return Hc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ic=a.document.documentElement;function Jc(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ic;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ic})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=yb(k.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kc=a.jQuery,Lc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lc),b&&a.jQuery===n&&(a.jQuery=Kc),n},typeof b===U&&(a.jQuery=a.$=n),n});
//# sourceMappingURL=jquery.min.map
(function(t,e){if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,s){t.Backbone=e(t,s,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore");e(t,exports,i)}else{t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}})(this,function(t,e,i,r){var s=t.Backbone;var n=[];var a=n.push;var o=n.slice;var h=n.splice;e.VERSION="1.1.2";e.$=r;e.noConflict=function(){t.Backbone=s;return this};e.emulateHTTP=false;e.emulateJSON=false;var u=e.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,r){if(!c(this,"once",t,[e,r])||!e)return this;var s=this;var n=i.once(function(){s.off(t,n);e.apply(this,arguments)});n._callback=e;return this.on(t,n,r)},off:function(t,e,r){var s,n,a,o,h,u,l,f;if(!this._events||!c(this,"off",t,[e,r]))return this;if(!t&&!e&&!r){this._events=void 0;return this}o=t?[t]:i.keys(this._events);for(h=0,u=o.length;h<u;h++){t=o[h];if(a=this._events[t]){this._events[t]=s=[];if(e||r){for(l=0,f=a.length;l<f;l++){n=a[l];if(e&&e!==n.callback&&e!==n.callback._callback||r&&r!==n.context){s.push(n)}}}if(!s.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=o.call(arguments,1);if(!c(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)f(i,e);if(r)f(r,arguments);return this},stopListening:function(t,e,r){var s=this._listeningTo;if(!s)return this;var n=!e&&!r;if(!r&&typeof e==="object")r=this;if(t)(s={})[t._listenId]=t;for(var a in s){t=s[a];t.off(e,r,this);if(n||i.isEmpty(t._events))delete this._listeningTo[a]}return this}};var l=/\s+/;var c=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(l.test(i)){var n=i.split(l);for(var a=0,o=n.length;a<o;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var f=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,o);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e);return}};var d={listenTo:"on",listenToOnce:"once"};i.each(d,function(t,e){u[e]=function(e,r,s){var n=this._listeningTo||(this._listeningTo={});var a=e._listenId||(e._listenId=i.uniqueId("l"));n[a]=e;if(!s&&typeof r==="object")s=this;e[t](r,s,this);return this}});u.bind=u.on;u.unbind=u.off;i.extend(e,u);var p=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(p.prototype,u,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,r){var s,n,a,o,h,u,l,c;if(t==null)return this;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;a=r.unset;h=r.silent;o=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=i.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in n)this.id=n[this.idAttribute];for(s in n){e=n[s];if(!i.isEqual(c[s],e))o.push(s);if(!i.isEqual(l[s],e)){this.changed[s]=e}else{delete this.changed[s]}a?delete c[s]:c[s]=e}if(!h){if(o.length)this._pending=r;for(var f=0,d=o.length;f<d;f++){this.trigger("change:"+o[f],this,c[o[f]],r)}}if(u)return this;if(!h){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e,r=false;var s=this._changing?this._previousAttributes:this.attributes;for(var n in t){if(i.isEqual(s[n],e=t[n]))continue;(r||(r={}))[n]=e}return r},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var r=t.success;t.success=function(i){if(!e.set(e.parse(i,t),t))return false;if(r)r(e,i,t);e.trigger("sync",e,i,t)};q(this,t);return this.sync("read",this,t)},save:function(t,e,r){var s,n,a,o=this.attributes;if(t==null||typeof t==="object"){s=t;r=e}else{(s={})[t]=e}r=i.extend({validate:true},r);if(s&&!r.wait){if(!this.set(s,r))return false}else{if(!this._validate(s,r))return false}if(s&&r.wait){this.attributes=i.extend({},o,s)}if(r.parse===void 0)r.parse=true;var h=this;var u=r.success;r.success=function(t){h.attributes=o;var e=h.parse(t,r);if(r.wait)e=i.extend(s||{},e);if(i.isObject(e)&&!h.set(e,r)){return false}if(u)u(h,t,r);h.trigger("sync",h,t,r)};q(this,r);n=this.isNew()?"create":r.patch?"patch":"update";if(n==="patch")r.attrs=s;a=this.sync(n,this,r);if(s&&r.wait)this.attributes=o;return a},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var s=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(t.wait||e.isNew())s();if(r)r(e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};if(this.isNew()){t.success();return false}q(this,t);var n=this.sync("delete",this,t);if(!t.wait)s();return n},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||M();if(this.isNew())return t;return t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var v=["keys","values","pairs","invert","pick","omit"];i.each(v,function(t){p.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.attributes);return i[t].apply(i,e)}});var g=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var m={add:true,remove:true,merge:true};var y={add:true,remove:false};i.extend(g.prototype,u,{model:p,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,y))},remove:function(t,e){var r=!i.isArray(t);t=r?[t]:i.clone(t);e||(e={});var s,n,a,o;for(s=0,n=t.length;s<n;s++){o=t[s]=this.get(t[s]);if(!o)continue;delete this._byId[o.id];delete this._byId[o.cid];a=this.indexOf(o);this.models.splice(a,1);this.length--;if(!e.silent){e.index=a;o.trigger("remove",o,this,e)}this._removeReference(o,e)}return r?t[0]:t},set:function(t,e){e=i.defaults({},e,m);if(e.parse)t=this.parse(t,e);var r=!i.isArray(t);t=r?t?[t]:[]:i.clone(t);var s,n,a,o,h,u,l;var c=e.at;var f=this.model;var d=this.comparator&&c==null&&e.sort!==false;var v=i.isString(this.comparator)?this.comparator:null;var g=[],y=[],_={};var b=e.add,w=e.merge,x=e.remove;var E=!d&&b&&x?[]:false;for(s=0,n=t.length;s<n;s++){h=t[s]||{};if(h instanceof p){a=o=h}else{a=h[f.prototype.idAttribute||"id"]}if(u=this.get(a)){if(x)_[u.cid]=true;if(w){h=h===o?o.attributes:h;if(e.parse)h=u.parse(h,e);u.set(h,e);if(d&&!l&&u.hasChanged(v))l=true}t[s]=u}else if(b){o=t[s]=this._prepareModel(h,e);if(!o)continue;g.push(o);this._addReference(o,e)}o=u||o;if(E&&(o.isNew()||!_[o.id]))E.push(o);_[o.id]=true}if(x){for(s=0,n=this.length;s<n;++s){if(!_[(o=this.models[s]).cid])y.push(o)}if(y.length)this.remove(y,e)}if(g.length||E&&E.length){if(d)l=true;this.length+=g.length;if(c!=null){for(s=0,n=g.length;s<n;s++){this.models.splice(c+s,0,g[s])}}else{if(E)this.models.length=0;var k=E||g;for(s=0,n=k.length;s<n;s++){this.models.push(k[s])}}}if(l)this.sort({silent:true});if(!e.silent){for(s=0,n=g.length;s<n;s++){(o=g[s]).trigger("add",o,this,e)}if(l||E&&E.length)this.trigger("sort",this,e)}return r?t[0]:t},reset:function(t,e){e||(e={});for(var r=0,s=this.models.length;r<s;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return o.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){if(i.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(i.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(i.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var r=this;t.success=function(i){var s=t.reset?"reset":"set";r[s](i,t);if(e)e(r,i,t);r.trigger("sync",r,i,t)};q(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var r=this;var s=e.success;e.success=function(t,i){if(e.wait)r.add(t,e);if(s)s(t,i,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof p)return t;e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_addReference:function(t,e){this._byId[t.cid]=t;if(t.id!=null)this._byId[t.id]=t;if(!t.collection)t.collection=this;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];i.each(_,function(t){g.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.models);return i[t].apply(i,e)}});var b=["groupBy","countBy","sortBy","indexBy"];i.each(b,function(t){g.prototype[t]=function(e,r){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,r)}});var w=e.View=function(t){this.cid=i.uniqueId("view");t||(t={});i.extend(this,i.pick(t,E));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var x=/^(\S+)\s*(.*)$/;var E=["model","collection","el","id","attributes","className","tagName","events"];i.extend(w.prototype,u,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,i){if(this.$el)this.undelegateEvents();this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0];if(i!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=i.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[t[e]];if(!r)continue;var s=e.match(x);var n=s[1],a=s[2];r=i.bind(r,this);n+=".delegateEvents"+this.cid;if(a===""){this.$el.on(n,r)}else{this.$el.on(n,a,r)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");var r=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(r,false)}else{this.setElement(i.result(this,"el"),false)}}});e.sync=function(t,r,s){var n=T[t];i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:n,dataType:"json"};if(!s.url){a.url=i.result(r,"url")||M()}if(s.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(s.attrs||r.toJSON(s))}if(s.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(s.emulateHTTP&&(n==="PUT"||n==="DELETE"||n==="PATCH")){a.type="POST";if(s.emulateJSON)a.data._method=n;var o=s.beforeSend;s.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!s.emulateJSON){a.processData=false}if(a.type==="PATCH"&&k){a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var h=s.xhr=e.ajax(i.extend(a,s));r.trigger("request",r,h,s);return h};var k=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent);var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var S=/\((.*?)\)/g;var H=/(\(\?)?:\w+/g;var A=/\*\w+/g;var I=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,u,{initialize:function(){},route:function(t,r,s){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){s=r;r=""}if(!s)s=this[r];var n=this;e.history.route(t,function(i){var a=n._extractParameters(t,i);n.execute(s,a);n.trigger.apply(n,["route:"+r].concat(a));n.trigger("route",r,a);e.history.trigger("route",n,r,a)});return this},execute:function(t,e){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(I,"\\$&").replace(S,"(?:$1)?").replace(H,function(t,e){return e?t:"([^/?]+)"}).replace(A,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var N=e.History=function(){this.handlers=[];i.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var R=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var P=/msie [\w.]+/;var C=/\/$/;var j=/#.*$/;N.started=false;i.extend(N.prototype,u,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=decodeURI(this.location.pathname+this.location.search);var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.slice(i.length)}else{t=this.getHash()}}return t.replace(R,"")},start:function(t){if(N.started)throw new Error("Backbone.history has already been started");N.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var r=this.getFragment();var s=document.documentMode;var n=P.exec(navigator.userAgent.toLowerCase())&&(!s||s<=7);this.root=("/"+this.root+"/").replace(O,"/");if(n&&this._wantsHashChange){var a=e.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=a.hide().appendTo("body")[0].contentWindow;this.navigate(r)}if(this._hasPushState){e.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!n){e.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=r;var o=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){this.fragment=this.getFragment(null,true);this.location.replace(this.root+"#"+this.fragment);return true}else if(this._hasPushState&&this.atRoot()&&o.hash){this.fragment=this.getHash().replace(R,"");this.history.replaceState({},document.title,this.root+this.fragment)}}if(!this.options.silent)return this.loadUrl()},stop:function(){e.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);N.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return i.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!N.started)return false;if(!e||e===true)e={trigger:!!e};var i=this.root+(t=this.getFragment(t||""));t=t.replace(j,"");if(this.fragment===t)return;this.fragment=t;if(t===""&&i!=="/")i=i.slice(0,-1);if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new N;var U=function(t,e){var r=this;var s;if(t&&i.has(t,"constructor")){s=t.constructor}else{s=function(){return r.apply(this,arguments)}}i.extend(s,r,e);var n=function(){this.constructor=s};n.prototype=r.prototype;s.prototype=new n;if(t)i.extend(s.prototype,t);s.__super__=r.prototype;return s};p.extend=g.extend=$.extend=w.extend=N.extend=U;var M=function(){throw new Error('A "url" property or function must be specified')};var q=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map
/**
 * Backbone-Nested 2.0.1 - An extension of Backbone.js that keeps track of nested attributes
 *
 * http://afeld.github.com/backbone-nested/
 *
 * Copyright (c) 2011-2012 Aidan Feldman
 * MIT Licensed (LICENSE)
 */
/*global define, require, module */
(function(root, factory){
  if (typeof exports !== 'undefined') {
      // Define as CommonJS export:
      module.exports = factory(require("jquery"), require("underscore"), require("backbone"));
  } else if (typeof define === 'function' && define.amd) {
      // Define as AMD:
      define(["jquery", "underscore", "backbone"], factory);
  } else {
      // Just run it:
      factory(root.$, root._, root.Backbone);
  }
}(this, function($, _, Backbone) {
  'use strict';

  var _delayedTriggers = [],
    nestedChanges;

  Backbone.NestedModel = Backbone.Model.extend({

    get: function(attrStrOrPath){
      var attrPath = Backbone.NestedModel.attrPath(attrStrOrPath),
        result;

      Backbone.NestedModel.walkPath(this.attributes, attrPath, function(val, path){
        var attr = _.last(path);
        if (path.length === attrPath.length){
          // attribute found
          result = val[attr];
        }
      });

      return result;
    },

    has: function(attr){
      // for some reason this is not how Backbone.Model is implemented - it accesses the attributes object directly
      var result = this.get(attr);
      return !(result === null || _.isUndefined(result));
    },

    set: function(key, value, opts){
      var newAttrs = Backbone.NestedModel.deepClone(this.attributes),
        attrPath,
        unsetObj,
        validated;

      if (_.isString(key)){
        // Backbone 0.9.0+ syntax: `model.set(key, val)` - convert the key to an attribute path
        attrPath = Backbone.NestedModel.attrPath(key);
      } else if (_.isArray(key)){
        // attribute path
        attrPath = key;
      }

      if (attrPath){
        opts = opts || {};
        this._setAttr(newAttrs, attrPath, value, opts);
      } else { // it's an Object
        opts = value || {};
        var attrs = key;
        for (var _attrStr in attrs) {
          if (attrs.hasOwnProperty(_attrStr)) {
            this._setAttr(newAttrs,
                          Backbone.NestedModel.attrPath(_attrStr),
                          opts.unset ? void 0 : attrs[_attrStr],
                          opts);
          }
        }
      }

      nestedChanges = Backbone.NestedModel.__super__.changedAttributes.call(this);

      if (opts.unset && attrPath && attrPath.length === 1){ // assume it is a singular attribute being unset
        // unsetting top-level attribute
        unsetObj = {};
        unsetObj[key] = void 0;
        nestedChanges = _.omit(nestedChanges, _.keys(unsetObj));
        validated = Backbone.NestedModel.__super__.set.call(this, unsetObj, opts);
      } else {
        unsetObj = newAttrs;

        // normal set(), or an unset of nested attribute
        if (opts.unset && attrPath){
          // make sure Backbone.Model won't unset the top-level attribute
          opts = _.extend({}, opts);
          delete opts.unset;
        } else if (opts.unset && _.isObject(key)) {
          unsetObj = key;
        }
        nestedChanges = _.omit(nestedChanges, _.keys(unsetObj));
        validated = Backbone.NestedModel.__super__.set.call(this, unsetObj, opts);
      }


      if (!validated){
        // reset changed attributes
        this.changed = {};
        nestedChanges = {};
        return false;
      }


      this._runDelayedTriggers();
      return this;
    },

    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    clear: function(options) {
      nestedChanges = {};

      // Mostly taken from Backbone.Model.set, modified to work for NestedModel.
      options = options || {};
      // clone attributes so validate method can't mutate it from underneath us.
      var attrs = _.clone(this.attributes);
      if (!options.silent && this.validate && !this.validate(attrs, options)) {
        return false; // Should maybe return this instead?
      }

      var changed = this.changed = {};
      var model = this;

      var setChanged = function(obj, prefix, options) {
        // obj will be an Array or an Object
        _.each(obj, function(val, attr){
          var changedPath = prefix;
          if (_.isArray(obj)){
            // assume there is a prefix
            changedPath += '[' + attr + ']';
          } else if (prefix){
            changedPath += '.' + attr;
          } else {
            changedPath = attr;
          }

          val = obj[attr];
          if (_.isObject(val)) { // clear child attrs
            setChanged(val, changedPath, options);
          }
          if (!options.silent) model._delayedChange(changedPath, null, options);
          changed[changedPath] = null;
        });
      };
      setChanged(this.attributes, '', options);

      this.attributes = {};

      // Fire the `"change"` events.
      if (!options.silent) this._delayedTrigger('change');

      this._runDelayedTriggers();
      return this;
    },

    add: function(attrStr, value, opts){
      var current = this.get(attrStr);
      if (!_.isArray(current)) throw new Error('current value is not an array');
      return this.set(attrStr + '[' + current.length + ']', value, opts);
    },

    remove: function(attrStr, opts){
      opts = opts || {};

      var attrPath = Backbone.NestedModel.attrPath(attrStr),
        aryPath = _.initial(attrPath),
        val = this.get(aryPath),
        i = _.last(attrPath);

      if (!_.isArray(val)){
        throw new Error("remove() must be called on a nested array");
      }

      // only trigger if an element is actually being removed
      var trigger = !opts.silent && (val.length >= i + 1),
        oldEl = val[i];

      // remove the element from the array
      val.splice(i, 1);
      opts.silent = true; // Triggers should only be fired in trigger section below
      this.set(aryPath, val, opts);

      if (trigger){
        attrStr = Backbone.NestedModel.createAttrStr(aryPath);
        this.trigger('remove:' + attrStr, this, oldEl);
        for (var aryCount = aryPath.length; aryCount >= 1; aryCount--) {
          attrStr = Backbone.NestedModel.createAttrStr(_.first(aryPath, aryCount));
          this.trigger('change:' + attrStr, this, oldEl);
        }
        this.trigger('change', this, oldEl);
      }

      return this;
    },

    changedAttributes: function(diff) {
      var backboneChanged = Backbone.NestedModel.__super__.changedAttributes.call(this, diff);
      if (_.isObject(backboneChanged)) {
        return _.extend({}, nestedChanges, backboneChanged);
      }
      return false;
    },

    toJSON: function(){
      return Backbone.NestedModel.deepClone(this.attributes);
    },


    // private
    _delayedTrigger: function(/* the trigger args */){
      _delayedTriggers.push(arguments);
    },

    _delayedChange: function(attrStr, newVal, options){
      this._delayedTrigger('change:' + attrStr, this, newVal, options);

      // Check if `change` even *exists*, as it won't when the model is
      // freshly created.
      if (!this.changed) {
        this.changed = {};
      }

      this.changed[attrStr] = newVal;
    },

    _runDelayedTriggers: function(){
      while (_delayedTriggers.length > 0){
        this.trigger.apply(this, _delayedTriggers.shift());
      }
    },

    // note: modifies `newAttrs`
    _setAttr: function(newAttrs, attrPath, newValue, opts){
      opts = opts || {};

      var fullPathLength = attrPath.length;
      var model = this;

      Backbone.NestedModel.walkPath(newAttrs, attrPath, function(val, path, next){
        var attr = _.last(path);
        var attrStr = Backbone.NestedModel.createAttrStr(path);

        // See if this is a new value being set
        var isNewValue = !_.isEqual(val[attr], newValue);

        if (path.length === fullPathLength){
          // reached the attribute to be set

          if (opts.unset){
            // unset the value
            delete val[attr];

            // Trigger Remove Event if array being set to null
            if (_.isArray(val)){
              var parentPath = Backbone.NestedModel.createAttrStr(_.initial(attrPath));
              model._delayedTrigger('remove:' + parentPath, model, val[attr]);
            }
          } else {
            // Set the new value
            val[attr] = newValue;
          }

          // Trigger Change Event if new values are being set
          if (!opts.silent && _.isObject(newValue) && isNewValue){
            var visited = [];
            var checkChanges = function(obj, prefix) {
              // Don't choke on circular references
              if(_.indexOf(visited, obj) > -1) {
                return;
              } else {
                visited.push(obj);
              }

              var nestedAttr, nestedVal;
              for (var a in obj){
                if (obj.hasOwnProperty(a)) {
                  nestedAttr = prefix + '.' + a;
                  nestedVal = obj[a];
                  if (!_.isEqual(model.get(nestedAttr), nestedVal)) {
                    model._delayedChange(nestedAttr, nestedVal, opts);
                  }
                  if (_.isObject(nestedVal)) {
                    checkChanges(nestedVal, nestedAttr);
                  }
                }
              }
            };
            checkChanges(newValue, attrStr);

          }


        } else if (!val[attr]){
          if (_.isNumber(next)){
            val[attr] = [];
          } else {
            val[attr] = {};
          }
        }

        if (!opts.silent){
          // let the superclass handle change events for top-level attributes
          if (path.length > 1 && isNewValue){
            model._delayedChange(attrStr, val[attr], opts);
          }

          if (_.isArray(val[attr])){
            model._delayedTrigger('add:' + attrStr, model, val[attr]);
          }
        }
      });
    }

  }, {
    // class methods

    attrPath: function(attrStrOrPath){
      var path;

      if (_.isString(attrStrOrPath)){
        // TODO this parsing can probably be more efficient
        path = (attrStrOrPath === '') ? [''] : attrStrOrPath.match(/[^\.\[\]]+/g);
        path = _.map(path, function(val){
          // convert array accessors to numbers
          return val.match(/^\d+$/) ? parseInt(val, 10) : val;
        });
      } else {
        path = attrStrOrPath;
      }

      return path;
    },

    createAttrStr: function(attrPath){
      var attrStr = attrPath[0];
      _.each(_.rest(attrPath), function(attr){
        attrStr += _.isNumber(attr) ? ('[' + attr + ']') : ('.' + attr);
      });

      return attrStr;
    },

    deepClone: function(obj){
      return $.extend(true, {}, obj);
    },

    walkPath: function(obj, attrPath, callback, scope){
      var val = obj,
        childAttr;

      // walk through the child attributes
      for (var i = 0; i < attrPath.length; i++){
        callback.call(scope || this, val, attrPath.slice(0, i + 1), attrPath[i + 1]);

        childAttr = attrPath[i];
        val = val[childAttr];
        if (!val) break; // at the leaf
      }
    }

  });

  return Backbone;
}));

// Backbone.Stickit v0.8.0, MIT Licensed
// Copyright (c) 2012 The New York Times, CMS Group, Matthew DeLambo <delambo@gmail.com>

(function (factory) {

  // Set up Stickit appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'exports'], factory);
  }

  // Next for Node.js or CommonJS.
  else if (typeof exports === 'object') {
    factory(require('underscore'), require('backbone'), exports);
  }

  // Finally, as a browser global.
  else {
    factory(_, Backbone, {});
  }

}(function (_, Backbone, Stickit) {

  // Stickit Namespace
  // --------------------------

  Stickit._handlers = [];

  Stickit.addHandler = function(handlers) {
    // Fill-in default values.
    handlers = _.map(_.flatten([handlers]), function(handler) {
      return _.extend({
        updateModel: true,
        updateView: true,
        updateMethod: 'text'
      }, handler);
    });
    this._handlers = this._handlers.concat(handlers);
  };

  // Backbone.View Mixins
  // --------------------

  Stickit.ViewMixin = {

    // Collection of model event bindings.
    //   [{model,event,fn,config}, ...]
    _modelBindings: null,

    // Unbind the model and event bindings from `this._modelBindings` and
    // `this.$el`. If the optional `model` parameter is defined, then only
    // delete bindings for the given `model` and its corresponding view events.
    unstickit: function(model, bindingSelector) {
      // Support bindings hash in place of selector.
      if (_.isObject(bindingSelector)) {
        _.each(_.keys(bindingSelector), function(selector) {
          this.unstickit(model, selector);
        }, this);
        return;
      }

      var models = [], destroyFns = [];
      _.each(this._modelBindings, function(binding, i) {
        if (model && binding.model !== model) { return; }
        if (bindingSelector && binding.config.selector != bindingSelector) return;
        destroyFns.push(binding.config._destroy);
        binding.model.off(binding.event, binding.fn);
        models.push(binding.model);
        delete this._modelBindings[i];
      }, this);

      // Trigger an event for each model that was unbound.
      _.invoke(_.uniq(models), 'trigger', 'stickit:unstuck', this.cid);
      // Call `_destroy` on a unique list of the binding callbacks.
      _.each(_.uniq(destroyFns), function(fn) { fn.call(this); }, this);
      // Cleanup the null values.
      this._modelBindings = _.compact(this._modelBindings);

      this.$el.off('.stickit' + (model ? '.' + model.cid : ''), bindingSelector);
    },

    // Using `this.bindings` configuration or the `optionalBindingsConfig`, binds `this.model`
    // or the `optionalModel` to elements in the view.
    stickit: function(optionalModel, optionalBindingsConfig) {
      var model = optionalModel || this.model,
          bindings = optionalBindingsConfig || _.result(this, "bindings") || {};

      this._modelBindings || (this._modelBindings = []);

      // Iterate through the selectors in the bindings configuration and configure
      // the various options for each field.
      this.addBinding(model, bindings);

      // Wrap `view.remove` to unbind stickit model and dom events.
      var remove = this.remove;
      if (!remove.stickitWrapped) {
        this.remove = function() {
          var ret = this;
          this.unstickit();
          if (remove) ret = remove.apply(this, arguments);
          return ret;
        };
      }
      this.remove.stickitWrapped = true;
    },

    // Add a single model binding to the view
    addBinding: function(optionalModel, second, _binding) {
      var $el, options, modelAttr, config, selector,
        model = optionalModel || this.model,
        namespace = '.stickit.' + model.cid,
        binding = _binding || {},
        bindId = _.uniqueId();

      // Allow jQuery-style {key: val} event maps
      if (_.isString(second)) {
        selector = second;
      } else {
        var bindings = second;
        _.each(bindings, function(v, selector) {
          this.addBinding(model, selector, bindings[selector]);
        }, this);
        return;
      }

      // Support ':el' selector - special case selector for the view managed delegate.
      $el = selector === ':el' ? this.$el : this.$(selector);

      this.unstickit(model, selector);

      // Fail fast if the selector didn't match an element.
      if (!$el.length) return;

      // Allow shorthand setting of model attributes - `'selector':'observe'`.
      if (_.isString(binding)) binding = {observe:binding};

      // Handle case where `observe` is in the form of a function.
      if (_.isFunction(binding.observe)) binding.observe = binding.observe.call(this);

      config = getConfiguration($el, binding);
      config.selector = selector;
      modelAttr = config.observe;

      // Create the model set options with a unique `bindId` so that we
      // can avoid double-binding in the `change:attribute` event handler.
      config.bindId = bindId;

      // Add a reference to the view for handlers of stickitChange events
      config.view = this;
      options = _.extend({stickitChange:config}, config.setOptions);

      // Add a `_destroy` callback to the configuration, in case `destroy`
      // is a named function and we need a unique function when unsticking.
      config._destroy = function() {
        applyViewFn(this, config.destroy, $el, model, config);
      };

      initializeAttributes(this, $el, config, model, modelAttr);

      initializeVisible(this, $el, config, model, modelAttr);

      if (modelAttr) {
        // Setup one-way, form element to model, bindings.
        _.each(config.events, function(type) {
          var event = type + namespace;
          var method = function(event) {
            var val = config.getVal.call(this, $el, event, config, _.rest(arguments));
            // Don't update the model if false is returned from the `updateModel` configuration.
            if (evaluateBoolean(this, config.updateModel, val, event, config))
              setAttr(model, modelAttr, val, options, this, config);
          };
          method = _.bind(method, this);
          if (selector === ':el') this.$el.on(event, method);
          else this.$el.on(event, selector, method);
        }, this);

        // Setup a `change:modelAttr` observer to keep the view element in sync.
        // `modelAttr` may be an array of attributes or a single string value.
        _.each(_.flatten([modelAttr]), function(attr) {
          observeModelEvent(model, this, 'change:'+attr, config, function(model, val, options) {
            var changeId = options && options.stickitChange && options.stickitChange.bindId || null;
            if (changeId !== bindId)
              updateViewBindEl(this, $el, config, getAttr(model, modelAttr, config, this), model);
          });
        }, this);

        updateViewBindEl(this, $el, config, getAttr(model, modelAttr, config, this), model, true);
      }

      // After each binding is setup, call the `initialize` callback.
      applyViewFn(this, config.initialize, $el, model, config);
    }
  };

  _.extend(Backbone.View.prototype, Stickit.ViewMixin);

  // Helpers
  // -------

  // Evaluates the given `path` (in object/dot-notation) relative to the given
  // `obj`. If the path is null/undefined, then the given `obj` is returned.
  var evaluatePath = function(obj, path) {
    var parts = (path || '').split('.');
    var result = _.reduce(parts, function(memo, i) { return memo[i]; }, obj);
    return result == null ? obj : result;
  };

  // If the given `fn` is a string, then view[fn] is called, otherwise it is
  // a function that should be executed.
  var applyViewFn = function(view, fn) {
    if (fn) return (_.isString(fn) ? evaluatePath(view,fn) : fn).apply(view, _.rest(arguments, 2));
  };

  var getSelectedOption = function($select) { return $select.find('option').not(function(){ return !this.selected; }); };

  // Given a function, string (view function reference), or a boolean
  // value, returns the truthy result. Any other types evaluate as false.
  var evaluateBoolean = function(view, reference) {
    if (_.isBoolean(reference)) return reference;
    else if (_.isFunction(reference) || _.isString(reference))
      return applyViewFn.apply(this, arguments);
    return false;
  };

  // Setup a model event binding with the given function, and track the event
  // in the view's _modelBindings.
  var observeModelEvent = function(model, view, event, config, fn) {
    model.on(event, fn, view);
    view._modelBindings.push({model:model, event:event, fn:fn, config:config});
  };

  // Prepares the given `val`ue and sets it into the `model`.
  var setAttr = function(model, attr, val, options, context, config) {
    var value = {};
    if (config.onSet)
      val = applyViewFn(context, config.onSet, val, config);

    if (config.set)
      applyViewFn(context, config.set, attr, val, options, config);
    else {
      value[attr] = val;
      // If `observe` is defined as an array and `onSet` returned
      // an array, then map attributes to their values.
      if (_.isArray(attr) && _.isArray(val)) {
        value = _.reduce(attr, function(memo, attribute, index) {
          memo[attribute] = _.has(val, index) ? val[index] : null;
          return memo;
        }, {});
      }
      model.set(value, options);
    }
  };

  // Returns the given `attr`'s value from the `model`, escaping and
  // formatting if necessary. If `attr` is an array, then an array of
  // respective values will be returned.
  var getAttr = function(model, attr, config, context) {
    var val,
      retrieveVal = function(field) {
        return model[config.escape ? 'escape' : 'get'](field);
      },
      sanitizeVal = function(val) {
        return val == null ? '' : val;
      };
    val = _.isArray(attr) ? _.map(attr, retrieveVal) : retrieveVal(attr);
    if (config.onGet) val = applyViewFn(context, config.onGet, val, config);
    return _.isArray(val) ? _.map(val, sanitizeVal) : sanitizeVal(val);
  };

  // Find handlers in `Backbone.Stickit._handlers` with selectors that match
  // `$el` and generate a configuration by mixing them in the order that they
  // were found with the given `binding`.
  var getConfiguration = Stickit.getConfiguration = function($el, binding) {
    var handlers = [{
      updateModel: false,
      updateMethod: 'text',
      update: function($el, val, m, opts) { if ($el[opts.updateMethod]) $el[opts.updateMethod](val); },
      getVal: function($el, e, opts) { return $el[opts.updateMethod](); }
    }];
    handlers = handlers.concat(_.filter(Stickit._handlers, function(handler) {
      return $el.is(handler.selector);
    }));
    handlers.push(binding);
    var config = _.extend.apply(_, handlers);
    // `updateView` is defaulted to false for configutrations with
    // `visible`; otherwise, `updateView` is defaulted to true.
    if (config.visible && !_.has(config, 'updateView')) config.updateView = false;
    else if (!_.has(config, 'updateView')) config.updateView = true;
    return config;
  };

  // Setup the attributes configuration - a list that maps an attribute or
  // property `name`, to an `observe`d model attribute, using an optional
  // `onGet` formatter.
  //
  //     attributes: [{
  //       name: 'attributeOrPropertyName',
  //       observe: 'modelAttrName'
  //       onGet: function(modelAttrVal, modelAttrName) { ... }
  //     }, ...]
  //
  var initializeAttributes = function(view, $el, config, model, modelAttr) {
    var props = ['autofocus', 'autoplay', 'async', 'checked', 'controls', 'defer', 'disabled', 'hidden', 'indeterminate', 'loop', 'multiple', 'open', 'readonly', 'required', 'scoped', 'selected'];

    _.each(config.attributes || [], function(attrConfig) {
      var lastClass = '', observed, updateAttr;
      attrConfig = _.clone(attrConfig);
      observed = attrConfig.observe || (attrConfig.observe = modelAttr),
      updateAttr = function() {
        var updateType = _.indexOf(props, attrConfig.name, true) > -1 ? 'prop' : 'attr',
          val = getAttr(model, observed, attrConfig, view);
        // If it is a class then we need to remove the last value and add the new.
        if (attrConfig.name === 'class') {
          $el.removeClass(lastClass).addClass(val);
          lastClass = val;
        }
        else $el[updateType](attrConfig.name, val);
      };
      _.each(_.flatten([observed]), function(attr) {
        observeModelEvent(model, view, 'change:' + attr, config, updateAttr);
      });
      updateAttr();
    });
  };

  // If `visible` is configured, then the view element will be shown/hidden
  // based on the truthiness of the modelattr's value or the result of the
  // given callback. If a `visibleFn` is also supplied, then that callback
  // will be executed to manually handle showing/hiding the view element.
  //
  //     observe: 'isRight',
  //     visible: true, // or function(val, options) {}
  //     visibleFn: function($el, isVisible, options) {} // optional handler
  //
  var initializeVisible = function(view, $el, config, model, modelAttr) {
    if (config.visible == null) return;
    var visibleCb = function() {
      var visible = config.visible,
          visibleFn = config.visibleFn,
          val = getAttr(model, modelAttr, config, view),
          isVisible = !!val;
      // If `visible` is a function then it should return a boolean result to show/hide.
      if (_.isFunction(visible) || _.isString(visible)) isVisible = !!applyViewFn(view, visible, val, config);
      // Either use the custom `visibleFn`, if provided, or execute the standard show/hide.
      if (visibleFn) applyViewFn(view, visibleFn, $el, isVisible, config);
      else {
        $el.toggle(isVisible);
      }
    };
    _.each(_.flatten([modelAttr]), function(attr) {
      observeModelEvent(model, view, 'change:' + attr, config, visibleCb);
    });
    visibleCb();
  };

  // Update the value of `$el` using the given configuration and trigger the
  // `afterUpdate` callback. This action may be blocked by `config.updateView`.
  //
  //     update: function($el, val, model, options) {},  // handler for updating
  //     updateView: true, // defaults to true
  //     afterUpdate: function($el, val, options) {} // optional callback
  //
  var updateViewBindEl = function(view, $el, config, val, model, isInitializing) {
    if (!evaluateBoolean(view, config.updateView, val, config)) return;
    applyViewFn(view, config.update, $el, val, model, config);
    if (!isInitializing) applyViewFn(view, config.afterUpdate, $el, val, config);
  };

  // Default Handlers
  // ----------------

  Stickit.addHandler([{
    selector: '[contenteditable="true"]',
    updateMethod: 'html',
    events: ['input', 'change']
  }, {
    selector: 'input',
    events: ['propertychange', 'input', 'change'],
    update: function($el, val) { $el.val(val); },
    getVal: function($el) {
      return $el.val();
    }
  }, {
    selector: 'textarea',
    events: ['propertychange', 'input', 'change'],
    update: function($el, val) { $el.val(val); },
    getVal: function($el) { return $el.val(); }
  }, {
    selector: 'input[type="radio"]',
    events: ['change'],
    update: function($el, val) {
      $el.filter('[value="'+val+'"]').prop('checked', true);
    },
    getVal: function($el) {
      return $el.filter(':checked').val();
    }
  }, {
    selector: 'input[type="checkbox"]',
    events: ['change'],
    update: function($el, val, model, options) {
      if ($el.length > 1) {
        // There are multiple checkboxes so we need to go through them and check
        // any that have value attributes that match what's in the array of `val`s.
        val || (val = []);
        $el.each(function(i, el) {
          var checkbox = Backbone.$(el);
          var checked = _.contains(val, checkbox.val());
          checkbox.prop('checked', checked);
        });
      } else {
        var checked = _.isBoolean(val) ? val : val === $el.val();
        $el.prop('checked', checked);
      }
    },
    getVal: function($el) {
      var val;
      if ($el.length > 1) {
        val = _.reduce($el, function(memo, el) {
          var checkbox = Backbone.$(el);
          if (checkbox.prop('checked')) memo.push(checkbox.val());
          return memo;
        }, []);
      } else {
        val = $el.prop('checked');
        // If the checkbox has a value attribute defined, then
        // use that value. Most browsers use "on" as a default.
        var boxval = $el.val();
        if (boxval !== 'on' && boxval != null) {
          val = val ? $el.val() : null;
        }
      }
      return val;
    }
  }, {
    selector: 'select',
    events: ['change'],
    update: function($el, val, model, options) {
      var optList,
        selectConfig = options.selectOptions,
        list = selectConfig && selectConfig.collection || undefined,
        isMultiple = $el.prop('multiple');

      // If there are no `selectOptions` then we assume that the `<select>`
      // is pre-rendered and that we need to generate the collection.
      if (!selectConfig) {
        selectConfig = {};
        var getList = function($el) {
          return $el.map(function() {
            return {value:this.value, label:this.text};
          }).get();
        };
        if ($el.find('optgroup').length) {
          list = {opt_labels:[]};
          // Search for options without optgroup
          if ($el.find('> option').length) {
            list.opt_labels.push(undefined);
            _.each($el.find('> option'), function(el) {
              list[undefined] = getList(Backbone.$(el));
            });
          }
          _.each($el.find('optgroup'), function(el) {
            var label = Backbone.$(el).attr('label');
            list.opt_labels.push(label);
            list[label] = getList(Backbone.$(el).find('option'));
          });
        } else {
          list = getList($el.find('option'));
        }
      }

      // Fill in default label and path values.
      selectConfig.valuePath = selectConfig.valuePath || 'value';
      selectConfig.labelPath = selectConfig.labelPath || 'label';

      var addSelectOptions = function(optList, $el, fieldVal) {
        _.each(optList, function(obj) {
          var option = Backbone.$('<option/>'), optionVal = obj;

          var fillOption = function(text, val) {
            option.text(text);
            optionVal = val;
            // Save the option value as data so that we can reference it later.
            option.data('stickit_bind_val', optionVal);
            if (!_.isArray(optionVal) && !_.isObject(optionVal)) option.val(optionVal);
          };

          if (obj === '__default__')
            fillOption(selectConfig.defaultOption.label, selectConfig.defaultOption.value);
          else
            fillOption(evaluatePath(obj, selectConfig.labelPath), evaluatePath(obj, selectConfig.valuePath));

          // Determine if this option is selected.
          if (!isMultiple && optionVal != null && fieldVal != null && optionVal === fieldVal || (_.isObject(fieldVal) && _.isEqual(optionVal, fieldVal)))
            option.prop('selected', true);
          else if (isMultiple && _.isArray(fieldVal)) {
            _.each(fieldVal, function(val) {
              if (_.isObject(val)) val = evaluatePath(val, selectConfig.valuePath);
              if (val === optionVal || (_.isObject(val) && _.isEqual(optionVal, val)))
                option.prop('selected', true);
            });
          }

          $el.append(option);
        });
      };

      $el.find('*').remove();

      // The `list` configuration is a function that returns the options list or a string
      // which represents the path to the list relative to `window` or the view/`this`.
      var evaluate = function(view, list) {
        var context = window;
        if (list.indexOf('this.') === 0) context = view;
        list = list.replace(/^[a-z]*\.(.+)$/, '$1');
        return evaluatePath(context, list);
      };
      if (_.isString(list)) optList = evaluate(this, list);
      else if (_.isFunction(list)) optList = applyViewFn(this, list, $el, options);
      else optList = list;

      // Support Backbone.Collection and deserialize.
      if (optList instanceof Backbone.Collection) optList = optList.toJSON();

      if (selectConfig.defaultOption) {
        addSelectOptions(["__default__"], $el);
      }

      if (_.isArray(optList)) {
        addSelectOptions(optList, $el, val);
      } else if (optList.opt_labels) {
        // To define a select with optgroups, format selectOptions.collection as an object
        // with an 'opt_labels' property, as in the following:
        //
        //     {
        //       'opt_labels': ['Looney Tunes', 'Three Stooges'],
        //       'Looney Tunes': [{id: 1, name: 'Bugs Bunny'}, {id: 2, name: 'Donald Duck'}],
        //       'Three Stooges': [{id: 3, name : 'moe'}, {id: 4, name : 'larry'}, {id: 5, name : 'curly'}]
        //     }
        //
        _.each(optList.opt_labels, function(label) {
          var $group = Backbone.$('<optgroup/>').attr('label', label);
          addSelectOptions(optList[label], $group, val);
          $el.append($group);
        });
        // With no 'opt_labels' parameter, the object is assumed to be a simple value-label map.
        // Pass a selectOptions.comparator to override the default order of alphabetical by label.
      } else {
        var opts = [], opt;
        for (var i in optList) {
          opt = {};
          opt[selectConfig.valuePath] = i;
          opt[selectConfig.labelPath] = optList[i];
          opts.push(opt);
        }
        addSelectOptions(_.sortBy(opts, selectConfig.comparator || selectConfig.labelPath), $el, val);
      }
    },
    getVal: function($el) {
      var val;
      if ($el.prop('multiple')) {
        val = Backbone.$(getSelectedOption($el).map(function() {
          return Backbone.$(this).data('stickit_bind_val');
        })).get();
      } else {
        val = getSelectedOption($el).data('stickit_bind_val');
      }
      return val;
    }
  }]);


  // Export onto Backbone object
  Backbone.Stickit = Stickit;

  return Backbone.Stickit;

}));

/******************************************************************************
 * jquery.i18n.properties
 *
 * Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
 * MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
 *
 * @version     1.1.x
 * @author      Nuno Fernandes
 *              Matthew Lohbihler
 * @url         www.codingwithcoffee.com
 * @inspiration Localisation assistance for jQuery (http://keith-wood.name/localisation.html)
 *              by Keith Wood (kbwood{at}iinet.com.au) June 2007
 *
 *****************************************************************************/

(function ($) {
  $.i18n = {};

  /** Map holding bundle keys (if mode: 'map') */
  $.i18n.map = {};

  /**
   * Load and parse message bundle files (.properties),
   * making bundles keys available as javascript variables.
   *
   * i18n files are named <name>.js, or <name>_<language>.js or <name>_<language>_<country>.js
   * Where:
   *      The <language> argument is a valid ISO Language Code. These codes are the lower-case,
   *      two-letter codes as defined by ISO-639. You can find a full list of these codes at a
   *      number of sites, such as: http://www.loc.gov/standards/iso639-2/englangn.html
   *      The <country> argument is a valid ISO Country Code. These codes are the upper-case,
   *      two-letter codes as defined by ISO-3166. You can find a full list of these codes at a
   *      number of sites, such as: http://www.iso.ch/iso/en/prods-services/iso3166ma/02iso-3166-code-lists/list-en1.html
   *
   * Sample usage for a bundles/Messages.properties bundle:
   * $.i18n.properties({
 *      name:      'Messages',
 *      language:  'en_US',
 *      path:      'bundles'
 * });
   * @param  name      (string/string[], optional) names of file to load (eg, 'Messages' or ['Msg1','Msg2']). Defaults to "Messages"
   * @param  language    (string, optional) language/country code (eg, 'en', 'en_US', 'pt_PT'). if not specified, language reported by the browser will be used instead.
   * @param  path      (string, optional) path of directory that contains file to load
   * @param  mode      (string, optional) whether bundles keys are available as JavaScript variables/functions or as a map (eg, 'vars' or 'map')
   * @param  cache        (boolean, optional) whether bundles should be cached by the browser, or forcibly reloaded on each page load. Defaults to false (i.e. forcibly reloaded)
   * @param  encoding  (string, optional) the encoding to request for bundles. Property file resource bundles are specified to be in ISO-8859-1 format. Defaults to UTF-8 for backward compatibility.
   * @param  callback     (function, optional) callback function to be called after script is terminated
   */
  $.i18n.properties = function (settings) {
    // set up settings
    var defaults = {
      name: 'Messages',
      language: '',
      path: '',
      mode: 'vars',
      cache: false,
      encoding: 'UTF-8',
      callback: null
    };
    settings = $.extend(defaults, settings);
    if (settings.language === null || settings.language == '') {
      settings.language = $.i18n.browserLang();
    }
    if (settings.language === null) {
      settings.language = '';
    }

    // load and parse bundle files
    var files = getFiles(settings.name);
    for (var i = 0; i < files.length; i++) {
      // 1. load base (eg, Messages.properties)
      loadAndParseFile(settings.path + files[i] + '.properties', settings);
      // 2. with language code (eg, Messages_pt.properties)
      if (settings.language.length >= 2) {
        loadAndParseFile(settings.path + files[i] + '_' + settings.language.substring(0, 2) + '.properties', settings);
      }
      // 3. with language code and country code (eg, Messages_pt_PT.properties)
      if (settings.language.length >= 5) {
        loadAndParseFile(settings.path + files[i] + '_' + settings.language.substring(0, 5) + '.properties', settings);
      }
    }

    // call callback
    if (settings.callback) {
      settings.callback();
    }
  };


  /**
   * When configured with mode: 'map', allows access to bundle values by specifying its key.
   * Eg, jQuery.i18n.prop('com.company.bundles.menu_add')
   */
  $.i18n.prop = function (key /* Add parameters as function arguments as necessary  */) {
    var value = $.i18n.map[key];
    if (value == null)
      return '[' + key + ']';

    var phvList;
    if (arguments.length == 2 && $.isArray(arguments[1]))
    // An array was passed as the only parameter, so assume it is the list of place holder values.
      phvList = arguments[1];

    // Place holder replacement
    /**
     * Tested with:
     *   test.t1=asdf ''{0}''
     *   test.t2=asdf '{0}' '{1}'{1}'zxcv
     *   test.t3=This is \"a quote" 'a''{0}''s'd{fgh{ij'
     *   test.t4="'''{'0}''" {0}{a}
     *   test.t5="'''{0}'''" {1}
     *   test.t6=a {1} b {0} c
     *   test.t7=a 'quoted \\ s\ttringy' \t\t x
     *
     * Produces:
     *   test.t1, p1 ==> asdf 'p1'
     *   test.t2, p1 ==> asdf {0} {1}{1}zxcv
     *   test.t3, p1 ==> This is "a quote" a'{0}'sd{fgh{ij
     *   test.t4, p1 ==> "'{0}'" p1{a}
     *   test.t5, p1 ==> "'{0}'" {1}
     *   test.t6, p1 ==> a {1} b p1 c
     *   test.t6, p1, p2 ==> a p2 b p1 c
     *   test.t6, p1, p2, p3 ==> a p2 b p1 c
     *   test.t7 ==> a quoted \ s tringy     x
     */

    var i;
    if (typeof(value) == 'string') {
      // Handle escape characters. Done separately from the tokenizing loop below because escape characters are
      // active in quoted strings.
      i = 0;
      while ((i = value.indexOf('\\', i)) != -1) {
        if (value.charAt(i + 1) == 't')
          value = value.substring(0, i) + '\t' + value.substring((i++) + 2); // tab
        else if (value.charAt(i + 1) == 'r')
          value = value.substring(0, i) + '\r' + value.substring((i++) + 2); // return
        else if (value.charAt(i + 1) == 'n')
          value = value.substring(0, i) + '\n' + value.substring((i++) + 2); // line feed
        else if (value.charAt(i + 1) == 'f')
          value = value.substring(0, i) + '\f' + value.substring((i++) + 2); // form feed
        else if (value.charAt(i + 1) == '\\')
          value = value.substring(0, i) + '\\' + value.substring((i++) + 2); // \
        else
          value = value.substring(0, i) + value.substring(i + 1); // Quietly drop the character
      }

      // Lazily convert the string to a list of tokens.
      var arr = [], j, index;
      i = 0;
      while (i < value.length) {
        if (value.charAt(i) == '\'') {
          // Handle quotes
          if (i == value.length - 1)
            value = value.substring(0, i); // Silently drop the trailing quote
          else if (value.charAt(i + 1) == '\'')
            value = value.substring(0, i) + value.substring(++i); // Escaped quote
          else {
            // Quoted string
            j = i + 2;
            while ((j = value.indexOf('\'', j)) != -1) {
              if (j == value.length - 1 || value.charAt(j + 1) != '\'') {
                // Found start and end quotes. Remove them
                value = value.substring(0, i) + value.substring(i + 1, j) + value.substring(j + 1);
                i = j - 1;
                break;
              }
              else {
                // Found a double quote, reduce to a single quote.
                value = value.substring(0, j) + value.substring(++j);
              }
            }

            if (j == -1) {
              // There is no end quote. Drop the start quote
              value = value.substring(0, i) + value.substring(i + 1);
            }
          }
        }
        else if (value.charAt(i) == '{') {
          // Beginning of an unquoted place holder.
          j = value.indexOf('}', i + 1);
          if (j == -1)
            i++; // No end. Process the rest of the line. Java would throw an exception
          else {
            // Add 1 to the index so that it aligns with the function arguments.
            index = parseInt(value.substring(i + 1, j));
            if (!isNaN(index) && index >= 0) {
              // Put the line thus far (if it isn't empty) into the array
              var s = value.substring(0, i);
              if (s != "")
                arr.push(s);
              // Put the parameter reference into the array
              arr.push(index);
              // Start the processing over again starting from the rest of the line.
              i = 0;
              value = value.substring(j + 1);
            }
            else
              i = j + 1; // Invalid parameter. Leave as is.
          }
        }
        else
          i++;
      }

      // Put the remainder of the no-empty line into the array.
      if (value != "")
        arr.push(value);
      value = arr;

      // Make the array the value for the entry.
      $.i18n.map[key] = arr;
    }

    if (value.length == 0)
      return "";
    if (value.lengh == 1 && typeof(value[0]) == "string")
      return value[0];

    var s = "";
    for (i = 0; i < value.length; i++) {
      if (typeof(value[i]) == "string")
        s += value[i];
      // Must be a number
      else if (phvList && value[i] < phvList.length)
        s += phvList[value[i]];
      else if (!phvList && value[i] + 1 < arguments.length)
        s += arguments[value[i] + 1];
      else
        s += "{" + value[i] + "}";
    }

    return s;
  };

  /** Language reported by browser, normalized code */
  $.i18n.browserLang = function () {
    return normaliseLanguageCode(navigator.language /* Mozilla */ || navigator.userLanguage /* IE */);
  };


  /** Load and parse .properties files */
  function loadAndParseFile(filename, settings) {
    $.ajax({
      url: filename,
      async: false,
      cache: settings.cache,
      contentType: 'text/plain;charset=' + settings.encoding,
      dataType: 'text',
      success: function (data, status) {
        parseData(data, settings.mode);
      }
    });
  }

  /** Parse .properties files */
  function parseData(data, mode) {
    var parsed = '';
    var parameters = data.split(/\n/);
    var regPlaceHolder = /(\{\d+\})/g;
    var regRepPlaceHolder = /\{(\d+)\}/g;
    var unicodeRE = /(\\u.{4})/ig;
    for (var i = 0; i < parameters.length; i++) {
      parameters[i] = parameters[i].replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim
      if (parameters[i].length > 0 && parameters[i].match("^#") != "#") { // skip comments
        var pair = parameters[i].split('=');
        if (pair.length > 0) {
          /** Process key & value */
          var name = unescape(pair[0]).replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim
          var value = pair.length == 1 ? "" : pair[1];
          // process multi-line values
          while (value.match(/\\$/) == "\\") {
            value = value.substring(0, value.length - 1);
            value += parameters[++i].replace(/\s\s*$/, ''); // right trim
          }
          // Put values with embedded '='s back together
          for (var s = 2; s < pair.length; s++) {
            value += '=' + pair[s];
          }
          value = value.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim

          /** Mode: bundle keys in a map */
          if (mode == 'map' || mode == 'both') {
            // handle unicode chars possibly left out
            var unicodeMatches = value.match(unicodeRE);
            if (unicodeMatches) {
              for (var u = 0; u < unicodeMatches.length; u++) {
                value = value.replace(unicodeMatches[u], unescapeUnicode(unicodeMatches[u]));
              }
            }
            // add to map
            $.i18n.map[name] = value;
          }

          /** Mode: bundle keys as vars/functions */
          if (mode == 'vars' || mode == 'both') {
            value = value.replace(/"/g, '\\"'); // escape quotation mark (")

            // make sure namespaced key exists (eg, 'some.key')
            checkKeyNamespace(name);

            // value with variable substitutions
            if (regPlaceHolder.test(value)) {
              var parts = value.split(regPlaceHolder);
              // process function args
              var first = true;
              var fnArgs = '';
              var usedArgs = [];
              for (var p = 0; p < parts.length; p++) {
                if (regPlaceHolder.test(parts[p]) && (usedArgs.length == 0 || usedArgs.indexOf(parts[p]) == -1)) {
                  if (!first) {
                    fnArgs += ',';
                  }
                  fnArgs += parts[p].replace(regRepPlaceHolder, 'v$1');
                  usedArgs.push(parts[p]);
                  first = false;
                }
              }
              parsed += name + '=function(' + fnArgs + '){';
              // process function body
              var fnExpr = '"' + value.replace(regRepPlaceHolder, '"+v$1+"') + '"';
              parsed += 'return ' + fnExpr + ';' + '};';

              // simple value
            } else {
              parsed += name + '="' + value + '";';
            }
          } // END: Mode: bundle keys as vars/functions
        } // END: if(pair.length > 0)
      } // END: skip comments
    }
    eval(parsed);
  }

  /** Make sure namespace exists (for keys with dots in name) */
// TODO key parts that start with numbers quietly fail. i.e. month.short.1=Jan
  function checkKeyNamespace(key) {
    var regDot = /\./;
    if (regDot.test(key)) {
      var fullname = '';
      var names = key.split(/\./);
      for (var i = 0; i < names.length; i++) {
        if (i > 0) {
          fullname += '.';
        }
        fullname += names[i];
        if (eval('typeof ' + fullname + ' == "undefined"')) {
          eval(fullname + '={};');
        }
      }
    }
  }

  /** Make sure filename is an array */
  function getFiles(names) {
    return (names && names.constructor == Array) ? names : [names];
  }

  /** Ensure language code is in the format aa_AA. */
  function normaliseLanguageCode(lang) {
    lang = lang.toLowerCase();
    if (lang.length > 3) {
      lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
    }
    return lang;
  }

  /** Unescape unicode chars ('\u00e3') */
  function unescapeUnicode(str) {
    // unescape unicode codes
    var codes = [];
    var code = parseInt(str.substr(2), 16);
    if (code >= 0 && code < Math.pow(2, 16)) {
      codes.push(code);
    }
    // convert codes to text
    var unescaped = '';
    for (var i = 0; i < codes.length; ++i) {
      unescaped += String.fromCharCode(codes[i]);
    }
    return unescaped;
  }

  /* Cross-Browser Split 1.0.1
   (c) Steven Levithan <stevenlevithan.com>; MIT License
   An ECMA-compliant, uniform cross-browser split method */
  var cbSplit;
// avoid running twice, which would break `cbSplit._nativeSplit`'s reference to the native `split`
  if (!cbSplit) {
    cbSplit = function (str, separator, limit) {
      // if `separator` is not a regex, use the native `split`
      if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
        if (typeof cbSplit._nativeSplit == "undefined")
          return str.split(separator, limit);
        else
          return cbSplit._nativeSplit.call(str, separator, limit);
      }

      var output = [],
          lastLastIndex = 0,
          flags = (separator.ignoreCase ? "i" : "") +
              (separator.multiline ? "m" : "") +
              (separator.sticky ? "y" : ""),
          separator = RegExp(separator.source, flags + "g"), // make `global` and avoid `lastIndex` issues by working with a copy
          separator2, match, lastIndex, lastLength;

      str = str + ""; // type conversion
      if (!cbSplit._compliantExecNpcg) {
        separator2 = RegExp("^" + separator.source + "$(?!\\s)", flags); // doesn't need /g or /y, but they don't hurt
      }

      /* behavior for `limit`: if it's...
       - `undefined`: no limit.
       - `NaN` or zero: return an empty array.
       - a positive number: use `Math.floor(limit)`.
       - a negative number: no limit.
       - other: type-convert, then use the above rules. */
      if (limit === undefined || +limit < 0) {
        limit = Infinity;
      } else {
        limit = Math.floor(+limit);
        if (!limit) {
          return [];
        }
      }

      while (match = separator.exec(str)) {
        lastIndex = match.index + match[0].length; // `separator.lastIndex` is not reliable cross-browser

        if (lastIndex > lastLastIndex) {
          output.push(str.slice(lastLastIndex, match.index));

          // fix browsers whose `exec` methods don't consistently return `undefined` for nonparticipating capturing groups
          if (!cbSplit._compliantExecNpcg && match.length > 1) {
            match[0].replace(separator2, function () {
              for (var i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === undefined) {
                  match[i] = undefined;
                }
              }
            });
          }

          if (match.length > 1 && match.index < str.length) {
            Array.prototype.push.apply(output, match.slice(1));
          }

          lastLength = match[0].length;
          lastLastIndex = lastIndex;

          if (output.length >= limit) {
            break;
          }
        }

        if (separator.lastIndex === match.index) {
          separator.lastIndex++; // avoid an infinite loop
        }
      }

      if (lastLastIndex === str.length) {
        if (lastLength || !separator.test("")) {
          output.push("");
        }
      } else {
        output.push(str.slice(lastLastIndex));
      }

      return output.length > limit ? output.slice(0, limit) : output;
    };

    cbSplit._compliantExecNpcg = /()??/.exec("")[1] === undefined; // NPCG: nonparticipating capturing group
    cbSplit._nativeSplit = String.prototype.split;

  } // end `if (!cbSplit)`
  String.prototype.split = function (separator, limit) {
    return cbSplit(this, separator, limit);
  };

})(jQuery);
(function(root, factory) {
if (typeof define === "function" && define.amd) {
define(["underscore", "jquery", "backbone", "handlebars", "backbone-nested", "backbone-stickit", "backbone-validation"], function(_, $, Backbone, Handlebars) {
return factory(root, {}, _, $, Backbone, Handlebars);
});
} else if (typeof exports === "object") {
require("backbone-nested");require("backbone-epoxy");require("backbone-validation");module.exports = factory(root, {}, require("underscore"), null, require("backbone"), require("handlebars"));
} else {
root.Torso = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$), root.Backbone, root.Handlebars);
};
}(this, function(root, Torso, _, $, Backbone, Handlebars) {
"use strict;"
Backbone.Validation = (function(_){
  'use strict';

  // Default options
  // ---------------

  var defaultOptions = {
    forceUpdate: false,
    selector: 'name',
    labelFormatter: 'sentenceCase',
    messageFormatter: 'none',
    valid: Function.prototype,
    invalid: Function.prototype
  };


  // Helper functions
  // ----------------

  // Formatting functions used for formatting error messages
  var formatFunctions = {
    // Uses the configured label formatter to format the attribute name
    // to make it more readable for the user
    formatLabel: function(attrName, model) {
      return defaultLabelFormatters[defaultOptions.labelFormatter](attrName, model);
    },

    // Replaces nummeric placeholders like {0} in a string with arguments
    // passed to the function
    format: function() {
      return defaultMessageFormatters[defaultOptions.messageFormatter].apply(defaultMessageFormatters, arguments);
    }
  };

  // Flattens an object
  // eg:
  //
  //     var o = {
  //       owner: {
  //         name: 'Backbone',
  //         address: {
  //           street: 'Street',
  //           zip: 1234
  //         }
  //       }
  //     };
  //
  // becomes:
  //
  //     var o = {
  //       'owner': {
  //         name: 'Backbone',
  //         address: {
  //           street: 'Street',
  //           zip: 1234
  //         }
  //       },
  //       'owner.name': 'Backbone',
  //       'owner.address': {
  //         street: 'Street',
  //         zip: 1234
  //       },
  //       'owner.address.street': 'Street',
  //       'owner.address.zip': 1234
  //     };
  // This may seem redundant, but it allows for maximum flexibility
  // in validation rules.
  var flatten = function (obj, into, prefix) {
    into = into || {};
    prefix = prefix || '';

    _.each(obj, function(val, key) {
      if(obj.hasOwnProperty(key)) {
        if (!!val && typeof val === 'object' && val.constructor === Object) {
          flatten(val, into, prefix + key + '.');
        }

        // Register the current level object as well
        into[prefix + key] = val;
      }
    });

    return into;
  };

  // Validation
  // ----------

  var Validation = (function(){

    // Returns an object with undefined properties for all
    // attributes on the model that has defined one or more
    // validation rules.
    var getValidatedAttrs = function(model, attrs) {
      attrs = attrs || _.keys(_.result(model, 'validation') || {});
      return _.reduce(attrs, function(memo, key) {
        memo[key] = void 0;
        return memo;
      }, {});
    };

    // Returns an array with attributes passed through options
    var getOptionsAttrs = function(options, view) {
      var attrs = options.attributes;
      if (_.isFunction(attrs)) {
        attrs = attrs(view);
      } else if (_.isString(attrs) && (_.isFunction(defaultAttributeLoaders[attrs]))) {
        attrs = defaultAttributeLoaders[attrs](view);
      }
      if (_.isArray(attrs)) {
        return attrs;
      }
    };


    // Looks on the model for validations for a specified
    // attribute. Returns an array of any validators defined,
    // or an empty array if none is defined.
    var getValidators = function(model, attr) {
      var attrValidationSet = model.validation ? _.result(model, 'validation')[attr] || {} : {};

      // If the validator is a function or a string, wrap it in a function validator
      if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
        attrValidationSet = {
          fn: attrValidationSet
        };
      }

      // Stick the validator object into an array
      if(!_.isArray(attrValidationSet)) {
        attrValidationSet = [attrValidationSet];
      }

      // Reduces the array of validators into a new array with objects
      // with a validation method to call, the value to validate against
      // and the specified error message, if any
      return _.reduce(attrValidationSet, function(memo, attrValidation) {
        _.each(_.without(_.keys(attrValidation), 'msg', 'msgKey'), function(validator) {
          memo.push({
            fn: defaultValidators[validator],
            val: attrValidation[validator],
            msg: attrValidation.msg,
            msgKey: attrValidation.msgKey
          });
        });
        return memo;
      }, []);
    };

    // Gets the indices out of an attr name: foo[0][1] -> [0, 1] and foo[2] -> [2]
    var extractIndices = function(attr) {
      var startIndex, endIndex,
        i = 0,
        hasEndBracket = true,
        indices = [];
      startIndex = attr.indexOf('[', i);
      while (startIndex > 0 && hasEndBracket) {
         endIndex = attr.indexOf(']', i);
         indices.push(parseInt(attr.substring(startIndex + 1, endIndex), 10));
         i = endIndex + 1;
         hasEndBracket = i > 0;
         startIndex = attr.indexOf('[', i);
      }
      return indices;
    };

    // Generates an array of all the possible field accessors and their indices when using the "open" array notation
    // foo[] -> [{attr: 'foo[0]', index: [0]}, {attr: 'foo[1]', index: [1]}].  Will also perform nested arrays:
    // foo[][] -> [[{attr: 'foo[0][0]', index: [0][0]}], [{attr: 'foo[1][0]', index: [1][0]}]]
    var generateSubAttributes = function(attr, model, subIndices) {
      var i, attrName, remainder, subAttrs, newIndices,
        firstBracket = attr.indexOf('[]');
      if (_.isEmpty(subIndices)) {
        subIndices = [];
      }
      if (firstBracket === -1) {
        return {attr: attr, index: subIndices};
      } else {
        attrName = attr.substring(0, firstBracket);
        remainder = attr.substring(firstBracket + 2);
        subAttrs = [];
        for (i = 0 ; i < model.get(attrName).length; i++) {
          newIndices = subIndices.slice();
          newIndices.push(i);
          subAttrs.push(generateSubAttributes(attrName + '[' + i + ']' + remainder, model, newIndices));
        }
        return subAttrs;
      }
    };

    // Is this model a nested backbone model
    var isBackboneNested = function(model) {
      return Backbone.NestedModel && model instanceof Backbone.NestedModel;
    };

    // Is the attribute using dot notation or array notation: foo.bar or foo[] or foo[1]
    var isNestedAttr = function(attr) {
      return attr.indexOf('.') > 0 || attr.indexOf(']') > 0;
    };

    // Remove the indices for a field name: foo[1][2] -> foo[][]
    var stripIndices = function(attr) {
      var startIndex, newAttr,
        i = 0,
        hasEndBracket = true;
      startIndex = attr.indexOf('[', i);
      if (startIndex < 0) {
        return attr;
      }
      newAttr = attr.substring(0, startIndex + 1);
      while (startIndex > 0 && hasEndBracket) {
         i = attr.indexOf(']', i) + 1;
         hasEndBracket = i > 0;
         startIndex = attr.indexOf('[', i);
         if (startIndex > 0) {
           newAttr = newAttr + attr.substring(i - 1, startIndex + 1);
         }
      }
      newAttr = newAttr + attr.substring(i - 1);
      return newAttr;
    };

    // Validates safely for a nested attribute. If the attr is an array, it will construct
    // validation errors with the same array structure ['foo[0]', 'foo[1]'] -> [false, 'Error Example']
    // Also handles nested array structure
    var validateWithOpenArrayHelper = function(model, attrConfig, value, computed, validators, depth) {
      var attr, indices;

      if (_.isArray(attrConfig)) {
        return _.reduce(attrConfig, function(memo, nestedAttrConfig) {
          memo.push(validateWithOpenArrayHelper(model, nestedAttrConfig, value, computed, validators, depth + 1));
          return memo;
        }, []);
      } else {
        indices = attrConfig.index;
        attr = attrConfig.attr;
        // if the value wasn't passed in and the attribute is nested, get the value
        if (_.isUndefined(value) && isNestedAttr(attr)) {
          value = model.get(attr);
        }
        return invokeValidator(validators, model, value, attr, computed, indices);
      }
    };

    // Invokes the validator set for an attr
    var invokeValidator = function(validators, model, value, attr, computed, indices) {
      return _.reduce(validators, function(memo, validator) {
          // Pass the format functions plus the default
          // validators as the context to the validator
          var context = _.extend({msgKey: validator.msgKey}, formatFunctions, defaultValidators),
              result = validator.fn.call(context, value, attr, validator.val, model, computed, indices);

          if (result === false || memo === false) {
            return false;
          }
          if (result && !memo) {
            return _.result(_.extend({}, validator, formatFunctions, defaultValidators), 'msg') || result;
          }
          return memo;
        }, '');
    };

    // Validates an attribute against all validators defined
    // for that attribute. If one or more errors are found,
    // the first error message is returned.
    // If the attribute is valid, an empty string is returned.
    var validateAttrWithOpenArray = function(model, attr, value, computed) {
      // Reduces the array of validators to an error message by
      // applying all the validators and returning the first error
      // message, if any.
      var hasErrors, subAttr, result,
        validators = getValidators(model, attr);
      subAttr = generateSubAttributes(attr, model);
      result = validateWithOpenArrayHelper(model, subAttr, value, computed, validators, 0);
      if (_.isArray(result)) {
        hasErrors = _.reduce(_.flatten(result), function(memo, val) {
          return memo || val;
        }, false);
        if (!hasErrors) {
          return '';
        }
      }
      return result;
    };

    // Loops through the model's attributes and validates the specified attrs.
    // Returns and object containing names of invalid attributes
    // as well as error messages.
    var validateModel = function(model, attrs, validatedAttrs) {
      var error,
          invalidAttrs = {},
          isValid = true,
          computed = _.clone(attrs);

      _.each(validatedAttrs, function(val, attr) {
        error = validateAttrWithOpenArray(model, attr, val, computed);
        if (error) {
          invalidAttrs[attr] = error;
          isValid = false;
        }
      });

      return {
        invalidAttrs: invalidAttrs,
        isValid: isValid
      };
    };

    // Validates attribute without open array notation.
    var validateAttr = function(model, value, attr) {
      var indices, validators,
        validations = model.validation ? _.result(model, 'validation') || {} : {};
      // If the validations hash contains an entry for the attr
      if (_.contains(_.keys(validations), attr)) {
        return validateAttrWithOpenArray(model, attr, value, _.extend({}, model.attributes));
      } else {
        indices = extractIndices(attr);
        attr = stripIndices(attr);
        validators = getValidators(model, attr);
        return invokeValidator(validators, model, value, attr, _.extend({}, model.attributes), indices);
      }
    };

    // Contains the methods that are mixed in on the model when binding
    var mixin = function(view, options) {
      return {

        // Check whether or not a value, or a hash of values
        // passes validation without updating the model
        preValidate: function(attr, value) {
          var self = this,
              result = {},
              error;
          if (_.isUndefined(value) && isBackboneNested(this)) {
            value = this.get(attr);
          }
          if (_.isObject(attr)) {
            _.each(attr, function(value, key) {
              error = self.preValidate(key, value);
              if(error){
                result[key] = error;
              }
            });

            return _.isEmpty(result) ? undefined : result;
          } else {
            return validateAttr(this, value, attr);
          }
        },

        // Check to see if an attribute, an array of attributes or the
        // entire model is valid. Passing true will force a validation
        // of the model.
        isValid: function(option) {
          var flattened, attrs, error, invalidAttrs;

          option = option || getOptionsAttrs(options, view);

          if(_.isString(option)){
            attrs = [option];
          } else if(_.isArray(option)) {
            attrs = option;
          }
          if (attrs) {
            // Loop through all attributes
            _.each(attrs, function (attr) {
              var value;
              if (isBackboneNested(this)) {
                value = this.get(attr);
              } else {
                value = flatten(this.attributes)[attr];
              }
              error = validateAttr(this, value, attr);
              if (error) {
                invalidAttrs = invalidAttrs || {};
                invalidAttrs[attr] = error;
              }
              // Loop through all associated views
              _.each(this.associatedViews, function(view) {
                if (error) {
                  options.invalid(view, attr, error, options.selector);
                } else {
                  options.valid(view, attr, options.selector);
                }
              }, this);
            }, this);
          }

          if (option === true) {
            invalidAttrs = this.validate();
          }
          if (invalidAttrs) {
            this.trigger('invalid', this, invalidAttrs, {validationError: invalidAttrs});
          }
          return attrs ? !invalidAttrs : this.validation ? this._isValid : true;
        },

        // This is called by Backbone when it needs to perform validation.
        // You can call it manually without any parameters to validate the
        // entire model.
        validate: function(attrs, setOptions){
          var model = this, validateAll, opt, validatedAttrs, allAttrs, flattened, changedAttrs, result;

          validateAll = !attrs;
          opt = _.extend({}, options, setOptions);
          validatedAttrs = getValidatedAttrs(model, getOptionsAttrs(options, view));
          allAttrs = _.extend({}, validatedAttrs, model.attributes, attrs);
          flattened = flatten(allAttrs);
          changedAttrs = attrs ? flatten(attrs) : flattened;
          result = validateModel(model, allAttrs, _.pick(flattened, _.keys(validatedAttrs)));
          model._isValid = result.isValid;

          //After validation is performed, loop through all associated views
          _.each(model.associatedViews, function(view){

            // After validation is performed, loop through all validated and changed attributes
            // and call the valid and invalid callbacks so the view is updated.
            _.each(validatedAttrs, function(val, attr){
                var invalid = result.invalidAttrs.hasOwnProperty(attr),
                  changed = changedAttrs.hasOwnProperty(attr);

                if(!invalid){
                  opt.valid(view, attr, opt.selector);
                }
                if(invalid && (changed || validateAll)){
                  opt.invalid(view, attr, result.invalidAttrs[attr], opt.selector);
                }
            });
          });

          // Trigger validated events.
          // Need to defer this so the model is actually updated before
          // the event is triggered.
          _.defer(function() {
            model.trigger('validated', model._isValid, model, result.invalidAttrs);
            model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
          });

          // Return any error messages to Backbone, unless the forceUpdate flag is set.
          // Then we do not return anything and fools Backbone to believe the validation was
          // a success. That way Backbone will update the model regardless.
          if (!opt.forceUpdate && _.intersection(_.keys(result.invalidAttrs), _.keys(changedAttrs)).length > 0) {
            return result.invalidAttrs;
          }
        }
      };
    };

    // Helper to mix in validation on a model. Stores the view in the associated views array.
    var bindModel = function(view, model, options) {
      if (model.associatedViews) {
        model.associatedViews.push(view);
      } else {
        model.associatedViews = [view];
      }
      _.extend(model, mixin(view, options));
    };

    // Removes view from associated views of the model or the methods
    // added to a model if no view or single view provided
    var unbindModel = function(model, view) {
      if (view && model.associatedViews.length > 1){
        model.associatedViews = _.without(model.associatedViews, view);
      } else {
        delete model.validate;
        delete model.preValidate;
        delete model.isValid;
        delete model.associatedViews;
      }
    };

    // Mix in validation on a model whenever a model is
    // added to a collection
    var collectionAdd = function(model) {
      bindModel(this.view, model, this.options);
    };

    // Remove validation from a model whenever a model is
    // removed from a collection
    var collectionRemove = function(model) {
      unbindModel(model);
    };

    // Returns the public methods on Backbone.Validation
    return {

      // Current version of the library
      version: '0.11.3',

      // Called to configure the default options
      configure: function(options) {
        _.extend(defaultOptions, options);
      },

      // Hooks up validation on a view with a model
      // or collection
      bind: function(view, options) {
        options = _.extend({}, defaultOptions, defaultCallbacks, options);

        var model = options.model || view.model,
            collection = options.collection || view.collection;

        if(typeof model === 'undefined' && typeof collection === 'undefined'){
          throw 'Before you execute the binding your view must have a model or a collection.\n' +
                'See http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.';
        }

        if(model) {
          bindModel(view, model, options);
        }
        else if(collection) {
          collection.each(function(model){
            bindModel(view, model, options);
          });
          collection.bind('add', collectionAdd, {view: view, options: options});
          collection.bind('remove', collectionRemove);
        }
      },

      // Removes validation from a view with a model
      // or collection
      unbind: function(view, options) {
        options = _.extend({}, options);
        var model = options.model || view.model,
            collection = options.collection || view.collection;

        if(model) {
          unbindModel(model, view);
        }
        else if(collection) {
          collection.each(function(model){
            unbindModel(model, view);
          });
          collection.unbind('add', collectionAdd);
          collection.unbind('remove', collectionRemove);
        }
      },

      // Used to extend the Backbone.Model.prototype
      // with validation
      mixin: mixin(null, defaultOptions)
    };
  }());


  // Callbacks
  // ---------

  var defaultCallbacks = Validation.callbacks = {

    // Gets called when a previously invalid field in the
    // view becomes valid. Removes any error message.
    // Should be overridden with custom functionality.
    valid: function(view, attr, selector) {
      view.$('[' + selector + '~="' + attr + '"]')
          .removeClass('invalid')
          .removeAttr('data-error');
    },

    // Gets called when a field in the view becomes invalid.
    // Adds a error message.
    // Should be overridden with custom functionality.
    invalid: function(view, attr, error, selector) {
      view.$('[' + selector + '~="' + attr + '"]')
          .addClass('invalid')
          .attr('data-error', error);
    }
  };


  // Patterns
  // --------

  var defaultPatterns = Validation.patterns = {
    // Matches any digit(s) (i.e. 0-9)
    digits: /^\d+$/,

    // Matches any number (e.g. 100.000)
    number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,

    // Matches a valid email address (e.g. mail@example.com)
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,

    // Mathes any valid url (e.g. http://www.xample.com)
    url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
  };


  // Error messages
  // --------------

  // Error message for the build in validators.
  // {x} gets swapped out with arguments form the validator.
  var defaultMessages = Validation.messages = {
    required: '{0} is required',
    acceptance: '{0} must be accepted',
    min: '{0} must be greater than or equal to {1}',
    max: '{0} must be less than or equal to {1}',
    range: '{0} must be between {1} and {2}',
    length: '{0} must be {1} characters',
    minLength: '{0} must be at least {1} characters',
    maxLength: '{0} must be at most {1} characters',
    rangeLength: '{0} must be between {1} and {2} characters',
    oneOf: '{0} must be one of: {1}',
    equalTo: '{0} must be the same as {1}',
    digits: '{0} must only contain digits',
    number: '{0} must be a number',
    email: '{0} must be a valid email',
    url: '{0} must be a valid url',
    inlinePattern: '{0} is invalid'
  };

  // Label formatters
  // ----------------

  // Label formatters are used to convert the attribute name
  // to a more human friendly label when using the built in
  // error messages.
  // Configure which one to use with a call to
  //
  //     Backbone.Validation.configure({
  //       labelFormatter: 'label'
  //     });
  var defaultLabelFormatters = Validation.labelFormatters = {

    // Returns the attribute name with applying any formatting
    none: function(attrName) {
      return attrName;
    },

    // Converts attributeName or attribute_name to Attribute name
    sentenceCase: function(attrName) {
      return attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
        return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
      }).replace(/_/g, ' ');
    },

    // Looks for a label configured on the model and returns it
    //
    //      var Model = Backbone.Model.extend({
    //        validation: {
    //          someAttribute: {
    //            required: true
    //          }
    //        },
    //
    //        labels: {
    //          someAttribute: 'Custom label'
    //        }
    //      });
    label: function(attrName, model) {
      return (model.labels && model.labels[attrName]) || defaultLabelFormatters.sentenceCase(attrName, model);
    }
  };

  // Message Formatters
  // ------------------

  var defaultMessageFormatters = Validation.messageFormatters = {
    none: function() {
      var args = Array.prototype.slice.call(arguments),
        text = args.shift();
      return text.replace(/\{(\d+)\}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
      });
    }
  };

  // AttributeLoaders

  var defaultAttributeLoaders = Validation.attributeLoaders = {
    inputNames: function (view) {
      var attrs = [];
      if (view) {
        view.$('form [name]').each(function () {
          if (/^(?:input|select|textarea)$/i.test(this.nodeName) && this.name &&
            this.type !== 'submit' && attrs.indexOf(this.name) === -1) {
            attrs.push(this.name);
          }
        });
      }
      return attrs;
    }
  };


  // Built in validators
  // -------------------

  var defaultValidators = Validation.validators = (function(){
    // Use native trim when defined
    var trim = String.prototype.trim ?
      function(text) {
        return text === null ? '' : String.prototype.trim.call(text);
      } :
      function(text) {
        var trimLeft = /^\s+/,
            trimRight = /\s+$/;

        return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
      };

    // Determines whether or not a value is a number
    var isNumber = function(value){
      return _.isNumber(value) || (_.isString(value) && value.match(defaultPatterns.number));
    };

    // Determines whether or not a value is empty
    var hasValue = function(value) {
      return !(_.isNull(value) || _.isUndefined(value) || (_.isString(value) && trim(value) === '') || (_.isArray(value) && _.isEmpty(value)));
    };

    var getMessageKey = function(msgKey, defaultKey) {
      return msgKey ? msgKey : defaultKey;
    };

    return {
      format: formatFunctions.format,
      formatLabel: formatFunctions.formatLabel,

      // Function validator
      // Lets you implement a custom function used for validation
      fn: function(value, attr, fn, model, computed) {
        if(_.isString(fn)){
          fn = model[fn];
        }
        return fn.call(model, value, attr, computed);
      },

      // Allows the creation of an inline function that uses the validators context
      // instead of the model context.
      inlineFn: function(value, attr, fn, model, computed, indices) {
        return fn.call(this, value, attr, model, computed, indices);
      },

      // Required validator
      // Validates if the attribute is required or not
      // This can be specified as either a boolean value or a function that returns a boolean value
      required: function(value, attr, required, model, computed) {
        var isRequired = _.isFunction(required) ? required.call(model, value, attr, computed) : required;
        if(!isRequired && !hasValue(value)) {
          return false; // overrides all other validators
        }
        if (isRequired && !hasValue(value)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.required), this.formatLabel(attr, model));
        }
      },

      // Acceptance validator
      // Validates that something has to be accepted, e.g. terms of use
      // `true` or 'true' are valid
      acceptance: function(value, attr, accept, model) {
        if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.acceptance), this.formatLabel(attr, model));
        }
      },

      // Min validator
      // Validates that the value has to be a number and equal to or greater than
      // the min value specified
      min: function(value, attr, minValue, model) {
        if (!isNumber(value) || value < minValue) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.min), this.formatLabel(attr, model), minValue);
        }
      },

      // Max validator
      // Validates that the value has to be a number and equal to or less than
      // the max value specified
      max: function(value, attr, maxValue, model) {
        if (!isNumber(value) || value > maxValue) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.max), this.formatLabel(attr, model), maxValue);
        }
      },

      // Range validator
      // Validates that the value has to be a number and equal to or between
      // the two numbers specified
      range: function(value, attr, range, model) {
        if(!isNumber(value) || value < range[0] || value > range[1]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.range), this.formatLabel(attr, model), range[0], range[1]);
        }
      },

      // Length validator
      // Validates that the value has to be a string with length equal to
      // the length value specified
      length: function(value, attr, length, model) {
        if (!_.isString(value) || value.length !== length) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.length), this.formatLabel(attr, model), length);
        }
      },

      // Min length validator
      // Validates that the value has to be a string with length equal to or greater than
      // the min length value specified
      minLength: function(value, attr, minLength, model) {
        if (!_.isString(value) || value.length < minLength) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.minLength), this.formatLabel(attr, model), minLength);
        }
      },

      // Max length validator
      // Validates that the value has to be a string with length equal to or less than
      // the max length value specified
      maxLength: function(value, attr, maxLength, model) {
        if (!_.isString(value) || value.length > maxLength) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.maxLength), this.formatLabel(attr, model), maxLength);
        }
      },

      // Range length validator
      // Validates that the value has to be a string and equal to or between
      // the two numbers specified
      rangeLength: function(value, attr, range, model) {
        if (!_.isString(value) || value.length < range[0] || value.length > range[1]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.rangeLength), this.formatLabel(attr, model), range[0], range[1]);
        }
      },

      // One of validator
      // Validates that the value has to be equal to one of the elements in
      // the specified array. Case sensitive matching
      oneOf: function(value, attr, values, model) {
        if(!_.include(values, value)){
          return this.format(getMessageKey(this.msgKey, defaultMessages.oneOf), this.formatLabel(attr, model), values.join(', '));
        }
      },

      // Equal to validator
      // Validates that the value has to be equal to the value of the attribute
      // with the name specified
      equalTo: function(value, attr, equalTo, model, computed) {
        if(value !== computed[equalTo]) {
          return this.format(getMessageKey(this.msgKey, defaultMessages.equalTo), this.formatLabel(attr, model), this.formatLabel(equalTo, model));
        }
      },

      // Pattern validator
      // Validates that the value has to match the pattern specified.
      // Can be a regular expression or the name of one of the built in patterns
      pattern: function(value, attr, pattern, model) {
        if (!hasValue(value) || !value.toString().match(defaultPatterns[pattern] || pattern)) {
          return this.format(getMessageKey(this.msgKey, defaultMessages[pattern]) || defaultMessages.inlinePattern, this.formatLabel(attr, model), pattern);
        }
      }
    };
  }());

  return Validation;
}(_));

Torso.$ = $;
Torso.Mixins = {};

/* Validation label configuration */
Torso.Validation = Backbone.Validation;
Torso.Mixins.Validation = Backbone.Validation.mixin;

/* Stickit configuration */
Torso.Stickit = Backbone.Stickit;

/* Custom Torso Model/View/Collection to be extended and customized in the future. */
Torso.NestedModel = Backbone.NestedModel.extend({});
Torso.Model = Backbone.Model.extend({});
Torso.View = Backbone.View.extend({});
Torso.Collection = Backbone.Collection.extend({});

/* Holds any Torso classes */
Torso.Views = {};
Torso.Models = {};
Torso.Collections = {};
Torso.Services = {};

/* Holds Torso Events */
Torso.Events = _.extend({}, Backbone.Events);
/**
 * A static object responsible for tracking and creating
 * unique GUIDs when asked.  These GUIDs can be used for anything.
 *
 * @module    Torso
 * @namespace Torso
 * @class     GUIDManager
 * @static
 * @author    ariel.wexler@vecna.com
 */
Torso.GUIDManager = {
  /**
   * The next GUID numeral
   * @property _current
   */
  _current: 0,

  /**
   * Create a GUID and return it
   * @method generate
   * @return {String} A unique hash
   */
  generate: function() {
    var hash = this._generateGUID();
    return hash;
  },

  /**
   * Random GUID generator.  Creates GUIDs in the format: G<number>
   * @private
   * @method _generateGUID
   * @return {String} A sequence of Hex Digits
   */
  _generateGUID: function() {
    var GUID = 'G' + this._current;
    this._current++;
    return GUID;
  }
};
(function(Handlebars) {
  var FEEDBACK_KEY = 'feedback',
      MODEL_KEY = 'model';

  /**
   * Usage: {{label 'fieldName' value="suffix"}}
   * Generates: for="field-name-suffix"
   * @method Handlebars.helpers.label
   * @param field {String} The field name to convert to a compliant "for" attribute
   * @param options {<Handlebars context>} Always passed in as final argument
   * @param [option.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
   * @return {String} Compliant HTML generating the "for" attribute
   */
  Handlebars.registerHelper('label', function(field, options) {
    return Handlebars.helpers.formAttr(field, 'for', options);
  });

  /**
   * Usage: {{bindModel 'fieldName' value='suffix'}}
   * Generates: id="field-name-suffix" name="field-name-suffix" data-model="fieldName" data-feedback="firstName"
   * @method Handlebars.helpers.bindModel
   * @param field {String} The field name to convert to compliant id, name, data-model, and data-feedback attributes
   * @param options {<Handlebars context>} Always passed in as final argument
   * @param [options.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
   * @return {String} Compliant HTML generating the id, name, data-model, and data-feedback attributes
   */
  Handlebars.registerHelper('bindModel', function(field, options) {
    return Handlebars.helpers.formAttr(field, MODEL_KEY + ', ' + FEEDBACK_KEY + ', name, id', options);
  });

  /**
   * Usage: {{feedback 'fieldName'}}
   * Generates: data-feedback="firstName"
   * @method Handlebars.helpers.feedback
   * @param field {String} The field name to convert to a compliant data-feedback attribute
   * @param options {<Handlebars context>} Always passed in as final argument
   * @return {String} Compliant HTML generating the data-feedback attribute
   */
  Handlebars.registerHelper('feedback', function(field, options) {
    return Handlebars.helpers.formAttr(field, FEEDBACK_KEY, options);
  });

  /**
   * Usage: {{formAttr 'fieldName[x].sub' 'id, for' value='demo' x=123}}
   * Generates: id="first-name-123_sub-demo" for="first-name-123_sub"
   * @method Handlebars.helpers.formAttr
   * @param field {String} The field name to convert to a compliant data-feedback attribute
   * @param options {<Handlebars context>} Always passed in as final argument
   * @param [options.hash.value] {String} The value tacked on to the end of the field string (useful for radio and checkbox)
   * @return {String} Compliant HTML generating the data-feedback attribute
   */
  Handlebars.registerHelper('formAttr', function(field, attrs, options) {
    var i, attrName,
      value = (options.hash ? options.hash.value : undefined),
      res = Handlebars.helpers.injectFieldIndices(field, options.hash),
      attributes = '';
    attrs = attrs.split(',');
    for (i = 0; i < attrs.length; i++) {
      attrName = attrs[i].trim();
      if (attrName === FEEDBACK_KEY) {
        attributes += 'data-feedback="' + res + '" ';
      } else if (attrName === MODEL_KEY) {
        attributes += 'data-model="' + res + '" ';
      } else if (attrName === 'name') {
        attributes += 'name="' + Handlebars.helpers.dasherize(res) + '" ';
      } else if (attrName === 'id') {
        attributes += 'id="' + Handlebars.helpers.dasherize(res);
        if (value !== undefined) {
          attributes += '-' + value;
        }
        attributes += '" ';
      } else if (attrName === 'for') {
        attributes += 'for="' + Handlebars.helpers.dasherize(res);
        if (value !== undefined) {
          attributes += '-' + value;
        }
        attributes += '" ';
      }
    }
    if (value !== undefined) {
      attributes += 'value="' + value +'"';
    }
    return new Handlebars.SafeString(attributes);
  });

  /**
   * @method Handlebars.helpers.dasherize
   * @param str {String} The input string to make HTML compliant (convert to dashes)
   * @return {String} HTML complicant / dasherized string
   */
  Handlebars.registerHelper('dasherize', function(str) {
    var camelCaseRemoved, dotsRemoved, bracesRemoved;
    camelCaseRemoved = str.replace(/([A-Z])/g, function(rep) {
      return '-' + rep.toLowerCase();
    });
    dotsRemoved = camelCaseRemoved.replace(/\./g, function() {
      return '_';
    });
    bracesRemoved = dotsRemoved.replace(/\[[0-9]+\]/g, function(rep) {
      return '-' + rep.substring(1, rep.length - 1);
    });
    return bracesRemoved;
  });

  /**
   * Usage: injectFieldIndices('test[x]-thisIsRegular-y', {x: 123, y: 456});
   * Generates: 'test[123]-thisIsRegular-y'
   * @method injectFieldIndices
   * @param field {String} The field name
   * @param indexMap {Object} A map of variables
   * @return {String} the field string with array variables substituted
   */
  Handlebars.registerHelper('injectFieldIndices', function(field, indexMap) {
    if (indexMap) {
      return field.replace(/\[.+?\]/g, function(m) {
        var newIndex = indexMap[m.substring(1, m.length - 1)];
        return '[' + (newIndex === undefined ? '' : newIndex) + ']';
      });
    } else {
      return field;
    }
  });
})(Handlebars);
Torso.Stickit.addHandler({
  selector: 'input[type="radio"]',
  events: ['change'],
  update: function($el, val) {
    $el.prop('checked', false);
    $el.filter('[value="'+val+'"]').prop('checked', true);
  },
  getVal: function($el) {
    return $el.filter(':checked').val();
  }
});
/**
 * Static Template Engine.
 * All template renders should be piped through this method.
 *
 * @module    Torso
 * @namespace Torso
 * @class     Torso
 * @static
 * @author    ariel.wexler@vecna.com
 */
Torso.TemplateRenderer = {
  /**
   * Performs efficient re-rendering of a template.
   * @method render
   * @param  el {jQueryObject} The Element to render into
   * @param  template {Handlebars Template} The HBS template to apply
   * @param  context {Object} The context object to pass to the template
   * @param  [opts] {Object} Other options
   * @param  [opts.force=false] {Boolean} Will forcefully do a fresh render and not a diff-render
   * @param  [opts.ignoreElements] {Array} jQuery selectors of DOM elements to ignore during render. Can be an expensive check
   */
  render: function(el, template, context, opts) {
    var newDOM, activeElement, currentCaret,
        newHTML = template(context);
    opts = opts || {};

    if (opts.force) {
      el.html(newHTML);
    } else {
      newDOM = Torso.$('<' + el.prop('tagName') + '>' + newHTML + '</' + el.prop('tagName') + '>');
      _.each(el.get(0).attributes, function(attrib) {
        newDOM.attr(attrib.name, attrib.value);
      });
      activeElement = document.activeElement;
      if (activeElement && activeElement.hasAttribute('value')) {
        currentCaret = this.getCaretPosition(activeElement);
      }
      this.hotswap(el, newDOM, opts.ignoreElements, false);
      if (activeElement) {
        this.setCaretPosition(activeElement, currentCaret);
      }
    }
  },

  /**
   * Hotswap algorithm:
   * Runtime is O(N) where N is the number of total DOM elements.
   * There is always room for optimizing this method.
   * Changes DOM elements that are different, and
   * leaves others untouched.  Note that the top-most element's
   * tag type is immutable so it can never be changed.
   * @method hotswap
   * @param newDOM {jQueryElement} The jQuery DOM for the desired render
   * @param currentDOM {jQueryElement} The jQuery DOM for the existing render
   * @param ignoreElements {Array} Array of jQuery selectors of DOM elements to ignore during render. Can be an expensive check.
   * @param returnRefreshTree {Boolean} if true, will return an array tree that corresponds element-by-element to the currentDOM
   *   where a true value means the element was forced to refresh. A true value will short circuit that branch. A common example
   *   would be if the top level current dom needs a force refresh, this method will return a single true value.
   * @return {Boolean} true if requires a full refresh, false otherwise
   */
  hotswap: function(currentDOM, newDOM, ignoreElements, returnRefreshTree) {
    var i, newTag, currTag,
      newElem, currElem,
      newChildren, currChildren,
      newAttributes, currentAttributes,
      replacementDOM, attrNode,
      skip, ignoreIdx, childForceRefresh,
      hardRefreshes = [],
      ignoreElementsLen = ignoreElements ? ignoreElements.length : 0;

    // Handle tagname changes with full replacement
    newTag = newDOM.prop('tagName');
    currTag = currentDOM.prop('tagName');
    if (newTag !== currTag) {
      replacementDOM = Torso.$('<' + newTag + '>' + newDOM.html() + '</' + newTag + '>');
      currentDOM.replaceWith(replacementDOM);
      currentDOM = replacementDOM;
    }

    // Attribute removing old values
    newAttributes = newDOM.get(0).attributes;
    currentAttributes = currentDOM.get(0).attributes;
    while (currentAttributes.length > 0) {
      currentAttributes.removeNamedItem(currentAttributes[0].name);
    }

    // Attribute setting for new values
    _.each(newAttributes, function(attrib) {
      attrNode = document.createAttribute(attrib.name);
      attrNode.value = attrib.value;
      currentAttributes.setNamedItem(attrNode);
    });

    // Quick check if we need to bother comparing sub-levels
    if (currentDOM.html() === newDOM.html()) {
      return false;
    }

    newChildren = newDOM.children();
    currChildren = currentDOM.children();

    // If the DOM lists are different sizes, perform a hard refresh
    if (newChildren.length !== currChildren.length) {
      currentDOM.html(newDOM.html());
      return true;
    }

    // Compare and set content if this is a leaf node
    if (currChildren.length === 0) {
      currentDOM.html(newDOM.html());
      return false;
    }

    // Perform a recursive hotswap for all children elements
    for (i = 0; i < currChildren.length; i++) {
      skip = false;
      newElem = Torso.$(newChildren[i]);
      currElem = Torso.$(currChildren[i]);
      if (ignoreElements) {
        for (ignoreIdx = 0; ignoreIdx < ignoreElementsLen; ignoreIdx++) {
          if (currElem.is(ignoreElements[ignoreIdx])) {
            skip = true;
            break;
          }
        }
      }
      if (!skip) {
        childForceRefresh = this.hotswap(currElem, newElem, ignoreElements, returnRefreshTree);
        if (returnRefreshTree) {
          hardRefreshes.push(childForceRefresh);
        }
      }
    }
    return hardRefreshes;
  },

  /**
   * Method that returns the current caret (cursor) position of a given element.
   * Source: http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
   * @method getCaretPosition
   * @param elem {element} the DOM element to check caret position
   * @return {Integer} the cursor index of the given element.
   */
  getCaretPosition: function(elem) {
    // range {IE selection object}
    // iCaretPos {Integer} will store the final caret position
    var range,
        iCaretPos = 0;
    // IE Support
    if (document.selection) {
      // Set focus on the element
      elem.focus();
      // To get cursor position, get empty selection range
      range = document.selection.createRange();
      // Move selection start to 0 position
      range.moveStart('character', -elem.value.length);
      // The caret position is selection length
      iCaretPos = range.text.length;
    } else if (elem.selectionStart || elem.selectionStart === 0) {
      // Firefox support
      iCaretPos = elem.selectionStart;
    }
    // Return results
    return iCaretPos;
  },

  /**
   * Method that returns sets the current caret (cursor) position of a given element and puts it in focus.
   * Source: http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
   * @method setCaretPosition
   * @param elem {element}
   * @param caretPos {Integer} The caret index to set
   * @return {Integer} the cursor index of the given element.
   */
  setCaretPosition: function(elem, caretPos) {
    var range;
    if(elem) {
      if(elem.createTextRange) {
        // IE support
        range = elem.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else if(elem.selectionStart || elem.selectionStart === 0) {
        // Firefox support
        elem.focus();
        elem.setSelectionRange(caretPos, caretPos);
      } else {
        // At least focus the element if nothing else
        elem.focus();
      }
    }
  }
};

/**
 * Loading logic to be mixed into Backbone Collections.
 * Requires collectionRegistrationMixin.js to be imported first
 *
 * @module    Torso
 * @namespace Torso.Mixins.Collection
 * @class  LoadingMixin
 * @author kent.willis@vecna.com
 */
_.extend(Torso.Collection.prototype, (function(base) {

  var loadingMixin,
    baseSuper = base.super || function() {};

  loadingMixin = function(collection, options) {

    var loadedOnceDeferred = options.loadedOnceDeferred,
      loadedOnce = options.loadedOnce,
      loading = options.loading;

    /**
     * @method hasLoadedOnce
     * @return true if this collection has ever loaded from a fetch call
     */
    collection.hasLoadedOnce = function() {
      return loadedOnce;
    };

    /**
     * @method isLoading
     * @return true if this collection is currently loading new values from the server
     */
    collection.isLoading = function() {
      return loading;
    };

    /**
     * @method getLoadedOncePromise
     * @return a promise that will resolve when the collection has loaded for the first time
     */
    collection.getLoadedOncePromise = function() {
      return loadedOnceDeferred.promise();
    };

    /**
     * Wraps the base fetch in a wrapper that manages loaded states
     * @method fetch
     * @param options {Object} - the object to hold the options needed by the base fetch method
     */
    collection.fetch = function(options) {
      this._loadWrapper(base.fetch, options);
    };

    /**
     * Base load function that will trigger a "load-begin" and a "load-complete" as
     * the fetch happens. Use this method to wrap any method that returns a promise in loading events
     * @method _loadWrapper
     * @param fetchMethod {Function} - the method to invoke a fetch
     * @param options {Object} - the object to hold the options needed by the fetchMethod
     * @return a promise when the fetch method has completed and the events have been triggered
     */
    collection._loadWrapper = function(fetchMethod, options) {
      loading = true;
      collection.trigger('load-begin');
      return Torso.$.when(fetchMethod.call(collection, options)).done(function(data, textStatus, jqXHR) {
        collection.trigger('load-complete', {success: true, data: data, textStatus: textStatus, jqXHR: jqXHR});
      }).fail(function(jqXHR, textStatus, errorThrown) {
        collection.trigger('load-complete', {success: false, jqXHR: jqXHR, textStatus: textStatus, errorThrown: errorThrown});
      }).always(function() {
        if (!loadedOnce) {
          loadedOnce = true;
          loadedOnceDeferred.resolve();
        }
        loading = false;
      });
    };
  };

  return {
    /**
     * Adds the loading mixin to the collection
     * @method super
     * @param args {Object} the arguments to the base super method
     */
    super: function(args) {
      baseSuper.call(this, args);
      loadingMixin(this, {
        loadedOnceDeferred: new Torso.$.Deferred(),
        loadedOnce: false,
        loading: false
      });
    }
  };
})(Torso.Collection.prototype));

/**
 * Custom additions to the Backbone Collection object.
 * - safe disposal methods for memory + event management
 * - special functional overrides to support ID registration for different views
 *
 * @module    Torso
 * @namespace Torso.Mixins.Collection
 * @class  RegistrationMixin and CacheMixin
 * @author ariel.wexler@vecna.com, kent.willis@vecna.com
 */
_.extend(Torso.Collection.prototype, (function(base) {

  var cacheMixin, createRequesterCollectionClass,
    baseSuper = base.super || function() {};

  /**
   * Returns a new class of collection that inherits from the parent but not the cacheMixin
   * and adds a requesterMixin that connects this cache to it's parent
   *
   * @method createRequesterCollectionClass
   * @param parent {Backbone Collection instance} the parent of the private collection
   * @param guid {String} the unique code of the owner of this private collection
   */
  createRequesterCollectionClass = function(parent, guid) {
    return parent.constructor.extend((function(parentClass, parentInstance, ownerKey) {

      var requesterMixin,
        baseParentSuper = parentClass.super;

      /**
       * A mixin that overrides base collection methods meant for cache's and tailors them
       * to a requester.
       * @method requesterMixin
       */
      requesterMixin = function(collection, myTrackedIds) {

        /**
         * @method requesterMixin.getTrackedIds
         * @return {Array} array of ids that this collection is tracking
         */
        collection.getTrackedIds = function() {
          return myTrackedIds;
        };

        /**
         * Will force the cache to fetch just the registered ids of this collection
         * @method requesterMixin.fetch
         * @return {Promise} promise that will resolve when the fetch is complete
         */
        collection.fetch = function() {
          return collection._loadWrapper(function() {
            if (myTrackedIds && myTrackedIds.length) {
              return parentInstance.fetchByIds({idsToFetch: myTrackedIds, setOptions: {remove: false}});
            } else {
              return Torso.$.Deferred().resolve().promise();
            }
          });
        };

        /**
         * Override the Id registration system to route via the parent collection
         * @method requesterMixin.trackIds
         * @param ids The list of ids that this collection wants to track
         */
        collection.trackIds = function(ids) {
          collection.remove(_.difference(myTrackedIds, ids));
          parentInstance.registerIds(ids, ownerKey);
          myTrackedIds = ids;
        };

        /**
         * Will register the new ids and then ask the cache to fetch them
         * @method requesterMixin.fetchByIds
         * @return the promise of the fetch by ids
         */
        collection.fetchByIds = function(newIds) {
          collection.trackIds(newIds);
          return collection.fetch();
        };

        /**
         * Handles the disposing of this collection as it relates to a requester collection.
         * @method requesterMixin.requesterDispose
         */
        collection.requesterDispose = function() {
          parentInstance.removeRequster(ownerKey);
        };
      };

      return {
        /**
         * The super constructor / initialize method for requester collections.
         * @method requesterMixin.super
         */
        super: function(args) {
          args = args || {};
          args.isRequester = true;
          baseParentSuper.call(this, args);
          requesterMixin(this, []);
          this.listenTo(parentInstance, 'load-begin', function() {
            this.trigger('cache-load-begin');
          });
          this.listenTo(parentInstance, 'load-complete', function() {
            this.trigger('cache-load-complete');
          });
        }
      };
    })(parent.constructor.__super__, parent, guid));
  };

  /**
   * Adds functions to manage state of requesters
   * @method cacheMixin
   * @param collection {Collection} the collection to add this mixin
   * @param options.requestMap {Object} the object to hold all request state
   * @param options.collectionTrackedIds {Array} list of all ids this collection is tracking
   * @param options.knownPrivateCollections {Object} map of all private collections that have registered ids [GUID -> collection]
   */
  cacheMixin = function(collection, options) {

    //************* PRIVATE METHODS ************//

    var setRequestedIds,
      requestMap = options.requestMap,
      collectionTrackedIds = options.collectionTrackedIds,
      knownPrivateCollections = options.knownPrivateCollections;

    /**
     * If true, the collection will only fetch an object from the server once.
     * @property lazyFetch
     * @type boolean
     * @default false
     */
    collection.lazyFetch = collection.lazyFetch  || false;

    /**
     * @private
     * @method cacheMixin.setRequestedIds
     * @param guid {String} the global unique identifier for the requester
     * @param array {Array} the array of ids the requester wants
     */
    setRequestedIds = function(guid, array) {
      requestMap[guid] = {
        array: array,
        dict: _.object(_.map(array, function(id) { return [id, id]; }))
      };
    };

    //*********** PUBLIC METHODS ************//

    /**
     * @method cacheMixin.getRequesterIds
     * @param {String} the global unique id of the requester
     * @return {Array} an array of the ids the requester with the guid has requested
     */
    collection.getRequesterIds = function(guid) {
      return requestMap[guid] && requestMap[guid].array;
    };

    /**
     * @method cacheMixin.getRequesterIdsAsDictionary
     * This method is used for quick look up of a certain id within the list of requested ids
     * @param guid {String} the global unique id of the requester
     * @return {Object} an dictionary of id -> id of the requester ids for a given requester.
     */
    collection.getRequesterIdsAsDictionary = function(guid) {
      return requestMap[guid] && requestMap[guid].dict;
    };

    /**
     * @method cacheMixin.removeRequster
     * Removes a requester from this cache. No longer receives updates
     * @param guid {String} the global unique id of the requester
     */
    collection.removeRequster = function(guid) {
      delete requestMap[guid];
      delete knownPrivateCollections[guid];
    };

    /**
     * @method cacheMixin.getRequesters
     * @return {Array} an array of the all requesters in the form of their GUID's
     */
    collection.getRequesters = function()  {
      return _.keys(requestMap);
    };

    /**
     * Return the list of Ids requested by this collection
     * @method cacheMixin.getAllRequestedIds
     * @return {Array} the corresponding requested Ids
     */
    collection.getAllRequestedIds = function() {
      return collectionTrackedIds;
    };

    /**
     * Used to return a collection of desired models given the requester object.
     * Binds a custom "resized" event to the private collections.
     * Overrides the fetch method to call the parent collection's fetchByIds method.
     * Overrides the registerIds method to redirect to its parent collection.
     * @method cacheMixin.createPrivateCollection
     * @param guid {String} Identifier for the requesting view
     * @return {Collection} an new empty collection of the same type as "this"
     */
    collection.createPrivateCollection = function(guid) {
      var RequesterClass = createRequesterCollectionClass(collection, guid);
      knownPrivateCollections[guid] = new RequesterClass();
      return knownPrivateCollections[guid];
    };

    /**
     * Registers a list of Ids that a particular object cares about.  This method
     * intelligently updates the "_requestedIds" field to contain all unique
     * requests for Ids to be fetched.  Furthermore, the "polledFetch" method
     * is overriden such that it no longer routes through Backbone's fetch all,
     * but rather a custom "fetchByIds" method.
     * @method cacheMixin.registerIds
     * @param newIds {Array}  - New ids to register under the requester
     * @param guid {String}   - The GUID of the object that wants the ids
     */
    collection.registerIds = function(newIds, guid) {
      var i, requesterIdx, storedIds, requesters, requesterLength,
          distinctIds = {},
          result = [];

      // Save the new requests in the map
      setRequestedIds(guid, newIds);
      requesters = collection.getRequesters();
      requesterLength = requesters.length;

      // Create a new request list
      for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
        storedIds = collection.getRequesterIds(requesters[requesterIdx]);
        for (i = 0; i < storedIds.length; i++) {
          distinctIds[storedIds[i]] = true;
        }
      }

      // Convert the hash table of unique Ids to a list
      for (i in distinctIds) {
        result.push(parseInt(i, 10));
      }
      collectionTrackedIds = result;

      // Overrides the polling mixin's fetch method
      collection.polledFetch = function() {
        collection.fetchByIds({
          idsToFetch: collectionTrackedIds,
          setOptions: {remove: true}
        });
      };
    };

    /**
     * A custom fetch operation to only fetch the requested Ids.
     * @method cacheMixin.fetchByIds
     * @param options.idsToFetch {Array} - A list of request Ids
     * @param options.setOptions {Object} - if a set is made, then the setOptions will be passed into the set method
     * @return {Promise} the promise of the fetch
     */
    collection.fetchByIds = function(options) {
      // Fires a method from the loadingMixin that wraps the fetch with events that happen before and after
      return collection._loadWrapper(function(args) {
        var requestedIds, idsToFetch;
        requestedIds = args.idsToFetch;
        if (collection.lazyFetch) {
          idsToFetch = _.difference(requestedIds, this.models.pluck('id'));
        } else {
          idsToFetch = requestedIds;
        }
        return Torso.$.ajax({
            type:'POST',
            url: collection.url + '/ids',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(idsToFetch)
          }).done(
            // Success function
            function(data) {
              var i, requesterIdx, requesterIdsAsDict, models, privateCollection,
                  requesterLength, requesters, model,
                  requestedIdsLength = requestedIds.length,
                  setOptions = args.setOptions;
              collection.set(collection.parse(data), setOptions);
              // Set respective collection's models for requested ids only.
              requesters = collection.getRequesters();
              requesterLength = requesters.length;
              // For each requester...
              for (requesterIdx = 0; requesterIdx < requesterLength; requesterIdx++) {
                requesterIdsAsDict = collection.getRequesterIdsAsDictionary(requesters[requesterIdx]);
                models = [];
                // ... now let's iterate over the ids that were fetched ...
                for (i = 0; i < requestedIdsLength; i++) {
                  //if the id that the requester cares about matches that model whose id was just fetched...
                  if (requesterIdsAsDict[requestedIds[i]]) {
                    model = collection.get(requestedIds[i]);
                    // if the model was removed, no worries, the parent won't attempt to update the child on that one.
                    if (model) {
                      models.push(model);
                    }
                  }
                }
                privateCollection = knownPrivateCollections[requesters[requesterIdx]];
                // a fetch by the parent will not remove a model in a requester collection that wasn't fetched with this call
                privateCollection.set(models, {remove: false});
              }
            });
      }, options);
    };

    /**
     * Sets the lazyFetch mode. When enabled, the collection will assume models don't change, and only fetch each model from the server once.
     * @method setLazyFetch
     * @param lazyFetch {boolean} the lazyFetch mode to set
     */
    collection.setLazyFetch = function(lazyFetch) {
      collection.lazyFetch = lazyFetch;
    };

    /**
     * Gets the lazyFetch mode.
     * @method isLazyFetch
     * @return {boolean} true if this collection fetches lazily.
     */
    collection.isLazyFetch = function() {
      return collection.lazyFetch;
    };
  };

  return {
    /**
     * The super constructor / initialize method for collections.
     * Allocate new memory for the local references if they
     * were null when this method was called.
     * @method super
     */
    super: function(args) {
      baseSuper.call(this, args);
      this.isRequester = args && args.isRequester;
      if (!this.isRequester) {
        cacheMixin(this, {
          requestMap: {},
          collectionTrackedIds: [],
          knownPrivateCollections: {}
        });
      }
    },

    /**
     * The default initialize method should simply call the
     * super constructor.
     * @method initialize
     * @param [args] {Object} Optional argument object
     */
    initialize: function(args) {
      this.super(args);
    },

    /**
     * Will abolish all listeners and events that are hooked
     * to this collection.
     * @method dispose
     */
    dispose: function() {
      this.unbind();
      this.off();
      this.stopListening();
      this.stopPolling();
      if (this.isRequester) {
        this.requesterDispose();
      }
    },

    /**
     * The default filter.  Always returns itself.
     * @method filterDefault
     * @return {Collection} a new instance of this collection
     */
    filterDefault: function() {
      return this.constructor(this);
    }
  };
})(Torso.Collection.prototype));

/**
 * Periodic Polling Object to be mixed into Backbone Collections and Models.
 *
 * The polling functionality should only be used for collections and for models that are not
 * part of any collections. It should not be used for a model that is a part of a collection.
 * @module    Torso
 * @namespace Torso.Mixins
 * @class  PollingMixin
 * @author ariel.wexler@vecna.com
 */
(function() {
  var pollingMixin = {
    /**
     * @property pollTimeoutId {Number} The id from when setTimeout was called to start polling.
     */
    pollTimeoutId: undefined,
    _pollStarted: false,
    _pollInterval: 5000,

    /**
     * Returns true if the poll is active
     * @method isPolling
     */
    isPolling: function() {
      return this._pollStarted;
    },

    /**
     * Starts polling Model/Collection by calling fetch every pollInterval.
     * Note: Each Model/Collection will only allow a singleton of polling to occur so
     * as not to have duplicate threads updating Model/Collection.
     * @method startPolling
     * @param  pollInterval {Integer} interval between each poll in ms.
     */
    startPolling: function(pollInterval) {
      if (pollInterval) {
        this._pollInterval = pollInterval;
      }
      // have only 1 poll going at a time
      if (this._pollStarted) {
        return;
      } else {
        this._pollStarted = true;
        this._poll();
        this.pollTimeoutId = window.setInterval(Torso.$.proxy(function() {
          this._poll();
        }, this), this._pollInterval);
      }
    },

    /**
     * Stops polling Model and clears all Timeouts.
     * @method  stopPolling
     */
    stopPolling: function() {
      window.clearInterval(this.pollTimeoutId);
      this._pollStarted = false;
    },

    /**
     * By default, the polled fetching operation is routed directly
     * to backbone's fetch all.
     * @method polledFetch
     */
    polledFetch: function() {
      this.fetch();
    },

    /**
     * Private function to recursively call itself and poll for db updates.
     * @private
     * @method _poll
     */
    _poll: function() {
      this.polledFetch();
    }
  };

  // Add the mixin to both models and collections.
  _.extend(Torso.Collection.prototype, pollingMixin);
  _.extend(Torso.Model.prototype, pollingMixin);
  _.extend(Torso.NestedModel.prototype, pollingMixin);
})();
/**
 * Custom View mixins:
 * - Unique GUID setting
 * - creation of private collections for views
 * - cleanup methods for safe disposal of UI + events
 *
 * @module    Torso
 * @namespace Torso.Mixins.View
 * @class  ViewMixin
 * @author ariel.wexler@vecna.com
 */
Torso.Mixins.View = {
  _GUID: null,
  _childViews: null,
  tabInfo: null,

  /**
   * The super constructor / initialize method for views.
   * Creates a unique GUID for this view.
   * @method super
   */
  super: function() {
    this.generateGUID();
    this._childViews = {};
  },

  /**
   * The default initialize method should simply call the
   * super constructor.
   * @method initialize
   */
  initialize: function() {
    this.super();
  },

  /**
   * Generates and sets this view's GUID (if null)
   * @method generateGUID
   */
  generateGUID: function() {
    if (this._GUID === null) {
      this._GUID = Torso.GUIDManager.generate(this);
    }
  },

  /**
   * Returns the GUID
   *
   * @method getGUID
   */
  getGUID: function() {
    return this._GUID;
  },

  /**
   * Trigger a change:tab-info event, so any tab view listening can react to it.
   * @method triggerInfoChange
   */
  triggerTabInfoChange: function() {
    this.trigger('change:tab-info', this.tabInfo);
  },

  /**
   * Hotswap rendering system reroute method.
   * @method templateRender
   * See Torso.TemplateRenderer#render for params
   */
  templateRender: function(el, template, context, opts) {
    Torso.TemplateRenderer.render(el, template, context, opts);
  },

  /**
   * Creates a private collection object for this view using the
   * input collection as a reference.  If the invoking view is
   * visiting this method for the first time, the view will be
   * assigned a unique requester Id.  Private collections have all
   * the functionality of the original collection, but are automatically
   * managed by the parent (passed in) collection.  That is, any view
   * using a provate collection should only have to worry about registering
   * Ids of interest, and the rest is managed behind the scenes.
   * @method createPrivateCollection
   * @param  parentCollection {Collection} The parent collection to mimic and link to
   * @return {Collection} The new private collection
   */
  createPrivateCollection: function(parentCollection) {
    return parentCollection.createPrivateCollection(this._GUID);
  },

  /**
   * Removes all events and corresponding DOM for a view.
   * Guarantees to call call "cleanSubviews" to enforce
   * recursive removal of views.
   * @method cleanupSelf
   */
  cleanupSelf: function() {
    // Clean up child views first
    this.cleanupChildViews();

    // Unbind all local event bindings
    this.unbind();
    this.off();
    this.stopListening();

    // Remove view from DOM
    this.remove();

    // Undelegates events
    this.undelegateEvents();

    // Delete the dom references
    delete this.$el;
    delete this.el;
  },

  /**
   * Default child view cleanup method that may be overriden.
   * @method cleanupChildViews
   */
  cleanupChildViews: function() {
    // do nothing
  },

  /**
   * Injects a child view and triggers a re-render on that view
   * @method injectView
   * @param injectionSite {String} The name of the injection site in the layout template
   * @param view          {View}   The instantiated view object to inject
   */
  injectView: function(injectionSite, view) {
    var injectionPoint = this.$el.find('[inject=' + injectionSite + ']');

    if (view && injectionPoint) {
      injectionPoint.html(view.$el);
      view.render();
    }
  },

  /**
   * Default render method that may be overriden.
   * @method render
   */
  render: function() {
    //do nothing
  },

  /**
   * Default pipes directly to cleanupSelf. Called while
   * recursively removing views from the hierarchy.
   * @method dispose
   */
  dispose: function() {
    this.cleanupSelf();
  }
};

_.extend(Torso.View.prototype, Torso.Mixins.View);
/**
 * Generic Form Model
 * @module    Torso
 * @namespace Torso.Models
 * @class     Form
 * @constructor
 * @author kent.willis@vecna.com
 */
Torso.Models.Form = Torso.NestedModel.extend({
  /**
   * @private
   * @property _computed
   * @type Array
   **/
  /**
   * @private
   * @property _cache
   * @type Object
   **/
  /**
   * @private
   * @property _modelConfigs
   * @type Array
   **/
  /**
   * @private
   * @property _currentUpdateEvents
   * @type Array
   **/
  /**
   * @property validation
   * @type Object
   **/
  /**
   * @property labels
   * @type Object
   **/
  /**
   * @property defaultMapping
   * @type Object|Function
   **/
  defaultMapping: null,

  /**
   * Initializes the form model. Can take in attributes to set initially. These will override any pulled values from object models
   * on initialization. On initialization the object model's values will be pulled once.
   * For the options, here are needed definitions:
   * Model Configuration: {
   *   model: {Object} An object model
   *   [fields]: {Array} An array of strings where each String value corresponds to an attribute in the model. Leave empty if you
   *     want to listen to all the fields.
   * }
   * Computed Configuration: {
   *   models: {Array} of Model Configurations that are needed for the computation
   *   pull: {Function} a callback that will be invoked when pulling data from the Object model. The arguments to this function
   *     will be a copy of all the fields defined by the models array in order that they were defined including the models array
   *     order. If any model configuration does not contain a fields array, a hash will be provided for that entry into the model
   *     array that will contain a copy of all the attributes of that model.
   *   push: {Function} a callback that will be invoked when pushing data to the Object model. It will take a single argument,
   *     an array of all the models defined in the the model configuration array: _.pluck(computedConfig.models, 'model')
   * }
   * @method initialize
   * @param [options] {Object}
   *   @param [options.models] {Array} list of model configurations. These will dictate what fields from the Object model will be
   *     used during the pulling and pushing. Will be ignored if options.model exists.
   *   @param [options.model] {Backbone.Model} An object model to track. Short hand for options.models of size one.
   *   @param [options.fields] {Array} An array of fields to track off of options.model. If left not defined, all fields will
   *     be tracked.
   *   @param [options.computed] {Array} list of computed value configurations. These give you flexibility in how fields are copied
   *     to and from any number of Object models.
   *   @param [options.startUpdating=false] {Boolean} set to true if you want to immediately set up listeners to update this form
   *     model as the object model updates. You can always toggle this state with startUpdating() and stopUpdating().
   *   @param [options.validation] {Object} A Backbone.Validation plugin hash to dictate the validation rules
   *   @param [options.labels] {Object} A Backbone.Validation plugin hash to dictate the attribute labels
   */
  initialize: function(attributes, options) {
    this._computed = [];
    this._cache = {};
    this._currentUpdateEvents = [];
    this._modelConfigs = [];
    options = options || {};
    this._initMappings(options);

    // override + extend the validation and labels hashes
    this.validation = _.extend({}, this.validation || {}, options.validation || {});
    this.labels = _.extend({}, this.labels || {}, options.labels || {});

    // Do an initial pull
    this.pull();

    // The pull may have overridden default attributes
    if (attributes) {
      this.set(attributes);
    }

    // Begin updating if requested
    if (options.startUpdating) {
      this.startUpdating();
    }
    this.trigger('initialization-complete');
  },

  /**
   * Add a model that this form model should track against
   * @method addModel
   * @param modelConfig {Object} the Object model configuration you are tracking.
   *   @param modelConfig.model {Backbone.Model} the object model
   *   @param [modelConfig.fields] {Array} an array of strings where each String value corresponds to an attribute in the model.
   *     Leave empty if you want to listen to all the fields.
   * @param [copy=false] {Boolean} set to true if you want to make an initial pull from the object model upon adding.
   */
  addModel: function(modelConfig, copy) {
    this._modelConfigs.push(modelConfig);
    if (copy) {
      this._copyFields(modelConfig.fields, this, modelConfig.model);
      this._updateCache(modelConfig.model);
    }
  },

  /**
   * Add a computed value. This allows you to alter fields before pulling and pushing to/from the Object model. It also allows you
   * to aggregate or separate fields from the Object model.
   * @method addComputed
   * @param computedConfig {Object} the configuration for a computed field(s)
   *   @param computedConfig.models {Array} of Model Configurations that are needed for the computation
   *   @param computedConfig.pull {Function} a callback that will be invoked when pulling data from the Object model. The arguments
   *     to this function will be a copy of all the fields defined by the models array in order that they were defined including the
   *     models array order. If any model configuration does not contain a fields array, a hash will be provided for that entry into
   *     the model array that will contain a copy of all the attributes of that model.
   *   @param computedConfig.push {Function} a callback that will be invoked when pushing data to the Object model. It will take a single
   *     argument, an array of all the models defined in the the model configuration array: _.pluck(computedConfig.models, 'model')
   * @param [copy=false] {Boolean} set to true if you want to make an initial pull from the object models upon adding.
   */
  addComputed: function(computedConfig, copy) {
    this._computed.push(computedConfig);
    if (copy) {
      this._invokeComputedPull.call({formModel: this, models: computedConfig.models, pull: computedConfig.pull});
      _.each(computedConfig.models, function(modelConfig) {
        this._updateCache(modelConfig.model);
      }, this);
    }
  },

  /**
   * @method isTrackingObjectModel
   * @return true if this form model is backed by an Object model. That means that at least one model was added or one computed
   * value was added to this form model.
   */
  isTrackingObjectModel: function() {
    return _.size(this._modelConfigs) > 0 || _.size(this._computed) > 0;
  },

  /**
   * @method isUpdating
   * @return true if any updates to an object model will immediately copy new values into this form model.
   */
  isUpdating: function() {
    return this._currentUpdateEvents.length > 0;
  },

  /**
   * Will add listeners that will automatically pull new updates from this form's object models.
   * @param [pullFirst=false] {Boolean} if true, the form model will pull most recent values then start listening
   * @method startUpdating
   */
  startUpdating: function(pullFirst) {
    if (this.isTrackingObjectModel() && !this.isUpdating()) {
      if (pullFirst) {
        this.pull();
      }
      this._setupListeners();
    }
  },

  /**
   * This will stop the form model from listening to its object models.
   * @method stopUpdating
   */
  stopUpdating: function() {
    _.each(this._currentUpdateEvents, function(eventConfig) {
      this.stopListening(eventConfig.model, eventConfig.eventName);
    }, this);
    this._currentUpdateEvents = [];
  },

  /**
   * Pushes the form model values to the object models it is tracking and invokes save on each one. Returns a promise.
   * @param [options] {Object}
   *   @param [options.rollback=true] {Boolean} if true, when any object model fails to save, it will revert the object
   *     model attributes to the state they were before calling save. NOTE: if there are updates that happen
   *     to object models within the timing of this save method, the updates could be lost.
   *   @param [options.force=true] {Boolean} if false, the form model will check to see if an update has been made
   *     to any object models it is tracking since it's last pull. If any stale data is found, save with throw an exception
   *     with attributes: {name: 'Stale data', staleModels: [Array of model cid's]}
   * @return a promise that will either resolve when all the models have successfully saved in which case the context returned
   *   is an array of the responses (order determined by first the array of models and then the array of models used by
   *   the computed values, normalized), or if any of the saves fail, the promise will be rejected with an array of responses.
   *   Note: the size of the failure array will always be one - the first model that failed. This is a side-effect of $.when
   * @method save
   */
  save: function(options) {
    var notTrackingResponse,
      promise = new Torso.$.Deferred();
    options = options || {};
    _.defaults(options, {
      rollback: true,
      force: true
    });
    if (this.isTrackingObjectModel()) {
      (function(formModel) {
        var staleModels,
          responsesSucceeded = 0,
          responsesFailed = 0,
          responses = {},
          oldValues = {},
          models = formModel._getAllModels(true),
          numberOfSaves = models.length;
        // If we're not forcing a save, then throw an error if the models are stale
        if (!options.force) {
          staleModels = formModel.checkIfModelsAreStale();
          if (staleModels.length > 0) {
            throw {
              name: 'Stale data',
              staleModels: staleModels
            };
          }
        }
        // Callback for each response
        function responseCallback(response, model, success) {
          // Add response to a hash that will eventually be returned through the promise
          responses[model.cid] = {
              success: success,
              response: response
            };
          // If we have reached the total of number of expected responses, then resolve or reject the promise
          if (responsesFailed + responsesSucceeded === numberOfSaves) {
            if (responsesFailed > 0) {
              // Rollback if any responses have failed
              if (options.rollback) {
                _.each(formModel._getAllModels(true), function(model) {
                  model.set(oldValues[model.cid]);
                  if (responses[model.cid].success) {
                    model.save();
                  }
                });
              }
              formModel.trigger('save-fail', responses);
              promise.reject(responses);
            } else {
              formModel.trigger('save-success', responses);
              promise.resolve(responses);
            }
          }
        }
        // Grab the current values of the object models
        _.each(models, function(model) {
          oldValues[model.cid] = formModel._getTrackedModelFields(model);
        });
        // Push the form model values to the object models
        formModel.push();
        // Call save on each object model
        _.each(models, function(model) {
          model.save().fail(function() {
            responsesFailed++;
            responseCallback(arguments, model, false);
          }).done(function() {
            responsesSucceeded++;
            responseCallback(arguments, model, true);
          });
        });
      })(this);
      return promise.promise();
    } else {
      // Return a response that is generated when this form model is not tracking an object model
      notTrackingResponse = {
        'none': {
          success: false,
          response: [{
            responseJSON: {
              generalReasons: [{messageKey: 'no.models.were.bound.to.form'}]
            }
          }]
        }
      };
      this.trigger('save-fail', notTrackingResponse);
      return (new Torso.$.Deferred()).reject(notTrackingResponse).promise();
    }
  },

  /**
   * Pushes values from this form model back to the object models it is tracking. This includes invoking the push callbacks from
   * computed values
   * @method push
   */
  push: function() {
    _.each(this._modelConfigs, function(modelConfig) {
      this._copyFields(modelConfig.fields, modelConfig.model, this);
    }, this);
    _.each(this._computed, function(computedConfig) {
      // If a push callback is defined, fire it.
      if (computedConfig.push) {
        computedConfig.push.apply(this, [_.pluck(computedConfig.models, 'model')]);
      }
    }, this);
  },

  /**
   * Pulls the most recent values of every object model that this form model tracks including computed values
   * NOTE: using this method can override user-submitted data. Use caution.
   * @method pull
   */
  pull: function() {
    _.each(this._modelConfigs, function(modelConfig) {
      this._copyFields(modelConfig.fields, this, modelConfig.model);
      this._updateCache(modelConfig.model);
    }, this);
    _.each(this._computed, function(computedConfig) {
      this._invokeComputedPull.call({formModel: this, models: computedConfig.models, pull: computedConfig.pull});
      _.each(computedConfig.models, function(modelConfig) {
        this._updateCache(modelConfig.model);
      }, this);
    }, this);
  },

  /**
   * @param model {Backbone.Model} the backbone model that is being checked
   * @param [staleModels] {Object} a hash that will be updated to contain this model if it is stale in the form: cid -> model.
   * @param [currentHashValues] {Object} If passed an object, it will look in this cache for the current value of the object model
   *   instead of calculating it. It should be key'ed by the model's cid
   * @return {Boolean} true if the model passed in has been changed since the last pull from the object model.
   * @method isModelStale
   */
  isModelStale: function(model, staleModels, currentHashValues) {
    var hashValue;
    currentHashValues = currentHashValues || {};
    if (!currentHashValues[model.cid]) {
      currentHashValues[model.cid] = this._generateHashValue(model);
    }
    hashValue = currentHashValues[model.cid];
    var isStaleModel = this._cache[model.cid] !== hashValue;
    if (staleModels) {
      if (isStaleModel) {
        staleModels[model.cid] = model;
      } else if (staleModels[model.cid]) {
        delete staleModels[model.cid];
      }
    }
    return isStaleModel;
  },

  /**
   * @return {Array} an array of the object models that have been updated since the last pull from this form model
   * @method checkIfModelsAreStale
   */
  checkIfModelsAreStale: function() {
    var staleModels = {},
      currentHashValues = this._generateAllHashValues();
    _.each(this._getAllModels(true), function(model) {
      this.isModelStale(model, staleModels, currentHashValues);
    }, this);
    return _.values(staleModels);
  },

  /**
   * Sets up a listener to update the form model if the model's field changes.
   * @param model {Backbone.Model} the object model from which this form model will start listen to changes
   * @param field {String} the field name that it will start listening to.
   * @method listenToModelField
   */
  listenToModelField: function(model, field) {
    var eventName = 'change:' + field;
    this.listenTo(model, eventName, _.bind(this._updateFormField,
        {formModel: this, field: field}));
    this._currentUpdateEvents.push({model: model, eventName: eventName});
  },

  /**
   * Sets up a listener on one of the fields that is needed to update a computed value
   * @param computedConfig {Object} the Computed Config that will be updated when changes occur
   * @param model {Backbone.Model} the object model from which this form model will start listen to changes
   * @param field {String} the field name that it will start listening to.
   * @method listenToComputedValuesDependency
   */
  listenToComputedValuesDependency: function(computedConfig, model, field) {
    var eventName = 'change:' + field;
    this.listenTo(model, 'change:' + field, _.bind(this._invokeComputedPull,
        {formModel: this, models: computedConfig.models, pull: computedConfig.pull}));
    this._currentUpdateEvents.push({model: model, eventName: eventName});
  },

  /**
   * Deep clones the attributes. There should be no functions in the attributes
   * @param val {Object|Array|Basic Data Type} a non-function value
   * @return the clone
   * @private
   * @method _clone
   */
  _clone: function(val) {
    var seed;
    if (_.isArray(val)) {
      seed = [];
    } else if (_.isObject(val)) {
      seed = {};
    } else {
      return val;
    }
    return Torso.$.extend(true, seed, val);
  },

  /**
   * Attaches listeners to the tracked object models with callbacks that will copy new properties into this form model.
   * @private
   * @method _setupListeners
   */
  _setupListeners: function() {
    _.each(this._modelConfigs, function(modelConfig) {
      if (modelConfig.fields) {
        _.each(modelConfig.fields, function(field) {
          this.listenToModelField(modelConfig.model, field);
        }, this);
      } else {
        this.listenTo(modelConfig.model, 'change', this._updateFormModel, this);
        this._currentUpdateEvents.push({model: modelConfig.model, eventName: 'change'});
      }
    }, this);
    _.each(this._computed, function(computedConfig) {
      _.each(computedConfig.models, function(modelConfig) {
        _.each(modelConfig.fields, function(field) {
          this.listenToComputedValuesDependency(computedConfig, modelConfig.model, field);
        }, this);
      }, this);
    }, this);
  },

  /**
   * Copies fields from one backbone model to another. Is useful during a pull or push to/from Object models. The values will
   * be deep cloned from the origin to the destination.
   * @param [fields] {Array} a string of attribute names on the origin model that will be copied. Leave null if all attributes
   *   are to be copied
   * @param destination {Backbone.Model} the backbone model that will have values copied into
   * @param origin {Backbone.Model} the backbone model that will be used to grab values.
   * @private
   * @method _copyFields
   */
  _copyFields: function(fields, destination, origin) {
    if (!fields && this === origin) {
      fields = _.keys(destination.attributes);
    }
    if (fields) {
      _.each(fields, function(field) {
        destination.set(field, this._clone(origin.get(field)));
      }, this);
    } else {
      destination.set(this._clone(origin.attributes));
    }
  },

  /**
   * Updates a single attribute in this form model.
   * NOTE: requires the context of this function to be:
   * {
   *  formModel: <this form model>,
   *  field: <the field being updated>
   * }
   * @private
   * @method _updateFormField
   */
  _updateFormField: function(model, value) {
    this.formModel.set(this.field, value);
    this.formModel._updateCache(model);
  },

  /**
   * Create a hash value of a simple object
   * @param obj {Object} simple object with no functions
   * @return a hash value of the object
   * @private
   * @method _hashValue
   */
  _hashValue: function(obj) {
    return JSON.stringify(obj);
  },

  /**
   * @param model {Backbone.Model} the model to create the hash value from
   * @return {String} the hash value of the model making sure to only use the tracked fields
   * @private
   * @method _generateHashValue
   */
  _generateHashValue: function(model) {
    var modelFields = this._getTrackedModelFields(model);
    return this._hashValue(modelFields);
  },

  /**
   * @return {Object} a map of model's cid to the hash value of the model making sure to only use the tracked fields
   * @private
   * @method _generateAllHashValues
   */
  _generateAllHashValues: function() {
    var currentHashValues = {};
    _.each(this._getAllModels(true), function(model) {
      currentHashValues[model.cid] = this._generateHashValue(model);
    }, this);
    return currentHashValues;
  },

  /**
   * Updates this form model with the changed attributes of a given object model
   * @param model {Backbone.Model} the object model that has been changed
   * @private
   * @method _updateFormModel
   */
  _updateFormModel: function(model) {
    _.each(model.changedAttributes(), function(value, fieldName) {
      this.set(fieldName, this._clone(value));
    }, this);
    this._updateCache(model);
  },

  /**
   * Updates the form model's snapshot of the model's attributes to use later
   * @param model {Backbone.Model} the object model
   * @param [cache=this._cache] {Object} if passed an object (can be empty), this method will fill
   *   this cache object instead of this form model's _cache field
   * @private
   * @method _updateCache
   */
  _updateCache: function(model) {
    this._cache[model.cid] = this._generateHashValue(model);
  },

  /**
   * @param [options] {Object} See initialize option's 'model', 'fields', 'models', 'computed'.
   * @private
   * @method _initMappings
   */
  _initMappings: function(options) {
    var defaultMapping = _.result(this, 'mapping'),
      optionsMapping = _.pick(options, ['model', 'fields', 'models', 'computed']);
    this._initModels(optionsMapping, defaultMapping);
    this._initComputeds(optionsMapping, defaultMapping);
  },

  /**
   * @param [optionsMapping] {Object} a mapping object with override values
   * @param [defaultMapping] {Object} the default mapping object
   * @private
   * @method _initModels
   */
  _initModels: function(optionsMapping, defaultMapping) {
    var modelConfigs = this._pullModelsFromMapping(optionsMapping) || this._pullModelsFromMapping(defaultMapping);
    _.each(modelConfigs, this.addModel, this);
  },

  /**
   * @param [optionsMapping] {Object} a mapping object with override values
   *   @param [optionsMapping.computed] {Array} an array of Computed Configs
   * @param [defaultMapping] {Object} the default mapping object
   *   @param [defaultMapping.computed] {Array} and array of Computed Configs
   * @private
   * @method _initComputeds
   */
  _initComputeds: function(optionsMapping, defaultMapping) {
    var computeds;
    optionsMapping = optionsMapping || {};
    defaultMapping = defaultMapping || {};
    computeds = optionsMapping.computed || defaultMapping.computed;
    _.each(computeds, this.addComputed, this);
  },

  /**
   * @param [mapping] {Object} an object with object model(s) as dependencies
   * @return {Boolean} true if the mapping exists and specifies an object model dependency
   * @private
   * @method _mappingHasModels
   */
  _mappingHasModels: function(mapping) {
    return mapping && (mapping.model || mapping.models);
  },

  /**
   * @param [mapping] {Object} object with attributes that contain either a model/field pair as a convenience or an array of
   *   model configs. The model/field pair takes priority if both exist.
   * @return {Array} an array of model configs that are either from the mapping.model or mapping.model. If no model configs are
   *   defined in the mapping, it will return null.
   * @private
   * @method _pullModelsFromMapping
   */
  _pullModelsFromMapping: function(mapping) {
    var modelConfigs = [];
    if (mapping && mapping.model) {
      modelConfigs.push({
        model: mapping.model,
        fields: mapping.fields
      });
    } else if (mapping && mapping.models) {
      modelConfigs = mapping.models.slice();
    }
    return modelConfigs.length === 0 ? null : modelConfigs;
  },

  /**
   * @param model {Backbone.Model} the object model
   * @return {Object} an object with key's as the fields this form model is tracking against
   *   the model and value's as the current value in that object model
   * @private
   * @method _getTrackedModelFields
   */
  _getTrackedModelFields: function(model) {
    var allFields,
      fieldsUsed = {},
      modelFields = {},
      modelConfigs = [];
    _.each(this._getAllModelConfigs(), function(modelConfig) {
      if (modelConfig.model.cid === model.cid) {
        modelConfigs.push(modelConfig);
      }
    });
    allFields = _.reduce(modelConfigs, function(result, modelConfig) {
      return result || !modelConfig.fields;
    }, false);
    if (allFields) {
      modelFields = this._clone(model.attributes);
    } else {
      _.each(modelConfigs, function(modelConfig) {
        _.each(modelConfig.fields, function(field) {
          if (!fieldsUsed[field]) {
            fieldsUsed[field] = true;
            modelFields[field] = this._clone(model.get(field));
          }
        }, this);
      }, this);
    }
    return modelFields;
  },

  /**
   * @param [normalize=false] {Boolean} if true, there will be no duplicate models in the list
   * @return {Array} a list of object models that this form model is using a dependencies. Includes those defined in the
   *   computed fields
   * @private
   * @method _getAllModels
   */
  _getAllModels: function(normalize) {
    var modelsSeen = {},
      models = _.pluck(this._getAllModelConfigs(), 'model');
    if (normalize) {
      var normalizedModels = [];
      _.each(models, function(model) {
        if (!modelsSeen[model.cid]) {
          modelsSeen[model.cid] = true;
          normalizedModels.push(model);
        }
      });
      models = normalizedModels;
    }
    return models;
  },

  /**
   * @return {Array} a list of Model Configurations that this form model is using a dependencies. Includes those defined in the
   *   computed fields
   * @private
   * @method _getAllModelConfigs
   */
  _getAllModelConfigs: function() {
    var modelConfigs = this._modelConfigs.slice();
    _.each(this._computed, function(computedConfig) {
      modelConfigs = modelConfigs.concat(computedConfig.models);
    });
    return modelConfigs;
  },

  /**
   * A wrapper function that can invoke the pull callback on a Computed Configuration. The pull callback in the Computed
   * Configuration will be passed a list of arguments. This list will be a copy of all the fields defined by the models array in
   * order that they were defined including the models array order. If any model configuration does not contain a fields array, a
   * hash will be provided for that entry into the model array that will contain a copy of all the attributes of that model.
   * @param [model] {Backbone.Model} the model that was updated. If provided, the cache will be updated
   * NOTE: requires the context of this function to be:
   * {
   *  formModel: <this form model>,
   *  models: <the 'models' array of model configurations from the Computed Configuration>,
   *  update: <the update callback from the Computed Configuration>,
   * }
   * @private
   * @method _invokeComputedPull
   */
  _invokeComputedPull: function(model) {
    var args = [];
    if (model) {
      this.formModel._updateCache(model);
    }
    (function(formModel, pullCallback, modelConfigs) {
      _.each(modelConfigs, function(modelConfig) {
        if (modelConfig.fields) {
          _.each(modelConfig.fields, function(field) {
            args.push(formModel._clone(modelConfig.model.get(field)));
          });
        } else {
          args.push(formModel._clone(modelConfig.model.attributes));
        }
      });
      pullCallback.apply(formModel, args);
    })(this.formModel, this.pull, this.models);
  }
});

_.extend(Torso.Models.Form.prototype, Torso.Mixins.Validation);
/**
 * Service object
 * Accepts a module method and returns a pure backbone Model object.
 * This allows services to hook in to all change events that models offer.
 * @module    Torso
 * @namespace Torso
 * @class  Service
 * @author ariel.wexler@vecna.com
 */
Torso.Service = function(serviceModule) {
  return function() {
    var module, ExtendedModule, model;
    module = serviceModule.apply(this, arguments);
    ExtendedModule = Backbone.Model.extend(module);
    model = new ExtendedModule();
    return model;
  };
};
/**
 * Generic Form View
 * @module    Torso
 * @namespace Torso.Views
 * @class     Form
 * @constructor
 * @author ariel.wexler@vecna.com
 */
Torso.Views.Form = Torso.View.extend({
  /**
   * Validation error hash
   * @private
   * @property _errors
   * @type Object
   **/
  /**
   * Validation success
   * @private
   * @property _success
   * @type Boolean
   **/
  /**
   * Stickit bindings hash local backup
   * @private
   * @property _bindings
   * @type Object
   */
  /**
   * Handlebars template for form
   * @property template
   * @type HTMLtemplate
   **/
  /**
   * Backbone events hash
   * @property events
   * @type Object
   **/
  /**
   * Two-way binding field customization
   * @property fields
   * @type Object
   **/
  /**
   * Stickit bindings hash
   * @property bindings
   * @type Object
   **/

  /**
   * Initialize the form view object.
   * Override to add more functionality
   * @method initialize
   * @param args {Object} - options argument
   * @param args.model       {Torso.Models.Form} - requires a form model for binding
   * @param [args.template]  {HTML Template} - overrides the template used by this view
   * @param [args.events]    {Events Hash} - merge + override the events hash used by this view
   * @param [args.fields]    {Field Hash} - merge + override automated two-way binding field hash used by this view
   * @param [args.bindings]  {Binding Hash} - merge + override custom epoxy binding hash used by this view
   */
  initialize: function(args) {
    this.super();

    args = args || {};

    /* Listen to model validation callbacks */
    this.feedbackModel = new Backbone.Model();
    this.model = this.model || (new Torso.Models.Form());
    this.listenTo(this.model, 'validated:valid', this.valid);
    this.listenTo(this.model, 'validated:invalid', this.invalid);

    /* Override template */
    this.template = args.template || this.template;

    /* Merge events, fields, bindings, and computeds */
    this.events = _.extend({}, this.events || {}, args.events || {});
    this.fields = _.extend({}, this.fields || {}, args.fields || {});
    this._errors = [];
    this._success = false;
    this._feedbackEvents = [];
    // this._bindings is a snapshot of the original bindings
    this._bindings = _.extend({}, this.bindings || {}, args.bindings || {});

    /* Render */
    this.render();
  },

  /**
   * Prepare the formview's default render context
   * @method prepare
   * @return {Object}
   *         {Object.errors} A hash of field names mapped to error messages
   *         {Object.success} A boolean value of true if validation has succeeded
   */
  prepare: function() {
    return {
      model: this.model.toJSON(),
      formErrors: (_.size(this._errors) !== 0) ? this._errors : null,
      formSuccess: this._success
    };
  },

  /**
   * Render the formview, delegate the view events, apply two-way bindings,
   * and finally attach the additional plugins.
   * @method render
   */
  render: function() {
    /* Actually render the template */
    var context = this.prepare();
    this.templateRender(this.$el, this.template, context);
    this.delegateEvents();
    this.plug();
  },

  /**
   * Override the delegate events and wrap our custom additions
   * @method delegateEvents
   */
  delegateEvents: function() {
    /* DOM event bindings and plugins */
    this._generateStickitBindings();
    this.stickit();
    Torso.View.prototype.delegateEvents.call(this);
    this._generateFeedbackBindings();
    this._generateFeedbackModelCallbacks();
  },

  /**
   * After all DOM rendering is done, this method is called and attaches any
   * custom plugins to the existing elements.  This method can be overwritten
   * as usual OR extended using <class>.__super__.plug.apply(this, arguments);
   * @method plug
   */
  plug: function() {
    // If the "chosen.js" plugin exists
    var selectApplyChosen = this.$el.find('select');
    if (selectApplyChosen.chosen) {
      selectApplyChosen.chosen({});
    }
  },

  /**
   * Default method called on validation success.
   * @method valid
   */
  valid: function() {
    this._success = true;
    this._errors = [];
    this.render();
  },

  /**
   * Default method called on validation failure.
   * @method valid
   */
  invalid: function(model, errors) {
    this._success = false;
    this._errors = errors;
    this.render();
  },

  /**
   * Invokes a feedback entry's "then" method
   * @param to {String} the "to" field corresponding to the feedback entry to be invoked
   * @param [evt] {Event} the event to be passed to the "then" method
   * @param [indexMap] {Object} a map from index variable name to index value. Needed for "to" fields with array notation.
   * @method invokeFeedback
   */
  invokeFeedback: function(to, evt, indexMap) {
    var result,
      feedbackToInvoke = _.findWhere(this.feedback, {to: to}),
      feedbackModelField = to;
    if (feedbackToInvoke) {
      if (indexMap) {
        feedbackModelField = this._substituteIndicesUsingMap(to, indexMap);
      }
      result = feedbackToInvoke.then.call(this, evt, indexMap);
      this._processFeedbackThenResult(result, feedbackModelField);
    }
  },

  /**
   * Dispose method that intelligently removes any newly allocated
   * resources or event bindings then calls the super class.
   * @method valid
   */
  dispose: function() {
    this.unstickit();
    Torso.Views.Form.__super__.dispose.apply(this, arguments);
  },

  /**
   * Selects all data-model references in this view's DOM, and creates stickit bindings
   * @method _generateStickitBindings
   * @private
   */
  _generateStickitBindings: function() {
    var self = this;
    // Start by removing all old bindings and falling back to the initialized binding contents
    this.bindings = _.extend({}, this._bindings);

    // Stickit model two-way bindings
    _.each(this.$el.find('[data-model]'), function(element) {
      var attr = $(element).data('model'),
          options = self._getFieldOptions(attr),
          fieldBinding = self._generateModelFieldBinding(attr, options);
      self.bindings['[data-model="' + attr + '"]'] = fieldBinding;
    });
  },

  /**
   * Generates callbacks for changes in feedback model fields
   * 'change fullName' -> invokes all the jQuery (or $) methods on the element as stored by the feedback model
   * If feedbackModel.get('fullName') returns:
   * { text: 'my text',
   *   attr: {class: 'newClass'}
   *   hide: [100, function() {...}]
   * ...}
   * Then it will invoke $element.text('my text'), $element.attr({class: 'newClass'}), etc.
   * @private
   * @method _generateFeedbackModelCallbacks
   */
  _generateFeedbackModelCallbacks: function() {
    var self = this;
    // Feedback one-way bindings
    self.feedbackModel.off();
    _.each(this.$el.find('[data-feedback]'), function(element) {
      var attr = $(element).data('feedback');
      self.feedbackModel.on('change:' + attr, (function(field) {
        return function() {
          var $element,
            state = self.feedbackModel.get(field);
          if (!state) {
            return;
          }
          $element = self.$el.find('[data-feedback="' + field + '"]');
          _.each(state, function(value, key) {
            if (_.isArray(value)) {
              $element[key].apply($element, value);
            } else {
              $element[key].call($element, value);
            }
          });
        };
      })(attr));
    });
    _.each(self.feedbackModel.attributes, function(value, attr) {
      self.feedbackModel.trigger('change:' + attr);
    });
  },

  /**
   * @method _getFieldOptions
   * @param attr {String} An attribute of the model
   * @return {Object} Any settings that are associates with that attribute
   */
  _getFieldOptions: function(attr) {
    attr = this._stripAllAttribute(attr);
    return this.fields[attr] || {};
  },

  /**
   * Returns an array of all the values and variables used within the array notations in a string
   * Example: foo.bar[x].baz[0][1].taz[y] will return ['x', 0, 1, 'y']. It will parse integers if they are numbers
   * This does not handle or return any "open" array notations: []
   * @private
   * @method _getAllIndexTokens
   */
  _getAllIndexTokens: function(attr) {
    return _.reduce(attr.match(/\[.+?\]/g), function(result, arrayNotation) {
      var token = arrayNotation.substring(1, arrayNotation.length - 1);
      if (!isNaN(token)) {
        result.push(parseInt(token, 10));
      } else {
        result.push(token);
      }
      return result;
    }, []);
  },

  /**
   * Replaces all array notations with open array notations.
   * Example: foo.bar[x].baz[0][1].taz[y] will return as foo.bar[].baz[][].taz[]
   * @private
   * @method _stripAllAttribute
   */
  _stripAllAttribute: function(attr) {
    attr = attr.replace(/\[.+?\]/g, function() {
      return '[]';
    });
    return attr;
  },

  /**
   * Takes a map from variable name to value to be replaced and processes a string with them.
   * Example: foo.bar[x].baz[0][1].taz[y] and {x: 5, y: 9} will return as foo.bar[5].baz[0][1].taz[9]
   * @private
   * @method _substituteIndicesUsingMap
   */
  _substituteIndicesUsingMap : function(dest, indexMap) {
    var newIndex;
    return dest.replace(/\[.?\]/g, function(arrayNotation) {
      if (arrayNotation.match(/\[\d+\]/g) || arrayNotation.match(/\[\]/g)) {
        return arrayNotation;
      } else {
        newIndex = indexMap[arrayNotation.substring(1, arrayNotation.length - 1)];
        return '[' + (newIndex === undefined ? '' : newIndex) + ']';
      }
    });
  },

  /**
   * Processes the result of the then method. Adds to the feedback model.
   * @param result {Object} the result of the then method
   * @param feedbackModelField {Object} the name of the feedbackModelField, typically the "to" value.
   * @private
   * @method _processFeedbackThenResult
   */
  _processFeedbackThenResult: function(result, feedbackModelField) {
    var newState,
      oldState = this.feedbackModel.get(feedbackModelField);
    newState = $.extend({}, oldState, result);
    this.feedbackModel.set(feedbackModelField, newState, {silent: true});
    this.feedbackModel.trigger('change:' + feedbackModelField);
  },

  /**
   * @method _generateModelFieldBinding
   * @param field {String} A specific model field
   * @param options {Object} Additional heavior options for the bindings
   * @param [options.modelFormat] {Object} The function called before setting model values
   * @param [options.viewFormat] {Object} The function called before setting view values
   * @private
   * @return {<Stickit Binding Hash>}
   */
  _generateModelFieldBinding: function(field, options) {
    var indices = this._getAllIndexTokens(field);
    return {
      observe: field,
      onSet: function(value) {
        var params = [value];
        params.push(indices);
        params = _.flatten(params);
        return options.modelFormat ? options.modelFormat.apply(this, params) : value;
      },
      onGet: function(value) {
        var params = [value];
        params.push(indices);
        params = _.flatten(params);
        return options.viewFormat ? options.viewFormat.apply(this, params) : value;
      }
    };
  },

  /**
   * Creates the "when" bindings, and collates and invokes the "then" methods for all feedbacks
   * Finds all feedback zones that match the "to" field, and binds the "when" events to invoke the "then" method
   * @private
   * @method _generateFeedbackBindings
   */
  _generateFeedbackBindings: function() {
    var self = this;

    // Cleanup previous "on" events
    for (var i = 0; i < this._feedbackEvents.length; i++) {
      this.off(null, this._feedbackEvents[i]);
    }
    this._feedbackEvents = [];

    // For each feedback configuration
    _.each(this.feedback, function(declaration) {
      var destinations = self._getFeedbackDestinations(declaration.to),
        destIndexTokens = self._getAllIndexTokens(declaration.to);

      // Iterate over all destinations
      _.each(destinations, function(dest) {
        var fieldName, indices, indexMap, then, args, method, whenEvents, bindInfo;
        dest = $(dest);
        fieldName = dest.data('feedback');
        indices = self._getAllIndexTokens(fieldName);
        indexMap = {};
        // Generates a mapping from variable name to value:
        // If the destination "to" mapping is: my-feedback-element[x][y] and this particular destination is: my-feedback-element[1][4]
        // then the map would look like: {x: 1, y: 4}
        _.each(destIndexTokens, function(indexToken, i) {
          indexMap[indexToken] = indices[i];
        });
        then = declaration.then;

        // If the "then" clause is a string, assume it's a view method
        if (_.isString(then)) {
          then = self[then];
        } else if (_.isArray(then)) {
          // If the "then" clause is an array, assume it's [viewMethod, arg[0], arg[1], ...]
          args = then.slice();
          method = args[0];
          args.shift();
          then = self[method].apply(self, args);
        }

        // track the indices for binding
        bindInfo = {
          feedbackModelField: fieldName,
          fn: then,
          indices: indexMap
        };
        // Iterate over all "when" clauses
        whenEvents = self._generateWhenEvents(declaration.when, indexMap);
        _.each(whenEvents, function(eventKey) {
          var invokeThen = function(evt) {
            var i, args, result;
            args = [evt];
            newState = {};
            args.push(bindInfo.indices);
            result = bindInfo.fn.apply(self, args);
            self._processFeedbackThenResult(result, bindInfo.feedbackModelField);
          };
          var delegateEventSplitter = /^(\S+)\s*(.*)$/;
          var match = eventKey.match(delegateEventSplitter);
          self.$el.on(match[1] + '.delegateEvents' + self.cid, match[2], _.bind(invokeThen, self));
        });
        // Special "on" listeners
        _.each(declaration.when.on, function(eventKey) {
          var invokeThen = function() {
            var result,
                args = [{
                  args: arguments,
                  type: eventKey
                }];
            args.push(bindInfo.indices);
            result = bindInfo.fn.apply(self, args);
            self._processFeedbackThenResult(result, bindInfo.feedbackModelField);
          };
          self.on(eventKey, invokeThen, self);
          self._feedbackEvents.push(invokeThen);
        });
      });
    });
  },

  /**
   * Returns all elements on the page that match the feedback mapping
   * If dest is: my-feedback-foo[x][y] then it will find all elements that match: data-feedback="my-feedback-foo[*][*]"
   * @param dest {String} the string of the data-feedback
   * @return {jQuery array} all elements on the page that match the feedback mapping
   * @private
   * @method _getFeedbackDestinations
   */
  _getFeedbackDestinations: function(dest) {
    var self = this,
        strippedField = this._stripAllAttribute(dest),
        destPrefix = dest,
        firstArrayIndex = dest.indexOf('[');
    if (firstArrayIndex > 0) {
      destPrefix = dest.substring(0, firstArrayIndex);
    }
    // Tries to match as much as possible by using a prefix (the string before the array notation)
    return this.$el.find('[data-feedback^="' + destPrefix + '"]').filter(function() {
      // Only take the elements that actually match after the array notation is converted to open notation ([x] -> [])
      return self._stripAllAttribute($(this).data('feedback')) === strippedField;
    });
  },

  /**
   * Generates the events needed to listen to the feedback's when methods. A when event is only created
   * if the appropriate element exist on the page
   * @param whenMap the collection of "when"'s for a given feedback
   * @param indexMap map from variable names to values when substituting array notation
   * @return the events that were generated
   * @private
   * @method _generateWhenEvents
   */
  _generateWhenEvents: function(whenMap, indexMap) {
    var self = this,
        events = [];
    _.each(whenMap, function(whenEvents, whenField) {
      var substitutedWhenField,
          qualifiedFields = [whenField],
          useAtNotation = (whenField.charAt(0) === '@');

      if (whenField !== 'on') {
        if (useAtNotation) {
          whenField = whenField.substring(1);
          // substitute indices in to "when" placeholders
          // [] -> to all, [0] -> to specific, [x] -> [x's value]
          substitutedWhenField = self._substituteIndicesUsingMap(whenField, indexMap);
          qualifiedFields = _.flatten(self._generateSubAttributes(substitutedWhenField, self.model));
        }
        // For each qualified field
        _.each(qualifiedFields, function(qualifiedField) {
          _.each(whenEvents, function(eventType) {
            var backboneEvent = eventType + ' ' + qualifiedField;
            if (useAtNotation) {
              backboneEvent = eventType + ' [data-model="' + qualifiedField + '"]';
            }
            events.push(backboneEvent);
          });
        });
      }
    });
    return events;
  },

  /**
   * Generates an array of all the possible field accessors and their indices when using
   * the "open" array notation:
   *    foo[] -> ['foo[0]', 'foo[1]'].
   * Will also perform nested arrays:
   *    foo[][] -> ['foo[0][0]', foo[1][0]']
   * @method _generateSubAttributes
   * @private
   * @param {String} attr The name of the attribute to expand according to the bound model
   * @return {Array<String>} The fully expanded subattribute names
   */
  _generateSubAttributes: function(attr, model) {
    var i, attrName, remainder, subAttrs, values,
      firstBracket = attr.indexOf('[]');
    if (firstBracket === -1) {
      return [attr];
    } else {
      attrName = attr.substring(0, firstBracket);
      remainder = attr.substring(firstBracket + 2);
      subAttrs = [];
      values = model.get(attrName);
      if (!values) {
        return [attr];
      }
      for (i = 0 ; i < values.length; i++) {
        subAttrs.push(this._generateSubAttributes(attrName + '[' + i + ']' + remainder, model));
      }
      return subAttrs;
    }
  }
});

/**
 * Generic List View.
 * More info at 'Webotics --> Backbone Standards --> List View' on the wiki
 * @module    Torso
 * @namespace Torso.Views
 * @class     List
 * @constructor
 * @author ariel.wexler@vecna.com, kent.willis@vecna.com
 */
Torso.Views.List = Torso.View.extend((function() {

  var removeChildView, addChildView;

  /**
   * Handles the removal of a child view if a model has been removed from the collection
   * @private
   * @method removeChildView
   * @param model {Backbone Model instance} the model that has been removed
   */
  removeChildView = function(model) {
    var childView = this._childViews[model.id];
    if (childView) {
      childView.dispose();
      this.trigger('child-view-removed', {model: model, view: childView});
    }
    delete this._childViews[model.id];
    if (_.isEmpty(this._childViews) && this._emptyTemplate) {
      // Render an empty list html block
      this.templateRender(this._findInjectionSite(), this._emptyTemplate, this.prepareEmptyListContext());
    }
  };

  /**
   * Handles the addition of a child view if a model has been added to the collection
   * @private
   * @method addChildView
   * @param model the model being added
   */
  addChildView = function(model) {
    if (this.modelsToRender().indexOf(model) > -1) {
      this.refreshChildrenViews({createNewViews: true});
    }
  };

  return {
    className: '',
    _collection: null,
    _modelName: '',
    _childView: null,
    _template: null,
    _emptyTemplate: null,
    args: null,

    /**
     * Initialize the list view object.
     * Override to add more functionality but remember to call this.listViewSetup(args) first
     * @method initialize
     * @param args {Object} - options argument
     * @param args.childModel {String} - attribute name for the model inside the injected context that's passed to the child view

     * @param args.childView {Backbone.View definition} - the class definition of the child view. This view will be instantiated
     *                                                     for every model returned by modelsToRender()
     * @param args.collection {Backbone.Collection instance} - The collection that will back this list view. A subclass of list view
     *                                                          might provide a default collection. Can be private or public collection
     * @param [args.template] {HTML Template} - allows a list view to hold it's own HTML like filter buttons, etc.
     * @param [args.childrenContainer] {String}  - (Required if 'template' is provided) name of injection site for list of children
     * @param [args.emptyTemplate] {HTML Template} - if provided, this template that will be shown if the modelsToRender() method returns
     *                                             an empty list. If a childrenContainer is provided, the empty template will be
     *                                             rendered there.
     * @param [args.modelsToRender] {Function} - If provided, this function will override the modelsToRender() method with custom
     *                                           functionality.
     */
    initialize: function(args) {
      this.super();
      this.listViewSetup(args);
      this.render();
    },

    /**
     * Set up the list view object. See {#initialize()} to understand the arguments required
     * @method listViewSetup
     * @param args {Object} See initialize method for args documentation as they are identical
     */
    listViewSetup: function(args) {
      var initialModels, i, l, childView,
        injectionSite = this.$el;

      args = args || {};
      this._modelName = args.childModel;
      this._collection = args.collection;
      this._childView = args.childView;
      this._template = args.template;
      this._childrenContainer = args.childrenContainer;
      this._emptyTemplate = args.emptyTemplate;
      this._childViews = {};
      // If a modelsToRender argument was passed in, override the modelsToRender method
      if (args.modelsToRender) {
        this.modelsToRender = args.modelsToRender;
      }

      this.render();

      // save the injected context into a local variable
      this.args = args.context;
      injectionSite = this._findInjectionSite();

      // create the views for the models that are currently in the collection
      initialModels = this.modelsToRender();
      if (initialModels.length > 0) {
        for (i = 0, l = initialModels.length; i < l; i++) {
          childView = this._createChildView(initialModels[i]);
          injectionSite.append(childView.$el);
        }
      }

      // if a 'changed' event happens, the model's view should handle re-rendering itself
      this.listenTo(this._collection, 'remove', removeChildView, this);
      this.listenTo(this._collection, 'add', addChildView, this);
      this.listenTo(this._collection, 'sort', this.sortChildrenViews, this);
      this.listenTo(this._collection, 'reset', this.render, this);
    },

    /**
     * The core rendering method that produces the template for the list view first
     * then invokes a refresh on all children views or renders an empty list template
     * if there are no models in the modelsToRender
     * @method render
     */
    render: function() {
      // Fill out the base html
      if (this._template) {
        // Note: If any dom elements were added or removed from list view's template, the injection site will be reset
        this.templateRender(this.$el, this._template, this.prepare(), {ignoreElements: [this._getInjectionSelector()]});
      }

      if (_.keys(this._childViews).length > 0) {
        // Call a refresh on all children
        // If we could know whether the injection site was ignored, we wouldn't have to refresh the children
        this.refreshChildrenViews();
      } else if (this._emptyTemplate) {
        // Render an empty list html block
        this.templateRender(this._findInjectionSite(), this._emptyTemplate, this.prepareEmptyListContext());
      } else {
        this._findInjectionSite().empty();
      }
      this.delegateEvents();
      this.trigger('render-complete');
    },

    /**
     * Override to prepare a context for the HTML template used as the base list view
     * @method prepare
     * @return {Object} an object to use for HTML templating the base list view
     */
    prepare: function() {
      return {};
    },

    /**
     * Returns an array of which models should be rendered.
     * By default, all models in the input collection will be
     * shown.  Extensions of this class may override this
     * method to apply collection filters.
     * @method modelsToRender
     */
    modelsToRender: function() {
      return this._collection ? this._collection.models : [];
    },

    /**
     * Calls a render on all child views. Do this when you want to rerender the children
     * but not the surrounding list view
     * @method refreshChildrenViews
     * @param [options] {Object} options parameter
     * @param [options.createNewViews] {Boolean} will generate a new child view if new models were added
     * @param [options.retain=true] {Boolean} Will retain all old elements instead of emptying the injection site
     */
    refreshChildrenViews: function(options) {
      var i, childView, model, injectionFragment,
        injectionSite = this._findInjectionSite(),
        models = this.modelsToRender();

      // Create a blank options hash if none passed in
      options = options || {};

      // Clean out old injection site
      if (!options.retain) {
        injectionSite.empty();
      }
      // When we upgrade from jQuery 1.7 to 1.8 we can treat this fragment as a jQuery object
      injectionFragment = document.createDocumentFragment();
      for (i = 0; i < models.length; i++) {
        model = models[i];
        childView = this._childViews[model.id];
        if (!childView && options.createNewViews) {
          childView = this._createChildView(model);
          this.trigger('child-view-added', {model: model, view: childView});
        }
        // Reinsert into injection site and rerender
        if (childView) {
          injectionFragment.appendChild(childView.el);
          childView.render();
        }
      }
      // Reinsert into injection site once to call a single reflow
      injectionSite.append(injectionFragment);
    },

    /**
     * A convenience method that refreshes children views with the appropriate flags
     * Children views will not be refreshed if the order of the models has not changed.
     * @method sortChildrenViews
     */
    sortChildrenViews: function() {
      var childView,
        currentChildren = this.$el.children(),
        models = this.modelsToRender();

      // Trigger a refresh if any DOM elements are out of expected order
      _.each(models, Torso.$.proxy(function(model, i) {
        childView = this._childViews[model.id];
        if (childView) {
          if (currentChildren[i] !== childView.el) {
            this.refreshChildrenViews({retain: true});
            return;
          }
        }
      }, this));
    },

    /**
     * Method to prepare a context for a child view. Override this method
     * in an extension of a list to augment the context for a given child view.
     * Most likely, you'll want to start with the default functionality by
     * calling this.prepareChildContext(model)
     * @method prepareInjectedContext
     * @param model the model for a child view
     * @return a context to be used by a child view
     */
    prepareInjectedContext: function(model) {
      return this.prepareChildContext(model);
    },

    /**
     * The format of the subview's injected context is:
     * {
     *   context: {
     *     ... inherited from parent ...
     *   },
     *   <modelName>: <modelObject>
     * }
     * @method prepareChildContext
     * @return a context that can be used by the child views
     */
    prepareChildContext: function(model) {
      var injectedContext = this.prepareBaseInjectedContext();
      injectedContext[this._modelName] = model;
      return injectedContext;
    },

    /**
     * Override if you want a different context for your empty template
     * The format of the empty list template's context is:
     * {
     *   context: {
     *     ... inherited from parent ...
     *   }
     * }
     * @method prepareEmptyListContext
     * @return a context that can be used by the empty list template
     */
    prepareEmptyListContext: function() {
      return _.extend(this.prepare(), this.prepareBaseInjectedContext());
    },

    /**
     * @method prepareBaseInjectedContext
     * @return a base context and adds the context variables provided by the parent view
     */
    prepareBaseInjectedContext: function() {
      return {'context': _.extend({}, this.args)};
    },

    /**
     * Override the cleanupChildViews method to correctly
     * dispose of all child views.
     * @method cleanupChildViews
     */
    cleanupChildViews: function() {
      var i, key, childView;
      for (i = 0; i < _.keys(this._childViews).length; i++) {
        key = _.keys(this._childViews)[i];
        childView = this._childViews[key];
        if (childView) {
          childView.dispose();
        }
      }
      this._childViews = {};
    },

    /**
     * Creates a child view and stores a reference to it
     * @method _createChildView
     * @private
     * @param model {Backbone Model} the model to create the view from
     * @return {Backbone View} the new child view
     */
    _createChildView: function(model) {
      this._childViews[model.id] = new this._childView(this.prepareInjectedContext(model));
      return this._childViews[model.id];
    },

    /**
     * NOTE: only use this if there is a template for the list view
     * @method _getInjectionSelector
     * @private
     * @return {String} the jQuery selector string for the element to inject the children view
     */
    _getInjectionSelector: function() {
      return '[inject=' + this._childrenContainer + ']';
    },

    /**
     * NOTE: this should only be run after the list view's base template has been rendered.
     * @method _findInjectionSite
     * @private
     * @return {jQuery object} the jQuery element where child view can be injected.
     */
    _findInjectionSite: function() {
      return this._template ? this.$el.find(this._getInjectionSelector()) : this.$el;
    }
  };
})());
return Torso;
}));

!function(e){"undefined"!=typeof exports?e(exports):(window.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return window.hljs}))}(function(e){function n(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0==t.index}function a(e){var n=(e.className+" "+(e.parentNode?e.parentNode.className:"")).split(/\s+/);return n=n.map(function(e){return e.replace(/^lang(uage)?-/,"")}),n.filter(function(e){return N(e)||/no(-?)highlight/.test(e)})[0]}function o(e,n){var t={};for(var r in e)t[r]=e[r];if(n)for(var r in n)t[r]=n[r];return t}function i(e){var n=[];return function r(e,a){for(var o=e.firstChild;o;o=o.nextSibling)3==o.nodeType?a+=o.nodeValue.length:1==o.nodeType&&(n.push({event:"start",offset:a,node:o}),a=r(o,a),t(o).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:o}));return a}(e,0),n}function c(e,r,a){function o(){return e.length&&r.length?e[0].offset!=r[0].offset?e[0].offset<r[0].offset?e:r:"start"==r[0].event?e:r:e.length?e:r}function i(e){function r(e){return" "+e.nodeName+'="'+n(e.value)+'"'}l+="<"+t(e)+Array.prototype.map.call(e.attributes,r).join("")+">"}function c(e){l+="</"+t(e)+">"}function u(e){("start"==e.event?i:c)(e.node)}for(var s=0,l="",f=[];e.length||r.length;){var g=o();if(l+=n(a.substr(s,g[0].offset-s)),s=g[0].offset,g==e){f.reverse().forEach(c);do u(g.splice(0,1)[0]),g=o();while(g==e&&g.length&&g[0].offset==s);f.reverse().forEach(i)}else"start"==g[0].event?f.push(g[0].node):f.pop(),u(g.splice(0,1)[0])}return l+n(a.substr(s))}function u(e){function n(e){return e&&e.source||e}function t(t,r){return RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,i){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var c={},u=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");c[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?u("keyword",a.k):Object.keys(a.k).forEach(function(e){u(e,a.k[e])}),a.k=c}a.lR=t(a.l||/\b[A-Za-z0-9_]+\b/,!0),i&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&i.tE&&(a.tE+=(a.e?"|":"")+i.tE)),a.i&&(a.iR=t(a.i)),void 0===a.r&&(a.r=1),a.c||(a.c=[]);var s=[];a.c.forEach(function(e){e.v?e.v.forEach(function(n){s.push(o(e,n))}):s.push("self"==e?a:e)}),a.c=s,a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,i);var l=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=l.length?t(l.join("|"),!0):{exec:function(){return null}}}}r(e)}function s(e,t,a,o){function i(e,n){for(var t=0;t<n.c.length;t++)if(r(n.c[t].bR,e))return n.c[t]}function c(e,n){return r(e.eR,n)?e:e.eW?c(e.parent,n):void 0}function f(e,n){return!a&&r(n.iR,e)}function g(e,n){var t=x.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function p(e,n,t,r){var a=r?"":E.classPrefix,o='<span class="'+a,i=t?"":"</span>";return o+=e+'">',o+n+i}function d(){if(!w.k)return n(y);var e="",t=0;w.lR.lastIndex=0;for(var r=w.lR.exec(y);r;){e+=n(y.substr(t,r.index-t));var a=g(w,r);a?(B+=a[1],e+=p(a[0],n(r[0]))):e+=n(r[0]),t=w.lR.lastIndex,r=w.lR.exec(y)}return e+n(y.substr(t))}function h(){if(w.sL&&!R[w.sL])return n(y);var e=w.sL?s(w.sL,y,!0,L[w.sL]):l(y);return w.r>0&&(B+=e.r),"continuous"==w.subLanguageMode&&(L[w.sL]=e.top),p(e.language,e.value,!1,!0)}function v(){return void 0!==w.sL?h():d()}function b(e,t){var r=e.cN?p(e.cN,"",!0):"";e.rB?(M+=r,y=""):e.eB?(M+=n(t)+r,y=""):(M+=r,y=t),w=Object.create(e,{parent:{value:w}})}function m(e,t){if(y+=e,void 0===t)return M+=v(),0;var r=i(t,w);if(r)return M+=v(),b(r,t),r.rB?0:t.length;var a=c(w,t);if(a){var o=w;o.rE||o.eE||(y+=t),M+=v();do w.cN&&(M+="</span>"),B+=w.r,w=w.parent;while(w!=a.parent);return o.eE&&(M+=n(t)),y="",a.starts&&b(a.starts,""),o.rE?0:t.length}if(f(t,w))throw new Error('Illegal lexeme "'+t+'" for mode "'+(w.cN||"<unnamed>")+'"');return y+=t,t.length||1}var x=N(e);if(!x)throw new Error('Unknown language: "'+e+'"');u(x);for(var w=o||x,L={},M="",k=w;k!=x;k=k.parent)k.cN&&(M=p(k.cN,"",!0)+M);var y="",B=0;try{for(var C,j,I=0;;){if(w.t.lastIndex=I,C=w.t.exec(t),!C)break;j=m(t.substr(I,C.index-I),C[0]),I=C.index+j}m(t.substr(I));for(var k=w;k.parent;k=k.parent)k.cN&&(M+="</span>");return{r:B,value:M,language:e,top:w}}catch(A){if(-1!=A.message.indexOf("Illegal"))return{r:0,value:n(t)};throw A}}function l(e,t){t=t||E.languages||Object.keys(R);var r={r:0,value:n(e)},a=r;return t.forEach(function(n){if(N(n)){var t=s(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}}),a.language&&(r.second_best=a),r}function f(e){return E.tabReplace&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,n){return n.replace(/\t/g,E.tabReplace)})),E.useBR&&(e=e.replace(/\n/g,"<br>")),e}function g(e,n,t){var r=n?x[n]:t,a=[e.trim()];return e.match(/(\s|^)hljs(\s|$)/)||a.push("hljs"),r&&a.push(r),a.join(" ").trim()}function p(e){var n=a(e);if(!/no(-?)highlight/.test(n)){var t;E.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e;var r=t.textContent,o=n?s(n,r,!0):l(r),u=i(t);if(u.length){var p=document.createElementNS("http://www.w3.org/1999/xhtml","div");p.innerHTML=o.value,o.value=c(u,i(p),r)}o.value=f(o.value),e.innerHTML=o.value,e.className=g(e.className,n,o.language),e.result={language:o.language,re:o.r},o.second_best&&(e.second_best={language:o.second_best.language,re:o.second_best.r})}}function d(e){E=o(E,e)}function h(){if(!h.called){h.called=!0;var e=document.querySelectorAll("pre code");Array.prototype.forEach.call(e,p)}}function v(){addEventListener("DOMContentLoaded",h,!1),addEventListener("load",h,!1)}function b(n,t){var r=R[n]=t(e);r.aliases&&r.aliases.forEach(function(e){x[e]=n})}function m(){return Object.keys(R)}function N(e){return R[e]||R[x[e]]}var E={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},R={},x={};return e.highlight=s,e.highlightAuto=l,e.fixMarkup=f,e.highlightBlock=p,e.configure=d,e.initHighlighting=h,e.initHighlightingOnLoad=v,e.registerLanguage=b,e.listLanguages=m,e.getLanguage=N,e.inherit=o,e.IR="[a-zA-Z][a-zA-Z0-9_]*",e.UIR="[a-zA-Z_][a-zA-Z0-9_]*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/},e.CLCM={cN:"comment",b:"//",e:"$",c:[e.PWM]},e.CBCM={cN:"comment",b:"/\\*",e:"\\*/",c:[e.PWM]},e.HCM={cN:"comment",b:"#",e:"$",c:[e.PWM]},e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e});hljs.registerLanguage("cpp",function(t){var i={keyword:"false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginaryintmax_t uintmax_t int8_t uint8_t int16_t uint16_t int32_t uint32_t  int64_t uint64_tint_least8_t uint_least8_t int_least16_t uint_least16_t int_least32_t uint_least32_tint_least64_t uint_least64_t int_fast8_t uint_fast8_t int_fast16_t uint_fast16_t int_fast32_tuint_fast32_t int_fast64_t uint_fast64_t intptr_t uintptr_t atomic_bool atomic_char atomic_scharatomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llongatomic_ullong atomic_wchar_t atomic_char16_t atomic_char32_t atomic_intmax_t atomic_uintmax_tatomic_intptr_t atomic_uintptr_t atomic_size_t atomic_ptrdiff_t atomic_int_least8_t atomic_int_least16_tatomic_int_least32_t atomic_int_least64_t atomic_uint_least8_t atomic_uint_least16_t atomic_uint_least32_tatomic_uint_least64_t atomic_int_fast8_t atomic_int_fast16_t atomic_int_fast32_t atomic_int_fast64_tatomic_uint_fast8_t atomic_uint_fast16_t atomic_uint_fast32_t atomic_uint_fast64_t",built_in:"std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"};return{aliases:["c","h","c++","h++"],k:i,i:"</",c:[t.CLCM,t.CBCM,t.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},t.CNM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line pragma",c:[{b:'include\\s*[<"]',e:'[>"]',k:"include",i:"\\n"},t.CLCM]},{cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:i,c:["self"]},{b:t.IR+"::"},{bK:"new throw return",r:0},{cN:"function",b:"("+t.IR+"\\s+)+"+t.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:i,c:[{b:t.IR+"\\s*\\(",rB:!0,c:[t.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:i,r:0,c:[t.CBCM]},t.CLCM,t.CBCM]}]}});hljs.registerLanguage("ruby",function(e){var b="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r="and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",c={cN:"yardoctag",b:"@[A-Za-z]+"},a={cN:"value",b:"#<",e:">"},s={cN:"comment",v:[{b:"#",e:"$",c:[c]},{b:"^\\=begin",e:"^\\=end",c:[c],r:10},{b:"^__END__",e:"\\n$"}]},n={cN:"subst",b:"#\\{",e:"}",k:r},t={cN:"string",c:[e.BE,n],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]},i={cN:"params",b:"\\(",e:"\\)",k:r},d=[t,a,s,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+e.IR+"::)?"+e.IR}]},s]},{cN:"function",bK:"def",e:" |$|;",r:0,c:[e.inherit(e.TM,{b:b}),i,s]},{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":",c:[t,{b:b}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+e.RSR+")\\s*",c:[a,s,{cN:"regexp",c:[e.BE,n],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}],r:0}];n.c=d,i.c=d;var l="[>?]>",u="[\\w#]+\\(\\w+\\):\\d+:\\d+>",N="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",o=[{b:/^\s*=>/,cN:"status",starts:{e:"$",c:d}},{cN:"prompt",b:"^("+l+"|"+u+"|"+N+")",starts:{e:"$",c:d}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,c:[s].concat(o).concat(d)}});hljs.registerLanguage("apache",function(e){var r={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"tag",b:"</?",e:">"},{cN:"keyword",b:/\w+/,r:0,k:{common:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"sqbracket",b:"\\s\\[",e:"\\]$"},{cN:"cbracket",b:"[\\$%]\\{",e:"\\}",c:["self",r]},r,e.QSM]}}],i:/\S/}});hljs.registerLanguage("python",function(e){var r={cN:"prompt",b:/^(>>>|\.\.\.) /},b={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[r],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[r],r:10},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},e.ASM,e.QSM]},l={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},c={cN:"params",b:/\(/,e:/\)/,c:["self",r,l,b]};return{aliases:["py","gyp"],k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},i:/(<\/|->|\?)/,c:[r,l,b,e.HCM,{v:[{cN:"function",bK:"def",r:10},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n]/,c:[e.UTM,c]},{cN:"decorator",b:/@/,e:/$/},{b:/\b(print|exec)\(/}]}});hljs.registerLanguage("javascript",function(r){return{aliases:["js"],k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"},c:[{cN:"pi",r:10,v:[{b:/^\s*('|")use strict('|")/},{b:/^\s*('|")use asm('|")/}]},r.ASM,r.QSM,r.CLCM,r.CBCM,r.CNM,{b:"("+r.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[r.CLCM,r.CBCM,r.RM,{b:/</,e:/>;/,r:0,sL:"xml"}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[r.inherit(r.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,c:[r.CLCM,r.CBCM],i:/["'\(]/}],i:/\[|%/},{b:/\$[(.]/},{b:"\\."+r.IR,r:0}]}});hljs.registerLanguage("coffeescript",function(e){var c={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",reserved:"case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",built_in:"npm require console print module global window document"},n="[A-Za-z$_][0-9A-Za-z$_]*",t={cN:"subst",b:/#\{/,e:/}/,k:c},r=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,t]},{b:/"/,e:/"/,c:[e.BE,t]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[t,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{cN:"property",b:"@"+n},{b:"`",e:"`",eB:!0,eE:!0,sL:"javascript"}];t.c=r;var i=e.inherit(e.TM,{b:n}),s="(\\(.*\\))?\\s*\\B[-=]>",o={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:c,c:["self"].concat(r)}]};return{aliases:["coffee","cson","iced"],k:c,i:/\/\*/,c:r.concat([{cN:"comment",b:"###",e:"###",c:[e.PWM]},e.HCM,{cN:"function",b:"^\\s*"+n+"\\s*=\\s*"+s,e:"[-=]>",rB:!0,c:[i,o]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:s,e:"[-=]>",rB:!0,c:[o]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[i]},i]},{cN:"attribute",b:n+":",e:":",rB:!0,rE:!0,r:0}])}});hljs.registerLanguage("http",function(){return{i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:!0}}]}});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",a={cN:"function",b:c+"\\(",rB:!0,eE:!0,e:"\\("};return{cI:!0,i:"[=/|']",c:[e.CBCM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[a,e.ASM,e.QSM,e.CSSNM]}]},{cN:"tag",b:c,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[e.CBCM,{cN:"rule",b:"[^\\s]",rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:!0,i:"[^\\s]",starts:{cN:"value",eW:!0,eE:!0,c:[a,e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"hexcolor",b:"#[0-9A-Fa-f]+"},{cN:"important",b:"!important"}]}}]}]}]}});hljs.registerLanguage("ini",function(e){return{cI:!0,i:/\S/,c:[{cN:"comment",b:";",e:"$"},{cN:"title",b:"^\\[",e:"\\]"},{cN:"setting",b:"^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",e:"$",c:[{cN:"value",eW:!0,k:"on off true false yes no",c:[e.QSM,e.NM],r:0}]}]}});hljs.registerLanguage("objectivec",function(e){var t={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"NSString NSData NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView NSView NSViewController NSWindow NSWindowController NSSet NSUUID NSIndexSet UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection NSURLSession NSURLSessionDataTask NSURLSessionDownloadTask NSURLSessionUploadTask NSURLResponseUIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},o=/[a-zA-Z@][a-zA-Z0-9_]*/,a="@interface @class @protocol @implementation";return{aliases:["m","mm","objc","obj-c"],k:t,l:o,i:"</",c:[e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"preprocessor",b:"#",e:"$",c:[{cN:"title",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+a.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:a,l:o,c:[e.UTM]},{cN:"variable",b:"\\."+e.UIR,r:0}]}});hljs.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)\}/}]},s={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\.]+/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",operator:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"shebang",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,e.NM,s,a,t]}});hljs.registerLanguage("markdown",function(){return{aliases:["md","mkdown","mkd"],c:[{cN:"header",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"blockquote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{cN:"horizontal_rule",b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"link_label",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link_url",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"link_reference",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:"^\\[.+\\]:",rB:!0,c:[{cN:"link_reference",b:"\\[",e:"\\]:",eB:!0,eE:!0,starts:{cN:"link_url",e:"$"}}]}]}});hljs.registerLanguage("java",function(e){var a=e.UIR+"(<"+e.UIR+">)?",t="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",c="(\\b(0b[01_]+)|\\b0[xX][a-fA-F0-9_]+|(\\b[\\d_]+(\\.[\\d_]*)?|\\.[\\d_]+)([eE][-+]?\\d+)?)[lLfF]?",r={cN:"number",b:c,r:0};return{aliases:["jsp"],k:t,i:/<\//,c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",r:0,c:[{cN:"javadoctag",b:"(^|\\s)@[A-Za-z]+"}]},e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return",r:0},{cN:"function",b:"("+a+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:t,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:t,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},r,{cN:"annotation",b:"@[A-Za-z]+"}]}});hljs.registerLanguage("diff",function(){return{aliases:["patch"],c:[{cN:"chunk",r:10,v:[{b:/^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"header",v:[{b:/Index: /,e:/$/},{b:/=====/,e:/=====$/},{b:/^\-\-\-/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+\+\+/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]}});hljs.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},s={b:"->{",e:"}"},n={cN:"variable",v:[{b:/\$\d/},{b:/[\$\%\@](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/},{b:/[\$\%\@][^\s\w{]/,r:0}]},o={cN:"comment",b:"^(__END__|__DATA__)",e:"\\n$",r:5},i=[e.BE,r,n],c=[n,e.HCM,o,{cN:"comment",b:"^\\=\\w",e:"\\=cut",eW:!0},s,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,o,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"sub",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",r:5},{cN:"operator",b:"-\\w\\b",r:0}];return r.c=c,s.c=c,{aliases:["pl"],k:t,c:c}});hljs.registerLanguage("makefile",function(e){var a={cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]};return{aliases:["mk","mak"],c:[e.HCM,{b:/^\w+\s*\W*=/,rB:!0,r:0,starts:{cN:"constant",e:/\s*\W*=/,eE:!0,starts:{e:/$/,r:0,c:[a]}}},{cN:"title",b:/^[\w]+:\s*$/},{cN:"phony",b:/^\.PHONY:/,e:/$/,k:".PHONY",l:/[\.\w]+/},{b:/^\t+/,e:/$/,r:0,c:[e.QSM,a]}]}});hljs.registerLanguage("cs",function(e){var r="abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",t=e.IR+"(<"+e.IR+">)?";return{aliases:["csharp"],k:r,i:/::/,c:[{cN:"comment",b:"///",e:"$",rB:!0,c:[{cN:"xmlDocTag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]},e.CLCM,e.CBCM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line region endregion pragma checksum"},{cN:"string",b:'@"',e:'"',c:[{b:'""'}]},e.ASM,e.QSM,e.CNM,{bK:"class namespace interface",e:/[{;=]/,i:/[^\s:]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"new return throw await",r:0},{cN:"function",b:"("+t+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:r,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:r,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]}]}});hljs.registerLanguage("json",function(e){var t={literal:"true false null"},i=[e.QSM,e.CNM],l={cN:"value",e:",",eW:!0,eE:!0,c:i,k:t},c={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:!0,eE:!0,c:[e.BE],i:"\\n",starts:l}],i:"\\S"},n={b:"\\[",e:"\\]",c:[e.inherit(l,{cN:null})],i:"\\S"};return i.splice(i.length,0,c,n),{c:i,k:t,i:"\\S"}});hljs.registerLanguage("nginx",function(e){var r={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},b={eW:!0,l:"[a-z/_]+",k:{built_in:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,r],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{cN:"url",b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[r]},{cN:"regexp",c:[e.BE,r],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},r]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"title",b:e.UIR,starts:b}],r:0}],i:"[^\\s\\}]"}});hljs.registerLanguage("sql",function(e){var t={cN:"comment",b:"--",e:"$"};return{cI:!0,i:/[<>]/,c:[{cN:"operator",bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup",e:/;/,eW:!0,k:{keyword:"abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}});hljs.registerLanguage("xml",function(){var t="[A-Za-z0-9\\._:-]+",e={b:/<\?(php)?(?!\w)/,e:/\?>/,sL:"php",subLanguageMode:"continuous"},c={eW:!0,i:/</,r:0,c:[e,{cN:"attribute",b:t,r:0},{b:"=",r:0,c:[{cN:"value",c:[e],v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:!0,c:[{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[c],starts:{e:"</style>",rE:!0,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[c],starts:{e:"</script>",rE:!0,sL:"javascript"}},e,{cN:"pi",b:/<\?\w+/,e:/\?>/,r:10},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:/[^ \/><\n\t]+/,r:0},c]}]}});hljs.registerLanguage("php",function(e){var c={cN:"variable",b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},i={cN:"preprocessor",b:/<\?(php)?|\?>/},a={cN:"string",c:[e.BE,i],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},n={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.CLCM,e.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"},i]},{cN:"comment",b:"__halt_compiler.+?;",eW:!0,k:"__halt_compiler",l:e.UIR},{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[e.BE]},i,c,{b:/->+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",c,e.CBCM,a,n]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},a,n]}});
var CoreView = Torso.View.extend({
  initialize: function(args) {
    args = args || {};
    this.template = args.template || function() {return '';};
    this.path = args.path;
  },

  prepare: function() {
    var trail = [];
    if (this.path) {
      // Construct breadcrumb
      var steps = this.path.split('\.');
      var compound = '#';
      for (var i = 0; i < steps.length; i++) {
        if (i !== 0) {
          compound += '.';
        }
        compound += steps[i];
        trail.push({
          name: steps[i],
          route: compound
        });
      }

      // Construct topic list
      var children = _.difference(Object.keys(app.getPathTemplate()),
                                  ['_setup','isTop','_child']);
      var topics = [];
      for (var i = 0; i < children.length; i++) {
        topics.push({
          route: '#' + this.path + '.' + children[i],
          name: children[i],
        })
      }
    }
    return {
      trail: trail,
      topics: topics
    };
  },

  render: function() {
    var context = this.prepare();
    this.$el.html(Templates.decorators.header(context));
    this.$el.find('#main_content').append(this.template(context));
    this.$el.append(Templates.decorators.footer());
    this.delegateEvents();
  }
});
var app;
$(window).ready(function() {
  Handlebars.registerHelper("equal",function(a, b, options) {
    if (a === b) {
      return options.fn();
    } else {
      return options.inverse();
    }
  });

  // Main app router
  var AppRouter = Backbone.Router.extend({
    currentPerspective: null,
    path: '',

    routes: {
      '*path': 'pathParser'
    },

    dispose: function() {
      if (this.currentPerspective) {
        this.currentPerspective.dispose();
      }
    },

    pathParser: function(originalPath) {
      this.path = originalPath;
      var template = this.getPathTemplate();
      this.dispose();
      this.currentPerspective = new CoreView({
        template: template,
        path: originalPath
      });
      $('body').append(this.currentPerspective.$el);
      this.render();
    },

    render: function() {
      this.currentPerspective.render();
      this.highlightCode();
      this.generateDemos();
      this.makeCodeBlocksTogglable();
    },

    getPathTemplate: function() {
      var path = this.path;
      if (!path) {
        template = Templates.index;
      } else {
        try {
          template = Templates;
          while (path.indexOf('.') !== -1) {
            var idx = path.indexOf('.');
            template = template[path.substring(0, idx)];
            path = path.substring(idx + 1);
          }
          template = template[path];
        } catch (e) {
          template = null;
        }
        if (!template) {
          template = Templates.error404;
        }
      }
      return template;
    },

    highlightCode: function() {
      $('code').each(function(i, block) {
        $(block).text($(block).find('script[type="text/code"]').text().trim());
        hljs.highlightBlock(block);
      });
    },

    generateDemos: function() {
      var demoAreas = $('.demo-area');
      demoAreas.each(function(index, elem) {
        var $elem = $(elem);
        var forDemo = $elem.attr('for');
        if (forDemo) {
          var template = Handlebars.compile($('code[for="' + forDemo + '"].html').text());
          var jsCode = $('code[for="' + forDemo + '"].javascript').text();
          var func = new Function('compiledTemplate', '$container', jsCode);
          func(template, $elem);
        }
      });
    },

    makeCodeBlocksTogglable: function() {
      $('div + pre code').each(function(i, block) {
        var $block = $(block);
        var $bar = $block.parent().prev();
        if ($bar.hasClass('closed')) {
          $block.toggle();
        }
        $bar.click(function(elem) {
          $block.slideToggle(function(){
            if ($block.css('display') === 'none') {
              $bar.addClass('closed');
            } else {
              $bar.removeClass('closed');
            }
          });
        });
      });
    }
  });
  app = new AppRouter();
  Backbone.history.start();
});