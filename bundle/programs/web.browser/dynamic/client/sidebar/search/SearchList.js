function module(e,t,r){let a,n,l,s,i,u,o,c,d,m,p,f,h,k,b,v,x,S,T,g,E,w,y,I,A,_,D,R,B,M,C,V,z,U,L,N,P,j,q;function W(){const e=n(["left: 0; top: 0;"]);return W=function(){return e},e}r.link("@babel/runtime/helpers/extends",{default(e){a=e}},0),r.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){n=e}},1),r.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){l=e}},2),r.link("@babel/runtime/helpers/objectSpread2",{default(e){s=e}},3),r.link("react",{default(e){i=e},useState(e){u=e},useMemo(e){o=e},useEffect(e){c=e},useRef(e){d=e}},0),r.link("meteor/meteor",{Meteor(e){m=e}},1),r.link("@rocket.chat/fuselage",{Sidebar(e){p=e},TextInput(e){f=e},Box(e){h=e},Icon(e){k=e}},2),r.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){b=e},useDebouncedValue(e){v=e},useStableArray(e){x=e},useResizeObserver(e){S=e},useAutoFocus(e){T=e},useUniqueId(e){g=e}},3),r.link("memoize-one",{default(e){E=e}},4),r.link("@rocket.chat/css-in-js",{css(e){w=e}},5),r.link("react-window",{FixedSizeList(e){y=e}},6),r.link("tinykeys",{default(e){I=e}},7),r.link("../../components/UserStatus",{ReactiveUserStatus(e){A=e}},8),r.link("../../contexts/TranslationContext",{useTranslation(e){_=e}},9),r.link("../hooks/usePreventDefault",{usePreventDefault(e){D=e}},10),r.link("../../contexts/SettingsContext",{useSetting(e){R=e}},11),r.link("../../../app/utils",{roomTypes(e){B=e}},12),r.link("../../contexts/UserContext",{useUserPreference(e){M=e},useUserSubscriptions(e){C=e}},13),r.link("../RoomList",{itemSizeMap(e){V=e},SideBarItemTemplateWithData(e){z=e}},14),r.link("../hooks/useTemplateByViewMode",{useTemplateByViewMode(e){U=e}},15),r.link("../hooks/useAvatarTemplate",{useAvatarTemplate(e){L=e}},16),r.link("../../../lib/escapeRegExp",{escapeRegExp(e){N=e}},17),r.link("../../hooks/useMethodData",{useMethodData(e){P=e}},18),r.link("../../hooks/useAsyncState",{AsyncStatePhase(e){j=e}},19),r.link("../../components/ScrollableContentWrapper",{default(e){q=e}},20);const F=E((e,t,r,a,n,l,s)=>({items:e,t:t,SideBarItemTemplate:r,AvatarTemplate:a,useRealName:n,extended:l,sidebarViewMode:s})),K=i.memo(e=>{let{data:t,index:r,style:a}=e;const{items:n,t:l,SideBarItemTemplate:s,AvatarTemplate:u,useRealName:o,extended:c}=t,d=n[r];return"d"!==d.t||d.u?i.createElement(z,{id:"search-".concat(d._id),tabIndex:-1,extended:c,style:a,t:l,room:d,SideBarItemTemplate:s,AvatarTemplate:u}):i.createElement(O,{id:"search-".concat(d._id),useRealName:o,style:a,t:l,item:d,SideBarItemTemplate:s,AvatarTemplate:u})}),O=i.memo(e=>{let{item:t,id:r,style:a,t:n,SideBarItemTemplate:l,AvatarTemplate:s,useRealName:u,sidebarViewMode:o}=e;const c=u?t.fname||t.name:t.name||t.fname,d="medium"!==o,m=i.createElement(p.Item.Icon,null,i.createElement(A,{small:d&&"small",uid:t._id})),f=B.getRouteLink(t.t,t);return i.createElement(l,{is:"a",id:r,href:f,title:c,subtitle:n("No_messages_yet"),avatar:s&&i.createElement(s,t),icon:m,style:a})}),$=(()=>m.Device.isDesktop()?window.navigator.platform.toLowerCase().includes("mac")?"(⌘+K)":"(⌃+K)":"")(),G=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;const r=/(@|#)?(.*)/i,[,a,n]=e.match(r),l="#"===a,s="@"===a,i=o(()=>l?{users:!1,rooms:!0}:s?{users:!0,rooms:!1}:{users:!0,rooms:!0},[l,s]),u=o(()=>[n,t,i],[i,n,t]),{value:c={users:[],rooms:[]},phase:d}=P("spotlight",u);return o(()=>c?{data:c,status:d}:{data:{users:[],rooms:[]},status:"loading"},[c,d])},H={sort:{lm:-1,name:1}},J=e=>{const t=/(@|#)?(.*)/i,r=e.match(t),[,a,n]=r,l=o(()=>{const e=new RegExp(N(n),"i");return s({$or:[{name:e},{fname:e}]},a&&{t:"@"===a?"d":{$ne:"d"}})},[n,a]),i=C(l,H),u=x([...null==i?void 0:i.map(e=>{let{t:t,name:r}=e;return"d"===t?r:null})].filter(Boolean)),{data:c,status:d}=G(e,u);return o(()=>{const e=[],t=(e,t,r)=>{let{_id:a}=e;return t===r.findIndex(e=>a===e._id)},r=e=>!i.find(t=>{var r;return"d"===e.t&&(null===(r=e.uids)||void 0===r?void 0:r.length)>1&&e.uids.includes(t._id)||[t.rid,t._id].includes(e._id)}),a=e=>!i.find(t=>{var r;return"d"===t.t&&2===(null===(r=t.uids)||void 0===r?void 0:r.length)&&t.uids.includes(e._id)}),l=e=>({_id:e._id,t:"d",name:e.username,fname:e.name,avatarETag:e.avatarETag}),s=e.filter(e=>[e.usernamame,e.name,e.fname].includes(n));return e.push(...c.users.filter(t).filter(a).map(l)),e.push(...c.rooms.filter(r)),{data:Array.from(new Set([...s,...i,...e])),status:d}},[i,n,c])},Q=e=>{const[t,r]=u(e),a=b(e=>{r(e.currentTarget.value)});return{value:t,onChange:a,setValue:r}},X=(e,t,r)=>{r.setAttribute("aria-activedescendant",e.id),e.setAttribute("aria-selected",!0),e.classList.add("rcx-sidebar-item--selected"),t&&(t.setAttribute("aria-selected",!1),t.classList.remove("rcx-sidebar-item--selected"))},Y=i.forwardRef((function e(t,r){let{onClose:n}=t;const s=g(),u=_(),o=Q(""),{setValue:m}=o,x=l(o,["setValue"]),E=T(),A=d(),B=d(),C=d(0),z=M("sidebarViewMode"),N=R("UI_Use_Real_Name"),P=U(),O=L(),G=V(z),H="extended"===z,Y=v(x.value,100),Z=[u("Search"),$].filter(Boolean).join(" "),{data:ee,status:te}=J(Y),re=F(ee,u,P,O,N,H,z),{ref:ae,contentBoxSize:{blockSize:ne=750}={}}=S({debounceDelay:100});D(ae);const le=b(e=>{let t=null;return(t="up"===e?B.current.previousSibling:B.current.nextSibling)?(X(t,B.current,E.current),t):B.current}),se=b(()=>{C.current=0,A.current.scrollToItem(C.current),B.current=ae.current.querySelector("a.rcx-sidebar-item"),B.current&&X(B.current,void 0,E.current)});return c(()=>{se()},[Y,se]),c(()=>{if(!E.current)return;const e=I(E.current,{Escape:e=>{e.preventDefault(),m(e=>(e||n(),se(),""))},Tab:n,ArrowUp:()=>{C.current=Math.max(C.current-1,0),A.current.scrollToItem(C.current);const e=le("up");B.current=e},ArrowDown:()=>{const e=le("down");B.current=e,C.current=Math.min(C.current+1,(null==ee?void 0:ee.length)+1),A.current.scrollToItem(C.current)},Enter:()=>{B.current&&B.current.click()}});return()=>{e()}},[E,le,null==ee?void 0:ee.length,n,se,m]),i.createElement(h,{position:"absolute","rcx-sidebar":!0,h:"full",display:"flex",flexDirection:"column",zIndex:99,w:"full",className:w(W()),ref:r},i.createElement(p.TopBar.Section,{role:"search",is:"form"},i.createElement(f,a({"aria-owns":s,"data-qa":"sidebar-search-input",ref:E},x,{placeholder:Z,addon:i.createElement(k,{name:"cross",size:"x20",onClick:n})}))),i.createElement(h,{"aria-expanded":"true",role:"listbox",id:s,tabIndex:-1,flexShrink:1,h:"full",w:"full",ref:ae,"data-qa":"sidebar-search-result",onClick:n,"aria-busy":te!==j.RESOLVED},i.createElement(y,{outerElementType:q,height:ne,itemCount:null==ee?void 0:ee.length,itemSize:G,itemData:re,overscanCount:25,width:"100%",ref:A},K)))}));r.exportDefault(Y)}
