function module(e,n,t){var o,a,l,r,s,c,u,i,f,d,p,m,C,k,E,h,v,x,b,g;t.link("@babel/runtime/helpers/extends",{default:function(e){o=e}},0),t.link("@babel/runtime/regenerator",{default:function(e){a=e}},1),t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){l=e}},2),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},3),t.link("react",{default:function(e){s=e},useState:function(e){c=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){u=e}},1),t.link("@rocket.chat/fuselage",{ButtonGroup:function(e){i=e},Button:function(e){f=e},Icon:function(e){d=e},TextInput:function(e){p=e}},2),t.link("./CannedResponseEdit",{default:function(e){m=e}},3),t.link("./CannedResponseDetails",{default:function(e){C=e}},4),t.link("./CannedResponseAdd",{default:function(e){k=e}},5),t.link("./CannedResponsesList",{default:function(e){E=e}},6),t.link("../../../../client/components/VerticalBar",{default:function(e){h=e}},7),t.link("./useCannedResponses",{useCannedResponses:function(e){v=e}},8),t.link("../../../../client/contexts/TranslationContext",{useTranslation:function(e){x=e}},9),t.link("../../../../client/contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){b=e}},10),t.link("../../../../client/contexts/ServerContext",{useMethod:function(e){g=e}},11);var R="list",S="details",T="edit",y="add",D=function(e){return function(n){var t=n.departmentId,o=n.onClose,i=c(""),f=r(i,2),d=f[0],p=f[1],m=b(),C=x(),k=u((function(e){p(e.currentTarget.value)})),E=v(d,t),h=g("saveCannedResponse"),R=u(function(){function e(e,n){return a.async(function(){function o(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,a.awrap(h(n,l({},e,{},t&&{departmentId:t,scope:"department"},{},!t&&{scope:"user"})));case 3:m({type:"success",message:C("Saved")}),o.next=9;break;case 6:o.prev=6,o.t0=o.catch(0),m({type:"error",message:o.t0});case 9:case"end":return o.stop()}}return o}(),null,null,[[0,6]],Promise)}return e}());return s.createElement(e,{onChangeFilter:k,filter:d,onClose:o,responses:E,onSave:R})}},I=function(e,n){return u((function(){n(e)}))},M=function(e){var n=e.responses,t=e.onClose,a=e.onSave,l=e.filter,v=e.onChangeFilter,b=c(R),g=r(b,2),D=g[0],M=g[1],_=c(""),w=r(_,2),B=w[0],F=w[1],A=x(),H=I(T,M),j=I(y,M),z=I(S,M),G=I(R,M),L=u((function(e){z(),F(e)})),N={onClose:t,onReturn:G};return D===S?s.createElement(C,o({_id:B,onEdit:H},N)):D===T?s.createElement(m,o({_id:B,onSave:a},N)):D===y?s.createElement(k,o({onSave:a},N)):s.createElement(h,null,s.createElement(h.Header,null,s.createElement(h.Text,null,A("Canned Responses")),s.createElement(h.Close,{onClick:t})),s.createElement(h.Header,null,s.createElement(p,{value:l,onChange:v,placeholder:A("Search")})),s.createElement(h.ScrollableContent,{p:"none"},s.createElement(E,{onDetails:L,onClose:t,responses:n})),s.createElement(h.Footer,null,s.createElement(i,{stretch:!0},s.createElement(f,{onClick:j},s.createElement(d,{name:"plus",size:"x16"}),A("New_Canned_Response")))))};t.exportDefault(s.memo(D(M)))}
