function module(e,t,n){var i,o,l,r,a,c,u,s,d,f,m,k,v,p,x,C,b,h,E,g,y,T,w,P,R,F;function M(e){var t=e._id,n=e.reload,i=R("livechat:removeCustomField"),o=T(),u=w(),f=h(),m=s(function(){function e(){return l.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.awrap(i(t));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:n();case 9:case"end":return e.stop()}}return e}(),null,null,[[0,5]],Promise)}return e}()),k=s((function(e){e.stopPropagation();var t=function(){function e(){return l.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.awrap(m());case 3:u({type:"success",message:f("Custom_Field_Removed")}),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),u({type:"error",message:e.t0});case 9:o();case 10:case"end":return e.stop()}}return e}(),null,null,[[0,6]],Promise)}return e}();o(d.createElement(P,{onDelete:t,onCancel:function(){return o()}}))}));return d.createElement(r.Cell,{fontScale:"p1",color:"hint",withTruncatedText:!0},d.createElement(c,{small:!0,ghost:!0,title:f("Remove"),onClick:k},d.createElement(a,{name:"trash",size:"x16"})))}n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},1),n.link("@babel/runtime/regenerator",{default:function(e){l=e}},2),n.export({RemoveCustomFieldButton:function(){return M}}),n.link("@rocket.chat/fuselage",{Table:function(e){r=e},Icon:function(e){a=e},Button:function(e){c=e}},0),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){u=e},useMutableCallback:function(e){s=e}},1),n.link("react",{default:function(e){d=e},useMemo:function(e){f=e},useCallback:function(e){m=e},useState:function(e){k=e}},2),n.link("./CustomFieldsPage",{default:function(e){v=e}},3),n.link("./NewCustomFieldsPage",{default:function(e){p=e}},4),n.link("./EditCustomFieldsPage",{default:function(e){x=e}},5),n.link("../../../contexts/AuthorizationContext",{usePermission:function(e){C=e}},6),n.link("../../../components/NotAuthorizedPage",{default:function(e){b=e}},7),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){h=e}},8),n.link("../../../contexts/RouterContext",{useRouteParameter:function(e){E=e},useRoute:function(e){g=e}},9),n.link("../../../components/GenericTable",{default:function(e){y=e}},10),n.link("../../../contexts/ModalContext",{useSetModal:function(e){T=e}},11),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){w=e}},12),n.link("../../../components/DeleteWarningModal",{default:function(e){P=e}},13),n.link("../../../contexts/ServerContext",{useMethod:function(e){R=e}},14),n.link("../../../hooks/useEndpointData",{useEndpointData:function(e){F=e}},15);var S=function(e){return"asc"===e?1:-1},_=function(e,t){var n=e.text,l=e.itemsPerPage,r=e.current,a=o(t,2),c=a[0],u=a[1];return f((function(){var e;return i({fields:JSON.stringify({label:1}),text:n,sort:JSON.stringify((e={},e[c]=S(u),e))},l&&{count:l},{},r&&{offset:r})}),[n,l,r,c,u])},D=function(){var e=h(),t=C("view-livechat-customfields"),n=k({text:"",current:0,itemsPerPage:25}),i=o(n,2),l=i[0],a=i[1],c=k(["field","asc"]),T=o(c,2),w=T[0],P=T[1],R=u(l,500),S=u(w,500),D=_(R,S),H=g("omnichannel-customfields"),N=E("context"),V=s((function(e){var t=o(w,2),n=t[0],i=t[1];P(n!==e?[e,"asc"]:[e,"asc"===i?"desc":"asc"])})),z=s((function(e){return function(){return H.push({context:"edit",id:e})}})),A=F("livechat/custom-fields",D),B=A.value,I=A.reload,J=f((function(){return[d.createElement(y.HeaderCell,{key:"field",direction:w[1],active:"_id"===w[0],onClick:V,sort:"_id"},e("Field")),d.createElement(y.HeaderCell,{key:"label",direction:w[1],active:"label"===w[0],onClick:V,sort:"label"},e("Label")),d.createElement(y.HeaderCell,{key:"scope",direction:w[1],active:"scope"===w[0],onClick:V,sort:"scope"},e("Scope")),d.createElement(y.HeaderCell,{key:"visibility",direction:w[1],active:"visibility"===w[0],onClick:V,sort:"visibility"},e("Visibility")),d.createElement(y.HeaderCell,{key:"remove",w:"x60"},e("Remove"))].filter(Boolean)}),[w,V,e]),O=m((function(t){var n=t.label,i=t._id,o=t.scope,l=t.visibility;return(d.createElement(r.Row,{key:i,tabIndex:0,role:"link",onClick:z(i),action:!0,"qa-user-id":i},d.createElement(r.Cell,{withTruncatedText:!0},i),d.createElement(r.Cell,{withTruncatedText:!0},n),d.createElement(r.Cell,{withTruncatedText:!0},e("visitor"===o?"Visitor":"Room")),d.createElement(r.Cell,{withTruncatedText:!0},e("visible"===l?"Visible":"Hidden")),d.createElement(M,{_id:i,reload:I})))}),[z,I,e]);return t?"new"===N?d.createElement(p,{reload:I}):"edit"===N?d.createElement(x,{reload:I}):d.createElement(v,{setParams:a,params:l,onHeaderClick:V,data:B,useQuery:_,reload:I,header:J,renderRow:O,title:e("Custom_Fields")}):d.createElement(b,null)};n.exportDefault(D)}

