function module(e,t,l){let n,a,r,o,i,c,s,u,d;function m(e){var t,l;let{data:m,sort:k,onClick:f,onHeaderClick:C,setParams:x,params:h}=e;const p=d(),E=o(()=>[r.createElement(u.HeaderCell,{key:"name",direction:k[1],active:"name"===k[0],onClick:C,sort:"name",w:"x200"},p("Name")),r.createElement(u.HeaderCell,{key:"aliases",w:"x200"},p("Aliases"))],[C,k,p]),T=e=>{const{_id:t,name:l,aliases:n}=e;return(r.createElement(c.Row,{key:t,onKeyDown:f(t,e),onClick:f(t,e),tabIndex:0,role:"link",action:!0,"qa-user-id":t},r.createElement(c.Cell,{fontScale:"p1",color:"default"},r.createElement(i,{withTruncatedText:!0},l)),r.createElement(c.Cell,{fontScale:"p1",color:"default"},r.createElement(i,{withTruncatedText:!0},n))))};return r.createElement(u,{header:E,renderRow:T,results:null!==(t=null==m?void 0:m.emojis)&&void 0!==t?t:[],total:null!==(l=null==m?void 0:m.total)&&void 0!==l?l:0,setParams:x,params:h,renderFilter:e=>{let{onChange:t}=e,l=a(e,["onChange"]);return(r.createElement(s,n({onChange:t},l)))}})}l.link("@babel/runtime/helpers/extends",{default(e){n=e}},0),l.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),l.link("react",{default(e){r=e},useMemo(e){o=e}},0),l.link("@rocket.chat/fuselage",{Box(e){i=e},Table(e){c=e}},1),l.link("../../../components/FilterByText",{default(e){s=e}},2),l.link("../../../components/GenericTable",{default(e){u=e}},3),l.link("../../../contexts/TranslationContext",{useTranslation(e){d=e}},4),l.exportDefault(m)}
