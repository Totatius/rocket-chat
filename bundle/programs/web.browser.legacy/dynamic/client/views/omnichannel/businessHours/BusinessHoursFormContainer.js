function module(e,n,t){var u,i,o,a,s,r,l,c,f,d,m,h,v,p;t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){u=e}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},1),t.link("react",{default:function(e){o=e},useEffect:function(e){a=e},useState:function(e){s=e}},0),t.link("@rocket.chat/fuselage",{FieldGroup:function(e){r=e},Box:function(e){l=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){c=e}},2),t.link("use-subscription",{useSubscription:function(e){f=e}},3),t.link("./BusinessHoursForm",{default:function(e){d=e}},4),t.link("../additionalForms",{formsSubscription:function(e){m=e}},5),t.link("../../../hooks/useReactiveValue",{useReactiveValue:function(e){h=e}},6),t.link("../../../hooks/useForm",{useForm:function(e){v=e}},7),t.link("../../../../app/livechat/client/views/app/business-hours/BusinessHours",{businessHourManager:function(e){p=e}},8);var k=function(e,n){return c((function(t){n.current[e]=i({},n.current[e],{},t)}))},b=function(e){var n=e.workHours;return{daysOpen:n.filter((function(e){var n;return!!e.open})).map((function(e){var n;return e.day})),daysTime:n.reduce((function(e,n){var t,u=n.day,o=n.start.time,a=n.finish.time;return e=i({},e,((t={})[u]={start:o,finish:a},t))}),{})}},g=function(){},C=function(e){var n,t,i=e.data,C=e.saveRef,E=e.onChange,H=void 0===E?function(){}:E,T=f(m),w=s(!1),y=u(w,2),B=y[0],F=y[1],S=s(!1),x=u(S,2),z=x[0],M=x[1],R=T.useBusinessHoursTimeZone,V=void 0===R?g:R,A=T.useBusinessHoursMultiple,j=void 0===A?g:A,D=V(),G=j(),I=h(c((function(){return p.showTimezoneTemplate()}))),N=h(c((function(){return p.showCustomTemplate(i)}))),O=k("timezone",C),U=k("multiple",C),W=v(b(i)),Z=W.values,q=W.handlers,J=W.hasUnsavedChanges;return C.current.form=Z,a((function(){H(J||N&&B||I&&z)})),o.createElement(l,{maxWidth:"600px",w:"full",alignSelf:"center"},o.createElement(r,null,N&&G&&o.createElement(G,{onChange:U,data:i,hasChangesAndIsValid:F}),I&&D&&o.createElement(D,{onChange:O,data:null!==(n=null==i?void 0:null===(t=i.timezone)||void 0===t?void 0:t.name)&&void 0!==n?n:null==i?void 0:i.timezoneName,hasChanges:M}),o.createElement(d,{values:Z,handlers:q})))};t.exportDefault(C)}

