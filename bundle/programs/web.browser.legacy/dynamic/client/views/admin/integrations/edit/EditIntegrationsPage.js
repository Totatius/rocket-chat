function module(n,t,e){var o,i,u,c,l,a,r,f,g,m,k,s;function d(n){var t=o({},n),e=m(),d=s("admin-integrations"),E=k("type"),b=k("id"),h=a((function(){d.push({})}),[d]),x=a((function(){d.push({context:"history",type:"outgoing",id:b})}),[b,d]);return l.createElement(r,o({flexDirection:"column"},t),l.createElement(r.Header,{title:e("incoming"===E?"Integration_Incoming_WebHook":"Integration_Outgoing_WebHook")},l.createElement(u,null,l.createElement(i,{onClick:h},l.createElement(c,{name:"back",size:"x16"})," ",e("Back")),"outgoing"===E&&l.createElement(i,{onClick:x},e("History")))),l.createElement(r.ScrollableContentWithShadow,null,"outgoing"===E&&l.createElement(g,{integrationId:b,key:"outgoing"})||"incoming"===E&&l.createElement(f,{integrationId:b,key:"incoming"})))}e.link("@babel/runtime/helpers/extends",{default:function(n){o=n}},0),e.export({default:function(){return d}}),e.link("@rocket.chat/fuselage",{Button:function(n){i=n},ButtonGroup:function(n){u=n},Icon:function(n){c=n}},0),e.link("react",{default:function(n){l=n},useCallback:function(n){a=n}},1),e.link("../../../../components/Page",{default:function(n){r=n}},2),e.link("./EditIncomingWebhook",{default:function(n){f=n}},3),e.link("./EditOutgoingWebhook",{default:function(n){g=n}},4),e.link("../../../../contexts/TranslationContext",{useTranslation:function(n){m=n}},5),e.link("../../../../contexts/RouterContext",{useRouteParameter:function(n){k=n},useRoute:function(n){s=n}},6)}

