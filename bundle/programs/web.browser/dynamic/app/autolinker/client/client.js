function module(e,t,n){let l,r,o,i,a;n.link("@babel/runtime/helpers/objectSpread2",{default(e){l=e}},0),n.export({createAutolinkerMessageRenderer:()=>s}),n.link("meteor/meteor",{Meteor(e){r=e}},0),n.link("meteor/random",{Random(e){o=e}},1),n.link("autolinker",{default(e){i=e}},2),n.link("../../../lib/escapeRegExp",{escapeRegExp(e){a=e}},3);const s=e=>t=>{var n;if(!(null===(n=t.html)||void 0===n?void 0:n.trim()))return t;let s,k;return t.tokens&&t.tokens.length?(k=new RegExp("(".concat((t.tokens||[]).map(e=>{let{token:t}=e;return a(t)}),")"),"g"),s=t.html.split(k)):s=[t.html],t.html=s.map(n=>k&&k.test(n)?n:i.link(n,l({},e,{stripTrailingSlash:!1,replaceFn:e=>{var n;const l="=!=".concat(o.id(),"=!="),i=e.buildTag();return~e.matchedText.indexOf(r.absoluteUrl())&&i.setAttr("target",""),t.tokens=null!==(n=t.tokens)&&void 0!==n?n:[],t.tokens.push({token:l,text:i.toAnchorString()}),l}}))).join(""),t}}

