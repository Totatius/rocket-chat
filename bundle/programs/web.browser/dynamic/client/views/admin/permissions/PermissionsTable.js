function module(e,t,n){let i,r,o,l,s,a,c,m,u,d,p,h,E,k,x,g,b,C,f,T,v,R,_,w,I,P,S,y,L,G,z;function M(){const e=i(["white-space: nowrap"]);return M=function(){return e},e}n.link("@babel/runtime/helpers/taggedTemplateLiteral",{default(e){i=e}},0),n.link("@babel/runtime/helpers/extends",{default(e){r=e}},1),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){o=e}},2),n.link("react",{default(e){l=e},useState(e){s=e},useCallback(e){a=e},useEffect(e){c=e}},0),n.link("@rocket.chat/fuselage",{TextInput(e){m=e},Table(e){u=e},Margins(e){d=e},Box(e){p=e},Icon(e){h=e},CheckBox(e){E=e},Throbber(e){k=e},Tabs(e){x=e},Button(e){g=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){b=e},useDebouncedValue(e){C=e}},2),n.link("@rocket.chat/css-in-js",{css(e){f=e}},3),n.link("../../../components/Page",{default(e){T=e}},4),n.link("./PermissionsContextBar",{default(e){v=e}},5),n.link("../../../components/GenericTable",{default(e){R=e}},6),n.link("../../../hooks/useReactiveValue",{useReactiveValue(e){_=e}},7),n.link("../../../contexts/TranslationContext",{useTranslation(e){w=e}},8),n.link("../../../contexts/ServerContext",{useMethod(e){I=e}},9),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch(e){P=e}},10),n.link("../../../contexts/RouterContext",{useRoute(e){S=e}},11),n.link("../../../../app/authorization/client/lib/ChatPermissions",{ChatPermissions(e){y=e}},12),n.link("../../../../app/authorization/lib",{CONSTANTS(e){L=e},AuthorizationUtils(e){G=e}},13),n.link("../../../../app/models/client",{Roles(e){z=e}},14);const N=e=>{let{onGrant:t,onRemove:n,permissionId:i}=e;const r=P();return b(async(e,o)=>{try{return o?await n(i,e):await t(i,e),!o}catch(l){r({type:"error",message:l})}return o})},V=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"permissions",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:25,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;const r=a(()=>{const r=new RegExp(t,"i");return y.find({level:"permissions"===e?{$ne:L.SETTINGS_LEVEL}:L.SETTINGS_LEVEL,_id:r},{sort:{_id:1},skip:i,limit:n})},[t,n,i,e]),o=b(()=>z.find().fetch(),[]),l=_(r),s=_(o);return[l.fetch(),l.count(!1),s]},H=l.memo(e=>{let{grantedRoles:t=[],_id:n,description:i,onChange:r,lineHovered:o,permissionId:a}=e;const[c,m]=s(()=>!!t.includes(n)),[h,x]=s(!1),g=G.isPermissionRestrictedForRole(a,n),C=b(async()=>{x(!0);const e=await r(n,c);m(e),x(!1)}),f=!!h||!!g;return l.createElement(u.Cell,{withTruncatedText:!0},l.createElement(d,{inline:"x2"},l.createElement(E,{checked:c,onChange:C,disabled:f}),!h&&l.createElement(p,{display:"inline",color:"hint",invisible:!o},i||n),h&&l.createElement(k,{size:"x12",display:"inline-block"})))}),B=(e,t)=>{if(t.level===L.SETTINGS_LEVEL){let n="";return t.group&&(n="".concat(e(t.group)," > ")),t.section&&(n="".concat(n).concat(e(t.section)," > ")),"".concat(n).concat(e(t.settingId))}return e(t._id)},D=l.memo(e=>{let{permission:t,t:n,roleList:i,onGrant:a,onRemove:c}=e,m=o(e,["permission","t","roleList","onGrant","onRemove"]);const{_id:d,roles:p}=t,[h,E]=s(!1),k=b(()=>E(!0)),x=b(()=>E(!1)),g=N({onGrant:a,onRemove:c,permissionId:d});return l.createElement(u.Row,r({key:d,role:"link",action:!0,tabIndex:0,onMouseEnter:k,onMouseLeave:x},m),l.createElement(u.Cell,{maxWidth:"x300",withTruncatedText:!0,title:n("".concat(d,"_description"))},B(n,t)),i.map(e=>{let{_id:t,description:n}=e;return(l.createElement(H,{key:t,_id:t,description:n,grantedRoles:p,onChange:g,lineHovered:h,permissionId:t}))}))}),F=l.memo(e=>{let{router:t,_id:n,description:i}=e,s=o(e,["router","_id","description"]);const a=b(()=>{t.push({context:"edit",_id:n})});return(l.createElement(R.HeaderCell,r({clickable:!0,pi:"x4",p:"x8"},s),l.createElement(p,{className:f(M()),pb:"x8",pi:"x12",mi:"neg-x2",borderStyle:"solid",borderWidth:"x2",borderRadius:"x2",borderColor:"neutral-300",onClick:a},l.createElement(d,{inline:"x2"},l.createElement("span",null,i||n),l.createElement(h,{name:"edit",size:"x16"})))))}),W=e=>{let{onChange:t}=e;const n=w(),[i,r]=s(""),o=C(i,500);c(()=>{t(o)},[o,t]);const a=b(e=>{let{currentTarget:{value:t}}=e;r(t)});return(l.createElement(m,{value:i,onChange:a,placeholder:n("Search"),flexGrow:0}))},j=()=>{const e=w(),[t,n]=s(""),[i,r]=s("permissions"),[o,c]=s({limit:25,skip:0}),m=S("admin-permissions"),u=I("authorization:addPermissionToRole"),p=I("authorization:removeRoleFromPermission"),E=V(i,t,o.limit,o.skip),[k,C,f]=E,_=b(e=>{let{current:t,itemsPerPage:n}=e;c({skip:t,limit:n})}),P=b(()=>{"permissions"!==i&&r("permissions")}),y=b(()=>{"settings"!==i&&r("settings")}),L=b(()=>{m.push({context:"new"})});return l.createElement(T,{flexDirection:"row"},l.createElement(T,null,l.createElement(T.Header,{title:e("Permissions")},l.createElement(g,{small:!0,square:!0,onClick:L},l.createElement(h,{name:"plus"}))),l.createElement(d,{blockEnd:"x8"},l.createElement(x,null,l.createElement(x.Item,{selected:"permissions"===i,onClick:P},e("Permissions")),l.createElement(x.Item,{selected:"settings"===i,onClick:y},e("Settings")))),l.createElement(T.Content,{mb:"neg-x8"},l.createElement(d,{block:"x8"},l.createElement(W,{onChange:n}),l.createElement(R,{header:l.createElement(l.Fragment,null,l.createElement(R.HeaderCell,{width:"x120"},e("Name")),f.map(e=>{let{_id:t,description:n}=e;return(l.createElement(F,{key:t,_id:t,description:n,router:m}))})),total:C,results:k,params:o,setParams:_,fixed:!1},a(t=>l.createElement(D,{key:t._id,permission:t,t:e,roleList:f,onGrant:u,onRemove:p}),[u,p,f,e]))))),l.createElement(v,null))};n.exportDefault(j)}

