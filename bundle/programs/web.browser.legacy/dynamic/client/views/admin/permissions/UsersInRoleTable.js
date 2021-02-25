function module(e,t,n){var a,r,l,o,c,i,u,s,m,f,d,x,p,k,E,h,v,T,g,b,C,w;n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},1),n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},2),n.link("@babel/runtime/regenerator",{default:function(e){o=e}},3),n.export({UsersInRoleTable:function(){return P}}),n.link("react",{default:function(e){c=e},useState:function(e){i=e},useMemo:function(e){u=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){s=e},Table:function(e){m=e},Button:function(e){f=e},Icon:function(e){d=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){x=e},useDebouncedValue:function(e){p=e}},2),n.link("../../../lib/getUserEmailAddress",{getUserEmailAddress:function(e){k=e}},3),n.link("../../../components/avatar/UserAvatar",{default:function(e){E=e}},4),n.link("../../../components/DeleteWarningModal",{default:function(e){h=e}},5),n.link("../../../contexts/ServerContext",{useMethod:function(e){v=e}},6),n.link("../../../components/GenericTable",{default:function(e){T=e}},7),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){g=e}},8),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){b=e}},9),n.link("../../../contexts/ModalContext",{useSetModal:function(e){C=e}},10),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){w=e}},11);var _=c.memo((function(e){var t=e._id,n=e.username,a=e.name,r=e.avatarETag,l=e.emails,o=e.onRemove,i=k({emails:l}),u=x((function(){o(n)}));return c.createElement(m.Row,{key:t,tabIndex:0,role:"link"},c.createElement(m.Cell,{withTruncatedText:!0},c.createElement(s,{display:"flex",alignItems:"center"},c.createElement(E,{size:"x40",title:n,username:n,etag:r}),c.createElement(s,{display:"flex",withTruncatedText:!0,mi:"x8"},c.createElement(s,{display:"flex",flexDirection:"column",alignSelf:"center",withTruncatedText:!0},c.createElement(s,{fontScale:"p2",withTruncatedText:!0,color:"default"},a||n),a&&c.createElement(s,{fontScale:"p1",color:"hint",withTruncatedText:!0}," ","@"+n," "))))),c.createElement(m.Cell,{withTruncatedText:!0},i),c.createElement(m.Cell,{withTruncatedText:!0},c.createElement(f,{small:!0,square:!0,danger:!0,onClick:u},c.createElement(d,{name:"trash",size:"x20"}))))}));function P(e){var t=e.data,n=e.reload,a=e.roleName,r=e.total,i=e.params,u=e.setParams,s=e.rid,m=g(),f=b(),d=C(),p=v("authorization:removeUserFromRole"),k=function(){return d()},E=x((function(e){var t=function(){function t(){return o.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o.awrap(p(a,e,s));case 3:f({type:"success",message:m("User_removed")}),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),f({type:"erroor",message:t.t0});case 9:k(),n();case 11:case"end":return t.stop()}}return t}(),null,null,[[0,6]],Promise)}return t}();d(c.createElement(h,{children:m("The_user_s_will_be_removed_from_role_s",e,a),onCancel:k,onDelete:t}))}));return c.createElement(T,{header:c.createElement(c.Fragment,null,c.createElement(T.HeaderCell,null,m("Name")),c.createElement(T.HeaderCell,null,m("Email")),c.createElement(T.HeaderCell,{w:"x80"})),results:t,params:i,setParams:u,total:r},(function(e){return c.createElement(_,l({onRemove:E,key:e._id},e))}))}var y=function(e){var t=e.rid,n=e.roleName,l=e.reloadRef,o=i({current:0,itemsPerPage:25}),s=r(o,2),m=s[0],f=s[1],d=p(m,500),x=u((function(){return a({roomId:t,role:n},d.itemsPerPage&&{count:d.itemsPerPage},{},d.current&&{offset:d.current})}),[d,t,n]),k=w("roles.getUsersInRole",x),E=k.value,h=void 0===E?{}:E,v=k.reload;l.current=v;var T=(null==h?void 0:h.users)||[];return(c.createElement(P,{data:T,total:null==h?void 0:h.total,reload:v,params:m,setParams:f,roleName:n,rid:t}))};n.exportDefault(y)}

