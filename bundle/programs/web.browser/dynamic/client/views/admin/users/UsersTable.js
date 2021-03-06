function module(e,t,a){let l,n,s,r,i,o,c,u,m,d,p,k,f,x,E,y,h,C;a.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),a.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},1),a.link("@babel/runtime/helpers/objectSpread2",{default(e){s=e}},2),a.export({UsersTable:()=>w}),a.link("@rocket.chat/fuselage",{Box(e){r=e},Table(e){i=e}},0),a.link("@rocket.chat/fuselage-hooks",{useDebouncedValue(e){o=e},useMediaQuery(e){c=e}},1),a.link("react",{default(e){u=e},useMemo(e){m=e},useCallback(e){d=e},useState(e){p=e}},2),a.link("../../../components/avatar/UserAvatar",{default(e){k=e}},3),a.link("../../../components/GenericTable",{default(e){f=e}},4),a.link("../../../lib/capitalize",{capitalize(e){x=e}},5),a.link("../../../contexts/TranslationContext",{useTranslation(e){E=e}},6),a.link("../../../contexts/RouterContext",{useRoute(e){y=e}},7),a.link("../../../hooks/useEndpointData",{useEndpointData(e){h=e}},8),a.link("../../../components/FilterByText",{default(e){C=e}},9);const g={whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"},b=e=>"asc"===e?1:-1,v=e=>{let{emails:t,_id:a,username:l,name:n,roles:s,status:o,avatarETag:c,onClick:m,mediaQuery:d,active:p}=e;const f=E(),y=f(p?x(o):"Disabled");return u.createElement(i.Row,{onKeyDown:m(a),onClick:m(a),tabIndex:0,role:"link",action:!0,"qa-user-id":a},u.createElement(i.Cell,{style:g},u.createElement(r,{display:"flex",alignItems:"center"},u.createElement(k,{size:d?"x28":"x40",title:l,username:l,etag:c}),u.createElement(r,{display:"flex",style:g,mi:"x8"},u.createElement(r,{display:"flex",flexDirection:"column",alignSelf:"center",style:g},u.createElement(r,{fontScale:"p2",style:g,color:"default"},n||l),!d&&n&&u.createElement(r,{fontScale:"p1",color:"hint",style:g}," ","@".concat(l)," "))))),d&&u.createElement(i.Cell,null,u.createElement(r,{fontScale:"p2",style:g,color:"hint"},l)," ",u.createElement(r,{mi:"x4"})),u.createElement(i.Cell,{style:g},t&&t.length&&t[0].address),d&&u.createElement(i.Cell,{style:g},s&&s.join(", ")),u.createElement(i.Cell,{fontScale:"p1",color:"hint",style:g},y))},S=(e,t)=>{let{text:a,itemsPerPage:l,current:n}=e;return m(()=>s({fields:JSON.stringify({name:1,username:1,emails:1,roles:1,status:1,avatarETag:1,active:1}),query:JSON.stringify({$or:[{"emails.address":{$regex:a||"",$options:"i"}},{username:{$regex:a||"",$options:"i"}},{name:{$regex:a||"",$options:"i"}}]}),sort:JSON.stringify(t.reduce((e,t)=>{let[a,l]=t;return e[a]=b(l),e},{}))},l&&{count:l},{},n&&{offset:n}),[a,l,n,t])};function w(){const e=E(),[t,a]=p({text:"",current:0,itemsPerPage:25}),[s,r]=p([["name","asc"],["usernames","asc"]]),i=o(t,500),m=o(s,500),k=S(i,m),{value:x={}}=h("users.list",k),g=y("admin-users"),b=d(e=>()=>g.push({context:"info",id:e}),[g]),w=d(e=>{const t=[],[[a,l]]=s;a===e?t.push([e,"asc"===l?"desc":"asc"]):t.push([e,"asc"]),"name"===e&&t.push(["usernames",l]),"status"===e&&t.push(["active","asc"===l?"desc":"asc"]),r(t)},[s]),T=c("(min-width: 1024px)");return u.createElement(f,{header:u.createElement(u.Fragment,null,u.createElement(f.HeaderCell,{key:"name",direction:s[0][1],active:"name"===s[0][0],onClick:w,sort:"name",w:"x200"},e("Name")),T&&u.createElement(f.HeaderCell,{key:"username",direction:s[0][1],active:"username"===s[0][0],onClick:w,sort:"username",w:"x140"},e("Username")),u.createElement(f.HeaderCell,{key:"email",direction:s[0][1],active:"emails.adress"===s[0][0],onClick:w,sort:"emails.address",w:"x120"},e("Email")),T&&u.createElement(f.HeaderCell,{key:"roles",direction:s[0][1],active:"roles"===s[0][0],onClick:w,sort:"roles",w:"x120"},e("Roles")),u.createElement(f.HeaderCell,{key:"status",direction:s[0][1],active:"status"===s[0][0],onClick:w,sort:"status",w:"x100"},e("Status"))),results:x.users,total:x.total,setParams:a,params:t,renderFilter:t=>{let{onChange:a}=t,s=n(t,["onChange"]);return(u.createElement(C,l({placeholder:e("Search_Users"),onChange:a},s)))}},e=>u.createElement(v,l({key:e._id,onClick:b,mediaQuery:T},e)))}a.exportDefault(w)}

