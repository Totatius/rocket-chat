function module(e,n,t){var a,l,r,o,c,i,u,s,f,m,d,g,h,p,b,E,k,v,_,x,T;t.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){l=e}},1),t.link("@babel/runtime/regenerator",{default:function(e){r=e}},2),t.link("react",{default:function(e){o=e},useState:function(e){c=e}},0),t.link("@rocket.chat/fuselage",{Box:function(e){i=e},Button:function(e){u=e},ButtonGroup:function(e){s=e},Field:function(e){f=e},FieldGroup:function(e){m=e},ToggleSwitch:function(e){d=e},Callout:function(e){g=e},Divider:function(e){h=e}},1),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){p=e}},2),t.link("../../../components/Page",{default:function(e){b=e}},3),t.link("../../../components/PageSkeleton",{default:function(e){E=e}},4),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){k=e}},5),t.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){v=e}},6),t.link("../../../contexts/ServerContext",{useMethod:function(e){_=e}},7),t.link("../../../hooks/useMethodData",{useMethodData:function(e){x=e}},8),t.link("../../../hooks/useAsyncState",{AsyncStatePhase:function(e){T=e}},9);var w=[{action:"initialState"}],y=[{action:"list-pages"}],C=function(){var e=k(),n=v(),t=x("livechat:facebook",w),a=t.value,l=t.phase,c=t.reload,i=x("livechat:facebook",y),u=i.value,s=i.phase,f=i.reload,m=a||{enabled:!1,hasToken:!1},d=m.enabled,h=m.hasToken,C,D=(u||{pages:[]}).pages,S=_("livechat:facebook"),F=p(function(){function e(e,t,a){var l;return r.async(function(){function o(o){for(;;)switch(o.prev=o.next){case 0:return a(!t),o.prev=1,l=t?"unsubscribe":"subscribe",o.next=5,r.awrap(S({action:l,page:e}));case 5:o.next=11;break;case 7:o.prev=7,o.t0=o.catch(1),n({type:"error",message:o.t0}),a(t);case 11:case"end":return o.stop()}}return o}(),null,null,[[1,7]],Promise)}return e}()),A=p(function(){function t(){return r.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.awrap(S({action:"disable"}));case 3:n({type:"success",message:e("Integration_disabled")}),c(),f(),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),n({type:"error",message:t.t0});case 11:case"end":return t.stop()}}return t}(),null,null,[[0,8]],Promise)}return t}()),N=function(e,n){var t=window.open(e,"facebook-integration-oauth","width=600,height=400"),a=setInterval((function(){(null==t?void 0:t.closed)&&(clearInterval(a),n())}),300)},R=p(function(){function e(){var e;return r.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,r.awrap(S({action:"enable"}));case 3:(null==(e=t.sent)?void 0:e.url)?N(null==e?void 0:e.url,(function(){R()})):(c(),f()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n({type:"error",message:t.t0});case 10:case"end":return t.stop()}}return t}(),null,null,[[0,7]],Promise)}return e}());return l===T.LOADING||s===T.LOADING?o.createElement(E,null):l===T.REJECTED?o.createElement(b,null,o.createElement(b.Header,{title:e("Edit_Custom_Field")}),o.createElement(b.ScrollableContentWithShadow,null,o.createElement(g,{type:"danger"},e("Error")))):(d&&h&&s===T.REJECTED&&R(),o.createElement(P,{pages:D,enabled:d,hasToken:h,onToggle:F,onRefresh:f,onDisable:A,onEnable:R}))},D=function(e){var n=e.name,t=e.id,a=e.subscribed,r=e.onToggle,u=e.className,s=c(a),m=l(s,2),g=m[0],h=m[1],b=p((function(){return r(t,g,h)}));return o.createElement(f,{className:u},o.createElement(i,{display:"flex",flexDirection:"row"},o.createElement(f.Label,null,n),o.createElement(f.Row,null,o.createElement(d,{checked:g,onChange:b}))))},S=function(e){var n=e.pages,t=e.onToggle,l=e.className;return(o.createElement(m,null,n.map((function(e){return o.createElement(D,a({key:e.id},e,{onToggle:t,className:l}))}))))},P=function(e){var n=e.pages,t=e.enabled,a=e.hasToken,l=e.onToggle,r=e.onRefresh,c=e.onEnable,f=e.onDisable,d=k();return o.createElement(b,null,o.createElement(b.Header,{title:d("Facebook")}),o.createElement(b.ScrollableContentWithShadow,null,o.createElement(i,{maxWidth:"x600",w:"full",alignSelf:"center"},!t&&o.createElement(o.Fragment,null,o.createElement(s,{stretch:!0,mb:"x8"},o.createElement(u,{primary:!0,onClick:c,disabled:!a},d("Enable"))),!a&&o.createElement(o.Fragment,null,o.createElement("p",null,d("You_have_to_set_an_API_token_first_in_order_to_use_the_integration")),o.createElement("p",null,d("Please_go_to_the_Administration_page_then_Livechat_Facebook")))),t&&o.createElement(o.Fragment,null,o.createElement(i,{fontScale:"h1",mbe:"x8"},d("Pages")),(null==n?void 0:n.length)?o.createElement(m,null,o.createElement(S,{pages:n,onToggle:l})):d("No_pages_yet_Try_hitting_Reload_Pages_button"),o.createElement(i,{w:"full",mb:"x16"},o.createElement(h,null)),o.createElement(s,{stretch:!0,vertical:!0},o.createElement(u,{onClick:r},d("Reload_Pages")),o.createElement(u,{danger:!0,onClick:f},d("Disable")))))))};t.exportDefault(C)}
