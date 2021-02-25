function module(e,t,n){var u,o,a,i,s,c,r,l,f,m,d,k,C,E,h,p,x,g,S,P;function _(){var e=E("custom-user-status"),t=h("context"),n=h("id"),_=C("manage-user-status"),b=p(),w=s((function(){return{text:"",current:0,itemsPerPage:25}})),D=o(w,2),U=D[0],v=D[1],A=s((function(){return["name","asc"]})),N=o(A,2),y=N[0],T=N[1],H=f(U,500),R=H.text,z=H.itemsPerPage,B=H.current,J=f(y,500),O=o(J,2),V=O[0],$=O[1],j=i((function(){var e;return u({query:JSON.stringify({name:{$regex:R||"",$options:"i"}}),sort:JSON.stringify((e={},e[V]="asc"===$?1:-1,e))},z&&{count:z},{},B&&{offset:B})}),[R,z,B,V,$]),q=x("custom-user-status.list",j),I=q.value,M=q.reload,W=function(t){return function(){e.push({context:"edit",id:t})}},F=function(e){T((function(t){var n=o(t,2),u=n[0],a=n[1];return u===e?[e,"asc"===a?"desc":"asc"]:[e,"asc"]}))},G=c((function(){e.push({context:"new"})}),[e]),K=c((function(){e.push({})}),[e]),L=c((function(){M()}),[M]);return _?a.createElement(m,{flexDirection:"row"},a.createElement(m,{name:"admin-custom-user-status"},a.createElement(m.Header,{title:b("Custom_User_Status")},a.createElement(r,{small:!0,onClick:G,"aria-label":b("New")},a.createElement(l,{name:"plus"}))),a.createElement(m.Content,null,a.createElement(P,{setParams:v,params:U,onHeaderClick:F,data:I,onClick:W,sort:y}))),t&&a.createElement(d,{flexShrink:0},a.createElement(d.Header,null,"edit"===t&&b("Custom_User_Status_Edit"),"new"===t&&b("Custom_User_Status_Add"),a.createElement(d.Close,{onClick:K})),"edit"===t&&a.createElement(g,{_id:n,close:K,onChange:L}),"new"===t&&a.createElement(S,{goToNew:W,close:K,onChange:L}))):a.createElement(k,null)}n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){u=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},1),n.link("react",{default:function(e){a=e},useMemo:function(e){i=e},useState:function(e){s=e},useCallback:function(e){c=e}},0),n.link("@rocket.chat/fuselage",{Button:function(e){r=e},Icon:function(e){l=e}},1),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){f=e}},2),n.link("../../../components/Page",{default:function(e){m=e}},3),n.link("../../../components/VerticalBar",{default:function(e){d=e}},4),n.link("../../../components/NotAuthorizedPage",{default:function(e){k=e}},5),n.link("../../../contexts/AuthorizationContext",{usePermission:function(e){C=e}},6),n.link("../../../contexts/RouterContext",{useRoute:function(e){E=e},useRouteParameter:function(e){h=e}},7),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){p=e}},8),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){x=e}},9),n.link("./EditCustomUserStatusWithData",{default:function(e){g=e}},10),n.link("./AddCustomUserStatus",{default:function(e){S=e}},11),n.link("./CustomUserStatus",{default:function(e){P=e}},12),n.exportDefault(_)}

