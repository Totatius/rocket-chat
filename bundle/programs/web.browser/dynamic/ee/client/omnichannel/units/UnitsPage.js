function module(e,t,n){let l,a,r,o,i,c,u,s,m,d,k,h;function f(e){let{data:t,header:n,setParams:f,params:p,title:x,renderRow:E,children:b}=e;const C=m(),g=k("omnichannel-units"),w=u(()=>g.push({context:"new"}));return r.createElement(s,{flexDirection:"row"},r.createElement(s,null,r.createElement(s.Header,{title:x},r.createElement(c,null,r.createElement(o,{onClick:w,title:C("New_Unit")},r.createElement(i,{name:"plus"})," ",C("New")))),r.createElement(s.Content,null,r.createElement(d,{renderFilter:e=>{let{onChange:t}=e,n=a(e,["onChange"]);return(r.createElement(h,l({onChange:t},n)))},header:n,renderRow:E,results:t&&t.units,total:t&&t.total,setParams:f,params:p}))),b)}n.link("@babel/runtime/helpers/extends",{default(e){l=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){a=e}},1),n.link("react",{default(e){r=e}},0),n.link("@rocket.chat/fuselage",{Button(e){o=e},Icon(e){i=e},ButtonGroup(e){c=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback(e){u=e}},2),n.link("../../../../client/components/Page",{default(e){s=e}},3),n.link("../../../../client/contexts/TranslationContext",{useTranslation(e){m=e}},4),n.link("../../../../client/components/GenericTable",{default(e){d=e}},5),n.link("../../../../client/contexts/RouterContext",{useRoute(e){k=e}},6),n.link("../../../../client/components/FilterByText",{default(e){h=e}},7),n.exportDefault(f)}
