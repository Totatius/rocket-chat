function module(e,t,n){var a,r,i,u,o,l,c,f,s;n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},0),n.link("react",{default:function(e){r=e},useEffect:function(e){i=e},useState:function(e){u=e},useRef:function(e){o=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){l=e}},1),n.link("@rocket.chat/fuselage-hooks",{useStableArray:function(e){c=e}},2),n.link("meteor/templating",{Template:function(e){f=e}},3),n.link("meteor/blaze",{Blaze:function(e){s=e}},4),n.link("../../app/auditing/client/templates/audit/audit.html");var d=r.memo((function(e){var t=e.setDataRef,n=o(),d=u({}),m=a(d,2),k=m[0],p=m[1],g=k.msg,v=k.type,D=k.startDate,h=k.endDate,b=k.visitor,y=k.agent,x=k.users,z=void 0===x?[]:x,A=k.rid,B=c(z);return t.current=p,i((function(){var e=s.renderWithData(f.audit,{msg:g,type:v,startDate:D,endDate:h,visitor:b,agent:y,users:B,rid:A},n.current);return function(){return s.remove(e)}}),[y,h,g,A,D,v,B,b]),r.createElement(l,{ref:n})}));n.exportDefault(d)}

