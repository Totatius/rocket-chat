function module(e,n,t){var r,o,s,i,c,u,a,l,f,d,m,h,p,_,v,b,x,k,g,y,T,C,E,w,P;t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){r=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},1),t.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){s=e}},2),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},3),t.link("@babel/runtime/helpers/extends",{default:function(e){c=e}},4),t.link("@babel/runtime/regenerator",{default:function(e){u=e}},5),t.export({UserInfoActions:function(){return A}}),t.link("@rocket.chat/fuselage",{ButtonGroup:function(e){a=e},Menu:function(e){l=e},Option:function(e){f=e}},0),t.link("react",{default:function(e){d=e},useCallback:function(e){m=e},useMemo:function(e){h=e}},1),t.link("../../room/hooks/useUserInfoActions",{useUserInfoActionsSpread:function(e){p=e}},2),t.link("../../../components/ConfirmOwnerChangeWarningModal",{default:function(e){_=e}},3),t.link("../../room/contextualBar/UserInfo",{UserInfo:function(e){v=e}},4),t.link("../../../contexts/AuthorizationContext",{usePermission:function(e){b=e}},5),t.link("../../../contexts/ModalContext",{useSetModal:function(e){x=e}},6),t.link("../../../contexts/RouterContext",{useRoute:function(e){k=e}},7),t.link("../../../contexts/ServerContext",{useMethod:function(e){g=e},useEndpoint:function(e){y=e}},8),t.link("../../../contexts/SettingsContext",{useSetting:function(e){T=e}},9),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){C=e}},10),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){E=e}},11),t.link("../../../components/DeleteSuccessModal",{default:function(e){w=e}},12),t.link("../../../components/DeleteWarningModal",{default:function(e){P=e}},13);var A=function(e){var n=e.username,t=e._id,A=e.isActive,S=e.isAdmin,O=e.onChange,U=E(),M=x(),R=k("direct"),D=k("admin-users"),I=C(),W=b("create-d"),B=b("edit-other-user-info"),K=b("assign-admin-role"),j=b("edit-other-user-e2ee"),q=b("edit-other-user-totp"),F=b("edit-other-user-active-status"),G=b("delete-user"),J=T("Accounts_TwoFactorAuthentication_Enforce_Password_Fallback"),L=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(){function t(){var t,r,o,s,i;return u.async(function(){function a(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,u.awrap(e());case 3:return a.abrupt("return",a.sent);case 6:if(a.prev=6,a.t0=a.catch(0),"user-last-owner"!==(null===(t=a.t0.xhr)||void 0===t?void 0:null===(r=t.responseJSON)||void 0===r?void 0:r.errorType)){a.next=12;break}return o=a.t0.xhr.responseJSON.details,s=o.shouldChangeOwner,i=o.shouldBeRemoved,M(d.createElement(_,c({shouldChangeOwner:s,shouldBeRemoved:i},n,{onConfirm:function(){function n(){return u.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.awrap(e(!0));case 2:M();case 3:case"end":return n.stop()}}return n}(),null,null,null,Promise)}return n}(),onCancel:function(){M(),O()}}))),a.abrupt("return");case 12:I({type:"error",message:a.t0});case 13:case"end":return a.stop()}}return a}(),null,null,[[0,6]],Promise)}return t}()},N=h((function(){return{userId:t}}),[t]),z=y("POST","users.delete"),Y=T("Message_ErasureType"),H=L(function(){function e(){var e,n,t=arguments;return u.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:return(e=t.length>0&&void 0!==t[0]&&t[0])&&(N.confirmRelinquish=e),r.next=4,u.awrap(z(N));case 4:(n=r.sent).success?M(d.createElement(w,{children:U("User_has_been_deleted"),onClose:function(){M(),O()}})):M();case 6:case"end":return r.stop()}}return r}(),null,null,null,Promise)}return e}(),{contentTitle:U("Delete_User_Warning_"+Y),confirmLabel:U("Delete")}),Q=m((function(){M(d.createElement(P,{children:U("Delete_User_Warning_"+Y),onCancel:function(){return M()},onDelete:H}))}),[H,Y,M,U]),V=g("setAdminStatus"),X=m(function(){function e(){var e;return u.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,u.awrap(V(t,!S));case 3:I({type:"success",message:U(e=S?"User_is_no_longer_an_admin":"User_is_now_an_admin")}),O(),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(0),I({type:"error",message:n.t0});case 11:case"end":return n.stop()}}return n}(),null,null,[[0,8]],Promise)}return e}(),[t,I,S,O,V,U]),Z=y("POST","users.resetE2EKey"),$=y("POST","users.resetTOTP"),ee=m(function(){function e(){var e;return u.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:return M(),n.next=3,u.awrap(Z({userId:t}));case 3:(e=n.sent)&&M(d.createElement(w,{children:U("Users_key_has_been_reset"),onClose:function(){M(),O()}}));case 5:case"end":return n.stop()}}return n}(),null,null,null,Promise)}return e}(),[Z,O,M,U,t]),ne=m(function(){function e(){var e;return u.async(function(){function n(n){for(;;)switch(n.prev=n.next){case 0:return M(),n.next=3,u.awrap($({userId:t}));case 3:(e=n.sent)&&M(d.createElement(w,{children:U("Users_TOTP_has_been_reset"),onClose:function(){M(),O()}}));case 5:case"end":return n.stop()}}return n}(),null,null,null,Promise)}return e}(),[$,O,M,U,t]),te=m((function(){M(d.createElement(P,{children:U("E2E_Reset_Other_Key_Warning"),deleteText:U("Reset"),onCancel:function(){return M()},onDelete:ee}))}),[ee,U,M]),re=m((function(){M(d.createElement(P,{children:U("TOTP_Reset_Other_Key_Warning"),deleteText:U("Reset"),onCancel:function(){return M()},onDelete:ne}))}),[ne,U,M]),oe=h((function(){return{userId:t,activeStatus:!A}}),[t,A]),se=A?"User_has_been_deactivated":"User_has_been_activated",ie=y("POST","users.setActiveStatus"),ce=L(function(){function e(){var e,n,t=arguments;return u.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:return(e=t.length>0&&void 0!==t[0]&&t[0])&&(oe.confirmRelinquish=e),r.prev=2,r.next=5,u.awrap(ie(oe));case 5:(n=r.sent).success&&(I({type:"success",message:U(se)}),O()),r.next=12;break;case 9:throw r.prev=9,r.t0=r.catch(2),r.t0;case 12:case"end":return r.stop()}}return r}(),null,null,[[2,9]],Promise)}return e}(),{confirmLabel:U("Yes_deactivate_it")}),ue=m((function(){return R.push({rid:n})}),[R,n]),ae=m((function(){return D.push({context:"edit",id:t})}),[t,D]),le=h((function(){return i({},W&&{directMessage:{icon:"chat",label:U("Direct_Message"),action:ue}},{},B&&{editUser:{icon:"edit",label:U("Edit"),action:ae}},{},K&&n&&{makeAdmin:{icon:"key",label:U(S?"Remove_Admin":"Make_Admin"),action:X}},{},j&&J&&{resetE2EEKey:{icon:"key",label:U("Reset_E2E_Key"),action:te}},{},q&&J&&{resetTOTP:{icon:"key",label:U("Reset_TOTP"),action:re}},{},G&&{delete:{icon:"trash",label:U("Delete"),action:Q}},{},F&&{changeActiveStatus:{icon:"user",label:U(A?"Deactivate":"Activate"),action:ce}})}),[U,W,ue,B,ae,K,S,X,G,Q,F,A,ce,J,j,q,te,re,n]),fe=p(le),de=fe.actions,me=fe.menu,he=h((function(){return me?d.createElement(l,{mi:"x4",placement:"bottom-start",small:!1,ghost:!1,flexShrink:0,key:"menu",renderItem:function(e){var n=e.label,t=n.label,r=n.icon,o=s(e,["label"]);return(d.createElement(f,c({label:t,title:t,icon:r},o)))},options:me}):null}),[me]),pe=h((function(){var e=function(e){var n=o(e,2),t=n[0],r=n[1],s=r.label,i=r.icon,c=r.action;return(d.createElement(v.Action,{key:t,title:s,label:s,onClick:c,icon:i}))};return[].concat(r(de.map(e)),[he]).filter(Boolean)}),[de,he]);return d.createElement(a,{flexGrow:0,justifyContent:"center"},pe)}}

