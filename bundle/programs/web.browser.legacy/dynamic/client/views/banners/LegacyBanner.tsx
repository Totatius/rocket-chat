function module(n,e,o){var i,l,t,c,a,r;o.link("@rocket.chat/fuselage",{Banner:function(n){i=n},Icon:function(n){l=n}},0),o.link("react",{default:function(n){t=n},useCallback:function(n){c=n},useEffect:function(n){a=n}},1),o.link("../../lib/banners",{"*":function(n){r=n}},2);var u=function(n){var e=n.config,o=e.closable,u=void 0===o||o,f=e.title,v=e.text,d=e.html,s=e.icon,m=e.modifiers,b=!(null==m?void 0:m.includes("large")),g=(null==m?void 0:m.includes("danger"))?"danger":"info";a((function(){if(e.timer){var n=setTimeout((function(){var n;null===(n=e.onClose)||void 0===n||n.call(void 0),r.close()}),e.timer);return function(){clearTimeout(n)}}}),[e.onClose,e.timer]);var C=c((function(){var n;null===(n=e.action)||void 0===n||n.call(void 0)}),[e.action]),k=c((function(){var n;null===(n=e.onClose)||void 0===n||n.call(void 0),r.close()}),[e.onClose]);return t.createElement(i,{inline:b,actionable:!!e.action,closeable:u,icon:s?t.createElement(l,{name:s,size:20}):void 0,title:f,variant:g,onAction:C,onClose:k},v,d&&t.createElement("div",{dangerouslySetInnerHTML:{__html:d}}))};o.exportDefault(u)}

