function module(e,t,n){let l,a,r,o,c,s,u,i,m,d,k;function h(e){let{data:t,header:n,setParams:h,params:p,title:f,renderRow:x,children:b}=e;const C=d("omnichannel-departments"),E=k(),g=s(()=>C.push({context:"new"}));return r.createElement(u,{flexDirection:"row"},r.createElement(u,null,r.createElement(u.Header,{title:f},r.createElement(o,{onClick:g},r.createElement(c,{name:"plus"})," ",E("New"))),r.createElement(u.Content,null,r.createElement(m,{header:n,renderRow:x,results:t&&t.departments,total:t&&t.total,setParams:h,params:p,renderFilter:e=>{let{onChange:t}=e,n=a(e,["onChange"]);return(r.createElement(i,l({onChange:t},n)))}}))),b)}n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.link("react",{default(e){r=e}},0),n.link("@rocket.chat/fuselage",{Button(e){o=e},Icon(e){c=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){s=e}},2),n.link("../../../components/Page",{default(e){u=e}},3),n.link("../../../components/FilterByText",{default(e){i=e}},4),n.link("../../../components/GenericTable",{default(e){m=e}},5),n.link("../../../contexts/RouterContext",{useRoute(e){d=e}},6),n.link("../../../contexts/TranslationContext",{useTranslation(e){k=e}},7),n.exportDefault(h)}

