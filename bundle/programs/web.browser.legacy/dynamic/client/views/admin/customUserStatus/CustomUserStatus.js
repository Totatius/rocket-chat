function module(e,t,n){var l,a,o,r,i,c,u,s;n.link("@babel/runtime/helpers/extends",{default:function(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){a=e}},1),n.link("react",{default:function(e){o=e},useMemo:function(e){r=e}},0),n.link("@rocket.chat/fuselage",{Table:function(e){i=e}},1),n.link("../../../components/FilterByText",{default:function(e){c=e}},2),n.link("../../../components/GenericTable",{default:function(e){u=e}},3),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){s=e}},4);var d={whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"};function f(e){var t,n,f=e.data,m=e.sort,k=e.onClick,p=e.onHeaderClick,v=e.setParams,C=e.params,h=s(),y=r((function(){return[o.createElement(u.HeaderCell,{key:"name",direction:m[1],active:"name"===m[0],onClick:p,sort:"name"},h("Name")),o.createElement(u.HeaderCell,{key:"presence",direction:m[1],active:"statusType"===m[0],onClick:p,sort:"statusType"},h("Presence"))].filter(Boolean)}),[p,m,h]),b=function(e){var t=e._id,n=e.name,l=e.statusType;return(o.createElement(i.Row,{key:t,onKeyDown:k(t,e),onClick:k(t,e),tabIndex:0,role:"link",action:!0,"qa-user-id":t},o.createElement(i.Cell,{fontScale:"p1",color:"default",style:d},n),o.createElement(i.Cell,{fontScale:"p1",color:"default",style:d},l)))};return o.createElement(u,{header:y,renderRow:b,results:null!==(t=null==f?void 0:f.statuses)&&void 0!==t?t:[],total:null!==(n=null==f?void 0:f.total)&&void 0!==n?n:0,setParams:v,params:C,renderFilter:function(e){var t=e.onChange,n=a(e,["onChange"]);return(o.createElement(c,l({onChange:t},n)))}})}n.exportDefault(f)}
