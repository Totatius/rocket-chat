function module(e,t,n){var a,l,i,u,o,c,r,f,s,d;n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){a=e}},0),n.link("react",{default:function(e){l=e},useMemo:function(e){i=e},useState:function(e){u=e}},0),n.link("@rocket.chat/fuselage",{Field:function(e){o=e}},1),n.link("../../../client/components/Page",{default:function(e){c=e}},2),n.link("./DateRangePicker",{default:function(e){r=e}},3),n.link("./AuditLogTable",{default:function(e){f=e}},4),n.link("../../../client/contexts/TranslationContext",{useTranslation:function(e){s=e}},5),n.link("../../../client/hooks/useMethodData",{useMethodData:function(e){d=e}},6);var m=function(){var e=s(),t=u({start:"",end:""}),n=a(t,2),m=n[0],k=n[1],g=m.start,D=m.end,E=i((function(){return[{startDate:new Date(g),endDate:new Date(D)}]}),[D,g]),h,x=d("auditGetAuditions",E).value;return l.createElement(c,null,l.createElement(c.Header,{title:e("Message_auditing_log")}),l.createElement(c.Content,null,l.createElement(o,{alignSelf:"stretch"},l.createElement(o.Label,null,e("Date")),l.createElement(o.Row,null,l.createElement(r,{display:"flex",flexGrow:1,onChange:k}))),l.createElement(f,{data:x})))};n.exportDefault(m)}

