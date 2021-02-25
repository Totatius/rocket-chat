function module(e,t,n){var l,r,o,a,i,c,u,s,m,f,d,x,p,h,E,v,g,C,b,k,D,y,w,S,F,M,T,G,A,Y,_;n.link("@babel/runtime/regenerator",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},1),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},2),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){a=e}},3),n.link("@babel/runtime/helpers/extends",{default:function(e){i=e}},4),n.link("react",{default:function(e){c=e},useEffect:function(e){u=e},useMemo:function(e){s=e}},0),n.link("@rocket.chat/fuselage",{TextInput:function(e){m=e},Box:function(e){f=e},Icon:function(e){d=e},MultiSelect:function(e){x=e},Select:function(e){p=e},InputBox:function(e){h=e},Menu:function(e){E=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){v=e},useLocalStorage:function(e){g=e}},2),n.link("moment",{default:function(e){C=e}},3),n.link("use-subscription",{useSubscription:function(e){b=e}},4),n.link("../additionalForms",{formsSubscription:function(e){k=e}},5),n.link("../../../components/Page",{default:function(e){D=e}},6),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){y=e}},7),n.link("../../../contexts/AuthorizationContext",{usePermission:function(e){w=e}},8),n.link("../../../components/GenericTable",{default:function(e){S=e}},9),n.link("../../../contexts/ServerContext",{useMethod:function(e){F=e}},10),n.link("../../../components/DeleteWarningModal",{default:function(e){M=e}},11),n.link("../../../contexts/ModalContext",{useSetModal:function(e){T=e}},12),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){G=e}},13),n.link("../../../components/AutoCompleteDepartment",{AutoCompleteDepartment:function(e){A=e}},14),n.link("../../../components/AutoCompleteAgent",{AutoCompleteAgent:function(e){Y=e}},15),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){_=e}},16);var B=function(e){return c.createElement(f,i({fontScale:"p2",color:"default"},e))},P=function(e){var t=e.handleClearFilters,n=e.handleRemoveClosed,l=a(e,["handleClearFilters","handleRemoveClosed"]),r=y(),u=w("remove-closed-livechat-rooms"),s=o({clearFilters:{label:c.createElement(f,null,c.createElement(d,{name:"refresh",size:"x16",marginInlineEnd:"x4"}),r("Clear_filters")),action:t}},u&&{removeClosed:{label:c.createElement(f,{color:"danger"},c.createElement(d,{name:"trash",size:"x16",marginInlineEnd:"x4"}),r("Delete_all_closed_chats")),action:n}});return c.createElement(E,i({alignSelf:"flex-end",small:!1,square:!0,options:s,placement:"bottom-start"},l))},R=function(e){var t=e.setFilter,n=e.reload,o=a(e,["setFilter","reload"]),d=T(),E=G(),D=y(),w,S=_("livechat/custom-fields").value,R=[["all",D("All")],["closed",D("Closed")],["opened",D("Open")]],H=s((function(){return S&&S.customFields?S.customFields.map((function(e){var t,n;return[e._id,e.label]})):[]}),[S]),I=g("guest",""),z=r(I,2),W=z[0],j=z[1],q=g("servedBy","all"),L=r(q,2),O=L[0],J=L[1],K=g("status","all"),N=r(K,2),Q=N[0],U=N[1],V=g("department","all"),X=r(V,2),Z=X[0],$=X[1],ee=g("from",""),te=r(ee,2),ne=te[0],le=te[1],re=g("to",""),oe=r(re,2),ae=oe[0],ie=oe[1],ce=g("tags",[]),ue=r(ce,2),se=ue[0],me=ue[1],fe=g("tags",[]),de=r(fe,2),xe=de[0],pe=de[1],he=v((function(e){return j(e.target.value)})),Ee=v((function(e){return J(e)})),ve=v((function(e){return U(e)})),ge=v((function(e){return $(e)})),Ce=v((function(e){return le(e.target.value)})),be=v((function(e){return ie(e.target.value)})),ke=v((function(e){return me(e)})),De=v((function(e){return pe(e)})),ye=v((function(){j(""),J("all"),U("all"),$("all"),le(""),ie(""),me([]),pe([])})),we,Se=b(k).useCurrentChatTags,Fe,Me=(void 0===Se?function(){}:Se)(),Te=v((function(e){return e.preventDefault()})),Ge=function(e,t){return e[t]="",e};u((function(){t({guest:W,servedBy:O,status:Q,department:Z,from:ne&&C(new Date(ne)).utc().format("YYYY-MM-DDTHH:mm:ss"),to:ae&&C(new Date(ae)).utc().format("YYYY-MM-DDTHH:mm:ss"),tags:se,customFields:xe.reduce(Ge,{})})}),[t,W,O,Q,Z,ne,ae,se,xe]);var Ae=v((function(){ye()})),Ye=F("livechat:removeAllClosedRooms"),_e=v(function(){function e(){var e;return l.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:e=function(){function e(){return l.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.awrap(Ye());case 3:n(),E({type:"success",message:D("Chat_removed")}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),E({type:"error",message:e.t0});case 10:d();case 11:case"end":return e.stop()}}return e}(),null,null,[[0,7]],Promise)}return e}(),d(c.createElement(M,{onDelete:e,onCancel:function(){return d()}}));case 2:case"end":return t.stop()}}return t}(),null,null,null,Promise)}return e}());return c.createElement(f,i({mb:"x16",is:"form",onSubmit:Te,display:"flex",flexDirection:"column"},o),c.createElement(f,i({display:"flex",flexDirection:"row",flexWrap:"wrap"},o),c.createElement(f,{display:"flex",mie:"x8",flexGrow:1,flexDirection:"column"},c.createElement(B,{mb:"x4"},D("Guest")),c.createElement(m,{flexShrink:0,placeholder:D("Guest"),onChange:he,value:W})),c.createElement(f,{display:"flex",mie:"x8",flexGrow:1,flexDirection:"column"},c.createElement(B,{mb:"x4"},D("Served_By")),c.createElement(Y,{value:O,onChange:Ee})),c.createElement(f,{display:"flex",mie:"x8",flexGrow:1,flexDirection:"column"},c.createElement(B,{mb:"x4"},D("Department")),c.createElement(A,{value:Z,onChange:ge,label:D("All")})),c.createElement(f,{display:"flex",mie:"x8",flexGrow:1,flexDirection:"column"},c.createElement(B,{mb:"x4"},D("Status")),c.createElement(p,{flexShrink:0,options:R,value:Q,onChange:ve,placeholder:D("Status")})),c.createElement(f,{display:"flex",mie:"x8",flexGrow:0,flexDirection:"column"},c.createElement(B,{mb:"x4"},D("From")),c.createElement(h,{type:"date",flexShrink:0,placeholder:D("From"),onChange:Ce,value:ne})),c.createElement(f,{display:"flex",mie:"x8",flexGrow:0,flexDirection:"column"},c.createElement(B,{mb:"x4"},D("To")),c.createElement(h,{type:"date",flexShrink:0,placeholder:D("To"),onChange:be,value:ae})),c.createElement(P,{handleClearFilters:Ae,handleRemoveClosed:_e})),Me&&c.createElement(f,i({display:"flex",flexDirection:"row",marginBlockStart:"x8"},o),c.createElement(f,{display:"flex",mie:"x8",flexGrow:1,flexDirection:"column"},c.createElement(B,{mb:"x4"},D("Tags")),c.createElement(Me,{value:se,handler:ke}))),S&&c.createElement(f,i({display:"flex",flexDirection:"row",marginBlockStart:"x8"},o),c.createElement(f,{display:"flex",mie:"x8",flexGrow:1,flexDirection:"column"},c.createElement(B,{mb:"x4"},D("Custom_Fields")),c.createElement(x,i({options:H,value:xe,onChange:De,flexGrow:1},o)))))};function H(e){var t=e.data,n=e.header,l=e.setParams,r=e.params,o=e.title,u=e.renderRow,s=e.reload,m=e.children;return(c.createElement(D,{flexDirection:"row"},c.createElement(D,null,c.createElement(D.Header,{title:o}),c.createElement(D.Content,null,c.createElement(S,{header:n,renderRow:u,results:t&&t.rooms,total:t&&t.total,setParams:l,params:r,reload:s,renderFilter:function(e){var t=e.onChange,n=a(e,["onChange"]);return(c.createElement(R,i({setFilter:t},n)))}}))),m))}n.exportDefault(H)}
