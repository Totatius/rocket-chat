function module(e,t,n){var a,r,o,c,i,l,u,s,m,f,d,x,k,p,E,h,v,g,T,C,y,w,b,M,P;function S(e){var t=e._id,n=e.reload,a=h(),r=v("DELETE","livechat/users/manager/"+t),c=w(),i=b(),s=l(function(){function e(){var e;return o.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.awrap(r());case 2:!0===(e=t.sent).success&&n();case 4:case"end":return t.stop()}}return t}(),null,null,null,Promise)}return e}()),m=l((function(e){e.stopPropagation();var t=function(){function e(){return o.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.awrap(s());case 3:i({type:"success",message:a("Manager_removed")}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),i({type:"error",message:e.t0});case 9:c();case 10:case"end":return e.stop()}}return e}(),null,null,[[0,6]],Promise)}return e}();c(u.createElement(M,{onDelete:t,onCancel:function(){return c()}}))}));return u.createElement(x.Cell,{fontScale:"p1",color:"hint",withTruncatedText:!0},u.createElement(p,{small:!0,ghost:!0,title:a("Remove"),onClick:m},u.createElement(k,{name:"trash",size:"x16"})))}n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){a=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},1),n.link("@babel/runtime/regenerator",{default:function(e){o=e}},2),n.export({RemoveManagerButton:function(){return S},ManagersRoute:function(){return R}}),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){c=e},useMediaQuery:function(e){i=e},useMutableCallback:function(e){l=e}},0),n.link("react",{default:function(e){u=e},useMemo:function(e){s=e},useCallback:function(e){m=e},useState:function(e){f=e}},1),n.link("@rocket.chat/fuselage",{Box:function(e){d=e},Table:function(e){x=e},Icon:function(e){k=e},Button:function(e){p=e}},2),n.link("../../../components/GenericTable",{default:function(e){E=e}},3),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){h=e}},4),n.link("../../../hooks/useEndpointAction",{useEndpointAction:function(e){v=e}},5),n.link("../../../contexts/AuthorizationContext",{usePermission:function(e){g=e}},6),n.link("../../../components/NotAuthorizedPage",{default:function(e){T=e}},7),n.link("./ManagersPage",{default:function(e){C=e}},8),n.link("../../../components/avatar/UserAvatar",{default:function(e){y=e}},9),n.link("../../../contexts/ModalContext",{useSetModal:function(e){w=e}},10),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){b=e}},11),n.link("../../../components/DeleteWarningModal",{default:function(e){M=e}},12),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){P=e}},13);var D=function(e){return"asc"===e?1:-1},A=function(e,t){var n=e.text,o=e.itemsPerPage,c=e.current,i=r(t,2),l=i[0],u=i[1];return s((function(){var e;return a({fields:JSON.stringify({name:1,username:1,emails:1,avatarETag:1}),text:n,sort:JSON.stringify((e={},e[l]=D(u),e.usernames="name"===l?D(u):void 0,e))},o&&{count:o},{},c&&{offset:c})}),[n,o,c,l,u])};function R(){var e=h(),t=g("manage-livechat-managers"),n=f({text:"",current:0,itemsPerPage:25}),a=r(n,2),o=a[0],k=a[1],p=f(["name","asc"]),v=r(p,2),w=v[0],b=v[1],M=i("(min-width: 1024px)"),D=l((function(e){var t=r(w,2),n=t[0],a=t[1];b(n!==e?[e,"asc"]:[e,"asc"===a?"desc":"asc"])})),R=c(o,500),H=c(w,500),z=A(R,H),B=P("livechat/users/manager",z),N=B.value,_=void 0===N?{}:N,I=B.reload,J=s((function(){return[u.createElement(E.HeaderCell,{key:"name",direction:w[1],active:"name"===w[0],onClick:D,sort:"name"},e("Name")),M&&u.createElement(E.HeaderCell,{key:"username",direction:w[1],active:"username"===w[0],onClick:D,sort:"username"},e("Username")),u.createElement(E.HeaderCell,{key:"email",direction:w[1],active:"emails.address"===w[0],onClick:D,sort:"emails.address"},e("Email")),u.createElement(E.HeaderCell,{key:"remove",w:"x60"},e("Remove"))].filter(Boolean)}),[w,D,e,M]),O=m((function(e){var t=e.emails,n=e._id,a=e.username,r=e.name,o=e.avatarETag;return(u.createElement(x.Row,{key:n,tabIndex:0,"qa-user-id":n},u.createElement(x.Cell,{withTruncatedText:!0},u.createElement(d,{display:"flex",alignItems:"center"},u.createElement(y,{size:M?"x28":"x40",title:a,username:a,etag:o}),u.createElement(d,{display:"flex",withTruncatedText:!0,mi:"x8"},u.createElement(d,{display:"flex",flexDirection:"column",alignSelf:"center",withTruncatedText:!0},u.createElement(d,{fontScale:"p2",withTruncatedText:!0,color:"default"},r||a),!M&&r&&u.createElement(d,{fontScale:"p1",color:"hint",withTruncatedText:!0}," ","@"+a," "))))),M&&u.createElement(x.Cell,null,u.createElement(d,{fontScale:"p2",withTruncatedText:!0,color:"hint"},a)," ",u.createElement(d,{mi:"x4"})),u.createElement(x.Cell,{withTruncatedText:!0},t&&t.length&&t[0].address),u.createElement(S,{_id:n,reload:I})))}),[M,I]);return t?u.createElement(C,{setParams:k,params:o,onHeaderClick:D,data:_,useQuery:A,reload:I,header:J,renderRow:O,title:e("Managers")}):u.createElement(T,null)}n.exportDefault(R)}
