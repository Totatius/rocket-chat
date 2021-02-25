function module(e,n,t){var r,a,o,c,i,u,l,s,f,p,m,x,d,b,v,k,g,h,M,C,y;t.link("@babel/runtime/helpers/extends",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){a=e}},1),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},2),t.link("@babel/runtime/regenerator",{default:function(e){c=e}},3),t.link("@rocket.chat/fuselage",{Option:function(e){i=e},Menu:function(e){u=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){l=e}},1),t.link("react",{default:function(e){s=e},useMemo:function(e){f=e}},2),t.link("../contexts/TranslationContext",{useTranslation:function(e){p=e}},3),t.link("../contexts/SettingsContext",{useSetting:function(e){m=e}},4),t.link("../contexts/RouterContext",{useRoute:function(e){x=e}},5),t.link("../../app/ui-utils/client/lib/RoomManager",{RoomManager:function(e){d=e}},6),t.link("../contexts/ServerContext",{useMethod:function(e){b=e}},7),t.link("../../app/utils",{roomTypes:function(e){v=e},UiTextContext:function(e){k=e}},8),t.link("../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){g=e}},9),t.link("../contexts/UserContext",{useUserSubscription:function(e){h=e}},10),t.link("../contexts/AuthorizationContext",{usePermission:function(e){M=e}},11),t.link("../contexts/ModalContext",{useSetModal:function(e){C=e}},12),t.link("../views/admin/apps/WarningModal",{default:function(e){y=e}},13);var R={f:1,t:1,name:1},T=s.memo((function(e){var n=e.rid,t=e.unread,T=e.threadUnread,w=e.alert,_=e.roomOpen,E=e.type,P=e.cl,U=e.name,S=void 0===U?"":U,I=p(),A=g(),F=C(),N=l((function(){return F()})),W=x("home"),D=h(n,R),L=m("Favorite_Rooms"),j=null!=(null!=D?D.f:void 0)&&D.f,G=b("hideRoom"),H=b("readMessages"),O=b("unreadMessages"),z=b("toggleFavorite"),V=b("leaveRoom"),Y=w||t||T,q=M("leave-c"),B=M("leave-p"),J=!("c"===E&&!q||"p"===E&&!B||null!=P&&!P||["d","l"].includes(E)),K=l((function(){var e=function(){function e(){return c.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.awrap(V(n));case 3:_&&W.push({}),d.close(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),A({type:"error",message:e.t0});case 10:N();case 11:case"end":return e.stop()}}return e}(),null,null,[[0,7]],Promise)}return e}(),t=v.getConfig(E).getUiText(k.LEAVE_WARNING);F(s.createElement(y,{text:I(t,S),confirmText:I("Leave_room"),close:N,cancel:N,cancelText:I("Cancel"),confirm:e}))})),Q=l(function(){function e(){var e,t;return c.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:e=function(){function e(){return c.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.awrap(G(n));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),A({type:"error",message:e.t0});case 8:N();case 9:case"end":return e.stop()}}return e}(),null,null,[[0,5]],Promise)}return e}(),t=v.getConfig(E).getUiText(k.HIDE_WARNING),F(s.createElement(y,{text:I(t,S),confirmText:I("Yes_hide_it"),close:N,cancel:N,cancelText:I("Cancel"),confirm:e}));case 3:case"end":return r.stop()}}return r}(),null,null,null,Promise)}return e}()),X=l(function(){function e(){return c.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!Y){e.next=5;break}return e.next=4,c.awrap(H(n));case 4:return e.abrupt("return");case 5:return e.next=7,c.awrap(O(null,n));case 7:if(null!=D){e.next=9;break}return e.abrupt("return");case 9:d.close(D.t+D.name),W.push({}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),A({type:"error",message:e.t0});case 16:case"end":return e.stop()}}return e}(),null,null,[[0,13]],Promise)}return e}()),Z=l(function(){function e(){return c.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.awrap(z(n,!j));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),A({type:"error",message:e.t0});case 8:case"end":return e.stop()}}return e}(),null,null,[[0,5]],Promise)}return e}()),$=f((function(){return o({hideRoom:{label:{label:I("Hide"),icon:"eye-off"},action:Q},toggleRead:{label:{label:I(Y?"Mark_read":"Mark_unread"),icon:"flag"},action:X}},L&&{toggleFavorite:{label:{label:I(j?"Unfavorite":"Favorite"),icon:j?"star-filled":"star"},action:Z}},{},J&&{leaveRoom:{label:{label:I("Leave_room"),icon:"sign-out"},action:K}})}),[I,Q,Y,X,L,j,Z,J,K]);return s.createElement(u,{"rcx-sidebar-item__menu":!0,mini:!0,"aria-keyshortcuts":"alt",tabIndex:-1,options:$,renderItem:function(e){var n=e.label,t=n.label,o=n.icon,c=a(e,["label"]);return(s.createElement(i,r({label:t,title:t,icon:o},c)))}})}));t.exportDefault(T)}
