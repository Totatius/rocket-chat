function module(e,t,n){var i,r,o,a,c,l,u,s,d,f,m,p,k,v,x,h,E,C,y,P,T,g,b,w,M,D,R;function _(e){var t=e._id,n=e.reload,i=x("livechat:removePriority"),r=M(),a=D(),u=v(),s=y("omnichannel-priorities"),d=c(function(){function e(){return o.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.awrap(i(t));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:n();case 9:case"end":return e.stop()}}return e}(),null,null,[[0,5]],Promise)}return e}()),k=c((function(e){e.stopPropagation();var t=function(){function e(){return o.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.awrap(d());case 3:a({type:"success",message:u("Priority_removed")}),s.push({}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),a({type:"error",message:e.t0});case 10:r();case 11:case"end":return e.stop()}}return e}(),null,null,[[0,7]],Promise)}return e}();r(l.createElement(w,{onDelete:t,onCancel:function(){return r()}}))}));return l.createElement(f.Cell,{fontScale:"p1",color:"hint",withTruncatedText:!0},l.createElement(p,{small:!0,ghost:!0,title:u("Remove"),onClick:k},l.createElement(m,{name:"trash",size:"x16"})))}n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){i=e}},0),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){r=e}},1),n.link("@babel/runtime/regenerator",{default:function(e){o=e}},2),n.export({RemovePriorityButton:function(){return _}}),n.link("@rocket.chat/fuselage-hooks",{useDebouncedValue:function(e){a=e},useMutableCallback:function(e){c=e}},0),n.link("react",{default:function(e){l=e},useMemo:function(e){u=e},useCallback:function(e){s=e},useState:function(e){d=e}},1),n.link("@rocket.chat/fuselage",{Table:function(e){f=e},Icon:function(e){m=e},Button:function(e){p=e}},2),n.link("../../../../client/components/GenericTable",{default:function(e){k=e}},3),n.link("../../../../client/contexts/TranslationContext",{useTranslation:function(e){v=e}},4),n.link("../../../../client/contexts/ServerContext",{useMethod:function(e){x=e}},5),n.link("../../../../client/contexts/AuthorizationContext",{usePermission:function(e){h=e}},6),n.link("../../../../client/components/NotAuthorizedPage",{default:function(e){E=e}},7),n.link("../../../../client/contexts/RouterContext",{useRouteParameter:function(e){C=e},useRoute:function(e){y=e}},8),n.link("../../../../client/components/VerticalBar",{default:function(e){P=e}},9),n.link("./PrioritiesPage",{default:function(e){T=e}},10),n.link("./EditPriority",{PriorityEditWithData:function(e){g=e},PriorityNew:function(e){b=e}},11),n.link("../../../../client/components/DeleteWarningModal",{default:function(e){w=e}},12),n.link("../../../../client/contexts/ModalContext",{useSetModal:function(e){M=e}},13),n.link("../../../../client/contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){D=e}},14),n.link("../../../../client/hooks/useEndpointData",{useEndpointData:function(e){R=e}},15);var I=function(e){return"asc"===e?1:-1},S=function(e,t){var n=e.text,o=e.itemsPerPage,a=e.current,c=r(t,2),l=c[0],s=c[1];return u((function(){var e;return i({fields:JSON.stringify({name:1}),text:n,sort:JSON.stringify((e={},e[l]=I(s),e.usernames="name"===l?I(s):void 0,e))},o&&{count:o},{},a&&{offset:a})}),[n,o,a,l,s])};function H(){var e=v(),t=h("manage-livechat-priorities"),n=d({text:"",current:0,itemsPerPage:25}),i=r(n,2),o=i[0],m=i[1],p=d(["name","asc"]),x=r(p,2),w=x[0],M=x[1],D=a(o,500),I=a(w,500),H=S(D,I),N=y("omnichannel-priorities"),B=C("context"),z=C("id"),A=c((function(e){var t=r(w,2),n=t[0],i=t[1];M(n!==e?[e,"asc"]:[e,"asc"===i?"desc":"asc"])})),J=c((function(e){return function(){return N.push({context:"edit",id:e})}})),O=R("livechat/priorities.list",H),V=O.value,W=void 0===V?{}:V,j=O.reload,q=u((function(){return[l.createElement(k.HeaderCell,{key:"name",direction:w[1],active:"name"===w[0],onClick:A,sort:"name"},e("Name")),l.createElement(k.HeaderCell,{key:"description",direction:w[1],active:"description"===w[0],onClick:A,sort:"description"},e("Description")),l.createElement(k.HeaderCell,{key:"dueTimeInMinutes",direction:w[1],active:"dueTimeInMinutes"===w[0],onClick:A,sort:"dueTimeInMinutes"},e("Estimated_due_time")),l.createElement(k.HeaderCell,{key:"remove",w:"x60"},e("Remove"))].filter(Boolean)}),[w,A,e]),G=s((function(t){var n=t._id,i=t.name,r=t.description,o=t.dueTimeInMinutes;return(l.createElement(f.Row,{key:n,tabIndex:0,role:"link",onClick:J(n),action:!0,"qa-user-id":n},l.createElement(f.Cell,{withTruncatedText:!0},i),l.createElement(f.Cell,{withTruncatedText:!0},r),l.createElement(f.Cell,{withTruncatedText:!0},o,"  ",e("minutes")),l.createElement(_,{_id:n,reload:j})))}),[j,J,e]),Q=s((function(){if(!B)return"";var t=function(){N.push({})};return(l.createElement(P,null,l.createElement(P.Header,null,"edit"===B&&e("Edit_Priority"),"new"===B&&e("New_Priority"),l.createElement(P.Close,{onClick:t})),"edit"===B&&l.createElement(g,{priorityId:z,reload:j}),"new"===B&&l.createElement(b,{reload:j})))}),[e,B,z,N,j]);return t?l.createElement(T,{setParams:m,params:o,onHeaderClick:A,data:W,useQuery:S,reload:j,header:q,renderRow:G,title:e("Priorities")},l.createElement(Q,null)):l.createElement(E,null)}n.exportDefault(H)}

