function module(t,n,i){var e,r,o,u,s;i.link("@babel/runtime/helpers/createClass",{default:function(t){e=t}},0),i.link("@babel/runtime/helpers/createSuper",{default:function(t){r=t}},1),i.link("@babel/runtime/helpers/inheritsLoose",{default:function(t){o=t}},2),i.export({ThreadsList:function(){return p}}),i.link("./MessageList",{MessageList:function(t){u=t}},0),i.link("../../../lib/escapeRegExp",{escapeRegExp:function(t){s=t}},1);var l=function(t,n){return t.rid===n&&"number"==typeof t.tcount},f=function(t,n){var i,e;return null!==(i=null===(e=t.replies)||void 0===e?void 0:e.includes(n))&&void 0!==i&&i},a=function(t,n){return n.includes(t._id)},c=function(t,n){return n.test(t.msg)},p=function(t){o(i,t);var n=r(i);function i(n){var i;return(i=t.call(this)||this)._options=n,i}var u=i.prototype;return u.updateFilters=function(){function t(t){this._options=t,this.clear()}return t}(),u.filter=function(){function t(t){var n=this._options.rid;if(!l(t,n))return!1;if("following"===this._options.type){var i=this._options.uid;if(!f(t,i))return!1}if("unread"===this._options.type){var e=this._options.tunread;if(!a(t,e))return!1}if(this._options.text){var r=new RegExp(this._options.text.split(/\s/g).map((function(t){return s(t)})).join("|"));if(!c(t,r))return!1}return!0}return t}(),u.compare=function(){function t(t,n){var i,e;return(null!==(i=n.tlm)&&void 0!==i?i:n.ts).getTime()-(null!==(e=t.tlm)&&void 0!==e?e:t.ts).getTime()}return t}(),e(i,[{key:"options",get:function(){return this._options}}]),i}(u)}
