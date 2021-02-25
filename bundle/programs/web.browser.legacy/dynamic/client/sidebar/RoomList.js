function module(e,t,n){var o,i,a,r,u,l,s,d,c,m,f,v,p,h,g,k,S,I,y,T,b,M,w,x,E,A,_,R;n.export({itemSizeMap:function(){return z},createItemData:function(){return V},Row:function(){return C},normalizeSidebarMessage:function(){return D},SideBarItemTemplateWithData:function(){return P}}),n.link("@rocket.chat/fuselage",{Sidebar:function(e){o=e},Box:function(e){i=e},Badge:function(e){a=e}},0),n.link("@rocket.chat/fuselage-hooks",{useResizeObserver:function(e){r=e}},1),n.link("react",{default:function(e){u=e},useRef:function(e){l=e},useEffect:function(e){s=e}},2),n.link("react-window",{VariableSizeList:function(e){d=e},areEqual:function(e){c=e}},3),n.link("memoize-one",{default:function(e){m=e}},4),n.link("./hooks/usePreventDefault",{usePreventDefault:function(e){f=e}},5),n.link("../../app/markdown/lib/markdown",{filterMarkdown:function(e){v=e}},6),n.link("../components/UserStatus",{ReactiveUserStatus:function(e){p=e},colors:function(e){h=e}},7),n.link("../contexts/TranslationContext",{useTranslation:function(e){g=e}},8),n.link("../../app/utils",{roomTypes:function(e){k=e}},9),n.link("../contexts/UserContext",{useUserPreference:function(e){S=e},useUserId:function(e){I=e}},10),n.link("./RoomMenu",{default:function(e){y=e}},11),n.link("../contexts/SessionContext",{useSession:function(e){T=e}},12),n.link("./sections/Omnichannel",{default:function(e){b=e}},13),n.link("./hooks/useTemplateByViewMode",{useTemplateByViewMode:function(e){M=e}},14),n.link("./hooks/useShortcutOpenMenu",{useShortcutOpenMenu:function(e){w=e}},15),n.link("./hooks/useAvatarTemplate",{useAvatarTemplate:function(e){x=e}},16),n.link("./hooks/useRoomList",{useRoomList:function(e){E=e}},17),n.link("./hooks/useSidebarPaletteColor",{useSidebarPaletteColor:function(e){A=e}},18),n.link("../../lib/escapeHTML",{escapeHTML:function(e){_=e}},19),n.link("../components/ScrollableContentWrapper",{default:function(e){R=e}},20);var B={Omnichannel:b},O={overflowY:"scroll"},z=function(e){switch(e){case"extended":return 44;case"medium":return 36;case"condensed":default:return 28}},U=function(e){var t=e.room,n=e.small;switch(t.t){case"p":case"c":return u.createElement(o.Item.Icon,{"aria-hidden":"true",name:k.getIcon(t)});case"l":return u.createElement(o.Item.Icon,{"aria-hidden":"true",name:"headset",color:h[t.v.status]});case"d":return t.uids&&t.uids.length>2?u.createElement(o.Item.Icon,{"aria-hidden":"true",name:"team"}):t.uids&&t.uids.length>0?t.uids&&t.uids.length&&u.createElement(o.Item.Icon,null,u.createElement(p,{small:n&&"small",uid:t.uids.filter((function(e){return e!==t.u._id}))[0]||t.u._id})):u.createElement(o.Item.Icon,{"aria-hidden":"true",name:k.getIcon(t)});default:return null}},V=m((function(e,t,n,o,i,a,r,u){return{items:e,extended:t,t:n,SideBarItemTemplate:o,AvatarTemplate:i,openedRoom:a,sidebarViewMode:r,isAnonymous:u}})),C=u.memo((function(e){var t=e.data,n=e.index,i=e.style,a=t.extended,r=t.items,l=t.t,s=t.SideBarItemTemplate,d=t.AvatarTemplate,c=t.openedRoom,m=t.sidebarViewMode,f=r[n];if("string"==typeof f){var v=B[f];return v?u.createElement(v,{"aria-level":"1",style:i}):u.createElement(o.Section.Title,{"aria-level":"1",style:i},l(f))}return(u.createElement(P,{sidebarViewMode:m,style:i,selected:f.rid===c,t:l,room:f,extended:a,SideBarItemTemplate:s,AvatarTemplate:d}))}),c),D=function(e,t){if(e.msg)return _(v(e.msg));if(e.attachments){var n=e.attachments.find((function(e){return e.title||e.description}));return n&&n.description?_(n.description):n&&n.title?_(n.title):t("Sent_an_attachment")}};n.exportDefault((function(){A();var e=l(),t=r({debounceDelay:100}),n=t.ref,o=t.contentBoxSize,a=(o=void 0===o?{}:o).blockSize,c=void 0===a?750:a,m=T("openedRoom"),v=S("sidebarViewMode"),p=M(),h=x(),k="extended"===v,y=!I(),b=g(),_=z(v),U=E(),D=V(U,k,b,p,h,m,v,y);return f(n),w(n),s((function(){var t;null===(t=e.current)||void 0===t||t.resetAfterIndex(0)}),[v]),u.createElement(i,{h:"full",w:"full",ref:n},u.createElement(d,{outerElementType:R,height:c,itemCount:U.length,itemSize:function(e){return"string"==typeof U[e]?B[U[e]]&&B[U[e]].size||40:_},itemData:D,overscanCount:10,width:"100%",ref:e,style:O},C))}));var L=function(e,t,n){var o,i;return t?t.u?(null===(o=t.u)||void 0===o?void 0:o.username)===(null===(i=e.u)||void 0===i?void 0:i.username)?n("You")+": "+D(t,n):"d"===e.t&&e.uids&&e.uids.length<=2?D(t,n):(t.u.name||t.u.username)+": "+D(t,n):D(t,n):n("No_messages_yet")},P=u.memo(function(){function e(e){var t=e.room,n=e.id,o=e.extended,i=e.selected,r=e.SideBarItemTemplate,l=e.AvatarTemplate,s=e.t,d=e.style,c=e.sidebarViewMode,m=e.isAnonymous,f=k.getRoomName(t.t,t),v=u.createElement(U,{room:t,small:"medium"!==c}),p=k.getRouteLink(t.t,t),h=t.lastMessage,g=t.hideUnreadStatus,S=t.unread,I=void 0===S?0:S,T=t.alert,b=t.userMentions,M=t.groupMentions,w=t.tunread,x=void 0===w?[]:w,E=t.tunreadUser,A=void 0===E?[]:E,_=t.rid,R=t.t,B=t.cl,O="queued"===t.status,z=x.length>0,V=o&&L(t,h,s),C=V?u.createElement("span",{className:"message-body--unstyled",dangerouslySetInnerHTML:{__html:V}}):null,D=(b||A.length?"danger":z&&"primary")||M&&"warning"||"ghost",P=I>0||z?u.createElement(a,{style:{flexShrink:0},variant:D},I+(null==x?void 0:x.length)):null;return u.createElement(r,{is:"a",id:n,"data-qa":"sidebar-item","aria-level":"2",unread:!g&&(T||I),threadUnread:z,selected:i,href:p,"aria-label":f,title:f,time:null==h?void 0:h.ts,subtitle:C,icon:v,style:d,badges:P,avatar:l&&u.createElement(l,t),menu:!m&&!O&&function(){return u.createElement(y,{alert:T,threadUnread:z,rid:_,unread:!!I,roomOpen:!1,type:R,cl:B,name:f,status:t.status})}})}return e}(),(function(e,t){var n,o,i,a,r,u,l,s;return!["id","style","extended","selected","SideBarItemTemplate","AvatarTemplate","t","sidebarViewMode"].some((function(n){return e[n]!==t[n]}))&&(e.room===t.room||e.room._id===t.room._id&&((null===(n=e.room._updatedAt)||void 0===n?void 0:n.toISOString())===(null===(o=t.room._updatedAt)||void 0===o?void 0:o.toISOString())&&((null===(i=e.room.lastMessage)||void 0===i?void 0:null===(a=i._updatedAt)||void 0===a?void 0:a.toISOString())===(null===(r=t.room.lastMessage)||void 0===r?void 0:null===(u=r._updatedAt)||void 0===u?void 0:u.toISOString())&&(e.room.alert===t.room.alert&&(null===(l=e.room.v)||void 0===l?void 0:l.status)===(null===(s=t.room.v)||void 0===s?void 0:s.status)))))}))}

